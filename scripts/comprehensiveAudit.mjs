import {
  hscVocabularyList,
  hscQuestionsList,
  buildQuestionsDatabase,
  getFilteredCategoryQuestions,
  smartInterleaveQuestions
} from '../src/data/questions/hscQuestionsData.js';
import { hscUnits } from '../src/data/hscUnitsData.js';

console.log('====================================================');
console.log('AUDIT REPORT: HSC VOCABULARY & MCQ ENGINE VALIDATION');
console.log('====================================================\n');

let issues = [];

// 1. Vocabulary audit (156 items)
console.log(`Checking ${hscVocabularyList.length} vocabulary entries...`);

const ids = new Set();
const words = new Set();
const wordsWithoutAntonyms = [];
const wordsWithoutSynonyms = [];

hscVocabularyList.forEach((item, index) => {
  // Check required fields
  const required = ['id', 'word', 'bengaliMeaning', 'partsOfSpeech', 'synonyms', 'antonyms', 'englishMeaning', 'exampleSentence', 'unit', 'boardExamTag'];
  required.forEach(field => {
    if (item[field] === undefined || item[field] === null) {
      issues.push(`Item [${index}] ${item.word || 'UNKNOWN'}: Missing field "${field}"`);
    }
  });

  // Duplicate ID
  if (ids.has(item.id)) {
    issues.push(`Duplicate vocab ID found: ${item.id}`);
  }
  ids.add(item.id);

  // Duplicate Word in dataset
  if (words.has(item.word.toLowerCase())) {
    issues.push(`Duplicate word found: "${item.word}" (ID: ${item.id})`);
  }
  words.add(item.word.toLowerCase());

  const wordClean = item.word.trim().toLowerCase();

  // Check self-synonym
  if (item.synonyms && item.synonyms.trim() !== '') {
    const syns = item.synonyms.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    if (syns.includes(wordClean)) {
      issues.push(`SELF-SYNONYM VIOLATION: Word "${item.word}" (ID: ${item.id}) contains itself in synonyms: "${item.synonyms}"`);
    }
  } else {
    wordsWithoutSynonyms.push(item.word);
  }

  // Check self-antonym
  if (item.antonyms && item.antonyms.trim() !== '') {
    const ants = item.antonyms.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    if (ants.includes(wordClean)) {
      issues.push(`SELF-ANTONYM VIOLATION: Word "${item.word}" (ID: ${item.id}) contains itself in antonyms: "${item.antonyms}"`);
    }
  } else {
    wordsWithoutAntonyms.push({ id: item.id, word: item.word, unit: item.unit });
  }

  // Check overlap between synonyms and antonyms
  if (item.synonyms && item.antonyms) {
    const syns = item.synonyms.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const ants = item.antonyms.split(',').map(s => s.trim().toLowerCase()).filter(Boolean);
    const overlap = syns.filter(s => ants.includes(s));
    if (overlap.length > 0) {
      issues.push(`CONTRADICTION: Word "${item.word}" (ID: ${item.id}) has overlapping synonym & antonym: ${overlap.join(', ')}`);
    }
  }

  // Check empty Bengali meaning or English meaning
  if (!item.bengaliMeaning || item.bengaliMeaning.trim() === '') {
    issues.push(`EMPTY BENGALI MEANING: Word "${item.word}" (ID: ${item.id})`);
  }
  if (!item.englishMeaning || item.englishMeaning.trim() === '') {
    issues.push(`EMPTY ENGLISH MEANING: Word "${item.word}" (ID: ${item.id})`);
  }
});

console.log(`Words without antonyms (total: ${wordsWithoutAntonyms.length}):`);
wordsWithoutAntonyms.forEach(w => console.log(`  - [${w.id}] "${w.word}" (${w.unit})`));

console.log(`\nWords without synonyms (total: ${wordsWithoutSynonyms.length}):`);
wordsWithoutSynonyms.forEach(w => console.log(`  - "${w}"`));

// 2. Question Database Audit
console.log(`\nChecking ${hscQuestionsList.length} generated questions...`);
const qIds = new Set();
let duplicateOptionsCount = 0;
let emptyOptionsCount = 0;
let badCorrectOptionCount = 0;

hscQuestionsList.forEach((q, idx) => {
  if (qIds.has(q.id)) {
    issues.push(`Duplicate Question ID: ${q.id}`);
  }
  qIds.add(q.id);

  if (!q.options || q.options.length !== 4) {
    issues.push(`Question ${q.id} has ${q.options ? q.options.length : 0} options instead of 4`);
  } else {
    // Check for empty options
    q.options.forEach((opt, oIdx) => {
      if (typeof opt !== 'string' || opt.trim() === '') {
        issues.push(`Question ${q.id} option[${oIdx}] is empty or non-string: "${opt}"`);
        emptyOptionsCount++;
      }
    });

    // Check for duplicate options within the same question
    const uniqueOptions = new Set(q.options.map(o => (typeof o === 'string' ? o.trim().toLowerCase() : o)));
    if (uniqueOptions.size !== 4) {
      issues.push(`DUPLICATE OPTIONS in Question ${q.id} ("${q.word}", category: ${q.category}): options = [${q.options.map(o => `"${o}"`).join(', ')}]`);
      duplicateOptionsCount++;
    }
  }

  if (q.correctOption !== 0) {
    issues.push(`Question ${q.id} correctOption is ${q.correctOption} (expected 0)`);
    badCorrectOptionCount++;
  }
});

console.log(`\nQuestion Audit Summary:`);
console.log(`- Total Questions: ${hscQuestionsList.length}`);
console.log(`- Duplicate Option Questions: ${duplicateOptionsCount}`);
console.log(`- Empty Option Questions: ${emptyOptionsCount}`);
console.log(`- Bad CorrectOption count: ${badCorrectOptionCount}`);

// 3. Unit Filter Tests across Components
console.log(`\nTesting Unit 1 vs Unit 10 filtering in all components...`);

// Test Flashcards filter logic
const fc_u1 = hscVocabularyList.filter(item => item.unit.includes("Unit 1:") || item.unit.includes("The Parrot's Tale"));
const fc_u10_l1 = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 1") || item.unit.includes("Manners Around the World"));
const fc_u10_l2 = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 2") || item.unit.includes("Etiquette Netquette") || item.unit.includes("Good manners always wins") || item.unit.includes("Food and Culture"));

console.log(`FlashcardsExplorer:`);
console.log(`  - Unit 1: ${fc_u1.length} (expected 46)`);
console.log(`  - Unit 10 L1: ${fc_u10_l1.length} (expected 74)`);
console.log(`  - Unit 10 L2: ${fc_u10_l2.length} (expected 36)`);
console.log(`  - Unit 10 Total: ${fc_u10_l1.length + fc_u10_l2.length} (expected 110)`);

if (fc_u1.length !== 46) issues.push(`FlashcardsExplorer Unit 1 count is ${fc_u1.length}, expected 46`);
if (fc_u10_l1.length !== 74) issues.push(`FlashcardsExplorer Unit 10 L1 count is ${fc_u10_l1.length}, expected 74`);
if (fc_u10_l2.length !== 36) issues.push(`FlashcardsExplorer Unit 10 L2 count is ${fc_u10_l2.length}, expected 36`);

// Test HSCUnitsExplorer filter logic
const u1Obj = hscUnits.find(u => u.id === 'unit-1');
const u10Obj = hscUnits.find(u => u.id === 'unit-10');

function testHSCUnitsExplorerFilter(unitObj, lessonObj = null) {
  const uNum = (unitObj.unitNumber || '').toLowerCase();
  const uTitle = (unitObj.unitTitle || '').toLowerCase();
  const lNum = lessonObj && lessonObj.id !== 'all' ? (lessonObj.number || '').toLowerCase() : '';
  const lTitle = lessonObj && lessonObj.id !== 'all' ? (lessonObj.title || '').toLowerCase() : '';

  return (hscQuestionsList || []).filter((q) => {
    if (!q || !q.unit) return false;
    const qu = q.unit.toLowerCase();
    const matchUnit = (uNum && (qu.includes(uNum + ':') || new RegExp(`\\b${uNum}\\b`, 'i').test(qu))) || (uTitle && qu.includes(uTitle));
    if (!matchUnit) return false;
    if (!lNum && !lTitle) return true;
    return (lNum && qu.includes(lNum)) || (lTitle && qu.includes(lTitle));
  });
}

const explorer_u1_all = testHSCUnitsExplorerFilter(u1Obj);
const explorer_u1_l1 = testHSCUnitsExplorerFilter(u1Obj, u1Obj.lessons[0]);
const explorer_u10_all = testHSCUnitsExplorerFilter(u10Obj);
const explorer_u10_l1 = testHSCUnitsExplorerFilter(u10Obj, u10Obj.lessons[0]);
const explorer_u10_l2 = testHSCUnitsExplorerFilter(u10Obj, u10Obj.lessons[1]);

console.log(`HSCUnitsExplorer:`);
console.log(`  - Unit 1 All: ${explorer_u1_all.length} (expected 180)`);
console.log(`  - Unit 1 L1: ${explorer_u1_l1.length} (expected 180)`);
console.log(`  - Unit 10 All: ${explorer_u10_all.length} (expected 433 = 290 + 143)`);
console.log(`  - Unit 10 L1: ${explorer_u10_l1.length} (expected 290)`);
console.log(`  - Unit 10 L2: ${explorer_u10_l2.length} (expected 143)`);

if (explorer_u1_all.length !== 180) issues.push(`HSCUnitsExplorer Unit 1 All count is ${explorer_u1_all.length}, expected 180`);
if (explorer_u10_all.length !== 433) issues.push(`HSCUnitsExplorer Unit 10 All count is ${explorer_u10_all.length}, expected 433`);
if (explorer_u10_l1.length !== 290) issues.push(`HSCUnitsExplorer Unit 10 L1 count is ${explorer_u10_l1.length}, expected 290`);
if (explorer_u10_l2.length !== 143) issues.push(`HSCUnitsExplorer Unit 10 L2 count is ${explorer_u10_l2.length}, expected 143`);

// Check VocabularyBank filter logic
function testVocabBankFilter(unitObj, lessonObj = null) {
  return hscVocabularyList.filter((item) => {
    const unitNumberStr = unitObj ? unitObj.unitNumber.toLowerCase() : '';
    const unitTitleStr = unitObj ? unitObj.unitTitle.toLowerCase() : '';
    const matchesUnit =
      item.unit &&
      ((unitNumberStr && (item.unit.toLowerCase().includes(unitNumberStr + ':') || new RegExp(`\\b${unitNumberStr}\\b`, 'i').test(item.unit))) ||
        (unitTitleStr && item.unit.toLowerCase().includes(unitTitleStr)));

    if (!matchesUnit) return false;

    if (lessonObj && lessonObj.id !== 'all') {
      const lessonNumStr = lessonObj.number.toLowerCase().replace('-', ' ');
      const lessonTitleStr = lessonObj.title.toLowerCase();
      const matchesLesson =
        item.unit &&
        (item.unit.toLowerCase().includes(lessonNumStr) ||
          item.unit.toLowerCase().includes(lessonTitleStr) ||
          (lessonObj.id === 'u10-l1' && item.unit.includes('Lesson 1')) ||
          (lessonObj.id === 'u10-l2' && item.unit.includes('Lesson 2')) ||
          (lessonObj.id === 'u1-l1' && item.unit.includes('Lesson 1')));

      if (!matchesLesson) return false;
    }
    return true;
  });
}

const vb_u1 = testVocabBankFilter(u1Obj);
const vb_u10 = testVocabBankFilter(u10Obj);
const vb_u10_l1 = testVocabBankFilter(u10Obj, u10Obj.lessons[0]);
const vb_u10_l2 = testVocabBankFilter(u10Obj, u10Obj.lessons[1]);

console.log(`VocabularyBank:`);
console.log(`  - Unit 1: ${vb_u1.length} (expected 46)`);
console.log(`  - Unit 10: ${vb_u10.length} (expected 110)`);
console.log(`  - Unit 10 L1: ${vb_u10_l1.length} (expected 74)`);
console.log(`  - Unit 10 L2: ${vb_u10_l2.length} (expected 36)`);

if (vb_u1.length !== 46) issues.push(`VocabularyBank Unit 1 count is ${vb_u1.length}, expected 46`);
if (vb_u10.length !== 110) issues.push(`VocabularyBank Unit 10 count is ${vb_u10.length}, expected 110`);
if (vb_u10_l1.length !== 74) issues.push(`VocabularyBank Unit 10 L1 count is ${vb_u10_l1.length}, expected 74`);
if (vb_u10_l2.length !== 36) issues.push(`VocabularyBank Unit 10 L2 count is ${vb_u10_l2.length}, expected 36`);

// 4. Interleaving test
console.log(`\nTesting Smart Interleaving...`);
const interleaved = smartInterleaveQuestions(hscQuestionsList);
let adjacentSameWord = 0;
for (let i = 0; i < interleaved.length - 1; i++) {
  if (interleaved[i].word === interleaved[i + 1].word) {
    adjacentSameWord++;
  }
}
console.log(`Adjacent same-word occurrences in interleaved list: ${adjacentSameWord}`);
if (adjacentSameWord > 0) {
  issues.push(`Smart Interleaving produced ${adjacentSameWord} consecutive questions with the same word`);
}

console.log('\n====================================================');
console.log(`TOTAL AUDIT ISSUES DETECTED: ${issues.length}`);
console.log('====================================================');
if (issues.length > 0) {
  issues.forEach((iss, i) => console.log(`${i + 1}. ${iss}`));
} else {
  console.log('ALL AUDIT CHECKS PASSED PERFECTLY!');
}
