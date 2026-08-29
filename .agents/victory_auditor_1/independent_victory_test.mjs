import { hscVocabularyList, hscQuestionsList, buildQuestionsDatabase, smartInterleaveQuestions, getFilteredCategoryQuestions } from '../../src/data/questions/hscQuestionsData.js';
import { hscUnits } from '../../src/data/hscUnitsData.js';
import assert from 'assert';

console.log('================================================================');
console.log('   INDEPENDENT VICTORY AUDIT SUITE — POST-VICTORY VERIFICATION');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function check(desc, condition, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${desc}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${desc} -> ${details}`);
    failures.push({ desc, details });
  }
}

// -----------------------------------------------------------------------------
// TEST SUITE 1: VOCABULARY LIST SCHEMA & DATA INTEGRITY (156 WORDS)
// -----------------------------------------------------------------------------
console.log('--- TEST SUITE 1: 156 Vocabulary Items Data Integrity ---');

check('Vocabulary list length is exactly 156', hscVocabularyList.length === 156, `Got ${hscVocabularyList.length}`);

const validPOS = ['Noun', 'Verb', 'Adjective', 'Adverb', 'Preposition', 'Conjunction', 'Interjection', 'Pronoun', 'Phrase / Idiom'];
const seenIds = new Set();
const seenWords = new Map();
let selfSynonymCount = 0;
let selfAntonymCount = 0;
let synAntCollisionCount = 0;
let emptyMeaningCount = 0;
let emptyBengaliCount = 0;
let emptyExampleCount = 0;
let invalidPOSCount = 0;
const emptyAntonymWords = [];
const emptySynonymWords = [];

hscVocabularyList.forEach((item, idx) => {
  // Check unique IDs
  if (seenIds.has(item.id)) {
    failures.push({ desc: `Duplicate vocab ID: ${item.id}`, details: `Index: ${idx}` });
  }
  seenIds.add(item.id);

  if (!seenWords.has(item.word.toLowerCase())) {
    seenWords.set(item.word.toLowerCase(), []);
  }
  seenWords.get(item.word.toLowerCase()).push({ id: item.id, unit: item.unit });

  // Basic required fields
  if (!item.word || item.word.trim() === '') failures.push({ desc: `Empty word at idx ${idx}`, details: item.id });
  if (!item.englishMeaning || item.englishMeaning.trim() === '') emptyMeaningCount++;
  if (!item.bengaliMeaning || item.bengaliMeaning.trim() === '') emptyBengaliCount++;
  if (!item.exampleSentence || item.exampleSentence.trim() === '') emptyExampleCount++;
  if (!item.partsOfSpeech || item.partsOfSpeech.trim() === '') invalidPOSCount++;

  const syns = (item.synonyms || '').split(',').map(s => s.trim()).filter(Boolean);
  const ants = (item.antonyms || '').split(',').map(s => s.trim()).filter(Boolean);

  if (syns.length === 0) emptySynonymWords.push(item.word);
  if (ants.length === 0) emptyAntonymWords.push(item.word);

  const wordLower = item.word.toLowerCase();
  const synsLower = syns.map(s => s.toLowerCase());
  const antsLower = ants.map(a => a.toLowerCase());

  // Check self-synonyms (tautology: word in synonyms)
  if (synsLower.includes(wordLower)) {
    selfSynonymCount++;
    failures.push({ desc: `Self-synonym found in ${item.word}`, details: `Synonyms: ${item.synonyms}` });
  }

  // Check self-antonyms (word in antonyms)
  if (antsLower.includes(wordLower)) {
    selfAntonymCount++;
    failures.push({ desc: `Self-antonym found in ${item.word}`, details: `Antonyms: ${item.antonyms}` });
  }

  // Check syn vs ant collisions
  const commonSynAnt = synsLower.filter(s => antsLower.includes(s));
  if (commonSynAnt.length > 0) {
    synAntCollisionCount++;
    failures.push({ desc: `Synonym and Antonym overlap in ${item.word}`, details: `Overlaps: ${commonSynAnt.join(', ')}` });
  }
});

check('Unique vocab IDs across all 156 entries', seenIds.size === 156, `Got ${seenIds.size}`);
check('No empty English meanings', emptyMeaningCount === 0, `Got ${emptyMeaningCount}`);
check('No empty Bengali meanings', emptyBengaliCount === 0, `Got ${emptyBengaliCount}`);
check('No empty example sentences', emptyExampleCount === 0, `Got ${emptyExampleCount}`);
check('No missing parts of speech', invalidPOSCount === 0, `Got ${invalidPOSCount}`);
check('Zero self-synonyms (no word is a synonym of itself)', selfSynonymCount === 0, `Found ${selfSynonymCount}`);
check('Zero self-antonyms (no word is an antonym of itself)', selfAntonymCount === 0, `Found ${selfAntonymCount}`);
check('Zero synonym-antonym overlaps (no word has same term as syn and ant)', synAntCollisionCount === 0, `Found ${synAntCollisionCount}`);
check('Zero words with empty synonyms', emptySynonymWords.length === 0, `Empty synonyms in: ${emptySynonymWords.join(', ')}`);
check('Words with empty antonyms match expected 11 legitimate non-opposable words', 
  emptyAntonymWords.length === 11 && 
  ['Personnel', 'Percussion', 'Scripture', 'Twig', 'Chopsticks', 'Utensils', 'Grocery', 'Cheek', 'Cue', 'Gristle', 'Gravy'].every(w => emptyAntonymWords.includes(w)),
  `Actual empty antonym words: [${emptyAntonymWords.join(', ')}]`
);

// -----------------------------------------------------------------------------
// TEST SUITE 2: MCQ GENERATION ENGINE & QUESTION PROPERTIES (613 QUESTIONS)
// -----------------------------------------------------------------------------
console.log('\n--- TEST SUITE 2: Generated MCQ Pool Integrity ---');

const qList = buildQuestionsDatabase();
check('buildQuestionsDatabase() returns exactly 613 questions', qList.length === 613, `Got ${qList.length}`);

const categoryCounts = { synonyms: 0, antonyms: 0, english_meaning: 0, bangla_meaning: 0 };
let invalidOptionCount = 0;
let blankOptionCount = 0;
let duplicateOptionsInQuestion = 0;
let invalidCorrectOptionIndex = 0;
let mismatchCorrectAnswer = 0;
const qIds = new Set();

qList.forEach((q, idx) => {
  if (qIds.has(q.id)) {
    failures.push({ desc: `Duplicate question ID: ${q.id}`, details: `At index ${idx}` });
  }
  qIds.add(q.id);

  if (categoryCounts[q.category] !== undefined) {
    categoryCounts[q.category]++;
  } else {
    failures.push({ desc: `Unknown category: ${q.category}`, details: `Question ID: ${q.id}` });
  }

  // Check options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    invalidOptionCount++;
    failures.push({ desc: `Question ${q.id} does not have exactly 4 options`, details: `Count: ${q.options?.length}` });
  } else {
    const trimmedOptions = q.options.map(o => (typeof o === 'string' ? o.trim() : ''));
    if (trimmedOptions.some(o => o === '')) {
      blankOptionCount++;
      failures.push({ desc: `Question ${q.id} contains blank/empty option`, details: `Options: ${JSON.stringify(q.options)}` });
    }

    // Check distinct options
    const uniqueOptions = new Set(trimmedOptions.map(o => o.toLowerCase()));
    if (uniqueOptions.size !== 4) {
      duplicateOptionsInQuestion++;
      failures.push({ desc: `Question ${q.id} has duplicate options`, details: `Options: ${JSON.stringify(q.options)}` });
    }
  }

  // Check correct option
  if (typeof q.correctOption !== 'number' || q.correctOption < 0 || q.correctOption > 3) {
    invalidCorrectOptionIndex++;
    failures.push({ desc: `Invalid correctOption in ${q.id}`, details: `correctOption: ${q.correctOption}` });
  } else {
    const correctVal = q.options[q.correctOption];
    if (!correctVal || (typeof correctVal === 'string' && correctVal.trim() === '')) {
      mismatchCorrectAnswer++;
      failures.push({ desc: `Correct option value is empty in ${q.id}`, details: `Value: ${correctVal}` });
    }
  }
});

check('Unique question IDs for all 613 questions', qIds.size === 613, `Got ${qIds.size}`);
check('Category counts: 156 Synonyms', categoryCounts.synonyms === 156, `Got ${categoryCounts.synonyms}`);
check('Category counts: 145 Antonyms (156 - 11 non-opposable = 145)', categoryCounts.antonyms === 145, `Got ${categoryCounts.antonyms}`);
check('Category counts: 156 English Meanings', categoryCounts.english_meaning === 156, `Got ${categoryCounts.english_meaning}`);
check('Category counts: 156 Bangla Meanings', categoryCounts.bangla_meaning === 156, `Got ${categoryCounts.bangla_meaning}`);
check('Zero questions with wrong number of options (must be exactly 4)', invalidOptionCount === 0, `Found ${invalidOptionCount}`);
check('Zero questions with blank/empty options', blankOptionCount === 0, `Found ${blankOptionCount}`);
check('Zero questions with duplicate options (distractor collision)', duplicateOptionsInQuestion === 0, `Found ${duplicateOptionsInQuestion}`);
check('Zero invalid correctOption indices', invalidCorrectOptionIndex === 0, `Found ${invalidCorrectOptionIndex}`);
check('Zero empty correct option values', mismatchCorrectAnswer === 0, `Found ${mismatchCorrectAnswer}`);

// -----------------------------------------------------------------------------
// TEST SUITE 3: INTERLEAVER & FILTER FUNCTION VERIFICATION
// -----------------------------------------------------------------------------
console.log('\n--- TEST SUITE 3: Interleaving and Filtering Engine ---');

const interleaved = smartInterleaveQuestions(qList);
check('Interleaved question count preserves total questions (613)', interleaved.length === 613, `Got ${interleaved.length}`);

let backToBackSameWordCount = 0;
for (let i = 0; i < interleaved.length - 1; i++) {
  if (interleaved[i].word.toLowerCase() === interleaved[i + 1].word.toLowerCase()) {
    backToBackSameWordCount++;
  }
}
check('smartInterleaveQuestions ensures NO consecutive duplicate words', backToBackSameWordCount === 0, `Found ${backToBackSameWordCount} back-to-back same word occurrences`);

const synFiltered = getFilteredCategoryQuestions(['synonyms']);
check('getFilteredCategoryQuestions(["synonyms"]) returns 156 questions', synFiltered.length === 156, `Got ${synFiltered.length}`);

const antFiltered = getFilteredCategoryQuestions(['antonyms']);
check('getFilteredCategoryQuestions(["antonyms"]) returns 145 questions', antFiltered.length === 145, `Got ${antFiltered.length}`);

const allFiltered = getFilteredCategoryQuestions([]);
check('getFilteredCategoryQuestions([]) default returns all 613 questions', allFiltered.length === 613, `Got ${allFiltered.length}`);

// -----------------------------------------------------------------------------
// TEST SUITE 4: CURRICULUM SYNCHRONIZATION & UNIT FILTER INTEGRITY
// -----------------------------------------------------------------------------
console.log('\n--- TEST SUITE 4: Curriculum Sync & Component Filter Isolation ---');

const u1 = hscUnits.find(u => u.id === 'unit-1');
const u10 = hscUnits.find(u => u.id === 'unit-10');

check('Unit 1 totalWords is 46', u1?.totalWords === 46, `Got ${u1?.totalWords}`);
check('Unit 1 Lesson 1 wordsCount is 46', u1?.lessons[0].wordsCount === 46, `Got ${u1?.lessons[0].wordsCount}`);
check('Unit 1 Lesson 1 questionsCount is "১৮০ টি প্রশ্ন"', u1?.lessons[0].questionsCount === '১৮০ টি প্রশ্ন', `Got ${u1?.lessons[0].questionsCount}`);

check('Unit 10 totalWords is 110', u10?.totalWords === 110, `Got ${u10?.totalWords}`);
check('Unit 10 Lesson 1 wordsCount is 74', u10?.lessons[0].wordsCount === 74, `Got ${u10?.lessons[0].wordsCount}`);
check('Unit 10 Lesson 1 questionsCount is "২৯০ টি প্রশ্ন"', u10?.lessons[0].questionsCount === '২৯০ টি প্রশ্ন', `Got ${u10?.lessons[0].questionsCount}`);
check('Unit 10 Lesson 2 wordsCount is 36', u10?.lessons[1].wordsCount === 36, `Got ${u10?.lessons[1].wordsCount}`);
check('Unit 10 Lesson 2 questionsCount is "১৪৩ টি প্রশ্ন"', u10?.lessons[1].questionsCount === '১৪৩ টি প্রশ্ন', `Got ${u10?.lessons[1].questionsCount}`);

// Test UI Filter simulation for Unit 1 vs Unit 10 isolation
const unit1FilterPattern = (unitStr) => unitStr && (unitStr.toLowerCase().includes('unit 1:') || new RegExp('\\bunit 1\\b', 'i').test(unitStr) || unitStr.toLowerCase().includes('education and life'));
const unit10FilterPattern = (unitStr) => unitStr && (unitStr.toLowerCase().includes('unit 10:') || new RegExp('\\bunit 10\\b', 'i').test(unitStr) || unitStr.toLowerCase().includes('lifestyle'));

const u1Vocab = hscVocabularyList.filter(item => unit1FilterPattern(item.unit));
const u10Vocab = hscVocabularyList.filter(item => unit10FilterPattern(item.unit));
const u1Questions = hscQuestionsList.filter(q => unit1FilterPattern(q.unit));
const u10Questions = hscQuestionsList.filter(q => unit10FilterPattern(q.unit));

check('Unit 1 filter matches exactly 46 vocab items (0 leakage from Unit 10)', u1Vocab.length === 46, `Got ${u1Vocab.length}`);
check('Unit 10 filter matches exactly 110 vocab items (0 leakage from Unit 1)', u10Vocab.length === 110, `Got ${u10Vocab.length}`);
check('Unit 1 questions filter matches exactly 180 questions', u1Questions.length === 180, `Got ${u1Questions.length}`);
check('Unit 10 questions filter matches exactly 433 questions (290 + 143)', u10Questions.length === 433, `Got ${u10Questions.length}`);
check('Sum of filtered questions (180 + 433 = 613)', u1Questions.length + u10Questions.length === 613, `Got ${u1Questions.length + u10Questions.length}`);

// -----------------------------------------------------------------------------
// SUMMARY
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`AUDIT RESULTS: ${passedTests}/${totalTests} CHECKS PASSED (${failedTests} FAILURES)`);
console.log('================================================================');

if (failedTests > 0) {
  console.error('\nFAILURE DETAILS:');
  failures.forEach(f => console.error(`- ${f.desc}: ${f.details}`));
  process.exit(1);
} else {
  console.log('\n>>> ALL INDEPENDENT TESTS PASSED WITH ZERO FAILURES <<<');
  process.exit(0);
}
