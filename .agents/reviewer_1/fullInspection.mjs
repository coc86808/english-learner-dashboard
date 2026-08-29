import { hscVocabularyList } from '../../src/data/questions/hscQuestionsData.js';

console.log('--- Full Semantic Inspection of 156 Entries ---');

hscVocabularyList.forEach((item, i) => {
  const issues = [];
  // Check empty fields
  if (!item.id) issues.push('missing id');
  if (!item.word) issues.push('missing word');
  if (!item.partsOfSpeech) issues.push('missing partsOfSpeech');
  if (!item.bengaliMeaning) issues.push('missing bengaliMeaning');
  if (!item.englishMeaning) issues.push('missing englishMeaning');
  if (!item.exampleSentence) issues.push('missing exampleSentence');
  if (!item.unit) issues.push('missing unit');
  if (!item.boardExamTag) issues.push('missing boardExamTag');

  // Check punctuation/format
  if (item.synonyms && item.synonyms.includes(';')) issues.push('synonyms contains semicolon');
  if (item.antonyms && item.antonyms.includes(';')) issues.push('antonyms contains semicolon');

  if (issues.length > 0) {
    console.log(`[Item ${i+1}] ${item.id} (${item.word}): ${issues.join(', ')}`);
  }
});

console.log('--- Completed Semantic Inspection ---');
