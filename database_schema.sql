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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Index for instant leaderboard sorting
CREATE INDEX IF NOT EXISTS idx_profiles_total_xp ON public.profiles(total_xp DESC);
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

-- =========================================================================
-- Enable Row Level Security (RLS) & Public Access Policies
-- =========================================================================

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weak_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exam_results ENABLE ROW LEVEL SECURITY;

-- Allow anonymous and authenticated users to read & write their progress
DROP POLICY IF EXISTS "Allow public read on profiles" ON public.profiles;
CREATE POLICY "Allow public read on profiles" ON public.profiles FOR SELECT USING (true);

DROP POLICY IF EXISTS "Allow public upsert on profiles" ON public.profiles;
CREATE POLICY "Allow public upsert on profiles" ON public.profiles FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public all on weak_words" ON public.weak_words;
CREATE POLICY "Allow public all on weak_words" ON public.weak_words FOR ALL USING (true);

DROP POLICY IF EXISTS "Allow public all on exam_results" ON public.exam_results;
CREATE POLICY "Allow public all on exam_results" ON public.exam_results FOR ALL USING (true);
