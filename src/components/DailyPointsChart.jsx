import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Info, Award, TrendingUp } from 'lucide-react';
import { mockDailyPoints } from '../data/mockData';

export default function DailyPointsChart({ lang }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isBn = lang === 'bn';

  const maxPoints = Math.max(...mockDailyPoints.map((d) => d.points), 100);
  const totalWeeklyPoints = mockDailyPoints.reduce((sum, d) => sum + d.points, 0);

  return (
    <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-5 shadow-card">
      {/* Top Header */}
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-white font-bold text-sm md:text-base tracking-wide flex items-center gap-1.5">
          <span>{isBn ? 'দৈনিক পয়েন্ট' : 'Daily Points'}</span>
        </h3>

        <button
          title="Information"
          className="text-slate-500 hover:text-slate-300 transition-colors"
        >
          <Info size={15} />
        </button>
      </div>

      {/* Date Range Navigation matching screenshot */}
      <div className="flex items-center justify-between text-xs text-slate-400 mb-4 bg-[#0f1420] border border-[#1a2233] px-3 py-1.5 rounded-lg">
        <button className="hover:text-white p-0.5 transition-colors">
          <ChevronLeft size={15} />
        </button>

        <span className="font-semibold text-slate-300">
          Aug 23 - Aug 29
        </span>

        <button className="hover:text-white p-0.5 transition-colors">
          <ChevronRight size={15} />
        </button>
      </div>

      {/* Interactive Bar Visualizer */}
      <div className="bg-[#0f1420] border border-[#1b2333] rounded-xl p-3.5 pt-6">
        {/* Tooltip display */}
        <div className="h-5 text-center text-xs mb-2">
          {hoveredIndex !== null ? (
            <span className="text-emerald-400 font-bold">
              {mockDailyPoints[hoveredIndex].date}: {mockDailyPoints[hoveredIndex].points} {isBn ? 'পয়েন্ট' : 'pts'}
            </span>
          ) : (
            <span className="text-slate-500 text-[11px]">
              {isBn ? `সাপ্তাহিক মোট: ${totalWeeklyPoints} পয়েন্ট` : `Weekly Total: ${totalWeeklyPoints} pts`}
            </span>
          )}
        </div>

        {/* Bars Container */}
        <div className="h-28 flex items-end justify-between gap-2 px-1">
          {mockDailyPoints.map((item, idx) => {
            const heightPercent = (item.points / maxPoints) * 100;
            const isHovered = hoveredIndex === idx;

            return (
              <div
                key={idx}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                className="flex-1 flex flex-col items-center gap-2 group cursor-pointer"
              >
                {/* Bar */}
                <div className="w-full bg-[#182030] rounded-t-md h-24 flex items-end overflow-hidden">
                  <div
                    className={`w-full rounded-t-md transition-all duration-300 ${
                      isHovered
                        ? 'bg-gradient-to-t from-emerald-600 to-teal-400 shadow-glow-green'
                        : item.points > 0
                        ? 'bg-emerald-500/80 hover:bg-emerald-400'
                        : 'bg-transparent'
                    }`}
                    style={{ height: `${Math.max(heightPercent, item.points > 0 ? 10 : 2)}%` }}
                  />
                </div>

                {/* Day label */}
                <span
                  className={`text-[10px] font-medium transition-colors ${
                    isHovered ? 'text-emerald-400 font-bold' : 'text-slate-400'
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
