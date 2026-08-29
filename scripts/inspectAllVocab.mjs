import { hscVocabularyList } from '../src/data/questions/hscQuestionsData.js';

console.log(`Auditing all ${hscVocabularyList.length} vocabulary entries:\n`);

hscVocabularyList.forEach((item, idx) => {
  console.log(`[${idx + 1}] ID: ${item.id} | Word: "${item.word}" | POS: ${item.partsOfSpeech}`);
  console.log(`    Bengali: ${item.bengaliMeaning}`);
  console.log(`    Synonyms: ${item.synonyms || '(none)'}`);
  console.log(`    Antonyms: ${item.antonyms || '(none)'}`);
  console.log(`    English: ${item.englishMeaning}`);
  console.log(`    Unit: ${item.unit}`);
  console.log(`    Board: ${item.boardExamTag}`);
  console.log('----------------------------------------------------');
});
