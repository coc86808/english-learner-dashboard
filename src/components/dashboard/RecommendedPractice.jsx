import React from 'react';
import { 
  BookOpen, 
  Zap, 
  BookMarked, 
  ArrowRight, 
  Sparkles, 
  CheckCircle2, 
  Clock, 
  Compass, 
  Award,
  ChevronRight
} from 'lucide-react';

const toBnNum = (num) => {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
};

/**
 * RecommendedPractice Component
 * Displays 3 curated, high-yield action cards:
 * 1. Vocabulary Challenge (Board Exam high-frequency words)
 * 2. Grammar Practice (HSC rules, Prepositions, Modifiers)
 * 3. Reading Passage (NCTB textbook comprehension & translation)
 *
 * Adheres strictly to Educational SaaS Visual Design System:
 * - Card surface: #FFFFFF, border: 1px solid #E5E7EB, radius: 22px
 * - Primary CTA: #2563EB (hover #1D4ED8)
 * - Touch targets: >= 44px
 */
export default function RecommendedPractice({
  recommendations,
  items,
  lang = 'en',
  onStartPractice,
  onLaunchPractice,
  onLaunch,
  className = ''
}) {
  const isBn = lang === 'bn';

  // Support all caller callback conventions
  const handleLaunch = (item) => {
    if (typeof onStartPractice === 'function') {
      onStartPractice(item);
    } else if (typeof onLaunchPractice === 'function') {
      onLaunchPractice(item);
    } else if (typeof onLaunch === 'function') {
      onLaunch(item.type || item.id || item);
    }
  };

  // Authoritative default recommendations matching NCTB curriculum
  const defaultItems = [
    {
      id: 'rec-vocab-challenge',
      type: 'vocab',
      title: isBn ? 'ভোকাবুলারি রিকল ড্রিল' : 'Vocabulary Recall Challenge',
      category: isBn ? 'বোর্ড সিনোনিম ও অ্যান্টনিম' : 'Board Synonyms & Antonyms',
      badge: isBn ? 'উচ্চ অগ্রাধিকার' : 'High Yield',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      questionCount: 15,
      questionCountText: isBn ? '১৫টি প্রশ্ন • মাঝারি' : '15 Questions • Medium',
      estimatedMinutes: 6,
      difficulty: isBn ? 'মাঝারি' : 'Medium',
      difficultyBadge: 'bg-emerald-50 text-emerald-700 border-emerald-200',
      reason: isBn 
        ? 'বোর্ড পরীক্ষায় বারবার আসা গুরুত্বপূর্ণ শব্দের ওপর ভিত্তি করে তৈরি'
        : 'Spaced recall drill focused on high-frequency board exam vocabulary',
      actionLabel: isBn ? 'ড্রিল শুরু করুন' : 'Start Challenge',
      icon: BookOpen,
      iconTheme: 'bg-emerald-50 text-emerald-600 border-emerald-100'
    },
    {
      id: 'rec-grammar-board',
      type: 'grammar',
      title: isBn ? 'বোর্ড স্ট্যান্ডার্ড গ্রামার ড্রিল' : 'Grammar & Sentence Drill',
      category: isBn ? 'এইচএসসি প্রশ্ন প্যাটার্ন' : 'Prepositions & Modifiers',
      badge: isBn ? 'বোর্ড ফোকাস' : 'Board Focus',
      badgeClass: 'bg-blue-50 text-blue-700 border-blue-200',
      questionCount: 10,
      questionCountText: isBn ? '১০টি প্রশ্ন • বোর্ড লেভেল' : '10 Questions • Board Level',
      estimatedMinutes: 5,
      difficulty: isBn ? 'বোর্ড স্ট্যান্ডার্ড' : 'Board Standard',
      difficultyBadge: 'bg-blue-50 text-blue-700 border-blue-200',
      reason: isBn 
        ? 'ইংরেজি সংজ্ঞা ও বাক্যে নির্ভুল প্রয়োগের দক্ষতা বৃদ্ধি করতে'
        : 'Reinforce contextual definitions, modifiers and verb form accuracy',
      actionLabel: isBn ? 'অনুশীলন শুরু করুন' : 'Practice Now',
      icon: Zap,
      iconTheme: 'bg-blue-50 text-blue-600 border-blue-100'
    },
    {
      id: 'rec-textbook-reading',
      type: 'reading',
      title: isBn ? 'পাঠ্যবই রিডিং ও অনুবাদ' : 'NCTB Passage Reader',
      category: isBn ? 'ইউনিট ১ • তোতাকাহিনী' : "Unit 1 • The Parrot's Tale",
      badge: isBn ? 'মূল পাঠ্যবই' : 'Core Passage',
      badgeClass: 'bg-amber-50 text-amber-700 border-amber-200',
      questionCount: 4,
      questionCountText: isBn ? '৪টি প্যারাগ্রাফ • দ্বৈত ভাষা' : '4 Paragraphs • Bilingual',
      estimatedMinutes: 8,
      difficulty: isBn ? 'এনসিটিবি পাঠ্যবই' : 'Curriculum',
      difficultyBadge: 'bg-amber-50 text-amber-700 border-amber-200',
      reason: isBn 
        ? 'তোতাকাহিনী অনুচ্ছেদ ও ৫১টি হাইলাইটেড কি-ওয়ার্ড সক্রিয় রিডিং'
        : 'Read authentic passage with 51 highlighted keywords & bilingual translation',
      actionLabel: isBn ? 'প্যাসেজ পড়ুন' : 'Read Passage',
      icon: BookMarked,
      iconTheme: 'bg-amber-50 text-amber-600 border-amber-100',
      unitId: 'unit-1',
      lessonId: 'u1-l1'
    }
  ];

  // Resolve input items or fallback to defaults
  const resolvedItems = (items && items.length > 0) 
    ? items 
    : (recommendations && recommendations.length > 0) 
      ? recommendations 
      : defaultItems;

  return (
    <section className={`space-y-4 ${className}`} aria-label="Recommended Practice Section">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-[#2563EB] shadow-xs">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl sm:text-[22px] font-bold text-[#172033] tracking-tight leading-tight">
              {isBn ? 'প্রস্তাবিত অনুশীলন' : 'Recommended Practice'}
            </h2>
            <p className="text-xs sm:text-sm text-[#64748B] mt-0.5">
              {isBn 
                ? 'আপনার পারফরম্যান্স ও বোর্ড পরীক্ষার প্যাটার্ন অনুযায়ী নির্বাচিত' 
                : 'Curated based on your recent activity and high-yield board topics'}
            </p>
          </div>
        </div>

        {/* Milestone badge */}
        <div className="self-start sm:self-auto inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#EFF6FF] border border-blue-100 text-[#2563EB] text-xs font-semibold">
          <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
          <span>
            {isBn 
              ? `${toBnNum(resolvedItems.length)}টি বিশেষ ড্রিল` 
              : `${resolvedItems.length} High-Yield Drills`}
          </span>
        </div>
      </div>

      {/* 3 Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {resolvedItems.map((item, idx) => {
          const Icon = item.icon || (item.type === 'vocab' ? BookOpen : item.type === 'grammar' ? Zap : BookMarked);
          const iconTheme = item.iconTheme || (
            item.type === 'vocab' 
              ? 'bg-emerald-50 text-emerald-600 border-emerald-100' 
              : item.type === 'grammar'
                ? 'bg-blue-50 text-blue-600 border-blue-100'
                : 'bg-amber-50 text-amber-600 border-amber-100'
          );

          const difficultyBadge = item.difficultyBadge || item.badgeClass || 'bg-slate-100 text-slate-700 border-slate-200';

          return (
            <div
              key={item.id || `rec-${idx}`}
              className="group bg-white border border-[#E5E7EB] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_24px_rgba(0,0,0,0.06)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                {/* Top Row: Category + Difficulty Badges */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <span className="inline-flex items-center text-[11px] font-bold uppercase tracking-wider text-[#64748B] truncate">
                    {item.category || (isBn ? 'বোর্ড প্রস্তুতি' : 'HSC Prep')}
                  </span>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${difficultyBadge}`}>
                    {item.difficulty || item.badge || (isBn ? 'স্ট্যান্ডার্ড' : 'Standard')}
                  </span>
                </div>

                {/* Card Title & Icon */}
                <div className="flex items-start gap-3.5 mb-3">
                  <div className={`w-11 h-11 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform duration-200 ${iconTheme}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="text-base sm:text-lg font-bold text-[#172033] leading-snug group-hover:text-[#2563EB] transition-colors duration-200 line-clamp-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-xs text-[#64748B] font-medium mt-1">
                      <span className="inline-flex items-center gap-1 font-semibold text-[#172033]">
                        {item.questionCountText || (
                          isBn 
                            ? `${toBnNum(item.questionCount || 10)}টি প্রশ্ন` 
                            : `${item.questionCount || 10} Questions`
                        )}
                      </span>
                      {item.estimatedMinutes && (
                        <span className="inline-flex items-center gap-1 text-[#64748B]">
                          <Clock className="w-3.5 h-3.5" />
                          <span>~{isBn ? toBnNum(item.estimatedMinutes) : item.estimatedMinutes} {isBn ? 'মিনিট' : 'mins'}</span>
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Recommendation Reason Block */}
                <div className="bg-[#F8FAFC] border border-[#F1F5F9] rounded-xl p-3 mb-5 text-xs text-[#475569] leading-relaxed flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563EB] shrink-0 mt-0.5" />
                  <p className="line-clamp-2">
                    {item.reason}
                  </p>
                </div>
              </div>

              {/* Bottom CTA Action Button */}
              <button
                type="button"
                onClick={() => handleLaunch(item)}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white text-sm font-bold shadow-xs hover:shadow-md transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer"
                aria-label={`${item.actionLabel || (isBn ? 'অনুশীলন শুরু করুন' : 'Start Practice')} - ${item.title}`}
              >
                <span>{item.actionLabel || (isBn ? 'অনুশীলন শুরু করুন' : 'Start Practice')}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
