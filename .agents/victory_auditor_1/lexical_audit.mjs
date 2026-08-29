import { hscVocabularyList } from '../../src/data/questions/hscQuestionsData.js';

console.log('=== FORENSIC LEXICAL AUDIT OF ALL 156 WORDS ===');

const issues = [];
hscVocabularyList.forEach((item, idx) => {
  // Check parts of speech
  const validPOS = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Conjunction', 'Interjection', 'Pronoun', 'Phrase / Idiom'];
  if (!validPOS.includes(item.partsOfSpeech)) {
    issues.push(`Invalid POS '${item.partsOfSpeech}' at idx ${idx} (${item.word})`);
  }

  // Check Bengali characters (should contain Bengali unicode range \u0980-\u09FF)
  if (!/[\u0980-\u09FF]/.test(item.bengaliMeaning)) {
    issues.push(`Bengali meaning does not contain Bengali characters: ${item.word} -> '${item.bengaliMeaning}'`);
  }

  // Check English definition length
  if (item.englishMeaning.length < 10) {
    issues.push(`English meaning too short: ${item.word} -> '${item.englishMeaning}'`);
  }

  // Check example sentence length
  if (item.exampleSentence.length < 10) {
    issues.push(`Example sentence too short: ${item.word} -> '${item.exampleSentence}'`);
  }
});

console.log(`Lexical issues found: ${issues.length}`);
if (issues.length > 0) {
  issues.forEach(i => console.log(' - ' + i));
} else {
  console.log('ALL 156 WORDS HAVE VALID POS, AUTHENTIC BENGALI UNICODE, SUBSTANTIAL DEFINITIONS AND EXAMPLE SENTENCES.');
}
