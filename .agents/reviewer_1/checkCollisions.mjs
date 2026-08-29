import { buildQuestionsDatabase } from '../../src/data/questions/hscQuestionsData.js';

const questions = buildQuestionsDatabase();
console.log(`Auditing all ${questions.length} generated questions for option collisions...\n`);

let collisions = [];

questions.forEach(q => {
  const optSet = new Set(q.options.map(o => o.trim().toLowerCase()));
  if (optSet.size !== 4) {
    collisions.push({
      id: q.id,
      category: q.category,
      word: q.word,
      options: q.options
    });
  }
});

console.log('Total collisions found:', collisions.length);
if (collisions.length > 0) {
  console.log(JSON.stringify(collisions, null, 2));
}
