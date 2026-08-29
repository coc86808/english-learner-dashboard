import { hscVocabularyList, hscQuestionsList } from '../../src/data/questions/hscQuestionsData.js';
import { hscUnits } from '../../src/data/hscUnitsData.js';

console.log('=== COMPONENT FILTER SIMULATION AUDIT ===\n');

// 1. FlashcardsExplorer filter logic
const u1l1_fc = hscVocabularyList.filter(item => item.unit.includes("Unit 1:") || item.unit.includes("The Parrot's Tale"));
const u10l1_fc = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 1") || item.unit.includes("Manners Around the World"));
const u10l2_fc = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 2") || item.unit.includes("Etiquette Netquette") || item.unit.includes("Good manners always wins") || item.unit.includes("Food and Culture"));

console.log('Flashcards Explorer filter counts:');
console.log('- Unit 1 Lesson 1:', u1l1_fc.length, '(expected 46)');
console.log('- Unit 10 Lesson 1:', u10l1_fc.length, '(expected 74)');
console.log('- Unit 10 Lesson 2:', u10l2_fc.length, '(expected 36)');
console.log('- Total accounted words:', u1l1_fc.length + u10l1_fc.length + u10l2_fc.length, '(expected 156)');

// 2. UnitLessonExamModal & HSCUnitsExplorer filter logic
const filterUnitQuestions = (uNum, uTitle) => {
  return hscQuestionsList.filter(q => {
    if (!q || !q.unit) return false;
    const qu = q.unit.toLowerCase();
    return (uNum && (qu.includes(uNum.toLowerCase() + ':') || new RegExp(`\\b${uNum}\\b`, 'i').test(qu))) || (uTitle && qu.includes(uTitle.toLowerCase()));
  });
};

const filterLessonQuestions = (uNum, uTitle, lNum, lTitle) => {
  return hscQuestionsList.filter(q => {
    if (!q || !q.unit) return false;
    const qu = q.unit.toLowerCase();
    const matchUnit = (uNum && (qu.includes(uNum.toLowerCase() + ':') || new RegExp(`\\b${uNum}\\b`, 'i').test(qu))) || (uTitle && qu.includes(uTitle.toLowerCase()));
    if (!matchUnit) return false;
    if (!lNum && !lTitle) return true;
    return (lNum && qu.includes(lNum.toLowerCase())) || (lTitle && qu.includes(lTitle.toLowerCase()));
  });
};

const u1_q = filterUnitQuestions('Unit 1', "Education and Life");
const u10_q = filterUnitQuestions('Unit 10', 'Lifestyle');

const u1l1_q = filterLessonQuestions('Unit 1', 'Education and Life', 'Lesson 1', "The Parrot's Tale");
const u10l1_q = filterLessonQuestions('Unit 10', 'Lifestyle', 'Lesson 1', 'Manners Around the World');
const u10l2_q = filterLessonQuestions('Unit 10', 'Lifestyle', 'Lesson 2', 'Etiquette Netiquette');

console.log('\nUnit & Lesson Question Counts:');
console.log('- Unit 1 Total Questions:', u1_q.length, '(expected 180)');
console.log('- Unit 1 Lesson 1 Questions:', u1l1_q.length, '(expected 180)');
console.log('- Unit 10 Total Questions:', u10_q.length, '(expected 433)');
console.log('- Unit 10 Lesson 1 Questions:', u10l1_q.length, '(expected 290)');
console.log('- Unit 10 Lesson 2 Questions:', u10l2_q.length, '(expected 143)');
console.log('- Total accounted questions:', u1_q.length + u10_q.length, '(expected 613)');

// 3. Category count per lesson
const getCatCounts = (qList) => {
  const c = { synonyms: 0, antonyms: 0, english_meaning: 0, bangla_meaning: 0 };
  qList.forEach(q => { if (c[q.category] !== undefined) c[q.category]++; });
  return c;
};

console.log('\nCategory breakdown per lesson:');
console.log('- U1L1:', getCatCounts(u1l1_q));
console.log('- U10L1:', getCatCounts(u10l1_q));
console.log('- U10L2:', getCatCounts(u10l2_q));

const assertions = [
  u1l1_fc.length === 46,
  u10l1_fc.length === 74,
  u10l2_fc.length === 36,
  u1_q.length === 180,
  u10_q.length === 433,
  u1l1_q.length === 180,
  u10l1_q.length === 290,
  u10l2_q.length === 143,
  u1_q.length + u10_q.length === 613
];

const allPassed = assertions.every(Boolean);
console.log('\nVerification Result:', allPassed ? '✅ ALL FILTERS PASS EMPIRICALLY' : '❌ FILTER MISMATCH DETECTED');
process.exit(allPassed ? 0 : 1);
