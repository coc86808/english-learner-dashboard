import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  TrendingUp, 
  Layers, 
  Target, 
  Sparkles, 
  BookOpen, 
  Award, 
  CheckCircle2, 
  Zap, 
  BrainCircuit, 
  BarChart3,
  Clock,
  ArrowRight,
  RotateCw,
  ArrowLeftRight,
  FileText,
  Languages,
  AlertCircle,
  GraduationCap,
  Play,
  Check,
  Activity,
  Info,
  Compass,
  Flame
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';
import AnimatedCounter from './AnimatedCounter';

export default function CurriculumVisualizer({ lang = 'en', onExploreCurriculum, onStartPractice }) {
  const isBn = lang === 'bn';
  const [activeTab, setActiveTab] = useState('retention'); // 'retention' | 'units' | 'domains'
  const [hoveredUnit, setHoveredUnit] = useState(null);
  const [selectedMilestone, setSelectedMilestone] = useState(2); // default Day 7
  const [isSimulating, setIsSimulating] = useState(false);

  // Active units excluding Unit 4
  const activeUnits = hscUnits.filter(u => u.id !== 'unit-4');

  // Spaced Repetition Milestones Data
  const milestones = [
    { 
      day: 1, 
      dayBn: '১ম দিন',
      dayEn: 'Day 1',
      cx: 70, 
      cy: 35, 
      pct: '100%',
      numericPct: 100,
      titleEn: 'Day 1: Initial Vocabulary Encoding',
      titleBn: '১ম দিন: প্রারম্ভিক শব্দ পরিচিতি ও প্রথম কুইজ',
      badgeEn: '100% Base Encoding',
      badgeBn: '১০০% স্মৃতি বেসলাইন',
      badgeColor: 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30',
      descEn: 'First encounter with 858 textbook words. Without scheduled review, the Ebbinghaus forgetting curve causes ~45% loss within 48 hours.',
      descBn: 'পাঠ্যবইয়ের ৮৫৮টি নতুন শব্দের প্রাথমিক অধ্যায়ন। কোনো রিভিউ না দিলে এভিংহস কার্ভ অনুযায়ী প্রথম ৪৮ ঘণ্টার মধ্যেই প্রায় ৪৫-৫০% তথ্য মুছে যায়।'
    },
    { 
      day: 3, 
      dayBn: '৩য় দিন',
      dayEn: 'Day 3',
      cx: 180, 
      cy: 50, 
      pct: '95%',
      numericPct: 95,
      decayPct: '55%',
      titleEn: 'Day 3: 1st Spaced Repetition Review',
      titleBn: '৩য় দিন: ১ম স্পেসড রিপিটিশন ও রিকল ড্রিল',
      badgeEn: '+40% Immediate Recall Boost',
      badgeBn: '+৪০% মেমোরি পুনরুদ্ধার',
      badgeColor: 'text-teal-400 bg-teal-500/10 border-teal-500/30',
      descEn: 'Just as memory decays toward 55%, the SM-2 engine initiates targeted 4-category MCQ drills, resetting retention to 95% with higher stability.',
      descBn: 'স্মৃতিশক্তি ৫৫%-এ নামতেই ১ম বোর্ড MCQ ড্রিল শুরু হয়। সাইন্যাপ্টিক সংযোগ পুনরুজ্জীবিত হয়ে রিটেনশন তাৎক্ষণিক ৯৫%-এ পৌঁছে।'
    },
    { 
      day: 7, 
      dayBn: '৭ম দিন',
      dayEn: 'Day 7',
      cx: 325, 
      cy: 44, 
      pct: '98%',
      numericPct: 98,
      decayPct: '72%',
      titleEn: 'Day 7: 2nd Synaptic Consolidation',
      titleBn: '৭ম দিন: ২য় সাইন্যাপ্টিক কনসলিডেশন',
      badgeEn: '+26% Stability Factor',
      badgeBn: '+২৬% মেমোরি স্থায়িত্ব',
      badgeColor: 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30',
      descEn: 'Forgetting velocity is now 3x slower. Multi-format synonym & antonym tests solidify neural pathways up to 98%.',
      descBn: 'ভুলে যাওয়ার গতি ৩ গুণ হ্রাস পায়। সমার্থক ও বিপরীতার্থক শব্দের বহুমুখী অনুশীলনে দীর্ঘমেয়াদী স্মৃতিশক্তি ৯৮%-এ স্থায়ী হয়।'
    },
    { 
      day: 14, 
      dayBn: '১৪তম দিন',
      dayEn: 'Day 14',
      cx: 505, 
      cy: 38, 
      pct: '99%',
      numericPct: 99,
      decayPct: '86%',
      titleEn: 'Day 14: Deep Long-Term Storage',
      titleBn: '১৪তম দিন: স্থায়ী নিওকর্টেক্সে রূপান্তর',
      badgeEn: '99% Exam Accuracy',
      badgeBn: '৯৯% বোর্ড নির্ভুলতা',
      badgeColor: 'text-blue-400 bg-blue-500/10 border-blue-500/30',
      descEn: 'Memory transitions from short-term hippocampus to permanent neocortex. Fast context reflexes and effortless accuracy.',
      descBn: 'তথ্য মস্তিষ্কের স্থায়ী নিওকর্টেক্সে সংরক্ষিত হয়। পরীক্ষার প্যাসেজে শব্দ দেখামাত্র তাৎক্ষণিক অর্থ ও ব্যাকরণিক প্রয়োগ স্মরণ।'
    },
    { 
      day: 30, 
      dayBn: '৩০তম দিন (স্থায়ী)',
      dayEn: 'Day 30 (Mastered)',
      cx: 730, 
      cy: 35, 
      pct: '100%',
      numericPct: 100,
      highlight: true,
      titleEn: 'Day 30: Permanent Board Mastery',
      titleBn: '৩০তম দিন: স্থায়ী মেমোরি মাস্টারি',
      badgeEn: '100% Mastered (Zero Cramming)',
      badgeBn: '১০০% স্থায়ী স্মৃতি (পরীক্ষায় পূর্ণ নম্বর)',
      badgeColor: 'text-emerald-400 bg-emerald-500/20 border-emerald-500/50 shadow-sm shadow-emerald-500/40',
      descEn: 'SuperMemo SM-2 algorithm completed. All 858 words are deeply locked into permanent recall, guaranteeing peak HSC board performance.',
      descBn: 'সুপারমেমো SM-2 অ্যালগরিদম সম্পন্ন। পরীক্ষার হলে কোনো ভয় ছাড়াই ৮৫৮টি শব্দ ও ৪টি ফরম্যাটের প্রশ্ন তাৎক্ষণিক সমাধান।'
    }
  ];

  // 30-Day Simulation playback runner
  useEffect(() => {
    let interval;
    if (isSimulating) {
      let step = 0;
      setSelectedMilestone(0);
      interval = setInterval(() => {
        step++;
        if (step < milestones.length) {
          setSelectedMilestone(step);
        } else {
          setIsSimulating(false);
          clearInterval(interval);
        }
      }, 1400);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const activeMilestone = milestones[selectedMilestone] || milestones[0];

  // Question Category Domains with real SVG icons
  const mcqDomains = [
    {
      id: 'synonyms',
      icon: RotateCw,
      labelEn: 'Synonym Mastery',
      labelBn: 'সমার্থক শব্দ (Synonyms)',
      count: '858 MCQs',
      pct: 25,
      color: 'from-emerald-500 to-teal-400',
      textColor: 'text-emerald-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/10',
      iconBg: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      descEn: 'Closest contextual meaning, primary and secondary textbook synonyms.',
      descBn: 'পাঠ্যবইয়ের কনটেক্সট অনুযায়ী নিকটতম অর্থ ও প্রায়োগিক সমার্থক শব্দ।'
    },
    {
      id: 'antonyms',
      icon: ArrowLeftRight,
      labelEn: 'Antonym Accuracy',
      labelBn: 'বিপরীতার্থক শব্দ (Antonyms)',
      count: '858 MCQs',
      pct: 25,
      color: 'from-blue-500 to-indigo-400',
      textColor: 'text-blue-400',
      border: 'border-blue-500/40',
      bg: 'bg-blue-500/10',
      iconBg: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      descEn: 'Exact semantic opposites and board examination distractor patterns.',
      descBn: 'বোর্ড স্ট্যান্ডার্ড বিপরীতার্থক শব্দ এবং বিভ্রান্তিকর অপশন পরিহার।'
    },
    {
      id: 'definitions',
      icon: FileText,
      labelEn: 'English Definitions',
      labelBn: 'ইংরেজি সংজ্ঞা (Definitions)',
      count: '858 MCQs',
      pct: 25,
      color: 'from-amber-500 to-orange-400',
      textColor: 'text-amber-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/10',
      iconBg: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
      descEn: 'Authentic Cambridge/Oxford concise definitions tested in HSC exams.',
      descBn: 'আন্তর্জাতিক অভিধানসম্মত প্রমিত ইংরেজি সংজ্ঞা ও বাক্যের অর্থবোধ।'
    },
    {
      id: 'bangla_meanings',
      icon: Languages,
      labelEn: 'Bangla Meanings',
      labelBn: 'বাংলা অর্থ (Bangla Meanings)',
      count: '858 MCQs',
      pct: 25,
      color: 'from-rose-500 to-pink-400',
      textColor: 'text-rose-400',
      border: 'border-rose-500/40',
      bg: 'bg-rose-500/10',
      iconBg: 'bg-rose-500/20 text-rose-400 border-rose-500/30',
      descEn: 'Exact textbook translation and colloquial nuances used in board papers.',
      descBn: 'পাঠ্যবইয়ের প্রতিটি প্যাসেজের প্রাসঙ্গিক বাংলা অনুবাদ ও শব্দার্থ।'
    }
  ];

  return (
    <section className="relative z-10 py-16 sm:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3.5"
      >
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-black uppercase tracking-wider shadow-lg shadow-emerald-950/30">
          <Sparkles size={15} className="animate-pulse" />
          <span>{isBn ? 'সায়েন্টিফিক ভিজ্যুয়ালাইজার' : 'Scientific Learning Analytics'}</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
          {isBn ? (
            <>
              বিজ্ঞানসম্মত মেমোরি রিটেনশন ও{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                সিলেবাস ল্যাব
              </span>
            </>
          ) : (
            <>
              Scientific Spaced Repetition &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Curriculum Lab
              </span>
            </>
          )}
        </h2>

        <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl mx-auto">
          {isBn
            ? 'মুখস্থের বদলে স্পেসড রিপিটিশন অ্যালগরিদম ও ৪-ডোমেন বোর্ড স্ট্যান্ডার্ড অনুশীলনের মাধ্যমে প্রতিটি শব্দের দীর্ঘমেয়াদী স্মৃতি ধারণ নিশ্চিত করুন।'
            : 'Explore how our SM-2 spaced repetition engine and 4-category question architecture guarantee deep, lasting textbook vocabulary retention.'}
        </p>

        {/* Tab Switcher */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-2.5">
          <button
            onClick={() => setActiveTab('retention')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
              activeTab === 'retention'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/25 border border-emerald-300'
                : 'bg-[#111723] hover:bg-[#161e2e] text-slate-300 hover:text-white border border-[#1f293d]'
            }`}
          >
            <TrendingUp size={16} className={activeTab === 'retention' ? 'text-slate-950' : 'text-emerald-400'} />
            <span>{isBn ? 'মেমোরি রিটেনশন কার্ভ' : 'Retention Curve'}</span>
          </button>

          <button
            onClick={() => setActiveTab('units')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
              activeTab === 'units'
                ? 'bg-gradient-to-r from-cyan-500 to-blue-500 text-slate-950 shadow-lg shadow-cyan-500/25 border border-cyan-300'
                : 'bg-[#111723] hover:bg-[#161e2e] text-slate-300 hover:text-white border border-[#1f293d]'
            }`}
          >
            <BarChart3 size={16} className={activeTab === 'units' ? 'text-slate-950' : 'text-cyan-400'} />
            <span>{isBn ? 'ইউনিটভিত্তিক শব্দ ম্যাট্রিক্স' : 'Unit Vocabulary Matrix'}</span>
          </button>

          <button
            onClick={() => setActiveTab('domains')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
              activeTab === 'domains'
                ? 'bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-lg shadow-purple-500/25 border border-purple-300'
                : 'bg-[#111723] hover:bg-[#161e2e] text-slate-300 hover:text-white border border-[#1f293d]'
            }`}
          >
            <Target size={16} className={activeTab === 'domains' ? 'text-white' : 'text-purple-400'} />
            <span>{isBn ? '৪-ক্যাটাগরি MCQ বিন্যাস' : '4-Category MCQs'}</span>
          </button>
        </div>
      </motion.div>

      {/* Main Interactive Visualizer Cockpit Canvas */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-b from-[#0f1422] via-[#0b0e18] to-[#070a12] border border-[#1f2b42] rounded-3xl p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative overflow-hidden"
      >
        {/* Subtle Ambient Radial Glows */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* TAB 1: RETENTION CURVE VISUALIZATION WITH SMOOTH BEZIER CURVES & HUD */}
          {activeTab === 'retention' && (
            <motion.div
              key="retention"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              {/* Cockpit Analytics Header Bar */}
              <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-[#1c273c]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                    <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                      <BrainCircuit size={22} className="text-emerald-400" />
                      <span>
                        {isBn ? 'স্মরণশক্তি বনাম রিটেনশন গ্রাফ (Ebbinghaus vs Learner Hub SM-2)' : 'Memory Retention vs Traditional Cramming'}
                      </span>
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-400 mt-1">
                    {isBn
                      ? 'এভিংহসের ভুলে যাওয়ার সূত্রের বিপরীতে স্পেসড রিপিটিশন যেভাবে দীর্ঘমেয়াদী স্মৃতি তৈরি করে'
                      : 'Scientific comparison of rapid memory decay vs. spaced intervals locking permanent recall'}
                  </p>
                </div>

                {/* Live Cockpit Metric Badges + Simulation Play Button */}
                <div className="flex flex-wrap items-center gap-3 text-xs font-bold">
                  <div className="px-3 py-1.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span>{isBn ? 'স্পেসড রিটেনশন: ৯৫%+' : 'Spaced Retention: 95%+'}</span>
                  </div>

                  <div className="px-3 py-1.5 rounded-xl bg-rose-500/15 border border-rose-500/30 text-rose-300 flex items-center gap-1.5 shadow-sm">
                    <span className="w-2 h-2 rounded-full bg-rose-400" />
                    <span>{isBn ? 'সাধারণ মুখস্থ: ১৮% অবশিষ্ট' : 'Cramming: 18% Left'}</span>
                  </div>

                  <button
                    onClick={() => setIsSimulating(prev => !prev)}
                    className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black flex items-center gap-1.5 shadow-md shadow-emerald-950/50 cursor-pointer transition-all hover:scale-105"
                  >
                    {isSimulating ? (
                      <>
                        <RotateCw size={14} className="animate-spin" />
                        <span>{isBn ? 'সিমুলেশন চলছে...' : 'Simulating...'}</span>
                      </>
                    ) : (
                      <>
                        <Play size={14} className="fill-slate-950" />
                        <span>{isBn ? '৩০ দিনের সিমুলেশন চালান' : 'Run 30-Day Simulation'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Dynamic Scientific SVG Chart Arena */}
              <div className="relative w-full h-72 sm:h-84 bg-[#070b13] rounded-2xl border border-[#1b253b] p-3 sm:p-6 flex items-center justify-center overflow-hidden shadow-inner">
                {/* Background Tech Grid Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:20px_20px] opacity-40 pointer-events-none" />

                <svg className="w-full h-full relative z-10" viewBox="0 0 800 250" preserveAspectRatio="none">
                  <defs>
                    {/* Emerald Gradient for Active Recall Area */}
                    <linearGradient id="emerald-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" stopOpacity="0.45" />
                      <stop offset="60%" stopColor="#06b6d4" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Crimson Gradient for Cramming Loss Area */}
                    <linearGradient id="rose-area-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.18" />
                      <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.0" />
                    </linearGradient>

                    {/* Neon Filter for Curve Glow */}
                    <filter id="neon-glow-emerald" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Horizontal Grid Lines */}
                  <line x1="60" y1="35" x2="750" y2="35" stroke="#182338" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="60" y1="85" x2="750" y2="85" stroke="#182338" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="60" y1="135" x2="750" y2="135" stroke="#182338" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="60" y1="185" x2="750" y2="185" stroke="#182338" strokeDasharray="4 4" strokeWidth="1" />
                  <line x1="60" y1="230" x2="750" y2="230" stroke="#1f2d48" strokeWidth="1.5" />

                  {/* Y-Axis Labels */}
                  <text x="20" y="39" fill="#94a3b8" fontSize="11" fontWeight="bold" fontFamily="monospace">100%</text>
                  <text x="20" y="89" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="monospace">75%</text>
                  <text x="20" y="139" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="monospace">50%</text>
                  <text x="20" y="189" fill="#64748b" fontSize="11" fontWeight="bold" fontFamily="monospace">25%</text>
                  <text x="25" y="233" fill="#475569" fontSize="10" fontWeight="bold" fontFamily="monospace">0%</text>

                  {/* Traditional Cramming Decay Shading */}
                  <motion.path
                    d="M 70 35 C 115 135 175 195 265 215 C 385 226 550 228 730 230 L 730 230 L 70 230 Z"
                    fill="url(#rose-area-grad)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5 }}
                  />

                  {/* Traditional Forgetting Curve (Smooth Exponential Decay) */}
                  <motion.path
                    d="M 70 35 C 115 135 175 195 265 215 C 385 226 550 228 730 230"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.9 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />

                  {/* Shaded Area Under SM-2 Spaced Repetition Curve */}
                  <motion.path
                    d="M 70 35 
                       C 105 42 140 118 175 130 
                       L 180 50 
                       C 220 58 275 94 320 102 
                       L 325 44 
                       C 375 50 445 68 500 74 
                       L 505 38 
                       C 575 42 660 48 725 50 
                       L 730 35 
                       L 730 230 
                       L 70 230 Z"
                    fill="url(#emerald-area-grad)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.6, delay: 0.4 }}
                  />

                  {/* Scientific Spaced Repetition Smooth Curve with Active Recall Spikes */}
                  <motion.path
                    d="M 70 35 
                       C 105 42 140 118 175 130 
                       L 180 50 
                       C 220 58 275 94 320 102 
                       L 325 44 
                       C 375 50 445 68 500 74 
                       L 505 38 
                       C 575 42 660 48 725 50 
                       L 730 35"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    filter="url(#neon-glow-emerald)"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                  />

                  {/* Review Spike Annotation Arrows / Guides */}
                  {[
                    { x: 177, y1: 130, y2: 50, label: '+40% Boost' },
                    { x: 322, y1: 102, y2: 44, label: '+26% Boost' },
                    { x: 502, y1: 74, y2: 38, label: '+13% Boost' }
                  ].map((guide, gIdx) => (
                    <g key={gIdx}>
                      <line 
                        x1={guide.x} 
                        y1={guide.y1} 
                        x2={guide.x} 
                        y2={guide.y2} 
                        stroke="#06b6d4" 
                        strokeWidth="1.5" 
                        strokeDasharray="2 2"
                      />
                    </g>
                  ))}

                  {/* Key Milestone Nodes with Pulsing Radar Rings & Interactive Selection */}
                  {milestones.map((node, i) => {
                    const isSelected = selectedMilestone === i;
                    return (
                      <g 
                        key={i} 
                        className="cursor-pointer group"
                        onClick={() => setSelectedMilestone(i)}
                      >
                        {/* Outer Pulsing Radar Ring */}
                        <motion.circle
                          cx={node.cx}
                          cy={node.cy}
                          r={isSelected ? 14 : 8}
                          fill="none"
                          stroke={isSelected ? '#34d399' : '#10b981'}
                          strokeWidth={isSelected ? 2 : 1}
                          animate={{ 
                            r: isSelected ? [10, 22, 10] : [6, 14, 6], 
                            opacity: isSelected ? [1, 0.1, 1] : [0.7, 0, 0.7] 
                          }}
                          transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }}
                        />

                        {/* Interactive Highlight Halo */}
                        {isSelected && (
                          <circle
                            cx={node.cx}
                            cy={node.cy}
                            r={12}
                            fill="#10b981"
                            opacity="0.25"
                          />
                        )}

                        {/* Milestone Core Dot */}
                        <motion.circle
                          cx={node.cx}
                          cy={node.cy}
                          r={isSelected ? 7 : (node.highlight ? 6 : 5)}
                          fill={isSelected ? '#ffffff' : (node.highlight ? '#34d399' : '#10b981')}
                          stroke={isSelected ? '#10b981' : '#042f2e'}
                          strokeWidth={isSelected ? 3 : 2}
                          initial={{ scale: 0 }}
                          whileInView={{ scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + i * 0.3, type: 'spring', stiffness: 350, damping: 20 }}
                        />

                        {/* Value Tag Above Node */}
                        <motion.g
                          initial={{ opacity: 0, y: 6 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.5 + i * 0.3 }}
                        >
                          <rect
                            x={node.cx - 20}
                            y={node.cy - 24}
                            width="40"
                            height="16"
                            rx="8"
                            fill={isSelected ? '#10b981' : '#0f172a'}
                            stroke={isSelected ? '#34d399' : '#1e293b'}
                            strokeWidth="1"
                          />
                          <text
                            x={node.cx}
                            y={node.cy - 12}
                            fill={isSelected ? '#022c22' : '#34d399'}
                            fontSize="10"
                            fontWeight="900"
                            fontFamily="monospace"
                            textAnchor="middle"
                          >
                            {node.pct}
                          </text>
                        </motion.g>

                        {/* X-Axis Day Label with Hitbox */}
                        <text
                          x={node.cx}
                          y="244"
                          fill={isSelected ? '#34d399' : (node.highlight ? '#10b981' : '#94a3b8')}
                          fontSize="11"
                          fontWeight={isSelected || node.highlight ? '900' : 'bold'}
                          textAnchor="middle"
                        >
                          {isBn ? node.dayBn : node.dayEn}
                        </text>
                      </g>
                    );
                  })}
                </svg>
              </div>

              {/* Dynamic Interactive Milestone HUD / Explainer Card */}
              <motion.div 
                key={activeMilestone.day}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="p-5 rounded-2xl bg-[#0a0e19] border border-[#202d45] space-y-3 shadow-lg relative overflow-hidden"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 flex items-center justify-center font-black font-mono text-sm shrink-0">
                      {activeMilestone.day}
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-black text-white">
                        {isBn ? activeMilestone.titleBn : activeMilestone.titleEn}
                      </h4>
                      <span className="text-xs text-slate-400 font-mono">
                        {isBn ? `রিটেনশন রেট: ${activeMilestone.pct}` : `Target Retention: ${activeMilestone.pct}`}
                      </span>
                    </div>
                  </div>

                  <div className={`px-3 py-1 rounded-full text-xs font-black border ${activeMilestone.badgeColor} self-start sm:self-auto`}>
                    {isBn ? activeMilestone.badgeBn : activeMilestone.badgeEn}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isBn ? activeMilestone.descBn : activeMilestone.descEn}
                </p>

                {/* Milestone Day Quick Selectors */}
                <div className="pt-2 flex flex-wrap items-center gap-2 border-t border-[#172236]">
                  <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1">
                    <Info size={12} className="text-cyan-400" />
                    <span>{isBn ? 'অন্যান্য ধাপ দেখুন:' : 'Inspect Stage:'}</span>
                  </span>
                  {milestones.map((m, idx) => (
                    <button
                      key={m.day}
                      onClick={() => setSelectedMilestone(idx)}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                        selectedMilestone === idx
                          ? 'bg-emerald-500 text-slate-950 font-black shadow-sm'
                          : 'bg-[#121927] hover:bg-[#182338] text-slate-300 border border-[#1d293f]'
                      }`}
                    >
                      {isBn ? m.dayBn : m.dayEn}
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* 3 Insight Metric Rule Cards with SVG Icons & Glows */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-2xl bg-[#0a0e19] border border-[#1c273d] hover:border-rose-500/50 space-y-2 transition-all shadow-md group relative overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-rose-500/15 border border-rose-500/30 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                      <AlertCircle size={15} />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase text-slate-400">{isBn ? 'ভুল হলে স্পেসড রিপিট' : 'Mistake Queue Rule'}</span>
                  </div>
                  <p className="text-base font-black text-rose-400">{isBn ? '৩ বার ভুল = দুর্বল শব্দ' : '3 Mistakes = Auto Weak Word'}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{isBn ? '৩-৪টি প্রশ্ন পরপর স্বয়ংক্রিয় পুনরাবৃত্তি ও রিভিশন শিটে সংযোজন।' : 'Repeats every 3-4 questions until mastered and synced to PDF queue.'}</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-2xl bg-[#0a0e19] border border-[#1c273d] hover:border-emerald-500/50 space-y-2 transition-all shadow-md group relative overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                      <CheckCircle2 size={15} />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase text-slate-400">{isBn ? 'মাস্টারি বা পুনরুদ্ধার' : 'Recovery & Mastery'}</span>
                  </div>
                  <p className="text-base font-black text-emerald-400">{isBn ? '৫ বার সঠিক = মাস্টার্ড' : '5 Correct = Auto Mastered'}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{isBn ? 'দুর্বল তালিকা থেকে স্থায়ীভাবে উত্তীর্ণ হয়ে মাস্টার্ড পুলে স্থিতি।' : 'Permanently recovered from weak list into subconscious active memory.'}</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-2xl bg-[#0a0e19] border border-[#1c273d] hover:border-cyan-500/50 space-y-2 transition-all shadow-md group relative overflow-hidden"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform">
                      <TrendingUp size={15} />
                    </div>
                    <span className="text-[11px] font-extrabold uppercase text-slate-400">{isBn ? 'রিটেনশন হার' : 'Retention Efficiency'}</span>
                  </div>
                  <p className="text-base font-black text-cyan-400">{isBn ? '৯৫%+ স্থায়ী স্মৃতি' : '95%+ Long-Term Recall'}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{isBn ? 'বোর্ড পরীক্ষায় দ্বিধাহীন সর্বোচ্চ আত্মবিশ্বাস ও সর্বোচ্চ কমন।' : 'Guaranteed effortless recall in final HSC English board examinations.'}</p>
                </motion.div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: UNIT VOCABULARY MATRIX WITH ANIMATED PROGRESS BARS */}
          {activeTab === 'units' && (
            <motion.div
              key="units"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#1b2538] flex-wrap gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <BookOpen size={20} className="text-cyan-400" />
                    <span>{isBn ? '১১টি সক্রিয় ইউনিট ও ৪৫টি লেসনের শব্দ বিন্যাস' : '11 Active Units & 45 Lessons Vocabulary Breakdown'}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {isBn
                      ? 'প্রতিটি ইউনিটের মোট শব্দসংখ্যা ও ৪ গুণ বোর্ড এমসিকিউয়ের পরিসংখ্যান'
                      : 'Interactive word volume and corresponding 4x MCQ counts across NCTB units'}
                  </p>
                </div>

                {onExploreCurriculum && (
                  <button
                    onClick={onExploreCurriculum}
                    className="px-4 py-2 rounded-xl bg-[#162033] hover:bg-[#1f2d48] border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-sm hover:shadow-cyan-950/40"
                  >
                    <span>{isBn ? 'সম্পূর্ণ পাঠ্যক্রম দেখুন' : 'View Full Curriculum'}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {/* Units Bar Grid with Staggered Entrance and Animated Progress Bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {activeUnits.map((u, idx) => {
                  const maxWords = 138;
                  const pct = Math.round((u.totalWords / maxWords) * 100);
                  const isHovered = hoveredUnit?.id === u.id;

                  return (
                    <motion.div
                      key={u.id}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.04, duration: 0.4 }}
                      onMouseEnter={() => setHoveredUnit(u)}
                      onMouseLeave={() => setHoveredUnit(null)}
                      className={`p-4 rounded-2xl bg-[#090d15] border transition-all duration-200 cursor-pointer ${
                        isHovered
                          ? 'border-cyan-500/60 bg-[#121927] shadow-lg shadow-cyan-950/40'
                          : 'border-[#1a2334] hover:border-slate-600'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-black text-cyan-400 bg-cyan-500/10 px-2 py-0.5 rounded-lg border border-cyan-500/30">
                            {u.unitNumber}
                          </span>
                          <span className="text-xs sm:text-sm font-bold text-white truncate max-w-[200px] sm:max-w-[240px]">
                            {isBn ? u.unitTitleBn : u.unitTitle}
                          </span>
                        </div>
                        <div className="text-right">
                          <span className="text-xs font-black text-emerald-400 font-mono">
                            <AnimatedCounter target={u.totalWords} isBn={isBn} />
                          </span>
                          <span className="text-[10px] text-slate-400 ml-1">{isBn ? 'শব্দ' : 'Words'}</span>
                        </div>
                      </div>

                      {/* Animated Percentage Bar */}
                      <div className="w-full h-2 bg-[#141b29] rounded-full overflow-hidden mb-2">
                        <motion.div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400"
                          initial={{ width: 0 }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.9, delay: idx * 0.05, ease: 'easeOut' }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{u.lessons?.length || 0} {isBn ? 'টি লেসন' : 'Lessons'}</span>
                        <span className="text-slate-300 font-semibold font-mono">
                          <AnimatedCounter target={u.totalWords * 4} isBn={isBn} /> {isBn ? 'টি MCQ' : 'MCQs'}
                        </span>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 3: 4-CATEGORY MCQ DISTRIBUTION WITH SVG ICONS */}
          {activeTab === 'domains' && (
            <motion.div
              key="domains"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#1b2538] flex-wrap gap-3">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <Target size={20} className="text-purple-400" />
                    <span>{isBn ? 'বোর্ড পরীক্ষার ৪টি ক্যাটাগরির সুষম প্রশ্ন কাঠামো' : 'Board-Standard 4-Category MCQ Distribution'}</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {isBn
                      ? 'প্রতিটি শব্দের জন্য ২৫% করে সমান অনুপাতে ৪টি পূর্ণাঙ্গ বোর্ড স্ট্যান্ডার্ড এমসিকিউ'
                      : 'Every single word yields 4 distinct MCQs: Synonym, Antonym, Definition, and Bangla Meaning'}
                  </p>
                </div>

                <div className="text-xs font-bold px-3 py-1.5 rounded-xl bg-purple-500/15 border border-purple-500/30 text-purple-300">
                  ৩,৪৩২টি সর্বমোট প্রশ্ন
                </div>
              </div>

              {/* 4 Category Cards with Crisp SVG Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mcqDomains.map((d, idx) => {
                  const Icon = d.icon;
                  return (
                    <motion.div
                      key={d.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1, duration: 0.4 }}
                      className={`p-5 rounded-2xl ${d.bg} border ${d.border} space-y-3 shadow-md hover:scale-[1.01] transition-transform`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center border ${d.iconBg} shadow-sm shrink-0`}>
                            <Icon size={20} />
                          </div>
                          <div>
                            <h4 className="text-sm sm:text-base font-extrabold text-white">
                              {isBn ? d.labelBn : d.labelEn}
                            </h4>
                            <span className="text-[11px] font-bold text-slate-300 font-mono">
                              {d.count} (২৫% সমানুপাতিক)
                            </span>
                          </div>
                        </div>
                        <span className="text-lg font-black text-white/90 font-mono">25%</span>
                      </div>

                      <div className="w-full h-1.5 bg-black/40 rounded-full overflow-hidden">
                        <motion.div 
                          className={`h-full rounded-full bg-gradient-to-r ${d.color}`} 
                          initial={{ width: 0 }}
                          whileInView={{ width: '100%' }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.2 }}
                        />
                      </div>

                      <p className="text-xs text-slate-300 leading-relaxed">
                        {isBn ? d.descBn : d.descEn}
                      </p>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Bottom Metric Bar: Upgraded Cyber-Academic Command Cards */}
        <div className="mt-10 pt-8 border-t border-[#1c273e] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {/* Card 1: 858 Words */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#121927] to-[#080d16] border border-[#1e2a3e] hover:border-emerald-500/50 transition-all shadow-lg hover:shadow-emerald-950/40 group flex flex-col items-center justify-center space-y-2 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(16,185,129,0.35)] transition-all mb-1">
              <BookOpen size={22} />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              <AnimatedCounter target={858} isBn={isBn} />
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/25 text-emerald-400 text-[10px] font-black uppercase tracking-wider">
              {isBn ? '১০০% সিলেবাস যাচাইকৃত' : '100% NCTB Verified'}
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {isBn ? 'পাঠ্যবইয়ের শব্দাবলী' : 'Textbook Words'}
            </span>
          </motion.div>

          {/* Card 2: 3,432 MCQs */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#121927] to-[#080d16] border border-[#1e2a3e] hover:border-cyan-500/50 transition-all shadow-lg hover:shadow-cyan-950/40 group flex flex-col items-center justify-center space-y-2 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.35)] transition-all mb-1">
              <GraduationCap size={22} />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              <AnimatedCounter target={3432} isBn={isBn} />
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/25 text-cyan-400 text-[10px] font-black uppercase tracking-wider">
              {isBn ? 'প্রতি শব্দে ৪ ফরম্যাট' : '4 Formats per Word'}
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {isBn ? 'বোর্ড স্ট্যান্ডার্ড MCQ' : 'Board Standard MCQs'}
            </span>
          </motion.div>

          {/* Card 3: 45 Lessons */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#121927] to-[#080d16] border border-[#1e2a3e] hover:border-amber-500/50 transition-all shadow-lg hover:shadow-amber-950/40 group flex flex-col items-center justify-center space-y-2 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-amber-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(245,158,11,0.35)] transition-all mb-1">
              <Layers size={22} />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              <AnimatedCounter target={45} isBn={isBn} />
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/25 text-amber-400 text-[10px] font-black uppercase tracking-wider">
              {isBn ? '১১টি সক্রিয় ইউনিট' : '11 Active Units'}
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {isBn ? 'এনসিটিবি পাঠ্যবই লেসন' : 'NCTB Lessons'}
            </span>
          </motion.div>

          {/* Card 4: 100% Verbatim Sentences */}
          <motion.div 
            whileHover={{ y: -6, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="p-5 rounded-2xl bg-gradient-to-b from-[#121927] to-[#080d16] border border-[#1e2a3e] hover:border-purple-500/50 transition-all shadow-lg hover:shadow-purple-950/40 group flex flex-col items-center justify-center space-y-2 relative overflow-hidden"
          >
            <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="w-12 h-12 rounded-2xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.35)] transition-all mb-1">
              <CheckCircle2 size={22} />
            </div>
            <div className="text-3xl sm:text-4xl font-black text-white font-mono tracking-tight">
              <AnimatedCounter target={100} suffix="%" isBn={isBn} />
            </div>
            <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/25 text-purple-400 text-[10px] font-black uppercase tracking-wider">
              {isBn ? 'হুবহু পাঠ্যবই বাক্য' : 'Exact Context'}
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {isBn ? 'প্রামাণ্য কনটেক্সট' : 'Verbatim Sentences'}
            </span>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
