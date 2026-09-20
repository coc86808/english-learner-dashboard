import React, { useState } from 'react';
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
  GraduationCap
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';
import AnimatedCounter from './AnimatedCounter';

export default function CurriculumVisualizer({ lang = 'en', onExploreCurriculum, onStartPractice }) {
  const isBn = lang === 'bn';
  const [activeTab, setActiveTab] = useState('retention'); // 'retention' | 'units' | 'domains'
  const [hoveredUnit, setHoveredUnit] = useState(null);

  // Active units excluding Unit 4
  const activeUnits = hscUnits.filter(u => u.id !== 'unit-4');

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
    <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header with Scroll Reveal */}
      <motion.div 
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3"
      >
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider shadow-sm">
          <Sparkles size={14} />
          <span>{isBn ? 'লার্নিং ডাটা ও ভিজ্যুয়ালাইজেশন' : 'Learning Analytics & Visualizer'}</span>
        </div>
        
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-white tracking-tight">
          {isBn ? (
            <>
              বিজ্ঞানসম্মত মেমোরি রিটেনশন ও{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                সিলেবাস ম্যাট্রিক্স
              </span>
            </>
          ) : (
            <>
              Scientific Spaced Repetition &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
                Curriculum Matrix
              </span>
            </>
          )}
        </h2>

        <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
          {isBn
            ? 'মুখস্থের বদলে স্পেসড রিপিটিশন অ্যালগরিদম ও ৪-ডোমেন বোর্ড স্ট্যান্ডার্ড অনুশীলনের মাধ্যমে প্রতিটি শব্দের দীর্ঘমেয়াদী স্মৃতি ধারণ নিশ্চিত করুন।'
            : 'Explore how our SM-2 spaced repetition engine and 4-category question architecture guarantee deep, lasting textbook vocabulary retention.'}
        </p>

        {/* Tab Switcher */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-2">
          <button
            onClick={() => setActiveTab('retention')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'retention'
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg shadow-emerald-950/60 border border-emerald-400/50'
                : 'bg-[#111723] hover:bg-[#161e2e] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
            }`}
          >
            <TrendingUp size={16} className={activeTab === 'retention' ? 'text-white' : 'text-emerald-400'} />
            <span>{isBn ? 'মেমোরি রিটেনশন কার্ভ' : 'Retention Curve'}</span>
          </button>

          <button
            onClick={() => setActiveTab('units')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'units'
                ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-950/60 border border-cyan-400/50'
                : 'bg-[#111723] hover:bg-[#161e2e] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
            }`}
          >
            <BarChart3 size={16} className={activeTab === 'units' ? 'text-white' : 'text-cyan-400'} />
            <span>{isBn ? 'ইউনিটভিত্তিক শব্দ ম্যাট্রিক্স' : 'Unit Vocabulary Matrix'}</span>
          </button>

          <button
            onClick={() => setActiveTab('domains')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-2 ${
              activeTab === 'domains'
                ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-950/60 border border-purple-400/50'
                : 'bg-[#111723] hover:bg-[#161e2e] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
            }`}
          >
            <Target size={16} className={activeTab === 'domains' ? 'text-white' : 'text-purple-400'} />
            <span>{isBn ? '৪-ক্যাটাগরি MCQ বিন্যাস' : '4-Category MCQs'}</span>
          </button>
        </div>
      </motion.div>

      {/* Main Interactive Visualizer Canvas */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-30px' }}
        transition={{ duration: 0.6 }}
        className="bg-[#0f1420]/95 border border-[#1f2738] rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden"
      >
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* TAB 1: RETENTION CURVE VISUALIZATION WITH LIVE SVG DRAW ANIMATION */}
          {activeTab === 'retention' && (
            <motion.div
              key="retention"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="space-y-6"
            >
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-[#1b2538]">
                <div>
                  <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                    <BrainCircuit size={20} className="text-emerald-400" />
                    <span>
                      {isBn ? 'স্মরণশক্তি বনাম রিটেনশন গ্রাফ (Ebbinghaus vs Learner Hub SM-2)' : 'Memory Retention vs Traditional Cramming'}
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    {isBn
                      ? 'সাধারণ মুখস্থের তুলনায় স্পেসড রিপিটিশন কীভাবে স্মৃতিশক্তিকে স্থায়ী করে'
                      : 'Comparison of memory decay without review versus scheduled spaced intervals'}
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs font-semibold">
                  <span className="flex items-center gap-1.5 text-emerald-300">
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/60 animate-pulse" />
                    <span>{isBn ? 'Learner Hub স্পেসড রিপিটিশন' : 'Learner Hub Active Recall'}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-3 h-0.5 border-b-2 border-dashed border-rose-400 inline-block" />
                    <span>{isBn ? 'সাধারণ মুখস্থ (ভুলে যাওয়ার হার)' : 'Traditional Cramming (Loss)'}</span>
                  </span>
                </div>
              </div>

              {/* Dynamic SVG Drawing Chart */}
              <div className="relative w-full h-64 sm:h-76 bg-[#090d15] rounded-2xl border border-[#192233] p-4 sm:p-6 flex items-center justify-center overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none">
                  {/* Grid Lines */}
                  <line x1="60" y1="40" x2="660" y2="40" stroke="#1c2536" strokeDasharray="3 3" />
                  <line x1="60" y1="90" x2="660" y2="90" stroke="#1c2536" strokeDasharray="3 3" />
                  <line x1="60" y1="140" x2="660" y2="140" stroke="#1c2536" strokeDasharray="3 3" />
                  <line x1="60" y1="190" x2="660" y2="190" stroke="#1c2536" strokeDasharray="3 3" />

                  {/* Y-Axis Labels */}
                  <text x="25" y="44" fill="#64748b" fontSize="11" fontFamily="monospace">100%</text>
                  <text x="25" y="94" fill="#64748b" fontSize="11" fontFamily="monospace">75%</text>
                  <text x="25" y="144" fill="#64748b" fontSize="11" fontFamily="monospace">50%</text>
                  <text x="25" y="194" fill="#64748b" fontSize="11" fontFamily="monospace">20%</text>

                  {/* Traditional Forgetting Curve (Animated Drawing) */}
                  <motion.path
                    d="M 60 40 Q 120 160 220 185 T 450 198 T 660 205"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    initial={{ pathLength: 0, opacity: 0 }}
                    whileInView={{ pathLength: 1, opacity: 0.85 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.8, ease: "easeInOut" }}
                  />

                  {/* Shaded Area Under Spaced Repetition Curve (Fades in smoothly) */}
                  <motion.polygon
                    points="60,40 140,115 145,48 270,100 275,42 440,75 445,40 660,52 660,210 60,210"
                    fill="url(#emerald-grad)"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 0.18 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: 0.6 }}
                  />

                  {/* Spaced Repetition Sawtooth Retention Wave (Animated Draw-in) */}
                  <motion.path
                    d="M 60 40 
                       Q 110 90 140 115 
                       L 145 48 
                       Q 210 85 270 100 
                       L 275 42 
                       Q 380 65 440 75 
                       L 445 40 
                       Q 550 50 660 52"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 2.2, ease: "easeInOut" }}
                  />

                  <defs>
                    <linearGradient id="emerald-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Key Milestone Nodes with Pulsing Radar Rings & Floating Percentage Badges */}
                  {[
                    { cx: 60, cy: 40, pct: '100%', dayBn: '১ম দিন', dayEn: 'Day 1' },
                    { cx: 145, cy: 48, pct: '95%', dayBn: '৩য় দিন', dayEn: 'Day 3' },
                    { cx: 275, cy: 42, pct: '98%', dayBn: '৭ম দিন', dayEn: 'Day 7' },
                    { cx: 445, cy: 40, pct: '99%', dayBn: '১৪তম দিন', dayEn: 'Day 14' },
                    { cx: 660, cy: 52, pct: '100%', dayBn: '৩০তম দিন (স্থায়ী)', dayEn: 'Day 30 (Mastered)', highlight: true }
                  ].map((node, i) => (
                    <g key={i}>
                      {/* Pulsing Radar Ring */}
                      <motion.circle
                        cx={node.cx}
                        cy={node.cy}
                        r={8}
                        fill="none"
                        stroke="#10b981"
                        strokeWidth="1.5"
                        animate={{ r: [6, 14, 6], opacity: [0.8, 0, 0.8] }}
                        transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.4 }}
                      />
                      {/* Milestone Core Circle */}
                      <motion.circle
                        cx={node.cx}
                        cy={node.cy}
                        r={node.highlight ? 6.5 : 5}
                        fill="#10b981"
                        stroke="#ffffff"
                        strokeWidth={node.highlight ? 2.5 : 1.5}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + i * 0.35, type: 'spring', stiffness: 350, damping: 20 }}
                      />
                      {/* Value Tag Above Node */}
                      <motion.text
                        x={node.cx}
                        y={node.cy - 12}
                        fill="#34d399"
                        fontSize="10"
                        fontWeight="bold"
                        fontFamily="monospace"
                        textAnchor="middle"
                        initial={{ opacity: 0, y: 6 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + i * 0.35 }}
                      >
                        {node.pct}
                      </motion.text>
                      {/* X-Axis Label */}
                      <text
                        x={node.cx}
                        y="225"
                        fill={node.highlight ? '#10b981' : '#94a3b8'}
                        fontSize="11"
                        fontWeight={node.highlight ? 'bold' : 'normal'}
                        textAnchor="middle"
                      >
                        {isBn ? node.dayBn : node.dayEn}
                      </text>
                    </g>
                  ))}
                </svg>
              </div>

              {/* 3 Insight Metric Cards with SVG Icons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="p-4 rounded-2xl bg-[#0b0f17] border border-[#1a2334] space-y-1 hover:border-rose-500/40 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <AlertCircle size={14} className="text-rose-400" />
                    <span className="text-[11px] font-bold uppercase">{isBn ? 'ভুল হলে স্পেসড রিপিট' : 'Mistake Queue Rule'}</span>
                  </div>
                  <p className="text-sm font-black text-rose-400">{isBn ? '৩ বার ভুল = দুর্বল শব্দ' : '3 Mistakes = Auto Weak Word'}</p>
                  <p className="text-[11px] text-slate-500">{isBn ? '৩টি প্রশ্ন পরপর স্বয়ংক্রিয় পুনরাবৃত্তি' : 'Repeats every 3-4 questions until mastered'}</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="p-4 rounded-2xl bg-[#0b0f17] border border-[#1a2334] space-y-1 hover:border-emerald-500/40 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <CheckCircle2 size={14} className="text-emerald-400" />
                    <span className="text-[11px] font-bold uppercase">{isBn ? 'মাস্টারি বা পুনরুদ্ধার' : 'Recovery & Mastery'}</span>
                  </div>
                  <p className="text-sm font-black text-emerald-400">{isBn ? '৫ বার সঠিক = মাস্টার্ড' : '5 Correct = Auto Mastered'}</p>
                  <p className="text-[11px] text-slate-500">{isBn ? 'দুর্বল তালিকা থেকে স্বয়ংক্রিয়ভাবে উত্তীর্ণ' : 'Permanently recovered from weak list'}</p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-4 rounded-2xl bg-[#0b0f17] border border-[#1a2334] space-y-1 hover:border-cyan-500/40 transition-all shadow-sm"
                >
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <TrendingUp size={14} className="text-cyan-400" />
                    <span className="text-[11px] font-bold uppercase">{isBn ? 'রিটেনশন হার' : 'Retention Efficiency'}</span>
                  </div>
                  <p className="text-sm font-black text-cyan-400">{isBn ? '৯৫%+ স্থায়ী মেমোরি' : '95%+ Long-Term Recall'}</p>
                  <p className="text-[11px] text-slate-500">{isBn ? 'বোর্ড পরীক্ষায় সর্বোচ্চ কমন ও নির্ভুলতা' : 'Guaranteed confidence in board examinations'}</p>
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

        {/* Global Bottom Metric Bar with Live Animated Counters & SVG Icons */}
        <div className="mt-8 pt-6 border-t border-[#1c2638] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-4 rounded-2xl bg-[#090d15] border border-[#192233] hover:border-emerald-500/40 transition-all shadow-md group flex flex-col items-center justify-center space-y-1">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform mb-1">
              <BookOpen size={18} />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">
              <AnimatedCounter target={858} isBn={isBn} />
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {isBn ? 'পাঠ্যবইয়ের শব্দাবলী' : 'Textbook Words'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090d15] border border-[#192233] hover:border-cyan-500/40 transition-all shadow-md group flex flex-col items-center justify-center space-y-1">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 group-hover:scale-110 transition-transform mb-1">
              <GraduationCap size={18} />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono block">
              <AnimatedCounter target={3432} isBn={isBn} />
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {isBn ? 'বোর্ড স্ট্যান্ডার্ড MCQ' : 'Board Standard MCQs'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090d15] border border-[#192233] hover:border-amber-500/40 transition-all shadow-md group flex flex-col items-center justify-center space-y-1">
            <div className="w-9 h-9 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform mb-1">
              <Layers size={18} />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">
              <AnimatedCounter target={45} isBn={isBn} />
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {isBn ? 'এনসিটিবি পাঠ্যবই লেসন' : 'NCTB Lessons'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-[#090d15] border border-[#192233] hover:border-purple-500/40 transition-all shadow-md group flex flex-col items-center justify-center space-y-1">
            <div className="w-9 h-9 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform mb-1">
              <CheckCircle2 size={18} />
            </div>
            <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono block">
              <AnimatedCounter target={100} suffix="%" isBn={isBn} />
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              {isBn ? 'হুবহু পাঠ্যবই বাক্য' : 'Verbatim Sentences'}
            </span>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
