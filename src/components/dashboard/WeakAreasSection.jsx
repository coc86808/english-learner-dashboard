import React from 'react';
import { 
  AlertCircle, 
  RotateCcw, 
  CheckCircle2, 
  Play, 
  Layers, 
  Volume2, 
  ArrowRight, 
  Sparkles, 
  Trophy, 
  ExternalLink,
  BookOpen
} from 'lucide-react';

const toBnNum = (num) => {
  if (num === null || num === undefined) return '';
  const bnDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
  return String(num).replace(/[0-9]/g, (d) => bnDigits[Number(d)]);
};

/**
 * WeakAreasSection ("Areas to Improve")
 * 
 * Identifies low-performing vocabulary items or topics linked to student's 
 * weakWords list (words with 3+ mistakes in quizzes).
 * 
 * Mandated Rules:
 * - 3 Mistakes Threshold: flagged as Weak Word.
 * - 5 Correct Answers Threshold: auto mastery / recovered.
 * - Graceful empty/mastered state: "Zero Weak Words! All Mastered 🎉"
 * - Adheres to Educational SaaS Visual Design System: #FFFFFF card, #E5E7EB border, 22px radius, min-h-[44px] touch targets.
 */
export default function WeakAreasSection({
  weakWords = [],
  lang = 'en',
  onPracticeWord,
  onPracticeWeakWords,
  onReviewAllWeakWords,
  onViewAllWeakWords,
  onReviewHub,
  onOpenFlashcards,
  className = ''
}) {
  const isBn = lang === 'bn';

  // Normalize input words: support both strings ('ephemeral') and objects ({ word: '...', ... })
  const effectiveWeakWords = (Array.isArray(weakWords) ? weakWords : [])
    .filter(item => Boolean(item && (typeof item === 'string' ? item.trim() : item.word)))
    .map(item => {
      if (typeof item === 'string') {
        return {
          id: item,
          word: item,
          bengaliMeaning: '',
          mistakeCount: 3,
          correctStreak: 0,
          unit: 'HSC Core'
        };
      }
      return {
        id: item.id || item.word,
        word: item.word,
        bengaliMeaning: item.bengaliMeaning || item.bangla || '',
        mistakeCount: item.mistakeCount || item.mistakes || 3,
        correctStreak: item.correctStreak || item.correctCount || 0,
        unit: item.unit || item.lesson || 'HSC Vocabulary',
        synonyms: item.synonyms || '',
        antonyms: item.antonyms || ''
      };
    });

  const handleSpeak = (e, text) => {
    e.stopPropagation();
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.85;
      utterance.lang = 'en-US';
      window.speechSynthesis.speak(utterance);
    }
  };

  const handlePracticeAll = () => {
    if (typeof onPracticeWeakWords === 'function') {
      onPracticeWeakWords();
    } else if (typeof onReviewAllWeakWords === 'function') {
      onReviewAllWeakWords();
    } else if (typeof onViewAllWeakWords === 'function') {
      onViewAllWeakWords();
    } else if (typeof onPracticeWord === 'function' && effectiveWeakWords.length > 0) {
      onPracticeWord(effectiveWeakWords[0]);
    }
  };

  const handleReviewHub = () => {
    if (typeof onReviewHub === 'function') {
      onReviewHub();
    } else if (typeof onOpenFlashcards === 'function') {
      onOpenFlashcards();
    } else if (typeof onViewAllWeakWords === 'function') {
      onViewAllWeakWords();
    }
  };

  // --------------------------------------------------------------------------
  // GRACEFUL EMPTY / MASTERED STATE ("Zero Weak Words! All Mastered 🎉")
  // --------------------------------------------------------------------------
  if (effectiveWeakWords.length === 0) {
    return (
      <section 
        className={`bg-white border border-[#E5E7EB] rounded-[22px] p-6 sm:p-8 shadow-[0_2px_8px_rgba(0,0,0,0.03)] text-center flex flex-col items-center justify-center ${className}`}
        aria-label="Areas to Improve - All Mastered"
      >
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 border border-emerald-100 flex items-center justify-center text-[#16A34A] mb-4 shadow-xs">
          <Trophy className="w-8 h-8 text-[#16A34A]" />
        </div>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F0FDF4] border border-green-200 text-[#16A34A] text-xs font-bold mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isBn ? '১০০% আয়ত্তকৃত' : '100% Retained'}</span>
        </div>

        <h3 className="text-xl sm:text-2xl font-extrabold text-[#172033] tracking-tight mb-2">
          {isBn ? 'সব দুর্বল শব্দ উত্তীর্ণ! অভিনন্দন 🎉' : 'Zero Weak Words! All Mastered 🎉'}
        </h3>

        <p className="text-xs sm:text-sm text-[#64748B] max-w-md mx-auto mb-6 leading-relaxed">
          {isBn
            ? 'আপনার কোনো চিহ্নিত দুর্বল শব্দ নেই। চমৎকার নির্ভুলতা! নিয়মিত নতুন লেসনের কুইজে অংশ নিয়ে বোর্ড পরীক্ষার জন্য প্রস্তুতি সুরক্ষিত রাখুন।'
            : 'You currently have zero weak words flagged. Excellent retention! Keep taking practice quizzes to discover new high-frequency board words.'}
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePracticeAll}
            className="w-full sm:w-auto min-h-[44px] px-6 py-2.5 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            <span>{isBn ? 'নতুন শব্দ অনুশীলন করুন →' : 'Practice New Words →'}</span>
          </button>

          <button
            type="button"
            onClick={handleReviewHub}
            className="w-full sm:w-auto min-h-[44px] px-5 py-2.5 rounded-xl border border-[#E5E7EB] bg-white hover:bg-[#F8FAFC] text-[#172033] text-sm font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
          >
            <Layers className="w-4 h-4 text-[#64748B]" />
            <span>{isBn ? 'ফ্ল্যাশকার্ড ব্রাউজ করুন' : 'Browse Flashcards'}</span>
          </button>
        </div>
      </section>
    );
  }

  // --------------------------------------------------------------------------
  // POPULATED STATE: Displays weak items with mistake counts & recovery loop
  // --------------------------------------------------------------------------
  // Display top 3-4 weak words
  const displayWords = effectiveWeakWords.slice(0, 4);

  return (
    <section 
      className={`bg-white border border-[#E5E7EB] rounded-[22px] p-5 sm:p-6 shadow-[0_2px_8px_rgba(0,0,0,0.03)] ${className}`}
      aria-label="Areas to Improve - Weak Words"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-rose-50 border border-rose-100 flex items-center justify-center text-rose-600 shadow-xs">
            <RotateCcw className="w-5 h-5 text-rose-600" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl sm:text-[22px] font-bold text-[#172033] leading-tight">
                {isBn ? 'উন্নতির ক্ষেত্রসমূহ' : 'Areas to Improve'}
              </h2>
              <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                {isBn ? `${toBnNum(effectiveWeakWords.length)}টি শব্দ` : `${effectiveWeakWords.length} Words`}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5">
              {isBn 
                ? '৩ বার ভুল হওয়া শব্দ। ৫ বার সঠিক উত্তর দিয়ে আয়ত্তে আনুন।' 
                : 'Words with 3+ mistakes. Answer correctly 5 times in MCQ to clear.'}
            </p>
          </div>
        </div>

        {/* Practice All Weak Words Button */}
        <button
          type="button"
          onClick={handlePracticeAll}
          className="min-h-[44px] px-4 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] active:scale-[0.98] text-white text-xs sm:text-sm font-bold shadow-xs hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer self-start sm:self-auto focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
        >
          <Play className="w-3.5 h-3.5 fill-current" />
          <span>
            {isBn 
              ? `সবগুলো ড্রিল করুন (${toBnNum(effectiveWeakWords.length)})` 
              : `Drill All Weak Words (${effectiveWeakWords.length})`}
          </span>
        </button>
      </div>

      {/* Weak Words List */}
      <div className="space-y-3 mb-5">
        {displayWords.map((item, idx) => {
          const recoveryTarget = 5;
          const currentRecovered = Math.min(recoveryTarget, item.correctStreak || 0);

          return (
            <div
              key={item.id || item.word || idx}
              className="group bg-[#F8FAFC] hover:bg-slate-50/80 border border-[#E5E7EB] hover:border-slate-300 rounded-2xl p-3.5 sm:p-4 transition-all duration-150 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              {/* Left Word Details */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-base sm:text-lg font-bold text-[#172033] group-hover:text-[#2563EB] transition-colors">
                    {item.word}
                  </span>

                  <button
                    type="button"
                    onClick={(e) => handleSpeak(e, item.word)}
                    className="min-h-[44px] min-w-[44px] p-2.5 rounded-xl text-[#64748B] hover:text-[#2563EB] hover:bg-blue-50 transition-colors cursor-pointer flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                    title={isBn ? 'উচ্চারণ শুনুন' : 'Listen pronunciation'}
                    aria-label={`Listen pronunciation of ${item.word}`}
                  >
                    <Volume2 className="w-4 h-4" />
                  </button>

                  {/* Mistake Count Pill */}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                    {isBn 
                      ? `${toBnNum(item.mistakeCount || 3)} বার ভুল` 
                      : `${item.mistakeCount || 3} Mistakes`}
                  </span>

                  {/* Recovery Progress Pill */}
                  <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                    {isBn 
                      ? `পুনরুদ্ধার: ${toBnNum(currentRecovered)}/${toBnNum(recoveryTarget)}` 
                      : `Recovery: ${currentRecovered}/${recoveryTarget}`}
                  </span>
                </div>

                {/* Meaning & Meta */}
                <div className="flex items-center gap-2 text-xs text-[#64748B] flex-wrap">
                  {item.bengaliMeaning && (
                    <span className="font-semibold text-[#172033]">
                      {item.bengaliMeaning}
                    </span>
                  )}
                  {item.unit && (
                    <>
                      <span className="text-slate-300">•</span>
                      <span className="text-[11px] text-[#64748B]">
                        {item.unit}
                      </span>
                    </>
                  )}
                  {item.synonyms && (
                    <>
                      <span className="text-slate-300 hidden md:inline">•</span>
                      <span className="text-[11px] text-[#64748B] hidden md:inline truncate max-w-xs">
                        {isBn ? 'সমার্থক:' : 'Syn:'} {item.synonyms}
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Right Action Buttons */}
              <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                <button
                  type="button"
                  onClick={() => onPracticeWord && onPracticeWord(item)}
                  className="min-h-[44px] px-3.5 py-2 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] text-white text-xs font-bold shadow-2xs hover:shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isBn ? 'অনুশীলন' : 'Practice'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleReviewHub}
                  className="min-h-[44px] px-3 py-2 rounded-xl border border-[#E5E7EB] bg-white hover:bg-slate-100 text-[#172033] text-xs font-semibold transition-colors flex items-center justify-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
                  title={isBn ? 'ফ্ল্যাশকার্ডে রিভিশন দিন' : 'Review in Flashcards'}
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#64748B]" />
                  <span>{isBn ? 'রিভিউ' : 'Review'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Navigation Link */}
      <div className="border-t border-[#F1F5F9] pt-3.5 flex flex-col sm:flex-row items-center justify-between gap-2">
        <span className="text-xs text-[#64748B] font-medium text-center sm:text-left">
          {isBn 
            ? 'স্পেসড-রিপিটিশন মাস্টারির মাধ্যমে দুর্বল শব্দ স্বয়ংক্রিয়ভাবে মুছে যাবে' 
            : 'Recovered words are automatically unflagged once answered correctly 5 times'}
        </span>

        <button
          type="button"
          onClick={handleReviewHub}
          className="min-h-[44px] px-2 rounded-lg text-xs sm:text-sm font-bold text-[#2563EB] hover:text-[#1D4ED8] hover:underline flex items-center gap-1 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2563EB] focus-visible:ring-offset-2"
        >
          <span>{isBn ? 'রিভিশন হাব ওপেন করুন →' : 'Open Revision Hub →'}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>
    </section>
  );
}
