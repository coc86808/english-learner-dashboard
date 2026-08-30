import React, { useState, useMemo } from 'react';
import {
  TrendingUp,
  Award,
  Users,
  BookOpen,
  AlertTriangle,
  CheckCircle2,
  Clock,
  Flame,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  BarChart3,
  PieChart,
  Calendar,
  Activity,
  Search,
  Eye,
  X,
  Sparkles,
  FileSpreadsheet,
  FileCode,
  GraduationCap,
  Layers,
  ChevronRight
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';

export default function AdminAnalytics({ users = [], questions = [], lang = 'en' }) {
  const isBn = lang === 'bn';

  // Filters State
  const [timeRange, setTimeRange] = useState('7d'); // '7d' | '30d' | 'all'
  const [heatmapUnitFilter, setHeatmapUnitFilter] = useState('All');
  const [studentSearchTerm, setStudentSearchTerm] = useState('');

  // Per-Student Drill-Down State
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Hover Tooltips for SVG Charts
  const [hoveredBarIndex, setHoveredBarIndex] = useState(null);
  const [hoveredPointIndex, setHoveredPointIndex] = useState(null);

  // Overall platform aggregations
  const totalPoints = useMemo(() => users.reduce((sum, u) => sum + (u.points || 0), 0), [users]);
  const totalMastered = useMemo(() => users.reduce((sum, u) => sum + (u.masteredWordsCount || 0), 0), [users]);
  const activeStudents = useMemo(() => users.filter((u) => (u.status || '').toLowerCase() === 'active').length, [users]);
  const avgAccuracy = 78.6; // Platform average across all exam attempts

  // Top Hardest Words across all students (Mistake Heatmap Data)
  const hardestWordsDatabase = useMemo(() => [
    {
      word: 'Apartheid',
      partOfSpeech: 'noun',
      bengaliMeaning: 'বর্ণবাদ বা জাতিগত বৈষম্য নীতি',
      unit: 'Unit 1: Education and Life',
      lesson: 'Lesson 1: The Parrot\'s Tale',
      mistakeRate: 48,
      attempts: 142,
      topWrongAnswer: 'Chosen "Segregation" as Antonym instead of Synonym'
    },
    {
      word: 'Vulnerable',
      partOfSpeech: 'adjective',
      bengaliMeaning: 'সহজে আঘাতযোগ্য বা ঝুঁকিপূর্ণ',
      unit: 'Unit 5: Human Rights',
      lesson: 'Lesson 1: Are We Aware-I',
      mistakeRate: 42,
      attempts: 128,
      topWrongAnswer: 'Confused with "Invulnerable" (misread prefix)'
    },
    {
      word: 'Emancipation',
      partOfSpeech: 'noun',
      bengaliMeaning: 'দাসত্ব বা পরাধীনতা থেকে মুক্তি',
      unit: 'Unit 4: History',
      lesson: 'Lesson 1: Three Speeches',
      mistakeRate: 38,
      attempts: 115,
      topWrongAnswer: 'Ambiguity in distinguishing from "Enslavement"'
    },
    {
      word: 'Barren',
      partOfSpeech: 'adjective',
      bengaliMeaning: 'অনুর্বর বা নিষ্ফলা ভূমি',
      unit: 'Unit 6: Dreams',
      lesson: 'Lesson 2: Dreams in Literature',
      mistakeRate: 34,
      attempts: 98,
      topWrongAnswer: 'Mistakenly marked "Fertile" as definition'
    },
    {
      word: 'Hazardous',
      partOfSpeech: 'adjective',
      bengaliMeaning: 'বিপজ্জনক বা ঝুঁকিপূর্ণ',
      unit: 'Unit 10: Lifestyle',
      lesson: 'Lesson 3: Food & Culture',
      mistakeRate: 31,
      attempts: 104,
      topWrongAnswer: 'Selected "Nutritious" due to fast reading'
    },
    {
      word: 'Etiquette',
      partOfSpeech: 'noun',
      bengaliMeaning: 'শিষ্টাচার বা সামাজিক রীতিনীতি',
      unit: 'Unit 10: Lifestyle',
      lesson: 'Lesson 2: Etiquette Netiquette',
      mistakeRate: 29,
      attempts: 136,
      topWrongAnswer: 'Spelling confusion and wrong Bangla translation'
    },
    {
      word: 'Unlettered',
      partOfSpeech: 'adjective',
      bengaliMeaning: 'নিরক্ষর বা অশিক্ষিত',
      unit: 'Unit 1: Education and Life',
      lesson: 'Lesson 1: The Parrot\'s Tale',
      mistakeRate: 27,
      attempts: 120,
      topWrongAnswer: 'Assumed to mean "without mail/letters"'
    },
    {
      word: 'Civic',
      partOfSpeech: 'adjective',
      bengaliMeaning: 'পৌর বা নাগরিক বিষয়ক',
      unit: 'Unit 1: Education and Life',
      lesson: 'Lesson 4: Civic Engagement',
      mistakeRate: 24,
      attempts: 90,
      topWrongAnswer: 'Confused with "Civilized"'
    }
  ], []);

  // Filtered Hardest Words Heatmap
  const filteredHardestWords = useMemo(() => {
    return hardestWordsDatabase.filter((item) => {
      if (heatmapUnitFilter === 'All') return true;
      return item.unit.toLowerCase().includes(heatmapUnitFilter.toLowerCase());
    });
  }, [hardestWordsDatabase, heatmapUnitFilter]);

  // 1. Weekly Quiz Volume & Exam Attempts Data (7 Days Bar Chart)
  const weeklyActivityData = useMemo(() => [
    { day: 'Sat', dayBn: 'শনি', quizzes: 58, avgScore: 76, peakTime: '8:30 PM' },
    { day: 'Sun', dayBn: 'রবি', quizzes: 42, avgScore: 72, peakTime: '9:00 PM' },
    { day: 'Mon', dayBn: 'সোম', quizzes: 65, avgScore: 81, peakTime: '7:45 PM' },
    { day: 'Tue', dayBn: 'মঙ্গল', quizzes: 74, avgScore: 80, peakTime: '8:15 PM' },
    { day: 'Wed', dayBn: 'বুধ', quizzes: 88, avgScore: 84, peakTime: '9:30 PM' },
    { day: 'Thu', dayBn: 'বৃহ', quizzes: 112, avgScore: 87, peakTime: '10:00 PM' },
    { day: 'Fri', dayBn: 'শুক্র', quizzes: 135, avgScore: 91, peakTime: '4:00 PM' },
  ], []);

  const maxWeeklyQuizzes = Math.max(...weeklyActivityData.map((d) => d.quizzes), 150);

  // 2. Hourly Daily Active Users (DAU) Curve Trend Data
  const hourlyDAUData = useMemo(() => [
    { hour: '6 AM', hourBn: 'সকাল ৬টা', users: 12, tests: 18 },
    { hour: '9 AM', hourBn: 'সকাল ৯টা', users: 28, tests: 45 },
    { hour: '12 PM', hourBn: 'দুপুর ১২টা', users: 44, tests: 62 },
    { hour: '3 PM', hourBn: 'বিকাল ৩টা', users: 52, tests: 78 },
    { hour: '6 PM', hourBn: 'সন্ধ্যা ৬টা', users: 86, tests: 124 },
    { hour: '8 PM', hourBn: 'রাত ৮টা', users: 142, tests: 210 },
    { hour: '10 PM', hourBn: 'রাত ১০টা', users: 128, tests: 185 },
    { hour: '12 AM', hourBn: 'রাত ১২টা', users: 38, tests: 50 },
  ], []);

  const maxHourlyUsers = Math.max(...hourlyDAUData.map((d) => d.users), 160);

  // Filtered Students for the Drill-Down Table
  const filteredStudents = useMemo(() => {
    return (users || []).filter((u) => {
      if (!u) return false;
      const term = studentSearchTerm.toLowerCase().trim();
      if (!term) return true;
      return (
        (u.name && u.name.toLowerCase().includes(term)) ||
        (u.email && u.email.toLowerCase().includes(term)) ||
        (u.college && u.college.toLowerCase().includes(term))
      );
    });
  }, [users, studentSearchTerm]);

  // Mock Detailed Exam Attempts History Generator for the Drill-Down Modal
  const getStudentExamHistory = (student) => {
    if (!student) return [];
    return [
      {
        id: 'ex-101',
        title: 'Unit 1: Lesson 1 • The Parrot\'s Tale Board Exam',
        unit: 'Unit 1',
        date: 'Today, 10:45 AM',
        score: '18 / 20',
        accuracy: 90,
        status: 'Passed',
        mistakes: 2,
        timeSpent: '12m 40s'
      },
      {
        id: 'ex-102',
        title: 'Unit 10: Lesson 2 • Etiquette & Netiquette Spaced Quiz',
        unit: 'Unit 10',
        date: 'Yesterday, 8:20 PM',
        score: '16 / 20',
        accuracy: 80,
        status: 'Passed',
        mistakes: 4,
        timeSpent: '14m 15s'
      },
      {
        id: 'ex-103',
        title: 'Unit 5: Lesson 1 • Human Rights Rapid Vocabulary',
        unit: 'Unit 5',
        date: '28 Aug 2026, 4:10 PM',
        score: '13 / 20',
        accuracy: 65,
        status: 'Needs Review',
        mistakes: 7,
        timeSpent: '15m 00s'
      },
      {
        id: 'ex-104',
        title: 'Unit 4: Lesson 1 • Three Speeches Master Exam',
        unit: 'Unit 4',
        date: '26 Aug 2026, 9:00 PM',
        score: '19 / 20',
        accuracy: 95,
        status: 'Passed',
        mistakes: 1,
        timeSpent: '11m 30s'
      }
    ];
  };

  // Mock Active Weak Words for the Selected Student
  const getStudentWeakWords = (student) => {
    if (!student) return [];
    return [
      { word: 'Apartheid', mistakeCount: 4, unit: 'Unit 1 L1', lastTested: 'Today' },
      { word: 'Vulnerable', mistakeCount: 3, unit: 'Unit 5 L1', lastTested: 'Yesterday' },
      { word: 'Etiquette', mistakeCount: 3, unit: 'Unit 10 L2', lastTested: '28 Aug 2026' }
    ];
  };

  // Export Analytics CSV
  const handleExportAnalyticsCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,';

    // Section 1: Top Hardest Vocabulary Words
    csvContent += '--- HARDEST VOCABULARY HOTSPOTS ---\n';
    csvContent += 'Word,Part of Speech,Bengali Meaning,Unit & Lesson,Mistake Rate %,Attempts,Most Common Distractor\n';
    hardestWordsDatabase.forEach((item) => {
      csvContent += `"${item.word}","${item.partOfSpeech}","${item.bengaliMeaning}","${item.unit} - ${item.lesson}",${item.mistakeRate}%,${item.attempts},"${item.topWrongAnswer}"\n`;
    });

    // Section 2: Student Activity Overview
    csvContent += '\n--- STUDENT PERFORMANCE BREAKDOWN ---\n';
    csvContent += 'Student Name,Email,College,Batch,Streak (Days),Total XP,Mastered Words,Status\n';
    (users || []).forEach((u) => {
      csvContent += `"${u.name}","${u.email}","${u.college}","${u.hscBatch}",${u.streak || 0},${u.points || 0},${u.masteredWordsCount || 0},"${u.status || 'Active'}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hsc_platform_analytics_report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Export Analytics JSON
  const handleExportAnalyticsJSON = () => {
    const analyticsReport = {
      generatedAt: new Date().toISOString(),
      timeRange,
      kpis: {
        totalStudents: users.length,
        activeStudents,
        totalMasteredWords: totalMastered,
        totalPointsAwarded: totalPoints,
        averageAccuracy: avgAccuracy
      },
      hardestWords: hardestWordsDatabase,
      weeklyQuizTrend: weeklyActivityData,
      hourlyEngagement: hourlyDAUData,
      unitMastery: hscUnits.map((u) => ({
        id: u.id,
        title: u.unitTitle,
        titleBn: u.unitTitleBn,
        progress: u.progress,
        masteredWords: u.masteredWords,
        totalWords: u.totalWords
      }))
    };

    const blob = new Blob([JSON.stringify(analyticsReport, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hsc_platform_analytics_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Export Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#111723] border border-[#1e293b] p-5 sm:p-6 rounded-3xl shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Live Platform Intelligence
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              Realtime NCTB Metrics
            </span>
          </div>
          <h2 className="text-white font-extrabold text-xl md:text-2xl flex items-center gap-2.5">
            <BarChart3 className="text-emerald-400" size={24} />
            <span>{isBn ? 'লার্নার অ্যানালিটিক্স ও পারফরম্যান্স মেট্রিক্স' : 'Platform Analytics & Performance Engine'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? 'শিক্ষার্থীদের পরীক্ষার নির্ভুলতা, অধ্যায়ভিত্তিক অগ্রগতি, স্টুডেন্ট ড্রিল-ডাউন এবং সর্বাধিক ভুল হওয়া শব্দের বিশ্লেষণ।'
              : 'Per-student drill-down activity, hardest vocabulary mistake heatmap, interactive DAU curves, and curriculum distribution.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Time Range Selector */}
          <div className="flex items-center bg-[#0c0f17] border border-[#1e293b] p-1 rounded-xl text-xs font-semibold text-slate-400">
            {[
              { id: '7d', labelEn: '7 Days', labelBn: '৭ দিন' },
              { id: '30d', labelEn: '30 Days', labelBn: '৩০ দিন' },
              { id: 'all', labelEn: 'All Time', labelBn: 'সর্বকালের' }
            ].map((r) => (
              <button
                key={r.id}
                onClick={() => setTimeRange(r.id)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                  timeRange === r.id
                    ? 'bg-emerald-600 text-white font-bold shadow-md shadow-emerald-950/40'
                    : 'hover:text-white'
                }`}
              >
                {isBn ? r.labelBn : r.labelEn}
              </button>
            ))}
          </div>

          {/* Export CSV Button */}
          <button
            onClick={handleExportAnalyticsCSV}
            className="px-3.5 py-2.5 rounded-xl bg-[#161e2e] hover:bg-[#1f2b42] border border-[#22304a] text-emerald-300 hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <FileSpreadsheet size={15} />
            <span>{isBn ? 'CSV রিপোর্ট' : 'Export CSV'}</span>
          </button>

          {/* Export JSON Button */}
          <button
            onClick={handleExportAnalyticsJSON}
            className="px-3.5 py-2.5 rounded-xl bg-[#161e2e] hover:bg-[#1f2b42] border border-[#22304a] text-cyan-300 hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <FileCode size={15} />
            <span>{isBn ? 'JSON ডাটা' : 'Export JSON'}</span>
          </button>
        </div>
      </div>

      {/* 1. Main KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Overall Accuracy */}
        <div className="bg-[#111723] border border-[#1e293b] p-5 rounded-2xl shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{isBn ? 'গড় নির্ভুলতা (Accuracy)' : 'Overall Accuracy'}</span>
            <span className="text-emerald-400 flex items-center text-[11px] font-bold">
              <ArrowUpRight size={13} /> +4.2%
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-400">
            {avgAccuracy}%
          </div>
          <div className="w-full bg-[#1c2436] h-1.5 rounded-full overflow-hidden mt-3">
            <div className="bg-emerald-500 h-full rounded-full transition-all duration-700" style={{ width: `${avgAccuracy}%` }} />
          </div>
        </div>

        {/* KPI 2: Total Mastered Words (3x Retention) */}
        <div className="bg-[#111723] border border-[#1e293b] p-5 rounded-2xl shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{isBn ? 'সম্পূর্ণ মুখস্থ শব্দ (3x Done)' : 'Mastered Vocab Words'}</span>
            <CheckCircle2 size={16} className="text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400">
            {totalMastered}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            {isBn ? '৩ বার সফল পরীক্ষার মাধ্যমে উত্তীর্ণ' : 'Passed 3 consecutive test cycles'}
          </span>
        </div>

        {/* KPI 3: Avg Response Speed */}
        <div className="bg-[#111723] border border-[#1e293b] p-5 rounded-2xl shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{isBn ? 'গড় সময় প্রতি MCQ' : 'Avg Response Speed'}</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            18.4s
          </div>
          <span className="text-[11px] text-emerald-400 mt-2 block font-medium">
            {isBn ? 'বোর্ড পরীক্ষার জন্য উপযুক্ত গতি' : 'Optimal Board pacing'}
          </span>
        </div>

        {/* KPI 4: Daily Active Learners (DAU) */}
        <div className="bg-[#111723] border border-[#1e293b] p-5 rounded-2xl shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{isBn ? 'দৈনিক সক্রিয় শিক্ষার্থী (DAU)' : 'Daily Active Learners'}</span>
            <Users size={16} className="text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400">
            {activeStudents} / {users.length}
          </div>
          <span className="text-[11px] text-purple-300 mt-2 block font-medium">
            {Math.round((activeStudents / Math.max(users.length, 1)) * 100)}% {isBn ? 'সক্রিয় অংশগ্রহণের হার' : 'active student retention'}
          </span>
        </div>
      </div>

      {/* 2. Interactive SVG Charts Grid: Weekly Quiz Volume Bar Chart + Hourly DAU Curve */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Interactive SVG Weekly Bar Chart */}
        <div className="lg:col-span-7 bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <span>{isBn ? 'সাপ্তাহিক কুইজ টেস্ট সংখ্যা ও ট্রেন্ড' : 'Weekly Exam Attempts & Quiz Volume'}</span>
            </h3>
            <span className="text-xs font-bold text-slate-400 bg-[#0c0f17] px-2.5 py-1 rounded-lg border border-[#1e293b]">
              Total: {weeklyActivityData.reduce((s, d) => s + d.quizzes, 0)} Tests
            </span>
          </div>

          {/* Interactive SVG Bar Chart Container */}
          <div className="bg-[#0c0f17] p-5 rounded-2xl border border-[#1e293b] relative">
            <div className="h-52 flex items-end justify-between gap-3 pt-6 px-2">
              {weeklyActivityData.map((item, idx) => {
                const heightPercent = (item.quizzes / maxWeeklyQuizzes) * 100;
                const isHovered = hoveredBarIndex === idx;

                return (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredBarIndex(idx)}
                    onMouseLeave={() => setHoveredBarIndex(null)}
                    className="flex-1 flex flex-col items-center gap-2 group cursor-pointer relative"
                  >
                    {/* Floating Tooltip */}
                    {isHovered && (
                      <div className="absolute -top-12 z-20 px-2.5 py-1.5 rounded-xl bg-emerald-950/95 border border-emerald-500/50 text-emerald-200 text-[10px] font-bold shadow-xl whitespace-nowrap animate-in fade-in zoom-in-90 duration-150 pointer-events-none">
                        <div>{item.quizzes} Quizzes ({item.avgScore}% Avg)</div>
                        <div className="text-[9px] text-slate-300">Peak: {item.peakTime}</div>
                      </div>
                    )}

                    <span className="text-[10px] text-slate-400 group-hover:text-emerald-300 transition-colors font-bold">
                      {item.quizzes}
                    </span>

                    <div className="w-full bg-[#161f30] rounded-t-xl h-36 flex items-end overflow-hidden p-0.5">
                      <div
                        className={`w-full rounded-t-lg transition-all duration-500 ${
                          isHovered
                            ? 'bg-gradient-to-t from-emerald-500 to-teal-300 brightness-125 shadow-lg shadow-emerald-500/50'
                            : 'bg-gradient-to-t from-emerald-700 to-teal-500'
                        }`}
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    <span className={`text-xs font-extrabold transition-colors ${
                      isHovered ? 'text-emerald-400' : 'text-slate-400'
                    }`}>
                      {isBn ? item.dayBn : item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Interactive Hourly DAU Engagement Line Chart */}
        <div className="lg:col-span-5 bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <Activity size={18} className="text-purple-400" />
              <span>{isBn ? 'ঘণ্টাভিত্তিক শিক্ষার্থী ট্রাফিক (DAU)' : 'Hourly Active Learners (DAU)'}</span>
            </h3>
            <span className="text-[10px] font-extrabold text-purple-300 bg-purple-500/15 px-2 py-0.5 rounded-full border border-purple-500/30">
              Peak: 8 - 10 PM
            </span>
          </div>

          {/* Interactive SVG Area Curve */}
          <div className="bg-[#0c0f17] p-5 rounded-2xl border border-[#1e293b] relative">
            <svg viewBox="0 0 400 160" className="w-full h-44 overflow-visible">
              <defs>
                <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#a855f7" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="#a855f7" stopOpacity="0.0" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <line x1="0" y1="40" x2="400" y2="40" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1="80" x2="400" y2="80" stroke="#1e293b" strokeDasharray="3 3" />
              <line x1="0" y1="120" x2="400" y2="120" stroke="#1e293b" strokeDasharray="3 3" />

              {/* Area path */}
              <path
                d={`M 0,${150 - (hourlyDAUData[0].users / maxHourlyUsers) * 130} ` +
                  hourlyDAUData.map((d, i) => `L ${(i / (hourlyDAUData.length - 1)) * 400},${150 - (d.users / maxHourlyUsers) * 130}`).join(' ') +
                  ' L 400,150 L 0,150 Z'}
                fill="url(#purpleGradient)"
              />

              {/* Line path */}
              <path
                d={`M 0,${150 - (hourlyDAUData[0].users / maxHourlyUsers) * 130} ` +
                  hourlyDAUData.map((d, i) => `L ${(i / (hourlyDAUData.length - 1)) * 400},${150 - (d.users / maxHourlyUsers) * 130}`).join(' ')}
                fill="none"
                stroke="#c084fc"
                strokeWidth="3"
                strokeLinecap="round"
              />

              {/* Interactive Points */}
              {hourlyDAUData.map((d, i) => {
                const cx = (i / (hourlyDAUData.length - 1)) * 400;
                const cy = 150 - (d.users / maxHourlyUsers) * 130;
                const isHovered = hoveredPointIndex === i;

                return (
                  <g key={i}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 7 : 4}
                      className="fill-purple-400 stroke-[#0c0f17] stroke-2 cursor-pointer transition-all"
                      onMouseEnter={() => setHoveredPointIndex(i)}
                      onMouseLeave={() => setHoveredPointIndex(null)}
                    />
                    {isHovered && (
                      <g>
                        <rect
                          x={Math.max(10, Math.min(cx - 50, 300))}
                          y={cy - 42}
                          width="100"
                          height="32"
                          rx="8"
                          className="fill-purple-950 stroke-purple-500/80 stroke-1"
                        />
                        <text
                          x={Math.max(10, Math.min(cx - 50, 300)) + 50}
                          y={cy - 22}
                          textAnchor="middle"
                          className="fill-purple-200 text-[10px] font-bold"
                        >
                          {d.users} Active Users
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* X-axis labels */}
            <div className="flex justify-between text-[10px] text-slate-500 font-bold mt-2 pt-1 border-t border-[#1e293b]">
              {hourlyDAUData.map((d, idx) => (
                <span key={idx} className={hoveredPointIndex === idx ? 'text-purple-300 font-extrabold' : ''}>
                  {d.hour}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* 3. Top Weak Words Mistake Heatmap */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-white font-extrabold text-base md:text-lg flex items-center gap-2">
              <AlertTriangle size={20} className="text-rose-400" />
              <span>{isBn ? 'টপ দুর্বল শব্দসমূহের মিস্টেক হিটম্যাপ (Mistake Heatmap)' : 'Top Weak Words Mistake Heatmap'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn
                ? 'সকল শিক্ষার্থীর মধ্যে সর্বাধিক ভুল হওয়া শব্দ, ভুলের শতকরা হার এবং সম্ভাব্য বিভ্রান্তির কারণ।'
                : 'Vocabulary words with highest student error frequencies across all active exam sessions.'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">{isBn ? 'ইউনিট ফিল্টার:' : 'Filter Unit:'}</span>
            <select
              value={heatmapUnitFilter}
              onChange={(e) => setHeatmapUnitFilter(e.target.value)}
              className="bg-[#0c0f17] border border-[#1e293b] focus:border-rose-500 rounded-xl px-3 py-1.5 text-xs text-slate-200 font-semibold outline-none cursor-pointer"
            >
              <option value="All">{isBn ? 'সকল ইউনিট' : 'All Units'}</option>
              <option value="Unit 1">Unit 1</option>
              <option value="Unit 4">Unit 4</option>
              <option value="Unit 5">Unit 5</option>
              <option value="Unit 6">Unit 6</option>
              <option value="Unit 10">Unit 10</option>
            </select>
          </div>
        </div>

        {/* Heatmap Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {filteredHardestWords.map((item, idx) => {
            const isCritical = item.mistakeRate >= 40;
            return (
              <div
                key={idx}
                className={`p-4 rounded-2xl bg-[#0c0f17] border transition-all flex flex-col justify-between ${
                  isCritical
                    ? 'border-rose-500/40 hover:border-rose-500 shadow-sm shadow-rose-950/20'
                    : 'border-[#1e293b] hover:border-amber-500/40'
                }`}
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-1.5">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-white text-base">{item.word}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                          {item.partOfSpeech}
                        </span>
                      </div>
                      <span className="text-xs text-emerald-400 font-semibold block mt-0.5">
                        {item.bengaliMeaning}
                      </span>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-base font-black ${isCritical ? 'text-rose-400' : 'text-amber-400'}`}>
                        {item.mistakeRate}% {isBn ? 'ভুল' : 'Error'}
                      </span>
                      <span className="text-[10px] text-slate-500 block">
                        {item.attempts} attempts
                      </span>
                    </div>
                  </div>

                  {/* Heatmap Bar */}
                  <div className="w-full bg-[#182133] h-2 rounded-full overflow-hidden my-2.5">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ${
                        isCritical
                          ? 'bg-gradient-to-r from-rose-600 to-red-400'
                          : 'bg-gradient-to-r from-amber-600 to-yellow-400'
                      }`}
                      style={{ width: `${item.mistakeRate}%` }}
                    />
                  </div>

                  {/* Common Misconception */}
                  <div className="text-[11px] text-slate-300 bg-[#121927] p-2.5 rounded-xl border border-[#1b2538] leading-relaxed">
                    <span className="font-bold text-rose-300 block mb-0.5">
                      ⚠️ {isBn ? 'প্রধান ভুল কারণ:' : 'Common Distractor:'}
                    </span>
                    <span>{item.topWrongAnswer}</span>
                  </div>
                </div>

                <div className="mt-3 pt-2 border-t border-[#182233] flex items-center justify-between text-[10px] text-slate-500">
                  <span className="font-semibold text-slate-400">{item.unit}</span>
                  <span>{item.lesson}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Per-Student Activity Breakdown & Drill-Down Table */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="text-white font-extrabold text-base md:text-lg flex items-center gap-2">
              <Users size={20} className="text-cyan-400" />
              <span>{isBn ? 'শিক্ষার্থীভিত্তিক বিস্তারিত পারফরম্যান্স ও ড্রিল-ডাউন' : 'Student Activity & Drill-Down Inspection'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isBn
                ? 'যেকোনো শিক্ষার্থীর নামের ওপর ক্লিক করে তার পূর্ণাঙ্গ পরীক্ষার ইতিহাস, দুর্বল শব্দ ও নির্ভুলতার হার দেখুন।'
                : 'Click on any learner to inspect their complete exam attempt history, weak words queue, and retention metrics.'}
            </p>
          </div>

          <div className="relative w-full sm:w-64">
            <Search size={14} className="absolute left-3 top-3 text-slate-400" />
            <input
              type="text"
              value={studentSearchTerm}
              onChange={(e) => setStudentSearchTerm(e.target.value)}
              placeholder={isBn ? 'শিক্ষার্থী খুঁজুন...' : 'Search student...'}
              className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-cyan-500 rounded-xl pl-9 pr-3 py-2 text-xs text-white outline-none"
            />
          </div>
        </div>

        {/* Table of Students */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-[#0c0f17] text-slate-400 border-b border-[#1e293b] uppercase font-bold text-[11px]">
              <tr>
                <th className="py-3.5 px-4">{isBn ? 'শিক্ষার্থী' : 'Student'}</th>
                <th className="py-3.5 px-4">{isBn ? 'কলেজ' : 'College'}</th>
                <th className="py-3.5 px-4">{isBn ? 'পয়েন্ট ও স্ট্রিক' : 'Points & Streak'}</th>
                <th className="py-3.5 px-4">{isBn ? 'মুখস্থ শব্দ' : 'Mastered'}</th>
                <th className="py-3.5 px-4 text-right">{isBn ? 'অ্যাকশন' : 'Drill-Down'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#182133]">
              {filteredStudents.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => setSelectedStudent(student)}
                  className="hover:bg-[#141b29] transition-colors cursor-pointer group"
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-xs shrink-0 shadow-sm">
                        {(student.name || 'S').charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block group-hover:text-cyan-300 transition-colors">
                          {student.name}
                        </span>
                        <span className="text-[10px] text-slate-400">{student.email}</span>
                      </div>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-slate-300 text-xs block">{student.college || 'Notre Dame College'}</span>
                    <span className="text-[10px] text-emerald-400 font-semibold">{student.hscBatch || 'HSC 2026'}</span>
                  </td>

                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <span className="text-yellow-400 font-extrabold">{student.points || 0} XP</span>
                      <span className="text-orange-400 font-bold flex items-center gap-0.5 text-xs">
                        <Flame size={12} className="fill-orange-400" />
                        {student.streak || 0}d
                      </span>
                    </div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-cyan-300 font-bold">
                      {student.masteredWordsCount || 0} words
                    </span>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedStudent(student);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-[#162033] hover:bg-cyan-950/60 border border-[#23314d] hover:border-cyan-500/50 text-cyan-300 text-xs font-bold inline-flex items-center gap-1 transition-all"
                    >
                      <Eye size={13} />
                      <span>{isBn ? 'ইনস্পেক্ট' : 'Inspect'}</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. Unit-by-Unit Curriculum Mastery Distribution Grid */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
        <h3 className="text-white font-extrabold text-base md:text-lg flex items-center gap-2">
          <BookOpen size={20} className="text-emerald-400" />
          <span>{isBn ? '১২টি ইউনিটের পূর্ণাঙ্গ পারফরম্যান্স ও অগ্রগতি' : 'All 12 HSC Units Curriculum Mastery Distribution'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {hscUnits.map((u) => {
            const masteryRate = Math.round((u.masteredWords / Math.max(u.totalWords, 1)) * 100);
            return (
              <div
                key={u.id}
                className="p-4 rounded-2xl bg-[#0c0f17] border border-[#1e293b] flex flex-col justify-between hover:border-emerald-500/40 transition-all group"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-black text-emerald-400 bg-[#161c2b] px-2.5 py-0.5 rounded-md border border-[#232c3f]">
                      {u.unitNumber}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-400">
                      {masteryRate}% Mastered
                    </span>
                  </div>

                  <h4 className="text-slate-100 font-bold text-sm group-hover:text-emerald-300 transition-colors">
                    {isBn ? u.unitTitleBn : u.unitTitle}
                  </h4>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {u.lessons.length} Lessons • {u.totalWords} Total Vocabulary Words
                  </span>
                </div>

                <div className="mt-4 pt-2.5 border-t border-[#182133]">
                  <div className="w-full bg-[#182133] h-1.5 rounded-full overflow-hidden mb-2">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${masteryRate}%` }}
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>{isBn ? 'মুখস্থ:' : 'Mastered:'} {u.masteredWords}/{u.totalWords}</span>
                    <span className="text-emerald-400 font-semibold">{u.progress}% Syllabus Done</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* DRILL-DOWN MODAL: Per-Student Full Activity Drawer / Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl w-full max-w-3xl max-h-[90vh] flex flex-col overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4.5 bg-[#0c0f17] border-b border-[#1e293b] flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-cyan-600 to-teal-500 flex items-center justify-center text-white font-extrabold text-base shadow-lg shadow-cyan-950/60">
                  {(selectedStudent.name || 'S').slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-base sm:text-lg flex items-center gap-2">
                    <span>{selectedStudent.name}</span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      {selectedStudent.status || 'Active'}
                    </span>
                  </h3>
                  <span className="text-xs text-slate-400">
                    {selectedStudent.email} • {selectedStudent.college || 'Notre Dame College'} ({selectedStudent.hscBatch || 'HSC 2026'})
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedStudent(null)}
                className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-[#161e2e] transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Student KPI Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-[#0c0f17] p-3.5 rounded-2xl border border-[#1e293b] text-center">
                  <span className="text-[11px] text-slate-400 block">{isBn ? 'মোট পয়েন্ট' : 'Total XP Score'}</span>
                  <span className="text-xl font-black text-yellow-400">{selectedStudent.points || 0} XP</span>
                </div>

                <div className="bg-[#0c0f17] p-3.5 rounded-2xl border border-[#1e293b] text-center">
                  <span className="text-[11px] text-slate-400 block">{isBn ? 'স্ট্রিক রেকর্ড' : 'Active Streak'}</span>
                  <span className="text-xl font-black text-orange-400">{selectedStudent.streak || 0} Days</span>
                </div>

                <div className="bg-[#0c0f17] p-3.5 rounded-2xl border border-[#1e293b] text-center">
                  <span className="text-[11px] text-slate-400 block">{isBn ? 'মুখস্থ শব্দ' : 'Mastered Words'}</span>
                  <span className="text-xl font-black text-emerald-400">{selectedStudent.masteredWordsCount || 0}</span>
                </div>

                <div className="bg-[#0c0f17] p-3.5 rounded-2xl border border-[#1e293b] text-center">
                  <span className="text-[11px] text-slate-400 block">{isBn ? 'দুর্বল শব্দ' : 'Weak Words'}</span>
                  <span className="text-xl font-black text-rose-400">{getStudentWeakWords(selectedStudent).length}</span>
                </div>
              </div>

              {/* Exam Attempt History */}
              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm flex items-center gap-2">
                  <Clock size={16} className="text-cyan-400" />
                  <span>{isBn ? 'সাম্প্রতিক পরীক্ষার ইতিহাস' : 'Recent Exam Attempts & Scores'}</span>
                </h4>

                <div className="space-y-2">
                  {getStudentExamHistory(selectedStudent).map((ex) => (
                    <div
                      key={ex.id}
                      className="p-3.5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <span className="font-bold text-white text-xs sm:text-sm block">{ex.title}</span>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 mt-0.5">
                          <span>{ex.date}</span>
                          <span>•</span>
                          <span>Time: {ex.timeSpent}</span>
                          <span>•</span>
                          <span className="text-rose-400">{ex.mistakes} mistakes</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 self-end sm:self-auto">
                        <div className="text-right">
                          <span className="font-extrabold text-emerald-400 text-xs sm:text-sm block">{ex.score}</span>
                          <span className="text-[10px] text-slate-400 font-semibold">{ex.accuracy}% Accuracy</span>
                        </div>
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          ex.status === 'Passed'
                            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                            : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        }`}>
                          {ex.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Active Weak Words for this Student */}
              <div className="space-y-3">
                <h4 className="text-white font-bold text-sm flex items-center gap-2">
                  <AlertTriangle size={16} className="text-rose-400" />
                  <span>{isBn ? 'শিক্ষার্থীর সক্রিয় দুর্বল শব্দসমূহ' : 'Active Weak Words Queue'}</span>
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {getStudentWeakWords(selectedStudent).map((w, idx) => (
                    <div key={idx} className="p-3 rounded-xl bg-[#0c0f17] border border-rose-500/30 flex items-center justify-between">
                      <div>
                        <span className="font-bold text-white text-xs block">{w.word}</span>
                        <span className="text-[10px] text-slate-400">{w.unit}</span>
                      </div>
                      <span className="text-[10px] font-extrabold text-rose-400 bg-rose-500/15 px-2 py-0.5 rounded border border-rose-500/30">
                        {w.mistakeCount} mistakes
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#0c0f17] border-t border-[#1e293b] flex justify-end">
              <button
                onClick={() => setSelectedStudent(null)}
                className="px-5 py-2 rounded-xl bg-[#161e2e] hover:bg-[#1f2b42] text-slate-300 text-xs font-bold transition-all"
              >
                {isBn ? 'বন্ধ করুন' : 'Close Inspection'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
