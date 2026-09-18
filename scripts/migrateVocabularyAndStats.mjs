import pg from 'pg';
import { hscVocabularyList } from '../src/data/questions/hscQuestionsData.js';

async function runMigration() {
  console.log('🚀 Starting PostgreSQL migration for Vocabulary & Word Practice Stats...');

  const client = new pg.Client({
    host: 'aws-0-ap-northeast-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.rxlvwdioskvwypyhifbt',
    password: 's9R8B2PJjlc54g9k',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('✅ Connected to Supabase PostgreSQL Database!');

  // 1. Create vocabulary table
  console.log('📦 Creating table public.vocabulary...');
  await client.query(`
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
  `);

  // 2. Create word_practice_stats table
  console.log('📊 Creating table public.word_practice_stats...');
  await client.query(`
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
  `);

  // 3. Enable RLS & Policies
  console.log('🔒 Configuring Row Level Security & Policies...');
  await client.query(`
    ALTER TABLE public.vocabulary ENABLE ROW LEVEL SECURITY;
    ALTER TABLE public.word_practice_stats ENABLE ROW LEVEL SECURITY;

    DROP POLICY IF EXISTS "Allow public read on vocabulary" ON public.vocabulary;
    CREATE POLICY "Allow public read on vocabulary" ON public.vocabulary FOR SELECT USING (true);

    DROP POLICY IF EXISTS "Allow public upsert on vocabulary" ON public.vocabulary;
    CREATE POLICY "Allow public upsert on vocabulary" ON public.vocabulary FOR ALL USING (true);

    DROP POLICY IF EXISTS "Allow public all on word_practice_stats" ON public.word_practice_stats;
    CREATE POLICY "Allow public all on word_practice_stats" ON public.word_practice_stats FOR ALL USING (true);
  `);

  // 4. Ingest all 1,241 vocabulary words in batches of 100
  console.log(`📥 Ingesting ${hscVocabularyList.length} vocabulary words into database...`);
  const batchSize = 100;
  let insertedCount = 0;

  for (let i = 0; i < hscVocabularyList.length; i += batchSize) {
    const batch = hscVocabularyList.slice(i, i + batchSize);
    
    for (const item of batch) {
      const word = (item.word || '').trim();
      if (!word) continue;

      const bengaliMeaning = item.bengaliMeaning || item.banglaMeaning || '';
      const partsOfSpeech = item.partsOfSpeech || '';
      const synonyms = item.synonyms || '';
      const antonyms = item.antonyms || '';
      const englishMeaning = item.englishMeaning || '';
      const exampleSentence = item.exampleSentence || '';
      const unit = item.unit || '';
      const boardExamTag = item.boardExamTag || '';
      const priority = item.priority || 100;

      await client.query(`
        INSERT INTO public.vocabulary (
          word, bengali_meaning, parts_of_speech, synonyms, antonyms,
          english_meaning, example_sentence, unit, board_exam_tag, priority, updated_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now())
        ON CONFLICT (word) DO UPDATE SET
          bengali_meaning = EXCLUDED.bengali_meaning,
          parts_of_speech = EXCLUDED.parts_of_speech,
          synonyms = EXCLUDED.synonyms,
          antonyms = EXCLUDED.antonyms,
          english_meaning = EXCLUDED.english_meaning,
          example_sentence = EXCLUDED.example_sentence,
          unit = EXCLUDED.unit,
          board_exam_tag = EXCLUDED.board_exam_tag,
          priority = EXCLUDED.priority,
          updated_at = now();
      `, [
        word, bengaliMeaning, partsOfSpeech, synonyms, antonyms,
        englishMeaning, exampleSentence, unit, boardExamTag, priority
      ]);
      insertedCount++;
    }
    console.log(`  Processed ${Math.min(i + batchSize, hscVocabularyList.length)} / ${hscVocabularyList.length} words...`);
  }

  console.log(`✨ Successfully inserted/updated ${insertedCount} vocabulary records!`);

  // 5. Seed sample student practice metrics for demonstration
  console.log('🧪 Seeding sample word practice stats...');
  const sampleStats = [
    {
      user_email: 'tanvir.hsc26@gmail.com',
      word: 'Persecution',
      times_practiced: 12,
      correct_count: 10,
      mistake_count: 2,
      time_spent_seconds: 78,
      consecutive_correct: 4,
      status: 'learning',
      last_result: 'correct'
    },
    {
      user_email: 'tanvir.hsc26@gmail.com',
      word: 'Intuitive',
      times_practiced: 8,
      correct_count: 7,
      mistake_count: 1,
      time_spent_seconds: 45,
      consecutive_correct: 5,
      status: 'mastered',
      last_result: 'correct'
    },
    {
      user_email: 'tanvir.hsc26@gmail.com',
      word: 'Harassment',
      times_practiced: 9,
      correct_count: 5,
      mistake_count: 4,
      time_spent_seconds: 92,
      consecutive_correct: 0,
      status: 'weak',
      last_result: 'mistake'
    },
    {
      user_email: 'tanvir.hsc26@gmail.com',
      word: 'Endeavour',
      times_practiced: 6,
      correct_count: 6,
      mistake_count: 0,
      time_spent_seconds: 30,
      consecutive_correct: 6,
      status: 'mastered',
      last_result: 'correct'
    },
    {
      user_email: 'student@learnerhub.com',
      word: 'Persecution',
      times_practiced: 5,
      correct_count: 4,
      mistake_count: 1,
      time_spent_seconds: 36,
      consecutive_correct: 3,
      status: 'learning',
      last_result: 'correct'
    }
  ];

  for (const s of sampleStats) {
    const successRate = s.times_practiced > 0 ? ((s.correct_count / s.times_practiced) * 100).toFixed(2) : '0.00';
    const failureRate = s.times_practiced > 0 ? ((s.mistake_count / s.times_practiced) * 100).toFixed(2) : '0.00';
    const avgTime = s.times_practiced > 0 ? (s.time_spent_seconds / s.times_practiced).toFixed(2) : '0.00';

    await client.query(`
      INSERT INTO public.word_practice_stats (
        user_email, word, times_practiced, correct_count, mistake_count,
        success_rate, failure_rate, time_spent_seconds, avg_time_per_question,
        consecutive_correct, status, last_result, last_practiced_at, updated_at
      )
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, now(), now())
      ON CONFLICT (user_email, word) DO UPDATE SET
        times_practiced = EXCLUDED.times_practiced,
        correct_count = EXCLUDED.correct_count,
        mistake_count = EXCLUDED.mistake_count,
        success_rate = EXCLUDED.success_rate,
        failure_rate = EXCLUDED.failure_rate,
        time_spent_seconds = EXCLUDED.time_spent_seconds,
        avg_time_per_question = EXCLUDED.avg_time_per_question,
        consecutive_correct = EXCLUDED.consecutive_correct,
        status = EXCLUDED.status,
        last_result = EXCLUDED.last_result,
        last_practiced_at = now(),
        updated_at = now();
    `, [
      s.user_email, s.word, s.times_practiced, s.correct_count, s.mistake_count,
      successRate, failureRate, s.time_spent_seconds, avgTime,
      s.consecutive_correct, s.status, s.last_result
    ]);
  }

  // 6. Verify Database Counts
  const vocabCount = await client.query('SELECT count(*) FROM public.vocabulary;');
  const statsCount = await client.query('SELECT count(*) FROM public.word_practice_stats;');
  console.log(`\n🎉 Verification:`);
  console.log(`  - Total Words in public.vocabulary: ${vocabCount.rows[0].count}`);
  console.log(`  - Total Practice Stats records: ${statsCount.rows[0].count}`);

  await client.end();
  console.log('🏁 Migration finished successfully!');
}

runMigration().catch(err => {
  console.error('❌ Migration error:', err);
  process.exit(1);
});
