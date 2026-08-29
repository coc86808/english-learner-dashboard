import { hscVocabularyList } from '../../src/data/questions/hscQuestionsData.js';

console.log('=== FULL AUDIT OF ITEMS 105-156 ===\n');
for (let i = 104; i < 156; i++) {
  const it = hscVocabularyList[i];
  console.log(`${i + 1}. [${it.id}] "${it.word}"`);
  console.log(`   Parts of Speech: ${it.partsOfSpeech}`);
  console.log(`   Bengali Meaning: ${it.bengaliMeaning}`);
  console.log(`   Synonyms:        ${it.synonyms}`);
  console.log(`   Antonyms:        ${it.antonyms}`);
  console.log(`   English Meaning: ${it.englishMeaning}`);
  console.log(`   Example:         ${it.exampleSentence}`);
  console.log(`   Unit/Tag:        ${it.unit} | ${it.boardExamTag}\n`);
}
