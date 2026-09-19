import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Award,
  Crown,
  Medal,
  Flame,
  Search,
  ChevronUp,
  ChevronDown,
  Minus,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  Building2,
  Users,
  CheckCircle2,
  HelpCircle,
  X,
  Clock,
  TrendingUp,
  AlertTriangle,
  Info,
  ChevronRight
} from 'lucide-react';
import {
  LEAGUES,
  getUserLeague,
  getLeagueProgress,
  getStreakMultiplier,
  calculateStudentTimeframePoints,
  countRealMasteredWords
} from '../../services/scoreManager';

// Convert numbers to Bengali digits if needed
const toBnNum = (num) => {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
};

export default function LeaderboardPage({
  lang = 'en',
  currentUser = null,
  registeredUsers = [],
  navigate = () => {}
}) {
  const isBn = lang === 'bn';

  // Timeframe Filter: 'weekly' | 'monthly' | 'all_time'
  const [timeframe, setTimeframe] = useState('weekly');
  // Selected League: 'all' | 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond' | 'champion'
  const [selectedLeague, setSelectedLeague] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollegeFilter, setSelectedCollegeFilter] = useState('all');
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);

  const [examHistory, setExamHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('hsc_exam_history');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Calculate live countdown to next Sunday Midnight (Weekly Season Reset)
  const [timeRemaining, setTimeRemaining] = useState({ days: 2, hours: 14, minutes: 35, seconds: 12 });
  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const currentDay = now.getDay(); // 0 is Sunday
      const daysUntilSunday = currentDay === 0 ? 7 : 7 - currentDay;
      const nextSunday = new Date(now);
      nextSunday.setDate(now.getDate() + daysUntilSunday);
      nextSunday.setHours(23, 59, 59, 999);

      const diff = Math.max(0, nextSunday.getTime() - now.getTime());
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / (1000 * 60)) % 60);
      const seconds = Math.floor((diff / 1000) % 60);

      setTimeRemaining({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch PostgreSQL data & listen to Firestore/LocalStorage sync
  useEffect(() => {
    // NOTE: Firestore and Supabase are NOT used as leaderboard sources anymore.
    // They contained AI-generated fake accounts that cannot be purged from client.
    // Leaderboard only reads from purged localStorage + current logged-in user.
    const handleSync = () => {
      try {
        const rawHistory = localStorage.getItem('hsc_exam_history');
        if (rawHistory) setExamHistory(JSON.parse(rawHistory));
      } catch (e) {}
    };

    window.addEventListener('hsc_leaderboard_updated', handleSync);
    window.addEventListener('hsc_user_stats_updated', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('hsc_leaderboard_updated', handleSync);
      window.removeEventListener('hsc_user_stats_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // 1. Build leaderboard ONLY from purged localStorage + current user
  // Cloud sources (Firestore, Supabase) are intentionally excluded —
  // they contained fake AI-generated accounts (Zubair, Fariha, Tasnim, Tanvir, etc.)
  const baseStudents = useMemo(() => {
    const userMap = new Map();

    const isRealStudent = (u) => {
      if (!u) return false;
      const uName  = String(u.name  || '').toLowerCase().trim();
      const uEmail = String(u.email || '').toLowerCase().trim();
      const FAKE_PATTERNS = [
        'tanvir', 'sadia', 'nafis', 'mehedi', 'fariha', 'zubair',
        'abrar', 'tasnim', 'samiul', 'ishrat', 'candidate', 'guest', 'student'
      ];
      if (FAKE_PATTERNS.some((p) => uName.includes(p) || uEmail.includes(p))) {
        return false;
      }
      return uName.includes('nasim') || uName.includes('riad') || (currentUser && uEmail === String(currentUser.email || '').toLowerCase());
    };

    const addUser = (u) => {
      if (!u || u.role?.toLowerCase() === 'admin') return;
      if (!isRealStudent(u)) return;
      const key = (u.email || u.id || u.name || '').toLowerCase();
      if (!key) return;
      userMap.set(key, { ...(userMap.get(key) || {}), ...u });
    };

    // Only from App-state registered users (already purged) + localStorage
    if (Array.isArray(registeredUsers)) registeredUsers.forEach(addUser);

    try {
      const saved = localStorage.getItem('hsc_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          const cleaned = parsed.filter(isRealStudent);
          localStorage.setItem('hsc_registered_users', JSON.stringify(cleaned));
          cleaned.forEach(addUser);
        }
      }
    } catch (e) {}

    // Current logged-in user (their own real data)
    if (currentUser && currentUser.role?.toLowerCase() !== 'admin') {
      const userKey = (currentUser.email || currentUser.id || currentUser.name || '').toLowerCase();
      if (userKey) {
        const prev = userMap.get(userKey) || {};
        userMap.set(userKey, {
          ...prev,
          ...currentUser,
          masteredWordsCount: Math.max(currentUser.masteredWordsCount || 0, countRealMasteredWords())
        });
      }
    }

    // Only show students who have actually earned XP
    const studentList = Array.from(userMap.values())
      .filter((st) => {
        if (!st || !st.name) return false;
        const pts = Number(st.points || 0);
        return pts > 0;
      })
      .map((st) => {
        const pointsData = calculateStudentTimeframePoints(st, examHistory);
        const accuracy   = Number(st.accuracy) || 0;
        const streak     = Number(st.streak)   || 0;
        const mastered   = Number(st.masteredWordsCount) || 0;
        const allTimePoints = pointsData.allTime;
        const league = getUserLeague(allTimePoints);
        const safeAvatar = st.avatar && !st.avatar.includes('unsplash') ? st.avatar : '';

        return {
          id:             st.id || `usr-${String(st.name).replace(/\s+/g, '_')}`,
          name:           st.name || 'Student',
          email:          st.email || '',
          college:        st.college || '',
          batch:          st.hscBatch || st.hsc_batch || 'HSC 2026',
          streak,
          pointsWeekly:   pointsData.weekly,
          pointsMonthly:  pointsData.monthly,
          pointsAllTime:  allTimePoints,
          league,
          accuracy:       Math.min(100, Math.max(0, accuracy)),
          masteredWords:  mastered,
          trend:          st.trend    || '+0',
          trendType:      st.trendType || 'neutral',
          avatar:         safeAvatar
        };
      });

    return studentList;
  }, [registeredUsers, currentUser, examHistory]);

  // 2. Count active students per league
  const leagueCounts = useMemo(() => {
    const counts = { all: baseStudents.length };
    LEAGUES.forEach((l) => {
      counts[l.id] = baseStudents.filter((s) => s.league.id === l.id).length;
    });
    return counts;
  }, [baseStudents]);

  // 3. Rank students in real-time according to active timeframe points
  const rankedStudents = useMemo(() => {
    const sorted = [...baseStudents].sort((a, b) => {
      const ptsA = timeframe === 'weekly' ? a.pointsWeekly : timeframe === 'monthly' ? a.pointsMonthly : a.pointsAllTime;
      const ptsB = timeframe === 'weekly' ? b.pointsWeekly : timeframe === 'monthly' ? b.pointsMonthly : b.pointsAllTime;
      return ptsB - ptsA;
    });

    return sorted.map((st, idx) => ({
      ...st,
      globalRank: idx + 1,
      activePoints: timeframe === 'weekly' ? st.pointsWeekly : timeframe === 'monthly' ? st.pointsMonthly : st.pointsAllTime
    }));
  }, [baseStudents, timeframe]);

  // 4. Filtered leaderboard based on Selected League, Search query & College
  const filteredStudents = useMemo(() => {
    let list = rankedStudents;

    // League filter
    if (selectedLeague !== 'all') {
      list = list.filter((st) => st.league.id === selectedLeague);
    }

    // Search query filter
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (st) => st.name.toLowerCase().includes(q) || st.college.toLowerCase().includes(q)
      );
    }

    // College filter
    if (selectedCollegeFilter !== 'all') {
      list = list.filter((st) => st.college === selectedCollegeFilter);
    }

    // Recalculate rank within filtered division
    return list.map((st, idx) => ({
      ...st,
      divisionRank: idx + 1
    }));
  }, [rankedStudents, selectedLeague, searchQuery, selectedCollegeFilter]);

  // 5. Unique list of colleges for filter dropdown
  const collegeList = useMemo(() => {
    const set = new Set();
    rankedStudents.forEach((s) => {
      if (s.college && s.college !== 'Learner Hub Management') set.add(s.college);
    });
    return Array.from(set);
  }, [rankedStudents]);

  // 6. Top 3 Podium Students for active league
  const top3 = useMemo(() => {
    return [
      filteredStudents[0] || null, // Rank 1 (Center)
      filteredStudents[1] || null, // Rank 2 (Left)
      filteredStudents[2] || null  // Rank 3 (Right)
    ];
  }, [filteredStudents]);

  // 7. Current User Standing & League Progress
  const currentUserStats = useMemo(() => {
    const userEmail = currentUser?.email?.toLowerCase();
    const userName = currentUser?.name || '';

    const studentRecord = rankedStudents.find(
      (s) => (userEmail && s.email && s.email.toLowerCase() === userEmail) || (userName && s.name.toLowerCase() === userName.toLowerCase())
    );

    const points = studentRecord ? studentRecord.pointsAllTime : Number(currentUser?.points || 0);
    const progress = getLeagueProgress(points);
    const streak = studentRecord ? studentRecord.streak : Number(currentUser?.streak || 1);
    const streakInfo = getStreakMultiplier(streak);

    const divisionIndex = filteredStudents.findIndex(
      (s) => (userEmail && s.email && s.email.toLowerCase() === userEmail) || (userName && s.name.toLowerCase() === userName.toLowerCase())
    );

    const userDivisionRank = divisionIndex !== -1 ? divisionIndex + 1 : (filteredStudents.length + 1);
    const prevInDivision = divisionIndex > 0 ? filteredStudents[divisionIndex - 1] : null;
    const pointsToOvertake = prevInDivision
      ? Math.max(10, prevInDivision.activePoints - (studentRecord ? studentRecord.activePoints : 0) + 10)
      : 0;

    // Promotion zone: top 3 in division (if not apex Champion tier)
    const isPromotionZone = userDivisionRank <= 3 && progress.currentLeague.id !== 'champion';
    const isDemotionZone = userDivisionRank >= filteredStudents.length - 1 && progress.currentLeague.id !== 'bronze' && filteredStudents.length >= 6;

    return {
      points,
      progress,
      streak,
      streakInfo,
      userDivisionRank,
      globalRank: studentRecord ? studentRecord.globalRank : 1,
      pointsToOvertake,
      isPromotionZone,
      isDemotionZone,
      studentRecord
    };
  }, [rankedStudents, filteredStudents, currentUser]);

  const activeLeagueObj = selectedLeague === 'all'
    ? null
    : LEAGUES.find((l) => l.id === selectedLeague);

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-36 font-sans">
      {/* 1. Header & Live Cloud Sync Status Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121827] via-[#101522] to-[#0c0f17] border border-[#1e293b] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
              <Trophy size={14} className="text-amber-400" />
              <span>HSC 2026 Competitive Arena</span>
            </span>

            <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isBn ? 'রিয়েল-টাইম পোস্টগ্রেস ও ক্লাউড সিঙ্ক' : 'Live PostgreSQL & Cloud Sync'}</span>
            </span>

            {/* Season Countdown */}
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-purple-300 bg-purple-950/50 px-2.5 py-0.5 rounded-full border border-purple-500/30">
              <Clock size={12} className="text-purple-400" />
              <span>
                {isBn
                  ? `সিজন সমাপ্তি: ${toBnNum(timeRemaining.days)}দ ${toBnNum(timeRemaining.hours)}ঘ ${toBnNum(timeRemaining.minutes)}মি`
                  : `Season Ends: ${timeRemaining.days}d ${timeRemaining.hours}h ${timeRemaining.minutes}m`}
              </span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? 'এইচএসসি ২০২৬ শিক্ষার্থী লিডারবোর্ড ও লীগ' : 'HSC 2026 Competitive Leagues & Leaderboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 max-w-2xl">
            {isBn
              ? 'গেমের মতো লীগ সিস্টেম, নির্ভুলতা ও গতি বোনাস, এবং স্ট্রিক মাল্টিপ্লায়ারের সাথে জাতীয় র‍্যাঙ্কিংয়ে শীর্ষে উঠুন!'
              : 'Compete in game-like divisions, climb from Bronze to Master, and earn bonus XP with accuracy and streak multipliers!'}
          </p>
        </div>

        {/* Action Controls: Rules Trigger & Timeframe Tabs */}
        <div className="flex flex-wrap items-center gap-2.5 self-start md:self-auto relative z-10">
          <button
            onClick={() => setIsRulesModalOpen(true)}
            className="px-3.5 py-2 rounded-xl text-xs font-black bg-[#161e2e] hover:bg-[#1f2a3f] border border-[#232f45] text-amber-300 flex items-center gap-1.5 transition-all cursor-pointer shadow-sm active:scale-95"
            title="How Points & Leagues Work"
          >
            <HelpCircle size={14} className="text-amber-400" />
            <span>{isBn ? 'পয়েন্ট ও লীগের নিয়ম' : 'Rules & XP Guide'}</span>
          </button>

          {/* Timeframe Filter Tabs */}
          <div className="flex items-center gap-1 p-1 rounded-xl bg-[#0a0e17] border border-[#1e293b]">
            {[
              { id: 'weekly', labelEn: 'Weekly', labelBn: 'সাপ্তাহিক' },
              { id: 'monthly', labelEn: 'Monthly', labelBn: 'মাসিক' },
              { id: 'all_time', labelEn: 'All-Time', labelBn: 'সর্বকালীন' }
            ].map((tab) => {
              const isActive = timeframe === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setTimeframe(tab.id)}
                  className={`relative px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="leaderboardTimeframeTab"
                      className="absolute inset-0 rounded-lg bg-gradient-to-r from-emerald-600 to-teal-600 shadow-sm"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    />
                  )}
                  <span className="relative z-10">{isBn ? tab.labelBn : tab.labelEn}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 2. My League Standing & Progress Hero Card */}
      <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-[#141b2c] via-[#111724] to-[#141a27] border-2 border-emerald-500/30 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-full blur-2xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          {/* User League Tier Badge & Title */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center text-3xl sm:text-4xl bg-gradient-to-br from-[#1a2336] to-[#0d121c] border-2 border-amber-400/40 shadow-xl shadow-amber-950/50">
                {currentUserStats.progress.currentLeague.icon}
              </div>
              <span className="absolute -bottom-2 -right-1 px-2 py-0.5 rounded-full text-[10px] font-black bg-amber-500 text-slate-950 border border-amber-300 shadow">
                {currentUserStats.progress.currentLeague.name}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg sm:text-xl font-black text-white">
                  {isBn ? currentUserStats.progress.currentLeague.nameBn : currentUserStats.progress.currentLeague.name} League
                </h3>
                <span className="text-xs text-slate-400 font-bold px-2 py-0.5 rounded-md bg-[#1e293b]/70 border border-[#2b3952]">
                  {currentUserStats.progress.currentLeague.division}
                </span>
              </div>

              <p className="text-xs text-slate-300">
                {isBn ? currentUserStats.progress.currentLeague.descriptionBn : currentUserStats.progress.currentLeague.descriptionEn}
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
                <span className="text-emerald-400 font-black flex items-center gap-1">
                  <Zap size={13} />
                  <span>{currentUserStats.points} Total XP</span>
                </span>
                <span className="text-orange-400 font-bold flex items-center gap-1">
                  <Flame size={13} />
                  <span>{currentUserStats.streak}d Streak ({currentUserStats.streakInfo.multiplier}x Multiplier)</span>
                </span>
              </div>
            </div>
          </div>

          {/* Next League Progress Bar & Promotion CTA */}
          <div className="w-full lg:w-96 space-y-2.5 bg-[#0d131f]/80 p-4 rounded-2xl border border-[#1e293b]">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-300 font-bold">
                {currentUserStats.progress.isMaxTier
                  ? (isBn ? 'সর্বোচ্চ স্তর অর্জন করেছেন 👑' : 'Apex Legends Tier Achieved 👑')
                  : (isBn 
                      ? `পরবর্তী লীগ: ${currentUserStats.progress.nextLeague.nameBn}` 
                      : `Next: ${currentUserStats.progress.nextLeague.name} League`)}
              </span>
              <span className="text-emerald-400 font-black font-mono">
                {currentUserStats.progress.percent}%
              </span>
            </div>

            {/* Progress Track */}
            <div className="w-full h-3 rounded-full bg-[#161e2e] border border-[#253247] overflow-hidden p-0.5">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${currentUserStats.progress.percent}%` }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
                className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 shadow-md shadow-emerald-500/50"
              />
            </div>

            <div className="flex items-center justify-between text-[11px] text-slate-400">
              <span>
                {currentUserStats.progress.isMaxTier
                  ? 'Champion League Top Contender'
                  : isBn
                  ? `উন্নতিতে আর মাত্র ${toBnNum(currentUserStats.progress.xpNeeded)} XP প্রয়োজন`
                  : `${currentUserStats.progress.xpNeeded} XP needed for promotion`}
              </span>
              <button
                onClick={() => navigate('/practice')}
                className="text-emerald-400 hover:text-emerald-300 font-bold inline-flex items-center gap-1 transition-colors cursor-pointer"
              >
                <span>{isBn ? 'অনুশীলন শুরু করুন' : 'Earn XP'}</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Interactive Competitive Leagues Bar (Game-Style Tabs) */}
      <div className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div className="flex items-center gap-2">
            <Medal size={18} className="text-amber-400" />
            <h2 className="text-base sm:text-lg font-black text-white">
              {isBn ? 'লীগ বিভাগ নির্বাচন করুন' : 'Competitive League Divisions'}
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">
            {isBn ? 'সাপ্তাহিক শীর্ষ ৩ শিক্ষার্থী পদোন্নতি পাবে 🚀' : 'Top 3 students promote weekly 🚀'}
          </span>
        </div>

        {/* Scrollable League Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {/* Global All Leagues Tab */}
          <button
            onClick={() => setSelectedLeague('all')}
            className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
              selectedLeague === 'all'
                ? 'bg-gradient-to-b from-[#1b2539] to-[#121824] border-emerald-400 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500/30'
                : 'bg-[#111723] hover:bg-[#161e2e] border-[#1e293b] text-slate-400 hover:text-slate-200'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xl">🌐</span>
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#1b2539] text-slate-300">
                {leagueCounts.all}
              </span>
            </div>
            <div className="font-extrabold text-white text-xs sm:text-sm">
              {isBn ? 'জাতীয় সার্বিক' : 'Global Arena'}
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              {isBn ? 'সকল প্রতিযোগী' : 'All Divisions'}
            </div>
          </button>

          {/* Tier Cards */}
          {LEAGUES.map((league) => {
            const isSelected = selectedLeague === league.id;
            const isUserCurrent = currentUserStats.progress.currentLeague.id === league.id;
            const count = leagueCounts[league.id] || 0;

            return (
              <button
                key={league.id}
                onClick={() => setSelectedLeague(league.id)}
                className={`p-3 rounded-2xl border text-left transition-all cursor-pointer relative overflow-hidden ${
                  isSelected
                    ? `bg-gradient-to-b ${league.cardGradient} ${league.borderColor} shadow-xl ring-2 ring-amber-400/40`
                    : 'bg-[#111723] hover:bg-[#161e2e] border-[#1e293b] text-slate-400 hover:text-slate-200'
                }`}
              >
                {isUserCurrent && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-400 animate-ping" title="Your Current League" />
                )}

                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xl">{league.icon}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-[#1b2539] text-slate-300">
                    {count}
                  </span>
                </div>

                <div className={`font-black text-xs sm:text-sm truncate ${isSelected ? 'text-white' : 'text-slate-200'}`}>
                  {isBn ? league.nameBn : league.name}
                </div>

                <div className="text-[10px] text-slate-400 truncate">
                  {league.minXP === 0 ? '0-499 XP' : league.maxXP === Infinity ? '8,000+ XP' : `${league.minXP}-${league.maxXP} XP`}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 4. Active Division Banner & Promotion Rules Indicator */}
      <div className="p-4 rounded-2xl bg-[#0f1522] border border-[#1e293b] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#1c2438] to-[#101522] border border-[#2a364f] flex items-center justify-center text-xl shrink-0">
            {activeLeagueObj ? activeLeagueObj.icon : '🏆'}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-white text-sm">
                {activeLeagueObj 
                  ? (isBn ? `${activeLeagueObj.nameBn} প্রতিযোগিতা` : `${activeLeagueObj.name} League Standing`) 
                  : (isBn ? 'জাতীয় সার্বিক লিডারবোর্ড' : 'Global HSC Championship')}
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {filteredStudents.length} {isBn ? 'জন শিক্ষার্থী' : 'Active Students'}
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              {activeLeagueObj
                ? (isBn ? activeLeagueObj.perksBn : activeLeagueObj.perksEn)
                : (isBn ? 'সকল ডিভিশনের সমন্বিত রিয়েল-টাইম তালিকা' : 'Combined global rankings from all active leagues')}
            </p>
          </div>
        </div>

        {/* Division Zone Legend */}
        <div className="flex items-center gap-3 shrink-0 text-[11px]">
          <span className="flex items-center gap-1 text-emerald-400 font-bold">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>{isBn ? 'উন্নতি অঞ্চল (Top 3 🚀)' : 'Promotion Zone (Top 3 🚀)'}</span>
          </span>
          {selectedLeague !== 'bronze' && (
            <span className="flex items-center gap-1 text-rose-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-rose-400" />
              <span>{isBn ? 'অবনমন ঝুঁকি (⚠️)' : 'Demotion Risk (⚠️)'}</span>
            </span>
          )}
        </div>
      </div>

      {/* 5. Top 3 Champions Podium for Selected League */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111723] border border-[#1e293b] shadow-card space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
            {activeLeagueObj ? `${activeLeagueObj.name} Division Podium` : (isBn ? 'শীর্ষ ৩ চ্যাম্পিয়ন' : 'Top 3 Champions')}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isBn ? 'সেরা তিন পারফর্মার' : 'Hall of Fame Podium'}
          </h2>
        </div>

        {/* Podium Layout */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 items-end pt-8 max-w-3xl mx-auto">
          {/* Rank 2 (Silver) */}
          {top3[1] ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-tr from-slate-400 via-slate-200 to-slate-500 shadow-lg shadow-slate-500/20">
                  <img
                    src={top3[1].avatar}
                    alt={top3[1].name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-slate-300 text-slate-950 font-black text-xs flex items-center justify-center shadow-md border-2 border-slate-900">
                  2
                </div>
              </div>

              <div className="text-center space-y-0.5">
                <h4 className="font-extrabold text-white text-xs sm:text-sm truncate max-w-[120px]">
                  {top3[1].name}
                </h4>
                <p className="text-[10px] text-slate-400 truncate max-w-[110px]">
                  {top3[1].college}
                </p>
                <div className="pt-1">
                  <span className="text-xs sm:text-sm font-black text-slate-200 block">
                    {top3[1].activePoints} XP
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {top3[1].accuracy}% {isBn ? 'সঠিক' : 'Acc.'}
                  </span>
                </div>
              </div>

              <div className="w-full h-28 sm:h-32 rounded-t-2xl bg-gradient-to-b from-[#1b2438] to-[#121824] border-t-2 border-l border-r border-slate-400/40 flex flex-col items-center justify-center p-2 shadow-inner">
                <Medal size={28} className="text-slate-300" />
                <span className="text-xs font-black text-slate-300 mt-1">SILVER</span>
              </div>
            </motion.div>
          ) : <div className="h-28" />}

          {/* Rank 1 (Gold - Center Elevated) */}
          {top3[0] ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-3 relative -mt-6"
            >
              <Crown size={32} className="text-amber-400 animate-bounce" />

              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl p-1.5 bg-gradient-to-tr from-amber-400 via-yellow-200 to-amber-500 shadow-xl shadow-amber-500/30">
                  <img
                    src={top3[0].avatar}
                    alt={top3[0].name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <div className="absolute -top-3 -right-2 w-8 h-8 rounded-full bg-gradient-to-tr from-amber-400 to-yellow-300 text-slate-950 font-black text-sm flex items-center justify-center shadow-lg border-2 border-slate-900">
                  1
                </div>
              </div>

              <div className="text-center space-y-0.5">
                <div className="flex items-center justify-center gap-1">
                  <h4 className="font-black text-white text-sm sm:text-base truncate max-w-[140px]">
                    {top3[0].name}
                  </h4>
                  <ShieldCheck size={14} className="text-amber-400 shrink-0" />
                </div>
                <p className="text-[11px] text-amber-200/80 truncate max-w-[130px]">
                  {top3[0].college}
                </p>
                <div className="pt-1">
                  <span className="text-sm sm:text-base font-black text-amber-400 block">
                    {top3[0].activePoints} XP
                  </span>
                  <span className="text-[11px] text-emerald-400 font-bold">
                    {top3[0].accuracy}% Acc • 🔥 {top3[0].streak}d
                  </span>
                </div>
              </div>

              <div className="w-full h-36 sm:h-44 rounded-t-2xl bg-gradient-to-b from-amber-950/40 via-[#221c10] to-[#121824] border-t-4 border-l-2 border-r-2 border-amber-400/80 flex flex-col items-center justify-center p-2 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-amber-400/5 animate-pulse" />
                <Trophy size={36} className="text-amber-400 relative z-10" />
                <span className="text-xs sm:text-sm font-black text-amber-300 tracking-wider mt-1 relative z-10">
                  CHAMPION
                </span>
              </div>
            </motion.div>
          ) : <div className="h-36" />}

          {/* Rank 3 (Bronze) */}
          {top3[2] ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex flex-col items-center space-y-3"
            >
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl p-1 bg-gradient-to-tr from-amber-700 via-amber-600 to-yellow-800 shadow-lg shadow-amber-900/30">
                  <img
                    src={top3[2].avatar}
                    alt={top3[2].name}
                    className="w-full h-full object-cover rounded-xl"
                  />
                </div>
                <div className="absolute -top-3 -right-2 w-7 h-7 rounded-full bg-amber-700 text-amber-100 font-black text-xs flex items-center justify-center shadow-md border-2 border-slate-900">
                  3
                </div>
              </div>

              <div className="text-center space-y-0.5">
                <h4 className="font-extrabold text-white text-xs sm:text-sm truncate max-w-[120px]">
                  {top3[2].name}
                </h4>
                <p className="text-[10px] text-slate-400 truncate max-w-[110px]">
                  {top3[2].college}
                </p>
                <div className="pt-1">
                  <span className="text-xs sm:text-sm font-black text-amber-300 block">
                    {top3[2].activePoints} XP
                  </span>
                  <span className="text-[10px] text-emerald-400 font-semibold">
                    {top3[2].accuracy}% {isBn ? 'সঠিক' : 'Acc.'}
                  </span>
                </div>
              </div>

              <div className="w-full h-24 sm:h-28 rounded-t-2xl bg-gradient-to-b from-[#221710] to-[#121824] border-t-2 border-l border-r border-amber-700/40 flex flex-col items-center justify-center p-2 shadow-inner">
                <Medal size={26} className="text-amber-600" />
                <span className="text-xs font-black text-amber-500 mt-1">BRONZE</span>
              </div>
            </motion.div>
          ) : <div className="h-24" />}
        </div>
      </div>

      {/* 6. Search & College Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-2xl bg-[#111723] border border-[#1e293b] shadow-card">
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'শিক্ষার্থী বা কলেজ দিয়ে খুঁজুন...' : 'Search student by name or college...'}
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none transition-all"
          />
        </div>

        {/* College Filter Select */}
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Building2 size={16} className="text-slate-400 shrink-0" />
          <select
            value={selectedCollegeFilter}
            onChange={(e) => setSelectedCollegeFilter(e.target.value)}
            className="w-full sm:w-auto px-3.5 py-2 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-xs font-bold text-slate-200 outline-none focus:border-emerald-500 transition-all cursor-pointer"
          >
            <option value="all">{isBn ? 'সকল কলেজ (All Colleges)' : 'All Colleges'}</option>
            {collegeList.map((col) => (
              <option key={col} value={col}>{col}</option>
            ))}
          </select>
        </div>
      </div>

      {/* 7. Real-Time Ranked Students Table */}
      <div className="rounded-3xl bg-[#111723] border border-[#1e293b] shadow-card overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-5 py-3.5 bg-[#0c0f17] border-b border-[#1e293b] text-xs font-black text-slate-400 uppercase tracking-wider">
          <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
          <div className="col-span-1 sm:col-span-1 text-center">Zone</div>
          <div className="col-span-5 sm:col-span-4">Student & College</div>
          <div className="hidden sm:block sm:col-span-2 text-center">League</div>
          <div className="hidden sm:block sm:col-span-1 text-center">Streak</div>
          <div className="col-span-2 sm:col-span-1 text-center">Accuracy</div>
          <div className="col-span-2 sm:col-span-2 text-right">Points (XP)</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[#1e293b]">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => {
              const isCurrentUser =
                (currentUser?.email && student.email && student.email.toLowerCase() === currentUser.email.toLowerCase()) ||
                student.name === currentUser?.name;

              // Compute zone status within division
              const isPromo = student.divisionRank <= 3 && student.league.id !== 'champion';
              const isDemo = student.divisionRank >= filteredStudents.length - 1 && student.league.id !== 'bronze' && filteredStudents.length >= 6;

              return (
                <motion.div
                  key={student.id}
                  layout
                  className={`grid grid-cols-12 gap-2 px-5 py-4 items-center text-xs sm:text-sm transition-all ${
                    isCurrentUser
                      ? 'bg-emerald-950/30 border-l-4 border-l-emerald-400 text-white font-bold'
                      : isPromo
                      ? 'hover:bg-[#13201d] text-slate-300'
                      : 'hover:bg-[#151c2c] text-slate-300'
                  }`}
                >
                  {/* Rank Column */}
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                        student.divisionRank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30'
                          : student.divisionRank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : student.divisionRank === 3
                          ? 'bg-amber-700 text-amber-100'
                          : 'bg-[#182030] text-slate-400 border border-[#222d42]'
                      }`}
                    >
                      #{student.divisionRank}
                    </span>
                  </div>

                  {/* Zone Indicator (Promotion / Safe / Danger) */}
                  <div className="col-span-1 sm:col-span-1 flex justify-center">
                    {isPromo ? (
                      <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold" title="Promotion Zone">
                        🚀
                      </span>
                    ) : isDemo ? (
                      <span className="w-6 h-6 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center text-xs font-bold" title="Demotion Risk">
                        ⚠️
                      </span>
                    ) : (
                      <span className="text-slate-500 font-bold text-[11px]" title="Safe Zone">
                        🛡️
                      </span>
                    )}
                  </div>

                  {/* Student & College */}
                  <div className="col-span-5 sm:col-span-4 flex items-center gap-3">
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="w-9 h-9 rounded-xl object-cover border border-[#232f45] shrink-0"
                    />
                    <div className="truncate">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-white truncate block">
                          {student.name}
                        </span>
                        {isCurrentUser && (
                          <span className="text-[10px] font-black px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                            {isBn ? 'আপনি' : 'You'}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400 truncate block">
                        {student.college}
                      </span>
                    </div>
                  </div>

                  {/* League Badge Column */}
                  <div className="hidden sm:flex sm:col-span-2 items-center justify-center">
                    <span className="px-2.5 py-1 rounded-full text-[11px] font-black bg-[#151c2a] border border-[#232f45] flex items-center gap-1 text-slate-200">
                      <span>{student.league.icon}</span>
                      <span>{student.league.name}</span>
                    </span>
                  </div>

                  {/* Streak Flame */}
                  <div className="hidden sm:flex sm:col-span-1 items-center justify-center gap-1 text-amber-400 font-semibold text-xs">
                    <Flame size={14} className="text-orange-500 animate-flame" />
                    <span>{student.streak}d</span>
                  </div>

                  {/* Accuracy */}
                  <div className="col-span-2 sm:col-span-1 text-center font-bold text-teal-400 text-xs">
                    {student.accuracy}%
                  </div>

                  {/* Points XP */}
                  <div className="col-span-2 sm:col-span-2 text-right">
                    <span className="font-black text-emerald-400 text-sm sm:text-base">
                      {student.activePoints}
                    </span>
                    <span className="text-[10px] text-slate-400 ml-1 font-bold">XP</span>
                  </div>
                </motion.div>
              );
            })
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Users size={32} className="mx-auto text-slate-600" />
              <p className="font-bold text-sm">
                {isBn ? 'এই বিভাগে কোনো শিক্ষার্থী পাওয়া যায়নি' : 'No students found matching this league filter'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* 8. User's Personal Real Rank Floating Footer Card */}
      <div className="fixed bottom-3 left-4 right-4 max-w-5xl mx-auto z-40">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-4 sm:p-5 rounded-2xl bg-[#111723]/95 backdrop-blur-xl border-2 border-emerald-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black text-base flex items-center justify-center shadow-lg shadow-emerald-950/60 shrink-0">
              #{currentUserStats.userDivisionRank}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base">
                  {currentUser?.name || 'Your Profile'}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 flex items-center gap-1">
                  <span>{currentUserStats.progress.currentLeague.icon}</span>
                  <span>{currentUserStats.progress.currentLeague.name}</span>
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {currentUser?.college || 'Notre Dame College, Dhaka'} • <strong className="text-emerald-400 font-bold">{currentUserStats.points} Total XP</strong> • 🔥 {currentUserStats.streak}d Streak ({currentUserStats.streakInfo.multiplier}x)
              </p>
            </div>
          </div>

          {/* Distance to next rank & Action CTA */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-[#1e293b]">
            <div className="text-left sm:text-right">
              <span className="text-xs text-amber-300 font-semibold block">
                {currentUserStats.pointsToOvertake > 0 ? (
                  isBn 
                    ? `পরবর্তী র‍্যাঙ্ক (#${currentUserStats.userDivisionRank - 1}) টপকাতে আর মাত্র ${currentUserStats.pointsToOvertake} XP বাকি!`
                    : `Only ${currentUserStats.pointsToOvertake} XP needed to overtake Rank #${currentUserStats.userDivisionRank - 1}!`
                ) : (
                  isBn ? '🏆 আপনি আপনার বিভাগে শীর্ষে অবস্থান করছেন!' : '🏆 You are leading this division at Rank #1!'
                )}
              </span>
              <span className="text-[11px] text-slate-400">
                {isBn ? 'প্রতি সঠিক উত্তরে ১০ XP + গতি ও নির্ভুলতা বোনাস' : '+10 XP per MCQ + Speed & Accuracy Bonus'}
              </span>
            </div>

            <button
              onClick={() => navigate('/practice')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 active:scale-95 transition-all flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>{isBn ? 'কুইজ দিয়ে র‍্যাঙ্ক বাড়ান' : 'Boost Rank Now'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>

      {/* 9. "How Points & Leagues Work" Modal */}
      {isRulesModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center">
                  <Trophy size={20} />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">
                    {isBn ? 'পয়েন্ট সিস্টেম ও লীগ গাইডলাইন' : 'Points System & Competitive Leagues Guide'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isBn ? 'এইচএসসি ২০২৬ প্ল্যাটফর্মের গেম-স্টাইল রুলস' : 'Official game-style rules & scoring mechanisms'}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setIsRulesModalOpen(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#161e2e] transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Point Calculation Rules */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Zap size={15} />
                <span>{isBn ? '১. কিভাবে XP পয়েন্ট অর্জন করবেন?' : '1. How XP Points are Earned'}</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <div className="p-3 rounded-xl bg-[#0c0f17] border border-[#1e293b] space-y-1">
                  <div className="font-bold text-white">🎯 {isBn ? 'সঠিক এমসিকিউ উত্তর' : 'Base Correct MCQ'}</div>
                  <div className="text-emerald-400 font-mono font-bold">+10 XP {isBn ? 'প্রতি প্রশ্নে' : 'per question'}</div>
                  <div className="text-[11px] text-slate-400">{isBn ? 'প্রতিটি সঠিক উত্তরে সরাসরি যুক্ত হয়' : 'Awarded directly for every verified correct answer.'}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0c0f17] border border-[#1e293b] space-y-1">
                  <div className="font-bold text-white">⚡ {isBn ? 'স্পিড ও ক্ষিপ্রতা বোনাস' : 'Speed Mastery Bonus'}</div>
                  <div className="text-teal-400 font-mono font-bold">+20 XP {isBn ? 'বোনাস' : 'Bonus'}</div>
                  <div className="text-[11px] text-slate-400">{isBn ? 'গড়ে ১০ সেকেন্ড বা তার কম সময়ে সম্পন্ন করলে' : 'Complete test under 10 seconds per question.'}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0c0f17] border border-[#1e293b] space-y-1">
                  <div className="font-bold text-white">💯 {isBn ? 'শতভাগ নির্ভুলতা বোনাস' : '100% Perfect Accuracy'}</div>
                  <div className="text-amber-400 font-mono font-bold">+50 XP {isBn ? 'বোনাস' : 'Bonus'}</div>
                  <div className="text-[11px] text-slate-400">{isBn ? 'কোনো ভুল ছাড়া ১০০% স্কোর অর্জন করলে' : 'Awarded for zero mistakes in a completed session.'}</div>
                </div>

                <div className="p-3 rounded-xl bg-[#0c0f17] border border-[#1e293b] space-y-1">
                  <div className="font-bold text-white">🧠 {isBn ? 'দুর্বল শব্দ পুনরুদ্ধার' : 'Weak Word Mastery'}</div>
                  <div className="text-purple-400 font-mono font-bold">+100 XP {isBn ? 'মহাসম্মানী' : 'Mega Reward'}</div>
                  <div className="text-[11px] text-slate-400">{isBn ? 'দুর্বল শব্দকে টানা ৫ বার সঠিক করে উত্তীর্ণ করলে' : 'Clear a weak word with 5 consecutive correct answers.'}</div>
                </div>
              </div>
            </div>

            {/* Streak Multipliers */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-orange-400 uppercase tracking-wider flex items-center gap-1.5">
                <Flame size={15} />
                <span>{isBn ? '২. স্ট্রিক মাল্টিপ্লায়ার (Streak Multipliers)' : '2. Daily Streak XP Multipliers'}</span>
              </h4>

              <div className="p-3.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] space-y-2 text-xs">
                <p className="text-slate-300">
                  {isBn
                    ? 'টানা প্রতিদিন প্র্যাকটিস করলে আপনার অর্জিত সকল XP পয়েন্টে স্বয়ংক্রিয় গুণক যুক্ত হয়:'
                    : 'Consistent daily practice applies an automatic multiplier to all earned points:'}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  <div className="p-2 rounded-lg bg-[#161e2e] border border-[#232f45]">
                    <span className="block text-[10px] text-slate-400">3-6 Days</span>
                    <span className="font-black text-white text-sm">1.1x (+10%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#161e2e] border border-[#232f45]">
                    <span className="block text-[10px] text-slate-400">7-13 Days</span>
                    <span className="font-black text-amber-400 text-sm">1.25x (+25%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#161e2e] border border-[#232f45]">
                    <span className="block text-[10px] text-slate-400">14-29 Days</span>
                    <span className="font-black text-orange-400 text-sm">1.5x (+50%)</span>
                  </div>
                  <div className="p-2 rounded-lg bg-[#161e2e] border border-orange-500/40">
                    <span className="block text-[10px] text-orange-300">30+ Days</span>
                    <span className="font-black text-orange-400 text-sm">2.0x (Double!)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* League Tiers RoadMap */}
            <div className="space-y-3">
              <h4 className="text-sm font-black text-cyan-400 uppercase tracking-wider flex items-center gap-1.5">
                <Medal size={15} />
                <span>{isBn ? '৩. ৬টি লীগ স্তর ও পদোন্নতির কাট-অফ' : '3. The 6 League Tiers & Promotion Cutoffs'}</span>
              </h4>

              <div className="space-y-2">
                {LEAGUES.map((l) => (
                  <div key={l.id} className="p-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2.5">
                      <span className="text-lg">{l.icon}</span>
                      <div>
                        <span className="font-bold text-white block">
                          {isBn ? l.nameBn : l.name} League
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {isBn ? l.descriptionBn : l.descriptionEn}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-amber-400">
                        {l.minXP === 0 ? '0-499 XP' : l.maxXP === Infinity ? '8,000+ XP' : `${l.minXP}-${l.maxXP} XP`}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsRulesModalOpen(false)}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs transition-all cursor-pointer shadow-lg shadow-emerald-950/60"
            >
              {isBn ? 'বুঝেছি, অনুশীলনে ফিরে যান' : 'Got it, Let\'s Compete!'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
