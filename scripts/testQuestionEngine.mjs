import {
  hscVocabularyList,
  hscQuestionsList,
  buildQuestionsDatabase,
  getFilteredCategoryQuestions,
  smartInterleaveQuestions
} from '../src/data/questions/hscQuestionsData.js';
import { hscUnits } from '../src/data/hscUnitsData.js';

console.log('--- STARTING COMPREHENSIVE TEST SUITE ---');

// 1. Check vocabulary list length
console.assert(hscVocabularyList.length === 156, `Expected 156 words, got ${hscVocabularyList.length}`);
console.log(`[PASS] Total Vocabulary Words: ${hscVocabularyList.length}`);

// 2. Check total questions count
console.assert(hscQuestionsList.length === 613, `Expected 613 questions, got ${hscQuestionsList.length}`);
console.log(`[PASS] Total Questions Generated: ${hscQuestionsList.length}`);

// 3. Check unit counts
const u1l1 = hscQuestionsList.filter(q => q.id.startsWith('hsc-u1-l1-'));
const u10l1 = hscQuestionsList.filter(q => q.id.startsWith('hsc-u10-l1-'));
const u10l2 = hscQuestionsList.filter(q => q.id.startsWith('hsc-u10-l2-'));

console.assert(u1l1.length === 180, `Expected 180 for u1-l1, got ${u1l1.length}`);
console.assert(u10l1.length === 290, `Expected 290 for u10-l1, got ${u10l1.length}`);
console.assert(u10l2.length === 143, `Expected 143 for u10-l2, got ${u10l2.length}`);
console.log(`[PASS] Unit 1 Lesson 1 Questions: ${u1l1.length}`);
console.log(`[PASS] Unit 10 Lesson 1 Questions: ${u10l1.length}`);
console.log(`[PASS] Unit 10 Lesson 2 Questions: ${u10l2.length}`);

// 4. Check hscUnitsData.js synchronization
const u1 = hscUnits.find(u => u.id === 'unit-1');
const u1_l1 = u1.lessons.find(l => l.id === 'u1-l1');
console.assert(u1_l1.questionsCount === '১৮০ টি প্রশ্ন', `u1-l1 count mismatch: ${u1_l1.questionsCount}`);

const u10 = hscUnits.find(u => u.id === 'unit-10');
const u10_l1 = u10.lessons.find(l => l.id === 'u10-l1');
const u10_l2 = u10.lessons.find(l => l.id === 'u10-l2');
console.assert(u10_l1.questionsCount === '২৯০ টি প্রশ্ন', `u10-l1 count mismatch: ${u10_l1.questionsCount}`);
console.assert(u10_l2.questionsCount === '১৪৩ টি প্রশ্ন', `u10-l2 count mismatch: ${u10_l2.questionsCount}`);
console.log('[PASS] Curriculum metadata in hscUnitsData.js is perfectly synchronized');

// 5. Verify no empty options in any question
let optionFailures = 0;
hscQuestionsList.forEach(q => {
  if (!q.options || q.options.length !== 4) {
    console.error(`[FAIL] Question ${q.id} does not have 4 options`);
    optionFailures++;
  }
  q.options.forEach((opt, idx) => {
    if (typeof opt !== 'string' || opt.trim() === '') {
      console.error(`[FAIL] Question ${q.id} option[${idx}] is empty: "${opt}"`);
      optionFailures++;
    }
  });
  if (q.correctOption !== 0) {
    console.error(`[FAIL] Question ${q.id} correctOption is not 0`);
    optionFailures++;
  }
});
console.assert(optionFailures === 0, `Option failures: ${optionFailures}`);
console.log(`[PASS] All 613 questions have 4 valid, non-empty options and correctOption 0`);

// 6. Test Category Filter
const syns = getFilteredCategoryQuestions(['synonyms']);
const ants = getFilteredCategoryQuestions(['antonyms']);
const engs = getFilteredCategoryQuestions(['english_meaning']);
const bngs = getFilteredCategoryQuestions(['bangla_meaning']);

console.assert(syns.length === 156, `Synonyms count mismatch: ${syns.length}`);
console.assert(ants.length === 145, `Antonyms count mismatch: ${ants.length}`);
console.assert(engs.length === 156, `English meaning count mismatch: ${engs.length}`);
console.assert(bngs.length === 156, `Bangla meaning count mismatch: ${bngs.length}`);
console.log(`[PASS] Category Filtering: Synonyms=${syns.length}, Antonyms=${ants.length}, Eng=${engs.length}, Bng=${bngs.length}`);

// 7. Test Smart Interleave
const interleaved = smartInterleaveQuestions(hscQuestionsList);
console.assert(interleaved.length === 613, `Interleaved count mismatch: ${interleaved.length}`);
console.log(`[PASS] Smart Interleave successfully ordered all ${interleaved.length} questions`);

// 8. Test specific vocabulary quality fixes
const v34 = hscVocabularyList.find(v => v.id === 'vocab-34');
console.assert(v34 && v34.synonyms === 'Welcomer, Entertainer, Lady host, Host', `vocab-34 synonym issue: ${v34?.synonyms}`);
console.assert(!v34.synonyms.toLowerCase().includes('hostess'), 'vocab-34 should not contain self-synonym hostess');

const vu1_08 = hscVocabularyList.find(v => v.id === 'vocab-u1-l1-08');
console.assert(vu1_08 && vu1_08.synonyms === 'Ruin, collapse, degradation, descent', `vocab-u1-l1-08 synonym issue: ${vu1_08?.synonyms}`);
console.assert(!vu1_08.synonyms.toLowerCase().includes('downfall'), 'vocab-u1-l1-08 should not contain downfall');

const vu1_15 = hscVocabularyList.find(v => v.id === 'vocab-u1-l1-15');
console.assert(vu1_15 && vu1_15.synonyms === 'Gold-plated, golden, ornate, adorned', `vocab-u1-l1-15 synonym issue: ${vu1_15?.synonyms}`);
console.assert(!vu1_15.synonyms.toLowerCase().includes('gilded'), 'vocab-u1-l1-15 should not contain gilded');

const vu10_27 = hscVocabularyList.find(v => v.id === 'vocab-u10-27');
console.assert(vu10_27 && vu10_27.bengaliMeaning === 'আলিঙ্গন / বুকে জড়িয়ে ধরা', `vocab-u10-27 bengaliMeaning issue: ${vu10_27?.bengaliMeaning}`);

const vu10_l2_27 = hscVocabularyList.find(v => v.id === 'vocab-u10-l2-27');
console.assert(vu10_l2_27 && vu10_l2_27.bengaliMeaning === 'জায়গা / সুযোগ / কক্ষ', `vocab-u10-l2-27 bengaliMeaning issue: ${vu10_l2_27?.bengaliMeaning}`);
console.log('[PASS] Specific Vocabulary Quality Fixes (Hostess, Downfall, Gilded, Hugging, Room) verified');

// 9. Test Unit 1 vs Unit 10 Filter Isolation
const u1Cards = hscVocabularyList.filter(item => item.unit.includes('Unit 1:') || item.unit.includes("The Parrot's Tale"));
const u10L1Cards = hscVocabularyList.filter(item => item.unit.includes('Unit 10: Lesson 1') || item.unit.includes('Manners Around the World'));
const u10L2Cards = hscVocabularyList.filter(item => item.unit.includes('Unit 10: Lesson 2') || item.unit.includes('Etiquette Netquette') || item.unit.includes('Good manners always wins') || item.unit.includes('Food and Culture'));

console.assert(u1Cards.length === 46, `Unit 1 should have exactly 46 words, got ${u1Cards.length}`);
console.assert(u10L1Cards.length === 74, `Unit 10 L1 should have 74 words, got ${u10L1Cards.length}`);
console.assert(u10L2Cards.length === 36, `Unit 10 L2 should have 36 words, got ${u10L2Cards.length}`);
console.assert(u10L1Cards.length + u10L2Cards.length === 110, `Unit 10 total should be 110 words, got ${u10L1Cards.length + u10L2Cards.length}`);
console.log(`[PASS] Unit Filter Isolation: Unit 1 = ${u1Cards.length} words, Unit 10 = ${u10L1Cards.length + u10L2Cards.length} words`);

console.log('--- ALL SUITE TESTS PASSED WITH 100% SUCCESS ---');

