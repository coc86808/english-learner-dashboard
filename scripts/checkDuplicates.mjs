import { hscVocabularyList } from '../src/data/questions/hscQuestionsData.js';

const words = hscVocabularyList.map((item, idx) => ({ idx, id: item.id, word: item.word, unit: item.unit }));

console.log('--- Checking for near-duplicate or stemming duplicates ---');
for (let i = 0; i < words.length; i++) {
  for (let j = i + 1; j < words.length; j++) {
    const w1 = words[i].word.toLowerCase();
    const w2 = words[j].word.toLowerCase();
    if (w1 === w2) {
      console.log(`EXACT DUPLICATE: "${words[i].word}" (idx ${i}, ${words[i].id}, ${words[i].unit}) vs (idx ${j}, ${words[j].id}, ${words[j].unit})`);
    } else if (w1 + 's' === w2 || w2 + 's' === w1 || w1 + 'es' === w2 || w2 + 'es' === w1) {
      console.log(`PLURAL VARIATION: "${words[i].word}" vs "${words[j].word}"`);
    }
  }
}
