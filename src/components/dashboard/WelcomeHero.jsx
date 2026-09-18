import React from 'react';
import { motion } from 'framer-motion';
import { 
  Play, 
  Flame, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  Calendar, 
  GraduationCap,
  BookOpen
} from 'lucide-react';

const toBnNum = (n) => String(n ?? '').replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

/**
 * WelcomeHero Component
 * 
 * Top visual anchor of the Student SaaS Command Center:
 * - Dynamic time-of-day greeting (Good morning/afternoon/evening, [Name] 👋)
 * - Weekly study consistency indicator (e.g. 5 of 7 days studied)
 * - Contextual motivation prompt
 * - High-visibility [ Continue Learning → ] primary CTA
 * 
 * Strictly follows Educational SaaS Design Tokens:
 * Surface: #FFFFFF, Border: 1px solid #E5E7EB, Radius: 20-24px,
 * Primary CTA: #2563EB, Text: #172033 & #64748B, Min touch target: 44px
 */
export default function WelcomeHero({
  userName,
  currentUser,
  streakCount,
  weeklyProgress,
  weeklyProgressPct,
  motivationalQuote,
  activeTopic,
  activeSession,
  lang = 'en',
  onContinueLearning,
  onQuickPractice
}) {
  const isBn = lang === 'bn';

  // 1. Resolve student name
  const studentName = userName || currentUser?.name || (isBn ? 'এইচএসসি শিক্ষার্থী' : 'HSC Scholar');

  // 2. Resolve time-of-day greeting
  const currentHour = new Date().getHours();
  let timeGreeting = isBn ? 'শুভ দিন' : 'Good day';
  if (currentHour >= 5 && currentHour < 12) {
    timeGreeting = isBn ? 'শুভ সকাল' : 'Good morning';
  } else if (currentHour >= 12 && currentHour < 17) {
    timeGreeting = isBn ? 'শুভ অপরাহ্ন' : 'Good afternoon';
  } else if (currentHour >= 17 && currentHour < 22) {
    timeGreeting = isBn ? 'শুভ সন্ধ্যা' : 'Good evening';
  } else {
    timeGreeting = isBn ? 'শুভ রাত্রি' : 'Good night';
  }

  // 3. Resolve streak
  const streak = streakCount ?? currentUser?.streak ?? 7;

  // 4. Resolve weekly consistency (default: 5 out of 7 days)
  let activeDaysCount = 5;
  let totalDaysCount = 7;
  let pct = 71;

  if (typeof weeklyProgress === 'string' && weeklyProgress.includes('/')) {
    const parts = weeklyProgress.split('/');
    const parsedDone = parseInt(parts[0], 10);
    const parsedTotal = parseInt(parts[1], 10);
    if (!isNaN(parsedDone) && !isNaN(parsedTotal) && parsedTotal > 0) {
      activeDaysCount = parsedDone;
      totalDaysCount = parsedTotal;
      pct = Math.min(100, Math.round((activeDaysCount / totalDaysCount) * 100));
    }
  } else if (typeof weeklyProgress === 'object' && weeklyProgress !== null) {
    activeDaysCount = weeklyProgress.completed ?? weeklyProgress.current ?? 5;
    totalDaysCount = weeklyProgress.total ?? 7;
    pct = Math.min(100, Math.round((activeDaysCount / totalDaysCount) * 100));
  } else if (typeof weeklyProgressPct === 'number') {
    pct = Math.min(100, Math.max(0, weeklyProgressPct));
    activeDaysCount = Math.round((pct / 100) * 7);
  }

  // Weekly days representation (Sat - Fri in Bangladesh / HSC context)
  const weekDays = [
    { label: isBn ? 'শনি' : 'Sa', active: true },
    { label: isBn ? 'রবি' : 'Su', active: true },
    { label: isBn ? 'সোম' : 'Mo', active: true },
    { label: isBn ? 'মঙ্গল' : 'Tu', active: true },
    { label: isBn ? 'বুধ' : 'We', active: true },
    { label: isBn ? 'বৃহ' : 'Th', active: activeDaysCount >= 6 },
    { label: isBn ? 'শুক্র' : 'Fr', active: activeDaysCount >= 7 }
  ];

  // 5. Contextual motivation
  let promptMessage = motivationalQuote;
  if (!promptMessage) {
    if (streak >= 7) {
      promptMessage = isBn
        ? `টানা ${toBnNum(streak)} দিনের স্ট্রিক! আপনি দেশের সেরা ৫% নিয়মিত শিক্ষার্থীদের একজন। আজ পড়া চালিয়ে যান!`
        : `You're on a ${streak}-day study streak! You rank in the top 5% of dedicated HSC learners. Keep up the great pace!`;
    } else if (streak >= 3) {
      promptMessage = isBn
        ? `টানা ${toBnNum(streak)} দিন পড়ালেখা চলছে! আর অল্প একটু পড়লেই আপনার সাপ্তাহিক মাইলফলক পূর্ণ হবে।`
        : `Outstanding consistency! Complete today's session to protect your streak flame.`;
    } else {
      promptMessage = isBn
        ? 'প্রতিদিনের ছোট ছোট অনুশীলনই এইচএসসি বোর্ড পরীক্ষায় ইংরেজিতে এ+ নিশ্চিত করবে।'
        : 'Daily consistent practice is the proven pathway to an A+ in HSC English 1st & 2nd Paper.';
    }
  }

  // 6. Resolve Active Topic / Session
  const resolvedTopic = activeTopic || (activeSession ? {
    unitNumber: activeSession.unitNumber || 'Unit 1',
    unitTitle: activeSession.unitTitle || 'Education and Life',
    unitTitleBn: activeSession.unitTitleBn || 'শিক্ষা ও জীবন',
    lessonTitle: activeSession.lessonTitle || "The Parrot's Tale",
    lessonTitleBn: activeSession.lessonTitleBn || 'তোতাকাহিনী'
  } : null);

  const topicLabel = resolvedTopic 
    ? (isBn 
        ? `${resolvedTopic.unitNumber || 'ইউনিট ১'} • ${resolvedTopic.lessonTitleBn || resolvedTopic.lessonTitle}` 
        : `${resolvedTopic.unitNumber || 'Unit 1'} • ${resolvedTopic.lessonTitle}`)
    : (isBn ? 'ইউনিট ১ • তোতাকাহিনী' : "Unit 1 • The Parrot's Tale");

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white border border-[#E5E7EB] rounded-[22px] sm:rounded-3xl p-5 sm:p-6 lg:p-7 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)] relative overflow-hidden transition-all"
    >
      {/* Subtle decorative radial gradient in top right for polished SaaS feel */}
      <div className="absolute -right-16 -top-16 w-56 h-56 bg-gradient-to-br from-blue-50/70 via-indigo-50/40 to-transparent rounded-full blur-2xl pointer-events-none" />
      <div className="absolute -left-12 -bottom-12 w-48 h-48 bg-gradient-to-tr from-amber-50/50 via-emerald-50/30 to-transparent rounded-full blur-2xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        {/* Left Column: Greeting, Motivational prompt & weekly progress */}
        <div className="space-y-4 max-w-3xl">
          {/* Top meta row: Badge + Streak pill */}
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-blue-100 text-[#2563EB] text-xs font-bold tracking-wide">
              <GraduationCap size={14} className="text-[#2563EB]" />
              <span>NCTB 2026 HSC ENGLISH</span>
            </span>

            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] border border-amber-200 text-[#F59E0B] text-xs font-bold">
              <Flame size={14} className="fill-[#F59E0B] text-[#F59E0B] animate-pulse" />
              <span>{isBn ? `${toBnNum(streak)} দিন স্ট্রিক` : `${streak}-Day Streak`}</span>
            </div>

            {resolvedTopic && (
              <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[#64748B] text-xs font-medium">
                <BookOpen size={13} className="text-[#64748B]" />
                <span className="truncate max-w-[220px]">{topicLabel}</span>
              </span>
            )}
          </div>

          {/* Main Title / Greeting */}
          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl lg:text-[32px] font-extrabold text-[#172033] tracking-tight leading-snug">
              {timeGreeting}, <span className="text-[#2563EB]">{studentName}</span> 👋
            </h1>
            <p className="text-sm sm:text-[15px] font-medium text-[#64748B] leading-relaxed max-w-2xl">
              {promptMessage}
            </p>
          </div>

          {/* Weekly Consistency Bar */}
          <div className="pt-1 flex flex-wrap items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-xl">
              <Calendar size={14} className="text-[#2563EB]" />
              <span className="text-xs font-semibold text-[#172033]">
                {isBn 
                  ? `এই সপ্তাহে ৭ দিনে ${toBnNum(activeDaysCount)} দিন সম্পন্ন (${toBnNum(pct)}%)`
                  : `${activeDaysCount} of ${totalDaysCount} days studied this week (${pct}%)`}
              </span>
            </div>

            {/* 7-day mini indicator dots */}
            <div className="flex items-center gap-1">
              {weekDays.map((d, idx) => (
                <div
                  key={idx}
                  title={`${d.label}: ${d.active ? 'Studied' : 'Pending'}`}
                  className={`w-6 h-6 rounded-lg text-[10px] font-bold flex items-center justify-center transition-all ${
                    d.active
                      ? 'bg-[#2563EB] text-white shadow-2xs'
                      : 'bg-slate-100 text-slate-400 border border-slate-200/60'
                  }`}
                >
                  {d.label[0]}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column / CTAs */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end justify-center gap-3 lg:min-w-[220px]">
          <button
            type="button"
            onClick={onContinueLearning}
            className="w-full sm:w-auto lg:w-full min-h-[46px] px-6 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white rounded-xl sm:rounded-2xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2.5 cursor-pointer group"
          >
            <Play size={17} className="fill-white text-white group-hover:translate-x-0.5 transition-transform" />
            <span>{isBn ? 'পড়া চালিয়ে যান' : 'Continue Learning'}</span>
            <ArrowRight size={16} className="text-white/80 group-hover:translate-x-1 transition-transform" />
          </button>

          {onQuickPractice && (
            <button
              type="button"
              onClick={onQuickPractice}
              className="w-full sm:w-auto lg:w-full min-h-[44px] px-5 py-2.5 bg-white hover:bg-[#F8FAFC] active:scale-[0.99] border border-[#E5E7EB] hover:border-slate-300 text-[#172033] rounded-xl sm:rounded-2xl font-semibold text-xs sm:text-sm transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-2xs"
            >
              <Zap size={14} className="text-amber-500 fill-amber-500" />
              <span>{isBn ? 'কুইক প্র্যাকটিস (১০ MCQ)' : 'Quick Practice (10 MCQs)'}</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
