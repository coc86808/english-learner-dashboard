import React from 'react';
import { motion } from 'framer-motion';
import { 
  Target, 
  Flame, 
  CheckCircle2, 
  BookOpen, 
  TrendingUp, 
  Award 
} from 'lucide-react';

const toBnNum = (n) => String(n ?? '').replace(/\d/g, (d) => '০১২৩৪৫৬৭৮৯'[d]);

/**
 * TopStatsSummary Component
 * 
 * 4 compact glanceable summary cards answering "What have I achieved?":
 * 1. Daily Goal (e.g. 14 / 20) with mini progress bar
 * 2. Streak (e.g. 7 Days 🔥) with momentum status
 * 3. Accuracy (e.g. 84%) with board standard threshold
 * 4. Questions Completed (e.g. 420) across all units
 * 
 * Follows Educational SaaS Design System:
 * Surface: #FFFFFF, Border: 1px solid #E5E7EB, Radius: 20px,
 * Subtle shadows, responsive grid reflow, touch targets >= 44px
 */
export default function TopStatsSummary({
  dailyGoal,
  completedToday,
  streak,
  streakCount,
  accuracy = 84,
  questionsCompleted,
  totalQuestionsSolved,
  lang = 'en',
  onCardClick,
  onGoalClick,
  onStreakClick
}) {
  const isBn = lang === 'bn';

  // 1. Resolve Daily Goal values
  let currentGoal = 14;
  let targetGoal = 20;

  if (typeof dailyGoal === 'object' && dailyGoal !== null) {
    if (dailyGoal.current != null) currentGoal = Number(dailyGoal.current);
    if (dailyGoal.target != null) targetGoal = Number(dailyGoal.target);
  } else if (typeof dailyGoal === 'number') {
    targetGoal = dailyGoal;
    if (completedToday != null) currentGoal = Number(completedToday);
  } else if (completedToday != null) {
    currentGoal = Number(completedToday);
  }

  const goalPercent = Math.min(100, Math.round((currentGoal / Math.max(1, targetGoal)) * 100));
  const remainingQuestions = Math.max(0, targetGoal - currentGoal);

  // 2. Resolve Streak Days
  let streakDays = 7;
  if (typeof streak === 'object' && streak !== null && streak.days != null) {
    streakDays = Number(streak.days);
  } else if (streakCount != null) {
    streakDays = Number(streakCount);
  } else if (typeof streak === 'number') {
    streakDays = streak;
  }

  // 3. Resolve Accuracy
  const accuracyNum = Number(accuracy ?? 84);

  // 4. Resolve Solved Count
  const solvedCount = Number(questionsCompleted ?? totalQuestionsSolved ?? 420);

  // 4 Stat Cards Definitions
  const cards = [
    {
      id: 'daily-goal',
      label: isBn ? 'দৈনিক লক্ষ্য' : 'Daily Goal',
      value: isBn ? `${toBnNum(currentGoal)} / ${toBnNum(targetGoal)}` : `${currentGoal} / ${targetGoal}`,
      unit: isBn ? 'প্রশ্ন' : 'Questions',
      subtitle: remainingQuestions > 0 
        ? (isBn ? `আর মাত্র ${toBnNum(remainingQuestions)}টি বাকি` : `${remainingQuestions} questions left`)
        : (isBn ? '🎉 আজকের লক্ষ্য পূর্ণ!' : '🎉 Goal completed!'),
      icon: Target,
      iconBg: 'bg-[#EFF6FF]',
      iconColor: 'text-[#2563EB]',
      hasProgress: true,
      progressPct: goalPercent,
      onClick: onGoalClick || (() => onCardClick?.('daily-goal'))
    },
    {
      id: 'streak',
      label: isBn ? 'টানা স্ট্রিক' : 'Active Streak',
      value: isBn ? `${toBnNum(streakDays)} দিন` : `${streakDays} Days`,
      unit: isBn ? 'অবিরাম' : 'Unbroken',
      subtitle: streakDays >= 7 
        ? (isBn ? 'সেরা ৫% শিক্ষার্থী 🔥' : 'Top 5% consistency 🔥')
        : (isBn ? 'শিখা সচল রাখুন 🔥' : 'Keep it burning 🔥'),
      icon: Flame,
      iconBg: 'bg-[#FFFBEB]',
      iconColor: 'text-[#F59E0B]',
      hasProgress: false,
      onClick: onStreakClick || (() => onCardClick?.('streak'))
    },
    {
      id: 'accuracy',
      label: isBn ? 'সামগ্রিক নির্ভুলতা' : 'Overall Accuracy',
      value: `${isBn ? toBnNum(accuracyNum) : accuracyNum}%`,
      unit: isBn ? 'সঠিক উত্তর' : 'Precision',
      subtitle: accuracyNum >= 80 
        ? (isBn ? 'বোর্ড এ+ স্ট্যান্ডার্ড ✨' : 'Board A+ Standard ✨')
        : (isBn ? 'গড় নির্ভুলতা' : 'Practice to reach 90%'),
      icon: CheckCircle2,
      iconBg: 'bg-[#F0FDF4]',
      iconColor: 'text-[#16A34A]',
      hasProgress: false,
      onClick: () => onCardClick?.('accuracy')
    },
    {
      id: 'solved',
      label: isBn ? 'মোট সমাধানকৃত' : 'Questions Solved',
      value: isBn ? toBnNum(solvedCount) : String(solvedCount),
      unit: isBn ? 'এমসিকিউ' : 'Board MCQs',
      subtitle: isBn ? 'এনসিটিবি পাঠ্যক্রম' : 'NCTB Curriculum',
      icon: BookOpen,
      iconBg: 'bg-[#FAF5FF]',
      iconColor: 'text-purple-600',
      hasProgress: false,
      onClick: () => onCardClick?.('solved')
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card, idx) => {
        const IconComponent = card.icon;
        return (
          <motion.div
            key={card.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: idx * 0.05, ease: 'easeOut' }}
            onClick={card.onClick}
            role="button"
            tabIndex={0}
            className="bg-white border border-[#E5E7EB] hover:border-slate-300 rounded-[20px] p-5 shadow-[0_2px_8px_rgba(0,0,0,0.03),0_1px_2px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] hover:-translate-y-0.5 transition-all duration-200 cursor-pointer flex flex-col justify-between group min-h-[118px]"
          >
            {/* Top row: Label & Icon */}
            <div className="flex items-center justify-between gap-2">
              <span className="text-xs font-semibold text-[#64748B] tracking-wide">
                {card.label}
              </span>
              <div className={`w-9 h-9 rounded-xl ${card.iconBg} ${card.iconColor} flex items-center justify-center transition-transform group-hover:scale-105 duration-200`}>
                <IconComponent size={18} className={card.id === 'streak' ? 'fill-[#F59E0B]' : ''} />
              </div>
            </div>

            {/* Main Value & Unit */}
            <div className="mt-2.5">
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-[28px] font-extrabold text-[#172033] tracking-tight leading-none">
                  {card.value}
                </span>
                <span className="text-xs font-medium text-[#64748B]">
                  {card.unit}
                </span>
              </div>

              {/* Progress bar for Daily Goal card */}
              {card.hasProgress ? (
                <div className="mt-2.5 space-y-1">
                  <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${card.progressPct}%` }}
                      transition={{ duration: 0.6, ease: 'easeOut' }}
                      className="h-full bg-[#2563EB] rounded-full"
                    />
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-[#64748B] font-medium pt-0.5">
                    <span>{card.subtitle}</span>
                    <span className="font-bold text-[#2563EB]">{card.progressPct}%</span>
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-[11px] font-medium text-[#64748B] flex items-center gap-1">
                  <span>{card.subtitle}</span>
                </div>
              )}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
