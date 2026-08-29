import React from 'react';
import { 
  Sparkles, 
  Layers, 
  GraduationCap, 
  FileDown, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Shield, 
  Volume2, 
  Trophy, 
  Zap, 
  Flame, 
  Clock, 
  LogIn, 
  UserPlus,
  Star,
  ChevronRight
} from 'lucide-react';
import { hscVocabularyList } from '../data/questions/hscQuestionsData';
import { hscUnits } from '../data/hscUnitsData';

export default function LandingPage({ 
  onOpenAuth, 
  onDirectLogin, 
  lang = 'en', 
  setLang 
}) {
  const isBn = lang === 'bn';

  return (
    <div className="min-h-screen bg-[#0a0d14] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* 1. Public Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#1b2333]/80 bg-[#0a0d14]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500/30">
              <BookOpen size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white tracking-tight flex items-center gap-1.5">
                <span>Learner Hub</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  HSC 2026
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                {isBn ? 'স্মার্ট ভোকাবুলারি ও MCQ সিস্টেম' : 'Smart Vocabulary & MCQ Engine'}
              </p>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden md:flex items-center gap-7 text-xs font-semibold text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'ফিচারসমূহ' : 'Features'}
            </a>
            <a href="#flashcards" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'ফ্ল্যাশকার্ড' : 'Flashcards'}
            </a>
            <a href="#curriculum" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'সিলেবাস' : 'Curriculum'}
            </a>
            <a href="#pdf" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'পিডিএফ রিভিশন' : 'PDF Revision'}
            </a>
          </nav>

          {/* Right Action Buttons: Language Toggle, Sign In, Sign Up */}
          <div className="flex items-center gap-3">
            {/* Language Toggle */}
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141a27] border border-[#222c40] text-xs font-bold text-slate-300 hover:text-white hover:border-slate-600 transition-all cursor-pointer"
              title="Toggle Language"
            >
              <span>{lang === 'en' ? '🇧🇩 বাং' : '🇺🇸 EN'}</span>
            </button>

            {/* Sign In Button */}
            <button
              onClick={() => onOpenAuth(false)}
              className="px-4 py-2 rounded-xl bg-[#141a27] hover:bg-[#1e273b] border border-[#243048] text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              {isBn ? 'লগইন' : 'Sign In'}
            </button>

            {/* Sign Up / Get Started CTA */}
            <button
              onClick={() => onOpenAuth(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-lg shadow-emerald-950/60 transition-all cursor-pointer active:scale-95"
            >
              <UserPlus size={14} />
              <span>{isBn ? 'শুরু করুন (ফ্রি)' : 'Get Started Free'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 overflow-hidden">
        {/* Glow Gradients in Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none" />
        <div className="absolute top-1/3 right-10 w-[400px] h-[300px] bg-teal-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-7">
          {/* Top Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300 text-xs font-bold tracking-wide shadow-sm animate-in fade-in slide-in-from-bottom-2 duration-300">
            <Sparkles size={14} className="text-emerald-400" />
            <span>{isBn ? 'NCTB HSC 2026 ইংলিশ সিলেবাস অনুযায়ী তৈরি' : 'Custom Tailored for NCTB HSC 2026 English'}</span>
          </div>

          {/* Hero Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.15] max-w-4xl mx-auto">
            {isBn ? (
              <>
                এইচএসসি ইংরেজির প্রতিটি শব্দ ও MCQ করুন <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">১০০% আয়ত্ত</span>
              </>
            ) : (
              <>
                Master Every Word & MCQ for <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">HSC English For Today</span>
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
            {isBn
              ? 'স্পেসড-রিপিটিশন ফ্ল্যাশকার্ড, ৪-ক্যাটাগরি কাস্টম MCQ পরীক্ষা (Synonyms, Antonyms, Bangla & English Meaning) এবং দুর্বল শব্দের অটোমেটিক PDF শিট ডাউনলোড।'
              : 'Interactive 3D Flashcards, 4-category targeted exams (Synonyms, Antonyms, Bangla & English Meaning), and automatic Weak Words PDF revision sheet.'}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-3">
            <button
              onClick={() => onOpenAuth(true)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/70 transition-all cursor-pointer active:scale-95"
            >
              <span>{isBn ? '🚀 ফ্রি সাইন আপ করে শুরু করুন' : '🚀 Start Practicing Free (Sign Up)'}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onDirectLogin}
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-[#141b29] hover:bg-[#1d273a] border border-[#27354d] text-slate-200 hover:text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 shadow-sm"
              title="Instant Demo Access"
            >
              <Zap size={17} className="text-amber-400 fill-amber-400" />
              <span>{isBn ? '⚡ ১-ক্লিক ডেমো একাউন্টে প্রবেশ' : '⚡ 1-Click Instant Demo Access'}</span>
            </button>
          </div>

          {/* Trust Highlights */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-6 text-xs text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>{isBn ? '১২টি ইউনিট ও পাঠ্যবই ভোকাবুলারি' : '12 HSC Units Coverage'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>{isBn ? 'দুর্বল শব্দের PDF রিভিশন শিট' : 'Printable Weak Words PDF'}</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-emerald-400" />
              <span>{isBn ? '১০০% ফ্রি ও কোন বিজ্ঞাপন ছাড়া' : '100% Free & No Ads'}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Four Core Pillars Grid */}
      <section id="features" className="py-16 bg-[#0d111b] border-y border-[#171f2e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isBn ? 'এইচএসসি প্রস্তুতির জন্য ৪টি শক্তিশালী ফিচার' : '4 Powerful Features for HSC English Mastery'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isBn 
                ? 'মুখস্থ করার বদলে বৈজ্ঞানিক স্পেসড-রিপিটিশন পদ্ধতিতে ইংরেজি ভোকাবুলারি ও MCQ শিখুন' 
                : 'Scientific spaced-repetition and active recall engine designed for NCTB students'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {/* Feature 1: Flashcards */}
            <div className="bg-[#121724] border border-[#1f283b] hover:border-amber-500/40 p-5 rounded-2xl space-y-4 transition-all duration-200 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-950/40">
                <Layers size={24} />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                {isBn ? 'ইন্টারেক্টিভ ফ্ল্যাশকার্ড' : 'Interactive Flashcards'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn
                  ? 'উচ্চারণ, বাংলা অর্থ, ইংরেজি সংজ্ঞা, Synonyms ও Antonyms সহ ৩ডি ফ্লিপ কার্ড।'
                  : 'Flip cards with audio pronunciation, Bengali meanings, English definitions, synonyms, and antonyms.'}
              </p>
            </div>

            {/* Feature 2: 4-Category Exams */}
            <div className="bg-[#121724] border border-[#1f283b] hover:border-emerald-500/40 p-5 rounded-2xl space-y-4 transition-all duration-200 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/40">
                <GraduationCap size={24} />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {isBn ? '৪-ক্যাটাগরি MCQ পরীক্ষা' : '4-Category MCQ Exams'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn
                  ? 'Synonyms, Antonyms, Bangla Meaning ও English Meaning পৃথক বা একসাথে প্র্যাকটিস করুন।'
                  : 'Practice single or combined categories: Synonyms, Antonyms, Bangla & English meanings with question counts.'}
              </p>
            </div>

            {/* Feature 3: Weak Words & PDF */}
            <div className="bg-[#121724] border border-[#1f283b] hover:border-rose-500/40 p-5 rounded-2xl space-y-4 transition-all duration-200 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-red-600 flex items-center justify-center text-white shadow-lg shadow-rose-950/40">
                <FileDown size={24} />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-rose-300 transition-colors">
                {isBn ? 'দুর্বল শব্দ ও PDF রিভিশন' : 'Weak Words PDF Sheet'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn
                  ? 'ভুল হওয়া শব্দগুলো স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে এবং ১-ক্লিকে ৪-কলাম PDF আকারে ডাউনলোড করা যায়।'
                  : 'Track missed words automatically and download clean 4-column printable PDF revision sheets.'}
              </p>
            </div>

            {/* Feature 4: Leaderboard & Spaced Mastery */}
            <div className="bg-[#121724] border border-[#1f283b] hover:border-yellow-500/40 p-5 rounded-2xl space-y-4 transition-all duration-200 hover:-translate-y-1 group">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center text-slate-950 shadow-lg shadow-yellow-950/40">
                <Trophy size={24} />
              </div>
              <h3 className="text-base font-bold text-white group-hover:text-yellow-300 transition-colors">
                {isBn ? 'লিডারবোর্ড ও স্ট্রিক' : 'Leaderboard & Streaks'}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isBn
                  ? 'কলেজভিত্তিক র‍্যাংকিং এবং দৈনিক পড়ার ধারাবাহিকতা বজায় রাখার স্ট্রিক পয়েন্ট।'
                  : 'College-wide ranking, performance percentiles, and daily study streak trackers.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Live Feature Preview Section (Flashcard & PDF Preview) */}
      <section id="flashcards" className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs font-bold">
                <Layers size={14} />
                <span>{isBn ? 'স্পেসড-রিপিটিশন ভোকাবুলারি' : 'Active Recall & Spaced Repetition'}</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
                {isBn ? (
                  <>
                    কার্ড উল্টে অর্থ জানুন, <br />
                    <span className="text-amber-400">মুখস্থের দিন শেষ!</span>
                  </>
                ) : (
                  <>
                    Flip Cards & Master Vocabulary <br />
                    <span className="text-amber-400">With Native Audio</span>
                  </>
                )}
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isBn
                  ? 'প্রতিটি শব্দে রয়েছে আমেরিকান ও ব্রিটিশ উচ্চারণ, বাংলা অর্থ, ইংরেজি সংজ্ঞা এবং পাঠ্যবইয়ের প্রাসঙ্গিক বাক্য। আপনার দুর্বল শব্দগুলো আলাদা করে সংরক্ষণ করে রিভিশন দিন।'
                  : 'Every word comes with real audio pronunciation, Bengali meaning, English context, and textbook sentences. Missed words are saved automatically.'}
              </p>

              <div className="space-y-2.5 pt-2 text-xs font-semibold text-slate-200">
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{isBn ? 'যেকোনো সময় স্পেসবার বা ট্যাপ করে কার্ড উল্টান' : 'Tap or Spacebar to flip front & back'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{isBn ? 'দুর্বল শব্দগুলো চিহ্নিত করে PDF শিট তৈরি করুন' : 'Mark as Weak Word to generate PDF sheet'}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{isBn ? 'শাফল মোডে এলেমেলো ক্রমে প্র্যাকটিস করার সুবিধা' : 'Shuffle mode for random active recall'}</span>
                </div>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => onOpenAuth(true)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-amber-950/50 flex items-center gap-2 transition-all cursor-pointer active:scale-95"
                >
                  <span>{isBn ? 'ফ্ল্যাশকার্ডে প্র্যাকটিস করুন' : 'Try Flashcards Now'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Right Card Mockup */}
            <div className="lg:col-span-6 bg-gradient-to-b from-[#131926] to-[#0d121c] border border-[#243147] rounded-3xl p-6 sm:p-8 shadow-2xl space-y-5">
              <div className="flex items-center justify-between border-b border-[#1f2c42] pb-4">
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  Unit 1: The Parrot's Tale
                </span>
                <span className="text-xs font-semibold text-slate-400">
                  Card 1 of 46
                </span>
              </div>

              <div className="text-center py-6">
                <h3 className="text-3xl sm:text-4xl font-black text-white mb-2">
                  Ambitious
                </h3>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-[#1c273c] text-slate-300">
                  Adjective • /æmˈbɪʃ.əs/
                </span>
              </div>

              <div className="space-y-3 text-xs bg-[#0b0f17] border border-[#1b2536] p-4 rounded-2xl">
                <div>
                  <span className="text-emerald-400 font-bold block mb-0.5">
                    🇧🇩 বাংলা অর্থ:
                  </span>
                  <p className="text-slate-100 font-bold text-sm">
                    উচ্চাকাঙ্ক্ষী / বড় কিছু অর্জনের তীব্র ইচ্ছাপোষণকারী
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#182130]">
                  <div>
                    <span className="text-emerald-300 font-bold block text-[11px]">
                      🔄 Synonyms:
                    </span>
                    <span className="text-slate-300">Aspiring, Driven, Determined</span>
                  </div>
                  <div>
                    <span className="text-rose-400 font-bold block text-[11px]">
                      ⚡ Antonyms:
                    </span>
                    <span className="text-slate-300">Aimless, Lazy, Unambitious</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  onClick={() => onOpenAuth(true)}
                  className="px-4 py-2 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 text-xs font-bold"
                >
                  Mark as Weak
                </button>
                <button
                  onClick={() => onOpenAuth(true)}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-xs font-bold shadow-md"
                >
                  Mastered & Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Curriculum Coverage Section */}
      <section id="curriculum" className="py-16 bg-[#0d111b] border-t border-[#171f2e]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold">
              <BookOpen size={14} />
              <span>NCTB 2026 Textbook</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              {isBn ? 'HSC পাঠ্যবইয়ের ১২টি ইউনিট কভারেজ' : 'Complete 12 Units Curriculum Coverage'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isBn ? 'প্রতিটি ইউনিট ও লেসনের গুরুত্বপূর্ণ শব্দ এবং বিগত বোর্ড পরীক্ষার প্রশ্ন' : 'Unit-by-unit vocabulary, meaning, and MCQ practice test database'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {hscUnits.map((unit) => (
              <div 
                key={unit.id}
                onClick={() => onOpenAuth(true)}
                className="p-4 rounded-2xl bg-[#121724] border border-[#1f283b] hover:border-emerald-500/50 transition-all cursor-pointer group flex items-center justify-between"
              >
                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-md border border-emerald-500/20">
                    Unit {unit.id}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-emerald-300 transition-colors">
                    {unit.name}
                  </h4>
                  <span className="text-[11px] text-slate-400 block">
                    {unit.lessonsCount} {isBn ? 'টি লেসন' : 'Lessons'} • {unit.totalQuestions > 0 ? `${unit.totalQuestions} MCQs` : 'Coming Soon'}
                  </span>
                </div>
                <div className="w-8 h-8 rounded-lg bg-[#192233] group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-400 flex items-center justify-center transition-all">
                  <ChevronRight size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Big Final Call to Action */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center bg-gradient-to-r from-emerald-950/60 via-[#13202b] to-teal-950/60 border border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mx-auto shadow-lg">
            <GraduationCap size={32} />
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            {isBn 
              ? 'এইচএসসি পরীক্ষার জন্য প্রস্তুত হতে এখনই জয়েন করুন' 
              : 'Ready to Boost Your HSC English Score?'}
          </h2>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {isBn
              ? 'কোনো ফি নেই! সম্পূর্ণ বিনামূল্যে অ্যাকাউন্ট খুলে আজ থেকেই স্মার্ট পদ্ধতিতে রিভিশন শুরু করুন।'
              : 'No hidden fees. Create your free student account now to access all interactive flashcards, exams, and weak words PDF sheets.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => onOpenAuth(true)}
              className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/80 transition-all cursor-pointer active:scale-95"
            >
              <span>{isBn ? '🚀 একাউন্ট তৈরি করুন' : '🚀 Sign Up Free'}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={() => onOpenAuth(false)}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-[#141d2a] hover:bg-[#1f2c40] border border-[#2b3a54] text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <LogIn size={17} />
              <span>{isBn ? 'লগইন করুন' : 'Sign In'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 7. Footer */}
      <footer className="border-t border-[#171f2e] bg-[#07090f] py-8 text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-6 h-6 rounded-md bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-xs">
              LH
            </div>
            <span className="text-slate-300 font-bold">Learner Hub • HSC English Engine</span>
          </div>

          <p className="text-center sm:text-right">
            Designed for HSC 2026 Students in Bangladesh • All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
