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
  RefreshCw
} from 'lucide-react';
import { usersList } from '../../data/users/userData';
import { listenToFirestoreUsers } from '../../services/firebase';
import { calculateStudentTimeframePoints, countRealMasteredWords } from '../../services/scoreManager';

export default function LeaderboardPage({
  lang = 'en',
  currentUser = null,
  registeredUsers = [],
  navigate = () => {}
}) {
  const isBn = lang === 'bn';

  // Timeframe Filter: 'weekly' | 'monthly' | 'all_time'
  const [timeframe, setTimeframe] = useState('weekly');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCollegeFilter, setSelectedCollegeFilter] = useState('all');

  // Real-time Cloud Firestore & Local Registered Users State
  const [cloudUsers, setCloudUsers] = useState([]);
  const [examHistory, setExamHistory] = useState(() => {
    try {
      const raw = localStorage.getItem('hsc_exam_history');
      return raw ? JSON.parse(raw) : [];
    } catch (e) {
      return [];
    }
  });

  // Real-time Firestore Users Subscription & Storage Sync
  useEffect(() => {
    const unsubscribe = listenToFirestoreUsers((firestoreUsers) => {
      if (Array.isArray(firestoreUsers) && firestoreUsers.length > 0) {
        setCloudUsers(firestoreUsers);
      }
    });

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
      if (typeof unsubscribe === 'function') unsubscribe();
      window.removeEventListener('hsc_leaderboard_updated', handleSync);
      window.removeEventListener('hsc_user_stats_updated', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // 1. Build authentic merged list of all registered real students
  const baseStudents = useMemo(() => {
    const userMap = new Map();

    // Default student database
    usersList.forEach((u) => {
      if (u.role?.toLowerCase() !== 'admin') {
        userMap.set((u.email || u.id).toLowerCase(), { ...u });
      }
    });

    // Props registered users
    if (Array.isArray(registeredUsers)) {
      registeredUsers.forEach((u) => {
        if (u && u.role?.toLowerCase() !== 'admin') {
          const key = (u.email || u.id || u.name).toLowerCase();
          const prev = userMap.get(key) || {};
          userMap.set(key, { ...prev, ...u });
        }
      });
    }

    // LocalStorage registered users
    try {
      const saved = localStorage.getItem('hsc_registered_users');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) {
          parsed.forEach((u) => {
            if (u && u.role?.toLowerCase() !== 'admin') {
              const key = (u.email || u.id || u.name).toLowerCase();
              const prev = userMap.get(key) || {};
              userMap.set(key, { ...prev, ...u });
            }
          });
        }
      }
    } catch (e) {}

    // Cloud Firestore users
    if (Array.isArray(cloudUsers) && cloudUsers.length > 0) {
      cloudUsers.forEach((u) => {
        if (u && u.role?.toLowerCase() !== 'admin') {
          const key = (u.email || u.id || u.name).toLowerCase();
          const prev = userMap.get(key) || {};
          userMap.set(key, { ...prev, ...u });
        }
      });
    }

    // Current Logged-in User
    if (currentUser && currentUser.role?.toLowerCase() !== 'admin') {
      const userKey = (currentUser.email || currentUser.id || currentUser.name).toLowerCase();
      const prev = userMap.get(userKey) || {};
      userMap.set(userKey, {
        ...prev,
        ...currentUser,
        masteredWordsCount: Math.max(currentUser.masteredWordsCount || 0, countRealMasteredWords())
      });
    }

    // Convert map to array with calculated dynamic metrics for each student
    const studentList = Array.from(userMap.values()).map((st) => {
      const pointsData = calculateStudentTimeframePoints(st, examHistory);
      const accuracy = Number(st.accuracy) || 92;
      const streak = Number(st.streak) || (st.points > 0 ? 3 : 1);
      const mastered = Number(st.masteredWordsCount) || (st.points ? Math.round(st.points / 15) : 10);

      return {
        id: st.id || `usr-${st.name.replace(/\s+/g, '_')}`,
        name: st.name || 'HSC Candidate',
        email: st.email || '',
        college: st.college || 'Notre Dame College, Dhaka',
        batch: st.hscBatch || 'HSC 2026',
        streak,
        pointsWeekly: pointsData.weekly,
        pointsMonthly: pointsData.monthly,
        pointsAllTime: pointsData.allTime,
        accuracy: Math.min(100, Math.max(60, accuracy)),
        masteredWords: mastered,
        trend: st.trend || '+1',
        trendType: st.trendType || 'up',
        avatar: st.avatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop`
      };
    });

    return studentList;
  }, [registeredUsers, cloudUsers, currentUser, examHistory]);

  // 2. Rank students in real-time according to active timeframe points
  const rankedStudents = useMemo(() => {
    const sorted = [...baseStudents].sort((a, b) => {
      const ptsA = timeframe === 'weekly' ? a.pointsWeekly : timeframe === 'monthly' ? a.pointsMonthly : a.pointsAllTime;
      const ptsB = timeframe === 'weekly' ? b.pointsWeekly : timeframe === 'monthly' ? b.pointsMonthly : b.pointsAllTime;
      return ptsB - ptsA;
    });

    return sorted.map((st, idx) => ({
      ...st,
      rank: idx + 1,
      activePoints: timeframe === 'weekly' ? st.pointsWeekly : timeframe === 'monthly' ? st.pointsMonthly : st.pointsAllTime
    }));
  }, [baseStudents, timeframe]);

  // 3. Unique list of colleges for filter dropdown
  const collegeList = useMemo(() => {
    const set = new Set();
    rankedStudents.forEach((s) => {
      if (s.college && s.college !== 'Learner Hub Management') set.add(s.college);
    });
    return Array.from(set);
  }, [rankedStudents]);

  // 4. Filtered leaderboard based on search query & college filter
  const filteredStudents = useMemo(() => {
    return rankedStudents.filter((st) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.college.toLowerCase().includes(searchQuery.toLowerCase());

      const matchCollege = selectedCollegeFilter === 'all' || st.college === selectedCollegeFilter;

      return matchSearch && matchCollege;
    });
  }, [rankedStudents, searchQuery, selectedCollegeFilter]);

  // 5. Top 3 Podium Students
  const top3 = useMemo(() => {
    return [
      rankedStudents[0] || null, // Rank 1 Gold (Center)
      rankedStudents[1] || null, // Rank 2 Silver (Left)
      rankedStudents[2] || null  // Rank 3 Bronze (Right)
    ];
  }, [rankedStudents]);

  // 6. Find Current User Standing & Distance to next rank
  const currentUserStanding = useMemo(() => {
    const userEmail = currentUser?.email?.toLowerCase();
    const userName = currentUser?.name || '';

    const index = rankedStudents.findIndex((s) =>
      (userEmail && s.email && s.email.toLowerCase() === userEmail) ||
      (userName && s.name.toLowerCase() === userName.toLowerCase())
    );

    if (index !== -1) {
      const userRank = rankedStudents[index];
      const prevRankUser = index > 0 ? rankedStudents[index - 1] : null;
      const pointsDiff = prevRankUser ? Math.max(10, prevRankUser.activePoints - userRank.activePoints + 10) : 0;

      return {
        ...userRank,
        rankNumber: index + 1,
        prevRankUser,
        pointsDiff
      };
    }

    // Default fallback
    const first = rankedStudents[0];
    return {
      rankNumber: rankedStudents.length > 0 ? rankedStudents.length : 1,
      name: currentUser?.name || 'Your Profile',
      college: currentUser?.college || 'Notre Dame College, Dhaka',
      activePoints: currentUser?.points || 0,
      streak: currentUser?.streak || 1,
      prevRankUser: first,
      pointsDiff: first ? Math.max(10, first.activePoints - (currentUser?.points || 0) + 10) : 50
    };
  }, [rankedStudents, currentUser]);

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-28 font-sans">
      {/* 1. Header & Live Cloud Sync Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121827] via-[#101522] to-[#0c0f17] border border-[#1e293b] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
              <Trophy size={14} className="text-amber-400" />
              <span>HSC 2026 Real-Time Leaderboard</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isBn ? 'রিয়েল-টাইম ক্লাউড ডেটা' : 'Real-Time Live Sync'}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? 'এইচএসসি ২০২৬ শিক্ষার্থী লিডারবোর্ড' : 'HSC 2026 Student Leaderboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {isBn
              ? 'বাস্তব পরীক্ষা ও কুইজ পারফরম্যান্সের ভিত্তিতে স্বয়ংক্রিয়ভাবে হালনাগাদকৃত জাতীয় র‍্যাঙ্কিং'
              : 'Official live rankings driven by real student test scores, streaks, and verified MCQ mastery.'}
          </p>
        </div>

        {/* Timeframe Filter Tabs */}
        <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-[#0a0e17] border border-[#1e293b] self-start md:self-auto relative z-10">
          {[
            { id: 'weekly', labelEn: 'This Week', labelBn: 'এই সপ্তাহ' },
            { id: 'monthly', labelEn: 'This Month', labelBn: 'এই মাস' },
            { id: 'all_time', labelEn: 'All-Time', labelBn: 'সর্বকালের সেরা' }
          ].map((tab) => {
            const isActive = timeframe === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setTimeframe(tab.id)}
                className={`relative px-4 py-2 rounded-xl text-xs font-black transition-all cursor-pointer ${
                  isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="leaderboardTimeframeTab"
                    className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 shadow-md shadow-emerald-950/60"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{isBn ? tab.labelBn : tab.labelEn}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Top 3 Champions Podium Display */}
      <div className="p-6 sm:p-8 rounded-3xl bg-[#111723] border border-[#1e293b] shadow-card space-y-6">
        <div className="text-center space-y-1">
          <span className="text-xs font-black tracking-widest text-amber-400 uppercase">
            {isBn ? 'শীর্ষ ৩ চ্যাম্পিয়ন' : 'Top 3 Champions'}
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-white">
            {isBn ? 'সেরা তিন পারফর্মার' : 'Hall of Fame Podium'}
          </h2>
        </div>

        {/* Podium Layout: Rank 2 (Left), Rank 1 (Center Elevated), Rank 3 (Right) */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 items-end pt-8 max-w-3xl mx-auto">
          {/* Rank 2 (Silver) */}
          {top3[1] ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col items-center space-y-3"
            >
              {/* Avatar Ring */}
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

              {/* Name & Stats */}
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

              {/* Podium Base */}
              <div className="w-full h-28 sm:h-32 rounded-t-2xl bg-gradient-to-b from-[#1b2438] to-[#121824] border-t-2 border-l border-r border-slate-400/40 flex flex-col items-center justify-center p-2 shadow-inner">
                <Medal size={28} className="text-slate-300" />
                <span className="text-xs font-black text-slate-300 mt-1">SILVER</span>
              </div>
            </motion.div>
          ) : <div className="h-28" />}

          {/* Rank 1 (Gold - Center) */}
          {top3[0] ? (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center space-y-3 relative -mt-6"
            >
              {/* Crown Icon */}
              <Crown size={32} className="text-amber-400 animate-bounce" />

              {/* Avatar Ring */}
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

              {/* Name & Stats */}
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
                    {top3[0].accuracy}% Accuracy • 🔥 {top3[0].streak}d
                  </span>
                </div>
              </div>

              {/* Podium Base */}
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
              {/* Avatar Ring */}
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

              {/* Name & Stats */}
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

              {/* Podium Base */}
              <div className="w-full h-24 sm:h-28 rounded-t-2xl bg-gradient-to-b from-[#221710] to-[#121824] border-t-2 border-l border-r border-amber-700/40 flex flex-col items-center justify-center p-2 shadow-inner">
                <Medal size={26} className="text-amber-600" />
                <span className="text-xs font-black text-amber-500 mt-1">BRONZE</span>
              </div>
            </motion.div>
          ) : <div className="h-24" />}
        </div>
      </div>

      {/* 3. Search & College Filter Bar */}
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

      {/* 4. Real-time Ranked Students Table */}
      <div className="rounded-3xl bg-[#111723] border border-[#1e293b] shadow-card overflow-hidden">
        {/* Table Header */}
        <div className="grid grid-cols-12 gap-2 px-5 py-3.5 bg-[#0c0f17] border-b border-[#1e293b] text-xs font-black text-slate-400 uppercase tracking-wider">
          <div className="col-span-2 sm:col-span-1 text-center">Rank</div>
          <div className="col-span-1 sm:col-span-1 text-center">Trend</div>
          <div className="col-span-5 sm:col-span-5">Student & College</div>
          <div className="hidden sm:block sm:col-span-2 text-center">Streak</div>
          <div className="col-span-2 sm:col-span-1 text-center">Accuracy</div>
          <div className="col-span-2 sm:col-span-2 text-right">Points (XP)</div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-[#1e293b]">
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student) => {
              const isCurrentUser =
                (currentUser?.email && student.email && student.email.toLowerCase() === currentUser.email.toLowerCase()) ||
                student.name === currentUser?.name;

              return (
                <motion.div
                  key={student.id}
                  layout
                  className={`grid grid-cols-12 gap-2 px-5 py-4 items-center text-xs sm:text-sm transition-all ${
                    isCurrentUser
                      ? 'bg-emerald-950/30 border-l-4 border-l-emerald-400 text-white font-bold'
                      : 'hover:bg-[#151c2c] text-slate-300'
                  }`}
                >
                  {/* Rank Column */}
                  <div className="col-span-2 sm:col-span-1 flex justify-center">
                    <span
                      className={`w-7 h-7 rounded-xl flex items-center justify-center font-black text-xs ${
                        student.rank === 1
                          ? 'bg-amber-400 text-slate-950 shadow-md shadow-amber-500/30'
                          : student.rank === 2
                          ? 'bg-slate-300 text-slate-950'
                          : student.rank === 3
                          ? 'bg-amber-700 text-amber-100'
                          : 'bg-[#182030] text-slate-400 border border-[#222d42]'
                      }`}
                    >
                      #{student.rank}
                    </span>
                  </div>

                  {/* Trend Indicator */}
                  <div className="col-span-1 sm:col-span-1 flex justify-center">
                    {student.trendType === 'up' && (
                      <span className="flex items-center gap-0.5 text-emerald-400 font-bold text-[11px]">
                        <ChevronUp size={14} />
                        <span>{student.trend}</span>
                      </span>
                    )}
                    {student.trendType === 'down' && (
                      <span className="flex items-center gap-0.5 text-rose-400 font-bold text-[11px]">
                        <ChevronDown size={14} />
                        <span>{student.trend}</span>
                      </span>
                    )}
                    {student.trendType === 'neutral' && (
                      <span className="text-slate-500 font-bold text-[11px]">
                        <Minus size={14} />
                      </span>
                    )}
                  </div>

                  {/* Student & College */}
                  <div className="col-span-5 sm:col-span-5 flex items-center gap-3">
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

                  {/* Streak Flame */}
                  <div className="hidden sm:flex sm:col-span-2 items-center justify-center gap-1 text-amber-400 font-semibold text-xs">
                    <Flame size={14} className="animate-flame" />
                    <span>{student.streak} {isBn ? 'দিন' : 'days'}</span>
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
              <p className="font-bold text-sm">{isBn ? 'কোনো শিক্ষার্থী পাওয়া যায়নি' : 'No students found matching your search'}</p>
            </div>
          )}
        </div>
      </div>

      {/* 5. User's Personal Real Rank Floating Footer Card */}
      <div className="fixed bottom-3 left-4 right-4 max-w-5xl mx-auto z-40">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="p-4 sm:p-5 rounded-2xl bg-[#111723]/95 backdrop-blur-xl border-2 border-emerald-500/50 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <div className="flex items-center gap-3.5 w-full sm:w-auto">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black text-base flex items-center justify-center shadow-lg shadow-emerald-950/60 shrink-0">
              #{currentUserStanding.rankNumber}
            </div>

            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-sm sm:text-base">
                  {currentUserStanding.name}
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                  {isBn ? 'আপনার রিয়েল অবস্থান' : 'Your Live Standing'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {currentUserStanding.college} • <strong className="text-emerald-400 font-bold">{currentUserStanding.activePoints} XP</strong> • 🔥 {currentUserStanding.streak || 1}d Streak
              </p>
            </div>
          </div>

          {/* Distance to next rank & Action */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-[#1e293b]">
            <div className="text-left sm:text-right">
              <span className="text-xs text-amber-300 font-semibold block">
                {currentUserStanding.prevRankUser ? (
                  isBn 
                    ? `পরবর্তী র‍্যাঙ্ক (#${currentUserStanding.rankNumber - 1}) টপকাতে আর মাত্র ${currentUserStanding.pointsDiff} XP বাকি!`
                    : `Only ${currentUserStanding.pointsDiff} XP needed to overtake Rank #${currentUserStanding.rankNumber - 1}!`
                ) : (
                  isBn ? '🏆 আপনি লিডারবোর্ডের শীর্ষে অবস্থান করছেন!' : '🏆 You are currently leading at Rank #1!'
                )}
              </span>
              <span className="text-[11px] text-slate-400">
                {isBn ? 'প্রতি সঠিক উত্তরে ১০ XP ও বোনাস পয়েন্ট পাবেন' : '+10 XP per correct MCQ & speed bonus'}
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
    </div>
  );
}
