import { hscVocabularyList, hscQuestionsList, buildQuestionsDatabase, smartInterleaveQuestions, getFilteredCategoryQuestions } from '../src/data/questions/hscQuestionsData.js';
import { hscUnits } from '../src/data/hscUnitsData.js';
import fs from 'fs';

console.log('================================================================');
console.log('  EMPIRICAL CHALLENGER FINAL VERIFICATION HARNESS');
console.log('================================================================\n');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function assert(condition, testName, details = '') {
  totalTests++;
  if (condition) {
    passedTests++;
    console.log(`  [PASS] ${testName}`);
  } else {
    failedTests++;
    console.error(`  [FAIL] ${testName}`);
    if (details) console.error(`         -> Details: ${details}`);
    failures.push({ testName, details });
  }
}

// -------------------------------------------------------------
// 1. FLASHCARDS EXPLORER FILTER VERIFICATION
// -------------------------------------------------------------
console.log('--- 1. Testing FlashcardsExplorer Filter Logic ---');

// Emulate FlashcardsExplorer filter logic
function filterCards(selectedLessonId, list = hscVocabularyList) {
  if (selectedLessonId === 'u1-l1') {
    return list.filter(item => item.unit.includes("Unit 1:") || item.unit.includes("The Parrot's Tale"));
  } else if (selectedLessonId === 'u10-l1') {
    return list.filter(item => item.unit.includes("Unit 10: Lesson 1") || item.unit.includes("Manners Around the World"));
  } else if (selectedLessonId === 'u10-l2') {
    return list.filter(item => item.unit.includes("Unit 10: Lesson 2") || item.unit.includes("Etiquette Netquette") || item.unit.includes("Good manners always wins") || item.unit.includes("Food and Culture"));
  }
  return list;
}

const u1Cards = filterCards('u1-l1');
assert(u1Cards.length === 46, `Unit 1 (u1-l1) filters exactly 46 words`, `Got: ${u1Cards.length}`);

const u10l1Cards = filterCards('u10-l1');
assert(u10l1Cards.length === 74, `Unit 10 Lesson 1 (u10-l1) filters exactly 74 words`, `Got: ${u10l1Cards.length}`);

const u10l2Cards = filterCards('u10-l2');
assert(u10l2Cards.length === 36, `Unit 10 Lesson 2 (u10-l2) filters exactly 36 words`, `Got: ${u10l2Cards.length}`);

const u10TotalWords = u10l1Cards.length + u10l2Cards.length;
assert(u10TotalWords === 110, `Unit 10 total words (u10-l1 + u10-l2) equals exactly 110 words`, `Got: ${u10TotalWords}`);

const allCards = filterCards('all');
assert(allCards.length === 156, `All words filter equals exactly 156 words (46 + 110)`, `Got: ${allCards.length}`);

// Also check FlashcardsExplorer.jsx file content for the dropdown labels and options
const fcCode = fs.readFileSync('src/components/FlashcardsExplorer.jsx', 'utf-8');
assert(fcCode.includes("Unit 1: The Parrot's Tale (46 Words)"), "FlashcardsExplorer has 46 Words label for Unit 1");
assert(fcCode.includes("Unit 10: Manners Around the World (74 Words)"), "FlashcardsExplorer has 74 Words label for Unit 10 L1");
assert(fcCode.includes("Unit 10: Etiquette Netquette (36 Words)"), "FlashcardsExplorer has 36 Words label for Unit 10 L2");
assert(fcCode.includes("All Available Words (156 Words)"), "FlashcardsExplorer has 156 Words label for All");


// -------------------------------------------------------------
// 2. CURRICULUM SYNC IN hscUnitsData.js
// -------------------------------------------------------------
console.log('\n--- 2. Testing Curriculum Sync in hscUnitsData.js ---');
const u1Data = hscUnits.find(u => u.id === 'unit-1');
assert(u1Data !== undefined, 'Unit 1 exists in hscUnits');
assert(u1Data.totalWords === 46, `Unit 1 totalWords is 46`, `Got: ${u1Data.totalWords}`);
assert(u1Data.lessons[0].wordsCount === 46, `Unit 1 Lesson 1 wordsCount is 46`, `Got: ${u1Data.lessons[0].wordsCount}`);

const u10Data = hscUnits.find(u => u.id === 'unit-10');
assert(u10Data !== undefined, 'Unit 10 exists in hscUnits');
assert(u10Data.totalWords === 110, `Unit 10 totalWords is 110`, `Got: ${u10Data.totalWords}`);
assert(u10Data.lessons[0].wordsCount === 74, `Unit 10 Lesson 1 wordsCount is 74`, `Got: ${u10Data.lessons[0].wordsCount}`);
assert(u10Data.lessons[1].wordsCount === 36, `Unit 10 Lesson 2 wordsCount is 36`, `Got: ${u10Data.lessons[1].wordsCount}`);


// -------------------------------------------------------------
// 3. VOCABULARY LIST INTEGRITY (156 ENTRIES)
// -------------------------------------------------------------
console.log('\n--- 3. Testing Vocabulary List Integrity ---');
assert(hscVocabularyList.length === 156, `Total vocabulary list count is 156`, `Got: ${hscVocabularyList.length}`);

const vocabIds = new Set();
let duplicateVocabIds = 0;
hscVocabularyList.forEach((v, idx) => {
  if (vocabIds.has(v.id)) {
    duplicateVocabIds++;
  }
  vocabIds.add(v.id);
});
assert(duplicateVocabIds === 0, `All 156 vocabulary IDs are strictly unique`, `Duplicates: ${duplicateVocabIds}`);


// -------------------------------------------------------------
// 4. MCQ QUESTIONS GENERATION & INTEGRITY (613 QUESTIONS)
// -------------------------------------------------------------
console.log('\n--- 4. Testing MCQ Question Database Integrity ---');
assert(hscQuestionsList.length === 613, `hscQuestionsList contains exactly 613 questions`, `Got: ${hscQuestionsList.length}`);

const freshGenerated = buildQuestionsDatabase();
assert(freshGenerated.length === 613, `buildQuestionsDatabase() produces exactly 613 questions`, `Got: ${freshGenerated.length}`);

let emptyOptionsCount = 0;
let nullUndefinedOptionsCount = 0;
let duplicateOptionsInQuestionCount = 0;
let invalidCorrectOptionCount = 0;
let questionTextMissingCount = 0;
let corruptedStringsCount = 0;
const questionIds = new Set();
let duplicateQuestionIds = 0;

hscQuestionsList.forEach((q, idx) => {
  // Check question ID uniqueness
  if (questionIds.has(q.id)) {
    duplicateQuestionIds++;
  }
  questionIds.add(q.id);

  // Check question text
  if (!q.questionText || typeof q.questionText !== 'string' || q.questionText.trim() === '') {
    questionTextMissingCount++;
  }

  // Check correctOption invariant (must be 0)
  if (q.correctOption !== 0) {
    invalidCorrectOptionCount++;
  }

  // Check options
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    emptyOptionsCount++;
  } else {
    const seenOptionsInQ = new Set();
    q.options.forEach((opt, optIdx) => {
      if (opt === null || opt === undefined) {
        nullUndefinedOptionsCount++;
      } else if (typeof opt !== 'string' || opt.trim() === '') {
        emptyOptionsCount++;
      } else {
        const trimmed = opt.trim();
        if (seenOptionsInQ.has(trimmed.toLowerCase())) {
          duplicateOptionsInQuestionCount++;
          console.error(`Duplicate option in Q [${q.id}] (${q.word} - ${q.category}): "${trimmed}"`);
        }
        seenOptionsInQ.add(trimmed.toLowerCase());

        if (trimmed.includes('undefined') || trimmed.includes('[object') || trimmed.includes('NaN')) {
          corruptedStringsCount++;
        }
      }
    });
  }
});

assert(duplicateQuestionIds === 0, `All question IDs are strictly unique`, `Duplicates: ${duplicateQuestionIds}`);
assert(questionTextMissingCount === 0, `All questions have valid question text`, `Missing: ${questionTextMissingCount}`);
assert(invalidCorrectOptionCount === 0, `All questions have correctOption === 0`, `Invalid: ${invalidCorrectOptionCount}`);
assert(nullUndefinedOptionsCount === 0, `0 null or undefined options in all 613 questions`, `Found: ${nullUndefinedOptionsCount}`);
assert(emptyOptionsCount === 0, `0 empty or blank options in all 613 questions`, `Found: ${emptyOptionsCount}`);
assert(duplicateOptionsInQuestionCount === 0, `0 duplicate options within any question`, `Found: ${duplicateOptionsInQuestionCount}`);
assert(corruptedStringsCount === 0, `0 corrupted string artifacts (undefined/NaN/[object]) in options`, `Found: ${corruptedStringsCount}`);


// -------------------------------------------------------------
// 5. QUESTION BREAKDOWN & SKIPPED QUESTIONS AUDIT
// -------------------------------------------------------------
console.log('\n--- 5. Category Breakdown & Skip Analysis ---');
const categoryCounts = {
  synonyms: 0,
  antonyms: 0,
  english_meaning: 0,
  bangla_meaning: 0
};

hscQuestionsList.forEach(q => {
  if (categoryCounts[q.category] !== undefined) {
    categoryCounts[q.category]++;
  }
});

console.log(`  - Synonyms questions: ${categoryCounts.synonyms}`);
console.log(`  - Antonyms questions: ${categoryCounts.antonyms}`);
console.log(`  - English Meaning questions: ${categoryCounts.english_meaning}`);
console.log(`  - Bangla Meaning questions: ${categoryCounts.bangla_meaning}`);
console.log(`  - Total: ${categoryCounts.synonyms + categoryCounts.antonyms + categoryCounts.english_meaning + categoryCounts.bangla_meaning}`);

assert(categoryCounts.english_meaning === 156, `All 156 words have English meaning questions`, `Got: ${categoryCounts.english_meaning}`);
assert(categoryCounts.bangla_meaning === 156, `All 156 words have Bangla meaning questions`, `Got: ${categoryCounts.bangla_meaning}`);

// Calculate how many words skipped synonyms or antonyms
const skippedSyn = hscVocabularyList.filter(v => !v.synonyms || v.synonyms.trim() === '');
const skippedAnt = hscVocabularyList.filter(v => !v.antonyms || v.antonyms.trim() === '');
console.log(`  - Words with empty synonyms (${skippedSyn.length}): ${skippedSyn.map(v => v.word).join(', ') || 'None'}`);
console.log(`  - Words with empty antonyms (${skippedAnt.length}): ${skippedAnt.map(v => v.word).join(', ') || 'None'}`);

const expectedTotal = (156 * 4) - skippedSyn.length - skippedAnt.length;
assert(hscQuestionsList.length === expectedTotal, `Generated count (${hscQuestionsList.length}) matches formula 156*4 - (${skippedSyn.length} syn + ${skippedAnt.length} ant) = ${expectedTotal}`);


// -------------------------------------------------------------
// 6. ADVERSARIAL & STRESS TESTS ON SMART HELPER FUNCTIONS
// -------------------------------------------------------------
console.log('\n--- 6. Adversarial Stress-Testing Helper Functions ---');

// Test smartInterleaveQuestions
const interleaved = smartInterleaveQuestions(hscQuestionsList);
assert(interleaved.length === hscQuestionsList.length, `smartInterleaveQuestions preserves exact question count (${interleaved.length})`);

// Check no consecutive questions share word when pool is large enough
let consecutiveSameWord = 0;
for (let i = 0; i < interleaved.length - 1; i++) {
  if (interleaved[i].word === interleaved[i + 1].word) {
    consecutiveSameWord++;
  }
}
assert(consecutiveSameWord === 0, `smartInterleaveQuestions has 0 consecutive identical words`, `Found: ${consecutiveSameWord}`);

// Test edge case inputs to smartInterleaveQuestions
const emptyInterleave = smartInterleaveQuestions([]);
assert(Array.isArray(emptyInterleave) && emptyInterleave.length === 0, `smartInterleaveQuestions handles [] gracefully`);

const singleInterleave = smartInterleaveQuestions([hscQuestionsList[0]]);
assert(singleInterleave.length === 1, `smartInterleaveQuestions handles single-item array gracefully`);

const nullInterleave = smartInterleaveQuestions(null);
assert(nullInterleave === null, `smartInterleaveQuestions handles null gracefully`);

// Test getFilteredCategoryQuestions
const synOnly = getFilteredCategoryQuestions(['synonyms']);
assert(synOnly.length === categoryCounts.synonyms, `getFilteredCategoryQuestions(['synonyms']) returns exact synonym count (${synOnly.length})`);

const antOnly = getFilteredCategoryQuestions(['antonyms']);
assert(antOnly.length === categoryCounts.antonyms, `getFilteredCategoryQuestions(['antonyms']) returns exact antonym count (${antOnly.length})`);

const allFiltered = getFilteredCategoryQuestions();
assert(allFiltered.length === 613, `getFilteredCategoryQuestions() default returns 613 questions`);

console.log('\n================================================================');
console.log(`  TEST RESULTS: ${passedTests} PASSED, ${failedTests} FAILED (TOTAL: ${totalTests})`);
console.log('================================================================\n');

if (failedTests > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
