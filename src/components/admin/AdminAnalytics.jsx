import React, { useState } from 'react';
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
  Calendar
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';

export default function AdminAnalytics({ users = [], questions = [], lang = 'bn' }) {
  const isBn = lang === 'bn';
  const [timeRange, setTimeRange] = useState('7d'); // '7d' | '30d' | 'all'

  const totalPoints = users.reduce((sum, u) => sum + (u.points || 0), 0);
  const totalMastered = users.reduce((sum, u) => sum + (u.masteredWordsCount || 0), 0);
  const activeStudents = users.filter((u) => u.status === 'Active').length;

  // Mock hardest words list based on student mistakes
  const hardestWords = [
    { word: 'Apartheid', unit: 'Unit 1: Lesson 1', mistakeRate: '48%', attempts: 85, topWrong: 'Segregation chosen as Antonym' },
    { word: 'Vulnerable', unit: 'Unit 5: Lesson 1', mistakeRate: '42%', attempts: 72, topWrong: 'Confused with Invulnerable' },
    { word: 'Emancipation', unit: 'Unit 4: Lesson 1', mistakeRate: '35%', attempts: 94, topWrong: 'Spelling and antonym ambiguity' },
    { word: 'Barren', unit: 'Unit 6: Lesson 2', mistakeRate: '31%', attempts: 60, topWrong: 'Mistaken as fertile' },
    { word: 'Hazardous', unit: 'Unit 10: Lesson 3', mistakeRate: '28%', attempts: 88, topWrong: 'Confused with nutritious' }
  ];

  // Daily activity trend data
  const activityTrend = [
    { day: 'Sat', quizzes: 35, avgScore: 78 },
    { day: 'Sun', quizzes: 28, avgScore: 72 },
    { day: 'Mon', quizzes: 45, avgScore: 82 },
    { day: 'Tue', quizzes: 52, avgScore: 80 },
    { day: 'Wed', quizzes: 68, avgScore: 85 },
    { day: 'Thu', quizzes: 84, avgScore: 88 },
    { day: 'Fri', quizzes: 95, avgScore: 91 },
  ];

  const maxQuizzes = Math.max(...activityTrend.map((d) => d.quizzes), 100);

  const handleExportCSV = () => {
    let csvContent = 'data:text/csv;charset=utf-8,Student Name,Email,College,Batch,Streak,Points,Status\n';
    users.forEach((u) => {
      csvContent += `"${u.name}","${u.email}","${u.college}","${u.hscBatch}",${u.streak},${u.points},"${u.status}"\n`;
    });

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `hsc_learner_analytics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Top Header & Export Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131824] border border-[#1d2536] p-5 rounded-2xl">
        <div>
          <h2 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
            <BarChart3 className="text-emerald-400" size={22} />
            <span>{isBn ? 'লার্নার অ্যানালিটিক্স ও পারফরম্যান্স মেট্রিক্স' : 'Learning Analytics & Performance Metrics'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn
              ? 'শিক্ষার্থীদের পরীক্ষার নির্ভুলতা, অধ্যায়ভিত্তিক অগ্রগতি এবং সর্বাধিক ভুল হওয়া শব্দের বিশ্লেষণ।'
              : 'Detailed insight on student accuracy, chapter completion rates, and hardest vocabulary hotspots.'}
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Time Range Selector */}
          <div className="flex items-center bg-[#10141f] border border-[#1e2738] p-1 rounded-xl text-xs font-semibold text-slate-400">
            {['7d', '30d', 'all'].map((r) => (
              <button
                key={r}
                onClick={() => setTimeRange(r)}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  timeRange === r ? 'bg-emerald-600 text-white font-bold' : 'hover:text-white'
                }`}
              >
                {r === '7d' ? (isBn ? '৭ দিন' : '7 Days') : r === '30d' ? (isBn ? '৩০ দিন' : '30 Days') : (isBn ? 'সকল' : 'All Time')}
              </button>
            ))}
          </div>

          <button
            onClick={handleExportCSV}
            className="px-3.5 py-2 rounded-xl bg-[#192233] hover:bg-[#222e44] border border-[#29364d] text-emerald-300 hover:text-white text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-md"
          >
            <Download size={15} />
            <span>{isBn ? 'CSV রিপোর্ট' : 'Export CSV'}</span>
          </button>
        </div>
      </div>

      {/* 1. Main KPI Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1: Overall Accuracy */}
        <div className="bg-[#131824] border border-[#1d2536] p-5 rounded-2xl shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{isBn ? 'গড় নির্ভুলতা (Accuracy)' : 'Overall Accuracy'}</span>
            <span className="text-emerald-400 flex items-center text-[11px] font-bold">
              <ArrowUpRight size={13} /> +4.2%
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-400">
            78.6%
          </div>
          <div className="w-full bg-[#1c2436] h-1.5 rounded-full overflow-hidden mt-3">
            <div className="bg-emerald-500 h-full rounded-full" style={{ width: '78.6%' }} />
          </div>
        </div>

        {/* KPI 2: Total Mastered Words (Done 3 times) */}
        <div className="bg-[#131824] border border-[#1d2536] p-5 rounded-2xl shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{isBn ? 'সম্পূর্ণ মুখস্থ শব্দ (3x Mastered)' : 'Mastered Words (Done)'}</span>
            <CheckCircle2 size={16} className="text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-400">
            {totalMastered}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block">
            Passed 3 consecutive test cycles
          </span>
        </div>

        {/* KPI 3: Avg Time Per MCQ */}
        <div className="bg-[#131824] border border-[#1d2536] p-5 rounded-2xl shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{isBn ? 'গড় সময় প্রতি প্রশ্ন' : 'Avg Time / Question'}</span>
            <Clock size={16} className="text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-400">
            18.4s
          </div>
          <span className="text-[11px] text-emerald-400 mt-2 block font-medium">
            Fast response rate
          </span>
        </div>

        {/* KPI 4: Active Retention */}
        <div className="bg-[#131824] border border-[#1d2536] p-5 rounded-2xl shadow-card relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-2">
            <span>{isBn ? 'দৈনিক সক্রিয় শিক্ষার্থী (DAU)' : 'Daily Active Learners'}</span>
            <Users size={16} className="text-purple-400" />
          </div>
          <div className="text-3xl font-black text-purple-400">
            {activeStudents} / {users.length}
          </div>
          <span className="text-[11px] text-purple-300 mt-2 block font-medium">
            {Math.round((activeStudents / Math.max(users.length, 1)) * 100)}% active retention
          </span>
        </div>
      </div>

      {/* 2. Grid: Weekly Quiz Volume Chart & Hardest Words List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Cols: Weekly Activity Trend */}
        <div className="lg:col-span-7 bg-[#131824] border border-[#1d2536] rounded-2xl p-5 md:p-6 shadow-card space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <TrendingUp size={18} className="text-emerald-400" />
              <span>{isBn ? 'সাপ্তাহিক কুইজ টেস্ট সংখ্যা ও ট্রেন্ড' : 'Weekly Quiz Volume & Accuracy'}</span>
            </h3>
            <span className="text-xs text-slate-400">Total 407 Quizzes</span>
          </div>

          {/* Bar Chart Container */}
          <div className="bg-[#0e121a] p-4 rounded-xl border border-[#1a2233]">
            <div className="h-44 flex items-end justify-between gap-3 pt-6 px-2">
              {activityTrend.map((item, idx) => {
                const heightPercent = (item.quizzes / maxQuizzes) * 100;

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                    <span className="text-[10px] text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                      {item.quizzes}
                    </span>

                    <div className="w-full bg-[#182030] rounded-t-lg h-32 flex items-end overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-emerald-600 to-teal-400 rounded-t-lg transition-all duration-500 group-hover:brightness-125"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>

                    <span className="text-xs font-semibold text-slate-300 group-hover:text-emerald-400 transition-colors">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right 5 Cols: Top 5 Hardest Words (Mistake Hotspots) */}
        <div className="lg:col-span-5 bg-[#131824] border border-[#1d2536] rounded-2xl p-5 md:p-6 shadow-card space-y-3.5">
          <div className="flex items-center justify-between">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <AlertTriangle size={18} className="text-rose-400" />
              <span>{isBn ? 'কঠিন শব্দসমূহ (সর্বাধিক ভুল)' : 'Hardest Words (Mistake Hotspots)'}</span>
            </h3>
            <span className="text-[11px] text-rose-400 font-semibold bg-rose-500/10 px-2 py-0.5 rounded-md border border-rose-500/20">
              Needs Review
            </span>
          </div>

          <div className="space-y-2.5">
            {hardestWords.map((item, idx) => (
              <div
                key={idx}
                className="p-3 rounded-xl bg-[#10141f] border border-[#1f283a] hover:border-rose-500/40 transition-colors flex items-center justify-between gap-3"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{item.word}</span>
                    <span className="text-[10px] bg-slate-800 text-slate-400 px-1.5 py-0.5 rounded">
                      {item.unit}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 block mt-0.5">
                    {item.topWrong}
                  </span>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-bold text-rose-400 block">
                    {item.mistakeRate}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {item.attempts} tests
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. All 12 HSC Units Completion Table */}
      <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-5 md:p-6 shadow-card space-y-4">
        <h3 className="text-white font-bold text-base md:text-lg flex items-center gap-2">
          <BookOpen size={20} className="text-cyan-400" />
          <span>{isBn ? '১২টি ইউনিটের পূর্ণাঙ্গ পারফরম্যান্স ও অগ্রগতি' : 'All 12 HSC Units Performance Breakdown'}</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {hscUnits.map((u) => (
            <div
              key={u.id}
              className="p-3.5 rounded-xl bg-[#10141f] border border-[#1d2638] flex flex-col justify-between hover:border-emerald-500/30 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-black text-emerald-400 bg-[#161c2b] px-2 py-0.5 rounded-md border border-[#232c3f]">
                    {u.unitNumber}
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    {u.progress}%
                  </span>
                </div>

                <h4 className="text-slate-100 font-bold text-sm">
                  {isBn ? u.unitTitleBn : u.unitTitle}
                </h4>
                <span className="text-[11px] text-slate-400 block mt-0.5">
                  {u.lessons.length} Lessons • {u.totalWords} Total Words
                </span>
              </div>

              <div className="mt-3 pt-2 border-t border-[#1a2233] flex items-center justify-between text-[11px] text-slate-400">
                <span>{isBn ? 'মুখস্থ হয়েছে:' : 'Mastered:'} {u.masteredWords}/{u.totalWords}</span>
                <span className="text-emerald-400 font-medium">{Math.round((u.masteredWords / u.totalWords) * 100)}%</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
