import React from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  Flame,
  Brain,
  AlertTriangle
} from 'lucide-react';

const toBnNum = (num) => {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
};

/**
 * PersonalizedInsights Component
 * 
 * Provides dynamic, contextual coaching and feedback cards:
 * 1. Accuracy Spike / Trend (Synonym recall and board pattern recognition)
 * 2. Goal Proximity & XP Velocity (Daily milestone encouragement)
 * 3. Spaced Practice Tip (Active recall timing for long-term retention)
 * 
 * Adheres strictly to Educational SaaS Visual Design System:
 * - Card surface: #FFFFFF, border: 1px solid #E5E7EB, radius: 22px
 * - Dark text: #172033, muted: #64748B
 * - Touch targets: >= 44px
 */
export default function PersonalizedInsights({
  insights,
  accuracy = 84,
  streak = 7,
  completedToday = 14,
  dailyGoal = 20,
  lang = 'en',
  onAction,
  className = ''
}) {
  const isBn = lang === 'bn';

  const remaining = Math.max(0, dailyGoal - completedToday);

  // Dynamic default insights reflecting genuine student state
  const defaultInsights = [
    {
      id: 'insight-accuracy-trend',
      type: 'accuracy',
      theme: 'emerald',
      tag: isBn ? '+১২% বৃদ্ধি' : '+12% This Week',
      tagClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      title: isBn ? 'সিনোনিম রিকলে শক্তিশালী অগ্রগতি' : 'Accuracy Trending Up',
      titleBn: 'সিনোনিম রিকলে শক্তিশালী অগ্রগতি',
      message: isBn
        ? `এই সপ্তাহে আপনার সিনোনিম ও বোর্ড সংজ্ঞায় নির্ভুলতা ${toBnNum(accuracy)}% এ উন্নীত হয়েছে। ইউনিট ১ এর কঠিন শব্দগুলোতে আপনি দারুণ দক্ষতা দেখাচ্ছেন।`
        : `Your accuracy in synonym recognition reached ${accuracy}% this week. Excellent retention on Unit 1 high-frequency words.`,
      actionLabel: isBn ? 'অগ্রগতি ধরে রাখুন' : 'Keep Momentum',
      icon: TrendingUp,
      iconStyle: 'bg-emerald-50 text-emerald-600 border-emerald-100',
      borderAccent: 'border-l-4 border-l-emerald-500'
    },
    {
      id: 'insight-goal-proximity',
      type: 'goal',
      theme: 'blue',
      tag: isBn ? `${toBnNum(remaining)}টি প্রশ্ন বাকি` : `${remaining} MCQs Remaining`,
      tagClass: 'bg-blue-50 text-blue-700 border-blue-200',
      title: isBn ? 'দৈনিক লক্ষ্যমাত্রা অর্জনের পথে' : 'Daily Goal Milestone',
      titleBn: 'দৈনিক লক্ষ্যমাত্রা অর্জনের পথে',
      message: isBn
        ? `আজকের ২০টি প্রশ্নের কোটা পূরণ করতে আর মাত্র ${toBnNum(remaining)}টি প্রশ্ন সমাধান করলেই আপনার ${toBnNum(streak)} দিনের স্ট্রিক সংরক্ষিত হবে এবং +৫০ বোনাস এক্সপি যোগ হবে।`
        : `You are only ${remaining} questions away from reaching today's ${dailyGoal}-question goal. Complete now to protect your ${streak}-day streak!`,
      actionLabel: isBn ? 'লক্ষ্য সম্পূর্ণ করুন' : 'Finish Daily Goal',
      icon: Target,
      iconStyle: 'bg-blue-50 text-[#2563EB] border-blue-100',
      borderAccent: 'border-l-4 border-l-[#2563EB]'
    },
    {
      id: 'insight-spaced-practice',
      type: 'tip',
      theme: 'amber',
      tag: isBn ? 'সক্রিয় রিকল' : 'Spaced Recall Due',
      tagClass: 'bg-amber-50 text-amber-700 border-amber-200',
      title: isBn ? 'দীর্ঘস্থায়ী স্মৃতিতে স্থায়ী করার টিপস' : 'Optimal Review Timing',
      titleBn: 'দীর্ঘস্থায়ী স্মৃতিতে স্থায়ী করার টিপস',
      message: isBn
        ? 'লেসন ১ ও ২ এর গুরুত্বপূর্ণ শব্দগুলো দীর্ঘমেয়াদী স্মৃতিতে রাখতে আজ ৩ মিনিটের একটি সক্রিয় রিকল সেশন সম্পূর্ণ করা অত্যন্ত কার্যকর হবে।'
        : 'Unit 1 vocabulary is now in your optimal spaced repetition window. A quick 3-minute review locks them into permanent exam memory.',
      actionLabel: isBn ? '৩ মিনিটের ড্রিল শুরু করুন' : 'Start 3-Min Drill',
      icon: Lightbulb,
      iconStyle: 'bg-amber-50 text-amber-600 border-amber-100',
      borderAccent: 'border-l-4 border-l-amber-500'
    }
  ];

  const resolvedInsights = (Array.isArray(insights) && insights.length > 0)
    ? insights.map((item, idx) => {
        const fallback = defaultInsights[idx % defaultInsights.length];
        return {
          ...fallback,
          ...item,
          message: item.message || item.desc || fallback.message,
          title: isBn ? (item.titleBn || item.title || fallback.title) : (item.title || fallback.title)
        };
      })
    : defaultInsights;

  const handleAction = (item) => {
    if (typeof item.onAction === 'function') {
      item.onAction(item);
    } else if (typeof onAction === 'function') {
      onAction(item);
    }
  };

  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-100 flex items-center justify-center text-purple-600 shadow-xs">
            <Brain className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold text-[#172033] leading-tight">
              {isBn ? 'ব্যক্তিগত পরামর্শ ও অন্তর্দৃষ্টি' : 'Personalized Insights'}
            </h3>
            <p className="text-xs text-[#64748B] mt-0.5">
              {isBn ? 'আপনার স্টাডি প্যাটার্নের ওপর ভিত্তি করে বাস্তব দিকনির্দেশনা' : 'Smart coaching cues tailored to your learning velocity'}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-[#16A34A] text-xs font-bold shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? 'কোচ সক্রিয়' : 'AI Coach Active'}</span>
        </div>
      </div>

      {/* Insights Cards List */}
      <div className="space-y-3.5">
        {resolvedInsights.map((insight, idx) => {
          const Icon = insight.icon || (
            insight.type === 'accuracy' ? TrendingUp : insight.type === 'goal' ? Target : Lightbulb
          );
          const iconStyle = insight.iconStyle || (
            insight.theme === 'emerald'
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100'
              : insight.theme === 'blue'
                ? 'bg-blue-50 text-[#2563EB] border-blue-100'
                : 'bg-amber-50 text-amber-600 border-amber-100'
          );
          const borderAccent = insight.borderAccent || (
            insight.theme === 'emerald'
              ? 'border-l-4 border-l-emerald-500'
              : insight.theme === 'blue'
                ? 'border-l-4 border-l-[#2563EB]'
                : 'border-l-4 border-l-amber-500'
          );

          return (
            <div
              key={insight.id || `insight-${idx}`}
              className={`group bg-[#F8FAFC] hover:bg-slate-50 border border-[#E5E7EB] hover:border-slate-300 rounded-2xl p-4 transition-all duration-200 shadow-xs ${borderAccent}`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${iconStyle}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-[#172033] group-hover:text-[#2563EB] transition-colors line-clamp-1">
                    {isBn ? (insight.titleBn || insight.title) : insight.title}
                  </h4>
                </div>

                {insight.tag && (
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold border shrink-0 ${insight.tagClass || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    {insight.tag}
                  </span>
                )}
              </div>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-3">
                {isBn ? (insight.descBn || insight.message || insight.desc) : (insight.message || insight.desc)}
              </p>

              {insight.actionLabel && (
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => handleAction(insight)}
                    className="min-h-[44px] px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:bg-blue-50 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{insight.actionLabel}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
