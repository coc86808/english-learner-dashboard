import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ChevronLeft, 
  ChevronRight, 
  Info, 
  Award, 
  TrendingUp, 
  Zap, 
  Target, 
  CheckCircle2, 
  Sparkles 
} from 'lucide-react';
import { mockDailyPoints } from '../data/mockData';

export default function DailyPointsChart({ lang = 'en', pointsData }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [weekOffset, setWeekOffset] = useState(0);
  const isBn = lang === 'bn';

  const dailyData = pointsData || mockDailyPoints;
  const maxPoints = Math.max(...dailyData.map((d) => d.points), 100);
  const totalWeeklyPoints = dailyData.reduce((sum, d) => sum + d.points, 0);
  const weeklyGoal = 700; // 100 points/day target
  const goalPercent = Math.min(100, Math.round((totalWeeklyPoints / weeklyGoal) * 100));
  const dailyAverage = Math.round(totalWeeklyPoints / dailyData.length);
  const bestDay = dailyData.reduce((max, d) => d.points > max.points ? d : max, dailyData[0]);

  // SVG Circular Progress Ring properties
  const radius = 38;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (goalPercent / 100) * circumference;

  return (
    <div className="bg-[#111723]/95 backdrop-blur-xl border border-[#1e293b] rounded-2xl p-5 md:p-6 shadow-card space-y-4 relative overflow-hidden">
      {/* Background Ambient Glow */}
      <div className="absolute -right-10 -top-10 w-36 h-36 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Row */}
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-500 flex items-center justify-center text-slate-950 shadow-md">
            <Zap size={18} className="fill-slate-950" />
          </div>
          <div>
            <h3 className="text-white font-extrabold text-base tracking-wide">
              {isBn ? 'দৈনিক পয়েন্ট ও লক্ষ্য' : 'Daily Points & Goals'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/25">
          <TrendingUp size={13} />
          <span>+{totalWeeklyPoints} pts</span>
        </div>
      </div>

      {/* Weekly Circular Progress Ring & Summary Banner */}
      <div className="bg-[#0c101a]/80 border border-[#192233] rounded-xl p-4 flex items-center justify-between gap-4 relative z-10">
        {/* SVG Progress Ring */}
        <div className="relative w-22 h-22 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90 transform" viewBox="0 0 96 96">
            {/* Background Track Circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="#1e293b"
              strokeWidth="7"
              fill="transparent"
            />
            {/* Animated Progress Circle */}
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="url(#emeraldGradient)"
              strokeWidth="7"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
            <defs>
              <linearGradient id="emeraldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#14b8a6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
          </svg>

          {/* Centered Percentage */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
            <span className="text-sm font-black text-white leading-none">
              {goalPercent}%
            </span>
            <span className="text-[9px] font-extrabold text-emerald-400 mt-0.5">
              {isBn ? 'লক্ষ্য' : 'Goal'}
            </span>
          </div>
        </div>

        {/* Weekly Stats Column */}
        <div className="space-y-1.5 flex-1 min-w-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold truncate">
              {isBn ? 'সাপ্তাহিক অর্জন:' : 'Weekly Earned:'}
            </span>
            <span className="text-white font-bold">{totalWeeklyPoints} / {weeklyGoal} pts</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold truncate">
              {isBn ? 'দৈনিক গড়:' : 'Daily Average:'}
            </span>
            <span className="text-emerald-400 font-bold">{dailyAverage} pts/day</span>
          </div>

          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400 font-semibold truncate">
              {isBn ? 'সর্বোচ্চ স্কোর:' : 'Best Day:'}
            </span>
            <span className="text-amber-400 font-bold">{bestDay?.day || 'Mon'} ({bestDay?.points || 0} pts)</span>
          </div>
        </div>
      </div>

      {/* Date Range Navigation */}
      <div className="flex items-center justify-between text-xs text-slate-400 bg-[#0c101a]/80 border border-[#192233] px-3 py-1.5 rounded-lg relative z-10">
        <button 
          onClick={() => setWeekOffset(weekOffset - 1)}
          className="hover:text-white p-0.5 rounded transition-colors cursor-pointer"
          title="Previous Week"
        >
          <ChevronLeft size={14} />
        </button>

        <span className="font-extrabold text-slate-200 text-[11px]">
          {weekOffset === 0 
            ? (isBn ? 'চলতি সপ্তাহ (Aug 23 - Aug 29)' : 'This Week (Aug 23 - Aug 29)') 
            : `${Math.abs(weekOffset)} ${isBn ? 'সপ্তাহ পূর্বের ডাটা' : 'Weeks Ago'}`}
        </span>

        <button 
          onClick={() => setWeekOffset(Math.min(0, weekOffset + 1))}
          disabled={weekOffset >= 0}
          className={`p-0.5 rounded transition-colors ${
            weekOffset >= 0 ? 'text-slate-600 cursor-not-allowed' : 'hover:text-white cursor-pointer'
          }`}
          title="Next Week"
        >
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Interactive Bar Visualizer */}
      <div className="bg-[#0c101a]/80 border border-[#192233] rounded-xl p-3.5 pt-4 relative z-10">
        {/* Tooltip Display */}
        <div className="h-5 text-center text-xs mb-2 flex items-center justify-center">
          {hoveredIndex !== null ? (
            <motion.span 
              initial={{ opacity: 0, y: -2 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[11px]"
            >
              {dailyData[hoveredIndex].date}: {dailyData[hoveredIndex].points} {isBn ? 'পয়েন্ট' : 'points'}
            </motion.span>
          ) : (
            <span className="text-slate-400 text-[11px] font-medium">
              {isBn ? `সাপ্তাহিক মোট: ${totalWeeklyPoints} পয়েন্ট` : `Weekly Total: ${totalWeeklyPoints} pts`}
            </span>
          )}
        </div>

        {/* Bars Container */}
        <div className="h-28 flex items-end justify-between gap-2 px-1">
          {dailyData.map((item, idx) => {
            const heightPercent = (item.points / maxPoints) * 100;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer"
              >
                {/* Bar Column */}
                <div className="w-full bg-[#141b2a] rounded-t-lg h-24 flex items-end overflow-hidden p-0.5 border border-[#1a2335]">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${Math.max(heightPercent, item.points > 0 ? 12 : 3)}%` }}
                    transition={{ duration: 0.5, delay: idx * 0.05 }}
                    className={`w-full rounded-t-md transition-all duration-200 ${
                      isHovered
                        ? 'bg-gradient-to-t from-emerald-500 via-teal-400 to-cyan-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                        : item.points > 0
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400'
                        : 'bg-transparent'
                    }`}
                  />
                </div>

                {/* Day Label */}
                <span
                  className={`text-[10px] font-bold transition-colors ${
                    isHovered ? 'text-emerald-400 scale-110' : 'text-slate-400'
                  }`}
                >
                  {isBn ? item.dayBn : item.day}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
