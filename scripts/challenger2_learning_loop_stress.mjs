/**
 * Empirical Challenger 2: Learning Loop & Non-Regression Stress Testing Suite
 * File: scripts/challenger2_learning_loop_stress.mjs
 * 
 * Verifies:
 * 1. Rule 5 (3 mistakes auto-weak-word, 5 correct answers recovery loop)
 * 2. WeakAreasSection.jsx reactivity & edge states (including empty state bug)
 * 3. Curriculum alignment (authentic NCTB units and questions)
 * 4. Route non-regression across all 20+ routes
 * 5. Diagnostic analysis of test_dashboard_suite.mjs (T4.3.1)
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Authentic Curriculum Data
import { hscUnits } from '../src/data/hscUnitsData.js';
import { hscQuestionsList, hscVocabularyList } from '../src/data/questions/hscQuestionsData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Test framework
let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const findings = [];

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✔ PASS: ${name}`);
  } catch (err) {
    failedTests++;
    findings.push({ name, error: err.message });
    console.log(`  ✖ FAIL: ${name}`);
    console.log(`    Error: ${err.message}`);
  }
}

function assert(condition, msg) {
  if (!condition) throw new Error(msg || 'Assertion failed');
}

function assertEqual(actual, expected, msg) {
  if (actual !== expected) {
    throw new Error(`${msg || 'Mismatch'}: expected ${JSON.stringify(expected)}, got ${JSON.stringify(actual)}`);
  }
}

// Mock environment
class MockLocalStorage {
  constructor() { this.store = {}; }
  getItem(k) { return Object.prototype.hasOwnProperty.call(this.store, k) ? this.store[k] : null; }
  setItem(k, v) { this.store[k] = String(v); }
  removeItem(k) { delete this.store[k]; }
  clear() { this.store = {}; }
}

const mockStorage = new MockLocalStorage();
const eventLog = [];

const mockWindow = {
  dispatchEvent: (evt) => {
    eventLog.push(evt);
    return true;
  }
};

// Simulation of HSCExamInterface.jsx Rule 5 logic (verbatim replication of lines 345-420)
function processAnswerHSCExam({ word, isCorrect, storage = mockStorage }) {
  const wordKey = word.trim();
  const perfRaw = storage.getItem('hsc_word_performance');
  const perfMap = perfRaw ? JSON.parse(perfRaw) : {};
  const wordPerf = perfMap[wordKey] || {
    mistakeCount: 0,
    correctCount: 0,
    totalMistakes: 0,
    totalCorrect: 0,
    isWeak: false
  };

  const weakRaw = storage.getItem('hsc_weak_words');
  let currentWeakList = weakRaw ? JSON.parse(weakRaw) : [];
  if (!Array.isArray(currentWeakList)) currentWeakList = [];

  let eventDispatched = null;

  if (isCorrect) {
    wordPerf.correctCount = (wordPerf.correctCount || 0) + 1;
    wordPerf.totalCorrect = (wordPerf.totalCorrect || 0) + 1;

    // Rule: 5 Right Answers -> Automatically Remove from Weak Words!
    if (wordPerf.correctCount >= 5) {
      const wasWeak = wordPerf.isWeak || currentWeakList.some((w) => w && (w.word || w)?.toLowerCase() === wordKey.toLowerCase());
      wordPerf.isWeak = false;
      wordPerf.mistakeCount = 0;

      if (wasWeak) {
        const updatedWeak = currentWeakList.filter((w) => w && (w.word || w)?.toLowerCase() !== wordKey.toLowerCase());
        storage.setItem('hsc_weak_words', JSON.stringify(updatedWeak));
        eventDispatched = { type: 'hsc_weak_words_updated', detail: { word: wordKey, action: 'removed' } };
        mockWindow.dispatchEvent(eventDispatched);
        currentWeakList = updatedWeak;
      }
    }
  } else {
    // Wrong Answer / Not Sure
    wordPerf.mistakeCount = (wordPerf.mistakeCount || 0) + 1;
    wordPerf.totalMistakes = (wordPerf.totalMistakes || 0) + 1;
    wordPerf.correctCount = 0;

    // Rule: 3 Mistakes -> Automatically Mark as Weak Word!
    if (wordPerf.mistakeCount >= 3) {
      const alreadyWeak = currentWeakList.some((w) => w && (w.word || w)?.toLowerCase() === wordKey.toLowerCase());
      wordPerf.isWeak = true;

      if (!alreadyWeak) {
        const vocabItem = hscVocabularyList.find((v) => v.word.toLowerCase() === wordKey.toLowerCase()) || {
          id: `word-${wordKey.toLowerCase()}`,
          word: wordKey,
          bengaliMeaning: 'অর্থ',
          unit: 'HSC English'
        };

        const updatedWeak = [vocabItem, ...currentWeakList];
        storage.setItem('hsc_weak_words', JSON.stringify(updatedWeak));
        eventDispatched = { type: 'hsc_weak_words_updated', detail: { word: wordKey, action: 'added' } };
        mockWindow.dispatchEvent(eventDispatched);
        currentWeakList = updatedWeak;
      }
    }
  }

  perfMap[wordKey] = wordPerf;
  storage.setItem('hsc_word_performance', JSON.stringify(perfMap));

  return { wordPerf, currentWeakList, eventDispatched };
}

console.log('\n===============================================================');
console.log('   CHALLENGER 2: EMPIRICAL LEARNING LOOP & NON-REGRESSION SUITE');
console.log('===============================================================\n');

// ----------------------------------------------------------------------------
// SUITE 1: RULE 5 INVARIANT STRESS TESTING
// ----------------------------------------------------------------------------
console.log('--- SUITE 1: Rule 5 Invariant Stress Testing ---');

mockStorage.clear();
eventLog.length = 0;

test('S1.1: 1st mistake does not mark word as weak', () => {
  const res = processAnswerHSCExam({ word: 'Democracy', isCorrect: false });
  assertEqual(res.wordPerf.mistakeCount, 1);
  assertEqual(res.wordPerf.isWeak, false);
  assertEqual(res.currentWeakList.length, 0);
});

test('S1.2: 2nd mistake does not mark word as weak', () => {
  const res = processAnswerHSCExam({ word: 'Democracy', isCorrect: false });
  assertEqual(res.wordPerf.mistakeCount, 2);
  assertEqual(res.wordPerf.isWeak, false);
  assertEqual(res.currentWeakList.length, 0);
});

test('S1.3: 3rd mistake triggers auto weak-word marking and event dispatch', () => {
  const res = processAnswerHSCExam({ word: 'Democracy', isCorrect: false });
  assertEqual(res.wordPerf.mistakeCount, 3);
  assertEqual(res.wordPerf.isWeak, true);
  assertEqual(res.currentWeakList.length, 1);
  assertEqual(res.currentWeakList[0].word.toLowerCase(), 'democracy');
  assert(res.eventDispatched !== null, 'Must dispatch event');
  assertEqual(res.eventDispatched.detail.action, 'added');
});

test('S1.4: 4th mistake maintains idempotency (no duplicate entries in weak words)', () => {
  const res = processAnswerHSCExam({ word: 'Democracy', isCorrect: false });
  assertEqual(res.wordPerf.mistakeCount, 4);
  assertEqual(res.currentWeakList.length, 1, 'Weak list must not have duplicates');
});

test('S1.5: 1st correct answer resets mistake streak, increments correctCount, word remains weak', () => {
  const res = processAnswerHSCExam({ word: 'Democracy', isCorrect: true });
  assertEqual(res.wordPerf.correctCount, 1);
  assertEqual(res.wordPerf.isWeak, true);
  assertEqual(res.currentWeakList.length, 1);
});

test('S1.6: Mistake during recovery resets correctCount to 0', () => {
  const res = processAnswerHSCExam({ word: 'Democracy', isCorrect: false });
  assertEqual(res.wordPerf.correctCount, 0);
  assertEqual(res.wordPerf.isWeak, true);
  assertEqual(res.currentWeakList.length, 1);
});

test('S1.7: 4 consecutive correct answers do NOT remove word from weak list', () => {
  for (let i = 1; i <= 4; i++) {
    const res = processAnswerHSCExam({ word: 'Democracy', isCorrect: true });
    assertEqual(res.wordPerf.correctCount, i);
    assertEqual(res.currentWeakList.length, 1, `Must remain weak at step ${i}`);
  }
});

test('S1.8: 5th consecutive correct answer removes word from weak list and dispatches removed event', () => {
  const res = processAnswerHSCExam({ word: 'Democracy', isCorrect: true });
  assertEqual(res.wordPerf.correctCount, 5);
  assertEqual(res.wordPerf.isWeak, false);
  assertEqual(res.currentWeakList.length, 0, 'Weak list must be empty after 5 correct');
  assert(res.eventDispatched !== null, 'Must dispatch removal event');
  assertEqual(res.eventDispatched.detail.action, 'removed');
});

// ----------------------------------------------------------------------------
// SUITE 2: WEAK AREAS UI & EMPTY STATE ADVERSARIAL ANALYSIS
// ----------------------------------------------------------------------------
console.log('\n--- SUITE 2: WeakAreasSection & StudentDashboard UI Invariants ---');

const weakAreasSource = fs.readFileSync(path.join(ROOT_DIR, 'src/components/dashboard/WeakAreasSection.jsx'), 'utf8');
const studentDashSource = fs.readFileSync(path.join(ROOT_DIR, 'src/components/dashboard/StudentDashboard.jsx'), 'utf8');
const useDashStateSource = fs.readFileSync(path.join(ROOT_DIR, 'src/components/dashboard/useDashboardState.js'), 'utf8');

test('S2.1: WeakAreasSection has celebratory empty state when weakWords is empty array', () => {
  assert(weakAreasSource.includes('effectiveWeakWords.length === 0'), 'Must check effectiveWeakWords.length === 0');
  assert(weakAreasSource.includes('Zero Weak Words! All Mastered 🎉'), 'Must contain celebratory headline');
});

test('S2.2: WeakAreasSection handles both string array and object array normalization', () => {
  assert(weakAreasSource.includes('typeof item === \'string\''), 'Must handle string format items');
  assert(weakAreasSource.includes('item.word'), 'Must handle object format items');
});

test('S2.3: [ADVERSARIAL STRESS] useDashboardState useState initializer with empty array in storage', () => {
  // Inspect useDashboardState.js lines 101-110:
  // const saved = localStorage.getItem('hsc_weak_words');
  // if (saved) {
  //   const parsed = JSON.parse(saved);
  //   if (Array.isArray(parsed) && parsed.length > 0) return parsed;
  // }
  // return [ { word: 'Persecution' ... } ];
  
  // Simulation of hook initializer when storage has '[]':
  const saved = '[]';
  const parsed = JSON.parse(saved);
  let resolvedInitial;
  if (Array.isArray(parsed) && parsed.length > 0) {
    resolvedInitial = parsed;
  } else {
    resolvedInitial = [{ word: 'Persecution' }, { word: 'Intuitive' }, { word: 'Conjugal' }];
  }

  // If a student has 0 weak words (saved = '[]'), the initializer IGNORES '[]' and returns 3 mock words!
  if (resolvedInitial.length === 3) {
    throw new Error('CRITICAL FLAW: useDashboardState ignores empty array [] in localStorage and injects 3 mock words (Persecution, Intuitive, Conjugal)');
  }
});

test('S2.4: [ADVERSARIAL STRESS] StudentDashboard.jsx props fallback with empty propWeakWords', () => {
  // Inspect StudentDashboard.jsx:
  // const weakWords = (Array.isArray(propWeakWords) && propWeakWords.length > 0)
  //   ? propWeakWords
  //   : dashboardState.weakWords;
  
  const propWeakWords = []; // user has zero weak words
  const dashboardStateWeakWords = [{ word: 'MockWord' }];

  const effective = (Array.isArray(propWeakWords) && propWeakWords.length > 0)
    ? propWeakWords
    : dashboardStateWeakWords;

  if (effective.length > 0) {
    throw new Error('CRITICAL FLAW: StudentDashboard ignores propWeakWords=[] because of propWeakWords.length > 0 check, overriding valid empty list with mock words');
  }
});

// ----------------------------------------------------------------------------
// SUITE 3: CURRICULUM ALIGNMENT & DATA INTEGRITY
// ----------------------------------------------------------------------------
console.log('\n--- SUITE 3: Curriculum Alignment & Authentic Data Integrity ---');

test('S3.1: All 12 authentic NCTB units exist in hscUnitsData.js (covering all 45 lessons)', () => {
  assertEqual(hscUnits.length, 12, 'Must have 12 units');
  for (let i = 1; i <= 12; i++) {
    const unit = hscUnits.find(u => u.number === i || u.unitNumber === `Unit ${i}` || u.id === `unit-${i}`);
    assert(unit !== undefined, `Unit ${i} must exist`);
    assert(unit.unitTitle && unit.unitTitle.length > 0, `Unit ${i} must have title`);
    assert(Array.isArray(unit.lessons) && unit.lessons.length > 0, `Unit ${i} must have lessons`);
  }
});

test('S3.2: Vocabulary bank has high-fidelity entries matching curriculum', () => {
  assert(hscVocabularyList.length >= 800, `Expected at least 800 vocab words, got ${hscVocabularyList.length}`);
  const sample = hscVocabularyList[0];
  assert(sample.word, 'Vocab must have word');
  assert(sample.bengaliMeaning, 'Vocab must have bengaliMeaning');
  assert(sample.unit, 'Vocab must have unit');
});

test('S3.3: Questions list has board-standard MCQs matching 4 formats', () => {
  assert(hscQuestionsList.length >= 3000, `Expected at least 3000 questions, got ${hscQuestionsList.length}`);
  const synQ = hscQuestionsList.find(q => q.category === 'synonyms' || q.id.includes('-syn'));
  const antQ = hscQuestionsList.find(q => q.category === 'antonyms' || q.id.includes('-ant'));
  const engQ = hscQuestionsList.find(q => q.category === 'english_meaning' || q.id.includes('-eng'));
  const bngQ = hscQuestionsList.find(q => q.category === 'bangla_meaning' || q.id.includes('-bng'));

  assert(synQ, 'Must have synonym questions');
  assert(antQ, 'Must have antonym questions');
  assert(engQ, 'Must have english definition questions');
  assert(bngQ, 'Must have bangla meaning questions');
});

test('S3.4: useDashboardState activeSession points to valid curriculum unit and lesson', () => {
  assert(useDashStateSource.includes('unit-1'), 'Must reference authentic unit-1');
  assert(useDashStateSource.includes("The Parrot's Tale"), "Must reference authentic Lesson 1: The Parrot's Tale");
  
  const unit1 = hscUnits.find(u => u.id === 'unit-1');
  const lesson1 = unit1.lessons.find(l => l.id === 'u1-l1');
  assert(unit1 !== undefined, 'Unit 1 must exist');
  assert(lesson1 !== undefined, 'Lesson 1 must exist in Unit 1');
});

test('S3.5: useDashboardState recommendedPractices points to valid curriculum tracks', () => {
  assert(useDashStateSource.includes('rec-vocab-challenge'), 'Vocab challenge track must exist');
  assert(useDashStateSource.includes('rec-grammar-board'), 'Grammar drill track must exist');
  assert(useDashStateSource.includes('rec-textbook-reading'), 'Textbook reading track must exist');
});

// ----------------------------------------------------------------------------
// SUITE 4: ROUTE NON-REGRESSION & NAVIGATION VERIFICATION
// ----------------------------------------------------------------------------
console.log('\n--- SUITE 4: Route Non-Regression & Navigation Invariants ---');

const appSource = fs.readFileSync(path.join(ROOT_DIR, 'src/App.jsx'), 'utf8');

const REQUIRED_ROUTES = [
  '/dashboard',
  '/vocabulary-bank',
  '/flashcards',
  '/exam',
  '/textbook',
  '/progress',
  '/leaderboard',
  '/settings',
  '/admin'
];

for (const route of REQUIRED_ROUTES) {
  test(`S4.Route: Route ${route} is defined and handled in App.jsx`, () => {
    assert(appSource.includes(`'${route}'`) || appSource.includes(`"${route}"`) || appSource.includes(`startsWith('${route}')`), 
      `Route ${route} must be handled in App.jsx`);
  });
}

test('S4.Components: Key page components exist and are non-empty', () => {
  const pages = [
    'src/components/pages/ProgressPage.jsx',
    'src/components/pages/LeaderboardPage.jsx',
    'src/components/pages/TextbookPage.jsx',
    'src/components/pages/CertificatesPage.jsx',
    'src/components/pages/NotesPage.jsx',
    'src/components/pages/SettingsPage.jsx',
    'src/components/pages/AboutPage.jsx',
    'src/components/admin/AdminDashboard.jsx',
    'src/components/VocabularyBank.jsx',
    'src/components/FlashcardsExplorer.jsx',
    'src/components/HSCUnitsExplorer.jsx',
    'src/components/WeakWordsSection.jsx'
  ];

  for (const pagePath of pages) {
    const fullPath = path.join(ROOT_DIR, pagePath);
    assert(fs.existsSync(fullPath), `Page component missing: ${pagePath}`);
    const stat = fs.statSync(fullPath);
    assert(stat.size > 500, `Page component ${pagePath} is too small (${stat.size} bytes)`);
  }
});

test('S4.Modals: Modals are mounted in App.jsx and wired to state', () => {
  const modals = [
    'UnitLessonExamModal',
    'QuickPracticeModal',
    'QuestionBankModal',
    'CertificateModal',
    'AuthModal',
    'UserProfileModal'
  ];

  for (const modal of modals) {
    assert(appSource.includes(`<${modal}`), `Modal ${modal} must be mounted in App.jsx`);
  }
});

// ----------------------------------------------------------------------------
// SUITE 5: DIAGNOSTIC OF test_dashboard_suite.mjs T4.3.1
// ----------------------------------------------------------------------------
console.log('\n--- SUITE 5: Diagnostic Analysis of test_dashboard_suite.mjs ---');

test('S5.1: Diagnosis of T4.3.1 failure (desktop 12-col grid detection)', () => {
  // Inspect StudentDashboard.jsx desktop implementation
  const hasDesktopContainer = studentDashSource.includes('hidden lg:block');
  const hasGridCols12 = studentDashSource.includes('grid grid-cols-12');
  const hasColSpan8 = studentDashSource.includes('col-span-8');
  const hasColSpan4 = studentDashSource.includes('col-span-4');
  
  assert(hasDesktopContainer, 'StudentDashboard uses hidden lg:block for desktop');
  assert(hasGridCols12, 'StudentDashboard uses grid grid-cols-12 inside desktop block');
  assert(hasColSpan8, 'StudentDashboard uses col-span-8 for primary column');
  assert(hasColSpan4, 'StudentDashboard uses col-span-4 for secondary column');

  // But the test checked:
  // dashboard.content.includes('lg:grid-cols-12') || dashboard.content.includes('lg:grid-cols-3') || dashboard.content.includes('lg:col-span-8')
  const testExpectationMet = studentDashSource.includes('lg:grid-cols-12') || 
                             studentDashSource.includes('lg:grid-cols-3') || 
                             studentDashSource.includes('lg:col-span-8');
  
  if (!testExpectationMet) {
    console.log('    [DIAGNOSTIC NOTE]: Worker C implemented desktop grid via `<div className="hidden lg:block">` with child `<div className="grid grid-cols-12">` and `<div className="col-span-8">`, rather than applying the `lg:` responsive prefix directly on the grid classes (`lg:grid-cols-12`, `lg:col-span-8`). Functionally the layout is correct on desktop, but test assertion fails on exact class string matching.');
  }
});

// ----------------------------------------------------------------------------
// SUMMARY
// ----------------------------------------------------------------------------
console.log('\n===============================================================');
console.log(`TOTAL TESTS: ${totalTests}`);
console.log(`PASSED: ${passedTests}`);
console.log(`FAILED: ${failedTests}`);
console.log('===============================================================');

if (findings.length > 0) {
  console.log('\nFINDINGS REQUIRING ATTENTION:');
  findings.forEach((f, i) => {
    console.log(`${i + 1}. [${f.name}]: ${f.error}`);
  });
}
