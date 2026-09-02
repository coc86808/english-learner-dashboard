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
      subtitle: isBn ? 'বোর্ড শিট ও শব্দার্থ' : 'NCTB 4-Col Sheet',
      badge: '156+ Words',
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
      badge: '3D Flip Mode',
      badgeColor: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
      icon: Layers,
      iconBg: 'bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-lg shadow-amber-950/60 ring-2 ring-amber-500/30',
      borderHover: 'hover:border-amber-500/60 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)]',
      glowColor: 'group-hover:bg-amber-500/[0.04]',
      onClick: onOpenFlashcards
    },
    {
      id: 'me',
      title: isBn ? 'MCQ ভোকাব পরীক্ষা' : 'MCQ Vocab',
      subtitle: isBn ? '৪-ক্যাটাগরি স্পেসড টেস্ট' : '4-Category Spaced Drills',
      badge: '2,569+ MCQs',
      badgeColor: 'bg-cyan-500/15 text-cyan-300 border-cyan-500/30',
      icon: GraduationCap,
      iconBg: 'bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-950/60 ring-2 ring-cyan-500/30',
      borderHover: 'hover:border-cyan-500/60 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)]',
      glowColor: 'group-hover:bg-cyan-500/[0.04]',
      onClick: onOpenMockExam || onOpenQuickPractice
    },
    {
      id: 'ww',
      title: isBn ? 'দুর্বল শব্দ রিভিশন' : 'Weak Words Hub',
      subtitle: isBn ? 'অটো ৩-ভুল ও PDF শিট' : 'Auto 3-Mistake & PDF',
      badge: 'Spaced Recovery',
      badgeColor: 'bg-rose-500/15 text-rose-300 border-rose-500/30',
      icon: FileDown,
      iconBg: 'bg-gradient-to-br from-rose-600 to-red-600 text-white shadow-lg shadow-rose-950/60 ring-2 ring-rose-500/30',
      borderHover: 'hover:border-rose-500/60 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)]',
      glowColor: 'group-hover:bg-rose-500/[0.04]',
      onClick: onOpenWeakWords || onOpenQuickPractice
    }
  ];

  return (
    <div className="space-y-4">
      {/* 4 Feature Action Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {cards.map((card) => {
          const Icon = card.icon;
          return (
            <motion.button
              key={card.id}
              onClick={card.onClick}
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-5 rounded-2xl bg-[#111723]/90 backdrop-blur-xl border border-[#1e293b] transition-all duration-300 group ${card.borderHover} cursor-pointer text-left relative overflow-hidden flex flex-col justify-between shadow-card`}
            >
              {/* Dynamic Glow Surface */}
              <div className={`absolute inset-0 bg-transparent ${card.glowColor} transition-colors duration-300`} />

              {/* Card Header: Icon + Badge */}
              <div className="flex items-center justify-between gap-2 mb-4 relative z-10">
                <div
                  className={`w-13 h-13 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${card.iconBg}`}
                >
                  <Icon size={24} className="stroke-[2.2]" />
                </div>

                <span className={`text-[10px] font-extrabold px-2.5 py-1 rounded-full border ${card.badgeColor}`}>
                  {card.badge}
                </span>
              </div>

              {/* Card Content */}
              <div className="relative z-10">
                <h4 className="text-white font-black text-base sm:text-lg tracking-tight block mb-1 group-hover:text-emerald-300 transition-colors">
                  {card.title}
                </h4>

                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  {card.subtitle}
                </p>
              </div>

              {/* Bottom Quick Indicator */}
              <div className="mt-4 pt-3 border-t border-[#1e293b] flex items-center justify-between text-xs text-slate-400 font-bold group-hover:text-emerald-400 transition-colors relative z-10">
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
