import { hscVocabularyList, hscQuestionsList } from '../src/data/questions/hscQuestionsData.js';
import { hscUnits } from '../src/data/hscUnitsData.js';

console.log('================================================================');
console.log('  TESTING FILTER ACCURACY ACROSS ALL 4 COMPONENTS');
console.log('================================================================\n');

let pass = 0;
let fail = 0;

function check(cond, name, details = '') {
  if (cond) {
    pass++;
    console.log(`  [PASS] ${name}`);
  } else {
    fail++;
    console.error(`  [FAIL] ${name} -> ${details}`);
  }
}

// 1. FlashcardsExplorer
console.log('--- 1. FlashcardsExplorer ---');
const fc_u1 = hscVocabularyList.filter(item => item.unit.includes("Unit 1:") || item.unit.includes("The Parrot's Tale"));
check(fc_u1.length === 46, 'FlashcardsExplorer Unit 1 returns 46 cards', `Got: ${fc_u1.length}`);

const fc_u10_l1 = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 1") || item.unit.includes("Manners Around the World"));
check(fc_u10_l1.length === 74, 'FlashcardsExplorer Unit 10 L1 returns 74 cards', `Got: ${fc_u10_l1.length}`);

const fc_u10_l2 = hscVocabularyList.filter(item => item.unit.includes("Unit 10: Lesson 2") || item.unit.includes("Etiquette Netquette") || item.unit.includes("Good manners always wins") || item.unit.includes("Food and Culture"));
check(fc_u10_l2.length === 36, 'FlashcardsExplorer Unit 10 L2 returns 36 cards', `Got: ${fc_u10_l2.length}`);

// 2. UnitLessonExamModal
console.log('\n--- 2. UnitLessonExamModal ---');
function examModalFilter(unitId, lessonId) {
  const selectedUnit = hscUnits.find(u => u.id === unitId);
  const selectedLesson = selectedUnit?.lessons.find(l => l.id === lessonId) || (lessonId === 'all' ? { id: 'all' } : null);

  const uNum = (selectedUnit?.unitNumber || '').toLowerCase();
  const uTitle = (selectedUnit?.unitTitle || '').toLowerCase();

  const unitQuestions = hscQuestionsList.filter((q) => {
    if (!q || !q.unit) return false;
    const qu = q.unit.toLowerCase();
    return (uNum && (qu.includes(uNum + ':') || new RegExp(`\\b${uNum}\\b`, 'i').test(qu))) || (uTitle && qu.includes(uTitle));
  });

  if (selectedLesson && selectedLesson.id !== 'all') {
    const lNum = (selectedLesson.number || '').toLowerCase();
    const lTitle = (selectedLesson.title || '').toLowerCase();

    const lessonQuestions = unitQuestions.filter((q) => {
      if (!q || !q.unit) return false;
      const qu = q.unit.toLowerCase();
      return (lNum && qu.includes(lNum)) || (lTitle && qu.includes(lTitle));
    });
    return lessonQuestions;
  }
  return unitQuestions;
}

const modalU1L1 = examModalFilter('unit-1', 'u1-l1');
check(modalU1L1.length === 180, 'UnitLessonExamModal Unit 1 Lesson 1 returns 180 questions', `Got: ${modalU1L1.length}`);

const modalU10L1 = examModalFilter('unit-10', 'u10-l1');
check(modalU10L1.length === 290, 'UnitLessonExamModal Unit 10 Lesson 1 returns 290 questions', `Got: ${modalU10L1.length}`);

const modalU10L2 = examModalFilter('unit-10', 'u10-l2');
check(modalU10L2.length === 143, 'UnitLessonExamModal Unit 10 Lesson 2 returns 143 questions', `Got: ${modalU10L2.length}`);

const modalU10All = examModalFilter('unit-10', 'all');
check(modalU10All.length === 433, 'UnitLessonExamModal Unit 10 (all lessons) returns 433 questions (290+143)', `Got: ${modalU10All.length}`);

// 3. HSCUnitsExplorer
console.log('\n--- 3. HSCUnitsExplorer ---');
function unitsExplorerCount(unitId, lessonId, catId) {
  const selectedUnit = hscUnits.find(u => u.id === unitId);
  const selectedLesson = selectedUnit?.lessons.find(l => l.id === lessonId) || (lessonId === 'all' ? { id: 'all' } : null);

  const uNum = (selectedUnit?.unitNumber || '').toLowerCase();
  const uTitle = (selectedUnit?.unitTitle || '').toLowerCase();
  const lNum = selectedLesson && selectedLesson.id !== 'all' ? (selectedLesson.number || '').toLowerCase() : '';
  const lTitle = selectedLesson && selectedLesson.id !== 'all' ? (selectedLesson.title || '').toLowerCase() : '';

  return (hscQuestionsList || []).filter((q) => {
    if (!q || (catId && q.category !== catId) || !q.unit) return false;
    const qu = q.unit.toLowerCase();
    const matchUnit = (uNum && (qu.includes(uNum + ':') || new RegExp(`\\b${uNum}\\b`, 'i').test(qu))) || (uTitle && qu.includes(uTitle));
    if (!matchUnit) return false;
    if (!lNum && !lTitle) return true;
    return (lNum && qu.includes(lNum)) || (lTitle && qu.includes(lTitle));
  }).length;
}

const ueU1 = unitsExplorerCount('unit-1', 'u1-l1', null);
check(ueU1 === 180, 'HSCUnitsExplorer Unit 1 Lesson 1 total questions is 180', `Got: ${ueU1}`);

const ueU10L1 = unitsExplorerCount('unit-10', 'u10-l1', null);
check(ueU10L1 === 290, 'HSCUnitsExplorer Unit 10 Lesson 1 total questions is 290', `Got: ${ueU10L1}`);

const ueU10L2 = unitsExplorerCount('unit-10', 'u10-l2', null);
check(ueU10L2 === 143, 'HSCUnitsExplorer Unit 10 Lesson 2 total questions is 143', `Got: ${ueU10L2}`);

// 4. VocabularyBank
console.log('\n--- 4. VocabularyBank ---');
function vocabBankFilter(unitId, lessonId) {
  const activeUnitObj = hscUnits.find(u => u.id === unitId);
  const availableLessons = activeUnitObj?.lessons || [];

  return hscVocabularyList.filter((item) => {
    if (unitId !== 'all') {
      const unitNumberStr = activeUnitObj ? activeUnitObj.unitNumber.toLowerCase() : '';
      const unitTitleStr = activeUnitObj ? activeUnitObj.unitTitle.toLowerCase() : '';
      const matchesUnit =
        item.unit &&
        ((unitNumberStr && (item.unit.toLowerCase().includes(unitNumberStr + ':') || new RegExp(`\\b${unitNumberStr}\\b`, 'i').test(item.unit))) ||
          (unitTitleStr && item.unit.toLowerCase().includes(unitTitleStr)));

      if (!matchesUnit) return false;

      if (lessonId !== 'all') {
        const lessonObj = availableLessons.find((l) => l.id === lessonId);
        if (lessonObj) {
          const lessonNumStr = lessonObj.number.toLowerCase().replace('-', ' ');
          const lessonTitleStr = lessonObj.title.toLowerCase();
          const matchesLesson =
            item.unit &&
            (item.unit.toLowerCase().includes(lessonNumStr) ||
              item.unit.toLowerCase().includes(lessonTitleStr) ||
              (lessonId === 'u10-l1' && item.unit.includes('Lesson 1')) ||
              (lessonId === 'u10-l2' && item.unit.includes('Lesson 2')) ||
              (lessonId === 'u1-l1' && item.unit.includes('Lesson 1')));

          if (!matchesLesson) return false;
        }
      }
    }
    return true;
  });
}

const vbU1 = vocabBankFilter('unit-1', 'u1-l1');
check(vbU1.length === 46, 'VocabularyBank Unit 1 Lesson 1 returns 46 words', `Got: ${vbU1.length}`);

const vbU10L1 = vocabBankFilter('unit-10', 'u10-l1');
check(vbU10L1.length === 74, 'VocabularyBank Unit 10 Lesson 1 returns 74 words', `Got: ${vbU10L1.length}`);

const vbU10L2 = vocabBankFilter('unit-10', 'u10-l2');
check(vbU10L2.length === 36, 'VocabularyBank Unit 10 Lesson 2 returns 36 words', `Got: ${vbU10L2.length}`);

const vbAll = vocabBankFilter('all', 'all');
check(vbAll.length === 156, 'VocabularyBank All returns 156 words', `Got: ${vbAll.length}`);

console.log('\n================================================================');
console.log(`  ALL COMPONENT FILTERS: ${pass} PASSED, ${fail} FAILED`);
console.log('================================================================\n');

if (fail > 0) process.exit(1);
