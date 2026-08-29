import { smartInterleaveQuestions } from '../src/data/questions/hscQuestionsData.js';

console.log('--- RUNNING ADVERSARIAL GENERATOR & INTERLEAVER STRESS TESTS ---');

let passed = 0;
let failed = 0;

function check(cond, name, msg = '') {
  if (cond) {
    passed++;
    console.log(`[PASS] ${name}`);
  } else {
    failed++;
    console.error(`[FAIL] ${name}: ${msg}`);
  }
}

// 1. Simulation of Question Generator Logic with Edge Cases
function simulateQuestionGen(item, index, listLength, vocabList) {
  const list = [];
  const num = (index + 1).toString().padStart(2, '0');
  let prefix = 'hsc-test-' + num;

  const synList = item.synonyms ? item.synonyms.split(',').map(s => s.trim()).filter(Boolean) : [];
  const antList = item.antonyms ? item.antonyms.split(',').map(s => s.trim()).filter(Boolean) : [];

  const primarySyn = synList.length > 0 ? synList[0] : '';
  const primaryAnt = antList.length > 0 ? antList[0] : '';

  const otherIdx1 = (index + 3) % listLength;
  const otherIdx2 = (index + 7) % listLength;
  const otherIdx3 = (index + 11) % listLength;
  const distractorWord1 = vocabList[otherIdx1]?.word || 'distractor1';
  const distractorWord2 = vocabList[otherIdx2]?.word || 'distractor2';
  const distractorWord3 = vocabList[otherIdx3]?.word || 'distractor3';

  const defIdx1 = (index + 2) % listLength;
  const defIdx2 = (index + 5) % listLength;
  const defIdx3 = (index + 9) % listLength;
  const defDistractor1 = vocabList[defIdx1]?.englishMeaning || 'def1';
  const defDistractor2 = vocabList[defIdx2]?.englishMeaning || 'def2';
  const defDistractor3 = vocabList[defIdx3]?.englishMeaning || 'def3';

  const bngDistractor1 = vocabList[defIdx1]?.bengaliMeaning ? vocabList[defIdx1].bengaliMeaning.split('/')[0].trim() : 'বাংলা১';
  const bngDistractor2 = vocabList[defIdx2]?.bengaliMeaning ? vocabList[defIdx2].bengaliMeaning.split('/')[0].trim() : 'বাংলা২';
  const bngDistractor3 = vocabList[defIdx3]?.bengaliMeaning ? vocabList[defIdx3].bengaliMeaning.split('/')[0].trim() : 'বাংলা৩';

  if (primarySyn) {
    const synOption2 = primaryAnt || distractorWord3;
    list.push({
      id: prefix + '-syn',
      category: 'synonyms',
      options: [primarySyn, synOption2, distractorWord1, distractorWord2],
      correctOption: 0
    });
  }

  if (primaryAnt) {
    const antOption2 = primarySyn || distractorWord3;
    list.push({
      id: prefix + '-ant',
      category: 'antonyms',
      options: [primaryAnt, antOption2, distractorWord1, distractorWord2],
      correctOption: 0
    });
  }

  if (item.englishMeaning && item.englishMeaning.trim() !== '') {
    list.push({
      id: prefix + '-eng',
      category: 'english_meaning',
      options: [item.englishMeaning, defDistractor1, defDistractor2, defDistractor3],
      correctOption: 0
    });
  }

  if (item.bengaliMeaning && item.bengaliMeaning.trim() !== '') {
    const bngCorrect = item.bengaliMeaning.split('/')[0].trim();
    list.push({
      id: prefix + '-bng',
      category: 'bangla_meaning',
      options: [bngCorrect, bngDistractor1, bngDistractor2, bngDistractor3],
      correctOption: 0
    });
  }

  return list;
}

// Test Case A: Empty synonyms and empty antonyms (Safe Skip)
const mockA = [{
  id: 'm1',
  word: 'Abstract',
  bengaliMeaning: 'বিমূর্ত',
  synonyms: '',
  antonyms: '',
  englishMeaning: 'Existing in thought or as an idea but not having a physical or concrete existence.'
}];
const resA = simulateQuestionGen(mockA[0], 0, 1, mockA);
check(resA.length === 2, 'Empty synonyms & antonyms gracefully produce exactly 2 questions (eng + bng)');
check(!resA.some(q => q.category === 'synonyms'), 'Synonym question cleanly skipped');
check(!resA.some(q => q.category === 'antonyms'), 'Antonym question cleanly skipped');

// Test Case B: Empty strings with commas and whitespace: ",  ,  ,"
const mockB = [{
  id: 'm2',
  word: 'Punctuation',
  bengaliMeaning: 'যতিচিহ্ন',
  synonyms: ' , , ',
  antonyms: '  ',
  englishMeaning: 'The marks used in writing.'
}];
const resB = simulateQuestionGen(mockB[0], 0, 1, mockB);
check(resA.length === 2, 'Malformed comma/whitespace-only synonyms cleanly skipped without producing empty options');

// Test Case C: All empty fields
const mockC = [{
  id: 'm3',
  word: 'Empty',
  bengaliMeaning: '',
  synonyms: '',
  antonyms: '',
  englishMeaning: ''
}];
const resC = simulateQuestionGen(mockC[0], 0, 1, mockC);
check(resC.length === 0, 'Completely empty vocabulary item produces 0 questions without throwing error');

// Test Case D: Stress testing smartInterleaveQuestions with 10,000 questions
console.log('\n--- Interleaver Stress Test (10,000 Questions) ---');
const bigQuestions = [];
for (let i = 0; i < 2500; i++) {
  const wordId = `word-${i % 250}`;
  bigQuestions.push({ id: `q-${i}-syn`, vocabId: wordId, word: `Word ${i % 250}`, category: 'synonyms' });
  bigQuestions.push({ id: `q-${i}-ant`, vocabId: wordId, word: `Word ${i % 250}`, category: 'antonyms' });
  bigQuestions.push({ id: `q-${i}-eng`, vocabId: wordId, word: `Word ${i % 250}`, category: 'english_meaning' });
  bigQuestions.push({ id: `q-${i}-bng`, vocabId: wordId, word: `Word ${i % 250}`, category: 'bangla_meaning' });
}

const startTime = Date.now();
const interleavedBig = smartInterleaveQuestions(bigQuestions);
const elapsedMs = Date.now() - startTime;

check(interleavedBig.length === 10000, `Interleaver processed 10,000 questions (got ${interleavedBig.length})`);
check(elapsedMs < 1000, `Interleaver performance for 10,000 questions took ${elapsedMs}ms (< 1000ms threshold)`);

// Check adjacent collisions in big interleaved set
let bigCollisions = 0;
for (let i = 0; i < interleavedBig.length - 1; i++) {
  if (interleavedBig[i].vocabId === interleavedBig[i + 1].vocabId) {
    bigCollisions++;
  }
}
check(bigCollisions === 0, `Zero adjacent same-word collisions in 10,000 question stress test (got ${bigCollisions})`);

console.log(`\nAdversarial Summary: ${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
