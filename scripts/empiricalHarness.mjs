import {
  hscVocabularyList,
  hscQuestionsList,
  buildQuestionsDatabase,
  getFilteredCategoryQuestions,
  smartInterleaveQuestions
} from '../src/data/questions/hscQuestionsData.js';
import { hscUnits } from '../src/data/hscUnitsData.js';

console.log('================================================================');
console.log('   EMPIRICAL CHALLENGER STRESS HARNESS & VERIFICATION SUITE    ');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failureDetails = [];

function assertTest(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`[PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`[FAIL] ${testName} - ${details}`);
    failureDetails.push({ testName, details });
  }
}

// -----------------------------------------------------------------------------
// SUITE 1: DATASET INTEGRITY & DEDUPLICATION (hscVocabularyList)
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 1: Vocabulary Dataset (156 Items) ---');

assertTest(
  Array.isArray(hscVocabularyList) && hscVocabularyList.length === 156,
  'Vocabulary list has exactly 156 items',
  `Found length: ${hscVocabularyList.length}`
);

// Check duplicate IDs
const idMap = new Map();
const duplicateIds = [];
hscVocabularyList.forEach(v => {
  if (idMap.has(v.id)) duplicateIds.push(v.id);
  idMap.set(v.id, (idMap.get(v.id) || 0) + 1);
});
assertTest(
  duplicateIds.length === 0,
  'No duplicate IDs in hscVocabularyList',
  `Duplicates: ${JSON.stringify(duplicateIds)}`
);

// Check duplicate words
const wordMap = new Map();
const duplicateWords = [];
hscVocabularyList.forEach(v => {
  const norm = v.word.trim().toLowerCase();
  if (wordMap.has(norm)) duplicateWords.push({ word: v.word, id: v.id, existingId: wordMap.get(norm) });
  wordMap.set(norm, v.id);
});
assertTest(
  duplicateWords.length === 0,
  'No duplicate words in hscVocabularyList',
  `Duplicates: ${JSON.stringify(duplicateWords)}`
);

// Check field validity on all 156 items
let invalidFieldCount = 0;
const invalidFieldItems = [];
hscVocabularyList.forEach((v, idx) => {
  const missing = [];
  if (!v.id || typeof v.id !== 'string') missing.push('id');
  if (!v.word || typeof v.word !== 'string') missing.push('word');
  if (!v.bengaliMeaning || typeof v.bengaliMeaning !== 'string') missing.push('bengaliMeaning');
  if (!v.partsOfSpeech || typeof v.partsOfSpeech !== 'string') missing.push('partsOfSpeech');
  if (!v.englishMeaning || typeof v.englishMeaning !== 'string') missing.push('englishMeaning');
  if (!v.exampleSentence || typeof v.exampleSentence !== 'string') missing.push('exampleSentence');
  if (!v.unit || typeof v.unit !== 'string') missing.push('unit');
  if (!v.boardExamTag || typeof v.boardExamTag !== 'string') missing.push('boardExamTag');

  if (missing.length > 0) {
    invalidFieldCount++;
    invalidFieldItems.push({ index: idx, id: v.id, word: v.word, missing });
  }
});
assertTest(
  invalidFieldCount === 0,
  'All 156 items have mandatory fields (id, word, bengaliMeaning, partsOfSpeech, englishMeaning, exampleSentence, unit, boardExamTag)',
  `Invalid items: ${JSON.stringify(invalidFieldItems)}`
);

// Count words without antonyms or synonyms
const wordsNoSyn = hscVocabularyList.filter(v => !v.synonyms || v.synonyms.trim() === '');
const wordsNoAnt = hscVocabularyList.filter(v => !v.antonyms || v.antonyms.trim() === '');
console.log(`[INFO] Words without synonyms: ${wordsNoSyn.length}`);
console.log(`[INFO] Words without antonyms: ${wordsNoAnt.length} (Expected: 11 items skipped for antonym questions)`);

// -----------------------------------------------------------------------------
// SUITE 2: MCQ GENERATION INVARIANTS (hscQuestionsList)
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 2: Generated Questions Invariants (613 Questions) ---');

assertTest(
  Array.isArray(hscQuestionsList) && hscQuestionsList.length === 613,
  'Total questions generated is exactly 613',
  `Found: ${hscQuestionsList.length}`
);

// Check Unique Question IDs
const qIdMap = new Map();
const duplicateQIds = [];
hscQuestionsList.forEach(q => {
  if (qIdMap.has(q.id)) duplicateQIds.push(q.id);
  qIdMap.set(q.id, true);
});
assertTest(
  duplicateQIds.length === 0,
  'All 613 Question IDs are strictly unique',
  `Duplicate QIDs: ${JSON.stringify(duplicateQIds)}`
);

// Check Option Counts & Non-Empty Strings
let invalidOptionCount = 0;
let emptyOptionDetails = [];
hscQuestionsList.forEach(q => {
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    invalidOptionCount++;
    emptyOptionDetails.push({ id: q.id, issue: `options length is ${q.options?.length}` });
  } else {
    q.options.forEach((opt, optIdx) => {
      if (typeof opt !== 'string' || opt.trim() === '') {
        invalidOptionCount++;
        emptyOptionDetails.push({ id: q.id, optIdx, val: opt, issue: 'empty or non-string' });
      }
    });
  }
});
assertTest(
  invalidOptionCount === 0,
  'Every question has exactly 4 non-empty, non-null, valid string options',
  `Issues found: ${JSON.stringify(emptyOptionDetails.slice(0, 5))}`
);

// Check CorrectOption Range and Semantic Mapping
let invalidCorrectOptionCount = 0;
let semanticMismatchCount = 0;
const semanticMismatches = [];

hscQuestionsList.forEach(q => {
  if (typeof q.correctOption !== 'number' || q.correctOption < 0 || q.correctOption > 3) {
    invalidCorrectOptionCount++;
  } else {
    const selectedText = q.options[q.correctOption];
    // Verify that options[correctOption] matches the expected ground truth
    if (q.category === 'synonyms') {
      const primarySyn = q.synonyms.split(',')[0].trim();
      if (selectedText !== primarySyn) {
        semanticMismatchCount++;
        semanticMismatches.push({ id: q.id, category: q.category, selectedText, expected: primarySyn });
      }
    } else if (q.category === 'antonyms') {
      const primaryAnt = q.antonyms.split(',')[0].trim();
      if (selectedText !== primaryAnt) {
        semanticMismatchCount++;
        semanticMismatches.push({ id: q.id, category: q.category, selectedText, expected: primaryAnt });
      }
    } else if (q.category === 'english_meaning') {
      if (!selectedText || selectedText.trim() === '') {
        semanticMismatchCount++;
        semanticMismatches.push({ id: q.id, category: q.category, selectedText });
      }
    } else if (q.category === 'bangla_meaning') {
      const primaryBng = q.bengaliMeaning.split('/')[0].trim();
      if (selectedText !== primaryBng) {
        semanticMismatchCount++;
        semanticMismatches.push({ id: q.id, category: q.category, selectedText, expected: primaryBng });
      }
    }
  }
});

assertTest(
  invalidCorrectOptionCount === 0,
  'correctOption is strictly within 0..3 for all 613 questions',
  `Invalid count: ${invalidCorrectOptionCount}`
);

assertTest(
  semanticMismatchCount === 0,
  'correctOption semantically points to the true expected answer for all 613 questions',
  `Mismatches: ${JSON.stringify(semanticMismatches.slice(0, 5))}`
);

// Check Duplicate Options within individual questions
let duplicateOptionsInQCount = 0;
const duplicateOptionsDetails = [];

hscQuestionsList.forEach(q => {
  const normOptions = q.options.map(o => (typeof o === 'string' ? o.trim().toLowerCase() : o));
  const seen = new Set();
  const dupes = [];
  normOptions.forEach(opt => {
    if (seen.has(opt)) dupes.push(opt);
    seen.add(opt);
  });
  if (dupes.length > 0) {
    duplicateOptionsInQCount++;
    duplicateOptionsDetails.push({ id: q.id, word: q.word, category: q.category, dupes, options: q.options });
  }
});

assertTest(
  duplicateOptionsInQCount === 0,
  'No question has duplicate options among its 4 choices',
  `Found ${duplicateOptionsInQCount} questions with duplicate options: ${JSON.stringify(duplicateOptionsDetails.slice(0, 10), null, 2)}`
);

// -----------------------------------------------------------------------------
// SUITE 3: QUESTION TYPE DISTRIBUTION & UNIT BREAKDOWN
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 3: Question Distribution & Breakdown ---');

const synCount = hscQuestionsList.filter(q => q.category === 'synonyms').length;
const antCount = hscQuestionsList.filter(q => q.category === 'antonyms').length;
const engCount = hscQuestionsList.filter(q => q.category === 'english_meaning').length;
const bngCount = hscQuestionsList.filter(q => q.category === 'bangla_meaning').length;

console.log(`[INFO] Category Counts: Synonyms=${synCount}, Antonyms=${antCount}, English Meaning=${engCount}, Bangla Meaning=${bngCount}`);
console.log(`[INFO] Total Sum: ${synCount + antCount + engCount + bngCount}`);

assertTest(synCount === 156, 'Synonym questions count equals 156 (100% of words)', `Got: ${synCount}`);
assertTest(antCount === 145, 'Antonym questions count equals 145 (156 - 11 without standard antonyms)', `Got: ${antCount}`);
assertTest(engCount === 156, 'English meaning questions count equals 156 (100% of words)', `Got: ${engCount}`);
assertTest(bngCount === 156, 'Bangla meaning questions count equals 156 (100% of words)', `Got: ${bngCount}`);

// Breakdown by Unit / Lesson
const u1l1Questions = hscQuestionsList.filter(q => q.id.startsWith('hsc-u1-l1-'));
const u10l1Questions = hscQuestionsList.filter(q => q.id.startsWith('hsc-u10-l1-'));
const u10l2Questions = hscQuestionsList.filter(q => q.id.startsWith('hsc-u10-l2-'));

console.log(`[INFO] Lesson Counts: U1L1=${u1l1Questions.length}, U10L1=${u10l1Questions.length}, U10L2=${u10l2Questions.length}`);

assertTest(u1l1Questions.length === 180, 'Unit 1 Lesson 1 has 180 questions (46 words, 4 skipped antonyms: 46*4 - 4 = 180)', `Got ${u1l1Questions.length}`);
assertTest(u10l1Questions.length === 290, 'Unit 10 Lesson 1 has 290 questions (74 words, 6 skipped antonyms: 74*4 - 6 = 290)', `Got ${u10l1Questions.length}`);
assertTest(u10l2Questions.length === 143, 'Unit 10 Lesson 2 has 143 questions (36 words, 1 skipped antonym: 36*4 - 1 = 143)', `Got ${u10l2Questions.length}`);

// -----------------------------------------------------------------------------
// SUITE 4: CURRICULUM SYNCHRONIZATION (hscUnitsData.js)
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 4: Curriculum Sync with hscUnitsData.js ---');

const u1 = hscUnits.find(u => u.id === 'unit-1');
const u10 = hscUnits.find(u => u.id === 'unit-10');

assertTest(u1 && u1.totalWords === 46, 'Unit 1 totalWords is 46', `Got: ${u1?.totalWords}`);
const u1l1_meta = u1?.lessons?.find(l => l.id === 'u1-l1');
assertTest(u1l1_meta?.wordsCount === 46, 'Unit 1 Lesson 1 wordsCount is 46', `Got: ${u1l1_meta?.wordsCount}`);
assertTest(u1l1_meta?.questionsCount === '১৮০ টি প্রশ্ন', 'Unit 1 Lesson 1 questionsCount is "১৮০ টি প্রশ্ন"', `Got: ${u1l1_meta?.questionsCount}`);

assertTest(u10 && u10.totalWords === 110, 'Unit 10 totalWords is 110 (74 + 36)', `Got: ${u10?.totalWords}`);
const u10l1_meta = u10?.lessons?.find(l => l.id === 'u10-l1');
const u10l2_meta = u10?.lessons?.find(l => l.id === 'u10-l2');
assertTest(u10l1_meta?.wordsCount === 74, 'Unit 10 Lesson 1 wordsCount is 74', `Got: ${u10l1_meta?.wordsCount}`);
assertTest(u10l1_meta?.questionsCount === '২৯০ টি প্রশ্ন', 'Unit 10 Lesson 1 questionsCount is "২৯০ টি প্রশ্ন"', `Got: ${u10l1_meta?.questionsCount}`);
assertTest(u10l2_meta?.wordsCount === 36, 'Unit 10 Lesson 2 wordsCount is 36', `Got: ${u10l2_meta?.wordsCount}`);
assertTest(u10l2_meta?.questionsCount === '১৪৩ টি প্রশ্ন', 'Unit 10 Lesson 2 questionsCount is "১৪৩ টি প্রশ্ন"', `Got: ${u10l2_meta?.questionsCount}`);

// -----------------------------------------------------------------------------
// SUITE 5: ADVERSARIAL STRESS TESTING (buildQuestionsDatabase & Interleaver)
// -----------------------------------------------------------------------------
console.log('\n--- SUITE 5: Adversarial Stress Testing on Engine & Interleaver ---');

// 5.1 Test Empty/Edge Category Filter
const emptyCat = getFilteredCategoryQuestions([]);
assertTest(
  emptyCat.length === 613,
  'getFilteredCategoryQuestions([]) gracefully defaults to all 613 questions',
  `Got: ${emptyCat.length}`
);

const singleCat = getFilteredCategoryQuestions(['synonyms']);
assertTest(
  singleCat.length === 156,
  'getFilteredCategoryQuestions(["synonyms"]) returns exactly 156 questions',
  `Got: ${singleCat.length}`
);

const invalidCat = getFilteredCategoryQuestions(['non_existent_category']);
assertTest(
  invalidCat.length === 0,
  'getFilteredCategoryQuestions(["non_existent_category"]) returns empty array cleanly without crashing',
  `Got: ${invalidCat.length}`
);

// 5.2 Test Interleaver on Edge Cases
const emptyInterleave = smartInterleaveQuestions([]);
assertTest(
  Array.isArray(emptyInterleave) && emptyInterleave.length === 0,
  'smartInterleaveQuestions([]) returns [] without crashing',
  `Got: ${JSON.stringify(emptyInterleave)}`
);

const singleInterleave = smartInterleaveQuestions([{ id: 'q1', word: 'Test' }]);
assertTest(
  singleInterleave.length === 1 && singleInterleave[0].id === 'q1',
  'smartInterleaveQuestions([q1]) returns [q1] without crashing',
  `Got: ${JSON.stringify(singleInterleave)}`
);

// 5.3 Test Interleaver consecutive word collision on actual questions
let consecutiveCollisions = 0;
for (let i = 0; i < emptyCat.length - 1; i++) {
  if (emptyCat[i].vocabId && emptyCat[i].vocabId === emptyCat[i + 1].vocabId) {
    consecutiveCollisions++;
  }
}
console.log(`[INFO] Consecutive same-word questions in interleaved output: ${consecutiveCollisions} / ${emptyCat.length - 1}`);
assertTest(
  consecutiveCollisions === 0,
  'smartInterleaveQuestions produces zero adjacent questions from the same vocabulary word',
  `Found ${consecutiveCollisions} adjacent identical-word collisions`
);

// -----------------------------------------------------------------------------
// SUMMARY & REPORT
// -----------------------------------------------------------------------------
console.log('\n================================================================');
console.log(`TOTAL TESTS: ${totalTests} | PASSED: ${passedTests} | FAILED: ${failedTests}`);
console.log('================================================================');

if (failedTests > 0) {
  console.log('\n--- DETAILED FAILURES ---');
  failureDetails.forEach((f, i) => {
    console.log(`${i + 1}. [${f.testName}]: ${f.details}`);
  });
  process.exit(1);
} else {
  console.log('\n>>> ALL EMPIRICAL AND ADVERSARIAL TESTS PASSED 100% <<<');
  process.exit(0);
}
