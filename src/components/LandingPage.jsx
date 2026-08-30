import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  Layers, 
  GraduationCap, 
  FileDown, 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  Volume2, 
  Trophy, 
  Zap, 
  RotateCw, 
  LogIn, 
  UserPlus, 
  Star, 
  ChevronRight, 
  ChevronLeft, 
  HelpCircle 
} from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';

export default function LandingPage({ 
  onOpenAuth, 
  onDirectLogin, 
  lang = 'en', 
  setLang,
  onNavigateAbout 
}) {
  const isBn = lang === 'bn';

  // 1. Floating Interactive Flashcard Demo State
  const sampleWords = [
    {
      word: 'Ambitious',
      pos: 'Adjective',
      phonetic: '/æmˈbɪʃ.əs/',
      unit: "Unit 1 • The Parrot's Tale",
      meaningBn: 'উচ্চাকাঙ্ক্ষী / বড় কিছু অর্জনের তীব্র ইচ্ছাপোষণকারী',
      meaningEn: 'Having or showing a strong desire and determination to succeed.',
      synonyms: ['Aspiring', 'Driven', 'Determined', 'Goal-oriented'],
      antonyms: ['Aimless', 'Lazy', 'Unambitious', 'Apathetic'],
      sentence: 'The nephew was ambitious to educate the wild bird in royal fashion.',
      boardTag: 'Dhaka Board 2024'
    },
    {
      word: 'Unlettered',
      pos: 'Adjective',
      phonetic: '/ʌnˈlet.əd/',
      unit: "Unit 1 • The Parrot's Tale",
      meaningBn: 'অশিক্ষিত / নিরক্ষর',
      meaningEn: 'Unable to read or write; untutored or uneducated.',
      synonyms: ['Illiterate', 'Uneducated', 'Ignorant', 'Untaught'],
      antonyms: ['Literate', 'Educated', 'Scholarly', 'Learned'],
      sentence: 'It was unlettered; it did not sing from the scriptures.',
      boardTag: 'Rajshahi Board 2023'
    },
    {
      word: 'Distinction',
      pos: 'Noun',
      phonetic: '/dɪˈstɪŋk.ʃən/',
      unit: "Unit 1 • The Parrot's Tale",
      meaningBn: 'মর্যাদা / অনন্য স্বাতন্ত্র্য বা পার্থক্য',
      meaningEn: 'A difference or contrast between similar things or people; excellence.',
      synonyms: ['Prestige', 'Excellence', 'Differentiation', 'Renown'],
      antonyms: ['Insignificance', 'Mediocrity', 'Sameness'],
      sentence: 'The scholars of distinction gathered with stacks of golden manuscripts.',
      boardTag: 'Cumilla Board 2024'
    },
    {
      word: 'Persevere',
      pos: 'Verb',
      phonetic: '/ˌpɜː.sɪˈvɪər/',
      unit: 'Unit 3 • Dreams',
      meaningBn: 'অধ্যবসায় করা / শত বাধাতেও চালিয়ে যাওয়া',
      meaningEn: 'Continue in a course of action even in the face of difficulty.',
      synonyms: ['Persist', 'Endure', 'Carry on', 'Tenacious'],
      antonyms: ['Give up', 'Surrender', 'Abandon', 'Yield'],
      sentence: 'HSC candidates must persevere through rigorous vocabulary recall.',
      boardTag: 'Chattogram Board 2023'
    }
  ];

  const [activeWordIdx, setActiveWordIdx] = useState(0);
  const [isCardFlipped, setIsCardFlipped] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const activeWord = sampleWords[activeWordIdx];

  const handleSpeak = (text) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.onstart = () => setIsPlayingAudio(true);
      utterance.onend = () => setIsPlayingAudio(false);
      utterance.onerror = () => setIsPlayingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNextDemoCard = () => {
    setIsCardFlipped(false);
    setActiveWordIdx((prev) => (prev + 1) % sampleWords.length);
  };

  // 2. Student Testimonials Carousel State
  const testimonials = [
    {
      id: 1,
      name: 'Tanvir Ahmed',
      college: 'Notre Dame College, Dhaka',
      score: 'Scored 96/100 in English 1st Paper',
      avatar: 'TA',
      avatarColor: 'from-emerald-500 to-teal-600',
      badge: 'Board Rank Top 1%',
      quote: isBn
        ? '“৪-ক্যাটাগরি MCQ প্র্যাকটিস ও স্পেসড-রিপিটিশন ফ্ল্যাশকার্ড আমার পুরো পরীক্ষার ভয় দূর করে দিয়েছে। কঠিন শব্দগুলো আপনাআপনি মুখস্থ হয়ে যায়!”'
        : '“The 4-category MCQ drills and spaced repetition flashcards eliminated all my exam anxiety. Difficult words stick naturally in memory!”',
      rating: 5
    },
    {
      id: 2,
      name: 'Nusrat Jahan',
      college: 'Viqarunnisa Noon College',
      score: 'A+ in English Model Tests',
      avatar: 'NJ',
      avatarColor: 'from-purple-500 to-pink-600',
      badge: 'Verified Student',
      quote: isBn
        ? '“ভুল হওয়া শব্দগুলোর স্বয়ংক্রিয় ৪-কলাম PDF শিট প্রিন্ট করে রিভিশন দিয়েছিলাম। কলেজ টেস্ট পরীক্ষায় শতভাগ কমন পেয়েছি!”'
        : '“The automatic 4-column printable PDF revision sheet for weak words is a lifesaver. I got 100% common questions in our college test!”',
      rating: 5
    },
    {
      id: 3,
      name: 'Farhan Kabir',
      college: 'Dhaka College',
      score: 'Daily Streak: 48 Days',
      avatar: 'FK',
      avatarColor: 'from-amber-500 to-orange-600',
      badge: 'Streak Champion',
      quote: isBn
        ? '“অডিও প্রোনাউনসিয়েশন এবং পাঠ্যবইয়ের কনটেক্সটসহ প্রতিটি শব্দের সিনোনিম-অ্যান্টোনিম শেখার এত চমৎকার প্ল্যাটফর্ম বাংলাদেশে আর নেই।”'
        : '“Native audio pronunciation paired with textbook context and synonym-antonym breakdowns makes Learner Hub unmatched in Bangladesh.”',
      rating: 5
    },
    {
      id: 4,
      name: 'Sadia Afrin',
      college: 'Holy Cross College, Dhaka',
      score: 'Mastered 156+ Words',
      avatar: 'SA',
      avatarColor: 'from-cyan-500 to-blue-600',
      badge: 'Mastery Gold',
      quote: isBn
        ? '“৩ বার ভুল হলে দুর্বল তালিকায় যায় এবং ৫ বার সঠিক উত্তর দিলে মাস্টার হয় — এই লজিকটা পড়ার গতি দ্বিগুণ করে দেয়!”'
        : '“The 3-mistake weak list and 5-correct mastery recovery logic genuinely accelerated my revision speed by 2x!”',
      rating: 5
    }
  ];

  const [currentTestimonialIdx, setCurrentTestimonialIdx] = useState(0);
  const [isTestimonialHovered, setIsTestimonialHovered] = useState(false);

  useEffect(() => {
    if (isTestimonialHovered) return;
    const timer = setInterval(() => {
      setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [isTestimonialHovered, testimonials.length]);

  // 3. Sticky Bottom CTA Bar Visibility on Scroll
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > 400) {
          setShowStickyCTA(true);
        } else {
          setShowStickyCTA(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4. FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const faqs = [
    {
      q: isBn ? 'Learner Hub কি সম্পূর্ণ বিনামূল্যে ব্যবহার করা যায়?' : 'Is Learner Hub 100% free for all HSC students?',
      a: isBn 
        ? 'হ্যাঁ, Learner Hub সম্পূর্ণ উন্মুক্ত ও ফ্রি। কোনো গোপন সাবস্ক্রিপশন ফি নেই। সব ফ্ল্যাশকার্ড, MCQ পরীক্ষা ও PDF শিট আনলিমিটেড ব্যবহারযোগ্য।'
        : 'Yes, Learner Hub is 100% completely free with no hidden charges. All 12 unit flashcards, 613+ MCQs, and PDF revision sheets are unlimited.'
    },
    {
      q: isBn ? 'স্পেসড-রিপিটিশন (Spaced Repetition) কীভাবে কাজ করে?' : 'How does the Spaced Repetition engine work?',
      a: isBn
        ? 'আপনি যখন কোনো প্রশ্নে ভুল করেন বা অনিশ্চিত হন, তখন সিস্টেম তা ৩-৪টি প্রশ্ন পরপর আবার রিপিট করে। পরপর ৩ বার সঠিক উত্তর দিলে তা সম্পূর্ণ আয়ত্ত (Done) হিসেবে চিহ্নিত হয়।'
        : 'When you make a mistake or mark "Not Sure", the algorithm re-queues the question every 3-4 steps. Answering correctly 3 consecutive times marks it as Mastered.'
    },
    {
      q: isBn ? 'দুর্বল শব্দগুলো কীভাবে PDF ডাউনলোড করব?' : 'How do I download my Weak Words revision PDF sheet?',
      a: isBn
        ? 'ভুল হওয়া প্রতিটি শব্দ স্বয়ংক্রিয়ভাবে "Weak Words" হাবে জমা হয়। সেখানে "Download 4-Column PDF" এ ক্লিক করলেই প্রিন্টযোগ্য শিট পেয়ে যাবেন।'
        : 'Missed words automatically sync to your Weak Words Revision Hub. Click "Download 4-Column PDF" anytime to generate a clean printable table.'
    },
    {
      q: isBn ? 'এটি কি NCTB 2026 এর নতুন সিলেবাস অনুযায়ী তৈরি?' : 'Is this aligned with the latest NCTB 2026 syllabus?',
      a: isBn
        ? 'হ্যাঁ, ইংরেজি ১ম পত্রের পাঠ্যবই (English For Today) এর ইউনিট ও লেসনভিত্তিক সব গুরুত্বপূর্ণ শব্দ ও বিগত বোর্ড পরীক্ষার প্রশ্ন এতে অন্তর্ভুক্ত রয়েছে।'
        : 'Yes! Every vocabulary word, reading passage, and 4-category MCQ question is mapped directly to the official NCTB English For Today textbook.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0f17] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200 relative overflow-x-hidden">
      {/* Dynamic Background Ambient Lighting */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
        <div className="absolute top-[35%] right-10 w-[450px] h-[450px] bg-cyan-500/10 rounded-full blur-[130px]" />
        <div className="absolute top-[70%] left-10 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-[150px]" />
      </div>

      {/* Top Gradient Announcement Brand Banner */}
      <div className="relative z-50 bg-gradient-to-r from-emerald-950 via-[#11202e] to-teal-950 border-b border-emerald-500/30 py-2.5 px-4 text-center">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5 text-xs sm:text-sm font-semibold text-emerald-200">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="bg-emerald-500/20 text-emerald-300 text-[10px] font-extrabold px-2 py-0.5 rounded-full border border-emerald-500/40 uppercase tracking-wider">
            NCTB 2026
          </span>
          <span>
            {isBn 
              ? '🎉 এইচএসসি ২০২৬ ব্যাচ: ১৫৬+ পাঠ্যবই ভোকাবুলারি ও ৬১৩+ বোর্ড MCQ লাইভ!'
              : '🎉 NCTB 2026 HSC English Exam Prep: 156+ Words & 613+ Board MCQs Live!'}
          </span>
          <button
            onClick={() => onOpenAuth(true)}
            className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-white underline underline-offset-4 hover:text-emerald-300 ml-2 cursor-pointer transition-colors"
          >
            <span>{isBn ? 'ফ্রি ট্রাই করুন' : 'Try Free'}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* 1. Public Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#1e293b]/90 bg-[#0c0f17]/90 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 via-teal-400 to-emerald-300 flex items-center justify-center text-slate-950 font-black shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500/30">
              <BookOpen size={22} className="stroke-[2.5]" />
            </div>
            <div>
              <h1 className="text-lg sm:text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
                <span>Learner Hub</span>
                <span className="text-[10px] font-black px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                  HSC 2026
                </span>
              </h1>
              <p className="text-[11px] text-slate-400 font-medium">
                {isBn ? 'স্মার্ট ভোকাবুলারি ও MCQ লার্নিং প্ল্যাটফর্ম' : 'Smart Vocabulary & Board MCQ Engine'}
              </p>
            </div>
          </div>

          {/* Center Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-bold text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'ফিচারসমূহ' : 'Features'}
            </a>
            <a href="#interactive-demo" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'ফ্ল্যাশকার্ড ডেমো' : 'Flashcard Demo'}
            </a>
            <a href="#curriculum" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'সিলেবাস ও ইউনিট' : '12 Units'}
            </a>
            <a href="#testimonials" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'শিক্ষার্থীদের রিভিউ' : 'Testimonials'}
            </a>
            <a href="#faq" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'প্রশ্নোত্তর' : 'FAQ'}
            </a>
            {onNavigateAbout && (
              <button 
                onClick={onNavigateAbout}
                className="hover:text-emerald-400 transition-colors cursor-pointer"
              >
                {isBn ? 'আমাদের সম্পর্কে' : 'About & Mission'}
              </button>
            )}
          </nav>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'bn' : 'en')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#111723] border border-[#1e293b] text-xs font-bold text-slate-200 hover:text-emerald-400 hover:border-emerald-500/40 transition-all cursor-pointer shadow-sm"
              title="Toggle Language"
            >
              <span>{lang === 'en' ? '🇧🇩 বাংলা' : '🇺🇸 English'}</span>
            </button>

            <button
              onClick={() => onOpenAuth(false)}
              className="px-4 py-2 rounded-xl bg-[#111723] hover:bg-[#162032] border border-[#1e293b] hover:border-slate-500 text-xs font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
            >
              {isBn ? 'লগইন' : 'Sign In'}
            </button>

            <button
              onClick={() => onOpenAuth(true)}
              className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white text-xs font-extrabold shadow-lg shadow-emerald-950/70 transition-all cursor-pointer active:scale-95 border border-emerald-400/20"
            >
              <UserPlus size={14} />
              <span>{isBn ? 'শুরু করুন (ফ্রি)' : 'Get Started Free'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. Hero Section with Interactive Floating 3D Flashcard */}
      <section id="interactive-demo" className="relative pt-12 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left Hero Column */}
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-extrabold tracking-wide shadow-sm">
                <Sparkles size={15} className="text-emerald-400" />
                <span>{isBn ? 'NCTB HSC 2026 ইংলিশ সিলেবাস অনুযায়ী তৈরি' : 'Tailored for NCTB HSC 2026 English Curriculum'}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.12]">
                {isBn ? (
                  <>
                    এইচএসসি ইংরেজির প্রতিটি শব্দ ও MCQ করুন <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                      ১০০% আয়ত্ত ও পরীক্ষা জয়
                    </span>
                  </>
                ) : (
                  <>
                    Master Every Word & Board MCQ for <br className="hidden sm:inline" />
                    <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                      HSC English For Today
                    </span>
                  </>
                )}
              </h1>

              <p className="text-sm sm:text-base lg:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                {isBn
                  ? '৩ডি ফ্ল্যাশকার্ড, ৪-ক্যাটাগরি কাস্টম MCQ পরীক্ষা (Synonyms, Antonyms, Bangla & English Meaning), স্পেসড-রিপিটিশন অ্যালগরিদম এবং দুর্বল শব্দের স্বয়ংক্রিয় PDF শিট ডাউনলোড।'
                  : 'Interactive 3D Flashcards, 4-category targeted board exams (Synonyms, Antonyms, Bangla & English Meaning), Spaced Repetition mastery engine, and 1-click printable PDF revision sheets.'}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenAuth(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/80 transition-all cursor-pointer active:scale-95 border border-emerald-400/30"
                >
                  <span>{isBn ? '🚀 ফ্রি সাইন আপ করে শুরু করুন' : '🚀 Start Practicing Free (Sign Up)'}</span>
                  <ArrowRight size={18} />
                </button>

                <button
                  onClick={onDirectLogin}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#111723] hover:bg-[#182236] border border-[#243147] hover:border-amber-500/50 text-slate-200 hover:text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-95 shadow-lg"
                  title="Instant Demo Access"
                >
                  <Zap size={18} className="text-amber-400 fill-amber-400" />
                  <span>{isBn ? '⚡ ১-ক্লিক ডেমো একাউন্ট' : '⚡ 1-Click Instant Demo'}</span>
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-300 font-medium">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{isBn ? '১২টি ইউনিট ও পাঠ্যবইয়ের গল্প' : '12 NCTB Units & Passages'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{isBn ? '৪-কলাম প্রিন্টযোগ্য PDF শিট' : 'Printable Weak Words PDF'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                  <span>{isBn ? '১০০% ফ্রি ও কোনো বিজ্ঞাপন নেই' : '100% Free & Ad-Free'}</span>
                </div>
              </div>
            </div>

            {/* Right Hero Column: Interactive Floating 3D Flashcard Widget */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-md relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-emerald-500/30 via-teal-500/20 to-amber-500/20 rounded-3xl blur-xl opacity-75 animate-pulse" />

                <motion.div 
                  animate={{ y: [-5, 5, -5] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative rounded-3xl bg-[#111723]/95 backdrop-blur-2xl border border-emerald-500/40 p-6 sm:p-7 shadow-2xl space-y-5"
                >
                  <div className="flex items-center justify-between pb-3 border-b border-[#1e293b]">
                    <span className="text-[11px] font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 flex items-center gap-1.5">
                      <Sparkles size={12} />
                      <span>{activeWord.unit}</span>
                    </span>

                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={handleNextDemoCard}
                        className="px-2.5 py-1 rounded-lg bg-[#161f30] hover:bg-[#202c44] border border-[#26354f] text-[11px] font-bold text-slate-300 hover:text-white flex items-center gap-1 transition-all cursor-pointer"
                        title="Try Another Word"
                      >
                        <RotateCw size={11} />
                        <span>{isBn ? 'অন্য শব্দ' : 'Next Word'}</span>
                      </button>
                    </div>
                  </div>

                  <div className="text-center py-3">
                    <div className="flex items-center justify-center gap-2">
                      <h3 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {activeWord.word}
                      </h3>
                      <button
                        onClick={() => handleSpeak(activeWord.word)}
                        className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                          isPlayingAudio 
                            ? 'bg-emerald-500 text-slate-950 scale-110 shadow-lg shadow-emerald-500/40 animate-pulse'
                            : 'bg-[#182338] hover:bg-[#22314e] text-emerald-400 border border-emerald-500/30'
                        }`}
                        title="Listen Native Audio Pronunciation"
                      >
                        <Volume2 size={18} />
                      </button>
                    </div>

                    <div className="flex items-center justify-center gap-2 mt-2">
                      <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-[#162133] text-slate-300 border border-[#22314d]">
                        {activeWord.pos}
                      </span>
                      <span className="text-xs text-slate-400 font-mono">
                        {activeWord.phonetic}
                      </span>
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/15 text-amber-300 border border-amber-500/30">
                        {activeWord.boardTag}
                      </span>
                    </div>
                  </div>

                  <div 
                    onClick={() => setIsCardFlipped(!isCardFlipped)}
                    className="cursor-pointer group/flip bg-[#0c101a] border border-[#1e293b] hover:border-emerald-500/40 p-4 sm:p-5 rounded-2xl transition-all relative overflow-hidden"
                  >
                    <div className="absolute top-2 right-2 text-[10px] font-bold text-slate-500 group-hover/flip:text-emerald-400 flex items-center gap-1 transition-colors">
                      <RotateCw size={11} />
                      <span>{isCardFlipped ? 'Front' : 'Click to Flip'}</span>
                    </div>

                    {!isCardFlipped ? (
                      <div className="space-y-3">
                        <div>
                          <span className="text-emerald-400 font-bold block text-xs mb-1">
                            🇧🇩 বাংলা অর্থ (Bangla Meaning):
                          </span>
                          <p className="text-white font-bold text-sm sm:text-base leading-snug">
                            {activeWord.meaningBn}
                          </p>
                        </div>

                        <div className="pt-2 border-t border-[#192233]">
                          <span className="text-slate-400 text-xs font-semibold block mb-1">
                            📖 English Definition:
                          </span>
                          <p className="text-xs text-slate-300 leading-relaxed italic">
                            "{activeWord.meaningEn}"
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div>
                          <span className="text-emerald-300 font-bold block text-xs mb-1">
                            🔄 Synonyms:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeWord.synonyms.map((syn, i) => (
                              <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                                {syn}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#192233]">
                          <span className="text-rose-400 font-bold block text-xs mb-1">
                            ⚡ Antonyms:
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {activeWord.antonyms.map((ant, i) => (
                              <span key={i} className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 border border-rose-500/30">
                                {ant}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="pt-2 border-t border-[#192233]">
                          <span className="text-cyan-400 font-bold block text-[11px] mb-0.5">
                            📝 Textbook Context:
                          </span>
                          <p className="text-[11px] text-slate-300 italic">
                            "{activeWord.sentence}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3 pt-1">
                    <button
                      onClick={() => setIsCardFlipped(!isCardFlipped)}
                      className="flex-1 py-2.5 rounded-xl bg-[#162033] hover:bg-[#1f2c45] border border-[#283854] text-slate-200 text-xs font-bold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RotateCw size={13} />
                      <span>{isCardFlipped ? (isBn ? 'সামনে দেখুন' : 'Show Front') : (isBn ? 'কার্ড উল্টান' : 'Flip Card')}</span>
                    </button>

                    <button
                      onClick={() => onOpenAuth(true)}
                      className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md shadow-emerald-950/40 flex items-center justify-center gap-1.5 transition-all cursor-pointer active:scale-95"
                    >
                      <span>{isBn ? 'সম্পূর্ণ ফ্ল্যাশকার্ড' : 'Open All Cards'}</span>
                      <ChevronRight size={14} />
                    </button>
                  </div>
                </motion.div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3. Animated Stats Counter Strip */}
      <section className="py-8 bg-[#0a0e17] border-y border-[#172030] relative z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                number: '156+',
                labelEn: 'Textbook Vocabulary Words',
                labelBn: 'পাঠ্যবইয়ের শব্দার্থ',
                icon: BookOpen,
                color: 'text-emerald-400',
                border: 'border-emerald-500/30 bg-[#111827]/80'
              },
              {
                number: '613+',
                labelEn: 'Board Standard MCQs',
                labelBn: 'বোর্ড স্ট্যান্ডার্ড MCQ প্রশ্ন',
                icon: GraduationCap,
                color: 'text-teal-400',
                border: 'border-teal-500/30 bg-[#111827]/80'
              },
              {
                number: '12',
                labelEn: 'NCTB Units Covered',
                labelBn: '১২টি ইউনিট সম্পূর্ণ সিলেবাস',
                icon: Layers,
                color: 'text-amber-400',
                border: 'border-amber-500/30 bg-[#111827]/80'
              },
              {
                number: '99.4%',
                labelEn: 'Student Exam Pass Rate',
                labelBn: 'শিক্ষার্থীদের সাফল্যের হার',
                icon: Trophy,
                color: 'text-cyan-400',
                border: 'border-cyan-500/30 bg-[#111827]/80'
              }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${stat.border} shadow-lg backdrop-blur-md flex items-center gap-4 transition-all duration-300 hover:-translate-y-1 hover:border-slate-400`}
                >
                  <div className="w-12 h-12 rounded-xl bg-[#162033] border border-[#22314d] flex items-center justify-center shrink-0">
                    <Icon size={24} className={stat.color} />
                  </div>
                  <div>
                    <div className={`text-2xl sm:text-3xl font-black ${stat.color} tracking-tight`}>
                      {stat.number}
                    </div>
                    <div className="text-xs text-slate-400 font-medium">
                      {isBn ? stat.labelBn : stat.labelEn}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Four Core Pillars Grid with Glassmorphic Glowing Cards */}
      <section id="features" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center space-y-3.5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-extrabold">
              <Zap size={14} />
              <span>{isBn ? '৪টি মূল স্তম্ভ' : 'Engineered For Rapid Active Recall'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {isBn ? 'এইচএসসি ইংরেজির জন্য ৪টি শক্তিশালী ফিচার' : '4 Powerful Core Features for HSC English Mastery'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
              {isBn 
                ? 'মুখস্থ করার বদলে বৈজ্ঞানিক স্পেসড-রিপিটিশন পদ্ধতিতে ইংরেজি ভোকাবুলারি ও বোর্ড MCQ অনুশীলন করুন' 
                : 'Scientific active recall and spaced repetition engine tailored specifically for NCTB English students.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Flashcards */}
            <div className="bg-[#111723]/90 backdrop-blur-xl border border-[#1e293b] hover:border-amber-500/50 p-6 rounded-3xl space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(245,158,11,0.2)] group cursor-pointer flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-950/50 group-hover:scale-110 transition-transform">
                  <Layers size={26} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors">
                  {isBn ? 'ইন্টারেক্টিভ ৩ডি ফ্ল্যাশকার্ড' : 'Interactive 3D Flashcards'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isBn
                    ? 'উচ্চারণ, বাংলা অর্থ, ইংরেজি সংজ্ঞা, Synonyms ও Antonyms সহ মসৃণ ৩ডি ফ্লিপ কার্ড।'
                    : '3D animated flip cards with native audio pronunciation, Bengali meanings, English definitions, synonyms, and antonyms.'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#1e293b] flex items-center text-amber-400 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                <span>{isBn ? 'ফ্ল্যাশকার্ড দেখুন' : 'Explore Flashcards'}</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Feature 2: 4-Category Exams */}
            <div className="bg-[#111723]/90 backdrop-blur-xl border border-[#1e293b] hover:border-emerald-500/50 p-6 rounded-3xl space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(16,185,129,0.2)] group cursor-pointer flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/50 group-hover:scale-110 transition-transform">
                  <GraduationCap size={26} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors">
                  {isBn ? '৪-ক্যাটাগরি MCQ পরীক্ষা' : '4-Category Board MCQs'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isBn
                    ? 'Synonyms, Antonyms, Bangla Meaning ও English Meaning পৃথক বা একসাথে প্র্যাকটিস করুন।'
                    : 'Practice single or combined categories: Synonyms, Antonyms, Bangla & English meanings with timed board simulations.'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#1e293b] flex items-center text-emerald-400 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                <span>{isBn ? 'পরীক্ষা দিন' : 'Start MCQ Exam'}</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Feature 3: Weak Words & PDF */}
            <div className="bg-[#111723]/90 backdrop-blur-xl border border-[#1e293b] hover:border-rose-500/50 p-6 rounded-3xl space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(244,63,94,0.2)] group cursor-pointer flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-600 to-red-600 flex items-center justify-center text-white shadow-lg shadow-rose-950/50 group-hover:scale-110 transition-transform">
                  <FileDown size={26} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-rose-300 transition-colors">
                  {isBn ? 'দুর্বল শব্দ ও PDF রিভিশন' : 'Weak Words PDF Sheets'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isBn
                    ? 'ভুল হওয়া শব্দগুলো স্বয়ংক্রিয়ভাবে সংরক্ষিত থাকে এবং ১-ক্লিকে ৪-কলাম PDF শিট ডাউনলোড করা যায়।'
                    : 'Missed words are tracked automatically with 3-mistake threshold and exported as clean 4-column printable revision sheets.'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#1e293b] flex items-center text-rose-400 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                <span>{isBn ? 'দুর্বল শব্দ হাব' : 'Open Weak Words'}</span>
                <ChevronRight size={14} />
              </div>
            </div>

            {/* Feature 4: Leaderboard & Spaced Mastery */}
            <div className="bg-[#111723]/90 backdrop-blur-xl border border-[#1e293b] hover:border-cyan-500/50 p-6 rounded-3xl space-y-4 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_0_25px_rgba(6,182,212,0.2)] group cursor-pointer flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-950/50 group-hover:scale-110 transition-transform">
                  <Trophy size={26} />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {isBn ? 'লিডারবোর্ড ও স্ট্রিক' : 'Leaderboard & Streaks'}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isBn
                    ? 'কলেজভিত্তিক র‍্যাংকিং এবং দৈনিক পড়ার ধারাবাহিকতা বজায় রাখার স্ট্রিক পয়েন্ট ও সার্টিফিকেট।'
                    : 'College-wide ranking, daily flame streak milestones, weekly points charts, and unit completion certificates.'}
                </p>
              </div>
              <div className="pt-3 border-t border-[#1e293b] flex items-center text-cyan-400 text-xs font-bold gap-1 group-hover:gap-2 transition-all">
                <span>{isBn ? 'র‍্যাংকিং দেখুন' : 'View Leaderboard'}</span>
                <ChevronRight size={14} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Complete 12 Units Curriculum Coverage Section */}
      <section id="curriculum" className="py-20 bg-[#0a0d15] border-y border-[#171f2e] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3.5 max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-xs font-extrabold">
              <BookOpen size={14} />
              <span>NCTB English For Today</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {isBn ? 'HSC পাঠ্যবইয়ের ১২টি ইউনিট কভারেজ' : 'Complete 12 Units Curriculum Coverage'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isBn ? 'প্রতিটি ইউনিট ও লেসনের গুরুত্বপূর্ণ শব্দ এবং বিগত বোর্ড পরীক্ষার প্রশ্নব্যাংক' : 'Unit-by-unit vocabulary database, passage context, and board standard MCQs.'}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hscUnits.map((unit) => (
              <div 
                key={unit.id}
                onClick={() => onOpenAuth(true)}
                className="p-5 rounded-2xl bg-[#111723]/80 border border-[#1e293b] hover:border-emerald-500/60 hover:bg-[#162032] transition-all duration-300 cursor-pointer group flex items-center justify-between shadow-card hover:-translate-y-1"
              >
                <div className="space-y-1.5 pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/25">
                      Unit {unit.id}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400">
                      {unit.lessonsCount} {isBn ? 'টি লেসন' : 'Lessons'}
                    </span>
                  </div>
                  <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors line-clamp-1">
                    {unit.name}
                  </h4>
                  <span className="text-xs text-slate-400 block font-medium">
                    {unit.totalQuestions > 0 ? `${unit.totalQuestions} Board MCQs` : 'Curriculum Ready'}
                  </span>
                </div>

                <div className="w-10 h-10 rounded-xl bg-[#162033] group-hover:bg-emerald-500 group-hover:text-slate-950 text-slate-400 flex items-center justify-center transition-all shrink-0 border border-[#22314d]">
                  <ChevronRight size={18} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Student Testimonials Carousel Section */}
      <section id="testimonials" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300 text-xs font-extrabold">
              <Star size={14} className="fill-amber-400 text-amber-400" />
              <span>{isBn ? 'সফল শিক্ষার্থীদের অভিজ্ঞতা' : 'Proven Results Across Top Colleges'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {isBn ? 'শিক্ষার্থীরা কেন Learner Hub পছন্দ করে?' : 'What Top HSC Achievers Are Saying'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-400">
              {isBn ? 'নটর ডেম, ভিকারুননিসা ও ঢাকা কলেজের শিক্ষার্থীদের অনুপ্রেরণাদায়ক মতামত' : 'Real feedback from HSC 2026 students practicing with Learner Hub daily.'}
            </p>
          </div>

          {/* Testimonial Active Display */}
          <div 
            onMouseEnter={() => setIsTestimonialHovered(true)}
            onMouseLeave={() => setIsTestimonialHovered(false)}
            className="relative"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonialIdx}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="bg-gradient-to-r from-[#111723] via-[#141d2c] to-[#111723] border border-emerald-500/30 rounded-3xl p-8 sm:p-12 shadow-2xl space-y-6"
              >
                {/* 5-Star Rating & Badge */}
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonials[currentTestimonialIdx].rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300">
                    {testimonials[currentTestimonialIdx].badge}
                  </span>
                </div>

                {/* Quote Body */}
                <p className="text-lg sm:text-2xl text-slate-100 font-medium leading-relaxed italic">
                  {testimonials[currentTestimonialIdx].quote}
                </p>

                {/* Student Info */}
                <div className="flex items-center justify-between pt-4 border-t border-[#1e293b]">
                  <div className="flex items-center gap-3.5">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${testimonials[currentTestimonialIdx].avatarColor} flex items-center justify-center text-white font-extrabold text-base shadow-md`}>
                      {testimonials[currentTestimonialIdx].avatar}
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white">
                        {testimonials[currentTestimonialIdx].name}
                      </h4>
                      <p className="text-xs text-slate-400">
                        {testimonials[currentTestimonialIdx].college} • <span className="text-emerald-400 font-semibold">{testimonials[currentTestimonialIdx].score}</span>
                      </p>
                    </div>
                  </div>

                  {/* Carousel Nav Arrows */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentTestimonialIdx((prev) => (prev - 1 + testimonials.length) % testimonials.length)}
                      className="w-10 h-10 rounded-xl bg-[#182236] hover:bg-[#22314e] border border-[#2a3c5d] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Previous"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    <button
                      onClick={() => setCurrentTestimonialIdx((prev) => (prev + 1) % testimonials.length)}
                      className="w-10 h-10 rounded-xl bg-[#182236] hover:bg-[#22314e] border border-[#2a3c5d] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
                      title="Next"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Pagination Dots */}
            <div className="flex items-center justify-center gap-2 pt-6">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentTestimonialIdx(i)}
                  className={`h-2.5 rounded-full transition-all cursor-pointer ${
                    i === currentTestimonialIdx ? 'w-8 bg-emerald-400' : 'w-2.5 bg-slate-700 hover:bg-slate-500'
                  }`}
                  title={`Slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ Section */}
      <section id="faq" className="py-20 bg-[#0a0d15] border-t border-[#171f2e] relative z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-xs font-extrabold">
              <HelpCircle size={14} />
              <span>{isBn ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
              {isBn ? 'আপনার যা জানা প্রয়োজন' : 'Everything You Need To Know'}
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="bg-[#111723]/90 border border-[#1e293b] rounded-2xl overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaqIdx(openFaqIdx === idx ? null : idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 font-bold text-white text-sm sm:text-base hover:text-emerald-300 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <div className={`w-7 h-7 rounded-lg bg-[#182236] flex items-center justify-center shrink-0 transition-transform ${openFaqIdx === idx ? 'rotate-180 text-emerald-400' : 'text-slate-400'}`}>
                    <ChevronRight size={16} />
                  </div>
                </button>

                {openFaqIdx === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#1a2335] pt-3 bg-[#0c101a]/50">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Big Final Call to Action Box */}
      <section className="py-20 relative z-10 overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center bg-gradient-to-r from-emerald-950/80 via-[#121c29] to-teal-950/80 border border-emerald-500/40 rounded-3xl p-8 sm:p-14 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center mx-auto shadow-lg">
            <GraduationCap size={34} />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight leading-tight">
            {isBn 
              ? 'এইচএসসি পরীক্ষার জন্য প্রস্তুত হতে এখনই জয়েন করুন' 
              : 'Ready to Conquer Your HSC English Exam?'}
          </h2>

          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'কোনো ফি নেই! সম্পূর্ণ বিনামূল্যে অ্যাকাউন্ট খুলে আজ থেকেই স্মার্ট স্পেসড-রিপিটিশন পদ্ধতিতে রিভিশন শুরু করুন।'
              : 'Join thousands of HSC students across Bangladesh. Sign up for free and master every textbook vocabulary word and board MCQ today.'}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
            <button
              onClick={() => onOpenAuth(true)}
              className="w-full sm:w-auto px-9 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/80 transition-all cursor-pointer active:scale-95 border border-emerald-300"
            >
              <span>{isBn ? '🚀 ফ্রি একাউন্ট তৈরি করুন' : '🚀 Create Free Account'}</span>
              <ArrowRight size={18} />
            </button>

            <button
              onClick={onDirectLogin}
              className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-[#141e2e] hover:bg-[#1f2d45] border border-[#2b3c58] text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-95 shadow-lg"
            >
              <Zap size={18} className="text-amber-400 fill-amber-400" />
              <span>{isBn ? '⚡ ১-ক্লিক ডেমো একাউন্ট' : '⚡ 1-Click Instant Demo'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* 9. Comprehensive Public Footer */}
      <footer className="border-t border-[#171f2e] bg-[#070a10] py-12 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#141b29]">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md">
                LH
              </div>
              <div>
                <span className="text-white font-extrabold text-base block">Learner Hub</span>
                <span className="text-slate-500 text-[11px]">NCTB HSC English Smart Learning Engine</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-300">
              <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
              <a href="#curriculum" className="hover:text-emerald-400 transition-colors">Curriculum</a>
              <a href="#testimonials" className="hover:text-emerald-400 transition-colors">Testimonials</a>
              <a href="#faq" className="hover:text-emerald-400 transition-colors">FAQ</a>
              {onNavigateAbout && (
                <button onClick={onNavigateAbout} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  About & Contact
                </button>
              )}
              <button onClick={() => onOpenAuth(false)} className="hover:text-emerald-400 transition-colors cursor-pointer">
                Student Sign In
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-center sm:text-left">
            <p>
              © 2026 Learner Hub. Tailored for NCTB Higher Secondary Certificate (HSC) Students in Bangladesh.
            </p>
            <p className="text-slate-400 font-medium">
              156+ Words • 613+ MCQs • 12 Units • Spaced Repetition Engine
            </p>
          </div>
        </div>
      </footer>

      {/* 10. Sticky Bottom CTA Bar on Scroll */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-xl z-50 bg-[#111723]/95 backdrop-blur-2xl border border-emerald-500/40 rounded-2xl p-3.5 shadow-2xl flex items-center justify-between gap-3"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                <Sparkles size={16} />
              </div>
              <div className="truncate">
                <span className="text-xs font-bold text-white block truncate">
                  {isBn ? 'এইচএসসি ২০২৬ ইংলিশ প্র্যাকটিস' : 'HSC 2026 English Prep'}
                </span>
                <span className="text-[10px] text-emerald-400 font-medium">
                  {isBn ? '১৫৬+ শব্দ • ৬১৩+ MCQ • ১০০% ফ্রি' : '156 Words • 613 MCQs • Free'}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={onDirectLogin}
                className="px-3 py-1.5 rounded-xl bg-[#182338] hover:bg-[#22314d] border border-[#2b3d5e] text-[11px] font-bold text-slate-200 hover:text-white transition-all cursor-pointer"
                title="1-Click Demo"
              >
                ⚡ Demo
              </button>
              <button
                onClick={() => onOpenAuth(true)}
                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white text-[11px] font-extrabold shadow-md shadow-emerald-950/40 transition-all cursor-pointer active:scale-95"
              >
                {isBn ? 'শুরু করুন' : 'Start Free'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

