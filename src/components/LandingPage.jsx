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
  HelpCircle,
  BrainCircuit
} from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';
import CurriculumVisualizer from './landing/CurriculumVisualizer';
import AnimatedCounter from './landing/AnimatedCounter';

export default function LandingPage({ 
  onOpenAuth, 
  onDirectLogin, 
  lang = 'en', 
  setLang,
  onNavigateAbout,
  onNavigateTerms,
  onNavigateCurriculum,
  onNavigateTeachers,
  onNavigateFAQ
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
      boardTag: 'Unit 1 • Lesson 1'
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
      boardTag: 'Unit 1 • Lesson 1'
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
      boardTag: 'Unit 1 • Lesson 1'
    },
    {
      word: 'Persevere',
      pos: 'Verb',
      phonetic: '/ˌpɜː.sɪˈvɪər/',
      unit: 'Unit 6 • Dreams',
      meaningBn: 'অধ্যবসায় করা / শত বাধাতেও চালিয়ে যাওয়া',
      meaningEn: 'Continue in a course of action even in the face of difficulty.',
      synonyms: ['Persist', 'Endure', 'Carry on', 'Tenacious'],
      antonyms: ['Give up', 'Surrender', 'Abandon', 'Yield'],
      sentence: 'HSC candidates must persevere through rigorous vocabulary recall.',
      boardTag: 'Unit 6 • Lesson 1'
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
      score: 'Mastered 1,075+ Words',
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

  // 3. Sticky Bottom CTA Bar Visibility on Scroll (hides when reaching bottom CTA/footer)
  const [showStickyCTA, setShowStickyCTA] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (typeof window !== 'undefined') {
        const isNearBottom = window.innerHeight + window.scrollY >= (document.documentElement.scrollHeight - 750);
        if (window.scrollY > 400 && !isNearBottom) {
          setShowStickyCTA(true);
        } else {
          setShowStickyCTA(false);
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 4. FAQ Accordion State
  const [openFaqIdx, setOpenFaqIdx] = useState(null);

  const faqs = [
    {
      q: isBn ? 'Learner Hub এ কীভাবে অনুশীলন শুরু করব?' : 'How do I start practicing on Learner Hub?',
      a: isBn 
        ? 'সহজেই একাউন্ট খুলে বা ইনস্ট্যান্ট ১-ক্লিক ডেমো দিয়ে আপনি পাঠ্যবই ভোকাবুলারি, ৩ডি ফ্ল্যাশকার্ড ও ৪-ক্যাটাগরি বোর্ড MCQ পরীক্ষা শুরু করতে পারবেন।'
        : 'Sign up in under 30 seconds or test with our 1-click instant demo to start practicing textbook vocabulary, 3D flashcards, and 4-category board MCQs.'
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
              ? '🎉 এইচএসসি ২০২৬ ব্যাচ: ৮৫৮টি পাঠ্যবই ভোকাবুলারি ও ৩,৪৩২টি বোর্ড MCQ লাইভ!'
              : '🎉 NCTB 2026 HSC English Exam Prep: 858 Words & 3,432 Board MCQs Live!'}
          </span>
          <button
            onClick={() => onOpenAuth(true)}
            className="hidden md:inline-flex items-center gap-1 text-xs font-bold text-white underline underline-offset-4 hover:text-emerald-300 ml-2 cursor-pointer transition-colors"
          >
            <span>{isBn ? 'অনুশীলন শুরু করুন' : 'Start Practicing'}</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* 1. Public Top Navigation Bar */}
      <header className="sticky top-0 z-40 border-b border-[#1e293b]/90 bg-[#0c0f17]/90 backdrop-blur-xl transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo */}
          <div className="flex items-center gap-3.5">
            <img
              src="/logo.png"
              alt="Learner Hub"
              className="w-11 h-11 rounded-2xl object-cover shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500/30 border border-emerald-500/40"
            />
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
          <nav className="hidden lg:flex items-center gap-7 text-xs font-bold text-slate-300">
            <a href="#features" className="hover:text-emerald-400 transition-colors">
              {isBn ? 'ফিচারসমূহ' : 'Features'}
            </a>
            {onNavigateCurriculum && (
              <button onClick={onNavigateCurriculum} className="hover:text-emerald-400 transition-colors cursor-pointer">
                {isBn ? 'পাঠ্যক্রম' : 'Curriculum'}
              </button>
            )}
            {onNavigateTeachers && (
              <button onClick={onNavigateTeachers} className="hover:text-emerald-400 transition-colors cursor-pointer">
                {isBn ? 'শিক্ষকদের জন্য' : 'Teachers'}
              </button>
            )}
            {onNavigateFAQ && (
              <button onClick={onNavigateFAQ} className="hover:text-emerald-400 transition-colors cursor-pointer">
                {isBn ? 'প্রশ্নোত্তর (FAQ)' : 'FAQ'}
              </button>
            )}
            {onNavigateAbout && (
              <button 
                onClick={onNavigateAbout}
                className="hover:text-cyan-400 transition-colors cursor-pointer"
              >
                {isBn ? 'পরিচিতি' : 'About'}
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
              <span>{isBn ? 'প্রস্তুতি শুরু করুন' : 'Get Started'}</span>
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

              {/* Floating Dynamic Key Metric Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
                <motion.div 
                  animate={{ y: [-3, 3, -3] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="px-3.5 py-1.5 rounded-full bg-[#111827]/90 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-emerald-950/40"
                >
                  <BookOpen size={13} className="text-emerald-400" />
                  <span>{isBn ? '৮৫৮টি পাঠ্যবই ভোকাবুলারি' : '858 Verified NCTB Words'}</span>
                </motion.div>

                <motion.div 
                  animate={{ y: [3, -3, 3] }}
                  transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut' }}
                  className="px-3.5 py-1.5 rounded-full bg-[#111827]/90 border border-cyan-500/40 text-cyan-300 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-cyan-950/40"
                >
                  <GraduationCap size={13} className="text-cyan-400" />
                  <span>{isBn ? '৩,৪৩২টি বোর্ড MCQ' : '3,432 Board Standard MCQs'}</span>
                </motion.div>

                <motion.div 
                  animate={{ y: [-2, 2, -2] }}
                  transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut' }}
                  className="px-3.5 py-1.5 rounded-full bg-[#111827]/90 border border-amber-500/40 text-amber-300 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-950/40"
                >
                  <BrainCircuit size={13} className="text-amber-400" />
                  <span>{isBn ? 'SM-2 স্পেসড রিপিটিশন' : 'SM-2 Active Recall Engine'}</span>
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <button
                  onClick={() => onOpenAuth(true)}
                  className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-500 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.45)] transition-all cursor-pointer active:scale-95 border border-emerald-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 w-1/2 h-full bg-white/20 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000" />
                  <span>{isBn ? '🚀 সাইন আপ করে শুরু করুন' : '🚀 Start Practicing (Sign Up)'}</span>
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>

                <button
                  onClick={onDirectLogin}
                  className="w-full sm:w-auto px-7 py-4 rounded-2xl bg-[#111723] hover:bg-[#182236] border border-[#243147] hover:border-amber-500/60 text-slate-200 hover:text-white font-extrabold text-sm sm:text-base flex items-center justify-center gap-2.5 transition-all cursor-pointer active:scale-95 shadow-lg group"
                  title="Instant Demo Access"
                >
                  <Zap size={18} className="text-amber-400 fill-amber-400 group-hover:scale-125 transition-transform" />
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
                  <span>{isBn ? 'স্মার্ট স্পেসড-রিপিটিশন ও বিজ্ঞাপনমুক্ত' : 'Spaced Repetition & Ad-Free'}</span>
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

      {/* 3. Animated Stats Counter Strip: Cyber-Academic Command Pillars */}
      <motion.section 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="py-10 bg-gradient-to-b from-[#090d15] via-[#0b0f1a] to-[#080c14] border-y border-[#1a2336] relative z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                target: 858,
                suffix: '+',
                labelEn: 'Textbook Vocabulary Words',
                labelBn: 'পাঠ্যবইয়ের নিশ্চিত শব্দাবলী',
                badgeEn: '100% NCTB Verified',
                badgeBn: '১০০% সিলেবাস যাচাইকৃত',
                icon: BookOpen,
                color: 'text-emerald-400',
                border: 'border-emerald-500/30 hover:border-emerald-500/70',
                bgGradient: 'from-emerald-500/10 via-[#111a29] to-[#0a0f19]',
                iconBg: 'bg-emerald-500/20 border-emerald-500/40 text-emerald-400 shadow-emerald-950/50'
              },
              {
                target: 3432,
                suffix: '+',
                labelEn: 'Board Standard MCQs',
                labelBn: 'বোর্ড স্ট্যান্ডার্ড MCQ প্রশ্নব্যাংক',
                badgeEn: '4 Formats per Word',
                badgeBn: 'প্রতি শব্দে ৪ ফরম্যাট',
                icon: GraduationCap,
                color: 'text-cyan-400',
                border: 'border-cyan-500/30 hover:border-cyan-500/70',
                bgGradient: 'from-cyan-500/10 via-[#111a29] to-[#0a0f19]',
                iconBg: 'bg-cyan-500/20 border-cyan-500/40 text-cyan-400 shadow-cyan-950/50'
              },
              {
                target: 12,
                suffix: '',
                labelEn: 'NCTB Units Covered',
                labelBn: '১২টি ইউনিট সম্পূর্ণ সিলেবাস',
                badgeEn: '45 NCTB Lessons',
                badgeBn: '৪৫টি প্রামাণ্য লেসন',
                icon: Layers,
                color: 'text-amber-400',
                border: 'border-amber-500/30 hover:border-amber-500/70',
                bgGradient: 'from-amber-500/10 via-[#111a29] to-[#0a0f19]',
                iconBg: 'bg-amber-500/20 border-amber-500/40 text-amber-400 shadow-amber-950/50'
              },
              {
                target: 99.4,
                decimals: 1,
                suffix: '%',
                labelEn: 'Student Exam Pass Rate',
                labelBn: 'শিক্ষার্থীদের সাফল্যের হার',
                badgeEn: 'Board Exam Proven',
                badgeBn: 'বোর্ড পরীক্ষায় প্রমাণিত',
                icon: Trophy,
                color: 'text-purple-400',
                border: 'border-purple-500/30 hover:border-purple-500/70',
                bgGradient: 'from-purple-500/10 via-[#111a29] to-[#0a0f19]',
                iconBg: 'bg-purple-500/20 border-purple-500/40 text-purple-400 shadow-purple-950/50'
              }
            ].map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className={`p-6 rounded-3xl border ${stat.border} bg-gradient-to-b ${stat.bgGradient} shadow-xl backdrop-blur-xl flex flex-col justify-between transition-all duration-300 group relative overflow-hidden`}
                >
                  <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl border ${stat.iconBg} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform shadow-md`}>
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full bg-black/40 border border-white/10 text-slate-300">
                      {isBn ? stat.badgeBn : stat.badgeEn}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <div className={`text-3xl sm:text-4xl lg:text-5xl font-black ${stat.color} tracking-tight font-mono`}>
                      <AnimatedCounter 
                        target={stat.target} 
                        decimals={stat.decimals || 0}
                        suffix={stat.suffix} 
                        isBn={isBn} 
                      />
                    </div>
                    <div className="text-xs sm:text-sm text-slate-300 font-semibold leading-snug pt-1">
                      {isBn ? stat.labelBn : stat.labelEn}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* 4. Four Core Pillars Grid with Glassmorphic Glowing Cards */}
      <section id="features" className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3.5 max-w-3xl mx-auto"
          >
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
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Feature 1: Flashcards */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.1, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-b from-[#131a2b] via-[#0f1422] to-[#0a0d15] border border-[#1e293b] hover:border-amber-500/60 p-6 rounded-3xl space-y-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(245,158,11,0.25)] group cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white shadow-lg shadow-amber-950/60 group-hover:scale-110 transition-transform">
                    <Layers size={26} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-300">
                    {isBn ? '৩ডি ফ্লিপ ও অডিও' : '3D Audio & Flip'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
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
            </motion.div>

            {/* Feature 2: 4-Category Exams */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.2, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-b from-[#131a2b] via-[#0f1422] to-[#0a0d15] border border-[#1e293b] hover:border-emerald-500/60 p-6 rounded-3xl space-y-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(16,185,129,0.25)] group cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 flex items-center justify-center text-white shadow-lg shadow-emerald-950/60 group-hover:scale-110 transition-transform">
                    <GraduationCap size={26} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-300">
                    {isBn ? '৪টি ক্যাটাগরি' : '4 Board Formats'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-emerald-300 transition-colors">
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
            </motion.div>

            {/* Feature 3: Weak Words & PDF */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.3, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-b from-[#131a2b] via-[#0f1422] to-[#0a0d15] border border-[#1e293b] hover:border-rose-500/60 p-6 rounded-3xl space-y-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(244,63,94,0.25)] group cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-rose-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-rose-600 to-red-600 flex items-center justify-center text-white shadow-lg shadow-rose-950/60 group-hover:scale-110 transition-transform">
                    <FileDown size={26} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-500/10 border border-rose-500/25 text-rose-300">
                    {isBn ? '১-ক্লিক PDF এক্সপোর্ট' : '1-Click PDF'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-rose-300 transition-colors">
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
            </motion.div>

            {/* Feature 4: Leaderboard & Spaced Mastery */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ delay: 0.4, duration: 0.5 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="bg-gradient-to-b from-[#131a2b] via-[#0f1422] to-[#0a0d15] border border-[#1e293b] hover:border-cyan-500/60 p-6 rounded-3xl space-y-4 transition-all duration-300 hover:shadow-[0_10px_30px_rgba(6,182,212,0.25)] group cursor-pointer flex flex-col justify-between relative overflow-hidden"
            >
              <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-cyan-950/60 group-hover:scale-110 transition-transform">
                    <Trophy size={26} />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-300">
                    {isBn ? 'দৈনিক স্ট্রিক ও XP' : 'Daily Flame & XP'}
                  </span>
                </div>
                <h3 className="text-lg font-black text-white group-hover:text-cyan-300 transition-colors">
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
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Curriculum & Memory Retention Visualizer */}
      <CurriculumVisualizer
        lang={lang}
        onExploreCurriculum={() => onNavigateCurriculum ? onNavigateCurriculum() : onOpenAuth(true)}
        onStartPractice={() => onOpenAuth(true)}
      />

      {/* 5. Complete 12 Units Curriculum Coverage Section */}
      <section id="curriculum" className="py-20 bg-[#0a0d15] border-y border-[#171f2e] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3.5 max-w-3xl mx-auto"
          >
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
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hscUnits.map((unit, unitIdx) => (
              <motion.div 
                key={unit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ delay: (unitIdx % 6) * 0.06, duration: 0.4 }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Student Testimonials Carousel Section */}
      <section id="testimonials" className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <motion.div 
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-3 max-w-2xl mx-auto"
          >
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
          </motion.div>

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
      <section className="py-24 relative z-10 overflow-hidden">
        {/* Ambient background radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-96 bg-gradient-to-tr from-emerald-500/20 via-teal-500/15 to-cyan-500/20 rounded-full blur-[110px] pointer-events-none" />
        <div className="absolute -top-10 right-1/4 w-72 h-72 bg-emerald-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="relative rounded-[32px] overflow-hidden border border-emerald-500/30 bg-[#111723]/95 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-2xl p-8 sm:p-14 lg:p-16 text-center space-y-7">
            
            {/* Top hairline border accent */}
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-emerald-400/50 to-transparent pointer-events-none" />

            {/* Subtle cyber grid texture overlay with soft radial mask */}
            <div 
              className="absolute inset-0 bg-[linear-gradient(to_right,#10b9810d_1px,transparent_1px),linear-gradient(to_bottom,#10b9810d_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none"
              style={{ maskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)', WebkitMaskImage: 'radial-gradient(ellipse 70% 60% at 50% 50%, #000 40%, transparent 100%)' }}
            />

            {/* Glowing curriculum badge */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs sm:text-sm font-bold tracking-wide shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <GraduationCap size={16} className="text-emerald-400" />
                <span>{isBn ? 'এইচএসসি ২০২৬ স্পেশাল এডিশন • এনসিটিবি সিলেবাস' : 'NCTB 2025–2026 Aligned • Exam Ready'}</span>
              </div>
            </div>

            {/* Headline with gradient shimmer */}
            <div className="relative z-10 space-y-4">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.2] max-w-3xl mx-auto">
                {isBn ? (
                  <>
                    এইচএসসি ইংরেজি বোর্ড পরীক্ষায় সেরা প্রস্তুতির জন্য{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                      আজই শুরু করুন
                    </span>
                  </>
                ) : (
                  <>
                    Ready to Conquer Your{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-300">
                      HSC English Exam?
                    </span>
                  </>
                )}
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-normal">
                {isBn
                  ? 'অ্যাকাউন্ট খুলে আজ থেকেই স্মার্ট স্পেসড-রিপিটিশন পদ্ধতিতে ৮৫৮টি পাঠ্যবই ভোকাবুলারি ও ৩,৪৩২টি বোর্ড MCQ আয়ত্ত করুন।'
                  : 'Join thousands of HSC students across Bangladesh. Sign up today and master every textbook vocabulary word, board-standard MCQ, and spaced repetition revision.'}
              </p>
            </div>

            {/* Feature trust chips row */}
            <div className="relative z-10 flex flex-wrap items-center justify-center gap-2 sm:gap-3.5 pt-1">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141d2c]/80 border border-slate-700/60 text-xs font-medium text-slate-300 shadow-sm">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>{isBn ? '৩,৪৩২টি অথেনটিক MCQ' : '3,432 Authentic MCQs'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141d2c]/80 border border-slate-700/60 text-xs font-medium text-slate-300 shadow-sm">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>{isBn ? 'স্পেসড রিপিটিশন রিভিশন' : 'Spaced Repetition Review'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141d2c]/80 border border-slate-700/60 text-xs font-medium text-slate-300 shadow-sm">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>{isBn ? 'বোর্ড স্ট্যান্ডার্ড টেস্ট' : 'Board-Standard Tests'}</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#141d2c]/80 border border-slate-700/60 text-xs font-medium text-slate-300 shadow-sm">
                <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                <span>{isBn ? 'স্মার্ট মেমোরি ট্র্যাকিং' : 'Smart Memory Tracking'}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="relative z-10 flex flex-col sm:flex-row items-center justify-center gap-4 pt-3">
              <button
                onClick={() => onOpenAuth(true)}
                className="group relative inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-400 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-sm sm:text-base tracking-wide shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.55)] transition-all duration-300 cursor-pointer active:scale-95 border border-emerald-200/60 overflow-hidden w-full sm:w-auto"
              >
                <div className="absolute inset-0 w-1/2 h-full bg-white/25 skew-x-12 -translate-x-full group-hover:translate-x-[300%] transition-transform duration-1000 ease-out pointer-events-none" />
                <span className="relative z-10 flex items-center gap-2">
                  <span>🚀</span>
                  <span>{isBn ? 'একাউন্ট তৈরি করুন' : 'Create Account'}</span>
                </span>
                <ArrowRight size={18} className="relative z-10 text-slate-950 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onDirectLogin}
                className="group inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-[#131b28]/90 hover:bg-[#1b2536] border border-slate-700/80 hover:border-amber-400/50 text-white font-bold text-sm sm:text-base transition-all duration-300 cursor-pointer active:scale-95 shadow-lg hover:shadow-amber-500/10 w-full sm:w-auto"
              >
                <Zap size={18} className="text-amber-400 fill-amber-400 group-hover:scale-110 group-hover:rotate-12 transition-transform" />
                <span>{isBn ? '১-ক্লিক ডেমো একাউন্ট' : '1-Click Instant Demo'}</span>
              </button>
            </div>

            {/* Micro trust footnote */}
            <div className="relative z-10 pt-2 flex items-center justify-center gap-2 text-xs text-slate-400">
              <CheckCircle2 size={13} className="text-emerald-400" />
              <span>{isBn ? 'সহজ সাইন আপ • ৩০ সেকেন্ডে প্রস্তুত' : 'Quick Sign Up • Instant access in under 30 seconds'}</span>
            </div>

          </div>
        </div>
      </section>

      {/* 9. Comprehensive Public Footer with Standalone Page Links */}
      <footer className="border-t border-[#171f2e] bg-[#070a10] py-12 text-xs text-slate-400 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-[#141b29]">
            <div className="flex items-center gap-3">
              <img
                src="/logo.png"
                alt="Learner Hub"
                className="w-9 h-9 rounded-xl object-cover shadow-md border border-emerald-500/30"
              />
              <div>
                <span className="text-white font-extrabold text-base block">Learner Hub</span>
                <span className="text-slate-500 text-[11px]">NCTB HSC English Smart Learning Engine</span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-semibold text-slate-300">
              {onNavigateCurriculum && (
                <button onClick={onNavigateCurriculum} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {isBn ? 'পাঠ্যক্রম (Curriculum)' : 'Curriculum'}
                </button>
              )}
              {onNavigateTeachers && (
                <button onClick={onNavigateTeachers} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {isBn ? 'শিক্ষকদের জন্য (Teachers)' : 'Teachers'}
                </button>
              )}
              {onNavigateFAQ && (
                <button onClick={onNavigateFAQ} className="hover:text-emerald-400 transition-colors cursor-pointer">
                  {isBn ? 'সাধারণ প্রশ্ন (FAQ)' : 'FAQ'}
                </button>
              )}
              {onNavigateAbout && (
                <button onClick={onNavigateAbout} className="hover:text-cyan-400 transition-colors cursor-pointer font-bold">
                  {isBn ? 'আমাদের পরিচিতি (About Us)' : 'About Us'}
                </button>
              )}
              {onNavigateTerms && (
                <button onClick={onNavigateTerms} className="hover:text-emerald-400 transition-colors cursor-pointer font-bold">
                  {isBn ? 'শর্তাবলী ও নীতিমালা (Terms & Policy)' : 'Terms & Policy'}
                </button>
              )}
              <button onClick={() => onOpenAuth(false)} className="hover:text-emerald-400 transition-colors cursor-pointer text-emerald-400 font-extrabold">
                {isBn ? 'লগইন করুন' : 'Student Sign In'}
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-center sm:text-left">
            <p>
              © 2026 Learner Hub. Tailored for NCTB Higher Secondary Certificate (HSC) Students in Bangladesh.
            </p>
            <div className="flex items-center gap-3 text-xs font-medium">
              {onNavigateCurriculum && (
                <button onClick={onNavigateCurriculum} className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  {isBn ? 'পাঠ্যক্রম' : 'Curriculum'}
                </button>
              )}
              <span className="text-slate-700">•</span>
              {onNavigateTeachers && (
                <button onClick={onNavigateTeachers} className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  {isBn ? 'শিক্ষক কর্নার' : 'Teachers'}
                </button>
              )}
              <span className="text-slate-700">•</span>
              {onNavigateFAQ && (
                <button onClick={onNavigateFAQ} className="text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer">
                  {isBn ? 'প্রশ্নোত্তর' : 'FAQ'}
                </button>
              )}
              <span className="text-slate-700">•</span>
              {onNavigateAbout && (
                <button onClick={onNavigateAbout} className="text-slate-400 hover:text-cyan-400 underline decoration-slate-700 transition-colors cursor-pointer">
                  {isBn ? 'পরিচিতি' : 'About'}
                </button>
              )}
              <span className="text-slate-700">•</span>
              {onNavigateTerms && (
                <button onClick={onNavigateTerms} className="text-slate-400 hover:text-emerald-400 underline decoration-slate-700 transition-colors cursor-pointer">
                  {isBn ? 'শর্তাবলী ও নীতিমালা' : 'Terms & Privacy Policy'}
                </button>
              )}
            </div>
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
                  {isBn ? '৮৫৮টি শব্দ • ৩,৪৩২টি MCQ • স্মার্ট প্র্যাকটিস' : '858 Words • 3,432 MCQs • Smart Prep'}
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
                {isBn ? 'শুরু করুন' : 'Start Now'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

