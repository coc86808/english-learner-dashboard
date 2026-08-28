import React from 'react';
import { BookOpen, GraduationCap, BookMarked } from 'lucide-react';

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
      subtitle: isBn ? 'ইউনিট ও লেসনভিত্তিক MCQ' : 'Unit & Lesson MCQs',
      icon: BookOpen,
      iconBg: 'bg-gradient-to-br from-emerald-600 to-teal-700 text-white shadow-lg shadow-emerald-950/40',
      borderHover: 'hover:border-emerald-500/50 hover:shadow-emerald-950/30',
      onClick: onOpenQuestionBank
    },
    {
      id: 'qp',
      title: isBn ? 'দ্রুত প্র্যাকটিস' : 'Quick Practice',
      subtitle: isBn ? 'যেকোনো লেসন থেকে MCQ' : 'Random Lesson MCQ',
      icon: GraduationCap,
      iconBg: 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white shadow-lg shadow-blue-950/40',
      borderHover: 'hover:border-blue-500/50 hover:shadow-blue-950/30',
      onClick: onOpenQuickPractice
    },
    {
      id: 'me',
      title: isBn ? 'পূর্ণ পরীক্ষা' : 'Full Exam',
      subtitle: isBn ? 'ইউনিট ➔ লেসন ➔ পরীক্ষা' : 'Unit → Lesson → Exam',
      icon: BookMarked,
      iconBg: 'bg-gradient-to-br from-violet-600 to-purple-700 text-white shadow-lg shadow-violet-950/40',
      borderHover: 'hover:border-violet-500/50 hover:shadow-violet-950/30',
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
            className={`flex items-center sm:flex-col sm:justify-center p-4 sm:p-6 rounded-2xl bg-[#131824] border border-[#1d2536] transition-all duration-300 group hover:-translate-y-1 hover:bg-[#182030] ${card.borderHover} cursor-pointer text-left sm:text-center relative overflow-hidden gap-3.5 sm:gap-0`}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity" />

            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center sm:mb-3 shrink-0 transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}
            >
              <Icon size={24} className="sm:w-7 sm:h-7 stroke-[2.2]" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="text-white font-bold text-sm md:text-base tracking-tight block mb-0.5">
                {card.title}
              </span>

              <span className="text-xs text-slate-400 font-medium block truncate">
                {card.subtitle}
              </span>
            </div>
          </button>
        );
      })}
    </div>
  );
}
