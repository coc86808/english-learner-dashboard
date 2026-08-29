import { hscVocabularyList, buildQuestionsDatabase, hscQuestionsList } from '../src/data/questions/hscQuestionsData.js';

console.log('====================================================');
console.log('🔬 DEEP-DIVE STRESS TEST & DATA INTEGRITY AUDIT');
console.log('====================================================\n');

// 1. Audit words with empty antonyms/synonyms
console.log('--- 1. Words with Empty Antonyms or Synonyms ---');
const emptyAntWords = hscVocabularyList.filter(item => !item.antonyms || item.antonyms.trim() === '');
console.log(`Words without antonyms (${emptyAntWords.length}):`);
emptyAntWords.forEach((w, i) => {
  console.log(`  ${i + 1}. [${w.id}] "${w.word}" (${w.partsOfSpeech}) in ${w.unit}`);
  console.log(`     Bangla: ${w.bengaliMeaning}`);
  console.log(`     Synonyms: "${w.synonyms}"`);
  console.log(`     Antonyms: "${w.antonyms}"`);
});

const emptySynWords = hscVocabularyList.filter(item => !item.synonyms || item.synonyms.trim() === '');
console.log(`\nWords without synonyms (${emptySynWords.length}):`);
emptySynWords.forEach((w, i) => {
  console.log(`  ${i + 1}. [${w.id}] "${w.word}" (${w.partsOfSpeech}) in ${w.unit}`);
});

// 2. Audit Distractor generation and Option Uniqueness across all 613 questions
console.log('\n--- 2. Question Distractors and Uniqueness Audit ---');
let questionsWithDupOptions = 0;
let questionsWithEmptyOptions = 0;

hscQuestionsList.forEach((q, idx) => {
  if (q.options.some(opt => !opt || opt.trim() === '')) {
    questionsWithEmptyOptions++;
    console.log(`[EMPTY OPTION] Question #${idx} [${q.id}] for "${q.word}":`, q.options);
  }
  const uniqueOpts = new Set(q.options.map(opt => opt.trim().toLowerCase()));
  if (uniqueOpts.size < 4) {
    questionsWithDupOptions++;
    console.log(`[DUPLICATE OPTION] Question #${idx} [${q.id}] (${q.category}) for "${q.word}":`, q.options);
  }
});
console.log(`Total questions with duplicate options: ${questionsWithDupOptions}`);
console.log(`Total questions with empty options: ${questionsWithEmptyOptions}`);

// 3. Check for malformed characters, NaN, null, undefined in any item field
console.log('\n--- 3. Checking for Malformed Fields / Corrupted Strings ---');
let fieldErrors = 0;
hscVocabularyList.forEach((item, idx) => {
  for (const [key, val] of Object.entries(item)) {
    if (val === null || val === undefined) {
      fieldErrors++;
      console.log(`Item #${idx} [${item.word}] field "${key}" is ${val}`);
    }
    if (typeof val === 'string' && (val.includes('undefined') || val.includes('null') || val.includes('[object Object]'))) {
      fieldErrors++;
      console.log(`Item #${idx} [${item.word}] field "${key}" contains corrupted substring: "${val}"`);
    }
  }
});
console.log(`Field corruption errors found: ${fieldErrors}`);

// 4. Verify Bengali numerals and string formatting across all hscUnits lessons
console.log('\n--- 4. Lesson Unit ID Consistency ---');
const unitIdsInUnits = new Set();
// hscUnits check
import { hscUnits } from '../src/data/hscUnitsData.js';
hscUnits.forEach(u => {
  u.lessons.forEach(l => {
    unitIdsInUnits.add(l.id);
  });
});
console.log('Available lesson IDs in hscUnitsData:', Array.from(unitIdsInUnits));

