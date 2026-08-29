import { hscVocabularyList } from '../../src/data/questions/hscQuestionsData.js';

console.log('--- Inspecting all Nouns and their Antonyms ---');

hscVocabularyList.filter(x => x.partsOfSpeech && x.partsOfSpeech.toLowerCase().includes('noun')).forEach((item, i) => {
  console.log(`[${item.id}] ${item.word}: syn="${item.synonyms}" | ant="${item.antonyms}"`);
});
