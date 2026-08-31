import React, { useState, useEffect } from 'react';
import {
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
  Search,
  Check,
  Zap,
  ListOrdered,
  SlidersHorizontal,
  PenTool,
  Plus,
  Minus
} from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';
import { hscQuestionsList, smartInterleaveQuestions } from '../data/questions/hscQuestionsData';
import { formatUnitSlug, formatLessonSlug, matchUnitFromSlug, matchLessonFromSlug } from '../utils/routeHelpers';
import HSCExamInterface from './HSCExamInterface';
import TextbookReaderModal from './TextbookReaderModal';
import ErrorBoundary from './ErrorBoundary';

export default function HSCUnitsExplorer({
  lang = 'bn',
  currentPath = '/exam',
  navigate
}) {
  const isBn = lang === 'bn';

  // Navigation State
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isExamActive, setIsExamActive] = useState(false);
  const [isTextbookOpen, setIsTextbookOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Question Limit Option (DEFAULT = 10 questions)
  const [questionLimit, setQuestionLimit] = useState(10); // 10 | 20 | 30 | 50 | 'all' | custom number
  const [isCustomMode, setIsCustomMode] = useState(false);
  const [customInputVal, setCustomInputVal] = useState('15');

  // 4 Practice Categories: Synonyms, Antonyms, English Meaning, Bangla Meaning
  const [selectedCategories, setSelectedCategories] = useState([
    'synonyms',
    'antonyms',
    'english_meaning',
    'bangla_meaning'
  ]);

  // Sync state with URL path whenever currentPath changes (e.g. direct load, refresh, or back/forward buttons)
  useEffect(() => {
    if (!currentPath) return;

    // Remove leading slash and split path segments
    const clean = currentPath.replace(/^\/+|\/+$/g, '');
    const segments = clean.split('/');

    // Check if path is in /exam/... or /units/...
    if (segments[0] === 'exam' || segments[0] === 'exams' || segments[0] === 'units') {
      const unitSlug = segments[1];
      const lessonSlug = segments[2];

      if (unitSlug) {
        const matchedU = matchUnitFromSlug(unitSlug, hscUnits);
        if (matchedU) {
          setSelectedUnit(matchedU);
          if (lessonSlug) {
            const matchedL = matchLessonFromSlug(lessonSlug, matchedU);
            if (matchedL) {
              setSelectedLesson(matchedL);
            } else {
              setSelectedLesson(null);
            }
          } else {
            setSelectedLesson(null);
          }
        }
      } else {
        // Just /exam or /units
        setSelectedUnit(null);
        setSelectedLesson(null);
        setIsExamActive(false);
      }
    }
  }, [currentPath]);

  const toggleCategory = (catId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(catId)) {
        if (prev.length === 1) return prev; // Keep at least one category selected
        return prev.filter((c) => c !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  const selectAllCategories = () => {
    setSelectedCategories(['synonyms', 'antonyms', 'english_meaning', 'bangla_meaning']);
  };

  // Safe navigation helper that updates browser history and App state
  const changeRoute = (newUrl) => {
    if (typeof navigate === 'function') {
      navigate(newUrl);
    } else if (typeof window !== 'undefined') {
      window.history.pushState({ path: newUrl }, '', newUrl);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  // Handle clicking a Unit card (Navigates to: /exam/UNIT-1_Education_and_Life)
  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setSelectedLesson(null);
    setIsExamActive(false);
    setQuestionLimit(10);
    setIsCustomMode(false);
    const unitSlug = formatUnitSlug(unit);
    changeRoute(`/exam/${unitSlug}`);
  };

  // Handle clicking a Lesson card (Navigates to: /exam/UNIT-1_Education_and_Life/lesson_1)
  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsExamActive(false);
    setQuestionLimit(10);
    setIsCustomMode(false);
    const unitSlug = formatUnitSlug(selectedUnit);
    const lessonSlug = formatLessonSlug(lesson);
    changeRoute(`/exam/${unitSlug}/${lessonSlug}`);
  };

  // Back to Units (Navigates to: /exam)
  const handleBackToUnits = () => {
    setSelectedUnit(null);
    setSelectedLesson(null);
    setIsExamActive(false);
    changeRoute('/exam');
  };

  // Back to Lessons (Navigates to: /exam/UNIT-1_Education_and_Life)
  const handleBackToLessons = () => {
    setSelectedLesson(null);
    setIsExamActive(false);
    if (selectedUnit) {
      const unitSlug = formatUnitSlug(selectedUnit);
      changeRoute(`/exam/${unitSlug}`);
    } else {
      changeRoute('/exam');
    }
  };

  // Safely count questions for a category in selected unit/lesson
  const getCategoryCount = (catId) => {
    if (!selectedUnit) return 0;
    const uNum = (selectedUnit.unitNumber || '').toLowerCase();
    const uTitle = (selectedUnit.unitTitle || '').toLowerCase();
    const lNum = selectedLesson && selectedLesson.id !== 'all' ? (selectedLesson.number || '').toLowerCase() : '';
    const lTitle = selectedLesson && selectedLesson.id !== 'all' ? (selectedLesson.title || '').toLowerCase() : '';

    return (hscQuestionsList || []).filter((q) => {
      if (!q || q.category !== catId || !q.unit) return false;
      const qu = q.unit.toLowerCase();
      const matchUnit = (uNum && (qu.includes(uNum + ':') || new RegExp(`\\b${uNum}\\b`, 'i').test(qu))) || (uTitle && qu.includes(uTitle));
      if (!matchUnit) return false;
      if (!lNum && !lTitle) return true;
      return (lNum && qu.includes(lNum)) || (lTitle && qu.includes(lTitle));
    }).length;
  };

  // Get all available matching questions for current unit/lesson & categories
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

  // Handle custom number input change
  const handleCustomInputChange = (e) => {
    const val = e.target.value.replace(/[^0-9]/g, '');
    setCustomInputVal(val);
    setIsCustomMode(true);
    if (val) {
      const parsed = Math.max(1, Math.min(Number(val), allAvailableQuestions.length || 100));
      setQuestionLimit(parsed);
    }
  };

  // Handle quick +/- adjustments for custom number
  const handleAdjustCustom = (delta) => {
    setIsCustomMode(true);
    const curr = Number(customInputVal) || 10;
    const next = Math.max(1, Math.min(curr + delta, allAvailableQuestions.length || 100));
    setCustomInputVal(String(next));
    setQuestionLimit(next);
  };

  // Sliced questions based on chosen question limit (Default: 10)
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

  const filteredUnits = hscUnits.filter((u) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      u.unitNumber.toLowerCase().includes(q) ||
      u.unitTitle.toLowerCase().includes(q) ||
      u.unitTitleBn.includes(q) ||
      u.lessons.some((l) => l.title.toLowerCase().includes(q) || l.titleBn.includes(q))
    );
  });

  return (
    <div className="space-y-6">
      {/* ------------------------------------------------------------- */}
      {/* VIEW 4: LIVE ACTIVE EXAM SCREEN                               */}
      {/* ------------------------------------------------------------- */}
      {isExamActive && selectedUnit && selectedLesson ? (
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
          {/* Breadcrumb Navigation Bar */}
          <div className="bg-[#131824] border border-[#1e2738] p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <button
              onClick={() => setIsExamActive(false)}
              className="px-3.5 py-1.5 rounded-xl bg-[#182030] hover:bg-[#222e44] text-emerald-400 font-bold inline-flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
            >
              <ArrowLeft size={14} />
              <span>{isBn ? 'প্রশ্ন সেটিংসে ফিরে যান' : 'Back to Question Setup'}</span>
            </button>

            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold">{selectedUnit.unitNumber}</span>
              <span className="text-slate-600">➔</span>
              <span className="text-white font-bold">{selectedLesson.number}: {selectedLesson.title}</span>
              <span className="text-slate-600">➔</span>
              <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-black border border-emerald-500/30">
                {actualExamCount} {isBn ? 'টি প্রশ্ন' : 'Questions'}
              </span>
            </div>

            {((selectedUnit.id === 'unit-1' && (selectedLesson.id === 'u1-l1' || selectedLesson.id === 'all')) ||
              (selectedUnit.id === 'unit-9' && (selectedLesson.id === 'u9-l1' || selectedLesson.id === 'all')) ||
              (selectedUnit.id === 'unit-10' && (selectedLesson.id === 'u10-l1' || selectedLesson.id === 'u10-l2' || selectedLesson.id === 'u10-l3' || selectedLesson.id === 'all'))) && (
              <button
                onClick={() => setIsTextbookOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-[#192233] hover:bg-emerald-500/20 text-emerald-300 font-bold inline-flex items-center gap-1.5 border border-[#26334a] transition-all text-xs cursor-pointer"
              >
                <BookOpen size={13} />
                <span>{isBn ? 'পাঠ্যবই পড়ুন' : 'Read Textbook'}</span>
              </button>
            )}
          </div>

          {/* Spaced-Repetition Exam Engine */}
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
        /* ------------------------------------------------------------- */
        /* VIEW 3: DEDICATED QUESTION AMOUNT & CATEGORIES SELECTION SCREEN*/
        /* (AFTER SELECTING UNIT & LESSON)                               */
        /* ------------------------------------------------------------- */
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200 max-w-3xl mx-auto">
          {/* Top Bar with Back to Lessons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToLessons}
                className="p-2.5 rounded-xl bg-[#131824] hover:bg-[#1c2436] border border-[#232c3f] text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
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

            {/* Read Textbook Button */}
            {((selectedUnit.id === 'unit-1' && (selectedLesson.id === 'u1-l1' || selectedLesson.id === 'all')) ||
              (selectedUnit.id === 'unit-9' && (selectedLesson.id === 'u9-l1' || selectedLesson.id === 'all')) ||
              (selectedUnit.id === 'unit-10' && (selectedLesson.id === 'u10-l1' || selectedLesson.id === 'u10-l2' || selectedLesson.id === 'u10-l3' || selectedLesson.id === 'all'))) && (
              <button
                onClick={() => setIsTextbookOpen(true)}
                className="px-4 py-2 rounded-xl bg-[#172030] hover:bg-emerald-500/20 text-emerald-400 font-bold inline-flex items-center gap-2 border border-[#26334a] transition-all text-xs sm:text-sm cursor-pointer shadow-sm"
              >
                <BookOpen size={14} />
                <span>{isBn ? '📖 পাঠ্যবই পড়ুন' : '📖 Read Story'}</span>
              </button>
            )}
          </div>

          {/* Main Setup Card */}
          <div className="bg-[#131824] border border-[#1e2738] rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
            {/* 1. QUESTION AMOUNT SELECTION SECTION (Default: 10 + Custom Input Option) */}
            <div className="p-5 sm:p-6 rounded-2xl bg-[#0c1018] border border-emerald-500/30 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
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
              </div>

              {/* Question Count Pill Selectors Grid (Presets + Custom Card) */}
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

            {/* 2. CATEGORY SELECTION SECTION */}
            <div className="space-y-3">
              <div>
                <div className="flex items-center gap-2.5 mb-1.5">
                  <span className="text-xl">🎯</span>
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                    {isBn ? 'অনুশীলনের ধরন / ক্যাটাগরি বেছে নিন' : 'Select Practice Question Categories'}
                  </h3>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {isBn
                    ? 'নিচের ক্যাটাগরিগুলো থেকে পছন্দমতো বিষয় নির্বাচন করুন। প্রতিটি ক্যাটাগরির মোট প্রশ্ন নিচে প্রদর্শিত আছে।'
                    : 'Select practice categories below. Individual category question counts are shown.'}
                </p>
              </div>

              {/* 4 Interactive Category Cards with Available Question Counts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {[
                  {
                    id: 'synonyms',
                    label: isBn ? 'সমার্থক শব্দ (Synonyms)' : 'Synonyms',
                    icon: '🔄',
                    desc: isBn ? 'অনুরূপ ও সমার্থক শব্দের MCQ' : 'Closest meaning synonym MCQs',
                    available: getCategoryCount('synonyms')
                  },
                  {
                    id: 'antonyms',
                    label: isBn ? 'বিপরীত শব্দ (Antonyms)' : 'Antonyms',
                    icon: '⚡',
                    desc: isBn ? 'বিপরীতার্থক শব্দের MCQ' : 'Opposite meaning antonym MCQs',
                    available: getCategoryCount('antonyms')
                  },
                  {
                    id: 'english_meaning',
                    label: isBn ? 'ইংরেজি অর্থ (Meaning in English)' : 'Meaning in English',
                    icon: '📖',
                    desc: isBn ? 'ইংরেজি সংজ্ঞা ও অর্থভিত্তিক MCQ' : 'English definition & contextual MCQs',
                    available: getCategoryCount('english_meaning')
                  },
                  {
                    id: 'bangla_meaning',
                    label: isBn ? 'বাংলা অর্থ (Meaning in Bangla)' : 'Meaning in Bangla',
                    icon: '🇧🇩',
                    desc: isBn ? '৪টি বিকল্প বাংলা অপশনযুক্ত MCQ' : 'Bengali meaning MCQs with 4 options',
                    available: getCategoryCount('bangla_meaning')
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
                          : 'bg-[#0f1420] border-[#1f2738] text-slate-400 hover:bg-[#151c2b] hover:border-slate-600'
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

                        {/* Checkbox Checkmark */}
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
                  {isBn ? 'সব ক্যাটাগরি সিলেক্ট করুন' : 'Select All Categories'}
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
        /* ------------------------------------------------------------- */
        /* VIEW 2: LESSONS GRID (MATCHING UNIT)                          */
        /* ------------------------------------------------------------- */
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
          {/* Top Bar with Back Button & Unit Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToUnits}
                className="p-2.5 rounded-xl bg-[#131824] hover:bg-[#1c2436] border border-[#232c3f] text-slate-300 hover:text-white transition-all shadow-sm cursor-pointer"
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
            {((selectedUnit.id === 'unit-1' && (!selectedLesson || selectedLesson.id === 'u1-l1' || selectedLesson.id === 'all')) ||
              (selectedUnit.id === 'unit-9' && (!selectedLesson || selectedLesson.id === 'u9-l1' || selectedLesson.id === 'all')) ||
              (selectedUnit.id === 'unit-10' && (!selectedLesson || selectedLesson.id === 'u10-l1' || selectedLesson.id === 'u10-l2' || selectedLesson.id === 'u10-l3' || selectedLesson.id === 'all'))) && (
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
                  className="p-4 rounded-2xl bg-[#0f1420] hover:bg-[#161e2e] border border-[#1f2738] hover:border-emerald-500/50 transition-all duration-200 cursor-pointer flex flex-col justify-between space-y-3 group shadow-md"
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

                  <div className="flex items-center justify-between pt-2 border-t border-[#1a2232] text-xs">
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
        /* ------------------------------------------------------------- */
        /* VIEW 1: ALL UNITS OVERVIEW GRID                               */
        /* ------------------------------------------------------------- */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header Banner */}
          <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121927] via-[#0d1320] to-[#121927] border border-[#1e293b] shadow-2xl relative overflow-hidden backdrop-blur-xl">
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                  <GraduationCap size={14} />
                  <span>{isBn ? 'এনসিটিবি এইচএসসি কারিকুলাম' : 'NCTB HSC Curriculum'}</span>
                </div>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                  {isBn ? 'ইউনিটভিত্তিক পরীক্ষা ও প্রস্তুতি (Exam & Practice)' : 'Unit-wise Board Exam & Practice'}
                </h1>
                <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                  {isBn
                    ? 'আপনার কাঙ্ক্ষিত ইউনিট ও লেসন বেছে নিয়ে প্রশ্নের সংখ্যা (১০টি, ২০টি, ৩০টি বা কাস্টম সংখ্যা) নির্বাচন করে দ্রুত পরীক্ষা দিন।'
                    : 'Select a Unit, choose a Lesson, set how many questions you want to practice (10, 20, 30, or Custom Amount), and start targeted MCQ exams.'}
                </p>
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={isBn ? 'ইউনিট বা লেসন খুঁজুন...' : 'Search units, lessons...'}
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-xs sm:text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>
          </div>

          {/* Units Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                onClick={() => handleSelectUnit(unit)}
                className={`relative p-5 sm:p-6 rounded-3xl border border-white/10 cursor-pointer overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl flex flex-col justify-between min-h-[190px] group ${unit.bgClass}`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-black bg-white/20 text-white backdrop-blur-sm">
                      {unit.unitNumber}
                    </span>
                    <span className="text-[11px] font-bold text-white/80 bg-black/30 px-2 py-0.5 rounded-md">
                      {unit.lessons.length} {isBn ? 'টি লেসন' : 'Lessons'}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white leading-snug group-hover:underline underline-offset-4">
                    {unit.unitTitle}
                  </h3>
                  <p className="text-xs text-white/80 font-medium mt-1">
                    {unit.unitTitleBn}
                  </p>
                </div>

                <div className="relative z-10 pt-4 border-t border-white/15 flex items-center justify-between text-xs text-white/90 font-semibold">
                  <span>{unit.totalWords} Words • {unit.totalWords * 4} MCQs</span>
                  <span className="flex items-center gap-1 font-bold group-hover:translate-x-1.5 transition-transform bg-white/20 px-2.5 py-1 rounded-lg">
                    <span>{isBn ? 'লেসন দেখুন' : 'View Lessons'}</span>
                    <ArrowRight size={13} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

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
