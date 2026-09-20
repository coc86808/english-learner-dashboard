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
  ArrowRight
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';

export default function CurriculumVisualizer({ lang = 'en', onExploreCurriculum, onStartPractice }) {
  const isBn = lang === 'bn';
  const [activeTab, setActiveTab] = useState('retention'); // 'retention' | 'units' | 'domains'
  const [hoveredUnit, setHoveredUnit] = useState(null);

  // Active units excluding Unit 4
  const activeUnits = hscUnits.filter(u => u.id !== 'unit-4');

  // Question Category Domains
  const mcqDomains = [
    {
      id: 'synonyms',
      icon: '🔄',
      labelEn: 'Synonym Mastery',
      labelBn: 'সমার্থক শব্দ (Synonyms)',
      count: '858 MCQs',
      pct: 25,
      color: 'from-emerald-500 to-teal-400',
      border: 'border-emerald-500/40',
      bg: 'bg-emerald-500/10',
      descEn: 'Closest contextual meaning, primary and secondary textbook synonyms.',
      descBn: 'পাঠ্যবইয়ের কনটেক্সট অনুযায়ী নিকটতম অর্থ ও প্রায়োগিক সমার্থক শব্দ।'
    },
    {
      id: 'antonyms',
      icon: '🔀',
      labelEn: 'Antonym Accuracy',
      labelBn: 'বিপরীতার্থক শব্দ (Antonyms)',
      count: '858 MCQs',
      pct: 25,
      color: 'from-blue-500 to-indigo-400',
      border: 'border-blue-500/40',
      bg: 'bg-blue-500/10',
      descEn: 'Exact semantic opposites and board examination distractor patterns.',
      descBn: 'বোর্ড স্ট্যান্ডার্ড বিপরীতার্থক শব্দ এবং বিভ্রান্তিকর অপশন পরিহার।'
    },
    {
      id: 'definitions',
      icon: '📖',
      labelEn: 'English Definitions',
      labelBn: 'ইংরেজি সংজ্ঞা (Definitions)',
      count: '858 MCQs',
      pct: 25,
      color: 'from-amber-500 to-orange-400',
      border: 'border-amber-500/40',
      bg: 'bg-amber-500/10',
      descEn: 'Authentic Cambridge/Oxford concise definitions tested in HSC exams.',
      descBn: 'আন্তর্জাতিক অভিধানসম্মত প্রমিত ইংরেজি সংজ্ঞা ও বাক্যের অর্থবোধ।'
    },
    {
      id: 'bangla_meanings',
      icon: '🇧🇩',
      labelEn: 'Bangla Meanings',
      labelBn: 'বাংলা অর্থ (Bangla Meanings)',
      count: '858 MCQs',
      pct: 25,
      color: 'from-rose-500 to-pink-400',
      border: 'border-rose-500/40',
      bg: 'bg-rose-500/10',
      descEn: 'Exact textbook translation and colloquial nuances used in board papers.',
      descBn: 'পাঠ্যবইয়ের প্রতিটি প্যাসেজের প্রাসঙ্গিক বাংলা অনুবাদ ও শব্দার্থ।'
    }
  ];

  return (
    <section className="relative z-10 py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-12 space-y-3">
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
      </div>

      {/* Main Interactive Visualizer Canvas */}
      <div className="bg-[#0f1420]/95 border border-[#1f2738] rounded-3xl p-5 sm:p-7 md:p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden">
        {/* Subtle Ambient Glow */}
        <div className="absolute top-0 right-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

        <AnimatePresence mode="wait">
          {/* TAB 1: RETENTION CURVE VISUALIZATION */}
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
                    <span className="w-3 h-3 rounded-full bg-emerald-500 inline-block shadow-sm shadow-emerald-500/60" />
                    <span>{isBn ? 'Learner Hub স্পেসড রিপিটিশন' : 'Learner Hub Active Recall'}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-slate-400">
                    <span className="w-3 h-0.5 border-b-2 border-dashed border-rose-400 inline-block" />
                    <span>{isBn ? 'সাধারণ মুখস্থ (ভুলে যাওয়ার হার)' : 'Traditional Cramming (Loss)'}</span>
                  </span>
                </div>
              </div>

              {/* Responsive SVG Chart */}
              <div className="relative w-full h-64 sm:h-72 bg-[#090d15] rounded-2xl border border-[#192233] p-4 sm:p-6 flex items-center justify-center overflow-hidden">
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

                  {/* Traditional Forgetting Curve (Decaying Downwards) */}
                  <path
                    d="M 60 40 Q 120 160 220 185 T 450 198 T 660 205"
                    fill="none"
                    stroke="#f43f5e"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                    opacity="0.85"
                  />

                  {/* Spaced Repetition Sawtooth Retention Wave (Learner Hub) */}
                  {/* Day 1: 100% -> 70% -> review back to 95% -> 80% -> review back to 98% -> stabilized at 96% */}
                  <path
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
                  />

                  {/* Shaded Area Under Spaced Repetition Curve */}
                  <polygon
                    points="60,40 140,115 145,48 270,100 275,42 440,75 445,40 660,52 660,210 60,210"
                    fill="url(#emerald-grad)"
                    opacity="0.15"
                  />

                  <defs>
                    <linearGradient id="emerald-grad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#10b981" />
                      <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                    </linearGradient>
                  </defs>

                  {/* Key Milestone Nodes */}
                  <circle cx="60" cy="40" r="5" fill="#10b981" />
                  <circle cx="145" cy="48" r="5" fill="#10b981" />
                  <circle cx="275" cy="42" r="5" fill="#10b981" />
                  <circle cx="445" cy="40" r="5" fill="#10b981" />
                  <circle cx="660" cy="52" r="6" fill="#10b981" stroke="#ffffff" strokeWidth="2" />

                  {/* X-Axis Labels */}
                  <text x="60" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle">{isBn ? '১ম দিন' : 'Day 1'}</text>
                  <text x="145" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle">{isBn ? '৩য় দিন' : 'Day 3'}</text>
                  <text x="275" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle">{isBn ? '৭ম দিন' : 'Day 7'}</text>
                  <text x="445" y="225" fill="#94a3b8" fontSize="11" textAnchor="middle">{isBn ? '১৪তম দিন' : 'Day 14'}</text>
                  <text x="660" y="225" fill="#10b981" fontSize="11" fontWeight="bold" textAnchor="middle">{isBn ? '৩০তম দিন (স্থায়ী মেমোরি)' : 'Day 30 (Mastered)'}</text>
                </svg>
              </div>

              {/* 3 Insight Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="p-4 rounded-2xl bg-[#0b0f17] border border-[#1a2334] space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">{isBn ? 'ভুল হলে স্পেসড রিপিট' : 'Mistake Queue Rule'}</span>
                  <p className="text-sm font-black text-rose-400">{isBn ? '৩ বার ভুল = দুর্বল শব্দ' : '3 Mistakes = Auto Weak Word'}</p>
                  <p className="text-[11px] text-slate-500">{isBn ? '৩টি প্রশ্ন পরপর স্বয়ংক্রিয় পুনরাবৃত্তি' : 'Repeats every 3-4 questions until mastered'}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0f17] border border-[#1a2334] space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">{isBn ? 'মাস্টারি বা পুনরুদ্ধার' : 'Recovery & Mastery'}</span>
                  <p className="text-sm font-black text-emerald-400">{isBn ? '৫ বার সঠিক = মাস্টার্ড' : '5 Correct = Auto Mastered'}</p>
                  <p className="text-[11px] text-slate-500">{isBn ? 'দুর্বল তালিকা থেকে স্বয়ংক্রিয়ভাবে উত্তীর্ণ' : 'Permanently recovered from weak list'}</p>
                </div>

                <div className="p-4 rounded-2xl bg-[#0b0f17] border border-[#1a2334] space-y-1">
                  <span className="text-[11px] font-bold text-slate-400 uppercase">{isBn ? 'রিটেনশন হার' : 'Retention Efficiency'}</span>
                  <p className="text-sm font-black text-cyan-400">{isBn ? '৯৫%+ স্থায়ী মেমোরি' : '95%+ Long-Term Recall'}</p>
                  <p className="text-[11px] text-slate-500">{isBn ? 'বোর্ড পরীক্ষায় সর্বোচ্চ কমন ও নির্ভুলতা' : 'Guaranteed confidence in board examinations'}</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* TAB 2: UNIT VOCABULARY MATRIX */}
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
                    className="px-4 py-2 rounded-xl bg-[#162033] hover:bg-[#1f2d48] border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{isBn ? 'সম্পূর্ণ পাঠ্যক্রম দেখুন' : 'View Full Curriculum'}</span>
                    <ArrowRight size={14} />
                  </button>
                )}
              </div>

              {/* Units Bar Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {activeUnits.map((u) => {
                  const maxWords = 138;
                  const pct = Math.round((u.totalWords / maxWords) * 100);
                  const isHovered = hoveredUnit?.id === u.id;

                  return (
                    <div
                      key={u.id}
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
                          <span className="text-xs font-black text-emerald-400 font-mono">{u.totalWords}</span>
                          <span className="text-[10px] text-slate-400 ml-1">{isBn ? 'শব্দ' : 'Words'}</span>
                        </div>
                      </div>

                      {/* Percentage Bar */}
                      <div className="w-full h-2 bg-[#141b29] rounded-full overflow-hidden mb-2">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>{u.lessons?.length || 0} {isBn ? 'টি লেসন' : 'Lessons'}</span>
                        <span className="text-slate-300 font-semibold font-mono">
                          {u.totalWords * 4} {isBn ? 'টি MCQ' : 'MCQs'}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          )}

          {/* TAB 3: 4-CATEGORY MCQ DISTRIBUTION */}
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

              {/* 4 Category Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mcqDomains.map((d) => (
                  <div
                    key={d.id}
                    className={`p-5 rounded-2xl ${d.bg} border ${d.border} space-y-3 shadow-md hover:scale-[1.01] transition-transform`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{d.icon}</span>
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
                      <div className={`h-full rounded-full bg-gradient-to-r ${d.color} w-full`} />
                    </div>

                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isBn ? d.descBn : d.descEn}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Global Bottom Metric Bar */}
        <div className="mt-8 pt-6 border-t border-[#1c2638] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
          <div className="p-3 rounded-2xl bg-[#090d15] border border-[#192233]">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono block">858</span>
            <span className="text-[11px] font-semibold text-slate-400">{isBn ? 'পাঠ্যবইয়ের শব্দাবলী' : 'Textbook Words'}</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#090d15] border border-[#192233]">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono block">3,432</span>
            <span className="text-[11px] font-semibold text-slate-400">{isBn ? 'বোর্ড স্ট্যান্ডার্ড MCQ' : 'Board Standard MCQs'}</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#090d15] border border-[#192233]">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 font-mono block">45</span>
            <span className="text-[11px] font-semibold text-slate-400">{isBn ? 'এনসিটিবি পাঠ্যবই লেসন' : 'NCTB Lessons'}</span>
          </div>

          <div className="p-3 rounded-2xl bg-[#090d15] border border-[#192233]">
            <span className="text-2xl sm:text-3xl font-black text-purple-400 font-mono block">100%</span>
            <span className="text-[11px] font-semibold text-slate-400">{isBn ? 'হুবহু পাঠ্যবই বাক্য' : 'Verbatim Sentences'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
