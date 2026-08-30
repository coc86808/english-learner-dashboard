import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy,
  Award,
  Crown,
  Medal,
  Flame,
  Search,
  TrendingUp,
  TrendingDown,
  Minus,
  Sparkles,
  Zap,
  ArrowRight,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
  Filter,
  Users,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { usersList } from '../../data/users/userData';

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

  // Merged and active students dataset
  const baseStudents = useMemo(() => {
    const list = Array.isArray(registeredUsers) && registeredUsers.length > 0
      ? registeredUsers
      : usersList;

    // Rich populated leaderboard entries across top colleges of Bangladesh
    const extendedList = [
      {
        id: 'usr-ndc-1',
        name: 'Tanvir Ahmed',
        college: 'Notre Dame College, Dhaka',
        batch: 'HSC 2026',
        streak: 14,
        pointsWeekly: 680,
        pointsMonthly: 2150,
        pointsAllTime: 4850,
        accuracy: 96.8,
        masteredWords: 142,
        trend: '+2',
        trendType: 'up',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&h=120&fit=crop'
      },
      {
        id: 'usr-vn-2',
        name: 'Sadia Rahman',
        college: 'Viqarunnisa Noon College',
        batch: 'HSC 2026',
        streak: 12,
        pointsWeekly: 640,
        pointsMonthly: 2020,
        pointsAllTime: 4620,
        accuracy: 95.4,
        masteredWords: 138,
        trend: '+1',
        trendType: 'up',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&h=120&fit=crop'
      },
      {
        id: 'usr-dc-3',
        name: 'Nafis Iqbal',
        college: 'Dhaka College',
        batch: 'HSC 2026',
        streak: 9,
        pointsWeekly: 590,
        pointsMonthly: 1890,
        pointsAllTime: 4310,
        accuracy: 94.1,
        masteredWords: 125,
        trend: '-1',
        trendType: 'down',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop'
      },
      {
        id: 'usr-rc-4',
        name: 'Mehedi Hasan',
        college: 'Rajshahi College',
        batch: 'HSC 2026',
        streak: 8,
        pointsWeekly: 520,
        pointsMonthly: 1710,
        pointsAllTime: 3950,
        accuracy: 92.5,
        masteredWords: 110,
        trend: '0',
        trendType: 'neutral',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop'
      },
      {
        id: 'usr-cc-5',
        name: 'Anika Tabassum',
        college: 'Chittagong College',
        batch: 'HSC 2026',
        streak: 11,
        pointsWeekly: 490,
        pointsMonthly: 1650,
        pointsAllTime: 3820,
        accuracy: 91.8,
        masteredWords: 104,
        trend: '+3',
        trendType: 'up',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&h=120&fit=crop'
      },
      {
        id: 'usr-hc-6',
        name: 'Zubair Hossain',
        college: 'Holy Cross College, Dhaka',
        batch: 'HSC 2026',
        streak: 7,
        pointsWeekly: 440,
        pointsMonthly: 1510,
        pointsAllTime: 3540,
        accuracy: 89.6,
        masteredWords: 96,
        trend: '-2',
        trendType: 'down',
        avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=120&h=120&fit=crop'
      },
      {
        id: 'usr-ac-7',
        name: 'Farhana Akhter',
        college: 'Adamjee Cantonment College',
        batch: 'HSC 2026',
        streak: 6,
        pointsWeekly: 410,
        pointsMonthly: 1420,
        pointsAllTime: 3310,
        accuracy: 88.2,
        masteredWords: 88,
        trend: '+1',
        trendType: 'up',
        avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=120&h=120&fit=crop'
      },
      {
        id: 'usr-kc-8',
        name: 'Siam Mahmud',
        college: 'Govt. BL College, Khulna',
        batch: 'HSC 2026',
        streak: 5,
        pointsWeekly: 380,
        pointsMonthly: 1310,
        pointsAllTime: 3080,
        accuracy: 86.9,
        masteredWords: 82,
        trend: '0',
        trendType: 'neutral',
        avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&h=120&fit=crop'
      },
      {
        id: 'usr-sc-9',
        name: 'Rashedul Karim',
        college: 'Sylhet MC College',
        batch: 'HSC 2026',
        streak: 4,
        pointsWeekly: 350,
        pointsMonthly: 1200,
        pointsAllTime: 2890,
        accuracy: 85.0,
        masteredWords: 75,
        trend: '-1',
        trendType: 'down',
        avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=120&h=120&fit=crop'
      },
      {
        id: 'usr-bc-10',
        name: 'Mahira Islam',
        college: 'Barisal Govt. Women College',
        batch: 'HSC 2026',
        streak: 5,
        pointsWeekly: 320,
        pointsMonthly: 1140,
        pointsAllTime: 2650,
        accuracy: 84.2,
        masteredWords: 68,
        trend: '+2',
        trendType: 'up',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&h=120&fit=crop'
      }
    ];

    // Check if currentUser is already in list; if not, integrate user with current points
    const currentEmail = currentUser?.email?.toLowerCase();
    const currentName = currentUser?.name || 'Student';
    const exists = extendedList.some((s) => s.email?.toLowerCase() === currentEmail || s.name === currentName);

    if (!exists && currentUser) {
      extendedList.push({
        id: currentUser.id || 'usr-current',
        name: currentUser.name || 'Student User',
        email: currentUser.email,
        college: currentUser.college || 'Notre Dame College, Dhaka',
        batch: currentUser.batch || 'HSC 2026',
        streak: currentUser.streak || 5,
        pointsWeekly: Math.round((currentUser.points || 1450) * 0.4),
        pointsMonthly: currentUser.points || 1450,
        pointsAllTime: Math.round((currentUser.points || 1450) * 2.2),
        accuracy: 92.0,
        masteredWords: 85,
        trend: '+2',
        trendType: 'up',
        avatar: currentUser.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=120&h=120&fit=crop'
      });
    }

    return extendedList;
  }, [registeredUsers, currentUser]);

  // Rank students according to active timeframe
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

  // Unique list of colleges for filter chips
  const collegeList = useMemo(() => {
    const set = new Set();
    rankedStudents.forEach((s) => {
      if (s.college) set.add(s.college);
    });
    return Array.from(set);
  }, [rankedStudents]);

  // Filtered leaderboard based on search query & college
  const filteredStudents = useMemo(() => {
    return rankedStudents.filter((st) => {
      const matchSearch = searchQuery.trim() === '' ||
        st.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        st.college.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCollege = selectedCollegeFilter === 'all' || st.college === selectedCollegeFilter;

      return matchSearch && matchCollege;
    });
  }, [rankedStudents, searchQuery, selectedCollegeFilter]);

  // Top 3 Podium Students
  const top3 = useMemo(() => {
    return [
      rankedStudents[0] || null, // Rank 1 Gold (Center)
      rankedStudents[1] || null, // Rank 2 Silver (Left)
      rankedStudents[2] || null  // Rank 3 Bronze (Right)
    ];
  }, [rankedStudents]);

  // Find Current User Standing
  const currentUserStanding = useMemo(() => {
    const userEmail = currentUser?.email?.toLowerCase();
    const userName = currentUser?.name || 'Tanvir Ahmed';

    const index = rankedStudents.findIndex((s) => 
      (s.email && s.email.toLowerCase() === userEmail) || s.name === userName
    );

    if (index !== -1) {
      const userRank = rankedStudents[index];
      const prevRankUser = index > 0 ? rankedStudents[index - 1] : null;
      const pointsDiff = prevRankUser ? (prevRankUser.activePoints - userRank.activePoints + 10) : 0;

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
      rankNumber: 7,
      name: userName,
      college: currentUser?.college || 'Notre Dame College, Dhaka',
      activePoints: currentUser?.points || 1450,
      streak: currentUser?.streak || 5,
      prevRankUser: first,
      pointsDiff: 45
    };
  }, [rankedStudents, currentUser]);

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-24 font-sans">
      {/* 1. Header & Live Sync Status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121827] via-[#101522] to-[#0c0f17] border border-[#1e293b] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-60 h-60 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-1.5 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
              <Trophy size={14} className="text-amber-400" />
              <span>HSC 2026 National Leaderboard</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{isBn ? 'লাইভ সিঙ্ক' : 'Live Sync'}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? 'এইচএসসি ২০২৬ শিক্ষার্থী লিডারবোর্ড' : 'HSC 2026 Student Leaderboard'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {isBn
              ? 'সাপ্তাহিক ও মাসিক MCQ নির্ভুলতা এবং স্পেসড রিপিটিশন স্কোরের ভিত্তিতে জাতীয় র‍্যাঙ্কিং'
              : 'Official national rankings based on verified board MCQ mastery, streaks, and accuracy.'}
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

      {/* 2. Top 3 Podium Display */}
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
          {top3[1] && (
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
          )}

          {/* Rank 1 (Gold - Center) */}
          {top3[0] && (
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
          )}

          {/* Rank 3 (Bronze) */}
          {top3[2] && (
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
          )}
        </div>
      </div>

      {/* 3. Search & Filter Bar */}
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

      {/* 4. Ranked Students Table */}
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
              const isCurrentUser = student.name === (currentUser?.name || 'Tanvir Ahmed');

              return (
                <motion.div
                  key={student.id}
                  layout
                  className={`grid grid-cols-12 gap-2 px-5 py-4 items-center text-xs sm:text-sm transition-all ${
                    isCurrentUser
                      ? 'bg-emerald-950/20 border-l-4 border-l-emerald-400 text-white font-bold'
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

      {/* 5. User's Personal Rank Sticky Bottom Card */}
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
                  {isBn ? 'আপনার বর্তমান অবস্থান' : 'Your Standing'}
                </span>
              </div>
              <p className="text-xs text-slate-300">
                {currentUserStanding.college} • <strong className="text-emerald-400 font-bold">{currentUserStanding.activePoints} XP</strong>
              </p>
            </div>
          </div>

          {/* Distance to next rank & Action */}
          <div className="flex items-center justify-between sm:justify-end gap-4 w-full sm:w-auto border-t sm:border-t-0 pt-2 sm:pt-0 border-[#1e293b]">
            <div className="text-left sm:text-right">
              <span className="text-xs text-amber-300 font-semibold block">
                {isBn 
                  ? `পরবর্তী র‍্যাঙ্ক (#${currentUserStanding.rankNumber - 1}) টপকাতে আর মাত্র ${currentUserStanding.pointsDiff} XP বাকি!`
                  : `Only ${currentUserStanding.pointsDiff} XP needed to overtake Rank #${currentUserStanding.rankNumber - 1}!`}
              </span>
              <span className="text-[11px] text-slate-400">
                {isBn ? 'প্রতি সঠিক উত্তরে ১০ XP পাবেন' : '+10 XP per correct MCQ answer'}
              </span>
            </div>

            <button
              onClick={() => navigate('/exam')}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/50 active:scale-95 transition-all flex items-center gap-1.5 shrink-0"
            >
              <span>{isBn ? 'র‍্যাঙ্ক বুস্ট করুন' : 'Boost Rank'}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
