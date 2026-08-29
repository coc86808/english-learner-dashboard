import { hscVocabularyList } from '../../src/data/questions/hscQuestionsData.js';

console.log('--- Inspecting Verbs, Adjectives, Adverbs ---');

hscVocabularyList.filter(x => !x.partsOfSpeech || !x.partsOfSpeech.toLowerCase().includes('noun')).forEach((item, i) => {
  console.log(`[${item.id}] ${item.word} (${item.partsOfSpeech}): syn="${item.synonyms}" | ant="${item.antonyms}"`);
});
