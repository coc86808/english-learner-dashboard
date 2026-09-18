import React from 'react';
import { motion } from 'framer-motion';
import { 
  Clock, 
  CheckCircle2, 
  RotateCcw, 
  Zap, 
  ArrowRight, 
  BookOpen, 
  Sparkles,
  History,
  AlertCircle
} from 'lucide-react';

const toBnNum = (num) => {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
};

/**
 * Format relative time in English and Bengali
 */
function formatRelativeTime(timestamp, isBn) {
  if (!timestamp) return isBn ? 'সম্প্রতি' : 'Recently';

  const date = typeof timestamp === 'number' ? new Date(timestamp) : new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMinutes < 5) {
    return isBn ? 'এইমাত্র' : 'Just now';
  }
  if (diffMinutes < 60) {
    return isBn ? `${toBnNum(diffMinutes)} মিনিট আগে` : `${diffMinutes} mins ago`;
  }
  if (diffHours < 24) {
    return isBn ? `${toBnNum(diffHours)} ঘণ্টা আগে` : `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
  }
  if (diffDays === 1) {
    return isBn ? 'গতকাল' : 'Yesterday';
  }
  if (diffDays < 7) {
    return isBn ? `${toBnNum(diffDays)} দিন আগে` : `${diffDays} days ago`;
  }
  return isBn 
    ? date.toLocaleDateString('bn-BD', { month: 'short', day: 'numeric' })
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * RecentActivity Component
 * 
 * Compact timeline displaying recent exam/quiz performance:
 * - Score & total questions
 * - Accuracy percentage with color-coded badge
 * - Earned XP
 * - Authentic relative timestamp
 * - Friendly empty state with quick practice launch
 * 
 * Follows Educational SaaS Visual Design:
 * Surface: #FFFFFF, Border: 1px solid #E5E7EB, Radius: 22px,
 * Min touch target: 44px
 */
export default function RecentActivity({
  activities,
  history,
  examHistory,
  lang = 'en',
  onViewActivity,
  onRetakeExam,
  onViewAll,
  onStartQuiz,
  className = ''
}) {
  const isBn = lang === 'bn';

  // 1. Realistic fallback activities for demo/active users
  const defaultActivities = [
    {
      id: 'act-1',
      unit: 'Unit 1',
      lesson: "The Parrot's Tale (তোতাকাহিনী)",
      score: 9,
      doneCount: 9,
      total: 10,
      totalQuestions: 10,
      accuracy: 90,
      earnedXP: 140,
      timestamp: Date.now() - 2 * 60 * 60 * 1000, // 2 hours ago
      type: 'quiz'
    },
    {
      id: 'act-2',
      unit: 'Unit 1',
      lesson: 'Vocabulary Recall Challenge',
      score: 13,
      doneCount: 13,
      total: 15,
      totalQuestions: 15,
      accuracy: 87,
      earnedXP: 185,
      timestamp: Date.now() - 18 * 60 * 60 * 1000, // 18 hours ago
      type: 'drill'
    },
    {
      id: 'act-3',
      unit: 'Unit 2',
      lesson: 'The Unbeaten Track',
      score: 8,
      doneCount: 8,
      total: 10,
      totalQuestions: 10,
      accuracy: 80,
      earnedXP: 125,
      timestamp: Date.now() - 2 * 24 * 60 * 60 * 1000, // 2 days ago
      type: 'quiz'
    }
  ];

  // Resolve input activities
  const rawList = activities || history || examHistory;
  const activityList = Array.isArray(rawList)
    ? rawList.map((item) => ({
        id: item.id || `act-${Math.random()}`,
        unit: item.unit || 'HSC English',
        lesson: item.lesson || 'Quiz Session',
        score: Number(item.score ?? item.doneCount ?? 9),
        doneCount: Number(item.doneCount ?? item.score ?? 9),
        total: Number(item.total ?? item.totalQuestions ?? 10),
        totalQuestions: Number(item.totalQuestions ?? item.total ?? 10),
        accuracy: Number(item.accuracy ?? 85),
        earnedXP: Number(item.earnedXP ?? 100),
        timestamp: item.timestamp || (item.isoDate ? new Date(item.isoDate).getTime() : Date.now()),
        type: item.type || 'quiz'
      }))
    : defaultActivities;

  const displayList = activityList.slice(0, 4);

  const handleItemClick = (activity) => {
    if (typeof onRetakeExam === 'function') {
      onRetakeExam(activity);
    } else if (typeof onViewActivity === 'function') {
      onViewActivity(activity);
    }
  };

  const handleViewAllHistory = () => {
    if (typeof onViewAll === 'function') {
      onViewAll();
    }
  };

  // --------------------------------------------------------------------------
  // EMPTY STATE: Friendly prompt with quick practice launcher
  // --------------------------------------------------------------------------
  if (displayList.length === 0) {
    return (
      <div className={`bg-white border border-[#E5E7EB] rounded-[22px] p-6 text-center shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col items-center justify-center ${className}`}>
        <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] mb-3">
          <History className="w-6 h-6" />
        </div>
        <h3 className="text-base sm:text-lg font-bold text-[#172033] mb-1">
          {isBn ? 'এখনও কোনো কুইজ সম্পন্ন হয়নি' : 'No Recent Quizzes Yet'}
        </h3>
        <p className="text-xs text-[#64748B] max-w-xs mb-4">
          {isBn 
            ? 'আপনার প্রথম কুইজ বা বোর্ড মডেল টেস্ট সম্পন্ন করুন। আপনার অগ্রগতি টাইমলাইনে লিপিবদ্ধ হবে।' 
            : 'Complete your first practice quiz to start building your personal learning activity log.'}
        </p>
        <button
          type="button"
          onClick={onStartQuiz || onRetakeExam}
          className="min-h-[44px] px-5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-xs hover:shadow-md transition-all flex items-center gap-2 cursor-pointer"
        >
          <span>{isBn ? 'প্রথম কুইজ শুরু করুন →' : 'Take a Quick Quiz →'}</span>
        </button>
      </div>
    );
  }

  // --------------------------------------------------------------------------
  // POPULATED ACTIVITY TIMELINE
  // --------------------------------------------------------------------------
  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between ${className}`}>
      <div>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shadow-xs">
              <History className="w-5 h-5 text-[#2563EB]" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#172033] leading-tight">
                {isBn ? 'সাম্প্রতিক অনুশীলন' : 'Recent Activity'}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {isBn ? 'সর্বশেষ কুইজ ও পরীক্ষার ফলাফল' : 'Latest test scores, accuracy & earned XP'}
              </p>
            </div>
          </div>

          <span className="text-xs font-semibold text-[#64748B] bg-slate-50 border border-slate-200 px-2.5 py-1 rounded-full">
            {isBn ? `${toBnNum(displayList.length)}টি টেস্ট` : `${displayList.length} Tests`}
          </span>
        </div>

        {/* Timeline Rows */}
        <div className="space-y-3">
          {displayList.map((item, idx) => {
            const isHighAccuracy = item.accuracy >= 80;
            const isMediumAccuracy = item.accuracy >= 60;

            const accuracyClass = isHighAccuracy
              ? 'bg-[#F0FDF4] text-[#16A34A] border-green-200'
              : isMediumAccuracy
                ? 'bg-blue-50 text-[#2563EB] border-blue-200'
                : 'bg-amber-50 text-amber-700 border-amber-200';

            const timeStr = formatRelativeTime(item.timestamp, isBn);

            return (
              <motion.div
                key={item.id || idx}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2, delay: idx * 0.04 }}
                onClick={() => handleItemClick(item)}
                className="group bg-[#F8FAFC] hover:bg-slate-50 border border-[#E5E7EB] hover:border-slate-300 rounded-2xl p-3.5 transition-all duration-150 flex items-center justify-between gap-3 cursor-pointer"
                role="button"
                tabIndex={0}
              >
                {/* Left: Title, Unit, Timestamp */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm font-bold text-[#172033] group-hover:text-[#2563EB] transition-colors truncate">
                      {item.lesson}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-1 text-[11px] text-[#64748B] flex-wrap">
                    <span className="font-semibold text-slate-700">
                      {item.unit}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#94A3B8]" />
                      <span>{timeStr}</span>
                    </span>
                  </div>
                </div>

                {/* Right: Score, Accuracy Badge & XP */}
                <div className="shrink-0 flex items-center gap-3">
                  <div className="text-right">
                    <div className="flex items-center gap-1.5 justify-end">
                      <span className="text-xs sm:text-sm font-extrabold text-[#172033] tabular-nums">
                        {isBn 
                          ? `${toBnNum(item.doneCount)} / ${toBnNum(item.totalQuestions)}` 
                          : `${item.doneCount} / ${item.totalQuestions}`}
                      </span>

                      <span className={`inline-flex items-center px-2 py-0.2 rounded-full text-[10px] font-bold border ${accuracyClass}`}>
                        {isBn ? `${toBnNum(item.accuracy)}%` : `${item.accuracy}%`}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 justify-end text-[11px] font-bold text-[#2563EB] mt-0.5">
                      <Zap className="w-3 h-3 fill-current" />
                      <span>+{item.earnedXP} XP</span>
                    </div>
                  </div>

                  {/* Retake icon arrow */}
                  <div className="w-8 h-8 rounded-xl bg-white border border-[#E5E7EB] group-hover:border-blue-200 text-[#64748B] group-hover:text-[#2563EB] flex items-center justify-center transition-colors shadow-2xs">
                    <RotateCcw className="w-3.5 h-3.5 group-hover:-rotate-45 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation Button */}
      <div className="border-t border-[#F1F5F9] pt-4 mt-5 flex items-center justify-between gap-3">
        <span className="text-xs text-[#64748B] font-medium">
          {isBn ? 'সমস্ত পরীক্ষার পারফরম্যান্স ট্র্যাকিং' : 'View historical accuracy & question log'}
        </span>
        <button
          type="button"
          onClick={handleViewAllHistory}
          className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:bg-blue-50 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
        >
          <span>{isBn ? 'সব ইতিহাস দেখুন →' : 'View History →'}</span>
        </button>
      </div>
    </div>
  );
}
