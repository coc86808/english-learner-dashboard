import React, { useState } from 'react';
import {
  BookOpen,
  CheckCircle2,
  Clock,
  FileText,
  ArrowLeft,
  Search,
  Sparkles,
  Play,
  RotateCcw,
  GraduationCap,
  ChevronRight,
  BookMarked
} from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';
import { hscQuestionsList } from '../data/questions';
import HSCExamInterface from './HSCExamInterface';
import TextbookReaderModal from './TextbookReaderModal';
import ErrorBoundary from './ErrorBoundary';

export default function HSCUnitsExplorer({
  lang = 'en',
  onStartUnitQuiz
}) {
  const isBn = lang === 'bn';
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isExamActive, setIsExamActive] = useState(false);
  const [isTextbookOpen, setIsTextbookOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // 4 Practice Categories: Synonyms, Antonyms, English Meaning, Bangla Meaning
  const [selectedCategories, setSelectedCategories] = useState([
    'synonyms',
    'antonyms',
    'english_meaning',
    'bangla_meaning'
  ]);

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

  // Handle clicking a Unit card (Navigates to Screenshot 2: Lessons View)
  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setSelectedLesson(null);
    setIsExamActive(false);
  };

  // Handle clicking a Lesson card (Navigates to View 3: Category Setup Screen)
  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsExamActive(false);
  };

  // Back buttons
  const handleBackToUnits = () => {
    setSelectedUnit(null);
    setSelectedLesson(null);
    setIsExamActive(false);
  };

  const handleBackToLessons = () => {
    setIsExamActive(false);
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
      const matchUnit = (uNum && qu.includes(uNum)) || (uTitle && qu.includes(uTitle));
      if (!matchUnit) return false;
      if (!lNum && !lTitle) return true;
      return (lNum && qu.includes(lNum)) || (lTitle && qu.includes(lTitle));
    }).length;
  };

  // Filter questions for the selected unit, lesson, and practice categories
  const getFilteredQuestions = () => {
    const categoryFiltered = (hscQuestionsList || []).filter((q) =>
      q && q.category && selectedCategories.includes(q.category)
    );

    if (!selectedUnit) return categoryFiltered;

    const uNum = (selectedUnit.unitNumber || '').toLowerCase();
    const uTitle = (selectedUnit.unitTitle || '').toLowerCase();

    const unitQuestions = categoryFiltered.filter((q) => {
      if (!q || !q.unit) return false;
      const qu = q.unit.toLowerCase();
      return (uNum && qu.includes(uNum)) || (uTitle && qu.includes(uTitle));
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
              <span>{isBn ? 'অনুশীলন সেটিংসে ফিরে যান' : 'Back to Practice Setup'}</span>
            </button>

            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold">{selectedUnit.unitNumber}</span>
              <span className="text-slate-600">➔</span>
              <span className="text-white font-bold">{selectedLesson.number}: {selectedLesson.title}</span>
            </div>

            {((selectedUnit.id === 'unit-1' && (selectedLesson.id === 'u1-l1' || selectedLesson.id === 'all')) ||
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
              sessionKey={`u_${selectedUnit.id}_l_${selectedLesson.id}`}
              onClose={() => setIsExamActive(false)}
              lang={lang}
            />
          </ErrorBoundary>
        </div>
      ) : selectedUnit && selectedLesson ? (
        /* ------------------------------------------------------------- */
        /* VIEW 3: DEDICATED PRACTICE CATEGORIES SELECTION SCREEN         */
        /* (AFTER SELECTING UNIT & LESSON)                               */
        /* ------------------------------------------------------------- */
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200 max-w-3xl mx-auto">
          {/* Top Bar with Back to Lessons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedLesson(null)}
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

          {/* Main Category Selection Card */}
          <div className="bg-[#131824] border border-[#1e2738] rounded-3xl p-5 sm:p-7 shadow-2xl space-y-6">
            <div>
              <div className="flex items-center gap-2.5 mb-1.5">
                <span className="text-xl">🎯</span>
                <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
                  {isBn ? 'অনুশীলনের ধরন বেছে নিন' : 'Select What You Want to Practice'}
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                {isBn
                  ? 'নিচের ক্যাটাগরিগুলো থেকে আপনার পছন্দমতো বিষয়গুলো নির্বাচন করুন। প্রতিটি ক্যাটাগরিতে কতটি প্রশ্ন রয়েছে তা নিচে প্রদর্শিত হয়েছে।'
                  : 'Select one or more practice categories below. Available question counts are shown for each category.'}
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

            {/* Summary Bar: Total Selected + Quick Toggles */}
            <div className="p-4 rounded-2xl bg-[#0c1018] border border-[#1b2332] flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-slate-400 font-medium">{isBn ? 'মোট নির্বাচিত প্রশ্ন:' : 'Total Selected Questions:'}</span>
                <span className="font-black text-emerald-400 text-base">
                  {getFilteredQuestions().length} {isBn ? 'টি' : 'Questions'}
                </span>
                <span className="text-xs text-slate-500">
                  ({selectedCategories.length} {isBn ? 'টি ক্যাটাগরি সক্রিয়' : 'categories active'})
                </span>
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
              <span>{isBn ? '🚀 পরীক্ষা শুরু করুন (Start Exam Now)' : '🚀 Start Practice Exam Now'}</span>
            </button>
          </div>
        </div>
      ) : selectedUnit ? (
        /* ------------------------------------------------------------- */
        /* VIEW 2: LESSONS GRID (EXACTLY MATCHING SCREENSHOT 2)           */
        /* ------------------------------------------------------------- */
        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-200">
          {/* Top Bar with Back Button & Unit Title */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
            <div className="flex items-center gap-3">
              <button
                onClick={handleBackToUnits}
                className="p-2.5 rounded-xl bg-[#131824] hover:bg-[#1c2436] border border-[#232c3f] text-slate-300 hover:text-white transition-all shadow-sm"
                title="Back to all units"
              >
                <ArrowLeft size={18} />
              </button>

              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-black text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20 uppercase">
                    {selectedUnit.unitNumber}
                  </span>
                  <span className="text-xs text-slate-400">
                    {isBn ? selectedUnit.unitTitleBn : selectedUnit.unitTitle}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight mt-0.5">
                  {selectedUnit.unitTitle}
                </h2>
              </div>
            </div>

            {/* Action Buttons: Read Textbook + Full Unit Exam */}
            <div className="flex items-center gap-2.5 flex-wrap">
              {selectedUnit.id === 'unit-1' && (
                <button
                  onClick={() => setIsTextbookOpen(true)}
                  className="px-4 py-2.5 rounded-xl bg-[#182030] hover:bg-[#222e44] text-emerald-300 border border-emerald-500/30 text-xs sm:text-sm font-bold inline-flex items-center gap-2 transition-all shadow-sm active:scale-95"
                >
                  <BookOpen size={15} />
                  <span>{isBn ? '📖 পাঠ্যবই পড়ুন' : '📖 Read Textbook'}</span>
                </button>
              )}

              <button
                onClick={() => handleSelectLesson({ id: 'all', number: 'All Lessons', title: 'Full Unit Vocabulary Test', questionsCount: `${selectedUnit.totalWords} টি প্রশ্ন` })}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all shrink-0 active:scale-95"
              >
                <Play size={14} className="fill-current" />
                <span>{isBn ? 'সম্পূর্ণ ইউনিট পরীক্ষা' : 'Full Unit Test'}</span>
              </button>
            </div>
          </div>

          {/* Exact 3-Columns Dark Rounded Lesson Cards Grid matching Screenshot 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {selectedUnit.lessons.map((lesson) => {
              const countLabel = selectedUnit.id === 'unit-1' && lesson.id === 'u1-l1'
                ? (isBn ? '২৩ টি প্রশ্ন' : '23 Questions')
                : (lesson.questionsCount || (isBn ? '০ টি প্রশ্ন' : '0 Questions'));

              return (
              <div
                key={lesson.id}
                onClick={() => handleSelectLesson(lesson)}
                className="bg-[#10141f] hover:bg-[#151c2c] border border-[#1e2738] hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 cursor-pointer group shadow-card flex flex-col justify-between space-y-4"
              >
                {/* Lesson Title matching Screenshot 2 */}
                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors leading-snug">
                    {lesson.number}: {lesson.title}
                  </h3>
                  {isBn && lesson.titleBn && (
                    <span className="text-xs text-slate-400 block mt-1">
                      {lesson.titleBn}
                    </span>
                  )}
                </div>

                {/* Bottom Row: Question Count + Textbook Read button */}
                <div className="flex items-center justify-between pt-2 border-t border-[#182030]">
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    {/* Question Count with green file icon */}
                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <FileText size={14} className="stroke-[2.2]" />
                      <span>{countLabel}</span>
                    </div>
                  </div>

                  {selectedUnit.id === 'unit-1' && lesson.id === 'u1-l1' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsTextbookOpen(true);
                      }}
                      title="Read Story"
                      className="px-2.5 py-1 rounded-lg bg-[#182236] hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-[#23334d] transition-all"
                    >
                      {isBn ? 'পড়ুন' : 'Read'}
                    </button>
                  )}
                </div>
              </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* ------------------------------------------------------------- */
        /* VIEW 1: 12 UNIT CARDS GRID (EXACTLY MATCHING SCREENSHOT 1)     */
        /* ------------------------------------------------------------- */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* Header with Search */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
            <div>
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-1">
                <GraduationCap size={14} />
                <span>NCTB HSC English For Today</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                {isBn ? 'অধ্যায়ভিত্তিক পরীক্ষা ও প্রশ্নব্যাংক' : 'HSC 12 Units & Lessons'}
              </h2>
            </div>

            {/* Search Input */}
            <div className="relative w-full sm:w-72">
              <Search
                size={16}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder={isBn ? 'ইউনিট বা লেসন খুঁজুন...' : 'Search unit or lesson...'}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-[#131824] border border-[#232c3f] rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
            </div>
          </div>

          {/* Exact 4-Columns Vibrant Color Cards Grid matching Screenshot 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
            {filteredUnits.map((unit) => (
              <div
                key={unit.id}
                onClick={() => handleSelectUnit(unit)}
                className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer select-none text-white min-h-[170px] sm:min-h-[185px] flex flex-col justify-between shadow-lg ${unit.bgClass || 'bg-[#1b8a43]'}`}
              >
                {/* Ambient Internal Glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />

                {/* Top-Left Unit Title & Subtitle matching Screenshot 1 */}
                <div className="relative z-10 space-y-1 pr-12">
                  <h3 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-sm">
                    {unit.unitNumber}
                  </h3>
                  <p className="text-xs sm:text-sm font-medium text-white/90 drop-shadow-sm leading-tight">
                    {unit.unitTitle}
                  </p>
                </div>

                {/* Bottom Stats / Lessons count */}
                <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold text-white/80 pt-4">
                  <span>{unit.lessons.length} Lessons</span>
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <ChevronRight size={14} className="text-white" />
                  </div>
                </div>

                {/* Large Translucent Watermark Number matching Screenshot 1 */}
                <span className="absolute -bottom-2 -right-1 text-7xl sm:text-8xl font-black text-white/25 select-none pointer-events-none leading-none tracking-tighter">
                  {unit.number}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Official Textbook Reader Modal */}
      <TextbookReaderModal
        isOpen={isTextbookOpen}
        onClose={() => setIsTextbookOpen(false)}
        unitId={selectedUnit?.id || 'unit-1'}
        lessonId={selectedLesson?.id || 'u1-l1'}
        onStartExam={() => {
          setIsTextbookOpen(false);
          if (selectedUnit) {
            if (selectedLesson) {
              setIsExamActive(true);
            } else {
              handleSelectLesson(selectedUnit.lessons[0]);
            }
          }
        }}
        lang={lang}
      />
    </div>
  );
}
