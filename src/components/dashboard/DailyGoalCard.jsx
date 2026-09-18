import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Flame, 
  ArrowRight, 
  CheckCircle2, 
  Zap, 
  Clock, 
  Settings2,
  Sparkles
} from 'lucide-react';

const toBnNum = (n) => String(n ?? '').replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

/**
 * DailyGoalCard Component
 * 
 * Prominent visual card anchoring the student's daily momentum:
 * - Animated progress bar with live percentage
 * - Remaining question counter to motivate completion
 * - Motivational streak prompt
 * - Direct [ Continue Goal → ] CTA
 * - Customizable goal target options (10, 15, 20, 30)
 * 
 * Design Tokens:
 * Surface: #FFFFFF, Border: 1px solid #E5E7EB, Radius: 22px-24px,
 * Primary CTA: #2563EB, Min touch target >= 44px
 */
export default function DailyGoalCard({
  completedToday,
  current,
  dailyTarget,
  dailyGoal,
  target,
  streakDays,
  streak,
  streakCount,
  lang = 'en',
  onContinueGoal,
  onUpdateGoal
}) {
  const isBn = lang === 'bn';
  const [showGoalSelector, setShowGoalSelector] = useState(false);

  // 1. Resolve values from flexible props
  const resolvedCompleted = Number(completedToday ?? current ?? 14);
  const resolvedTarget = Number(dailyTarget ?? dailyGoal ?? target ?? 20);
  const resolvedStreak = Number(streakDays ?? streak ?? streakCount ?? 7);

  const goalPercent = Math.min(100, Math.round((resolvedCompleted / Math.max(1, resolvedTarget)) * 100));
  const remaining = Math.max(0, resolvedTarget - resolvedCompleted);
  const isGoalFinished = resolvedCompleted >= resolvedTarget;

  // Estimated minutes: ~30s per question
  const estMinutes = Math.max(1, Math.round((remaining * 30) / 60));

  const goalOptions = [10, 15, 20, 30];

  const handleSelectTarget = (newTarget) => {
    if (onUpdateGoal) {
      onUpdateGoal(newTarget);
    }
    setShowGoalSelector(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className="bg-white border border-[#E5E7EB] rounded-[22px] sm:rounded-3xl p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)] space-y-5 transition-all"
    >
      {/* Top Header: Title, Icon & Streak Badge */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-[#EFF6FF] border border-blue-100 flex items-center justify-center text-[#2563EB]">
            <Target size={20} />
          </div>
          <div>
            <h3 className="text-base sm:text-lg font-bold text-[#172033] tracking-tight">
              {isBn ? 'আজকের পড়ার লক্ষ্য' : "Today's Learning Goal"}
            </h3>
            <p className="text-xs font-medium text-[#64748B]">
              {isBn ? 'প্রতিদিনের নিয়মিত অনুশীলন সাফল্য এনে দেয়' : 'Consistency is key to HSC board readiness'}
            </p>
          </div>
        </div>

        {/* Top Right Badges */}
        <div className="flex items-center gap-2">
          {onUpdateGoal && (
            <button
              type="button"
              onClick={() => setShowGoalSelector(!showGoalSelector)}
              title="Change Daily Target"
              aria-label="Change Daily Target"
              className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-[#64748B] hover:text-[#172033] transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
            >
              <Settings2 size={16} />
            </button>
          )}

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFBEB] border border-amber-200 text-[#F59E0B] text-xs font-bold">
            <Flame size={14} className="fill-[#F59E0B] text-[#F59E0B]" />
            <span>{isBn ? `${toBnNum(resolvedStreak)} দিন` : `${resolvedStreak}d Streak`}</span>
          </div>
        </div>
      </div>

      {/* Goal Selector Dropdown / Pill Row if open */}
      {showGoalSelector && onUpdateGoal && (
        <div className="bg-[#F8FAFC] border border-slate-200 rounded-xl p-3 flex items-center justify-between gap-2 text-xs">
          <span className="font-semibold text-[#172033]">
            {isBn ? 'দৈনিক প্রশ্নের লক্ষ্য সেট করুন:' : 'Set Daily Target:'}
          </span>
          <div className="flex items-center gap-1.5">
            {goalOptions.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleSelectTarget(opt)}
                aria-label={`Target ${opt} questions`}
                className={`min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-xl font-bold transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2 ${
                  resolvedTarget === opt
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-white border border-slate-200 text-[#64748B] hover:text-[#172033]'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress Numbers & Percentage */}
      <div className="space-y-2">
        <div className="flex items-baseline justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl sm:text-3xl font-extrabold text-[#172033] tracking-tight">
              {isBn ? toBnNum(resolvedCompleted) : resolvedCompleted}
            </span>
            <span className="text-base sm:text-lg font-semibold text-[#64748B]">
              / {isBn ? toBnNum(resolvedTarget) : resolvedTarget} {isBn ? 'প্রশ্ন সম্পন্ন' : 'Questions Completed'}
            </span>
          </div>
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-lg bg-[#EFF6FF] border border-blue-100 text-xs sm:text-sm font-bold text-[#2563EB]">
            {isBn ? toBnNum(goalPercent) : goalPercent}%
          </span>
        </div>

        {/* Visual Progress Bar */}
        <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200/70">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${goalPercent}%` }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className={`h-full rounded-full transition-all duration-300 ${
              isGoalFinished 
                ? 'bg-gradient-to-r from-emerald-500 to-[#16A34A]' 
                : 'bg-gradient-to-r from-[#2563EB] to-indigo-600'
            }`}
          />
        </div>
      </div>

      {/* Motivational Status Box */}
      <div className={`rounded-xl p-3.5 border text-xs sm:text-sm ${
        isGoalFinished
          ? 'bg-[#F0FDF4] border-emerald-200 text-emerald-900'
          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#334155]'
      }`}>
        {isGoalFinished ? (
          <div className="flex items-center gap-2">
            <CheckCircle2 size={16} className="text-[#16A34A] shrink-0" />
            <p className="font-semibold">
              {isBn
                ? '🎉 দারুণ! আজকের দৈনিক লক্ষ্য অর্জিত হয়েছে। অতিরিক্ত অনুশীলনে বোনাস এক্সপি পয়েন্ট পাবেন।'
                : "🎉 Fantastic! You've achieved today's goal! Extra practice earns bonus XP points."}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Zap size={16} className="text-amber-500 shrink-0 fill-amber-500" />
            <p className="font-medium">
              {isBn ? (
                <>আজকের লক্ষ্য পূরণ করতে আর মাত্র <strong className="font-bold text-[#172033]">{toBnNum(remaining)}টি প্রশ্ন</strong> বাকি! স্ট্রিক বাঁচাতে এখনই সম্পন্ন করুন।</>
              ) : (
                <>Only <strong className="font-bold text-[#172033]">{remaining} more questions</strong> to reach your daily goal and protect your {resolvedStreak}-day streak flame 🔥</>
              )}
            </p>
          </div>
        )}
      </div>

      {/* Breakdown Pills: Solved, Remaining, Est Time */}
      <div className="grid grid-cols-3 gap-2 sm:gap-3 text-center">
        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-2.5">
          <span className="block text-[11px] font-semibold text-[#64748B]">
            {isBn ? 'আজ হয়েছে' : 'Done Today'}
          </span>
          <span className="block text-sm sm:text-base font-extrabold text-[#172033] mt-0.5">
            {isBn ? toBnNum(resolvedCompleted) : resolvedCompleted}
          </span>
        </div>

        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-2.5">
          <span className="block text-[11px] font-semibold text-[#64748B]">
            {isBn ? 'বাকি আছে' : 'Remaining'}
          </span>
          <span className="block text-sm sm:text-base font-extrabold text-[#172033] mt-0.5">
            {isBn ? toBnNum(remaining) : remaining}
          </span>
        </div>

        <div className="bg-[#F8FAFC] border border-slate-200/80 rounded-xl p-2.5">
          <span className="block text-[11px] font-semibold text-[#64748B] flex items-center justify-center gap-1">
            <Clock size={11} className="text-[#64748B]" />
            <span>{isBn ? 'সময়' : 'Est. Time'}</span>
          </span>
          <span className="block text-sm sm:text-base font-extrabold text-[#172033] mt-0.5">
            ~{isBn ? toBnNum(estMinutes) : estMinutes} {isBn ? 'মিনিট' : 'mins'}
          </span>
        </div>
      </div>

      {/* Primary CTA Button */}
      <button
        type="button"
        onClick={onContinueGoal}
        className="w-full min-h-[46px] px-5 py-3.5 bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.99] text-white rounded-xl font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
      >
        <span>
          {isGoalFinished
            ? (isBn ? 'অতিরিক্ত অনুশীলন করুন (বোনাস XP)' : 'Practice More (Bonus XP)')
            : (isBn ? 'দৈনিক লক্ষ্য পূরণ করুন' : 'Continue Daily Goal')}
        </span>
        <ArrowRight size={17} className="text-white/80 group-hover:translate-x-1 transition-transform" />
      </button>
    </motion.div>
  );
}
