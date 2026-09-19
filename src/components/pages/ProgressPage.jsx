import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  TrendingUp,
  Activity,
  Award,
  Flame,
  Clock,
  CheckCircle2,
  AlertTriangle,
  BookOpen,
  Zap,
  Target,
  Sparkles,
  Share2,
  Download,
  Copy,
  ChevronRight,
  RotateCcw,
  Check,
  Shield,
  Layers,
  ArrowUpRight,
  Info,
  Calendar,
  X,
  Play
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';
import { hscVocabularyList } from '../../data/questions/hscQuestionsData';

export default function ProgressPage({
  lang = 'en',
  currentUser = null,
  weakWords = [],
  navigate = () => {},
  onStartExam = () => {}
}) {
  const isBn = lang === 'bn';

  // Fallback / Active User Data
  const student = useMemo(() => {
    let stored = {};
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('hsc_auth_user');
        if (raw) stored = JSON.parse(raw);
      }
    } catch (e) {}

    return {
      name: currentUser?.name || stored?.name || 'HSC Examinee',
      college: currentUser?.college || stored?.college || 'Notre Dame College, Dhaka',
      batch: currentUser?.batch || currentUser?.hscBatch || stored?.hscBatch || stored?.batch || 'HSC 2026',
      streak: Number(currentUser?.streak || stored?.streak || 0),
      points: Number(currentUser?.points || stored?.points || 0),
      email: currentUser?.email || stored?.email || '',
      accuracy: Number(currentUser?.accuracy || stored?.accuracy || 0)
    };
  }, [currentUser]);

  // Real Exam History State & Sync
  const [examHistory, setExamHistory] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('hsc_exam_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) return parsed;
        }
      }
    } catch (e) {}
    return [];
  });

  useEffect(() => {
    const handleSync = () => {
      try {
        const saved = localStorage.getItem('hsc_exam_history');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setExamHistory(parsed);
        }
      } catch (e) {}
    };
    window.addEventListener('storage', handleSync);
    window.addEventListener('hsc_user_stats_updated', handleSync);
    window.addEventListener('hsc_leaderboard_updated', handleSync);
    return () => {
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('hsc_user_stats_updated', handleSync);
      window.removeEventListener('hsc_leaderboard_updated', handleSync);
    };
  }, []);

  // Rank Tier Calculation based on real XP points
  const rankTierInfo = useMemo(() => {
    const xp = student.points || 0;
    if (xp >= 3000) {
      return {
        tier: 'HSC Champion',
        tierBn: 'এইচএসসি চ্যাম্পিয়ন',
        badgeColor: 'from-amber-400 via-yellow-300 to-amber-500 text-slate-950',
        borderColor: 'border-amber-400/60',
        glow: 'shadow-amber-500/30',
        currentXp: xp,
        nextTierXp: 5000,
        minXp: 3000,
        progressPct: Math.min(100, Math.round(((xp - 3000) / 2000) * 100)),
        icon: Award,
        subtitle: isBn ? 'সর্বোচ্চ দক্ষতা স্তর অর্জিত' : 'Peak Academic Mastery'
      };
    }
    if (xp >= 1500) {
      return {
        tier: 'Master',
        tierBn: 'মাস্টার স্কলার',
        badgeColor: 'from-emerald-400 to-teal-500 text-slate-950',
        borderColor: 'border-emerald-500/50',
        glow: 'shadow-emerald-500/30',
        currentXp: xp,
        nextTierXp: 3000,
        minXp: 1500,
        progressPct: Math.min(100, Math.round(((xp - 1500) / 1500) * 100)),
        icon: Shield,
        subtitle: isBn ? 'এইচএসসি চ্যাম্পিয়ন হতে আর কিছু XP বাকি' : `${3000 - xp} XP to HSC Champion`
      };
    }
    if (xp >= 500) {
      return {
        tier: 'Scholar',
        tierBn: 'অগ্রগামী স্কলার',
        badgeColor: 'from-cyan-400 to-blue-500 text-slate-950',
        borderColor: 'border-cyan-500/50',
        glow: 'shadow-cyan-500/30',
        currentXp: xp,
        nextTierXp: 1500,
        minXp: 500,
        progressPct: Math.min(100, Math.round(((xp - 500) / 1000) * 100)),
        icon: BookOpen,
        subtitle: isBn ? 'মাস্টার স্তরে পৌঁছাতে আর কিছু পয়েন্ট বাকি' : `${1500 - xp} XP to Master Tier`
      };
    }
    return {
      tier: 'Novice',
      tierBn: 'নবিস শিক্ষার্থী',
      badgeColor: 'from-slate-300 to-slate-400 text-slate-950',
      borderColor: 'border-slate-500/40',
      glow: 'shadow-slate-500/20',
      currentXp: xp,
      nextTierXp: 500,
      minXp: 0,
      progressPct: Math.min(100, Math.round((xp / 500) * 100)),
      icon: Zap,
      subtitle: isBn ? '৫০০ XP অর্জনে স্কলার ব্যাজ আনলক হবে' : `Earn ${Math.max(0, 500 - xp)} XP to unlock Scholar`
    };
  }, [student.points, isBn]);

  // Active Week Tab for 7-Day Chart
  const [activeWeekTab, setActiveWeekTab] = useState('current'); // 'current' | 'previous'
  const [hoveredBar, setHoveredBar] = useState(null);

  // 7-Day Real Study Hours & MCQs from Authentic Exam History
  const studyHoursData = useMemo(() => {
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const dayNamesBn = ['রবি', 'সোম', 'মঙ্গল', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'];
    const days = [];
    const offset = activeWeekTab === 'current' ? 0 : 7;

    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - (i + offset));
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;

      const dayExams = examHistory.filter((ex) => {
        const ts = Number(ex.timestamp) || (ex.isoDate ? new Date(ex.isoDate).getTime() : 0);
        return ts >= dayStart && ts < dayEnd;
      });

      let questions = 0;
      let mistakes = 0;
      let seconds = 0;

      dayExams.forEach((ex) => {
        questions += Number(ex.doneCount || ex.totalQuestions || 0);
        mistakes += Number(ex.mistakeCount || 0);
        seconds += Number(ex.timeSpentSeconds || 0);
      });

      if (questions > 0 && seconds === 0) {
        seconds = questions * 30;
      }

      const hours = Number((seconds / 3600).toFixed(1));
      const accuracy = questions > 0 ? Math.round(((questions - mistakes) / questions) * 100) : 0;

      days.push({
        day: dayNames[d.getDay()],
        dayBn: dayNamesBn[d.getDay()],
        hours,
        questions,
        accuracy,
        dateStr: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
      });
    }

    return days;
  }, [examHistory, activeWeekTab]);

  const totalWeeklyHours = useMemo(() => {
    return studyHoursData.reduce((acc, curr) => acc + curr.hours, 0).toFixed(1);
  }, [studyHoursData]);

  const totalWeeklyQuestions = useMemo(() => {
    return studyHoursData.reduce((acc, curr) => acc + curr.questions, 0);
  }, [studyHoursData]);

  // Overall Platform & Exam Metrics
  const overallStats = useMemo(() => {
    let totalQuestions = 0;
    let totalMistakes = 0;

    examHistory.forEach((ex) => {
      totalQuestions += Number(ex.doneCount || ex.totalQuestions || 0);
      totalMistakes += Number(ex.mistakeCount || 0);
    });

    const accuracy = totalQuestions > 0
      ? Math.max(0, Math.min(100, Math.round(((totalQuestions - totalMistakes) / totalQuestions) * 100)))
      : (student.accuracy > 0 ? student.accuracy : 0);

    return {
      totalQuestions,
      accuracy,
      examsCount: examHistory.length
    };
  }, [examHistory, student.accuracy]);

  // Real Weekly Study Time Comparison Trend
  const previousWeekHours = useMemo(() => {
    let seconds = 0;
    for (let i = 13; i >= 7; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate(), 0, 0, 0, 0).getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;

      const dayExams = examHistory.filter((ex) => {
        const ts = Number(ex.timestamp) || (ex.isoDate ? new Date(ex.isoDate).getTime() : 0);
        return ts >= dayStart && ts < dayEnd;
      });

      dayExams.forEach((ex) => {
        const q = Number(ex.doneCount || ex.totalQuestions || 0);
        const s = Number(ex.timeSpentSeconds || (q > 0 ? q * 30 : 0));
        seconds += s;
      });
    }
    return Number((seconds / 3600).toFixed(1));
  }, [examHistory]);

  const studyHoursTrendText = useMemo(() => {
    const cur = Number(totalWeeklyHours);
    const prev = Number(previousWeekHours);
    const diff = (cur - prev).toFixed(1);
    if (Number(diff) > 0) {
      return `+${diff}h ${isBn ? 'গত সপ্তাহের তুলনায়' : 'vs last week'}`;
    } else if (Number(diff) < 0) {
      return `${diff}h ${isBn ? 'গত সপ্তাহের তুলনায়' : 'vs last week'}`;
    } else if (cur > 0) {
      return isBn ? 'চলতি সপ্তাহে নিয়মিত পড়াশোনা' : 'Active study hours this week';
    }
    return isBn ? 'অনুশীলন শুরু করে সময় ট্র্যাক করুন' : 'Live Study Timer Active';
  }, [totalWeeklyHours, previousWeekHours, isBn]);

  // Real Personal Best Streak Calculation
  const personalBestStreak = useMemo(() => {
    let stored = 0;
    try {
      const b = localStorage.getItem('hsc_personal_best_streak');
      if (b) stored = Number(b) || 0;
    } catch (e) {}
    const current = Number(student.streak) || 0;
    const best = Math.max(current, stored);
    if (best > stored && typeof window !== 'undefined') {
      try {
        localStorage.setItem('hsc_personal_best_streak', String(best));
      } catch (e) {}
    }
    return best;
  }, [student.streak]);

  // Unit Mastery & Accuracy Calculations (All 12 Units - Authentic Exam-Driven)
  const [unitTierFilter, setUnitTierFilter] = useState('all'); // 'all' | 'mastered' | 'proficient' | 'needs_focus'

  const unitMetrics = useMemo(() => {
    return hscUnits.map((unit) => {
      const unitExams = examHistory.filter((ex) => 
        ex.unitId === unit.id || (ex.title && ex.title.toLowerCase().includes(unit.unitTitle.toLowerCase()))
      );

      let totalDone = 0;
      let totalMistakes = 0;

      unitExams.forEach((ex) => {
        totalDone += Number(ex.doneCount || ex.totalQuestions || 0);
        totalMistakes += Number(ex.mistakeCount || 0);
      });

      const hasAttempts = totalDone > 0;
      const accuracy = hasAttempts
        ? Math.max(0, Math.min(100, Math.round(((totalDone - totalMistakes) / totalDone) * 100)))
        : 0;

      const totalUnitWords = unit.totalWords || unit.wordsCount || 35;
      const wordsMastered = hasAttempts ? Math.min(totalUnitWords, Math.round((totalUnitWords * accuracy) / 100)) : 0;

      let tier = 'unattempted';
      let tierColor = '#64748b';
      let tierLabel = isBn ? 'পরীক্ষা বাকি (০%)' : 'Not Attempted (0%)';
      let badgeBg = 'bg-slate-800 text-slate-400 border-slate-700';

      if (hasAttempts) {
        if (accuracy >= 80) {
          tier = 'mastered';
          tierColor = '#10b981';
          tierLabel = isBn ? 'মাস্টারি অর্জিত (≥৮০%)' : 'Mastered (≥80%)';
          badgeBg = 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30';
        } else if (accuracy >= 50) {
          tier = 'proficient';
          tierColor = '#f59e0b';
          tierLabel = isBn ? 'চলমান অগ্রগতি (৫০-৭৯%)' : 'Proficient (50-79%)';
          badgeBg = 'bg-amber-500/15 text-amber-300 border-amber-500/30';
        } else {
          tier = 'needs_focus';
          tierColor = '#f43f5e';
          tierLabel = isBn ? 'মনোযোগ প্রয়োজন (<৫০%)' : 'Needs Focus (<50%)';
          badgeBg = 'bg-rose-500/15 text-rose-300 border-rose-500/30';
        }
      }

      return {
        ...unit,
        accuracy,
        totalUnitWords,
        wordsMastered,
        hasAttempts,
        attemptsCount: unitExams.length,
        tier,
        tierColor,
        tierLabel,
        badgeBg
      };
    });
  }, [examHistory, isBn]);

  const filteredUnitMetrics = useMemo(() => {
    if (unitTierFilter === 'all') return unitMetrics;
    return unitMetrics.filter((u) => u.tier === unitTierFilter);
  }, [unitMetrics, unitTierFilter]);

  // Current Month Dynamic Heatmap (No hardcoded month / No simulated fake activity)
  const currentMonthInfo = useMemo(() => {
    const d = new Date();
    const monthName = d.toLocaleString('en-US', { month: 'long' });
    const monthNameBn = d.toLocaleString('bn-BD', { month: 'long' });
    const year = d.getFullYear();
    const daysInMonth = new Date(year, d.getMonth() + 1, 0).getDate();
    return { monthName, monthNameBn, year, daysInMonth, monthIndex: d.getMonth() };
  }, []);

  const heatmapDays = useMemo(() => {
    const { year, monthIndex, daysInMonth, monthName } = currentMonthInfo;
    const days = [];

    for (let day = 1; day <= daysInMonth; day++) {
      const dayStart = new Date(year, monthIndex, day, 0, 0, 0, 0).getTime();
      const dayEnd = dayStart + 24 * 60 * 60 * 1000;

      const dayExams = examHistory.filter((ex) => {
        const ts = Number(ex.timestamp) || (ex.isoDate ? new Date(ex.isoDate).getTime() : 0);
        return ts >= dayStart && ts < dayEnd;
      });

      let questions = 0;
      let seconds = 0;

      dayExams.forEach((ex) => {
        questions += Number(ex.doneCount || ex.totalQuestions || 0);
        seconds += Number(ex.timeSpentSeconds || 0);
      });

      if (questions > 0 && seconds === 0) {
        seconds = questions * 30;
      }

      let level = 0;
      if (questions >= 40 || seconds >= 3600) level = 3;
      else if (questions >= 20 || seconds >= 1800) level = 2;
      else if (questions > 0 || seconds > 0) level = 1;

      days.push({
        day,
        dateStr: `${day} ${monthName} ${year}`,
        questions,
        hours: (seconds / 3600).toFixed(1),
        level
      });
    }
    return days;
  }, [examHistory, currentMonthInfo]);

  const [hoveredHeatmapDay, setHoveredHeatmapDay] = useState(null);

  // Authentic Weak Words Recovery Pipeline (ZERO hardcoded fake words)
  // Rule 5: 3 Mistakes -> Auto Weak Word | 5 Correct Answers -> Auto Mastered
  const recoveryPipeline = useMemo(() => {
    if (!Array.isArray(weakWords) || weakWords.length === 0) {
      return [];
    }

    return weakWords.map((ww) => {
      const mistakes = Number(ww.mistakesCount || 3);
      const correctStreak = Number(ww.correctStreak || 0);
      const isMastered = correctStreak >= 5;

      return {
        id: ww.id || `ww-${ww.word}`,
        word: ww.word,
        meaningBn: ww.bengaliMeaning || ww.bengali || 'পাঠ্যবইয়ের শব্দ',
        mistakes,
        correctStreak: Math.min(5, correctStreak),
        targetStreak: 5,
        status: isMastered ? 'mastered' : 'recovering',
        unit: ww.unit || (ww.source ? `Unit ${ww.source}` : 'NCTB Syllabus')
      };
    });
  }, [weakWords]);

  const activeWeakWordsCount = useMemo(() => {
    return recoveryPipeline.filter((w) => w.status === 'recovering').length;
  }, [recoveryPipeline]);

  const masteredWeakWordsCount = useMemo(() => {
    return recoveryPipeline.filter((w) => w.status === 'mastered').length;
  }, [recoveryPipeline]);

  // Export / Share Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copiedToast, setCopiedToast] = useState(false);

  const shareSummaryText = useMemo(() => {
    return `🎓 NCTB ${student.batch || 'HSC'} English Learner Progress Report
Student: ${student.name}${student.college ? ` (${student.college})` : ''}
🏆 Total XP: ${student.points} XP (Tier: ${rankTierInfo.tier})
🔥 Active Streak: ${student.streak} Days (Personal Best: ${personalBestStreak} Days)
📊 Weekly Study Hours: ${totalWeeklyHours} hrs (${overallStats.totalQuestions} MCQs Solved)
🎯 Overall Accuracy: ${overallStats.accuracy}%
📚 Weak Words in Recovery: ${activeWeakWordsCount} (${masteredWeakWordsCount} Mastered)
🌟 Prepared via HSC English Learner Hub`;
  }, [student, rankTierInfo, totalWeeklyHours, overallStats, personalBestStreak, activeWeakWordsCount, masteredWeakWordsCount]);

  const handleCopySummary = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(shareSummaryText);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-12 font-sans">
      {/* 1. Header Overview & XP Rank Progression Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121827] via-[#101522] to-[#0c0f17] border border-[#1e293b] p-6 sm:p-8 shadow-2xl">
        {/* Shimmer & Glow Accent */}
        <div className="absolute top-0 right-0 -mt-8 -mr-8 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-8 -ml-8 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-extrabold bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                <Sparkles size={13} className="text-emerald-400" />
                <span>{isBn ? 'এনসিটিবি এইচএসসি বুক অ্যানালিটিক্স' : 'NCTB HSC Book Analytics'}</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-slate-800/80 text-slate-300 border border-slate-700">
                {student.batch}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {isBn ? `${student.name}-এর সার্বিক অগ্রগতি` : `${student.name}'s Progress & Analytics`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 flex items-center gap-2">
              <span>{student.college}</span>
              <span>•</span>
              <span className="text-emerald-400 font-semibold">{isBn ? 'লাইভ ক্লাউড সিঙ্ক' : 'Live Cloud Sync'}</span>
            </p>
          </div>

          {/* Right Action: Share & Rank Tier Badge */}
          <div className="flex flex-wrap items-center gap-3.5 w-full lg:w-auto">
            {/* Rank Tier Card */}
            <div className={`p-3.5 sm:p-4 rounded-2xl bg-[#141b2c] border ${rankTierInfo.borderColor} flex items-center gap-3.5 shadow-lg ${rankTierInfo.glow}`}>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${rankTierInfo.badgeColor} flex items-center justify-center font-black shadow-md shrink-0`}>
                <rankTierInfo.icon size={24} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider">
                    {isBn ? 'র‍্যাঙ্ক টায়ার' : 'Rank Tier'}
                  </span>
                </div>
                <span className="text-base sm:text-lg font-black text-white block leading-tight">
                  {isBn ? rankTierInfo.tierBn : rankTierInfo.tier}
                </span>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {student.points} XP • {rankTierInfo.subtitle}
                </span>
              </div>
            </div>

            <button
              onClick={() => setIsShareModalOpen(true)}
              className="px-4 py-3 rounded-2xl bg-[#182133] hover:bg-[#212d45] border border-[#2b3a56] text-slate-200 hover:text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2"
            >
              <Share2 size={16} className="text-emerald-400" />
              <span>{isBn ? 'অগ্রগতি শেয়ার' : 'Share Summary'}</span>
            </button>
          </div>
        </div>

        {/* Tier Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-1.5">
              <Target size={14} className="text-amber-400" />
              <span>{isBn ? 'পরবর্তী টায়ার অগ্রগতি:' : 'Tier Level Progress:'}</span>
              <strong className="text-white">{rankTierInfo.progressPct}%</strong>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {student.points} / {rankTierInfo.nextTierXp} XP
            </span>
          </div>
          <div className="w-full h-2.5 rounded-full bg-slate-800/80 overflow-hidden p-0.5 border border-slate-700/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${rankTierInfo.progressPct}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* 2. Top 4 KPI Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Study Hours */}
        <div className="p-5 rounded-2xl bg-[#111723] border border-[#1e293b] hover:border-emerald-500/40 transition-all shadow-card space-y-2 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">
              {isBn ? 'মোট পড়ার সময়' : 'Weekly Study Time'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
              <Clock size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">{totalWeeklyHours}</span>
            <span className="text-xs font-bold text-slate-400">{isBn ? 'ঘণ্টা' : 'Hours'}</span>
          </div>
          <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
            <TrendingUp size={12} />
            <span>{studyHoursTrendText}</span>
          </span>
        </div>

        {/* KPI 2: Overall Accuracy */}
        <div className="p-5 rounded-2xl bg-[#111723] border border-[#1e293b] hover:border-teal-500/40 transition-all shadow-card space-y-2 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">
              {isBn ? 'গড় নির্ভুলতা' : 'MCQ Accuracy'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center border border-teal-500/30">
              <CheckCircle2 size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-teal-400 tracking-tight">{overallStats.accuracy}%</span>
            <span className="text-xs font-bold text-slate-400">{overallStats.totalQuestions} {isBn ? 'প্রশ্নে' : 'MCQs'}</span>
          </div>
          <span className="text-[11px] text-slate-400 font-medium">
            {isBn 
              ? `${overallStats.examsCount}টি পরীক্ষা সম্পন্ন • বোর্ড মানদণ্ড` 
              : `${overallStats.examsCount} Exams Completed • Board Benchmark`}
          </span>
        </div>

        {/* KPI 3: Weak Words Recovery */}
        <div className="p-5 rounded-2xl bg-[#111723] border border-[#1e293b] hover:border-rose-500/40 transition-all shadow-card space-y-2 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">
              {isBn ? 'দুর্বল শব্দ রিকভারি' : 'Weak Word Queue'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center border border-rose-500/30">
              <AlertTriangle size={16} />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-rose-400 tracking-tight">{activeWeakWordsCount}</span>
            <span className="text-xs font-bold text-slate-400">/ {masteredWeakWordsCount} {isBn ? 'আদায়' : 'Recovered'}</span>
          </div>
          <span className="text-[11px] text-amber-400 font-medium">
            {isBn ? '৩ ভুল নিয়ম • ৫ সঠিক উত্তর' : '3 Mistake Rule • 5 Correct'}
          </span>
        </div>

        {/* KPI 4: Active Streak */}
        <div className="p-5 rounded-2xl bg-[#111723] border border-[#1e293b] hover:border-amber-500/40 transition-all shadow-card space-y-2 group">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">
              {isBn ? 'অবিচ্ছিন্ন স্ট্রিক' : 'Daily Streak'}
            </span>
            <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center border border-amber-500/30">
              <Flame size={16} className="animate-flame" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 tracking-tight">{student.streak}</span>
            <span className="text-xs font-bold text-slate-400">{isBn ? 'দিন সক্রিয়' : 'Days Active'}</span>
          </div>
          <span className="text-[11px] text-amber-300 font-medium">
            {isBn ? `ব্যক্তিগত সেরা: ${personalBestStreak} দিন` : `Personal Best: ${personalBestStreak} ${personalBestStreak === 1 ? 'Day' : 'Days'}`}
          </span>
        </div>
      </div>

      {/* 3. 7-Day Study Hours Bar Chart Section */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#111723] border border-[#1e293b] shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <Activity size={20} className="text-emerald-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {isBn ? '৭ দিনের পড়ার সময় ও MCQ সমাধান চার্ট' : '7-Day Study Hours & MCQ Activity Chart'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn ? 'প্রতিদিনের ব্যয়িত সময় ও নির্ভুলতার ভিজুয়াল গ্রাফ' : 'Daily hours invested, questions solved, and accuracy rating'}
            </p>
          </div>

          {/* Week Toggle */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#0c0f17] border border-[#1e293b]">
            <button
              onClick={() => setActiveWeekTab('current')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeWeekTab === 'current'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isBn ? 'চলতি সপ্তাহ' : 'This Week'}
            </button>
            <button
              onClick={() => setActiveWeekTab('previous')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeWeekTab === 'previous'
                  ? 'bg-emerald-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {isBn ? 'গত সপ্তাহ' : 'Last Week'}
            </button>
          </div>
        </div>

        {/* Bar Chart Area */}
        <div className="relative pt-6 pb-2">
          {/* Target Reference Line */}
          <div className="absolute top-12 left-0 right-0 border-b border-dashed border-emerald-500/30 flex items-center justify-end">
            <span className="text-[10px] font-bold text-emerald-400 bg-[#111723] px-2 -mt-2">
              {isBn ? 'দৈনিক লক্ষ্য: ২.০ ঘণ্টা' : 'Daily Goal: 2.0 hrs'}
            </span>
          </div>

          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-56 pt-8">
            {(() => {
              const peakHour = Math.max(2.0, ...studyHoursData.map((d) => d.hours));
              return studyHoursData.map((item, index) => {
                const heightPct = item.hours > 0 ? Math.min(100, Math.max(8, Math.round((item.hours / peakHour) * 100))) : 0;
                const isHovered = hoveredBar === index;

                return (
                  <div
                    key={item.day}
                    className="flex flex-col items-center gap-2 h-full justify-end group cursor-pointer relative"
                    onMouseEnter={() => setHoveredBar(index)}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {/* Tooltip on Hover */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10, scale: 0.95 }}
                          animate={{ opacity: 1, y: -8, scale: 1 }}
                          exit={{ opacity: 0, y: 10, scale: 0.95 }}
                          className="absolute -top-20 z-30 px-3 py-2 rounded-xl bg-[#0c0f17] border border-emerald-500/40 text-center shadow-xl min-w-[120px] pointer-events-none"
                        >
                          <span className="text-[11px] font-bold text-white block">
                            {isBn ? item.dayBn : item.day}: {item.hours} {isBn ? 'ঘণ্টা' : 'hrs'}
                          </span>
                          <span className="text-[10px] text-emerald-400 block font-semibold">
                            {item.questions} MCQs • {item.accuracy}% Accuracy
                          </span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Animated Bar */}
                    <div className="w-full max-w-[48px] bg-[#0c0f17] rounded-xl overflow-hidden h-full flex items-end p-1 border border-[#1e293b] group-hover:border-emerald-500/50 transition-colors">
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: `${heightPct}%` }}
                        transition={{ duration: 0.6, delay: index * 0.08, ease: 'easeOut' }}
                        className={`w-full rounded-lg transition-all ${
                          item.hours >= 2.0
                            ? 'bg-gradient-to-t from-emerald-600 via-teal-500 to-emerald-400 shadow-md shadow-emerald-950/50'
                            : item.hours > 0
                            ? 'bg-gradient-to-t from-slate-600 to-emerald-500/70'
                            : 'bg-transparent'
                        }`}
                      />
                    </div>

                    {/* Day Label */}
                    <div className="text-center">
                      <span className="text-xs font-bold text-slate-300 block">
                        {isBn ? item.dayBn : item.day}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        {item.hours}h
                      </span>
                    </div>
                  </div>
                );
              });
            })()}
          </div>
        </div>
      </div>

      {/* 4. Per-Unit MCQ Accuracy Progress Rings & Donut Meters (All 12 Units) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#111723] border border-[#1e293b] shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <BookOpen size={20} className="text-amber-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {isBn ? '১২টি NCTB ইউনিটের নির্ভুলতা ও প্রগ্রেস রিং' : '12 NCTB Units MCQ Accuracy & Progress Rings'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn ? 'কালার কোড: সবুজ (≥৮০% মাস্টারি), হলুদ (৫০-৭৯%), লাল (<৫০%)' : 'Tier Tiers: Green (≥80% Mastery), Amber (50-79%), Rose (<50%)'}
            </p>
          </div>

          {/* Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { key: 'all', label: isBn ? 'সকল ইউনিট' : 'All Units' },
              { key: 'mastered', label: isBn ? 'মাস্টারি (≥৮০%)' : 'Mastered (≥80%)' },
              { key: 'proficient', label: isBn ? 'অগ্রগামী (৫০-৭৯%)' : '50-79%' },
              { key: 'needs_focus', label: isBn ? 'মনোযোগ (<৫০%)' : '<50%' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setUnitTierFilter(tab.key)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  unitTierFilter === tab.key
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-sm'
                    : 'bg-[#0c0f17] text-slate-400 border border-[#1e293b] hover:text-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 12 Units Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredUnitMetrics.length === 0 ? (
            <div className="col-span-full py-12 text-center rounded-2xl bg-[#0c0f17] border border-[#1e293b] space-y-2">
              <p className="text-slate-400 text-sm font-semibold">
                {isBn ? 'এই ফিল্টারে এখনো কোনো ইউনিট নেই' : 'No units in this filter category yet'}
              </p>
              <p className="text-xs text-slate-500">
                {isBn ? 'মাস্টারি অর্জন করতে ইউনিটভিত্তিক পরীক্ষা দিন' : 'Take unit exams to track your accuracy and unlock mastery tiers'}
              </p>
            </div>
          ) : (
            filteredUnitMetrics.map((unit) => {
              const radius = 34;
              const circumference = 2 * Math.PI * radius;
              const strokeDashoffset = unit.hasAttempts
                ? circumference - (unit.accuracy / 100) * circumference
                : circumference;

              return (
                <div
                  key={unit.id}
                  className="p-5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 group"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <span className="text-[10px] font-black uppercase tracking-wider text-slate-500">
                        {unit.unitNumber}
                      </span>
                      <h3 className="font-bold text-white text-sm group-hover:text-emerald-400 transition-colors leading-snug">
                        {unit.unitTitle}
                      </h3>
                      <p className="text-xs text-slate-400">{unit.unitTitleBn}</p>
                    </div>

                    {/* Donut Progress Ring SVG */}
                    <div className="relative w-18 h-18 shrink-0 flex items-center justify-center">
                      <svg className="w-18 h-18 transform -rotate-90" viewBox="0 0 80 80">
                        <circle
                          cx="40"
                          cy="40"
                          r={radius}
                          stroke="#1e293b"
                          strokeWidth="6"
                          fill="transparent"
                        />
                        <motion.circle
                          cx="40"
                          cy="40"
                          r={radius}
                          stroke={unit.hasAttempts ? unit.tierColor : '#334155'}
                          strokeWidth="6"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          animate={{ strokeDashoffset }}
                          transition={{ duration: 1, ease: 'easeOut' }}
                          strokeLinecap="round"
                          fill="transparent"
                        />
                      </svg>
                      <span className="absolute text-xs font-black text-white">
                        {unit.hasAttempts ? `${unit.accuracy}%` : '0%'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-[#1a2130] flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${unit.badgeBg}`}>
                      {unit.hasAttempts
                        ? `${unit.wordsMastered}/${unit.totalUnitWords} ${isBn ? 'শব্দ আত্মস্থ' : 'Words'}`
                        : (isBn ? 'পরীক্ষা বাকি' : 'Not Attempted')}
                    </span>

                    <button
                      onClick={() => {
                        onStartExam(unit);
                        navigate('/exam');
                      }}
                      className="text-xs font-bold text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors"
                    >
                      <span>{isBn ? 'পরীক্ষা দিন' : 'Take Exam'}</span>
                      <ChevronRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 5. Streak Calendar Heatmap (Monthly Activity Matrix) */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#111723] border border-[#1e293b] shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <Calendar size={20} className="text-orange-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {isBn 
                  ? `মাসিক পড়াশোনা ও অনুশীলনের হিটম্যাপ (${currentMonthInfo.monthNameBn || currentMonthInfo.monthName} ${currentMonthInfo.year})` 
                  : `Monthly Study Activity Heatmap (${currentMonthInfo.monthName} ${currentMonthInfo.year})`}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn ? 'প্রতিদিনের অ্যাক্টিভিটি ইনটেনসিটি এবং অনুশীলনের ঘনত্ব' : 'Daily active study consistency and question solve density'}
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span>{isBn ? 'কম' : 'Less'}</span>
            <div className="flex items-center gap-1">
              <span className="w-3 h-3 rounded-sm bg-[#131824] border border-[#1e293b]" />
              <span className="w-3 h-3 rounded-sm bg-[#064e3b]" />
              <span className="w-3 h-3 rounded-sm bg-[#059669]" />
              <span className="w-3 h-3 rounded-sm bg-[#10b981]" />
              <span className="w-3 h-3 rounded-sm bg-[#34d399]" />
            </div>
            <span>{isBn ? 'বেশি' : 'More'}</span>
          </div>
        </div>

        {/* Heatmap Grid */}
        <div className="grid grid-cols-7 sm:grid-cols-10 md:grid-cols-11 gap-2.5 pt-2">
          {heatmapDays.map((item) => {
            const isHovered = hoveredHeatmapDay === item.day;
            let bgClass = 'bg-[#131824] border-[#1e293b] text-slate-500';
            if (item.level === 3) bgClass = 'bg-[#10b981] border-emerald-400 text-slate-950 font-black shadow-md shadow-emerald-950/60';
            else if (item.level === 2) bgClass = 'bg-[#059669] border-emerald-600 text-white font-bold';
            else if (item.level === 1) bgClass = 'bg-[#064e3b] border-emerald-800 text-emerald-200';

            return (
              <div
                key={item.day}
                onMouseEnter={() => setHoveredHeatmapDay(item.day)}
                onMouseLeave={() => setHoveredHeatmapDay(null)}
                className={`h-12 rounded-xl border flex flex-col items-center justify-center p-1 relative transition-all cursor-pointer hover:scale-105 ${bgClass}`}
              >
                <span className="text-xs">{item.day}</span>
                {item.questions > 0 && (
                  <span className="text-[9px] opacity-90 leading-none">
                    {item.questions}q
                  </span>
                )}

                {/* Tooltip */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9, y: 10 }}
                      animate={{ opacity: 1, scale: 1, y: -6 }}
                      exit={{ opacity: 0, scale: 0.9, y: 10 }}
                      className="absolute -top-16 z-30 px-3 py-1.5 rounded-xl bg-[#0c0f17] border border-emerald-500/40 text-white text-[11px] font-bold shadow-2xl min-w-[130px] pointer-events-none text-center"
                    >
                      <span>{item.dateStr}</span>
                      <span className="block text-emerald-400 text-[10px]">
                        {item.questions} MCQs • {item.hours}h studied
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>

      {/* 6. Weak Word Recovery Timeline & Pipeline */}
      <div className="p-6 sm:p-7 rounded-3xl bg-[#111723] border border-[#1e293b] shadow-card space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1e293b]">
          <div>
            <div className="flex items-center gap-2">
              <RotateCcw size={20} className="text-rose-400" />
              <h2 className="text-lg sm:text-xl font-bold text-white">
                {isBn ? 'দুর্বল শব্দ রিকভারি পাইপলাইন (Spaced Repetition Recovery)' : 'Weak Word Recovery Pipeline (3 Mistake Rule)'}
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn ? '৩ বার ভুলের পর অটো-অ্যাড ➔ ৫ বার সঠিক উত্তরের পর অটো-মাস্টারি সম্পন্ন' : 'Auto-added after 3 mistakes in MCQ ➔ Auto-mastered after 5 correct answers'}
            </p>
          </div>

          <button
            onClick={() => navigate('/weak-words')}
            className="px-4 py-2 rounded-xl bg-rose-500/15 hover:bg-rose-500/25 border border-rose-500/30 text-rose-300 text-xs font-bold transition-all self-start sm:self-auto"
          >
            {isBn ? 'দুর্বল শব্দ রিভিশন হাব' : 'Open Weak Words Hub'}
          </button>
        </div>

        {/* Pipeline Cards */}
        <div className="space-y-3">
          {recoveryPipeline.length === 0 ? (
            <div className="p-8 rounded-2xl bg-[#0c0f17] border border-emerald-500/20 text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 mx-auto flex items-center justify-center">
                <CheckCircle2 size={24} />
              </div>
              <div className="space-y-1">
                <h4 className="text-white font-bold text-base">
                  {isBn ? 'কোনো দুর্বল শব্দ নেই!' : 'No Weak Words in Queue!'}
                </h4>
                <p className="text-xs text-slate-400 max-w-md mx-auto leading-relaxed">
                  {isBn
                    ? 'চমৎকার! আপনি কোনো শব্দে ৩ বার ভুল করেননি। পরীক্ষায় কোনো শব্দ ৩ বার ভুল হলে তা স্বয়ংক্রিয়ভাবে এখানে যুক্ত হবে।'
                    : 'Great job! You have not made 3 mistakes on any vocabulary. If you miss a word 3 times in exams, it will automatically appear here for spaced repetition recovery.'}
                </p>
              </div>
              <button
                onClick={() => navigate('/exam')}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md active:scale-95"
              >
                <Zap size={14} />
                <span>{isBn ? 'নতুন পরীক্ষা শুরু করুন' : 'Start an Exam'}</span>
              </button>
            </div>
          ) : (
            recoveryPipeline.map((item) => {
              const isMastered = item.status === 'mastered';
              const progressPct = Math.min(100, Math.round((item.correctStreak / item.targetStreak) * 100));

              return (
                <div
                  key={item.id}
                  className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    isMastered
                      ? 'bg-emerald-950/20 border-emerald-500/30 text-slate-200'
                      : 'bg-[#0c0f17] border-[#1e293b] text-slate-300'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2.5">
                      <h4 className="font-extrabold text-white text-base">{item.word}</h4>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-800 text-slate-400">
                        {item.unit}
                      </span>
                      {isMastered ? (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                          <Check size={11} />
                          <span>{isBn ? 'মাস্টারি সম্পন্ন' : 'Mastered'}</span>
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40">
                          {isBn ? 'রিকভারি চলমান' : 'In Recovery'}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-400">{item.meaningBn}</p>
                  </div>

                  {/* 5-Step Visual Ladder */}
                  <div className="flex items-center gap-4">
                    <div className="space-y-1.5 min-w-[140px]">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">{isBn ? 'সঠিক ধারাবাহিকতা:' : 'Recovery Streak:'}</span>
                        <span className="font-bold text-emerald-400">{item.correctStreak} / {item.targetStreak}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        {[1, 2, 3, 4, 5].map((step) => (
                          <div
                            key={step}
                            className={`h-2 flex-1 rounded-full transition-all ${
                              step <= item.correctStreak
                                ? isMastered ? 'bg-emerald-400' : 'bg-amber-400'
                                : 'bg-slate-800'
                            }`}
                          />
                        ))}
                      </div>
                    </div>

                    {!isMastered && (
                      <button
                        onClick={() => navigate('/practice')}
                        className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-sm transition-all active:scale-95 shrink-0"
                      >
                        {isBn ? 'অনুশীলন' : 'Test Word'}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* 7. Export / Share Modal */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#101522] border border-[#222e44] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 text-slate-100 relative"
            >
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
              >
                <X size={18} />
              </button>

              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-md">
                  <Share2 size={22} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {isBn ? 'আপনার অগ্রগতি রিপোর্ট শেয়ার করুন' : 'Share Progress Summary Report'}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {isBn ? 'সোশ্যাল মিডিয়া বা সহপাঠীদের সাথে আপনার প্রস্তুতি শেয়ার করুন' : 'Copy and share your HSC preparation stats with friends or teachers'}
                  </p>
                </div>
              </div>

              {/* Formatted Text Box */}
              <div className="p-4 rounded-2xl bg-[#0a0d14] border border-[#1b2333] font-mono text-xs text-slate-300 leading-relaxed whitespace-pre-line space-y-2">
                {shareSummaryText}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => setIsShareModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </button>

                <button
                  onClick={handleCopySummary}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all active:scale-95"
                >
                  {copiedToast ? <Check size={16} className="text-white" /> : <Copy size={16} />}
                  <span>{copiedToast ? (isBn ? 'কপি সম্পন্ন!' : 'Copied!') : (isBn ? 'ক্লিপবোর্ডে কপি করুন' : 'Copy Summary')}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
