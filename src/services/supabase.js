import { createClient } from '@supabase/supabase-js';

// Supabase Client Initialization
const DEFAULT_SUPABASE_URL = 'https://rxlvwdioskvwypyhifbt.supabase.co';
const DEFAULT_SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bHZ3ZGlvc2t2d3lweWhpZmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NTA5MjksImV4cCI6MjEwNTMyNjkyOX0.dCSw834biSsYsb4p-wqbX0xxlHuP62htpYIT9bVydD0';

const SUPABASE_URL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_URL) || DEFAULT_SUPABASE_URL;
const SUPABASE_ANON_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_SUPABASE_ANON_KEY) || DEFAULT_SUPABASE_ANON_KEY;

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true
  }
});

export const isSupabaseConfigured = true;

export function setSupabaseAnonKey() {}

/**
 * 1. Sync User Profile to PostgreSQL (profiles table)
 */
export async function syncUserProfileToPostgres(user) {
  if (!supabase || !user?.email) return null;
  try {
    const totalXP = Number(user.points || user.xp || user.total_xp || 0);
    const computedLeague = user.league || (
      totalXP >= 8000 ? 'Master / Champion' :
      totalXP >= 5000 ? 'Diamond' :
      totalXP >= 3000 ? 'Platinum' :
      totalXP >= 1500 ? 'Gold' :
      totalXP >= 500 ? 'Silver' : 'Bronze'
    );

    const payload = {
      email: user.email.toLowerCase().trim(),
      name: user.name || 'HSC Examinee',
      college: user.college || '',
      hsc_batch: user.hscBatch || user.batch || 'HSC 2026',
      role: user.role || 'student',
      streak: Number(user.streak || 0),
      total_xp: totalXP,
      accuracy: Number(user.accuracy || 0),
      questions_solved: Number(user.testsCompleted || user.questionsSolved || 0),
      league: computedLeague,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('profiles')
      .upsert(payload, { onConflict: 'email' })
      .select()
      .single();

    if (error) {
      console.warn('Postgres profile upsert error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('syncUserProfileToPostgres error:', err);
    return null;
  }
}

/**
 * 2. Fetch Leaderboard from PostgreSQL with instant server-side ordering
 */
export async function fetchPostgresLeaderboard(limit = 100, league = null) {
  if (!supabase) return null;
  try {
    let query = supabase
      .from('profiles')
      .select('id, name, email, college, hsc_batch, streak, total_xp, accuracy, questions_solved, league')
      .order('total_xp', { ascending: false });

    if (league && league !== 'all') {
      query = query.eq('league', league);
    }

    const { data, error } = await query.limit(limit);

    if (error) {
      console.warn('Postgres fetch leaderboard error:', error.message);
      return null;
    }

    return (data || []).map((row, index) => ({
      ...row,
      rank: index + 1
    }));
  } catch (err) {
    console.warn('fetchPostgresLeaderboard error:', err);
    return null;
  }
}

/**
 * 3. Sync Weak Word to PostgreSQL (weak_words table)
 */
export async function syncWeakWordToPostgres(userEmail, wordItem) {
  if (!supabase || !userEmail || !wordItem?.word) return null;
  try {
    const payload = {
      user_email: userEmail.toLowerCase().trim(),
      word: wordItem.word.trim(),
      bengali_meaning: wordItem.bengaliMeaning || wordItem.bengali_meaning || '',
      parts_of_speech: wordItem.partsOfSpeech || wordItem.parts_of_speech || '',
      synonyms: wordItem.synonyms || '',
      antonyms: wordItem.antonyms || '',
      unit: wordItem.unit || '',
      mistake_count: Number(wordItem.mistakeCount || wordItem.mistake_count || 1),
      correct_count: Number(wordItem.correctCount || wordItem.correct_count || 0),
      is_weak: wordItem.isWeak !== undefined ? Boolean(wordItem.isWeak) : true,
      updated_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('weak_words')
      .upsert(payload, { onConflict: 'user_email,word' })
      .select()
      .single();

    if (error) {
      console.warn('Postgres weak word upsert error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('syncWeakWordToPostgres error:', err);
    return null;
  }
}

/**
 * 4. Fetch all active Weak Words for a student from PostgreSQL
 */
export async function fetchWeakWordsFromPostgres(userEmail) {
  if (!supabase || !userEmail) return null;
  try {
    const { data, error } = await supabase
      .from('weak_words')
      .select('*')
      .eq('user_email', userEmail.toLowerCase().trim())
      .eq('is_weak', true)
      .order('updated_at', { ascending: false });

    if (error) {
      console.warn('Postgres fetch weak words error:', error.message);
      return null;
    }
    return data || [];
  } catch (err) {
    console.warn('fetchWeakWordsFromPostgres error:', err);
    return null;
  }
}

/**
 * 5. Record Exam Result to PostgreSQL
 */
export async function recordExamResultToPostgres(result) {
  if (!supabase || !result) return null;
  try {
    const payload = {
      user_email: (result.userEmail || result.email || 'anonymous').toLowerCase().trim(),
      exam_title: result.examTitle || result.unit || 'Practice Exam',
      score: Number(result.score || 0),
      total_questions: Number(result.totalQuestions || 0),
      percentage: Number(result.percentage || 0),
      time_spent_seconds: Number(result.timeSpent || 0),
      created_at: new Date().toISOString()
    };

    const { data, error } = await supabase
      .from('exam_results')
      .insert([payload])
      .select()
      .single();

    if (error) {
      console.warn('Postgres exam result insert error:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('recordExamResultToPostgres error:', err);
    return null;
  }
}

/**
 * 6. Record Word Practice Event to PostgreSQL (word_practice_stats table)
 * Tracks:
 * - times_practiced: total attempts on this word
 * - correct_count: total correct answers
 * - mistake_count: total incorrect answers
 * - success_rate: (correct_count / times_practiced) * 100
 * - failure_rate: (mistake_count / times_practiced) * 100
 * - time_spent_seconds: total seconds spent on this word
 * - avg_time_per_question: average seconds per attempt
 * - consecutive_correct: current streak of right answers
 * - status: 'mastered' (>= 5 consecutive right), 'weak' (>= 3 mistakes), or 'learning'
 */
export async function recordWordPracticeToPostgres({ userEmail, word, isCorrect, timeSpentSeconds = 5 }) {
  const cleanWord = (word || '').trim();
  if (!cleanWord) return null;

  // Resolve user email
  let cleanEmail = (userEmail || '').toLowerCase().trim();
  if (!cleanEmail) {
    try {
      const authUserRaw = localStorage.getItem('hsc_auth_user');
      const authUser = authUserRaw ? JSON.parse(authUserRaw) : null;
      cleanEmail = (authUser?.email || 'guest@hsc2026.com').toLowerCase().trim();
    } catch (e) {
      cleanEmail = 'guest@hsc2026.com';
    }
  }

  const durationSec = Math.max(1, Number(timeSpentSeconds) || 5);

  // 1. Maintain local instant cache so UI updates with 0 latency
  let localStats = {};
  try {
    const raw = localStorage.getItem('hsc_word_practice_stats');
    if (raw) localStats = JSON.parse(raw);
  } catch (e) {}

  const prev = localStats[cleanWord.toLowerCase()] || {
    times_practiced: 0,
    correct_count: 0,
    mistake_count: 0,
    time_spent_seconds: 0,
    consecutive_correct: 0,
    status: 'learning'
  };

  const timesPracticed = Number(prev.times_practiced || 0) + 1;
  const correctCount = Number(prev.correct_count || 0) + (isCorrect ? 1 : 0);
  const mistakeCount = Number(prev.mistake_count || 0) + (isCorrect ? 0 : 1);
  const totalTime = Number(prev.time_spent_seconds || 0) + durationSec;
  const successRate = Number(((correctCount / timesPracticed) * 100).toFixed(2));
  const failureRate = Number(((mistakeCount / timesPracticed) * 100).toFixed(2));
  const avgTime = Number((totalTime / timesPracticed).toFixed(2));
  const consecutiveCorrect = isCorrect ? (Number(prev.consecutive_correct || 0) + 1) : 0;

  let newStatus = prev.status || 'learning';
  if (consecutiveCorrect >= 5) {
    newStatus = 'mastered';
  } else if (mistakeCount >= 3) {
    newStatus = 'weak';
  } else {
    newStatus = 'learning';
  }

  const updatedRecord = {
    user_email: cleanEmail,
    word: cleanWord,
    times_practiced: timesPracticed,
    correct_count: correctCount,
    mistake_count: mistakeCount,
    success_rate: successRate,
    failure_rate: failureRate,
    time_spent_seconds: totalTime,
    avg_time_per_question: avgTime,
    consecutive_correct: consecutiveCorrect,
    status: newStatus,
    last_result: isCorrect ? 'correct' : 'mistake',
    last_practiced_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  localStats[cleanWord.toLowerCase()] = updatedRecord;
  try {
    localStorage.setItem('hsc_word_practice_stats', JSON.stringify(localStats));
    window.dispatchEvent(new CustomEvent('hsc_word_stats_updated', { detail: updatedRecord }));
  } catch (e) {}

  // 2. Persist to PostgreSQL if Supabase is connected
  if (!supabase) return updatedRecord;

  try {
    const { data, error } = await supabase
      .from('word_practice_stats')
      .upsert(updatedRecord, { onConflict: 'user_email,word' })
      .select()
      .single();

    if (error) {
      console.warn('Postgres word practice upsert error:', error.message);
      return updatedRecord;
    }
    return data;
  } catch (err) {
    console.warn('recordWordPracticeToPostgres network error:', err);
    return updatedRecord;
  }
}

/**
 * 7. Fetch all word practice statistics for a user from PostgreSQL
 */
export async function fetchUserWordStatsFromPostgres(userEmail) {
  let cleanEmail = (userEmail || '').toLowerCase().trim();
  if (!cleanEmail) {
    try {
      const authUserRaw = localStorage.getItem('hsc_auth_user');
      const authUser = authUserRaw ? JSON.parse(authUserRaw) : null;
      cleanEmail = (authUser?.email || '').toLowerCase().trim();
    } catch (e) {}
  }

  // Load from local storage cache first for instant UI response
  let cached = {};
  try {
    const raw = localStorage.getItem('hsc_word_practice_stats');
    if (raw) cached = JSON.parse(raw);
  } catch (e) {}

  if (!supabase || !cleanEmail) return cached;

  try {
    const { data, error } = await supabase
      .from('word_practice_stats')
      .select('*')
      .eq('user_email', cleanEmail);

    if (error) {
      console.warn('fetchUserWordStatsFromPostgres error:', error.message);
      return cached;
    }

    if (Array.isArray(data)) {
      const statsMap = { ...cached };
      data.forEach((row) => {
        if (row && row.word) {
          statsMap[row.word.toLowerCase()] = row;
        }
      });
      try {
        localStorage.setItem('hsc_word_practice_stats', JSON.stringify(statsMap));
      } catch (e) {}
      return statsMap;
    }
    return cached;
  } catch (err) {
    console.warn('fetchUserWordStatsFromPostgres exception:', err);
    return cached;
  }
}

/**
 * 8. Fetch Vocabulary bank from PostgreSQL with optional search or unit filter
 */
export async function fetchVocabularyFromPostgres({ unit, search, limit = 1500 } = {}) {
  if (!supabase) return null;
  try {
    let query = supabase
      .from('vocabulary')
      .select('*')
      .order('priority', { ascending: false })
      .order('word', { ascending: true });

    if (unit && unit !== 'all') {
      query = query.eq('unit', unit);
    }
    if (search && search.trim()) {
      query = query.ilike('word', `%${search.trim()}%`);
    }
    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) {
      console.warn('fetchVocabularyFromPostgres error:', error.message);
      return null;
    }
    return data || [];
  } catch (err) {
    console.warn('fetchVocabularyFromPostgres exception:', err);
    return null;
  }
}

/**
 * 9. Fetch all Profiles from PostgreSQL
 */
export async function fetchPostgresProfiles() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .order('total_xp', { ascending: false });

    if (error) {
      console.warn('fetchPostgresProfiles error:', error.message);
      return null;
    }
    return data || [];
  } catch (err) {
    console.warn('fetchPostgresProfiles exception:', err);
    return null;
  }
}

/**
 * 10. Real-time Subscription to PostgreSQL Profiles
 */
export function listenToPostgresProfiles(onUpdate) {
  if (!supabase || typeof onUpdate !== 'function') return () => {};

  // Initial fetch
  fetchPostgresProfiles().then((profiles) => {
    if (Array.isArray(profiles) && profiles.length > 0) {
      onUpdate(profiles);
    }
  });

  // Real-time Postgres changes listener
  try {
    const channel = supabase
      .channel('realtime_profiles')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'profiles' },
        () => {
          fetchPostgresProfiles().then((profiles) => {
            if (Array.isArray(profiles)) onUpdate(profiles);
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  } catch (e) {
    console.warn('listenToPostgresProfiles subscription error:', e);
    return () => {};
  }
}

/**
 * 11. Delete Profile from PostgreSQL
 */
export async function deleteUserProfileFromPostgres(email) {
  if (!supabase || !email) return false;
  try {
    const { error } = await supabase
      .from('profiles')
      .delete()
      .eq('email', email.toLowerCase().trim());

    if (error) {
      console.warn('deleteUserProfileFromPostgres error:', error.message);
      return false;
    }
    return true;
  } catch (err) {
    console.warn('deleteUserProfileFromPostgres exception:', err);
    return false;
  }
}

