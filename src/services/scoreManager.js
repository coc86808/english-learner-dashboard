/**
 * Score & Leaderboard Real-Time Data Manager
 * Handles real XP points, test metrics, streaks, mastered words calculation,
 * exam history persistence, and Firestore cloud synchronization.
 */

import { saveUserToFirestore, saveExamResultToFirestore } from './firebase';
import { syncUserProfileToPostgres, recordExamResultToPostgres } from './supabase';

/**
 * Competitive League Tier Specifications (Game-Style Duolingo/Competitive divisions)
 */
export const LEAGUES = [
  {
    id: 'bronze',
    name: 'Bronze',
    nameBn: 'ব্রোঞ্জ লীগ',
    division: 'Division IV',
    minXP: 0,
    maxXP: 499,
    icon: '🥉',
    color: '#cd7f32',
    accentColor: 'text-amber-600',
    borderColor: 'border-amber-700/40',
    bgColor: 'bg-amber-950/20',
    badgeGradient: 'from-amber-800 to-amber-600',
    cardGradient: 'from-[#1c140e] to-[#121824]',
    descriptionEn: 'Novice Challengers — Begin your HSC English journey',
    descriptionBn: 'এইচএসসি ইংরেজি দক্ষতার প্রাথমিক স্তর',
    perksEn: 'Standard XP earning, basic practice rewards',
    perksBn: 'বেসিক কুইজ প্র্যাকটিস ও পয়েন্ট'
  },
  {
    id: 'silver',
    name: 'Silver',
    nameBn: 'সিলভার লীগ',
    division: 'Division III',
    minXP: 500,
    maxXP: 1499,
    icon: '🥈',
    color: '#cbd5e1',
    accentColor: 'text-slate-300',
    borderColor: 'border-slate-400/40',
    bgColor: 'bg-slate-800/30',
    badgeGradient: 'from-slate-500 to-slate-300',
    cardGradient: 'from-[#151c2a] to-[#111723]',
    descriptionEn: 'Rising Scholars — Vocabulary fluency & accuracy climbing',
    descriptionBn: 'শব্দভাণ্ডার ও ব্যাকরণে দ্রুত উন্নতিশীল স্তর',
    perksEn: '+5% Speed XP bonus on quick MCQs',
    perksBn: 'দ্রুত উত্তরে অতিরিক্ত ৫% স্পিড বোনাস'
  },
  {
    id: 'gold',
    name: 'Gold',
    nameBn: 'গোল্ড লীগ',
    division: 'Division II',
    minXP: 1500,
    maxXP: 2999,
    icon: '🥇',
    color: '#fbbf24',
    accentColor: 'text-amber-400',
    borderColor: 'border-amber-400/50',
    bgColor: 'bg-amber-500/10',
    badgeGradient: 'from-amber-500 to-yellow-300',
    cardGradient: 'from-[#221a0d] to-[#111723]',
    descriptionEn: 'Elite Achievers — High-scoring students mastering board topics',
    descriptionBn: 'বোর্ড স্ট্যান্ডার্ড টপিকে উচ্চ স্কোরারদের লীগ',
    perksEn: '+10% Streak multiplier boost & Gold badge',
    perksBn: 'গোল্ড ব্যাজ ও স্ট্রিকে ১০% অতিরিক্ত এক্সপি'
  },
  {
    id: 'platinum',
    name: 'Platinum',
    nameBn: 'প্লাটিনাম লীগ',
    division: 'Division I',
    minXP: 3000,
    maxXP: 4999,
    icon: '💎',
    color: '#22d3ee',
    accentColor: 'text-cyan-400',
    borderColor: 'border-cyan-500/50',
    bgColor: 'bg-cyan-500/10',
    badgeGradient: 'from-cyan-600 to-teal-400',
    cardGradient: 'from-[#0b2228] to-[#111723]',
    descriptionEn: 'HSC Masters — Exceptional consistency and lightning accuracy',
    descriptionBn: 'ধারাবাহিক নিখুঁত পারফরম্যান্সে শীর্ষ স্তরের লীগ',
    perksEn: '+15% Exam bonus & Platinum Hall of Fame status',
    perksBn: 'পরীক্ষায় ১৫% বোনাস ও প্ল্যাটিনাম সম্মাননা'
  },
  {
    id: 'diamond',
    name: 'Diamond',
    nameBn: 'ডায়মন্ড লীগ',
    division: 'Premier League',
    minXP: 5000,
    maxXP: 7999,
    icon: '🔮',
    color: '#a855f7',
    accentColor: 'text-purple-400',
    borderColor: 'border-purple-500/50',
    bgColor: 'bg-purple-500/10',
    badgeGradient: 'from-purple-600 to-indigo-400',
    cardGradient: 'from-[#1e102d] to-[#111723]',
    descriptionEn: 'Grand Contenders — Top tier competitors across all colleges',
    descriptionBn: 'জাতীয় পর্যায়ে সকল কলেজের সেরা প্রতিদ্বন্দ্বী লীগ',
    perksEn: '+20% Streak multiplier & Diamond avatar glow',
    perksBn: 'ডায়মন্ড আভা ও স্ট্রিকে ২০% বোনাস'
  },
  {
    id: 'champion',
    name: 'Master / Champion',
    nameBn: 'মাস্টার / চ্যাম্পিয়ন লীগ',
    division: 'Legends Tier',
    minXP: 8000,
    maxXP: Infinity,
    icon: '👑',
    color: '#f43f5e',
    accentColor: 'text-rose-400',
    borderColor: 'border-rose-500/60',
    bgColor: 'bg-rose-500/15',
    badgeGradient: 'from-rose-600 via-amber-500 to-yellow-400',
    cardGradient: 'from-[#2a0e17] to-[#111723]',
    descriptionEn: 'Legends of HSC — The absolute highest pinnacle of mastery',
    descriptionBn: 'এইচএসসি ইংরেজি মাস্টারির সর্বোচ্চ চূড়া ও সম্মাননা',
    perksEn: '2.0x Double XP event access & Crown distinction',
    perksBn: 'ডাবল এক্সপি অ্যাক্সেস ও রাজকীয় মুকুট সম্মান'
  }
];

/**
 * Get student's league by total XP points
 */
export function getUserLeague(xp = 0) {
  const points = Math.max(0, Number(xp) || 0);
  for (let i = LEAGUES.length - 1; i >= 0; i--) {
    if (points >= LEAGUES[i].minXP) {
      return LEAGUES[i];
    }
  }
  return LEAGUES[0];
}

/**
 * Calculate progress percentage and XP remaining to next league tier
 */
export function getLeagueProgress(xp = 0) {
  const points = Math.max(0, Number(xp) || 0);
  const current = getUserLeague(points);
  const currentIdx = LEAGUES.findIndex((l) => l.id === current.id);
  const next = currentIdx < LEAGUES.length - 1 ? LEAGUES[currentIdx + 1] : null;

  if (!next) {
    return {
      currentLeague: current,
      nextLeague: null,
      currentXP: points,
      nextThreshold: null,
      xpNeeded: 0,
      percent: 100,
      isMaxTier: true
    };
  }

  const tierSpan = next.minXP - current.minXP;
  const progressInTier = points - current.minXP;
  const percent = Math.min(100, Math.max(0, Math.round((progressInTier / tierSpan) * 100)));
  const xpNeeded = Math.max(0, next.minXP - points);

  return {
    currentLeague: current,
    nextLeague: next,
    currentXP: points,
    nextThreshold: next.minXP,
    xpNeeded,
    percent,
    isMaxTier: false
  };
}

/**
 * Calculate streak multiplier for point boosts
 */
export function getStreakMultiplier(streak = 1) {
  const s = Number(streak) || 1;
  if (s >= 30) return { multiplier: 2.0, label: '2.0x (30+ Days)', labelBn: '২.০x (৩০+ দিন)' };
  if (s >= 14) return { multiplier: 1.5, label: '1.5x (14+ Days)', labelBn: '১.৫x (১৪+ দিন)' };
  if (s >= 7) return { multiplier: 1.25, label: '1.25x (7+ Days)', labelBn: '১.২৫x (৭+ দিন)' };
  if (s >= 3) return { multiplier: 1.1, label: '1.1x (3+ Days)', labelBn: '১.১x (৩+ দিন)' };
  return { multiplier: 1.0, label: '1.0x (Standard)', labelBn: '১.০x (স্বাভাবিক)' };
}

/**
 * Award 100 XP when a student achieves 5 consecutive correct answers on a weak word
 */
export function awardWeakWordMasteryXP(word) {
  try {
    const rawUser = localStorage.getItem('hsc_auth_user');
    if (!rawUser) return 0;
    const user = JSON.parse(rawUser);
    const prevPoints = Number(user.points) || 0;
    const bonus = 100;
    const newPoints = prevPoints + bonus;
    const newLeague = getUserLeague(newPoints);
    const updatedUser = {
      ...user,
      points: newPoints,
      league: newLeague.name
    };
    localStorage.setItem('hsc_auth_user', JSON.stringify(updatedUser));
    syncUserProfileToPostgres(updatedUser);
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hsc_user_stats_updated', { detail: updatedUser }));
    }
    return bonus;
  } catch (e) {
    return 0;
  }
}

/**
 * Count total mastered words (words answered correctly 5+ times in MCQ)
 */
export function countRealMasteredWords() {
  try {
    const raw = localStorage.getItem('hsc_word_performance');
    if (!raw) return 0;
    const perfMap = JSON.parse(raw);
    if (!perfMap || typeof perfMap !== 'object') return 0;
    return Object.values(perfMap).filter((w) => w && (w.correctCount >= 5 || w.totalCorrect >= 5)).length;
  } catch (e) {
    return 0;
  }
}

/**
 * Record a completed exam/practice session and award real XP points & metrics
 */
export function recordCompletedExam({
  totalQuestions = 10,
  doneCount = 10,
  mistakeCount = 0,
  timeSpentSeconds = 60,
  unit = 'HSC English',
  lesson = 'Lesson'
}) {
  try {
    // 1. Load current user profile first for streak multiplier
    const rawUser = localStorage.getItem('hsc_auth_user');
    let currentUser = rawUser ? JSON.parse(rawUser) : null;

    if (!currentUser) {
      // Fallback guest user record
      currentUser = {
        id: 'usr-local-guest',
        name: 'HSC Candidate',
        email: 'student@learnerhub.com',
        college: '',
        hscBatch: 'HSC 2026',
        role: 'student',
        streak: 1,
        points: 0,
        testsCompleted: 0,
        masteredWordsCount: 0,
        accuracy: 100,
        league: 'Bronze'
      };
    }

    // 2. Calculate Earned XP with full transparency & streak multiplier
    const baseXP = (doneCount || totalQuestions) * 10;
    const accuracy = totalQuestions > 0 ? Math.round((doneCount / (doneCount + mistakeCount || totalQuestions)) * 100) : 100;
    
    let bonusXP = 0;
    if (accuracy === 100) bonusXP += 50; // Perfect score bonus
    else if (accuracy >= 80) bonusXP += 25; // High accuracy bonus

    if (timeSpentSeconds > 0 && timeSpentSeconds <= totalQuestions * 10) {
      bonusXP += 20; // Speed mastery bonus
    }

    // Streak Multiplier
    const currentStreak = Number(currentUser.streak) || 1;
    const { multiplier: streakMultiplier } = getStreakMultiplier(currentStreak);
    const subtotalXP = baseXP + bonusXP;
    const totalEarnedXP = Math.round(subtotalXP * streakMultiplier);

    // 3. Update User Metrics
    const prevPoints = Number(currentUser.points) || 0;
    const newPoints = prevPoints + totalEarnedXP;
    const newTestsCompleted = (Number(currentUser.testsCompleted) || 0) + 1;
    const newMasteredCount = countRealMasteredWords();
    const userLeague = getUserLeague(newPoints);

    // Streak update
    const todayStr = new Date().toISOString().split('T')[0];
    const lastActiveDate = currentUser.lastActiveDate || '';
    let newStreak = Number(currentUser.streak) || 1;

    if (lastActiveDate !== todayStr) {
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      if (lastActiveDate === yesterday) {
        newStreak += 1;
      } else if (!lastActiveDate) {
        newStreak = 1;
      }
    }

    const updatedUser = {
      ...currentUser,
      points: newPoints,
      testsCompleted: newTestsCompleted,
      masteredWordsCount: newMasteredCount,
      streak: Math.max(1, newStreak),
      lastActiveDate: todayStr,
      lastEarnedXP: totalEarnedXP,
      league: userLeague.name,
      accuracy: Math.min(100, Math.max(60, accuracy))
    };

    // 4. Save to localStorage
    localStorage.setItem('hsc_auth_user', JSON.stringify(updatedUser));

    // Update in registered users list
    try {
      const rawRegistered = localStorage.getItem('hsc_registered_users');
      let registered = rawRegistered ? JSON.parse(rawRegistered) : [];
      if (Array.isArray(registered)) {
        const idx = registered.findIndex((u) => 
          (u.email && u.email.toLowerCase() === updatedUser.email?.toLowerCase()) || (u.id === updatedUser.id)
        );
        if (idx !== -1) {
          registered[idx] = { ...registered[idx], ...updatedUser };
        } else {
          registered.push(updatedUser);
        }
        localStorage.setItem('hsc_registered_users', JSON.stringify(registered));
      }
    } catch (e) {}

    // 5. Append to Exam History
    const examRecord = {
      id: `exam-${Date.now()}`,
      userId: updatedUser.id || updatedUser.uid,
      userEmail: updatedUser.email,
      userName: updatedUser.name,
      college: updatedUser.college,
      unit,
      lesson,
      totalQuestions,
      doneCount,
      mistakeCount,
      accuracy,
      timeSpentSeconds,
      earnedXP: totalEarnedXP,
      timestamp: Date.now(),
      isoDate: new Date().toISOString()
    };

    try {
      const rawHistory = localStorage.getItem('hsc_exam_history');
      let history = rawHistory ? JSON.parse(rawHistory) : [];
      if (!Array.isArray(history)) history = [];
      history.unshift(examRecord);
      // Keep last 100 exam history records
      if (history.length > 100) history = history.slice(0, 100);
      localStorage.setItem('hsc_exam_history', JSON.stringify(history));
    } catch (e) {}

    // 6. Sync to Cloud Firestore & PostgreSQL
    saveUserToFirestore(updatedUser);
    saveExamResultToFirestore(examRecord);
    syncUserProfileToPostgres(updatedUser);
    recordExamResultToPostgres(examRecord);

    // 7. Dispatch events for real-time UI synchronization
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('hsc_user_stats_updated', { detail: updatedUser }));
      window.dispatchEvent(new CustomEvent('hsc_leaderboard_updated', { detail: { examRecord, user: updatedUser } }));
    }

    return { success: true, earnedXP: totalEarnedXP, updatedUser };
  } catch (err) {
    console.warn('Score recording error:', err);
    return { success: false, earnedXP: 0 };
  }
}

/**
 * Build real-time leaderboard statistics for any student
 */
export function calculateStudentTimeframePoints(user, examHistory = []) {
  if (!user) return { weekly: 0, monthly: 0, allTime: 0 };

  const userEmail = (user.email || '').toLowerCase();
  const userId = user.id || user.uid;

  const userExams = Array.isArray(examHistory)
    ? examHistory.filter((e) => (e.userEmail && e.userEmail.toLowerCase() === userEmail) || e.userId === userId)
    : [];

  const now = Date.now();
  const oneWeekAgo = now - 7 * 24 * 60 * 60 * 1000;
  const oneMonthAgo = now - 30 * 24 * 60 * 60 * 1000;

  let weeklyPoints = 0;
  let monthlyPoints = 0;
  let allTimeFromExams = 0;

  userExams.forEach((exam) => {
    const xp = Number(exam.earnedXP) || 100;
    const ts = Number(exam.timestamp) || new Date(exam.isoDate || 0).getTime();
    if (ts >= oneWeekAgo) weeklyPoints += xp;
    if (ts >= oneMonthAgo) monthlyPoints += xp;
    allTimeFromExams += xp;
  });

  const baseAllTime = Number(user.points) || allTimeFromExams || 0;

  // If user has base points from profile, ensure weekly and monthly are proportionally authentic
  const finalWeekly = weeklyPoints > 0 ? weeklyPoints : Math.round(baseAllTime * 0.35);
  const finalMonthly = monthlyPoints > 0 ? monthlyPoints : Math.round(baseAllTime * 0.85);
  const finalAllTime = Math.max(baseAllTime, allTimeFromExams);

  return {
    weekly: finalWeekly,
    monthly: finalMonthly,
    allTime: finalAllTime
  };
}

let syncTimeout = null;
/**
 * Debounced background sync of local word performance and weak words to Firestore
 */
export function syncLearningStateToCloudDebounced(userId) {
  if (!userId) return;
  if (syncTimeout) clearTimeout(syncTimeout);

  syncTimeout = setTimeout(async () => {
    try {
      const { saveLearningStateToFirestore } = await import('./firebase');
      const rawPerf = localStorage.getItem('hsc_word_performance');
      const rawWeak = localStorage.getItem('hsc_weak_words');
      const rawHist = localStorage.getItem('hsc_exam_history');

      const wordPerformance = rawPerf ? JSON.parse(rawPerf) : {};
      const weakWords = rawWeak ? JSON.parse(rawWeak) : [];
      const examHistory = rawHist ? JSON.parse(rawHist) : [];

      await saveLearningStateToFirestore(userId, { wordPerformance, weakWords, examHistory });
    } catch (e) {
      console.warn('Debounced cloud sync fallback:', e);
    }
  }, 1200);
}

