import { hscVocabularyList } from '../../src/data/questions/hscQuestionsData.js';

console.log('=== Checking all 156 entries for lexical issues ===\n');

hscVocabularyList.forEach((item, index) => {
  const syns = item.synonyms ? item.synonyms.split(',').map(s => s.trim()) : [];
  const ants = item.antonyms ? item.antonyms.split(',').map(s => s.trim()) : [];

  // Check 1: Primary synonym / antonym is empty or equals word
  if (syns.length > 0 && syns[0].toLowerCase() === item.word.toLowerCase()) {
    console.log(`[ISSUE: Tautological Primary Synonym] Item #${index+1} (${item.id}) "${item.word}": primary synonym "${syns[0]}" is the word itself.`);
  }

  // Check 2: Word in any synonym
  syns.forEach(s => {
    if (s.toLowerCase() === item.word.toLowerCase()) {
      console.log(`[ISSUE: Word in Synonyms List] Item #${index+1} (${item.id}) "${item.word}": synonym contains "${s}"`);
    }
  });

  // Check 3: Word in any antonym
  ants.forEach(a => {
    if (a.toLowerCase() === item.word.toLowerCase()) {
      console.log(`[ISSUE: Word in Antonyms List] Item #${index+1} (${item.id}) "${item.word}": antonym contains "${a}"`);
    }
  });

  // Check 4: Non-empty Bengali separators
  if (item.bengaliMeaning && !item.bengaliMeaning.includes('/') && item.bengaliMeaning.includes(',')) {
    console.log(`[NOTE: Bengali uses comma instead of slash] Item #${index+1} (${item.id}) "${item.word}": ${item.bengaliMeaning}`);
  }
});
