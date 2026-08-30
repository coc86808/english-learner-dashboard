import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  Trophy, 
  Zap, 
  Award 
} from 'lucide-react';
import { mockStreakDays } from '../data/mockData';

export default function StreakWidget({ 
  lang = 'en', 
  streakCount = 2, 
  freezesLeft = 1, 
  onStreakAction 
}) {
  const [weekOffset, setWeekOffset] = useState(0);
  const isBn = lang === 'bn';

  // Dynamic Milestone calculation
  const getMilestone = (count) => {
    if (count >= 15) {
      return {
        level: 'Diamond',
        levelBn: 'ডায়মন্ড মাস্টার',
        color: 'text-cyan-400',
        bg: 'bg-cyan-500/15 border-cyan-500/30 text-cyan-300',
        nextTarget: 30,
        icon: Trophy
      };
    }
    if (count >= 8) {
      return {
        level: 'Gold',
        levelBn: 'গোল্ড স্কলার',
        color: 'text-amber-400',
        bg: 'bg-amber-500/15 border-amber-500/30 text-amber-300',
        nextTarget: 15,
        icon: Award
      };
    }
    if (count >= 4) {
      return {
        level: 'Silver',
        levelBn: 'সিলভার লার্নার',
        color: 'text-slate-200',
        bg: 'bg-slate-500/15 border-slate-500/30 text-slate-200',
        nextTarget: 8,
        icon: Award
      };
    }
    return {
      level: 'Bronze',
      levelBn: 'ব্রোঞ্জ স্ট্রিক',
      color: 'text-amber-600',
      bg: 'bg-amber-600/15 border-amber-600/30 text-amber-400',
      nextTarget: 4,
      icon: Sparkles
    };
  };

  const milestone = getMilestone(streakCount);
  const MilestoneIcon = milestone.icon;
  const progressPercent = Math.min(100, Math.round((streakCount / milestone.nextTarget) * 100));

  return (
    <div className="bg-[#111723]/95 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-5 md:p-6 shadow-card relative overflow-hidden space-y-4">
      {/* Background Ambient Glow */}
      <div className="absolute -right-8 -bottom-8 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-8 -top-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row: Streak Title + Freeze Protection Badge */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-md shadow-amber-950/50">
            <Flame size={18} className="fill-white stroke-none animate-pulse" />
          </div>
          <div>
            <h3 className="text-white font-extrabold text-base tracking-wide flex items-center gap-2">
              <span>{isBn ? 'দৈনিক স্ট্রিক' : 'Daily Streak'}</span>
            </h3>
          </div>
        </div>

        {/* Freeze Shield Badge */}
        <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#162033] border border-[#22314d] text-xs font-bold text-slate-300 shadow-sm">
          {freezesLeft > 0 ? (
            <>
              <ShieldCheck size={14} className="text-emerald-400" />
              <span className="text-emerald-400 font-extrabold">{freezesLeft}</span>
              <span className="text-[11px] text-slate-400">{isBn ? 'ফ্রিজ সুরক্ষিত' : 'Freeze'}</span>
            </>
          ) : (
            <>
              <ShieldAlert size={14} className="text-amber-400" />
              <span className="text-[11px] text-slate-400">{isBn ? 'ফ্রিজ নেই' : '0 Freezes'}</span>
            </>
          )}
        </div>
      </div>

      {/* Main Days Counter & Milestone Progress */}
      <div className="bg-[#0c101a]/80 border border-[#192233] rounded-xl p-4 relative z-10 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400 bg-clip-text text-transparent tracking-tight">
              {streakCount}
            </span>
            <span className="text-sm font-extrabold text-slate-300">
              {isBn ? 'দিন চালু' : 'Days Active'}
            </span>
          </div>

          {/* Milestone Badge */}
          <div className={`px-2.5 py-1 rounded-lg border text-[11px] font-black flex items-center gap-1.5 ${milestone.bg}`}>
            <MilestoneIcon size={13} />
            <span>{isBn ? milestone.levelBn : `${milestone.level} Rank`}</span>
          </div>
        </div>

        {/* Milestone Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400">
            <span>{isBn ? 'পরবর্তী র‍্যাংক লক্ষ্য' : 'Next Milestone Goal'}</span>
            <span className="text-emerald-400">{streakCount}/{milestone.nextTarget} {isBn ? 'দিন' : 'Days'}</span>
          </div>
          <div className="w-full h-2 bg-[#162033] rounded-full overflow-hidden p-0.5 border border-[#22314d]">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-orange-500 to-emerald-400 shadow-sm shadow-emerald-500/50"
            />
          </div>
        </div>
      </div>

      {/* 7-Day Flame History Calendar */}
      <div className="bg-[#0c101a]/80 border border-[#192233] rounded-xl p-3 relative z-10">
        {/* Week Navigation */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-2.5 px-1">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="hover:text-white p-1 rounded-lg hover:bg-[#162033] transition-colors cursor-pointer"
            title="Previous Week"
          >
            <ChevronLeft size={14} />
          </button>
          <span className="font-bold text-slate-300 text-[11px]">
            {weekOffset === 0 
              ? (isBn ? 'চলতি সপ্তাহ (This Week)' : 'Current Week') 
              : `${Math.abs(weekOffset)} ${isBn ? 'সপ্তাহ আগে' : 'Weeks Ago'}`}
          </span>
          <button
            onClick={() => setWeekOffset(Math.min(0, weekOffset + 1))}
            disabled={weekOffset >= 0}
            className={`p-1 rounded-lg transition-colors ${
              weekOffset >= 0 ? 'text-slate-600 cursor-not-allowed' : 'hover:text-white hover:bg-[#162033] cursor-pointer'
            }`}
            title="Next Week"
          >
            <ChevronRight size={14} />
          </button>
        </div>

        {/* 7 Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {mockStreakDays.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-1">
              {/* Flame Icon Circle */}
              <div
                className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all ${
                  item.active
                    ? 'bg-gradient-to-tr from-amber-500/20 to-orange-500/30 text-amber-400 border border-amber-500/40 shadow-sm shadow-amber-500/20'
                    : 'bg-[#141b2b] text-slate-600 border border-[#1e283b]'
                } ${item.today ? 'ring-2 ring-emerald-400 ring-offset-1 ring-offset-[#0c101a]' : ''}`}
              >
                <Flame
                  size={15}
                  className={item.active ? 'fill-amber-400 text-amber-400' : 'text-slate-600'}
                />
              </div>

              {/* Day Label */}
              <span
                className={`text-[10px] font-bold ${
                  item.today
                    ? 'text-emerald-400 font-black'
                    : item.active
                    ? 'text-slate-200'
                    : 'text-slate-500'
                }`}
              >
                {isBn ? item.day : item.dayEn}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Motivational Tip */}
      <p className="text-[11px] text-slate-400 leading-snug px-1 text-center">
        {isBn
          ? '💡 প্রতিদিন অন্তত ১টি কুইজ সম্পন্ন করলে আপনার স্ট্রিক বৃদ্ধি পাবে ও র‍্যাংক আনলক হবে।'
          : '💡 Solve at least 1 lesson quiz daily to keep your streak flame alive and climb the leaderboard!'}
      </p>
    </div>
  );
}
