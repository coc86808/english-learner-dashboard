-- =========================================================================
-- PostgreSQL Database Schema for English Learner Dashboard
-- Supabase Project: https://rxlvwdioskvwypyhifbt.supabase.co
-- =========================================================================

-- 1. Create Profiles Table (Student & Admin Accounts)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    college TEXT DEFAULT '',
    hsc_batch TEXT DEFAULT 'HSC 2026',
    role TEXT DEFAULT 'student',
    streak INTEGER DEFAULT 0,
    total_xp INTEGER DEFAULT 0,
    accuracy INTEGER DEFAULT 0,
    questions_solved INTEGER DEFAULT 0,
    league TEXT DEFAULT 'Bronze',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for instant leaderboard sorting
CREATE INDEX IF NOT EXISTS idx_profiles_total_xp ON public.profiles(total_xp DESC);
CREATE INDEX IF NOT EXISTS idx_profiles_league ON public.profiles(league);
CREATE INDEX IF NOT EXISTS idx_profiles_email ON public.profiles(email);

-- 2. Create Weak Words Table (Automatic 3-mistakes threshold & 5-correct mastery)
CREATE TABLE IF NOT EXISTS public.weak_words (
    id BIGSERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    word TEXT NOT NULL,
    bengali_meaning TEXT DEFAULT '',
    parts_of_speech TEXT DEFAULT '',
    synonyms TEXT DEFAULT '',
    antonyms TEXT DEFAULT '',
    unit TEXT DEFAULT '',
    mistake_count INTEGER DEFAULT 1,
    correct_count INTEGER DEFAULT 0,
    is_weak BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_user_word UNIQUE(user_email, word)
);

CREATE INDEX IF NOT EXISTS idx_weak_words_user ON public.weak_words(user_email);
CREATE INDEX IF NOT EXISTS idx_weak_words_active ON public.weak_words(user_email, is_weak);

-- 3. Create Exam Results Table (Score history & performance analytics)
CREATE TABLE IF NOT EXISTS public.exam_results (
    id BIGSERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    exam_title TEXT NOT NULL,
    score INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    percentage NUMERIC(5, 2) NOT NULL,
    time_spent_seconds INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_exam_results_user ON public.exam_results(user_email);
CREATE INDEX IF NOT EXISTS idx_exam_results_created ON public.exam_results(created_at DESC);

-- 4. Create Vocabulary Table (Full NCTB Textbook Vocabulary Bank)
CREATE TABLE IF NOT EXISTS public.vocabulary (
    id SERIAL PRIMARY KEY,
    word TEXT UNIQUE NOT NULL,
    bengali_meaning TEXT NOT NULL,
    parts_of_speech TEXT DEFAULT '',
    synonyms TEXT DEFAULT '',
    antonyms TEXT DEFAULT '',
    english_meaning TEXT DEFAULT '',
    example_sentence TEXT DEFAULT '',
    unit TEXT DEFAULT '',
    board_exam_tag TEXT DEFAULT '',
    priority INTEGER DEFAULT 100,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_vocabulary_word ON public.vocabulary(word);
CREATE INDEX IF NOT EXISTS idx_vocabulary_unit ON public.vocabulary(unit);

-- 5. Create Word Practice Stats Table (Track practice count, time spent, success & failure rates per user)
CREATE TABLE IF NOT EXISTS public.word_practice_stats (
    id BIGSERIAL PRIMARY KEY,
    user_email TEXT NOT NULL,
    word TEXT NOT NULL,
    times_practiced INTEGER DEFAULT 0,
    correct_count INTEGER DEFAULT 0,
    mistake_count INTEGER DEFAULT 0,
    success_rate NUMERIC(5, 2) DEFAULT 0.00,
    failure_rate NUMERIC(5, 2) DEFAULT 0.00,
    time_spent_seconds INTEGER DEFAULT 0,
    avg_time_per_question NUMERIC(5, 2) DEFAULT 0.00,
    consecutive_correct INTEGER DEFAULT 0,
    status TEXT DEFAULT 'learning',
    last_result TEXT DEFAULT '',
    last_practiced_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT uq_user_word_practice UNIQUE(user_email, word)
);

CREATE INDEX IF NOT EXISTS idx_word_practice_user ON public.word_practice_stats(user_email);
CREATE INDEX IF NOT EXISTS idx_word_practice_word ON public.word_practice_stats(word);
CREATE INDEX IF NOT EXISTS idx_word_practice_status ON public.word_practice_stats(user_email, status);
CREATE INDEX IF NOT EXISTS idx_word_practice_success ON public.word_practice_stats(user_email, success_rate);

-- =========================================================================
-- Enable Row Level Security (RLS) & Public Access Policies
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weak_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.word_practice_stats ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to read & write their progress
DROP POLICY IF EXISTS "Allow public read on profiles" ON public.profiles;
CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public upsert on profiles" ON public.profiles;
CREATE POLICY "Allow public upsert on profiles" ON public.profiles FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public all on weak_words" ON public.weak_words;
CREATE POLICY "Allow public all on weak_words" ON public.weak_words FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public all on exam_results" ON public.exam_results;
CREATE POLICY "Allow public all on exam_results" ON public.exam_results FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public read on vocabulary" ON public.vocabulary;
CREATE POLICY "Allow public read on vocabulary" ON public.vocabulary FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public upsert on vocabulary" ON public.vocabulary;
CREATE POLICY "Allow public upsert on vocabulary" ON public.vocabulary FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public all on word_practice_stats" ON public.word_practice_stats;
CREATE POLICY "Allow public all on word_practice_stats" ON public.word_practice_stats FOR ALL USING (true);

