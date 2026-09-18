import React from 'react';
import { motion } from 'framer-motion';
import { 
  Flame, 
  BookOpen, 
  Trophy, 
  Target, 
  Zap, 
  Award, 
  CheckCircle2, 
  Lock, 
  Sparkles, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

const toBnNum = (num) => {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
};

/**
 * AchievementsWidget Component
 * 
 * Displays 5 core rewarding achievement badges:
 * 1. 7-Day Streak 🔥
 * 2. 100 Questions Solved 📚
 * 3. Vocabulary Master 🏆
 * 4. 90% Accuracy 🎯
 * 5. Fast Solver ⚡
 * 
 * Features:
 * - Unlocked vs In-Progress visual states
 * - Circular SVG / linear progress indicators
 * - Clear criteria descriptions and milestone feedback
 * - Educational SaaS visual design: #FFFFFF surface, #E5E7EB border, 22px radius
 */
export default function AchievementsWidget({
  achievements,
  streak,
  streakCount,
  points,
  totalSolved,
  totalQuestions,
  masteredWordsCount,
  accuracy,
  testsCompleted,
  lang = 'en',
  onViewCertificates,
  onViewAll,
  className = ''
}) {
  const isBn = lang === 'bn';

  // 1. Resolve numeric metrics from flexible props
  const resolvedStreak = Number(streakCount ?? streak ?? 7);
  const resolvedSolved = Number(totalSolved ?? totalQuestions ?? 420);
  const resolvedMastered = Number(masteredWordsCount ?? 85);
  const resolvedAccuracy = Number(accuracy ?? 84);
  const resolvedTests = Number(testsCompleted ?? 28);

  // 2. Default 5 Rewarding Badges
  const defaultBadges = [
    {
      id: 'badge-7-streak',
      title: isBn ? '৭ দিনের স্ট্রিক' : '7-Day Streak',
      titleBn: '৭ দিনের স্ট্রিক',
      desc: isBn ? 'টানা ৭ দিন বিরতিহীন পড়াশোনা সম্পন্ন করুন' : 'Study 7 consecutive days without breaking streak',
      descBn: 'টানা ৭ দিন বিরতিহীন পড়াশোনা সম্পন্ন করুন',
      icon: Flame,
      theme: 'amber',
      iconColor: 'text-[#F59E0B]',
      iconBg: 'bg-[#FFFBEB] border-amber-200',
      unlocked: resolvedStreak >= 7,
      currentVal: Math.min(7, resolvedStreak),
      targetVal: 7,
      unit: isBn ? 'দিন' : 'Days',
      progressPct: Math.min(100, Math.round((Math.min(7, resolvedStreak) / 7) * 100))
    },
    {
      id: 'badge-100-solved',
      title: isBn ? '১০০ প্রশ্ন সমাধান' : '100 Questions Solved',
      titleBn: '১০০ প্রশ্ন সমাধান',
      desc: isBn ? 'বোর্ড স্ট্যান্ডার্ড ১০০টি এমসিকিউ সফলভাবে সমাধান করুন' : 'Solve 100 board-standard MCQs across any lessons',
      descBn: 'বোর্ড স্ট্যান্ডার্ড ১০০টি এমসিকিউ সফলভাবে সমাধান করুন',
      icon: BookOpen,
      theme: 'blue',
      iconColor: 'text-[#2563EB]',
      iconBg: 'bg-[#EFF6FF] border-blue-200',
      unlocked: resolvedSolved >= 100,
      currentVal: Math.min(100, resolvedSolved),
      targetVal: 100,
      unit: isBn ? 'প্রশ্ন' : 'MCQs',
      progressPct: Math.min(100, Math.round((Math.min(100, resolvedSolved) / 100) * 100))
    },
    {
      id: 'badge-vocab-master',
      title: isBn ? 'ভোকাবুলারি মাস্টার' : 'Vocabulary Master',
      titleBn: 'ভোকাবুলারি মাস্টার',
      desc: isBn ? '২৫টি ভিন্ন শব্দ কুইজে ৫ বার করে সঠিকভাবে উত্তর দিয়ে আয়ত্তে আনুন' : 'Master 25 unique words by answering correctly 5 times in MCQ',
      descBn: '২৫টি ভিন্ন শব্দ কুইজে ৫ বার করে সঠিকভাবে উত্তর দিয়ে আয়ত্তে আনুন',
      icon: Trophy,
      theme: 'emerald',
      iconColor: 'text-[#16A34A]',
      iconBg: 'bg-[#F0FDF4] border-green-200',
      unlocked: resolvedMastered >= 25,
      currentVal: Math.min(25, resolvedMastered),
      targetVal: 25,
      unit: isBn ? 'শব্দ' : 'Words',
      progressPct: Math.min(100, Math.round((Math.min(25, resolvedMastered) / 25) * 100))
    },
    {
      id: 'badge-90-accuracy',
      title: isBn ? '৯০% নির্ভুলতা' : '90% Accuracy',
      titleBn: '৯০% নির্ভুলতা',
      desc: isBn ? 'পরীক্ষায় সামগ্রিক নির্ভুলতা ৯০% বা তার বেশিতে উন্নীত করুন' : 'Attain an overall accuracy of 90% or higher in practice exams',
      descBn: 'পরীক্ষায় সামগ্রিক নির্ভুলতা ৯০% বা তার বেশিতে উন্নীত করুন',
      icon: Target,
      theme: 'purple',
      iconColor: 'text-purple-600',
      iconBg: 'bg-purple-50 border-purple-200',
      unlocked: resolvedAccuracy >= 90,
      currentVal: Math.min(90, resolvedAccuracy),
      targetVal: 90,
      unit: '%',
      progressPct: Math.min(100, Math.round((Math.min(90, resolvedAccuracy) / 90) * 100))
    },
    {
      id: 'badge-fast-solver',
      title: isBn ? 'দ্রুত সমাধানকারী' : 'Fast Solver',
      titleBn: 'দ্রুত সমাধানকারী',
      desc: isBn ? '৫টি কুইজ গতির বোনাসসহ নির্ধারিত সময়ের আগেই সম্পন্ন করুন' : 'Complete 5 timed quizzes with speed and precision bonus',
      descBn: '৫টি কুইজ গতির বোনাসসহ নির্ধারিত সময়ের আগেই সম্পন্ন করুন',
      icon: Zap,
      theme: 'cyan',
      iconColor: 'text-teal-600',
      iconBg: 'bg-teal-50 border-teal-200',
      unlocked: resolvedTests >= 5,
      currentVal: Math.min(5, resolvedTests),
      targetVal: 5,
      unit: isBn ? 'কুইজ' : 'Quizzes',
      progressPct: Math.min(100, Math.round((Math.min(5, resolvedTests) / 5) * 100))
    }
  ];

  // 3. Resolve achievements list
  const badgeList = (Array.isArray(achievements) && achievements.length > 0)
    ? achievements.map((custom, idx) => {
        const fallback = defaultBadges[idx % defaultBadges.length];
        return {
          ...fallback,
          ...custom,
          icon: custom.icon || fallback.icon,
          unlocked: custom.unlocked !== undefined ? Boolean(custom.unlocked) : fallback.unlocked
        };
      })
    : defaultBadges;

  const unlockedCount = badgeList.filter((b) => b.unlocked).length;
  const totalBadges = badgeList.length;

  const handleViewAction = () => {
    if (typeof onViewCertificates === 'function') {
      onViewCertificates();
    } else if (typeof onViewAll === 'function') {
      onViewAll();
    }
  };

  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between ${className}`}>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-100 flex items-center justify-center text-[#F59E0B] shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#172033] leading-tight">
                {isBn ? 'অর্জন ও ব্যাজ' : 'Achievements & Badges'}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {isBn ? 'নিয়মিত পড়াশোনায় আনলক করুন সম্মানজনক ব্যাজ' : 'Earn rewarding milestones through active study'}
              </p>
            </div>
          </div>

          {/* Unlocked Count Pill */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16A34A] text-xs font-bold shadow-2xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>
              {isBn 
                ? `${toBnNum(unlockedCount)}/${toBnNum(totalBadges)} আনলকড` 
                : `${unlockedCount}/${totalBadges} Unlocked`}
            </span>
          </div>
        </div>

        {/* Badges List */}
        <div className="space-y-3">
          {badgeList.map((badge, idx) => {
            const Icon = badge.icon || Award;
            const isUnlocked = Boolean(badge.unlocked);

            return (
              <motion.div
                key={badge.id || `badge-${idx}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: idx * 0.04 }}
                className={`p-3.5 rounded-2xl border transition-all duration-200 flex items-center justify-between gap-3 ${
                  isUnlocked
                    ? 'bg-[#F8FAFC] hover:bg-slate-50 border-slate-200 shadow-2xs'
                    : 'bg-white hover:bg-[#F8FAFC] border-[#E5E7EB] opacity-90'
                }`}
              >
                {/* Left: Badge Icon with status indicator */}
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="relative shrink-0">
                    <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center transition-transform ${
                      isUnlocked
                        ? `${badge.iconBg} ${badge.iconColor} shadow-xs`
                        : 'bg-slate-100 border-slate-200 text-slate-400'
                    }`}>
                      <Icon className={`w-5 h-5 ${isUnlocked && badge.theme === 'amber' ? 'fill-current' : ''}`} />
                    </div>

                    {/* Checkmark or Lock Pill */}
                    {isUnlocked ? (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#16A34A] text-white flex items-center justify-center border-2 border-white shadow-xs">
                        <CheckCircle2 className="w-3 h-3" />
                      </div>
                    ) : (
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-slate-300 text-slate-600 flex items-center justify-center border-2 border-white">
                        <Lock className="w-2.5 h-2.5" />
                      </div>
                    )}
                  </div>

                  {/* Center: Title & Description */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className={`text-xs sm:text-sm font-bold truncate ${
                        isUnlocked ? 'text-[#172033]' : 'text-[#475569]'
                      }`}>
                        {isBn ? (badge.titleBn || badge.title) : badge.title}
                      </h4>
                      {isUnlocked && (
                        <span className="hidden sm:inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-bold bg-[#F0FDF4] text-[#16A34A] border border-green-200">
                          {isBn ? 'অর্জিত' : 'Unlocked'}
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#64748B] line-clamp-1 mt-0.5">
                      {isBn ? (badge.descBn || badge.desc) : badge.desc}
                    </p>

                    {/* Linear Progress for In-Progress items */}
                    {!isUnlocked && (
                      <div className="mt-1.5 flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#2563EB] rounded-full transition-all duration-500"
                            style={{ width: `${badge.progressPct}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-semibold text-[#64748B] shrink-0">
                          {isBn 
                            ? `${toBnNum(badge.currentVal)}/${toBnNum(badge.targetVal)} ${badge.unit}`
                            : `${badge.currentVal}/${badge.targetVal} ${badge.unit}`}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right: Status badge */}
                <div className="shrink-0 text-right">
                  {isUnlocked ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-[#16A34A]">
                      <Sparkles className="w-3 h-3 text-[#F59E0B]" />
                      <span>{isBn ? '১০০%' : '100%'}</span>
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-[#64748B]">
                      {isBn ? `${toBnNum(badge.progressPct)}%` : `${badge.progressPct}%`}
                    </span>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation / CTA */}
      <div className="border-t border-[#F1F5F9] pt-4 mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-[#64748B] font-medium">
          {isBn ? 'সার্টিফিকেট ও সনদপত্র দেখার সুযোগ' : 'Qualify for official unit completion certificates'}
        </span>
        <button
          type="button"
          onClick={handleViewAction}
          className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>{isBn ? 'সনদ ও সম্মাননা →' : 'View Honors →'}</span>
        </button>
      </div>
    </div>
  );
}
