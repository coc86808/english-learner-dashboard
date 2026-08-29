import { hscVocabularyList, hscQuestionsList, buildQuestionsDatabase, smartInterleaveQuestions, getFilteredCategoryQuestions } from '../src/data/questions/hscQuestionsData.js';

console.log('================================================================');
console.log('  DEEP ADVERSARIAL STRESS TEST & LOGICAL INTEGRITY HARNESS');
console.log('================================================================\n');

let pass = 0;
let fail = 0;

function test(cond, desc, err = '') {
  if (cond) {
    pass++;
    console.log(`  [PASS] ${desc}`);
  } else {
    fail++;
    console.error(`  [FAIL] ${desc} -> ${err}`);
  }
}

// 1. Check every question's correct option against vocabulary source
console.log('--- 1. Question Ground Truth Verification ---');
let groundTruthMismatches = 0;
hscQuestionsList.forEach(q => {
  const vocab = hscVocabularyList[q.wordIndex];
  if (!vocab) {
    groundTruthMismatches++;
    console.error(`Missing vocab for question ${q.id} (index ${q.wordIndex})`);
    return;
  }

  if (q.category === 'synonyms') {
    const synList = vocab.synonyms.split(',').map(s => s.trim());
    const expected = synList[0];
    if (q.options[0] !== expected) {
      groundTruthMismatches++;
      console.error(`Synonym mismatch in ${q.id}: expected "${expected}", got "${q.options[0]}"`);
    }
  } else if (q.category === 'antonyms') {
    const antList = vocab.antonyms.split(',').map(s => s.trim());
    const expected = antList[0];
    if (q.options[0] !== expected) {
      groundTruthMismatches++;
      console.error(`Antonym mismatch in ${q.id}: expected "${expected}", got "${q.options[0]}"`);
    }
  } else if (q.category === 'english_meaning') {
    const expected = vocab.englishMeaning;
    if (q.options[0] !== expected) {
      groundTruthMismatches++;
      console.error(`English meaning mismatch in ${q.id}: expected "${expected}", got "${q.options[0]}"`);
    }
  } else if (q.category === 'bangla_meaning') {
    const expected = vocab.bengaliMeaning.split('/')[0].trim();
    if (q.options[0] !== expected) {
      groundTruthMismatches++;
      console.error(`Bangla meaning mismatch in ${q.id}: expected "${expected}", got "${q.options[0]}"`);
    }
  }
});
test(groundTruthMismatches === 0, `All 613 questions match exact vocabulary ground truth`, `Mismatches: ${groundTruthMismatches}`);

// 2. Check distractor collision with correct option
console.log('\n--- 2. Distractor Collision Check ---');
let distractorCollisions = 0;
hscQuestionsList.forEach(q => {
  const correct = q.options[0].toLowerCase().trim();
  for (let i = 1; i < q.options.length; i++) {
    if (q.options[i].toLowerCase().trim() === correct) {
      distractorCollisions++;
      console.error(`Collision in ${q.id} (${q.category}): option ${i} "${q.options[i]}" == correct "${q.options[0]}"`);
    }
  }
});
test(distractorCollisions === 0, `0 distractor collisions across all 613 questions`, `Found: ${distractorCollisions}`);

// 3. Immutability test on smartInterleaveQuestions
console.log('\n--- 3. Function Immutability & Robustness ---');
const originalQuestionsSnapshot = JSON.stringify(hscQuestionsList);
const interleaved = smartInterleaveQuestions(hscQuestionsList);
test(JSON.stringify(hscQuestionsList) === originalQuestionsSnapshot, `smartInterleaveQuestions does not mutate source array`);

// 4. Single-word questions interleaver
const singleWordQuestions = hscQuestionsList.filter(q => q.word === 'Bounty');
const interleavedSingleWord = smartInterleaveQuestions(singleWordQuestions);
test(interleavedSingleWord.length === singleWordQuestions.length, `smartInterleaveQuestions handles single-word question set (${interleavedSingleWord.length} items)`);

// 5. Stress test getFilteredCategoryQuestions with invalid / empty inputs
const invalidFiltered = getFilteredCategoryQuestions([]);
test(invalidFiltered.length === 613, `getFilteredCategoryQuestions([]) defaults to all 613 questions`);

const unknownFiltered = getFilteredCategoryQuestions(['non_existent_category']);
test(unknownFiltered.length === 0, `getFilteredCategoryQuestions with unknown category returns empty array cleanly`);

// 6. Verify 11 concrete words that correctly omit antonyms (nouns/concrete objects)
console.log('\n--- 6. Concrete/Noun Words Antonym Omission Validation ---');
const expectedOmittedWords = [
  'Personnel', 'Percussion', 'Scripture', 'Twig', 'Chopsticks',
  'Utensils', 'Grocery', 'Cheek', 'Cue', 'Gristle', 'Gravy'
];
let omittedMismatch = 0;
expectedOmittedWords.forEach(w => {
  const entry = hscVocabularyList.find(v => v.word.toLowerCase() === w.toLowerCase());
  if (!entry) {
    omittedMismatch++;
    console.error(`Expected word "${w}" not found in vocabulary!`);
  } else if (entry.antonyms !== '') {
    omittedMismatch++;
    console.error(`Expected word "${w}" to have antonyms="", but found: "${entry.antonyms}"`);
  }
});
test(omittedMismatch === 0, `All 11 concrete/noun words have accurately omitted antonyms (antonyms: "") per spec`);

console.log('\n================================================================');
console.log(`  RESULTS: ${pass} PASSED, ${fail} FAILED`);
console.log('================================================================\n');

if (fail > 0) process.exit(1);
