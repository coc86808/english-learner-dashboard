import pg from 'pg';

async function migrate() {
  const client = new pg.Client({
    host: 'aws-0-ap-northeast-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.rxlvwdioskvwypyhifbt',
    password: 's9R8B2PJjlc54g9k',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Connected to Supabase PostgreSQL!');

  // 1. Add league column if not exists
  await client.query(`
    ALTER TABLE public.profiles 
    ADD COLUMN IF NOT EXISTS league TEXT DEFAULT 'Bronze';
  `);
  console.log('Added league column to public.profiles!');

  await client.query(`
    CREATE INDEX IF NOT EXISTS idx_profiles_league ON public.profiles(league);
  `);
  console.log('Created idx_profiles_league index!');

  // 2. Seed / Upsert competitive student profiles across all league divisions
  const sampleProfiles = [
    {
      name: 'Tanvir Ahmed',
      email: 'tanvir.hsc26@gmail.com',
      college: 'Notre Dame College, Dhaka',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 16,
      total_xp: 3450,
      accuracy: 96,
      questions_solved: 54,
      league: 'Platinum'
    },
    {
      name: 'Sadia Rahman',
      email: 'sadia.rahman@yahoo.com',
      college: 'Viqarunnisa Noon College',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 12,
      total_xp: 2680,
      accuracy: 94,
      questions_solved: 42,
      league: 'Gold'
    },
    {
      name: 'Nafis Iqbal',
      email: 'nafis.dc@gmail.com',
      college: 'Dhaka College',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 8,
      total_xp: 1820,
      accuracy: 90,
      questions_solved: 31,
      league: 'Gold'
    },
    {
      name: 'Fariha Jannat',
      email: 'fariha.rc@gmail.com',
      college: 'Rajshahi College',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 21,
      total_xp: 5640,
      accuracy: 98,
      questions_solved: 88,
      league: 'Diamond'
    },
    {
      name: 'Zubair Hossain',
      email: 'zubair.cc@gmail.com',
      college: 'Chittagong College',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 28,
      total_xp: 8920,
      accuracy: 99,
      questions_solved: 130,
      league: 'Master / Champion'
    },
    {
      name: 'Abrar Shahriar',
      email: 'abrar.ndc@gmail.com',
      college: 'Notre Dame College, Dhaka',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 6,
      total_xp: 1140,
      accuracy: 88,
      questions_solved: 20,
      league: 'Silver'
    },
    {
      name: 'Mehedi Hasan',
      email: 'mehedi.hasan99@gmail.com',
      college: 'Rajshahi College',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 3,
      total_xp: 380,
      accuracy: 82,
      questions_solved: 8,
      league: 'Bronze'
    },
    {
      name: 'Tasnim Anjum',
      email: 'tasnim.holycross@gmail.com',
      college: 'Holy Cross College, Dhaka',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 15,
      total_xp: 4120,
      accuracy: 95,
      questions_solved: 65,
      league: 'Platinum'
    },
    {
      name: 'Samiul Alom',
      email: 'samiul.adamjee@gmail.com',
      college: 'Adamjee Cantonment College',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 7,
      total_xp: 850,
      accuracy: 86,
      questions_solved: 15,
      league: 'Silver'
    },
    {
      name: 'Ishrat Jahan',
      email: 'ishrat.scc@gmail.com',
      college: 'Sylhet MC College',
      hsc_batch: 'HSC 2026',
      role: 'student',
      streak: 4,
      total_xp: 420,
      accuracy: 84,
      questions_solved: 9,
      league: 'Bronze'
    }
  ];

  for (const p of sampleProfiles) {
    await client.query(`
      INSERT INTO public.profiles (name, email, college, hsc_batch, role, streak, total_xp, accuracy, questions_solved, league, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, now())
      ON CONFLICT (email) DO UPDATE SET
        name = EXCLUDED.name,
        college = EXCLUDED.college,
        streak = EXCLUDED.streak,
        total_xp = EXCLUDED.total_xp,
        accuracy = EXCLUDED.accuracy,
        questions_solved = EXCLUDED.questions_solved,
        league = EXCLUDED.league,
        updated_at = now();
    `, [p.name, p.email, p.college, p.hsc_batch, p.role, p.streak, p.total_xp, p.accuracy, p.questions_solved, p.league]);
  }

  console.log('Sample profiles seeded with diverse leagues successfully!');

  const countRes = await client.query('SELECT count(*), league FROM public.profiles GROUP BY league;');
  console.log('Profiles by League:', countRes.rows);

  await client.end();
}

migrate().catch(console.error);
