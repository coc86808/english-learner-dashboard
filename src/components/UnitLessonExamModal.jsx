import React, { useState } from 'react';
import {
  X,
  BookOpen,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  GraduationCap,
  Play,
  Layers,
  ChevronRight,
  BookMarked,
  CheckCircle,
  HelpCircle,
  BarChart2,
  Clock,
  Award,
  ListOrdered,
  PenTool,
  Plus,
  Minus
} from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';
import { hscQuestionsList, smartInterleaveQuestions } from '../data/questions/hscQuestionsData';
import HSCExamInterface from './HSCExamInterface';
import TextbookReaderModal from './TextbookReaderModal';
import ErrorBoundary from './ErrorBoundary';

export default function UnitLessonExamModal({
  isOpen,
  onClose,
  initialUnit = null,
  initialLesson = null,
  lang = 'bn'
}) {
  const [selectedUnit, setSelectedUnit] = useState(initialUnit || hscUnits[0]);
  const [selectedLesson, setSelectedLesson] = useState(initialLesson || null);
  const [selectedCategories, setSelectedCategories] = useState([
    'synonyms',
    'antonyms',
    'english_meaning',
    'bangla_meaning'
  ]);
  const [questionLimit, setQuestionLimit] = useState(10); // Default: 10 questions
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInputVal, setCustomInputVal] = useState('15');
  const [isExamActive, setIsExamActive] = useState(false);
  const [isTextbookOpen, setIsTextbookOpen] = useState(false);

  if (!isOpen) return null;

  const isBn = lang === 'bn';

  const toggleCategory = (catId) => {
    if (selectedCategories.includes(catId)) {
      if (selectedCategories.length > 1) {
        setSelectedCategories(selectedCategories.filter((c) => c !== catId));
      }
    } else {
      setSelectedCategories([...selectedCategories, catId]);
    }
  };

  const selectAllCategories = () => {
    setSelectedCategories(['synonyms', 'antonyms', 'english_meaning', 'bangla_meaning']);
  };

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setSelectedLesson(null);
    setIsExamActive(false);
    setQuestionLimit(10);
    setIsCustomMode(false);
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsExamActive(false);
    setQuestionLimit(10);
    setIsCustomMode(false);
  };

  const handleBackToUnits = () => {
    setSelectedUnit(null);
    setSelectedLesson(null);
    setIsExamActive(false);
  };

  const getAllMatchingQuestions = () => {
    const categoryFiltered = (hscQuestionsList || []).filter((q) =>
      q && q.category && selectedCategories.includes(q.category)
    );

    if (!selectedUnit) return categoryFiltered;

    const uNum = (selectedUnit.unitNumber || '').toLowerCase();
    const uTitle = (selectedUnit.unitTitle || '').toLowerCase();

    const unitQuestions = categoryFiltered.filter((q) => {
      if (!q || !q.unit) return false;
      const qu = q.unit.toLowerCase();
      return (uNum && (qu.includes(uNum + ':') || new RegExp(`\\b${uNum}\\b`, 'i').test(qu))) || (uTitle && qu.includes(uTitle));
    });

    if (selectedLesson && selectedLesson.id !== 'all') {
      const lNum = (selectedLesson.number || '').toLowerCase();
      const lTitle = (selectedLesson.title || '').toLowerCase();

      const lessonQuestions = unitQuestions.filter((q) => {
        if (!q || !q.unit) return false;
        const qu = q.unit.toLowerCase();
        return (lNum && qu.includes(lNum)) || (lTitle && qu.includes(lTitle));
      });
      if (lessonQuestions.length > 0) return smartInterleaveQuestions(lessonQuestions);
    }

    return smartInterleaveQuestions(unitQuestions.length > 0 ? unitQuestions : categoryFiltered);
  };

  const allAvailableQuestions = getAllMatchingQuestions();

  const handleCustomInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomInputVal(val);
    setIsCustomMode(true);
    if (val) {
      const parsed = Math.max(1, Math.min(Number(val), allAvailableQuestions.length || 100));
      setQuestionLimit(parsed);
    }
  };

  const handleAdjustCustom = (delta) => {
    setIsCustomMode(true);
    const curr = Number(customInputVal) || 10;
    const next = Math.max(1, Math.min(curr + delta, allAvailableQuestions.length || 100));
    setCustomInputVal(String(next));
    setQuestionLimit(next);
  };

  const getFilteredQuestions = () => {
    const allMatching = allAvailableQuestions;
    const effectiveLimit = isCustomMode
      ? (Number(customInputVal) || 10)
      : questionLimit;

    if (effectiveLimit === 'all' || allMatching.length <= Number(effectiveLimit)) {
      return allMatching;
    }
    return allMatching.slice(0, Number(effectiveLimit));
  };

  const actualExamCount = getFilteredQuestions().length;

  const hasTextbook =
    (selectedUnit?.id === 'unit-1' && (!selectedLesson || selectedLesson.id === 'u1-l1' || selectedLesson.id === 'all')) ||
    (selectedUnit?.id === 'unit-10' && (!selectedLesson || selectedLesson.id === 'u10-l1' || selectedLesson.id === 'u10-l2' || selectedLesson.id === 'u10-l3' || selectedLesson.id === 'all'));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto animate-in fade-in zoom-in duration-200">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-[#182030] hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all cursor-pointer"
        >
          <X size={18} />
        </button>

        {isExamActive && selectedUnit && selectedLesson ? (
          /* STEP 4: LIVE ACTIVE EXAM SCREEN */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#1f283a] text-xs text-slate-300">
              <button
                onClick={() => setIsExamActive(false)}
                className="px-3.5 py-1.5 rounded-xl bg-[#182030] hover:bg-[#222e44] text-emerald-400 font-bold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
              >
                <ArrowLeft size={14} />
                <span>{isBn ? 'প্রশ্ন সেটিংসে ফিরে যান' : 'Back to Question Setup'}</span>
              </button>

              <div className="flex items-center gap-2 font-semibold truncate max-w-md">
                <span className="text-emerald-400 font-bold">{selectedUnit?.unitNumber}</span>
                <span>➔</span>
                <span className="text-white truncate">
                  {selectedLesson.number}: {selectedLesson.title}
                </span>
                <span>➔</span>
                <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/30">
                  {actualExamCount} {isBn ? 'টি প্রশ্ন' : 'Questions'}
                </span>
              </div>

              {hasTextbook && (
                <button
                  onClick={() => setIsTextbookOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-[#182030] hover:bg-emerald-500/20 text-emerald-300 font-bold inline-flex items-center gap-1.5 border border-[#23334d] text-xs transition-all cursor-pointer"
                >
                  <BookOpen size={13} />
                  <span>{isBn ? 'পাঠ্যবই পড়ুন' : 'Read Textbook'}</span>
                </button>
              )}
            </div>

            <ErrorBoundary>
              <HSCExamInterface
                questions={getFilteredQuestions()}
                sessionKey={`u_${selectedUnit.id}_l_${selectedLesson.id}_q_${actualExamCount}`}
                onClose={() => setIsExamActive(false)}
                lang={lang}
              />
            </ErrorBoundary>
          </div>
        ) : selectedUnit && selectedLesson ? (
          /* STEP 3: DEDICATED QUESTION AMOUNT & CATEGORIES SETUP SCREEN */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto max-w-3xl mx-auto">
            {/* Header with Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedLesson(null)}
                  className="p-2.5 rounded-xl bg-[#10141f] hover:bg-[#1c2436] border border-[#232c3f] text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
                  title="Back to lessons"
                >
                  <ArrowLeft size={18} />
                </button>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 uppercase">
                      {selectedUnit.unitNumber}
                    </span>
                    <span className="text-xs text-slate-400">
                      {selectedLesson.number}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                    {selectedLesson.title}
                  </h2>
                </div>
              </div>

              {hasTextbook && (
                <button
                  onClick={() => setIsTextbookOpen(true)}
                  className="px-4 py-2 rounded-xl bg-[#182030] hover:bg-[#222e44] text-emerald-300 border border-emerald-500/30 text-xs font-bold inline-flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer shrink-0"
                >
                  <BookOpen size={14} />
                  <span>{isBn ? '📖 পাঠ্যবই পড়ুন' : '📖 Read Story'}</span>
                </button>
              )}
            </div>

            {/* Main Setup Section */}
            <div className="space-y-6">
              {/* 1. Question Amount Selection (Default: 10 + Custom Input Option) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1018] border border-emerald-500/30 space-y-4 relative overflow-hidden">
                <div className="flex items-center gap-2.5">
                  <ListOrdered size={20} className="text-emerald-400" />
                  <div>
                    <h3 className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2">
                      <span>{isBn ? 'কতটি প্রশ্ন অনুশীলন করতে চান?' : 'How Many Questions to Practice?'}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
                        {isBn ? 'ডিফল্ট: ১০টি' : 'Default: 10'}
                      </span>
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isBn
                        ? 'নিচের অপশন থেকে নির্বাচন করুন অথবা নিজের পছন্দমতো সংখ্যা লিখে পরীক্ষা দিন।'
                        : 'Choose from preset options or type any custom number of questions you want.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5 pt-1">
                  {[
                    { value: 10, label: isBn ? '১০টি প্রশ্ন' : '10 Questions', badge: isBn ? '★ ডিফল্ট' : '★ Default' },
                    { value: 20, label: isBn ? '২০টি প্রশ্ন' : '20 Questions', badge: isBn ? 'স্ট্যান্ডার্ড' : 'Standard' },
                    { value: 30, label: isBn ? '৩০টি প্রশ্ন' : '30 Questions', badge: isBn ? 'মডেল টেস্ট' : 'Model Test' },
                    { value: 50, label: isBn ? '৫০টি প্রশ্ন' : '50 Questions', badge: isBn ? 'মেগা টেস্ট' : 'Mega Test' },
                    { value: 'all', label: isBn ? `সকল প্রশ্ন` : `All Questions`, badge: `${allAvailableQuestions.length} ${isBn ? 'টি' : 'MCQs'}` }
                  ].map((opt) => {
                    const isSelected = !isCustomMode && questionLimit === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => {
                          setIsCustomMode(false);
                          setQuestionLimit(opt.value);
                        }}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                          isSelected
                            ? 'bg-gradient-to-b from-emerald-500/30 to-emerald-950/60 border-emerald-400 text-white shadow-lg shadow-emerald-950/50 ring-2 ring-emerald-500/40 scale-[1.03]'
                            : 'bg-[#121927] border-[#1f2a3e] text-slate-300 hover:bg-[#182234] hover:border-slate-500'
                        }`}
                      >
                        <span className={`text-xs sm:text-sm font-black ${isSelected ? 'text-emerald-300' : 'text-slate-200'}`}>
                          {opt.label}
                        </span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                          isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-[#1a2334] text-slate-400'
                        }`}>
                          {opt.badge}
                        </span>
                      </button>
                    );
                  })}

                  {/* 6. Custom Mode Option Card */}
                  <button
                    onClick={() => {
                      setIsCustomMode(true);
                      setQuestionLimit(Number(customInputVal) || 10);
                    }}
                    className={`p-3 rounded-xl border text-center transition-all cursor-pointer flex flex-col items-center justify-center gap-1 ${
                      isCustomMode
                        ? 'bg-gradient-to-b from-cyan-500/30 to-blue-950/60 border-cyan-400 text-white shadow-lg shadow-cyan-950/50 ring-2 ring-cyan-500/40 scale-[1.03]'
                        : 'bg-[#121927] border-[#1f2a3e] text-slate-300 hover:bg-[#182234] hover:border-slate-500'
                    }`}
                  >
                    <span className={`text-xs sm:text-sm font-black flex items-center gap-1 ${isCustomMode ? 'text-cyan-300' : 'text-slate-200'}`}>
                      <PenTool size={12} />
                      <span>{isBn ? 'কাস্টম সংখ্যা' : 'Custom'}</span>
                    </span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      isCustomMode ? 'bg-cyan-400 text-slate-950' : 'bg-[#1a2334] text-cyan-400'
                    }`}>
                      {isCustomMode ? `${customInputVal || 0} ${isBn ? 'টি' : 'MCQs'}` : (isBn ? 'নিজে লিখুন' : 'Type here')}
                    </span>
                  </button>
                </div>

                {/* Interactive Custom Number Input Box with Increment / Decrement */}
                <div className="pt-2 border-t border-[#1a2334] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                      <PenTool size={13} className="text-cyan-400" />
                      <span>{isBn ? 'নির্দিষ্ট সংখ্যা লিখুন (Custom Amount):' : 'Or Type Custom Amount:'}</span>
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {/* Minus button */}
                    <button
                      onClick={() => handleAdjustCustom(-5)}
                      className="w-8 h-8 rounded-lg bg-[#141d2c] hover:bg-[#1e2a3f] border border-[#24334a] text-slate-300 hover:text-white flex items-center justify-center font-bold cursor-pointer transition-all active:scale-95"
                      title="-5 questions"
                    >
                      <Minus size={14} />
                    </button>

                    {/* Input field */}
                    <div className="relative">
                      <input
                        type="text"
                        inputMode="numeric"
                        value={customInputVal}
                        onChange={handleCustomInputChange}
                        placeholder="15"
                        className={`w-20 px-2.5 py-1.5 rounded-xl bg-[#080d16] border text-center text-sm font-black text-white outline-none transition-all shadow-inner ${
                          isCustomMode
                            ? 'border-cyan-400 ring-2 ring-cyan-500/30 text-cyan-300'
                            : 'border-[#24334a] focus:border-cyan-400 text-slate-200'
                        }`}
                      />
                      <span className="absolute -top-2 right-1 text-[9px] font-bold text-slate-500 select-none">
                        MCQ
                      </span>
                    </div>

                    {/* Plus button */}
                    <button
                      onClick={() => handleAdjustCustom(5)}
                      className="w-8 h-8 rounded-lg bg-[#141d2c] hover:bg-[#1e2a3f] border border-[#24334a] text-slate-300 hover:text-white flex items-center justify-center font-bold cursor-pointer transition-all active:scale-95"
                      title="+5 questions"
                    >
                      <Plus size={14} />
                    </button>

                    <span className="text-xs text-slate-400 font-medium ml-1">
                      {isBn ? `(সর্বোচ্চ ${allAvailableQuestions.length}টি)` : `(Max ${allAvailableQuestions.length})`}
                    </span>
                  </div>
                </div>
              </div>

              {/* 2. Category Selection */}
              <div className="space-y-3">
                <div>
                  <div className="flex items-center gap-2.5 mb-1.5">
                    <span className="text-xl">🎯</span>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {isBn ? 'অনুশীলনের ধরন বেছে নিন' : 'Select What You Want to Practice'}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isBn
                      ? 'নিচের ক্যাটাগরিগুলো থেকে আপনার পছন্দমতো বিষয়গুলো নির্বাচন করুন। প্রতিটি ক্যাটাগরিতে কতটি প্রশ্ন রয়েছে তা নিচে প্রদর্শিত হয়েছে।'
                      : 'Select one or more practice categories below. Available question counts are shown for each category.'}
                  </p>
                </div>

                {/* 4 Category Cards with Available Question Counts */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {[
                    {
                      id: 'synonyms',
                      label: isBn ? 'সমার্থক শব্দ (Synonyms)' : 'Synonyms',
                      icon: '🔄',
                      desc: isBn ? 'অনুরূপ ও সমার্থক শব্দের MCQ' : 'Closest meaning synonym MCQs',
                      available: hscQuestionsList.filter(q => q.category === 'synonyms' && q.unit && (q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase() + ':') || new RegExp(`\\b${selectedUnit.unitNumber}\\b`, 'i').test(q.unit) || q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())) && (selectedLesson.id === 'all' || q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) || q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))).length
                    },
                    {
                      id: 'antonyms',
                      label: isBn ? 'বিপরীত শব্দ (Antonyms)' : 'Antonyms',
                      icon: '⚡',
                      desc: isBn ? 'বিপরীতার্থক শব্দের MCQ' : 'Opposite meaning antonym MCQs',
                      available: hscQuestionsList.filter(q => q.category === 'antonyms' && q.unit && (q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase() + ':') || new RegExp(`\\b${selectedUnit.unitNumber}\\b`, 'i').test(q.unit) || q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())) && (selectedLesson.id === 'all' || q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) || q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))).length
                    },
                    {
                      id: 'english_meaning',
                      label: isBn ? 'ইংরেজি অর্থ (Meaning in English)' : 'Meaning in English',
                      icon: '📖',
                      desc: isBn ? 'ইংরেজি সংজ্ঞা ও অর্থভিত্তিক MCQ' : 'English definition & contextual MCQs',
                      available: hscQuestionsList.filter(q => q.category === 'english_meaning' && q.unit && (q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase() + ':') || new RegExp(`\\b${selectedUnit.unitNumber}\\b`, 'i').test(q.unit) || q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())) && (selectedLesson.id === 'all' || q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) || q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))).length
                    },
                    {
                      id: 'bangla_meaning',
                      label: isBn ? 'বাংলা অর্থ (Meaning in Bangla)' : 'Meaning in Bangla',
                      icon: '🇧🇩',
                      desc: isBn ? '৪টি বিকল্প বাংলা অপশনযুক্ত MCQ' : 'Bengali meaning MCQs with 4 options',
                      available: hscQuestionsList.filter(q => q.category === 'bangla_meaning' && q.unit && (q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase() + ':') || new RegExp(`\\b${selectedUnit.unitNumber}\\b`, 'i').test(q.unit) || q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())) && (selectedLesson.id === 'all' || q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) || q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))).length
                    }
                  ].map((cat) => {
                    const isSelected = selectedCategories.includes(cat.id);
                    return (
                      <button
                        key={cat.id}
                        onClick={() => toggleCategory(cat.id)}
                        className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 relative overflow-hidden group ${
                          isSelected
                            ? 'bg-gradient-to-br from-emerald-950/60 to-[#0e1624] border-emerald-500/80 shadow-lg shadow-emerald-950/40 ring-1 ring-emerald-500/30'
                            : 'bg-[#0b0e17] border-[#1f2738] text-slate-400 hover:bg-[#131926] hover:border-slate-600'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <span className="text-2xl shrink-0 p-2 rounded-xl bg-[#172030] border border-[#232f45]">
                              {cat.icon}
                            </span>
                            <div>
                              <span className={`block text-sm sm:text-base font-bold ${isSelected ? 'text-emerald-300' : 'text-white'}`}>
                                {cat.label}
                              </span>
                              <span className="block text-xs text-slate-400 mt-0.5 leading-snug">
                                {cat.desc}
                              </span>
                            </div>
                          </div>

                          {/* Checkbox */}
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center text-xs shrink-0 transition-all ${
                              isSelected
                                ? 'bg-emerald-500 border-emerald-400 text-white font-black scale-110 shadow-md shadow-emerald-500/50'
                                : 'border-slate-600 bg-transparent'
                            }`}
                          >
                            {isSelected ? '✓' : ''}
                          </div>
                        </div>

                        {/* Available Questions Count Badge */}
                        <div className="pt-2 border-t border-[#1a2334] flex items-center justify-between text-xs">
                          <span className="text-slate-400 font-medium">
                            {isBn ? 'উপলব্ধ প্রশ্ন:' : 'Available Questions:'}
                          </span>
                          <span className={`font-bold px-2 py-0.5 rounded-md ${
                            cat.available > 0
                              ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                              : 'bg-slate-800 text-slate-500'
                          }`}>
                            {cat.available} {isBn ? 'টি প্রশ্ন' : 'Questions'}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Summary Bar: Total Selected + Quick Toggles */}
              <div className="p-4 rounded-2xl bg-[#0c1018] border border-[#1b2332] flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs sm:text-sm">
                  <span className="text-slate-400 font-medium">{isBn ? 'পরীক্ষায় আসছে:' : 'Exam Session:'}</span>
                  <span className="font-black text-emerald-400 text-base">
                    {actualExamCount} {isBn ? 'টি প্রশ্ন' : 'Questions'}
                  </span>
                  <span className="text-xs text-slate-500">
                    ({isBn ? `মোট উপলব্ধ ${allAvailableQuestions.length}টির মধ্যে` : `out of ${allAvailableQuestions.length} available`})
                  </span>
                  {isCustomMode && (
                    <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 text-[10px] font-bold border border-cyan-500/30">
                      {isBn ? 'কাস্টম মোড' : 'Custom'}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <button
                    onClick={selectAllCategories}
                    className="text-emerald-400 hover:text-emerald-300 font-semibold underline underline-offset-2 cursor-pointer"
                  >
                    {isBn ? 'সবগুলো সিলেক্ট করুন' : 'Select All'}
                  </button>
                </div>
              </div>

              {/* Launch Practice Exam Button */}
              <button
                onClick={() => setIsExamActive(true)}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-base sm:text-lg flex items-center justify-center gap-3 shadow-xl shadow-emerald-950/70 transition-all cursor-pointer active:scale-[0.98] hover:shadow-emerald-900/90"
              >
                <Play size={20} className="fill-current" />
                <span>
                  {isBn
                    ? `🚀 ${actualExamCount}টি প্রশ্নের পরীক্ষা শুরু করুন (Start Exam)`
                    : `🚀 Start ${actualExamCount}-Question Exam Now`}
                </span>
              </button>
            </div>
          </div>
        ) : selectedUnit ? (
          /* STEP 2: LESSONS LIST SCREEN FOR SELECTED UNIT */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToUnits}
                  className="p-2.5 rounded-xl bg-[#10141f] hover:bg-[#1c2436] border border-[#232c3f] text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
                  title="Back to all units"
                >
                  <ArrowLeft size={18} />
                </button>

                <div>
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 uppercase tracking-wider">
                    {selectedUnit.unitNumber}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight mt-0.5">
                    {selectedUnit.unitTitle}
                  </h2>
                  <p className="text-xs text-slate-400 mt-0.5">
                    {selectedUnit.unitTitleBn} • {selectedUnit.totalWords} Words Available
                  </p>
                </div>
              </div>

              {/* Read Full Unit Textbook */}
              {hasTextbook && (
                <button
                  onClick={() => setIsTextbookOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold inline-flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all cursor-pointer shrink-0"
                >
                  <BookOpen size={15} />
                  <span>{isBn ? '📖 পাঠ্যবই রিডার খুলুন' : '📖 Open Textbook'}</span>
                </button>
              )}
            </div>

            {/* Lessons Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                {isBn ? 'লেসন নির্বাচন করুন:' : 'Select a Lesson to Practice:'}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {selectedUnit.lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    onClick={() => handleSelectLesson(lesson)}
                    className="p-4 rounded-2xl bg-[#0e131f] hover:bg-[#151c2a] border border-[#1e2638] hover:border-emerald-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 group shadow-md"
                  >
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                          {lesson.number}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">
                          {lesson.wordsCount} Words
                        </span>
                      </div>

                      <h4 className="text-sm sm:text-base font-bold text-white group-hover:text-emerald-300 transition-colors mt-2">
                        {lesson.title}
                      </h4>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {lesson.titleBn}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#1b2333] text-xs">
                      <span className="text-slate-400 font-medium">{lesson.questionsCount}</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                        <span>{isBn ? 'প্রশ্নের সংখ্যা বেছে নিন' : 'Choose Questions'}</span>
                        <ArrowRight size={13} />
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          /* STEP 1: ALL UNITS OVERVIEW GRID */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
                  <GraduationCap size={14} />
                  <span>HSC English For Today Curriculum</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {isBn ? 'ইউনিটভিত্তিক পরীক্ষা ও প্রস্তুতি' : 'Unit-wise Exam & Practice'}
                </h2>
                <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
                  {isBn ? 'আপনার কাঙ্ক্ষিত ইউনিট ও লেসন বেছে নিয়ে প্রশ্নের সংখ্যা নির্ধারণ করে পরীক্ষা শুরু করুন।' : 'Select any unit and lesson, choose question amount, and start targeted MCQ practice.'}
                </p>
              </div>
            </div>

            {/* Units Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {hscUnits.map((unit) => (
                <div
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit)}
                  className={`relative p-5 rounded-2xl border border-white/10 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between min-h-[170px] ${unit.bgClass}`}
                >
                  <div className="relative z-10">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-white/20 text-white backdrop-blur-sm mb-2">
                      {unit.unitNumber}
                    </span>
                    <h3 className="text-base sm:text-lg font-black text-white leading-snug">
                      {unit.unitTitle}
                    </h3>
                    <p className="text-xs text-white/80 mt-0.5">
                      {unit.unitTitleBn}
                    </p>
                  </div>

                  <div className="relative z-10 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-white/90">
                    <span>{unit.lessons.length} {isBn ? 'টি লেসন' : 'Lessons'}</span>
                    <span className="flex items-center gap-1 font-bold">
                      <span>{isBn ? 'লেসন দেখুন' : 'View'}</span>
                      <ChevronRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Textbook Reader Modal */}
      {isTextbookOpen && (
        <TextbookReaderModal
          isOpen={isTextbookOpen}
          onClose={() => setIsTextbookOpen(false)}
          initialUnit={selectedUnit?.id || 'unit-1'}
          initialLesson={selectedLesson?.id || 'u1-l1'}
          lang={lang}
        />
      )}
    </div>
  );
}
