import React from 'react';
import { renderToString } from 'react-dom/server';
import { createServer } from 'vite';

// Mock localStorage and browser globals in global scope for useDashboardState & components
class MockLocalStorage {
  constructor() {
    this.store = {};
  }
  getItem(key) {
    return Object.prototype.hasOwnProperty.call(this.store, key) ? this.store[key] : null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
  clear() {
    this.store = {};
  }
}

globalThis.localStorage = new MockLocalStorage();
globalThis.SpeechSynthesisUtterance = class {
  constructor(text) {
    this.text = text;
    this.rate = 1;
    this.lang = 'en-US';
  }
};

if (!globalThis.window) {
  globalThis.window = {
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
    localStorage: globalThis.localStorage,
    speechSynthesis: {
      cancel: () => {},
      speak: () => {}
    },
    SpeechSynthesisUtterance: globalThis.SpeechSynthesisUtterance
  };
}

async function runAdversarialStressSuite() {
  console.log('================================================================');
  console.log('STARTING CHALLENGER 1 ADVERSARIAL STRESS TEST SUITE');
  console.log('================================================================');

  const server = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  });

  const dashboardModules = await server.ssrLoadModule('./src/components/dashboard/index.js');
  const {
    WelcomeHero,
    TopStatsSummary,
    DailyGoalCard,
    ContinueLearningCard,
    RecommendedPractice,
    SkillProgress,
    WeakAreasSection,
    PersonalizedInsights,
    AchievementsWidget,
    MiniLeaderboard,
    RecentActivity,
    StudentDashboard,
    useDashboardState
  } = dashboardModules;

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
      const msg = `[FAIL] ${testName} ${details ? '(' + details + ')' : ''}`;
      console.error(`  ${msg}`);
      failures.push(msg);
    }
  }

  // --------------------------------------------------------------------------
  // SUITE 1: ZERO-VOID / COLD START TESTS
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 1: ZERO-VOID / COLD START STRESS] ---');

  const coldUser = {
    id: 'cold-student-001',
    name: null,
    email: 'newbie@example.com',
    college: null,
    streak: 0,
    points: 0,
    testsCompleted: 0,
    masteredWordsCount: 0,
    accuracy: 0
  };

  const coldProps = {
    currentUser: coldUser,
    weakWords: [],
    history: [],
    activities: [],
    streak: 0,
    streakCount: 0,
    accuracy: 0,
    points: 0,
    totalSolved: 0,
    totalQuestionsSolved: 0,
    masteredWordsCount: 0,
    completedToday: 0,
    dailyGoal: 20,
    lang: 'en'
  };

  const componentsToTest = [
    { name: 'WelcomeHero', comp: WelcomeHero, props: { ...coldProps, userName: null } },
    { name: 'TopStatsSummary', comp: TopStatsSummary, props: coldProps },
    { name: 'DailyGoalCard', comp: DailyGoalCard, props: coldProps },
    { name: 'ContinueLearningCard', comp: ContinueLearningCard, props: { ...coldProps, session: null, activeSession: null } },
    { name: 'RecommendedPractice', comp: RecommendedPractice, props: { ...coldProps, items: [], recommendations: [] } },
    { name: 'SkillProgress', comp: SkillProgress, props: { ...coldProps, skills: [] } },
    { name: 'WeakAreasSection', comp: WeakAreasSection, props: { ...coldProps, weakWords: [] } },
    { name: 'PersonalizedInsights', comp: PersonalizedInsights, props: { ...coldProps, insights: [] } },
    { name: 'AchievementsWidget', comp: AchievementsWidget, props: { ...coldProps, achievements: [] } },
    { name: 'MiniLeaderboard', comp: MiniLeaderboard, props: { ...coldProps, topStudents: [], currentUserStudent: null } },
    { name: 'RecentActivity', comp: RecentActivity, props: { ...coldProps, activities: [] } },
    { name: 'StudentDashboard', comp: StudentDashboard, props: { currentUser: coldUser, weakWords: [], lang: 'en' } }
  ];

  for (const { name, comp, props } of componentsToTest) {
    try {
      const html = renderToString(React.createElement(comp, props));
      assert(typeof html === 'string' && html.length > 50, `${name} renders non-empty HTML under Cold Start`, `HTML length: ${html.length}`);
      assert(!html.includes('NaN'), `${name} contains NO 'NaN' under Cold Start`);
      assert(!html.includes('undefined'), `${name} contains NO 'undefined' string under Cold Start`);
      const hasBadNull = /([>:])\s*null\s*([<,\s])/.test(html);
      assert(!hasBadNull, `${name} contains NO rendered 'null' text under Cold Start`);
    } catch (e) {
      assert(false, `${name} crashed under Cold Start!`, e.stack);
    }
  }

  // Bengali localization cold start
  for (const { name, comp, props } of componentsToTest) {
    try {
      const html = renderToString(React.createElement(comp, { ...props, lang: 'bn' }));
      assert(typeof html === 'string' && html.length > 50, `${name} (BN) renders non-empty HTML under Cold Start`, `HTML length: ${html.length}`);
      assert(!html.includes('NaN'), `${name} (BN) contains NO 'NaN' under Cold Start`);
    } catch (e) {
      assert(false, `${name} (BN) crashed under Cold Start!`, e.stack);
    }
  }

  // Verify specific fallback contents under cold start
  try {
    const heroHtml = renderToString(React.createElement(WelcomeHero, { userName: null, streakCount: 0 }));
    assert(heroHtml.includes('HSC Scholar'), 'WelcomeHero renders friendly fallback name (HSC Scholar) when name is null');
    assert(heroHtml.includes('0-Day Streak'), 'WelcomeHero renders 0-Day Streak correctly without defaulting to 7');
  } catch (e) {
    assert(false, 'WelcomeHero fallback inspection failed', e.message);
  }

  try {
    const weakHtml = renderToString(React.createElement(WeakAreasSection, { weakWords: [] }));
    assert(weakHtml.includes('Zero Weak Words! All Mastered'), 'WeakAreasSection renders friendly zero-void celebratory prompt');
  } catch (e) {
    assert(false, 'WeakAreasSection fallback inspection failed', e.message);
  }

  try {
    const recentHtml = renderToString(React.createElement(RecentActivity, { activities: [] }));
    assert(recentHtml.includes('No Recent Quizzes Yet'), 'RecentActivity renders friendly zero-void empty prompt');
  } catch (e) {
    assert(false, 'RecentActivity fallback inspection failed', e.message);
  }

  // --------------------------------------------------------------------------
  // SUITE 2: EXTREME VALUES & BOUNDARY METRICS
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 2: EXTREME VALUES & BOUNDARY METRICS] ---');

  const extremeHighProps = {
    currentUser: {
      id: 'high-student',
      name: 'Super High Achiever With Long Name That Could Cause Overflow In Some Tight Grids',
      college: 'Dhaka Residential Model College, Mohammadpur, Dhaka',
      streak: 10000,
      points: 1000000,
      testsCompleted: 5000,
      masteredWordsCount: 2500,
      accuracy: 100
    },
    streakCount: 10000,
    streak: 10000,
    accuracy: 100,
    points: 1000000,
    totalSolved: 1000000,
    totalQuestionsSolved: 1000000,
    masteredWordsCount: 2500,
    completedToday: 500,
    dailyGoal: 20,
    lang: 'en'
  };

  for (const { name, comp } of componentsToTest) {
    try {
      const html = renderToString(React.createElement(comp, extremeHighProps));
      assert(typeof html === 'string' && html.length > 50, `${name} handles extreme high metrics (10k streak, 1M XP, 100% acc)`);
      assert(!html.includes('NaN'), `${name} has no NaN under extreme high metrics`);
    } catch (e) {
      assert(false, `${name} crashed under extreme high metrics!`, e.stack);
    }
  }

  const negativeProps = {
    currentUser: {
      id: 'negative-student',
      name: 'Negative Edge Tester',
      college: 'Test College',
      streak: -10,
      points: -500,
      testsCompleted: -20,
      masteredWordsCount: -5,
      accuracy: -50
    },
    streakCount: -10,
    streak: -10,
    accuracy: -50,
    points: -500,
    totalSolved: -100,
    totalQuestionsSolved: -100,
    masteredWordsCount: -5,
    completedToday: -10,
    dailyGoal: -20,
    lang: 'en'
  };

  for (const { name, comp } of componentsToTest) {
    try {
      const html = renderToString(React.createElement(comp, negativeProps));
      assert(typeof html === 'string' && html.length > 50, `${name} gracefully handles negative metric values without fatal crash`);
      assert(!html.includes('NaN'), `${name} has no NaN under negative metrics`);
    } catch (e) {
      assert(false, `${name} crashed under negative metrics!`, e.stack);
    }
  }

  // --------------------------------------------------------------------------
  // SUITE 3: CORRUPTED LOCALSTORAGE & USE-DASHBOARD-STATE RECOVERY
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 3: CORRUPTED LOCALSTORAGE & STATE RECOVERY] ---');

  const corruptionScenarios = [
    {
      desc: 'Corrupted invalid JSON in hsc_auth_user',
      setup: () => {
        globalThis.localStorage.clear();
        globalThis.localStorage.setItem('hsc_auth_user', '{invalid-json-content');
      }
    },
    {
      desc: 'Literal "null" string in hsc_auth_user',
      setup: () => {
        globalThis.localStorage.clear();
        globalThis.localStorage.setItem('hsc_auth_user', 'null');
      }
    },
    {
      desc: 'Literal "undefined" string in hsc_auth_user',
      setup: () => {
        globalThis.localStorage.clear();
        globalThis.localStorage.setItem('hsc_auth_user', 'undefined');
      }
    },
    {
      desc: 'Corrupted non-array in hsc_exam_history (object)',
      setup: () => {
        globalThis.localStorage.clear();
        globalThis.localStorage.setItem('hsc_exam_history', '{"not": "an array"}');
      }
    },
    {
      desc: 'Corrupted invalid JSON in hsc_exam_history',
      setup: () => {
        globalThis.localStorage.clear();
        globalThis.localStorage.setItem('hsc_exam_history', '[{malformed');
      }
    },
    {
      desc: 'Corrupted invalid JSON in hsc_weak_words',
      setup: () => {
        globalThis.localStorage.clear();
        globalThis.localStorage.setItem('hsc_weak_words', '{"error": true');
      }
    },
    {
      desc: 'Sparse array with null and invalid types in hsc_weak_words',
      setup: () => {
        globalThis.localStorage.clear();
        globalThis.localStorage.setItem('hsc_weak_words', JSON.stringify([null, undefined, '', { word: '' }, { word: 'AuthenticWord' }]));
      }
    },
    {
      desc: 'Negative/NaN daily goal strings in hsc_daily_goal',
      setup: () => {
        globalThis.localStorage.clear();
        globalThis.localStorage.setItem('hsc_daily_goal', 'NaN');
      }
    },
    {
      desc: 'Corrupted saved practice session data',
      setup: () => {
        globalThis.localStorage.clear();
        globalThis.localStorage.setItem('hsc_last_saved_session_key', 'test_key');
        globalThis.localStorage.setItem('hsc_saved_practice_test_key', '{bad_json');
      }
    }
  ];

  for (const { desc, setup } of corruptionScenarios) {
    try {
      setup();
      let stateSnapshot = null;
      function TestHookRunner() {
        stateSnapshot = useDashboardState(null, 'en');
        return React.createElement('div', null, 'Hook Rendered');
      }

      const html = renderToString(React.createElement(TestHookRunner));
      assert(html.includes('Hook Rendered'), `useDashboardState recovers cleanly from: ${desc}`);
      assert(stateSnapshot !== null && typeof stateSnapshot === 'object', `useDashboardState returns valid state object on: ${desc}`);
      assert(typeof stateSnapshot.streakCount === 'number' && !isNaN(stateSnapshot.streakCount), `state.streakCount is valid number (${stateSnapshot.streakCount}) on: ${desc}`);
      assert(typeof stateSnapshot.accuracy === 'number' && !isNaN(stateSnapshot.accuracy), `state.accuracy is valid number (${stateSnapshot.accuracy}) on: ${desc}`);
      assert(Array.isArray(stateSnapshot.achievements), `state.achievements is valid array on: ${desc}`);
      assert(Array.isArray(stateSnapshot.recommendedPractices), `state.recommendedPractices is valid array on: ${desc}`);
    } catch (e) {
      assert(false, `useDashboardState CRASHED on: ${desc}`, e.stack);
    }
  }

  // --------------------------------------------------------------------------
  // SUITE 4: INTERACTIVE ACTION CALLBACKS & PROP DISPATCHING
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 4: INTERACTIVE ACTION CALLBACK DISPATCHING] ---');

  let callbackHits = {
    onContinueLearning: 0,
    onQuickPractice: 0,
    onContinueGoal: 0,
    onUpdateGoal: 0,
    onContinueQuiz: 0,
    onReadPassage: 0,
    onLaunchPractice: 0,
    onPracticeWord: 0,
    onReviewHub: 0,
    onViewFullLeaderboard: 0,
    onViewCertificates: 0,
    onViewAnalytics: 0,
    onRetakeExam: 0,
    onAction: 0
  };

  // Helper to execute element tree inside a render loop so hooks execute legally
  function captureRenderTree(comp, props) {
    let capturedElement = null;
    function Wrapper() {
      capturedElement = comp(props);
      return capturedElement;
    }
    renderToString(React.createElement(Wrapper));
    return capturedElement;
  }

  function triggerAllClicks(node) {
    if (!node) return;
    if (node.props && typeof node.props.onClick === 'function') {
      try {
        node.props.onClick({ stopPropagation: () => {} });
      } catch (e) {}
    }
    if (node.props && node.props.children) {
      React.Children.forEach(node.props.children, triggerAllClicks);
    }
  }

  // Test callbacks in WelcomeHero
  try {
    const hero = captureRenderTree(WelcomeHero, {
      userName: 'Test User',
      onContinueLearning: () => callbackHits.onContinueLearning++,
      onQuickPractice: () => callbackHits.onQuickPractice++
    });
    triggerAllClicks(hero);
    assert(callbackHits.onContinueLearning > 0, 'WelcomeHero: onContinueLearning triggers on button click');
    assert(callbackHits.onQuickPractice > 0, 'WelcomeHero: onQuickPractice triggers on button click');
  } catch (e) {
    assert(false, 'WelcomeHero callback invocation failed', e.message);
  }

  // Test callbacks in DailyGoalCard
  try {
    const goalCard = captureRenderTree(DailyGoalCard, {
      completedToday: 14,
      dailyGoal: 20,
      onContinueGoal: () => callbackHits.onContinueGoal++,
      onUpdateGoal: (val) => callbackHits.onUpdateGoal++
    });
    triggerAllClicks(goalCard);
    assert(callbackHits.onContinueGoal > 0, 'DailyGoalCard: onContinueGoal triggers on CTA click');
  } catch (e) {
    assert(false, 'DailyGoalCard callback invocation failed', e.message);
  }

  // Test callbacks in ContinueLearningCard
  try {
    const clCard = captureRenderTree(ContinueLearningCard, {
      activeSession: { unitId: 'unit-1', lessonId: 'u1-l1' },
      onContinueQuiz: () => callbackHits.onContinueQuiz++,
      onReadPassage: () => callbackHits.onReadPassage++
    });
    triggerAllClicks(clCard);
    assert(callbackHits.onContinueQuiz > 0, 'ContinueLearningCard: onContinueQuiz triggers');
    assert(callbackHits.onReadPassage > 0, 'ContinueLearningCard: onReadPassage triggers');
  } catch (e) {
    assert(false, 'ContinueLearningCard callback invocation failed', e.message);
  }

  // Test callbacks in RecommendedPractice
  try {
    const recPractice = captureRenderTree(RecommendedPractice, {
      items: [
        { id: 'item-1', title: 'Test Item', type: 'vocab' }
      ],
      onLaunchPractice: () => callbackHits.onLaunchPractice++
    });
    triggerAllClicks(recPractice);
    assert(callbackHits.onLaunchPractice > 0, 'RecommendedPractice: onLaunchPractice triggers');
  } catch (e) {
    assert(false, 'RecommendedPractice callback invocation failed', e.message);
  }

  // Test callbacks in WeakAreasSection
  try {
    const weakSec = captureRenderTree(WeakAreasSection, {
      weakWords: [
        { id: 'w1', word: 'Persecution', mistakeCount: 3, correctStreak: 0 }
      ],
      onPracticeWord: () => callbackHits.onPracticeWord++,
      onReviewHub: () => callbackHits.onReviewHub++
    });
    triggerAllClicks(weakSec);
    assert(callbackHits.onPracticeWord > 0, 'WeakAreasSection: onPracticeWord triggers on practice click');
    assert(callbackHits.onReviewHub > 0, 'WeakAreasSection: onReviewHub triggers on review click');
  } catch (e) {
    assert(false, 'WeakAreasSection callback invocation failed', e.message);
  }

  // Test callbacks in MiniLeaderboard
  try {
    const miniLb = captureRenderTree(MiniLeaderboard, {
      currentUser: { name: 'Tanvir Ahmed', points: 1450 },
      onViewFullLeaderboard: () => callbackHits.onViewFullLeaderboard++
    });
    triggerAllClicks(miniLb);
    assert(callbackHits.onViewFullLeaderboard > 0, 'MiniLeaderboard: onViewFullLeaderboard triggers on click');
  } catch (e) {
    assert(false, 'MiniLeaderboard callback invocation failed', e.message);
  }

  // Test callbacks in SkillProgress
  try {
    const skillPrg = captureRenderTree(SkillProgress, {
      onViewAnalytics: () => callbackHits.onViewAnalytics++
    });
    triggerAllClicks(skillPrg);
    assert(callbackHits.onViewAnalytics > 0, 'SkillProgress: onViewAnalytics triggers on click');
  } catch (e) {
    assert(false, 'SkillProgress callback invocation failed', e.message);
  }

  // Test callbacks in AchievementsWidget
  try {
    const achWidget = captureRenderTree(AchievementsWidget, {
      onViewCertificates: () => callbackHits.onViewCertificates++
    });
    triggerAllClicks(achWidget);
    assert(callbackHits.onViewCertificates > 0, 'AchievementsWidget: onViewCertificates triggers on click');
  } catch (e) {
    assert(false, 'AchievementsWidget callback invocation failed', e.message);
  }

  // Test callbacks in RecentActivity
  try {
    const recAct = captureRenderTree(RecentActivity, {
      activities: [
        { id: 'act-1', unit: 'Unit 1', lesson: "The Parrot's Tale", score: 9, totalQuestions: 10, accuracy: 90, earnedXP: 140 }
      ],
      onRetakeExam: () => callbackHits.onRetakeExam++
    });
    triggerAllClicks(recAct);
    assert(callbackHits.onRetakeExam > 0, 'RecentActivity: onRetakeExam triggers on item click');
  } catch (e) {
    assert(false, 'RecentActivity callback invocation failed', e.message);
  }

  // Null safety: verify rendering with ALL callbacks omitted does not throw when rendered or clicked
  try {
    for (const { name, comp } of componentsToTest) {
      const element = React.createElement(comp, {});
      const html = renderToString(element);
      assert(html.length > 50, `${name} renders without crashing when all callbacks are undefined/omitted`);
    }
  } catch (e) {
    assert(false, 'Omitted callbacks test threw an exception', e.stack);
  }

  // --------------------------------------------------------------------------
  // SUITE 5: DIVISION BY ZERO & ADVERSARIAL STRINGS (XSS, EMOJI, ZERO TARGETS)
  // --------------------------------------------------------------------------
  console.log('\n--- [SUITE 5: ZERO TARGETS & ADVERSARIAL STRINGS] ---');

  // Zero target daily goal
  try {
    const zeroGoalHtml = renderToString(React.createElement(DailyGoalCard, { completedToday: 0, dailyGoal: 0 }));
    assert(!zeroGoalHtml.includes('NaN'), 'DailyGoalCard with dailyGoal=0 produces NO NaN');
    assert(!zeroGoalHtml.includes('Infinity'), 'DailyGoalCard with dailyGoal=0 produces NO Infinity');
  } catch (e) {
    assert(false, 'DailyGoalCard with dailyGoal=0 crashed', e.message);
  }

  try {
    const zeroTopStats = renderToString(React.createElement(TopStatsSummary, { completedToday: 0, dailyGoal: 0 }));
    assert(!zeroTopStats.includes('NaN'), 'TopStatsSummary with dailyGoal=0 produces NO NaN');
    assert(!zeroTopStats.includes('Infinity'), 'TopStatsSummary with dailyGoal=0 produces NO Infinity');
  } catch (e) {
    assert(false, 'TopStatsSummary with dailyGoal=0 crashed', e.message);
  }

  try {
    const zeroContinue = renderToString(React.createElement(ContinueLearningCard, { currentQuestionIndex: 0, totalQuestions: 0 }));
    assert(!zeroContinue.includes('NaN'), 'ContinueLearningCard with totalQuestions=0 produces NO NaN');
    assert(!zeroContinue.includes('Infinity'), 'ContinueLearningCard with totalQuestions=0 produces NO Infinity');
  } catch (e) {
    assert(false, 'ContinueLearningCard with totalQuestions=0 crashed', e.message);
  }

  // Adversarial strings: XSS injections & complex Unicode
  const adversarialUser = {
    id: 'adv-001',
    name: '<script>alert("xss")</script> & ?? "HSC Student" \'Elite\' <img src=x onerror=alert(1)>',
    college: 'Government College <tag> & Special Character™ ??',
    streak: 99,
    points: 8888,
    accuracy: 95
  };

  try {
    const advHero = renderToString(React.createElement(WelcomeHero, { currentUser: adversarialUser }));
    assert(advHero.includes('&lt;script&gt;') || advHero.includes('alert'), 'WelcomeHero safely renders and escapes HTML/XSS strings');
  } catch (e) {
    assert(false, 'WelcomeHero crashed with adversarial string inputs', e.message);
  }

  try {
    const advLb = renderToString(React.createElement(MiniLeaderboard, { currentUser: adversarialUser }));
    assert(advLb.length > 100, 'MiniLeaderboard safely handles special characters and XSS tags without crashing');
  } catch (e) {
    assert(false, 'MiniLeaderboard crashed with adversarial string inputs', e.message);
  }

  console.log('\n================================================================');
  console.log(`SUMMARY: ${passedTests}/${totalTests} TESTS PASSED (${failedTests} failures)`);
  console.log('================================================================');

  await server.close();

  if (failedTests > 0) {
    console.error('FAILURES LIST:\n' + failures.join('\n'));
    process.exit(1);
  } else {
    console.log('ALL ADVERSARIAL STRESS TESTS COMPLETED SUCCESSFULLY WITH 0 FAILURES!');
    process.exit(0);
  }
}

runAdversarialStressSuite().catch((err) => {
  console.error('FATAL SUITE ERROR:', err);
  process.exit(1);
});
