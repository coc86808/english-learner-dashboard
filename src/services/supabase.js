import { createClient } from '@supabase/supabase-js';

// Project Configuration
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://rxlvwdioskvwypyhifbt.supabase.co';
const DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bHZ3ZGlvc2t2d3lweWhpZmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NTA5MjksImV4cCI6MjEwNTMyNjkyOX0.dCSw834biSsYsb4p-wqbX0xxlHuP62htpYIT9bVydD0';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || (typeof window !== 'undefined' ? localStorage.getItem('hsc_supabase_anon_key') : '') || DEFAULT_ANON_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY && SUPABASE_ANON_KEY.startsWith('ey'));

// Initialize client only when key is provided
export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true
      }
    })
  : null;

/**
 * Configure or update Supabase Anon Key dynamically (e.g. from admin panel or settings)
 */
export function setSupabaseAnonKey(anonKey) {
  if (anonKey && typeof window !== 'undefined') {
    localStorage.setItem('hsc_supabase_anon_key', anonKey.trim());
    window.location.reload();
  }
}

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
