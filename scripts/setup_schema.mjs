import fs from 'fs';
import pg from 'pg';

async function run() {
  const sql = fs.readFileSync('database_schema.sql', 'utf8');
  const client = new pg.Client({
    host: 'aws-0-ap-northeast-1.pooler.supabase.com',
    port: 6543,
    database: 'postgres',
    user: 'postgres.rxlvwdioskvwypyhifbt',
    password: 's9R8B2PJjlc54g9k',
    ssl: { rejectUnauthorized: false }
  });

  await client.connect();
  console.log('Connected to PostgreSQL!');
  await client.query(sql);
  console.log('Database schema successfully executed!');

  const tables = await client.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';");
  console.log('Live Tables:', tables.rows.map(r => r.table_name));

  await client.end();
}

run().catch(err => {
  console.error('Migration failed:', err);
  process.exit(1);
});
