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

export default function HSCUnitsExplorer({
  lang = 'bn',
  onStartUnitQuiz
}) {
  const isBn = lang === 'bn';
  const [selectedUnit, setSelectedUnit] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);
  const [isExamActive, setIsExamActive] = useState(false);
  const [isTextbookOpen, setIsTextbookOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Handle clicking a Unit card (Navigates to Screenshot 2: Lessons View)
  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setSelectedLesson(null);
    setIsExamActive(false);
  };

  // Handle clicking a Lesson card (Navigates to Screenshot 3: Live Exam)
  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsExamActive(true);
    if (onStartUnitQuiz) {
      onStartUnitQuiz(selectedUnit, lesson);
    }
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

  // Filter questions for the selected unit and lesson
  const getFilteredQuestions = () => {
    if (!selectedUnit) return hscQuestionsList;

    const unitQuestions = hscQuestionsList.filter((q) => {
      if (!q.unit) return true;
      return (
        q.unit.toLowerCase().includes(selectedUnit.unitNumber.toLowerCase()) ||
        q.unit.toLowerCase().includes(selectedUnit.unitTitle.toLowerCase())
      );
    });

    if (selectedLesson && selectedLesson.id !== 'all') {
      const lessonQuestions = unitQuestions.filter((q) => {
        return (
          q.unit &&
          (q.unit.toLowerCase().includes(selectedLesson.number.toLowerCase()) ||
            q.unit.toLowerCase().includes(selectedLesson.title.toLowerCase()))
        );
      });
      if (lessonQuestions.length > 0) return lessonQuestions;
    }

    return unitQuestions.length > 0 ? unitQuestions : hscQuestionsList;
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
      {/* VIEW 3: LIVE ACTIVE EXAM SCREEN                               */}
      {/* ------------------------------------------------------------- */}
      {isExamActive && selectedUnit && selectedLesson ? (
        <div className="space-y-4 animate-in fade-in zoom-in-95 duration-200">
          {/* Breadcrumb Navigation Bar */}
          <div className="bg-[#131824] border border-[#1e2738] p-3.5 rounded-2xl flex flex-wrap items-center justify-between gap-3 text-xs text-slate-300">
            <button
              onClick={handleBackToLessons}
              className="px-3.5 py-1.5 rounded-xl bg-[#182030] hover:bg-[#222e44] text-emerald-400 font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
            >
              <ArrowLeft size={14} />
              <span>{isBn ? 'লেসন তালিকায় ফিরে যান' : 'Back to Lessons'}</span>
            </button>

            <div className="flex items-center gap-2 font-semibold text-xs sm:text-sm">
              <span className="text-emerald-400 font-bold">{selectedUnit.unitNumber}</span>
              <span className="text-slate-600">➔</span>
              <span className="text-white font-bold">{selectedLesson.number}: {selectedLesson.title}</span>
            </div>

            {selectedUnit.id === 'unit-1' && selectedLesson.id === 'u1-l1' && (
              <button
                onClick={() => setIsTextbookOpen(true)}
                className="px-3 py-1.5 rounded-xl bg-[#192233] hover:bg-emerald-500/20 text-emerald-300 font-bold inline-flex items-center gap-1.5 border border-[#26334a] transition-all text-xs"
              >
                <BookOpen size={13} />
                <span>{isBn ? 'পাঠ্যবই পড়ুন' : 'Read Textbook'}</span>
              </button>
            )}
          </div>

          {/* Spaced-Repetition Exam Engine */}
          <HSCExamInterface
            questions={getFilteredQuestions()}
            onClose={handleBackToLessons}
            lang={lang}
          />
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
            {selectedUnit.lessons.map((lesson) => (
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
                      <span>{lesson.questionsCount || `${lesson.wordsCount} টি প্রশ্ন`}</span>
                    </div>
                  </div>

                  {selectedUnit.id === 'unit-1' && lesson.id === 'u1-l1' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsTextbookOpen(true);
                      }}
                      title="Read Story"
                      className="px-2 py-1 rounded-lg bg-[#182236] hover:bg-emerald-500/20 text-emerald-300 text-[11px] font-bold border border-[#23334d] transition-all"
                    >
                      পড়ুন
                    </button>
                  )}
                </div>
              </div>
            ))}
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
        onStartExam={() => {
          setIsTextbookOpen(false);
          if (selectedUnit) {
            handleSelectLesson(selectedUnit.lessons[0]);
          }
        }}
        lang={lang}
      />
    </div>
  );
}
