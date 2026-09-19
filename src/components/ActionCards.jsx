import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Layers, 
  GraduationCap, 
  BookMarked, 
  BookOpen, 
  FileDown, 
  Zap, 
  Sparkles, 
  ChevronRight, 
  Play, 
  Clock, 
  Flame, 
  RotateCcw 
} from 'lucide-react';

export default function ActionCards({
  lang = 'en',
  onOpenFlashcards,
  onOpenQuickPractice,
  onOpenMockExam,
  onOpenVocabBank,
  onOpenWeakWords,
  onOpenTextbook,
  onResumeLearning,
  onNavigate,
  lastSession
}) {
  const isBn = lang === 'bn';

  // Smart Resume Learning session resolution from localStorage or default
  const [activeSession, setActiveSession] = useState(() => {
    if (lastSession) return lastSession;
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('hsc_last_studied_session');
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {}
    return {
      unitId: 1,
      unitTitle: "The Parrot's Tale",
      unitTitleBn: 'তোতাকাহিনী (রবীন্দ্রনাথ ঠাকুর)',
      lessonId: 1,
      wordsCount: 46,
      mcqCount: 184,
      progressPercent: 68,
      lastQuestion: 12,
      totalQuestions: 46
    };
  });

  const cards = [
    {
      id: 'vb',
      title: isBn ? 'ভোকাবুলারি ব্যাংক' : 'Vocabulary Bank',
      subtitle: isBn ? '১,০৭৭+ শব্দ ও অর্থ' : '1,077+ Words & Sheet',
      badge: isBn ? 'বোর্ড শিট' : 'Board Sheet',
      badgeColor: 'bg-emerald-500/15 text-emerald-300 border-emerald-500/30',
      icon: BookOpen,
      iconBg: 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500/30',
      borderHover: 'hover:border-emerald-500/60 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)]',
      glowColor: 'group-hover:bg-emerald-500/[0.04]',
      onClick: onOpenVocabBank || onOpenTextbook
    },
    {
      id: 'fc',
      title: isBn ? '৩ডি ফ্ল্যাশকার্ড' : '3D Flashcards',
      subtitle: isBn ? 'অ্যাক্টিভ রিকল ও অডিও' : 'Active Recall & Audio',
      badge: '3D Flip',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      icon: Layers,
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-950/60 ring-2 ring-amber-500/30',
      borderHover: 'hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]',
      glowColor: 'group-hover:bg-amber-500/[0.04]',
      onClick: onOpenFlashcards
    },
    {
      id: 'me',
      title: isBn ? 'MCQ পরীক্ষা' : 'MCQ Exam',
      subtitle: isBn ? '১৪ ইউনিট • ৪,৩০৮ MCQ' : '14 Units • 4,308 MCQs',
      badge: 'Spaced MCQ',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      icon: GraduationCap,
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-950/60 ring-2 ring-cyan-500/30',
      borderHover: 'hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]',
      glowColor: 'group-hover:bg-cyan-500/[0.04]',
      onClick: () => {
        if (onOpenMockExam) {
          onOpenMockExam();
        } else if (onNavigate) {
          onNavigate('/exam');
        } else if (typeof window !== 'undefined') {
          window.location.href = '/exam';
        }
      }
    },
    {
      id: 'ww',
      title: isBn ? 'দুর্বল শব্দ রিভিশন' : 'Weak Words Hub',
      subtitle: isBn ? '৩-ভুল রিকভারি ও PDF' : '3-Mistake Recovery',
      badge: 'Mastery',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      icon: FileDown,
      iconBg: 'bg-gradient-to-br from-rose-600 to-red-600 text-white shadow-lg shadow-rose-950/60 ring-2 ring-rose-500/30',
      borderHover: 'hover:border-rose-500/60 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]',
      glowColor: 'group-hover:bg-rose-500/[0.04]',
      onClick: onOpenWeakWords || onOpenQuickPractice
    }
  ];

  return (
    <div className="space-y-2.5 sm:space-y-4">
      {/* 4 Feature Action Cards Grid — 2x2 on Mobile, 4-Col on Desktop */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.id}
              onClick={card.onClick}
              whileHover={{ y: -3, scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
              className={`p-3 sm:p-5 rounded-2xl bg-[#111723]/95 backdrop-blur-xl border border-[#1e293b] transition-all duration-300 group ${card.borderHover} cursor-pointer text-left relative overflow-hidden flex flex-col justify-between min-h-[110px] sm:min-h-[145px] shadow-card active:border-emerald-500/50`}
            >
              {/* Dynamic Glow Surface */}
              <div className={`absolute inset-0 bg-transparent ${card.glowColor} transition-colors duration-300`} />

              {/* Card Header: Icon + Badge */}
              <div className="flex items-center justify-between gap-1.5 mb-2 sm:mb-4 relative z-10">
                <div
                  className={`w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-105 ${card.iconBg}`}
                >
                  <Icon className="w-4 h-4 sm:w-6 sm:h-6 stroke-[2.2]" />
                </div>

                <span className={`text-[9px] sm:text-[10px] font-extrabold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full border truncate max-w-[90px] sm:max-w-none ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                <h4 className="text-white font-extrabold text-xs sm:text-base tracking-tight block group-hover:text-emerald-300 transition-colors line-clamp-1">
                  {card.title}
                </h4>

                <p className="text-[10px] sm:text-xs text-slate-400 font-medium leading-tight sm:leading-relaxed line-clamp-1 mt-0.5">
                  {card.subtitle}
                </p>
              </div>

              {/* Bottom Indicator for Desktop */}
              <div className="mt-3 pt-2.5 border-t border-[#1e293b] hidden sm:flex items-center justify-between text-xs text-slate-400 font-bold group-hover:text-emerald-400 transition-colors relative z-10">
                <span>{isBn ? 'শুরু করুন' : 'Launch'}</span>
                <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
