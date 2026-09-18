import React from 'react';
import { 
  BookOpen, 
  Zap, 
  BookMarked, 
  Headphones, 
  Mic, 
  TrendingUp, 
  ArrowRight, 
  Award,
  Sparkles,
  BarChart3
} from 'lucide-react';

const toBnNum = (num) => {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
};

/**
 * SkillProgress Component
 * Visualizes 5 core English competencies for HSC candidates:
 * 1. Vocabulary (Synonyms, Antonyms & Spaced Recall)
 * 2. Grammar & Syntax (Prepositions, Modifiers, Right Forms of Verbs)
 * 3. Reading Comprehension (NCTB textbook passages & bilingual analysis)
 * 4. Listening Readiness (Audio pronunciation & phonetic comprehension)
 * 5. Speaking Fluency (Active verbal recall & fluency readiness)
 *
 * Adheres strictly to Educational SaaS Visual Design System:
 * - Card surface: #FFFFFF, border: 1px solid #E5E7EB, radius: 22px
 * - Clean horizontal progress tracks with smooth colored fills
 * - Touch targets: >= 44px
 */
export default function SkillProgress({
  skills,
  overallReadiness,
  lang = 'en',
  onViewAnalytics,
  className = ''
}) {
  const isBn = lang === 'bn';

  // Base skill definitions
  const baseSkills = [
    {
      id: 'vocabulary',
      key: 'vocabulary',
      name: 'Vocabulary Mastery',
      nameBn: 'ভোকাবুলারি দক্ষতা',
      detail: 'Board Synonyms, Antonyms & Definitions',
      detailBn: 'বোর্ড সিনোনিম, অ্যান্টনিম ও ইংরেজি সংজ্ঞা',
      defaultPct: 82,
      color: 'bg-emerald-500',
      trackColor: 'bg-emerald-50',
      icon: BookOpen,
      iconColor: 'text-emerald-600 bg-emerald-50 border-emerald-100'
    },
    {
      id: 'grammar',
      key: 'grammar',
      name: 'Grammar & Syntax',
      nameBn: 'গ্রামার ও বাক্যগঠন',
      detail: 'Prepositions, Modifiers & Clause Structure',
      detailBn: 'প্রিপজিশন, মডিফায়ার ও বাক্যের নির্ভুলতা',
      defaultPct: 74,
      color: 'bg-[#2563EB]',
      trackColor: 'bg-blue-50',
      icon: Zap,
      iconColor: 'text-[#2563EB] bg-blue-50 border-blue-100'
    },
    {
      id: 'reading',
      key: 'reading',
      name: 'Reading Comprehension',
      nameBn: 'পঠন ও অনুধাবন',
      detail: 'NCTB Passages & Passage Translation',
      detailBn: 'মূল পাঠ্যবইয়ের অনুচ্ছেদ ও অনুবাদ উপলব্ধি',
      defaultPct: 68,
      color: 'bg-amber-500',
      trackColor: 'bg-amber-50',
      icon: BookMarked,
      iconColor: 'text-amber-600 bg-amber-50 border-amber-100'
    },
    {
      id: 'listening',
      key: 'listening',
      name: 'Listening Readiness',
      nameBn: 'উচ্চারণ ও শ্রবণ প্রস্তুতি',
      detail: 'Authentic US/UK Audio Pronunciation',
      detailBn: 'সঠিক আন্তর্জাতিক উচ্চারণ ও অডিও বোধগম্যতা',
      defaultPct: 55,
      color: 'bg-purple-500',
      trackColor: 'bg-purple-50',
      icon: Headphones,
      iconColor: 'text-purple-600 bg-purple-50 border-purple-100'
    },
    {
      id: 'speaking',
      key: 'speaking',
      name: 'Speaking Fluency',
      nameBn: 'মৌখিক সাবলীলতা',
      detail: 'Active Verbal Recall & Contextual Fluency',
      detailBn: 'সক্রিয় মৌখিক স্মরণ ও বাক্যে সাবলীল প্রয়োগ',
      defaultPct: 50,
      color: 'bg-teal-500',
      trackColor: 'bg-teal-50',
      icon: Mic,
      iconColor: 'text-teal-600 bg-teal-50 border-teal-100'
    }
  ];

  // Resolve skill array whether passed as an object or an array
  let skillList = [];
  if (Array.isArray(skills) && skills.length > 0) {
    skillList = skills.map((s, idx) => {
      const match = baseSkills.find(b => b.id === s.id || b.key === s.id || b.key === s.key) || baseSkills[idx % baseSkills.length];
      const pct = typeof s.percentage === 'number' ? s.percentage : (typeof s.percent === 'number' ? s.percent : match.defaultPct);
      return {
        ...match,
        ...s,
        percentage: Math.min(100, Math.max(0, pct))
      };
    });
  } else if (skills && typeof skills === 'object') {
    skillList = baseSkills.map(b => {
      const customVal = skills[b.key] || skills[b.id];
      const pct = typeof customVal === 'number' ? customVal : b.defaultPct;
      return {
        ...b,
        percentage: Math.min(100, Math.max(0, pct))
      };
    });
  } else {
    skillList = baseSkills.map(b => ({
      ...b,
      percentage: b.defaultPct
    }));
  }

  // Calculate overall readiness if not explicitly provided
  const computedOverall = Math.round(
    skillList.reduce((acc, curr) => acc + curr.percentage, 0) / (skillList.length || 1)
  );
  const effectiveOverall = typeof overallReadiness === 'number' ? overallReadiness : computedOverall;

  // Helper for level badges
  const getLevelBadge = (pct) => {
    if (pct >= 80) {
      return {
        label: isBn ? 'উন্নত' : 'Advanced',
        classes: 'bg-emerald-50 text-emerald-700 border-emerald-200'
      };
    }
    if (pct >= 60) {
      return {
        label: isBn ? 'দক্ষ' : 'Proficient',
        classes: 'bg-blue-50 text-blue-700 border-blue-200'
      };
    }
    return {
      label: isBn ? 'চলমান' : 'Building',
      classes: 'bg-amber-50 text-amber-700 border-amber-200'
    };
  };

  return (
    <div className={`bg-white border border-[#E5E7EB] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] flex flex-col justify-between ${className}`}>
      <div>
        {/* Card Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs">
              <BarChart3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold text-[#172033] leading-tight">
                {isBn ? 'দক্ষতা ও প্রস্তুতি প্রগ্রেস' : 'Skill Mastery & Progress'}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {isBn ? '৫টি মূল দক্ষতার সার্বিক মূল্যায়ন' : 'Evaluated across 5 core HSC competencies'}
              </p>
            </div>
          </div>

          {/* Overall Readiness Pill */}
          <div className="flex flex-col items-end">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-blue-100 text-[#2563EB] text-xs font-bold shadow-2xs">
              <Sparkles className="w-3.5 h-3.5 text-[#2563EB]" />
              <span>{isBn ? `${toBnNum(effectiveOverall)}% প্রস্তুতি` : `${effectiveOverall}% Readiness`}</span>
            </div>
            <span className="text-[10px] text-[#94A3B8] font-semibold mt-1">
              {isBn ? 'বোর্ড স্ট্যান্ডার্ড লক্ষ্যমাত্রা: ৮৫%+' : 'Board Target: 85%+'}
            </span>
          </div>
        </div>

        {/* Overall Mini Bar */}
        <div className="mb-6 p-3.5 rounded-2xl bg-[#F8FAFC] border border-[#F1F5F9]">
          <div className="flex items-center justify-between text-xs font-bold text-[#172033] mb-1.5">
            <span className="flex items-center gap-1.5">
              <Award className="w-4 h-4 text-[#2563EB]" />
              {isBn ? 'এইচএসসি পরীক্ষা প্রস্তুতি স্কোর' : 'HSC Exam Readiness Score'}
            </span>
            <span className="text-[#2563EB] font-extrabold text-sm">
              {isBn ? `${toBnNum(effectiveOverall)}%` : `${effectiveOverall}%`}
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-200 overflow-hidden">
            <div 
              className="h-full rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 transition-all duration-700 ease-out"
              style={{ width: `${Math.min(100, Math.max(0, effectiveOverall))}%` }}
              role="progressbar"
              aria-valuenow={effectiveOverall}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        </div>

        {/* Individual Skills List */}
        <div className="space-y-4">
          {skillList.map((skill) => {
            const Icon = skill.icon || BookOpen;
            const badge = getLevelBadge(skill.percentage);
            const displayName = isBn ? (skill.nameBn || skill.name) : skill.name;
            const displayDetail = isBn ? (skill.detailBn || skill.detail) : skill.detail;

            return (
              <div key={skill.id || skill.key} className="space-y-1.5 group">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className={`w-7 h-7 rounded-lg border flex items-center justify-center shrink-0 ${skill.iconColor || 'bg-slate-50 text-slate-600 border-slate-200'}`}>
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs sm:text-sm font-bold text-[#172033] group-hover:text-[#2563EB] transition-colors truncate">
                          {displayName}
                        </span>
                        <span className={`text-[10px] font-bold px-2 py-0.2 rounded-full border ${badge.classes}`}>
                          {badge.label}
                        </span>
                      </div>
                      {displayDetail && (
                        <p className="text-[11px] text-[#64748B] truncate hidden sm:block">
                          {displayDetail}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Percentage label */}
                  <span className="text-xs sm:text-sm font-extrabold text-[#172033] tabular-nums shrink-0">
                    {isBn ? `${toBnNum(skill.percentage)}%` : `${skill.percentage}%`}
                  </span>
                </div>

                {/* Progress track */}
                <div className="w-full h-2.5 rounded-full bg-slate-100 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${skill.color || 'bg-[#2563EB]'} transition-all duration-700 ease-out`}
                    style={{ width: `${Math.min(100, Math.max(0, skill.percentage))}%` }}
                    role="progressbar"
                    aria-valuenow={skill.percentage}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-label={displayName}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Navigation / CTA */}
      <div className="border-t border-[#F1F5F9] pt-4 mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="text-xs text-[#64748B] font-medium text-center sm:text-left">
          {isBn ? 'নিয়মিত অনুশীলনে দক্ষতা আরও উন্নত হবে' : 'Consistent daily quizzes increase retention by +28%'}
        </span>
        <button
          type="button"
          onClick={onViewAnalytics}
          className="min-h-[44px] px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:bg-blue-50/70 transition-colors flex items-center justify-center gap-1.5 cursor-pointer self-stretch sm:self-auto"
        >
          <span>{isBn ? 'পূর্ণাঙ্গ প্রগ্রেস রিপোর্ট →' : 'View Full Analytics →'}</span>
        </button>
      </div>
    </div>
  );
}
