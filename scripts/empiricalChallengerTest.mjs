import { hscVocabularyList, buildQuestionsDatabase, smartInterleaveQuestions, getFilteredCategoryQuestions, hscQuestionsList } from '../src/data/questions/hscQuestionsData.js';
import { hscUnits } from '../src/data/hscUnitsData.js';

function toBengaliNumerals(num) {
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return num.toString().split('').map(d => bnDigits[parseInt(d)] || d).join('');
}

const results = {
  vocabIntegrity: { pass: true, errors: [], stats: {} },
  deduplication: { pass: true, errors: [], stats: {} },
  questionEngine: { pass: true, errors: [], stats: {} },
  curriculumConsistency: { pass: true, errors: [], stats: {} },
  flashcardsCompatibility: { pass: true, errors: [], stats: {} }
};

console.log('====================================================');
console.log('🧪 EMPIRICAL CHALLENGER VERIFICATION SUITE');
console.log('====================================================\n');

// -----------------------------------------------------------------------------
// TEST 1: Deduplication & Vocabulary Data Structure Integrity
// -----------------------------------------------------------------------------
console.log('--- TEST 1: Deduplication & Vocabulary Data Structure Integrity ---');

const totalVocab = hscVocabularyList.length;
results.vocabIntegrity.stats.totalCount = totalVocab;
console.log(`Total vocabulary items: ${totalVocab}`);

if (totalVocab !== 156) {
  results.vocabIntegrity.pass = false;
  results.vocabIntegrity.errors.push(`Expected 156 vocabulary items, got ${totalVocab}`);
}

const idSet = new Set();
const duplicateIds = [];
const wordSet = new Set();
const duplicateWords = [];

hscVocabularyList.forEach((item, idx) => {
  // Check ID uniqueness
  if (idSet.has(item.id)) {
    duplicateIds.push({ id: item.id, index: idx, word: item.word });
  } else {
    idSet.add(item.id);
  }

  // Check Word uniqueness (case-insensitive trimmed)
  const normWord = item.word.trim().toLowerCase();
  if (wordSet.has(normWord)) {
    duplicateWords.push({ word: item.word, index: idx, id: item.id });
  } else {
    wordSet.add(normWord);
  }

  // Check required fields
  const requiredFields = ['id', 'word', 'bengaliMeaning', 'partsOfSpeech', 'englishMeaning', 'exampleSentence', 'unit', 'boardExamTag'];
  requiredFields.forEach(f => {
    if (!item[f] || typeof item[f] !== 'string' || item[f].trim() === '') {
      results.vocabIntegrity.pass = false;
      results.vocabIntegrity.errors.push(`Item #${idx} [${item.word || item.id}] missing required field: ${f}`);
    }
  });

  // Synonyms and antonyms must be strings (can be empty string "" if none)
  if (typeof item.synonyms !== 'string') {
    results.vocabIntegrity.pass = false;
    results.vocabIntegrity.errors.push(`Item #${idx} [${item.word}] synonyms is not string: ${typeof item.synonyms}`);
  }
  if (typeof item.antonyms !== 'string') {
    results.vocabIntegrity.pass = false;
    results.vocabIntegrity.errors.push(`Item #${idx} [${item.word}] antonyms is not string: ${typeof item.antonyms}`);
  }

  // Check Bengali characters in bengaliMeaning
  const hasBengali = /[\u0980-\u09FF]/.test(item.bengaliMeaning);
  if (!hasBengali) {
    results.vocabIntegrity.pass = false;
    results.vocabIntegrity.errors.push(`Item #${idx} [${item.word}] bengaliMeaning does not contain Bengali characters: "${item.bengaliMeaning}"`);
  }
});

if (duplicateIds.length > 0) {
  results.deduplication.pass = false;
  results.deduplication.errors.push(`Found ${duplicateIds.length} duplicate IDs: ` + JSON.stringify(duplicateIds));
}
if (duplicateWords.length > 0) {
  results.deduplication.pass = false;
  results.deduplication.errors.push(`Found ${duplicateWords.length} duplicate words: ` + JSON.stringify(duplicateWords));
}

console.log(`Unique IDs count: ${idSet.size} / ${totalVocab}`);
console.log(`Unique Words count: ${wordSet.size} / ${totalVocab}`);
console.log(`Deduplication Status: ${results.deduplication.pass ? 'PASS ✅' : 'FAIL ❌'}`);
console.log(`Vocabulary Structure Status: ${results.vocabIntegrity.pass ? 'PASS ✅' : 'FAIL ❌'}\n`);

// -----------------------------------------------------------------------------
// TEST 2: MCQ Engine & Dynamic Generation
// -----------------------------------------------------------------------------
console.log('--- TEST 2: MCQ Engine & Dynamic Generation ---');

const generatedQuestions = buildQuestionsDatabase();
console.log(`Total generated questions: ${generatedQuestions.length}`);
results.questionEngine.stats.totalQuestions = generatedQuestions.length;

let synonymQuestionsCount = 0;
let antonymQuestionsCount = 0;
let englishMeaningCount = 0;
let banglaMeaningCount = 0;

let wordsWithEmptySynonyms = 0;
let wordsWithEmptyAntonyms = 0;

hscVocabularyList.forEach(item => {
  const hasSyn = item.synonyms && item.synonyms.trim() !== '';
  const hasAnt = item.antonyms && item.antonyms.trim() !== '';
  if (!hasSyn) wordsWithEmptySynonyms++;
  if (!hasAnt) wordsWithEmptyAntonyms++;
});

console.log(`Words with empty/no synonyms: ${wordsWithEmptySynonyms}`);
console.log(`Words with empty/no antonyms: ${wordsWithEmptyAntonyms}`);

generatedQuestions.forEach((q, idx) => {
  if (q.category === 'synonyms') synonymQuestionsCount++;
  else if (q.category === 'antonyms') antonymQuestionsCount++;
  else if (q.category === 'english_meaning') englishMeaningCount++;
  else if (q.category === 'bangla_meaning') banglaMeaningCount++;

  // Verify question structure
  if (!q.id || !q.vocabId || !q.word || !q.questionText) {
    results.questionEngine.pass = false;
    results.questionEngine.errors.push(`Question #${idx} missing mandatory fields: ${JSON.stringify(q)}`);
  }

  // Options validation
  if (!Array.isArray(q.options) || q.options.length !== 4) {
    results.questionEngine.pass = false;
    results.questionEngine.errors.push(`Question #${idx} [${q.id}] options length is not 4: ${q.options?.length}`);
  } else {
    // Check no empty options
    q.options.forEach((opt, optIdx) => {
      if (!opt || typeof opt !== 'string' || opt.trim() === '') {
        results.questionEngine.pass = false;
        results.questionEngine.errors.push(`Question #${idx} [${q.id}] option[${optIdx}] is empty`);
      }
    });

    // Check for duplicate options within single question
    const optSet = new Set(q.options.map(o => o.trim().toLowerCase()));
    if (optSet.size !== 4) {
      results.questionEngine.pass = false;
      results.questionEngine.errors.push(`Question #${idx} [${q.id}] contains duplicate options: ${JSON.stringify(q.options)}`);
    }
  }

  // CorrectOption validation
  if (typeof q.correctOption !== 'number' || q.correctOption < 0 || q.correctOption >= 4) {
    results.questionEngine.pass = false;
    results.questionEngine.errors.push(`Question #${idx} [${q.id}] invalid correctOption: ${q.correctOption}`);
  }
});

console.log(`Question category breakdown:`);
console.log(`- Synonyms: ${synonymQuestionsCount} (Expected: ${156 - wordsWithEmptySynonyms})`);
console.log(`- Antonyms: ${antonymQuestionsCount} (Expected: ${156 - wordsWithEmptyAntonyms})`);
console.log(`- English Meaning: ${englishMeaningCount} (Expected: 156)`);
console.log(`- Bangla Meaning: ${banglaMeaningCount} (Expected: 156)`);

if (synonymQuestionsCount !== 156 - wordsWithEmptySynonyms) {
  results.questionEngine.pass = false;
  results.questionEngine.errors.push(`Synonym question count mismatch: got ${synonymQuestionsCount}, expected ${156 - wordsWithEmptySynonyms}`);
}
if (antonymQuestionsCount !== 156 - wordsWithEmptyAntonyms) {
  results.questionEngine.pass = false;
  results.questionEngine.errors.push(`Antonym question count mismatch: got ${antonymQuestionsCount}, expected ${156 - wordsWithEmptyAntonyms}`);
}
if (englishMeaningCount !== 156) {
  results.questionEngine.pass = false;
  results.questionEngine.errors.push(`English meaning count mismatch: got ${englishMeaningCount}, expected 156`);
}
if (banglaMeaningCount !== 156) {
  results.questionEngine.pass = false;
  results.questionEngine.errors.push(`Bangla meaning count mismatch: got ${banglaMeaningCount}, expected 156`);
}

// Test interleaver
const interleaved = smartInterleaveQuestions(generatedQuestions);
if (interleaved.length !== generatedQuestions.length) {
  results.questionEngine.pass = false;
  results.questionEngine.errors.push(`smartInterleaveQuestions changed length from ${generatedQuestions.length} to ${interleaved.length}`);
}

// Test filtered categories
const filteredSyn = getFilteredCategoryQuestions(['synonyms']);
if (filteredSyn.length !== synonymQuestionsCount) {
  results.questionEngine.pass = false;
  results.questionEngine.errors.push(`getFilteredCategoryQuestions(['synonyms']) length mismatch: ${filteredSyn.length} vs ${synonymQuestionsCount}`);
}

console.log(`Question Engine Status: ${results.questionEngine.pass ? 'PASS ✅' : 'FAIL ❌'}\n`);

// -----------------------------------------------------------------------------
// TEST 3: Curriculum Consistency & Unit / Lesson Counts
// -----------------------------------------------------------------------------
console.log('--- TEST 3: Curriculum Consistency & Unit / Lesson Counts ---');

// Calculate actual counts per unit & lesson from vocabulary and question lists
const u1Vocab = hscVocabularyList.filter(item => item.unit.includes("Unit 1") || item.unit.includes("The Parrot's Tale"));
const u1Questions = hscQuestionsList.filter(q => q.unit.includes("Unit 1") || q.unit.includes("The Parrot's Tale"));

const u10l1Vocab = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 1") || item.unit.includes("Manners Around the World"));
const u10l1Questions = hscQuestionsList.filter(q => q.unit.includes("Unit 10: Lesson 1") || q.unit.includes("Manners Around the World"));

const u10l2Vocab = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 2") || item.unit.includes("Etiquette Netquette") || item.unit.includes("Good manners always wins") || item.unit.includes("Food and Culture"));
const u10l2Questions = hscQuestionsList.filter(q => q.unit.includes("Unit 10: Lesson 2") || q.unit.includes("Etiquette Netquette") || q.unit.includes("Good manners always wins") || q.unit.includes("Food and Culture"));

console.log(`Actual distribution in hscVocabularyList:`);
console.log(`- Unit 1 Lesson 1: ${u1Vocab.length} words, ${u1Questions.length} questions`);
console.log(`- Unit 10 Lesson 1: ${u10l1Vocab.length} words, ${u10l1Questions.length} questions`);
console.log(`- Unit 10 Lesson 2: ${u10l2Vocab.length} words, ${u10l2Questions.length} questions`);
console.log(`Total accounted words: ${u1Vocab.length + u10l1Vocab.length + u10l2Vocab.length} / ${totalVocab}`);

if (u1Vocab.length + u10l1Vocab.length + u10l2Vocab.length !== totalVocab) {
  results.curriculumConsistency.pass = false;
  results.curriculumConsistency.errors.push(`Some vocabulary words are not categorized into any valid unit/lesson! Total accounted: ${u1Vocab.length + u10l1Vocab.length + u10l2Vocab.length}, total: ${totalVocab}`);
}

// Compare with hscUnitsData.js
const unit1 = hscUnits.find(u => u.id === 'unit-1');
const unit10 = hscUnits.find(u => u.id === 'unit-10');

if (!unit1) {
  results.curriculumConsistency.pass = false;
  results.curriculumConsistency.errors.push('Unit 1 not found in hscUnits');
} else {
  if (unit1.totalWords !== u1Vocab.length) {
    results.curriculumConsistency.pass = false;
    results.curriculumConsistency.errors.push(`Unit 1 totalWords in hscUnits (${unit1.totalWords}) does not match actual vocab count (${u1Vocab.length})`);
  }
  const l1 = unit1.lessons.find(l => l.id === 'u1-l1');
  if (!l1) {
    results.curriculumConsistency.pass = false;
    results.curriculumConsistency.errors.push('Unit 1 Lesson 1 not found in hscUnits');
  } else {
    if (l1.wordsCount !== u1Vocab.length) {
      results.curriculumConsistency.pass = false;
      results.curriculumConsistency.errors.push(`Unit 1 Lesson 1 wordsCount (${l1.wordsCount}) does not match actual (${u1Vocab.length})`);
    }
    const expectedQText = `${toBengaliNumerals(u1Questions.length)} টি প্রশ্ন`;
    if (l1.questionsCount !== expectedQText) {
      results.curriculumConsistency.pass = false;
      results.curriculumConsistency.errors.push(`Unit 1 Lesson 1 questionsCount ("${l1.questionsCount}") does not match expected ("${expectedQText}")`);
    }
  }
}

if (!unit10) {
  results.curriculumConsistency.pass = false;
  results.curriculumConsistency.errors.push('Unit 10 not found in hscUnits');
} else {
  const u10TotalExpected = u10l1Vocab.length + u10l2Vocab.length;
  if (unit10.totalWords !== u10TotalExpected) {
    results.curriculumConsistency.pass = false;
    results.curriculumConsistency.errors.push(`Unit 10 totalWords in hscUnits (${unit10.totalWords}) does not match actual vocab count (${u10TotalExpected})`);
  }
  const l1 = unit10.lessons.find(l => l.id === 'u10-l1');
  if (l1) {
    if (l1.wordsCount !== u10l1Vocab.length) {
      results.curriculumConsistency.pass = false;
      results.curriculumConsistency.errors.push(`Unit 10 Lesson 1 wordsCount (${l1.wordsCount}) does not match actual (${u10l1Vocab.length})`);
    }
    const expectedQText = `${toBengaliNumerals(u10l1Questions.length)} টি প্রশ্ন`;
    if (l1.questionsCount !== expectedQText) {
      results.curriculumConsistency.pass = false;
      results.curriculumConsistency.errors.push(`Unit 10 Lesson 1 questionsCount ("${l1.questionsCount}") does not match expected ("${expectedQText}")`);
    }
  }
  const l2 = unit10.lessons.find(l => l.id === 'u10-l2');
  if (l2) {
    if (l2.wordsCount !== u10l2Vocab.length) {
      results.curriculumConsistency.pass = false;
      results.curriculumConsistency.errors.push(`Unit 10 Lesson 2 wordsCount (${l2.wordsCount}) does not match actual (${u10l2Vocab.length})`);
    }
    const expectedQText = `${toBengaliNumerals(u10l2Questions.length)} টি প্রশ্ন`;
    if (l2.questionsCount !== expectedQText) {
      results.curriculumConsistency.pass = false;
      results.curriculumConsistency.errors.push(`Unit 10 Lesson 2 questionsCount ("${l2.questionsCount}") does not match expected ("${expectedQText}")`);
    }
  }
}

// Check other units have 0
hscUnits.forEach(u => {
  if (u.id !== 'unit-1' && u.id !== 'unit-10') {
    if (u.totalWords !== 0) {
      results.curriculumConsistency.pass = false;
      results.curriculumConsistency.errors.push(`${u.unitNumber} totalWords should be 0, got ${u.totalWords}`);
    }
    u.lessons.forEach(l => {
      if (l.wordsCount !== 0 || l.questionsCount !== '০ টি প্রশ্ন') {
        results.curriculumConsistency.pass = false;
        results.curriculumConsistency.errors.push(`${u.unitNumber} ${l.number} should have 0 words and '০ টি প্রশ্ন', got ${l.wordsCount} words / "${l.questionsCount}"`);
      }
    });
  }
});

console.log(`Curriculum Consistency Status: ${results.curriculumConsistency.pass ? 'PASS ✅' : 'FAIL ❌'}\n`);

// -----------------------------------------------------------------------------
// TEST 4: Flashcard Explorer Compatibility & Filters
// -----------------------------------------------------------------------------
console.log('--- TEST 4: Flashcard Explorer Compatibility & Filters ---');

function simulateFlashcardFilter(selectedLessonId) {
  let list = [...hscVocabularyList];
  if (selectedLessonId === 'u1-l1') {
    list = hscVocabularyList.filter(item => item.unit.includes("Unit 1") || item.unit.includes("The Parrot's Tale"));
  } else if (selectedLessonId === 'u10-l1') {
    list = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 1") || item.unit.includes("Manners Around the World"));
  } else if (selectedLessonId === 'u10-l2') {
    list = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 2") || item.unit.includes("Etiquette Netquette") || item.unit.includes("Good manners always wins") || item.unit.includes("Food and Culture"));
  }
  return list;
}

const allFilter = simulateFlashcardFilter('all');
const u1Filter = simulateFlashcardFilter('u1-l1');
const u10l1Filter = simulateFlashcardFilter('u10-l1');
const u10l2Filter = simulateFlashcardFilter('u10-l2');

console.log(`Flashcards filter counts:`);
console.log(`- all: ${allFilter.length}`);
console.log(`- u1-l1: ${u1Filter.length}`);
console.log(`- u10-l1: ${u10l1Filter.length}`);
console.log(`- u10-l2: ${u10l2Filter.length}`);

if (allFilter.length !== 156) {
  results.flashcardsCompatibility.pass = false;
  results.flashcardsCompatibility.errors.push(`'all' filter length mismatch: ${allFilter.length} vs 156`);
}
if (u1Filter.length !== 46) {
  results.flashcardsCompatibility.pass = false;
  results.flashcardsCompatibility.errors.push(`'u1-l1' filter length mismatch: ${u1Filter.length} vs 46`);
}
if (u10l1Filter.length !== 74) {
  results.flashcardsCompatibility.pass = false;
  results.flashcardsCompatibility.errors.push(`'u10-l1' filter length mismatch: ${u10l1Filter.length} vs 74`);
}
if (u10l2Filter.length !== 36) {
  results.flashcardsCompatibility.pass = false;
  results.flashcardsCompatibility.errors.push(`'u10-l2' filter length mismatch: ${u10l2Filter.length} vs 36`);
}

// Ensure every single word has all fields needed by FlashcardsExplorer rendering
allFilter.forEach((card, i) => {
  if (!card.word || !card.bengaliMeaning || !card.unit) {
    results.flashcardsCompatibility.pass = false;
    results.flashcardsCompatibility.errors.push(`Card #${i} [${card.id}] missing essential UI fields`);
  }
});

console.log(`Flashcards Explorer Status: ${results.flashcardsCompatibility.pass ? 'PASS ✅' : 'FAIL ❌'}\n`);

// -----------------------------------------------------------------------------
// SUMMARY & VERDICT
// -----------------------------------------------------------------------------
console.log('====================================================');
console.log('📊 VERIFICATION SUMMARY');
console.log('====================================================');
console.log(JSON.stringify(results, null, 2));

const allPassed = Object.values(results).every(r => r.pass);
console.log(`\nOVERALL VERDICT: ${allPassed ? '✅ ALL TESTS PASSED (APPROVE)' : '❌ FAILURES DETECTED (REQUEST_CHANGES)'}`);

process.exit(allPassed ? 0 : 1);
