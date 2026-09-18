import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  BookOpen, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Layers,
  Bookmark
} from 'lucide-react';

const toBnNum = (n) => String(n ?? '').replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

/**
 * ContinueLearningCard Component
 * 
 * High-priority featured card displaying active/last unit or quiz topic:
 * - Active or paused session resumption
 * - Question progress counter (e.g. Question 18 / 30)
 * - Estimated time remaining tag (~6 mins left)
 * - Primary [ Continue Quiz → ] action
 * - Secondary [ 📖 Read Passage ] textbook action
 * 
 * Follows Educational SaaS Design Tokens:
 * Surface: #FFFFFF, Border: 1px solid #E5E7EB, Radius: 22-24px,
 * Primary CTA: #2563EB, Min touch target >= 44px
 */
export default function ContinueLearningCard({
  // Direct props
  activeUnit,
  activeLesson,
  currentQuestionIndex,
  totalQuestions,
  estimatedMinutesRemaining,
  onContinueQuiz,
  onResumeQuiz,
  onReadPassage,
  // Object session props
  session,
  activeSession,
  lang = 'en'
}) {
  const isBn = lang === 'bn';

  // 1. Resolve session object or fallback
  const resolved = activeSession || session || {};

  // Resolve Unit Title
  const unitNumber = resolved.unitNumber || (typeof activeUnit === 'object' ? activeUnit?.unitNumber : null) || 'Unit 1';
  const unitTitle = resolved.unitTitle || (typeof activeUnit === 'object' ? activeUnit?.title : activeUnit) || 'Education and Life';
  const unitTitleBn = resolved.unitTitleBn || (typeof activeUnit === 'object' ? activeUnit?.titleBn : '') || 'শিক্ষা ও জীবন';

  // Resolve Lesson Title
  const lessonTitle = resolved.lessonTitle || (typeof activeLesson === 'object' ? activeLesson?.title : activeLesson) || "The Parrot's Tale";
  const lessonTitleBn = resolved.lessonTitleBn || (typeof activeLesson === 'object' ? activeLesson?.titleBn : '') || 'তোতাকাহিনী';

  // Resolve Questions & Time
  const currentQ = Number(currentQuestionIndex ?? resolved.currentQuestion ?? 18);
  const totalQ = Number(totalQuestions ?? resolved.totalQuestions ?? 30);
  const progressPct = Math.min(100, Math.round((currentQ / Math.max(1, totalQ)) * 100));

  const estMinutes = Number(estimatedMinutesRemaining ?? resolved.estimatedMinutes ?? Math.max(2, Math.round(((totalQ - currentQ) * 30) / 60)));
  const isPaused = Boolean(resolved.isPausedSession);
  const wordsCount = resolved.wordsCount || 51;

  // Handlers
  const handleContinue = () => {
    const fn = onContinueQuiz || onResumeQuiz;
    if (fn) {
      fn(resolved.unitId || 'unit-1', resolved.lessonId || 'u1-l1');
    }
  };

  const handleRead = () => {
    if (onReadPassage) {
      onReadPassage(resolved.unitId || 'unit-1', resolved.lessonId || 'u1-l1');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white border border-[#DBEAFE] hover:border-blue-300 rounded-[22px] sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_24px_rgba(37,99,235,0.08)] relative overflow-hidden transition-all duration-200 space-y-5"
    >
      {/* Decorative subtle ambient tint */}
      <div className="absolute -right-10 -bottom-10 w-44 h-44 bg-blue-50/60 rounded-full blur-2xl pointer-events-none" />

      {/* Top Header Row: Status Badge & Curriculum Tag */}
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2">
          {/* Pulsing In-Progress Badge */}
          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16A34A] text-xs font-bold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>
              {isPaused 
                ? (isBn ? 'বিরতিতে থাকা কুইজ' : 'PAUSED QUIZ SESSION')
                : (isBn ? 'চলমান অধ্যায়' : 'RESUME LEARNING')}
            </span>
          </span>

          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#2563EB] text-xs font-semibold">
            <Bookmark size={12} />
            <span>NCTB 2026</span>
          </span>
        </div>

        {/* Estimated Time Badge */}
        <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#64748B] bg-slate-50 border border-slate-200 px-3 py-1 rounded-full">
          <Clock size={13} className="text-[#2563EB]" />
          <span>~{isBn ? toBnNum(estMinutes) : estMinutes} {isBn ? 'মিনিট বাকি' : 'mins left'}</span>
        </div>
      </div>

      {/* Main Titles */}
      <div className="space-y-1">
        <span className="text-xs font-bold uppercase tracking-wider text-[#2563EB]">
          {unitNumber}: {isBn && unitTitleBn ? unitTitleBn : unitTitle}
        </span>
        <h2 className="text-xl sm:text-2xl font-extrabold text-[#172033] tracking-tight">
          {lessonTitle} {lessonTitleBn && <span className="text-base sm:text-lg font-semibold text-[#64748B]">({lessonTitleBn})</span>}
        </h2>
      </div>

      {/* Progress Row & Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs sm:text-sm font-semibold">
          <span className="text-[#172033]">
            {isBn 
              ? `প্রশ্ন ${toBnNum(currentQ)} / ${toBnNum(totalQ)}`
              : `Question ${currentQ} of ${totalQ}`}
          </span>
          <span className="text-[#2563EB] font-bold">
            {isBn ? toBnNum(progressPct) : progressPct}% {isBn ? 'সম্পন্ন' : 'Complete'}
          </span>
        </div>

        {/* Animated Progress Bar */}
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200/70 p-0.5">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-[#2563EB] via-blue-600 to-indigo-600 rounded-full"
          />
        </div>
      </div>

      {/* Curriculum Context Highlights */}
      <div className="flex flex-wrap items-center gap-2 pt-1 text-xs text-[#64748B]">
        <span className="inline-flex items-center gap-1 bg-[#F8FAFC] border border-slate-200 px-2.5 py-1 rounded-lg">
          <Layers size={12} className="text-[#2563EB]" />
          <span>{isBn ? `${toBnNum(wordsCount)}টি শব্দভাণ্ডার` : `${wordsCount} Vocabulary Words`}</span>
        </span>
        <span className="inline-flex items-center gap-1 bg-[#F8FAFC] border border-slate-200 px-2.5 py-1 rounded-lg">
          <CheckCircle2 size={12} className="text-[#16A34A]" />
          <span>{isBn ? 'বোর্ড স্ট্যান্ডার্ড এমসিকিউ' : 'Board Standard MCQs'}</span>
        </span>
        <span className="inline-flex items-center gap-1 bg-[#F8FAFC] border border-slate-200 px-2.5 py-1 rounded-lg">
          <Sparkles size={12} className="text-amber-500" />
          <span>{isBn ? 'স্পেসড রিপিটেশন' : 'Spaced Retention'}</span>
        </span>
      </div>

      {/* Action Buttons Row */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
        <button
          type="button"
          onClick={handleContinue}
          className="flex-1 min-h-[46px] px-6 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group"
        >
          <Play size={16} className="fill-white text-white group-hover:translate-x-0.5 transition-transform" />
          <span>{isBn ? 'কুইজ চালিয়ে যান' : 'Continue Quiz'}</span>
          <ArrowRight size={16} className="text-white/80 group-hover:translate-x-1 transition-transform" />
        </button>

        {onReadPassage && (
          <button
            type="button"
            onClick={handleRead}
            className="sm:w-auto min-h-[46px] px-5 py-3.5 bg-white hover:bg-[#F8FAFC] active:scale-[0.99] border border-[#E5E7EB] hover:border-slate-300 text-[#172033] rounded-xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
          >
            <BookOpen size={16} className="text-[#2563EB]" />
            <span>{isBn ? '📖 প্যাসেজ পড়ুন' : '📖 Read Passage'}</span>
          </button>
        )}
      </div>
    </motion.div>
  );
}
