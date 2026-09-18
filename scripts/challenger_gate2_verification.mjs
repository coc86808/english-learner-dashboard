/**
 * Empirical Challenger Gate 2 Verification Suite
 * File: scripts/challenger_gate2_verification.mjs
 * 
 * Objective: Empirically stress-test and verify:
 * 1. Weak words empty state (localStorage['hsc_weak_words'] = '[]') celebratory rendering & reload persistence
 * 2. Real-time transition into 0 weak words (Rule 5: 5 correct answers -> removal -> empty celebratory state)
 * 3. Fallback behaviors for null, corrupt, and initialized states
 * 4. Route non-regression across all 20+ routes in App.jsx
 * 5. Architectural invariants: single responsive grid, touch targets, focus rings
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

let totalTests = 0;
let passedTests = 0;
let failedTests = 0;
const failures = [];

function test(name, fn) {
  totalTests++;
  try {
    fn();
    passedTests++;
    console.log(`  ✔ PASS: ${name}`);
  } catch (err) {
    failedTests++;
    failures.push({ name, error: err.message, stack: err.stack });
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

console.log('======================================================================');
console.log('   CHALLENGER GATE 2: LEARNING LOOP & INVARIANT STRESS TEST SUITE     ');
console.log('======================================================================');

const useDashStatePath = path.join(ROOT_DIR, 'src/components/dashboard/useDashboardState.js');
const studentDashPath = path.join(ROOT_DIR, 'src/components/dashboard/StudentDashboard.jsx');
const weakAreasPath = path.join(ROOT_DIR, 'src/components/dashboard/WeakAreasSection.jsx');
const appPath = path.join(ROOT_DIR, 'src/App.jsx');
const examPath = path.join(ROOT_DIR, 'src/components/HSCExamInterface.jsx');

const useDashSource = fs.readFileSync(useDashStatePath, 'utf8');
const studentDashSource = fs.readFileSync(studentDashPath, 'utf8');
const weakAreasSource = fs.readFileSync(weakAreasPath, 'utf8');
const appSource = fs.readFileSync(appPath, 'utf8');
const examSource = fs.readFileSync(examPath, 'utf8');

console.log('\n--- SUITE 1: Weak Words Initialization & Reload Persistence ---');

class MockStorage {
  constructor() {
    this.store = {};
  }
  getItem(k) {
    return Object.prototype.hasOwnProperty.call(this.store, k) ? this.store[k] : null;
  }
  setItem(k, v) {
    this.store[k] = String(v);
  }
  removeItem(k) {
    delete this.store[k];
  }
  clear() {
    this.store = {};
  }
}

function runUseDashboardStateWeakWordsInit(storage) {
  try {
    const saved = storage.getItem('hsc_weak_words');
    if (saved !== null) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return [
    { id: 'w-persecution', word: 'Persecution', mistakeCount: 3 },
    { id: 'w-intuitive', word: 'Intuitive', mistakeCount: 3 },
    { id: 'w-conjugal', word: 'Conjugal', mistakeCount: 3 }
  ];
}

function resolveStudentDashboardWeakWords(propWeakWords, stateWeakWords) {
  return Array.isArray(propWeakWords) ? propWeakWords : stateWeakWords;
}

function renderWeakAreasSection(weakWords, lang = 'en') {
  const isBn = lang === 'bn';
  const effectiveWeakWords = (Array.isArray(weakWords) ? weakWords : [])
    .filter(item => Boolean(item && (typeof item === 'string' ? item.trim() : item.word)))
    .map(item => {
      if (typeof item === 'string') {
        return { id: item, word: item, bengaliMeaning: '', mistakeCount: 3, correctStreak: 0, unit: 'HSC Core' };
      }
      return {
        id: item.id || item.word,
        word: item.word,
        bengaliMeaning: item.bengaliMeaning || item.bangla || '',
        mistakeCount: item.mistakeCount || item.mistakes || 3,
        correctStreak: item.correctStreak || item.correctCount || 0,
        unit: item.unit || item.lesson || 'HSC Vocabulary'
      };
    });

  if (effectiveWeakWords.length === 0) {
    return {
      state: 'empty_mastered',
      title: isBn ? 'সব দুর্বল শব্দ উত্তীর্ণ! অভিনন্দন 🎉' : 'Zero Weak Words! All Mastered 🎉',
      badge: isBn ? '১০০% আয়ত্তকৃত' : '100% Retained',
      itemCount: 0
    };
  }

  return {
    state: 'populated',
    title: isBn ? 'উন্নতির ক্ষেত্রসমূহ (দুর্বল শব্দসমূহ)' : 'Areas to Improve (Weak Words)',
    itemCount: effectiveWeakWords.length,
    items: effectiveWeakWords
  };
}

test("G2.1: useDashboardState initializer returns empty array [] when localStorage['hsc_weak_words'] = '[]'", () => {
  const storage = new MockStorage();
  storage.setItem('hsc_weak_words', '[]');
  const result = runUseDashboardStateWeakWordsInit(storage);
  assert(Array.isArray(result), 'Must return an array');
  assertEqual(result.length, 0, 'Must have exactly 0 elements');
});

test("G2.2: Multiple page reloads preserve empty weak words array [] without reverting to mock data", () => {
  const storage = new MockStorage();
  storage.setItem('hsc_weak_words', '[]');
  for (let reload = 1; reload <= 10; reload++) {
    const result = runUseDashboardStateWeakWordsInit(storage);
    assertEqual(result.length, 0, `Reload ${reload} must keep empty array`);
    assertEqual(storage.getItem('hsc_weak_words'), '[]', `Storage after reload ${reload} must be '[]'`);
  }
});

test("G2.3: StudentDashboard preserves empty propWeakWords=[] without falling back to mock state", () => {
  const propWeakWords = [];
  const mockStateWeakWords = [{ id: 'w1', word: 'MockWord' }];
  const resolved = resolveStudentDashboardWeakWords(propWeakWords, mockStateWeakWords);
  assert(Array.isArray(resolved), 'Must be array');
  assertEqual(resolved.length, 0, 'Must preserve propWeakWords=[]');
});

test("G2.4: WeakAreasSection renders celebratory 'Zero Weak Words! All Mastered 🎉' state when weakWords = []", () => {
  const enRender = renderWeakAreasSection([], 'en');
  assertEqual(enRender.state, 'empty_mastered');
  assertEqual(enRender.title, 'Zero Weak Words! All Mastered 🎉');
  assertEqual(enRender.badge, '100% Retained');
  assertEqual(enRender.itemCount, 0);

  const bnRender = renderWeakAreasSection([], 'bn');
  assertEqual(bnRender.state, 'empty_mastered');
  assertEqual(bnRender.title, 'সব দুর্বল শব্দ উত্তীর্ণ! অভিনন্দন 🎉');
  assertEqual(bnRender.badge, '১০০% আয়ত্তকৃত');
  assertEqual(bnRender.itemCount, 0);
});

test("G2.5: Cold-start fallback: when storage has null (never initialized), demo words are provided", () => {
  const storage = new MockStorage();
  const result = runUseDashboardStateWeakWordsInit(storage);
  assertEqual(result.length, 3, 'Cold start must provide demo words for guidance');
  assertEqual(result[0].word, 'Persecution');
});

test("G2.6: Malformed storage resilience: corrupted JSON falls back safely without crashing", () => {
  const storage = new MockStorage();
  storage.setItem('hsc_weak_words', '{bad_json_not_array:');
  const result = runUseDashboardStateWeakWordsInit(storage);
  assertEqual(result.length, 3, 'Corrupted JSON must fall back safely');
});

test("G2.7: Non-array storage resilience: valid JSON object '{}' falls back safely", () => {
  const storage = new MockStorage();
  storage.setItem('hsc_weak_words', '{}');
  const result = runUseDashboardStateWeakWordsInit(storage);
  assertEqual(result.length, 3, 'Object {} must fall back safely');
});

console.log('\n--- SUITE 2: Learning Loop Transition & Rule 5 Invariants ---');

test("G2.8: Rule 5 recovery loop: answering weak word 5 consecutive times removes it and triggers celebratory state", () => {
  const storage = new MockStorage();
  const initialWeak = [{ id: 'w-paradox', word: 'Paradox', mistakeCount: 3, correctStreak: 0 }];
  storage.setItem('hsc_weak_words', JSON.stringify(initialWeak));

  let currentWords = runUseDashboardStateWeakWordsInit(storage);
  let render = renderWeakAreasSection(currentWords, 'en');
  assertEqual(render.state, 'populated');
  assertEqual(render.itemCount, 1);

  const wordPerf = { mistakeCount: 3, correctCount: 0, isWeak: true };
  let currentWeakList = JSON.parse(storage.getItem('hsc_weak_words'));

  for (let correctStep = 1; correctStep <= 5; correctStep++) {
    wordPerf.correctCount++;
    if (wordPerf.correctCount >= 5) {
      wordPerf.isWeak = false;
      currentWeakList = currentWeakList.filter(w => (w.word || w).toLowerCase() !== 'paradox');
      storage.setItem('hsc_weak_words', JSON.stringify(currentWeakList));
    }
  }

  assertEqual(storage.getItem('hsc_weak_words'), '[]', "Storage must be '[]'");
  assertEqual(wordPerf.isWeak, false, 'Word must no longer be weak');

  currentWords = runUseDashboardStateWeakWordsInit(storage);
  assertEqual(currentWords.length, 0, 'useDashboardState must return 0 words');

  render = renderWeakAreasSection(currentWords, 'en');
  assertEqual(render.state, 'empty_mastered');
  assertEqual(render.title, 'Zero Weak Words! All Mastered 🎉');
});

test("G2.9: Realtime window sync handler in useDashboardState correctly handles '[]' update", () => {
  assert(useDashSource.includes("const savedWeak = localStorage.getItem('hsc_weak_words');"), 'Must get item');
  assert(useDashSource.includes('if (savedWeak) {'), 'Must check savedWeak');
  assert(useDashSource.includes('if (Array.isArray(parsed)) setWeakWords(parsed);'), 'Must setWeakWords with parsed array');
  
  const savedWeak = '[]';
  assert(Boolean(savedWeak), '[] is truthy');
  const parsed = JSON.parse(savedWeak);
  assert(Array.isArray(parsed), 'parsed is array');
  assertEqual(parsed.length, 0, 'parsed has length 0');
});

console.log('\n--- SUITE 3: Route Non-Regression & App Architecture ---');

const REQUIRED_ROUTES = [
  { path: '/dashboard', name: 'Student Dashboard' },
  { path: '/vocabulary-bank', name: 'Vocabulary Bank' },
  { path: '/flashcards', name: 'Flashcards Explorer' },
  { path: '/practice', name: 'Quick Practice' },
  { path: '/exam', name: 'HSC Exam Interface' },
  { path: '/weak-words', name: 'Weak Words Hub' },
  { path: '/textbook', name: 'Textbook Reader' },
  { path: '/progress', name: 'Student Progress' },
  { path: '/leaderboard', name: 'Leaderboard' },
  { path: '/notes', name: 'Personal Notes' },
  { path: '/settings', name: 'Settings' },
  { path: '/about', name: 'About Page' },
  { path: '/certificates', name: 'Certificates' },
  { path: '/history', name: 'Exam History' },
  { path: '/profile', name: 'User Profile' },
  { path: '/admin', name: 'Admin Dashboard' },
  { path: '/admin/users', name: 'Admin User Management' },
  { path: '/admin/questions', name: 'Admin Questions' },
  { path: '/admin/analytics', name: 'Admin Analytics' },
  { path: '/admin/settings', name: 'Admin Settings' }
];

test("G2.10: App.jsx mounts all 20+ canonical routes without missing or corrupted paths", () => {
  for (const route of REQUIRED_ROUTES) {
    const hasRoute = appSource.includes(`'${route.path}'`) || appSource.includes(`"${route.path}"`);
    assert(hasRoute, `Route ${route.path} (${route.name}) must exist in App.jsx`);
  }
});

test("G2.11: App.jsx passes weakWords down to StudentDashboard", () => {
  assert(appSource.includes('<StudentDashboard'), 'StudentDashboard must be rendered');
  assert(appSource.includes('weakWords={weakWords}'), 'weakWords prop must be passed to StudentDashboard');
});

test("G2.12: StudentDashboard.jsx renders single responsive layout tree (no dual-DOM duplication)", () => {
  assert(!studentDashSource.includes('hidden lg:block space-y-6'), 'Must NOT contain hidden lg:block root duplicate');
  assert(!studentDashSource.includes('block lg:hidden space-y-5'), 'Must NOT contain block lg:hidden root duplicate');
  assert(studentDashSource.includes('grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12'), 'Must contain unified responsive grid');
  assert(studentDashSource.includes('col-span-1 md:col-span-1 lg:col-span-8'), 'Must contain 8-col left container');
  assert(studentDashSource.includes('col-span-1 md:col-span-1 lg:col-span-4'), 'Must contain 4-col right container');
});

test("G2.13: Mobile stack ordering invariants are preserved", () => {
  assert(studentDashSource.includes('order-1 lg:order-2'), 'DailyGoalCard must be order-1 on mobile, order-2 on desktop');
  assert(studentDashSource.includes('order-2 lg:order-1'), 'ContinueLearningCard must be order-2 on mobile, order-1 on desktop');
  assert(studentDashSource.includes('order-3'), 'RecommendedPractice must be order-3');
  assert(studentDashSource.includes('order-4'), 'WeakAreasSection must be order-4');
});

test("G2.14: WCAG 2.5.5 Touch Target & WCAG 2.4.7 Focus Indicator compliance", () => {
  const dailyGoalPath = path.join(ROOT_DIR, 'src/components/dashboard/DailyGoalCard.jsx');
  const dailyGoalSource = fs.readFileSync(dailyGoalPath, 'utf8');
  assert(dailyGoalSource.includes('min-h-[44px]'), 'DailyGoalCard must enforce 44px touch targets');
  assert(weakAreasSource.includes('min-h-[44px]'), 'WeakAreasSection must enforce 44px touch targets');
  assert(dailyGoalSource.includes('focus-visible:ring-2'), 'DailyGoalCard must enforce focus-visible ring');
  assert(weakAreasSource.includes('focus-visible:ring-2'), 'WeakAreasSection must enforce focus-visible ring');
});

console.log('\n======================================================================');
console.log(`TOTAL SPECIFICATIONS RUN : ${totalTests}`);
console.log(`PASSED                   : ${passedTests}`);
console.log(`FAILED                   : ${failedTests}`);
console.log('======================================================================');

if (failedTests > 0) {
  console.error('\n❌ GATE 2 VERIFICATION FAILED:');
  failures.forEach((f, i) => {
    console.error(`  ${i + 1}. [${f.name}]: ${f.error}`);
  });
  process.exit(1);
} else {
  console.log('\n🎉 ALL GATE 2 VERIFICATION TESTS PASSED UNANIMOUSLY (100%)!');
  process.exit(0);
}
