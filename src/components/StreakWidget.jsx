import React, { useState } from 'react';
import { Flame, ChevronLeft, ChevronRight, ShieldAlert, Sparkles } from 'lucide-react';
import { mockStreakDays } from '../data/mockData';

export default function StreakWidget({ lang, streakCount = 2, freezesLeft = 0, onStreakAction }) {
  const [weekOffset, setWeekOffset] = useState(0);
  const isBn = lang === 'bn';

  return (
    <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-5 md:p-6 shadow-card relative overflow-hidden">
      {/* Subtle Background Glow Graphic */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Flame size={20} className="text-emerald-400 fill-emerald-400 animate-flame" />
          <h3 className="text-white font-bold text-base tracking-wide">
            {isBn ? 'স্ট্রিক' : 'Streak'}
          </h3>
        </div>

        <span className="text-[11px] text-slate-400 bg-[#192030] px-2.5 py-1 rounded-full border border-[#242e44] flex items-center gap-1">
          <ShieldAlert size={12} className="text-amber-400" />
          <span>
            {isBn ? `ফ্রিজ বাকি ${freezesLeft}` : `Freezes: ${freezesLeft}`}
          </span>
        </span>
      </div>

      {/* Main Days Counter */}
      <div className="my-3">
        <div className="text-3xl md:text-4xl font-extrabold text-emerald-400 flex items-baseline gap-2 tracking-tight">
          <span>{isBn ? '২ দিন' : `${streakCount} Days`}</span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          {isBn
            ? 'প্রতিদিন অন্তত একটি কুইজ সমাধান করে স্ট্রিক ধরে রাখুন!'
            : 'Solve at least 1 quiz daily to maintain your learning streak!'}
        </p>
      </div>

      {/* Weekly Flame Dots Calendar matching screenshot */}
      <div className="bg-[#0f1420] border border-[#1b2333] rounded-xl p-3 mt-4">
        {/* Week navigation */}
        <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
          <button
            onClick={() => setWeekOffset(weekOffset - 1)}
            className="hover:text-white p-0.5 rounded hover:bg-slate-800 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
          <span className="font-semibold text-slate-300">
            {isBn ? 'এই সপ্তাহ' : 'This Week'}
          </span>
          <button
            onClick={() => setWeekOffset(weekOffset + 1)}
            className="hover:text-white p-0.5 rounded hover:bg-slate-800 transition-colors"
          >
            <ChevronRight size={15} />
          </button>
        </div>

        {/* 7 Days Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {mockStreakDays.map((item, index) => (
            <div key={index} className="flex flex-col items-center gap-1.5">
              {/* Flame Icon */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  item.active
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 shadow-sm shadow-emerald-500/20'
                    : 'bg-[#161c2b] text-slate-600 border border-[#232c3f]'
                }`}
              >
                <Flame
                  size={14}
                  className={item.active ? 'fill-emerald-400 text-emerald-400' : 'text-slate-600'}
                />
              </div>

              {/* Day Label */}
              <span
                className={`text-[11px] font-medium ${
                  item.today
                    ? 'text-emerald-400 font-bold'
                    : item.active
                    ? 'text-slate-300'
                    : 'text-slate-500'
                }`}
              >
                {isBn ? item.day : item.dayEn}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
