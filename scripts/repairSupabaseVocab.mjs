import { hscVocabularyList } from '../src/data/questions/hscQuestionsData.js';

const SUPABASE_URL = 'https://rxlvwdioskvwypyhifbt.supabase.co';
const ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ4bHZ3ZGlvc2t2d3lweWhpZmJ0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk3NTA5MjksImV4cCI6MjEwNTMyNjkyOX0.dCSw834biSsYsb4p-wqbX0xxlHuP62htpYIT9bVydD0';

async function repairSupabaseVocabulary() {
  console.log('Starting Supabase vocabulary column repair...');

  const seen = new Set();
  const payload = [];

  hscVocabularyList.forEach(item => {
    const w = (item.word || '').trim();
    if (!w) return;
    const key = w.toLowerCase();
    if (seen.has(key)) return;
    seen.add(key);

    payload.push({
      word: w,
      bengali_meaning: (item.bengaliMeaning || '').trim(),
      parts_of_speech: (item.partsOfSpeech || 'Word').trim(),
      synonyms: (item.synonyms || '').trim(),
      antonyms: (item.antonyms || '').trim(),
      english_meaning: (item.englishMeaning || '').trim(),
      example_sentence: (item.exampleSentence || '').trim(),
      unit: (item.unit || '').trim(),
      board_exam_tag: (item.boardExamTag || item.unit || '').trim(),
      priority: Number(item.priority || 50),
      updated_at: new Date().toISOString()
    });
  });

  console.log(`Unique words to repair: ${payload.length}`);

  const BATCH_SIZE = 100;
  let successCount = 0;

  for (let i = 0; i < payload.length; i += BATCH_SIZE) {
    const batch = payload.slice(i, i + BATCH_SIZE);
    const res = await fetch(SUPABASE_URL + '/rest/v1/vocabulary?on_conflict=word', {
      method: 'POST',
      headers: {
        'apikey': ANON_KEY,
        'Authorization': 'Bearer ' + ANON_KEY,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify(batch)
    });

    if (res.ok) {
      successCount += batch.length;
      process.stdout.write(`Repaired ${successCount}/${payload.length} words...\r`);
    } else {
      console.error(`Batch error at offset ${i}:`, res.status, await res.text());
    }
  }

  console.log(`\nSuccessfully repaired all ${successCount} words in Supabase vocabulary table!`);
}

repairSupabaseVocabulary();
