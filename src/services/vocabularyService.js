import { supabase } from './supabase';
import { hscVocabularyList, hscQuestionsList, buildQuestionsDatabase } from '../data/questions/hscQuestionsData';

const VOCAB_STORAGE_KEY = 'hsc_live_vocabulary_cache';
const VOCAB_VERSION_KEY = 'hsc_live_vocab_version';

// Initialize live memory array from localStorage cache or baseline
let currentVocabularyList = [...hscVocabularyList];
let currentQuestionsList = [];

// Try to hydrate from localStorage immediately for 0ms startup
try {
  const cached = localStorage.getItem(VOCAB_STORAGE_KEY);
  if (cached) {
    const parsed = JSON.parse(cached);
    if (Array.isArray(parsed) && parsed.length > 0) {
      currentVocabularyList = parsed;
      // Mutate baseline in place so static imports also get latest
      hscVocabularyList.splice(0, hscVocabularyList.length, ...parsed);
    }
  }
} catch (e) {
  console.warn('Failed to hydrate cached vocabulary:', e);
}

// Build initial questions from hydrated vocabulary
try {
  currentQuestionsList = buildQuestionsDatabase();
  if (Array.isArray(hscQuestionsList) && Array.isArray(currentQuestionsList) && currentQuestionsList.length > 0) {
    hscQuestionsList.splice(0, hscQuestionsList.length, ...currentQuestionsList);
  }
} catch (e) {
  console.warn('Failed to build initial questions from vocabulary:', e);
}

/**
 * Returns current live vocabulary list
 */
export function getLiveVocabulary() {
  return currentVocabularyList;
}

/**
 * Returns current live questions list
 */
export function getLiveQuestions() {
  if (!currentQuestionsList || currentQuestionsList.length === 0) {
    currentQuestionsList = buildQuestionsDatabase(currentVocabularyList);
  }
  return currentQuestionsList;
}

/**
 * Map a Supabase row to frontend vocabulary object, merging with static baseline
 */
function mapSupabaseToItem(row, baselineMap = new Map()) {
  const wordKey = (row.word || '').trim().toLowerCase();
  const baseline = baselineMap.get(wordKey) || {};

  return {
    ...baseline,
    id: baseline.id || `vocab-live-${row.id || wordKey}`,
    word: (row.word || baseline.word || '').trim(),
    bengaliMeaning: (row.bengali_meaning || baseline.bengaliMeaning || '').trim(),
    partsOfSpeech: (row.parts_of_speech || baseline.partsOfSpeech || 'Noun').trim(),
    synonyms: (row.synonyms || baseline.synonyms || '').trim(),
    antonyms: (row.antonyms || baseline.antonyms || '').trim(),
    englishMeaning: (row.english_meaning || baseline.englishMeaning || '').trim(),
    exampleSentence: (row.example_sentence || baseline.exampleSentence || '').trim(),
    unit: (row.unit || baseline.unit || '').trim(),
    boardExamTag: (row.board_exam_tag || baseline.boardExamTag || row.unit || '').trim(),
    sources: baseline.sources || [row.unit || 'HSC English'],
    isCrossReferenced: baseline.isCrossReferenced || false,
    crossReferencedWords: baseline.crossReferencedWords || [],
    crossRefMatchCount: baseline.crossRefMatchCount || 0,
    crossRefSynonyms: baseline.crossRefSynonyms || [],
    crossRefAntonyms: baseline.crossRefAntonyms || [],
    priority: Number(row.priority || baseline.priority || 50)
  };
}

/**
 * Fetches all vocabulary rows from Supabase with pagination
 */
export async function fetchAllVocabularyFromSupabase() {
  if (!supabase) return null;

  try {
    let allRows = [];
    let offset = 0;
    const limit = 1000;

    while (true) {
      const { data, error } = await supabase
        .from('vocabulary')
        .select('*')
        .order('id', { ascending: true })
        .range(offset, offset + limit - 1);

      if (error) {
        console.warn('Error fetching vocabulary from Supabase:', error.message);
        return null;
      }

      if (!data || data.length === 0) break;
      allRows = allRows.concat(data);
      if (data.length < limit) break;
      offset += limit;
    }

    return allRows;
  } catch (err) {
    console.warn('Exception in fetchAllVocabularyFromSupabase:', err);
    return null;
  }
}

/**
 * Syncs Supabase vocabulary to local memory and cache, notifying all listeners
 */
export async function syncLiveVocabulary() {
  const rows = await fetchAllVocabularyFromSupabase();
  if (!rows || rows.length === 0) return currentVocabularyList;

  // Build baseline lookup map
  const baselineMap = new Map();
  hscVocabularyList.forEach((item) => {
    if (item && item.word) {
      baselineMap.set(item.word.trim().toLowerCase(), item);
    }
  });

  // Map each Supabase row
  const mergedList = rows.map((row) => mapSupabaseToItem(row, baselineMap));

  // Update in-memory reference
  currentVocabularyList = mergedList;
  hscVocabularyList.splice(0, hscVocabularyList.length, ...mergedList);

  // Re-build questions database and mutate in place
  try {
    const freshQuestions = buildQuestionsDatabase();
    if (Array.isArray(freshQuestions) && freshQuestions.length > 0) {
      currentQuestionsList = freshQuestions;
      if (Array.isArray(hscQuestionsList)) {
        hscQuestionsList.splice(0, hscQuestionsList.length, ...freshQuestions);
      }
    }
  } catch (e) {
    console.warn('Error rebuilding questions database:', e);
  }

  // Cache to localStorage
  try {
    localStorage.setItem(VOCAB_STORAGE_KEY, JSON.stringify(mergedList));
    localStorage.setItem(VOCAB_VERSION_KEY, String(Date.now()));
  } catch (e) {
    console.warn('LocalStorage quota or write error:', e);
  }

  // Dispatch custom event to let all UI components re-render immediately
  if (typeof window !== 'undefined') {
    window.dispatchEvent(
      new CustomEvent('hsc_vocabulary_updated', {
        detail: {
          vocabulary: mergedList,
          questions: currentQuestionsList
        }
      })
    );
  }

  return mergedList;
}

/**
 * Initialize vocabulary sync and real-time subscription
 */
let isInitialized = false;
export function initVocabularySync() {
  if (isInitialized) return;
  isInitialized = true;

  // 1. Initial background fetch
  syncLiveVocabulary().catch((err) => console.warn('Live vocabulary sync error:', err));

  // 2. Realtime subscription to changes in 'vocabulary' table
  if (supabase) {
    try {
      const channel = supabase
        .channel('realtime_live_vocabulary')
        .on(
          'postgres_changes',
          { event: '*', schema: 'public', table: 'vocabulary' },
          () => {
            console.log('⚡ Supabase vocabulary table changed. Syncing live updates...');
            syncLiveVocabulary();
          }
        )
        .subscribe();

      return () => {
        supabase.removeChannel(channel);
      };
    } catch (err) {
      console.warn('Failed to subscribe to realtime vocabulary:', err);
    }
  }
}
