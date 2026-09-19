import pg from 'pg';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, deleteDoc, setDoc } from 'firebase/firestore';

// 1. Firebase Configuration
const firebaseConfig = {
  apiKey: 'AIzaSyBh9mnvutZ-Tar8lkPhPp1l7wzXPnyS3kI',
  authDomain: 'sakin86808-e7863.firebaseapp.com',
  projectId: 'sakin86808-e7863',
  storageBucket: 'sakin86808-e7863.firebasestorage.app',
  messagingSenderId: '276291022314',
  appId: '1:276291022314:web:9a76ee9d20e98157989693'
};

const realEmails = [
  'learnermcq@gmail.com',
  'mohammad.nasim@gmail.com',
  'sarkarriad92@gmail.com',
  'riad.sarkar@gmail.com',
  'sakin7112@gmail.com',
  'sakin@gmail.com',
  'admin@learnerhub.com',
  'sakinadmin'
];

function isReal(name = '', email = '') {
  const n = name.toLowerCase().trim();
  const e = email.toLowerCase().trim();
  if (n.includes('mohammad nasim') || e === 'learnermcq@gmail.com' || e === 'mohammad.nasim@gmail.com') return true;
  if (n.includes('riad sarkar') || e === 'sarkarriad92@gmail.com' || e === 'riad.sarkar@gmail.com') return true;
  if (n.includes('sakin') || e.includes('sakin') || e === 'admin@learnerhub.com' || e === 'admin') return true;
  return false;
}

async function purgeSupabase() {
  console.log('--- PURGING SUPABASE POSTGRESQL ---');
  const client = new pg.Client({
    host: 'aws-0-ap-northeast-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.rxlvwdioskvwypyhifbt',
    password: 's9R8B2PJjlc54g9k',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  const res = await client.query('SELECT id, name, email FROM public.profiles');
  console.log(`Found ${res.rows.length} rows in public.profiles:`);
  
  for (const row of res.rows) {
    if (!isReal(row.name, row.email)) {
      console.log(`Deleting fake user from Supabase: ${row.name} (${row.email}) [id: ${row.id}]`);
      await client.query('DELETE FROM public.profiles WHERE id = $1', [row.id]);
    } else {
      console.log(`Keeping real user in Supabase: ${row.name} (${row.email})`);
    }
  }

  // Ensure Mohammad Nasim and Riad Sarkar exist in Supabase profiles
  const checkNasim = await client.query("SELECT id FROM public.profiles WHERE lower(email) = 'learnermcq@gmail.com' OR lower(name) LIKE '%nasim%'");
  if (checkNasim.rows.length === 0) {
    console.log('Adding Mohammad Nasim to Supabase profiles...');
    await client.query(`
      INSERT INTO public.profiles (name, email, college, hsc_batch, role, streak, total_xp, accuracy, questions_solved, league)
      VALUES ('Mohammad Nasim', 'learnermcq@gmail.com', 'Dhaka College', 'HSC 2026', 'student', 0, 0, 0, 0, 'Bronze')
    `);
  }

  const checkRiad = await client.query("SELECT id FROM public.profiles WHERE lower(email) = 'sarkarriad92@gmail.com' OR lower(name) LIKE '%riad%'");
  if (checkRiad.rows.length === 0) {
    console.log('Adding Riad Sarkar to Supabase profiles...');
    await client.query(`
      INSERT INTO public.profiles (name, email, college, hsc_batch, role, streak, total_xp, accuracy, questions_solved, league)
      VALUES ('Riad Sarkar', 'sarkarriad92@gmail.com', 'Dhaka College', 'HSC 2026', 'student', 0, 0, 0, 0, 'Bronze')
    `);
  }

  const remaining = await client.query('SELECT id, name, email, total_xp, league FROM public.profiles');
  console.log('Remaining Supabase profiles:', remaining.rows);
  await client.end();
}

async function purgeFirestore() {
  console.log('--- PURGING FIREBASE FIRESTORE ---');
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const snapshot = await getDocs(collection(db, 'users'));
  console.log(`Found ${snapshot.size} docs in Firestore users collection:`);

  for (const docSnap of snapshot.docs) {
    const data = docSnap.data();
    const name = data.name || '';
    const email = data.email || '';
    if (!isReal(name, email)) {
      console.log(`Deleting fake user from Firestore: ${name} (${email}) [id: ${docSnap.id}]`);
      await deleteDoc(doc(db, 'users', docSnap.id));
    } else {
      console.log(`Keeping real user in Firestore: ${name} (${email}) [id: ${docSnap.id}]`);
    }
  }

  const remainingSnap = await getDocs(collection(db, 'users'));
  console.log(`Remaining Firestore users count: ${remainingSnap.size}`);
  remainingSnap.forEach(d => console.log(' ->', d.id, d.data().name, d.data().email));
}

async function main() {
  try {
    await purgeSupabase();
    await purgeFirestore();
    console.log('=== PURGE COMPLETE! ===');
    process.exit(0);
  } catch (err) {
    console.error('Purge error:', err);
    process.exit(1);
  }
}

main();
