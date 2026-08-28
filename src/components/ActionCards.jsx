import React from 'react';
import { Package, Zap, Pencil, Sparkles, ArrowUpRight } from 'lucide-react';

export default function ActionCards({
  lang,
  onOpenQuestionBank,
  onOpenQuickPractice,
  onOpenMockExam
}) {
  const isBn = lang === 'bn';

  const cards = [
    {
      id: 'qb',
      title: isBn ? 'প্রশ্নব্যাংক' : 'Question Bank',
      subtitle: isBn ? 'বিগত বছরের প্রশ্ন' : 'Past Year Questions',
      icon: Package,
      iconBg: 'bg-gradient-to-br from-amber-600 to-amber-800 text-amber-100 shadow-lg shadow-amber-950/40',
      borderHover: 'hover:border-amber-500/50 hover:shadow-amber-950/30',
      accentColor: 'text-amber-400',
      onClick: onOpenQuestionBank
    },
    {
      id: 'qp',
      title: isBn ? 'দ্রুত প্র্যাকটিস' : 'Quick Practice',
      subtitle: isBn ? '৫ মিনিটের কুইজ' : '5-Min Fast Quiz',
      icon: Zap,
      iconBg: 'bg-gradient-to-br from-yellow-500 to-amber-600 text-slate-950 shadow-lg shadow-yellow-950/40',
      borderHover: 'hover:border-yellow-500/50 hover:shadow-yellow-950/30',
      accentColor: 'text-yellow-400',
      onClick: onOpenQuickPractice
    },
    {
      id: 'me',
      title: isBn ? 'মক পরীক্ষা' : 'Mock Exam',
      subtitle: isBn ? 'পূর্ণাঙ্গ টেস্ট সিরিজ' : 'Full Test Simulations',
      icon: Pencil,
      iconBg: 'bg-gradient-to-br from-rose-500 to-red-700 text-white shadow-lg shadow-rose-950/40',
      borderHover: 'hover:border-rose-500/50 hover:shadow-rose-950/30',
      accentColor: 'text-rose-400',
      onClick: onOpenMockExam
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 md:gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <button
            key={card.id}
            onClick={card.onClick}
            className={`flex flex-col items-center justify-center p-5 md:p-6 rounded-2xl bg-[#131824] border border-[#1d2536] transition-all duration-300 group hover:-translate-y-1 hover:bg-[#182030] ${card.borderHover} cursor-pointer text-center relative overflow-hidden`}
          >
            {/* Soft Ambient Background Glow on Hover */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

            {/* Icon Container with square rounded look matching screenshot */}
            <div
              className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center mb-3 transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}
            >
              <Icon size={28} className="stroke-[2.2]" />
            </div>

            {/* Title */}
            <span className="text-white font-bold text-sm md:text-base tracking-tight mb-0.5">
              {card.title}
            </span>

            {/* Subtitle / Description */}
            <span className="text-xs text-slate-400 font-medium">
              {card.subtitle}
            </span>
          </button>
        );
      })}
    </div>
  );
}
