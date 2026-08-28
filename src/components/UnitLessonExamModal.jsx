import React, { useState } from 'react';
import {
  X,
  GraduationCap,
  Clock,
  FileText,
  Play,
  ArrowLeft,
  Search,
  ChevronRight
} from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';
import { hscQuestionsList } from '../data/questions';
import HSCExamInterface from './HSCExamInterface';

export default function UnitLessonExamModal({
  isOpen,
  onClose,
  initialUnit = null,
  initialLesson = null,
  lang = 'bn'
}) {
  const isBn = lang === 'bn';

  // Navigation state: 'units' -> 'lessons' -> 'exam'
  const [selectedUnit, setSelectedUnit] = useState(initialUnit || null);
  const [selectedLesson, setSelectedLesson] = useState(initialLesson || null);
  const [isExamActive, setIsExamActive] = useState(Boolean(initialUnit && initialLesson));
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const handleSelectUnit = (unit) => {
    setSelectedUnit(unit);
    setSelectedLesson(null);
    setIsExamActive(false);
  };

  const handleSelectLesson = (lesson) => {
    setSelectedLesson(lesson);
    setIsExamActive(true);
  };

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
      u.unitTitleBn.includes(q)
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-5xl my-auto animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-[#182030] hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all"
        >
          <X size={18} />
        </button>

        {isExamActive && selectedUnit && selectedLesson ? (
          /* STEP 3: LIVE EXAM VIEW */
          <div className="space-y-4">
            <div className="bg-[#10141f] border border-[#1e2738] p-3 rounded-2xl flex items-center justify-between text-xs text-slate-300">
              <button
                onClick={handleBackToLessons}
                className="px-3.5 py-1.5 rounded-xl bg-[#182030] hover:bg-[#222e44] text-emerald-400 font-bold inline-flex items-center gap-1.5 transition-all shadow-sm"
              >
                <ArrowLeft size={14} />
                <span>{isBn ? 'লেসন তালিকায় ফিরে যান' : 'Back to Lessons'}</span>
              </button>

              <div className="flex items-center gap-2 font-semibold truncate max-w-md">
                <span className="text-emerald-400 font-bold">{selectedUnit?.unitNumber}</span>
                <span>➔</span>
                <span className="text-white truncate">
                  {selectedLesson.number}: {selectedLesson.title}
                </span>
              </div>
            </div>

            <HSCExamInterface
              questions={getFilteredQuestions()}
              onClose={onClose}
              lang={lang}
            />
          </div>
        ) : selectedUnit ? (
          /* STEP 2: LESSONS GRID VIEW (MATCHING SCREENSHOT 2) */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto">
            {/* Header with Back Button */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#1f283a]">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBackToUnits}
                  className="p-2.5 rounded-xl bg-[#10141f] hover:bg-[#1c2436] border border-[#232c3f] text-slate-300 hover:text-white transition-all shadow-sm"
                >
                  <ArrowLeft size={18} />
                </button>

                <div>
                  <span className="text-xs font-black text-emerald-400 uppercase">
                    {selectedUnit.unitNumber}
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                    {selectedUnit.unitTitle}
                  </h2>
                </div>
              </div>

              <button
                onClick={() => handleSelectLesson({ id: 'all', number: 'All Lessons', title: 'Full Unit Test', duration: '১ ঘণ্টা ৪০ মিনিট', questionsCount: `${selectedUnit.totalWords} টি প্রশ্ন` })}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs sm:text-sm font-bold inline-flex items-center gap-2 shadow-lg shadow-emerald-950/60 transition-all shrink-0"
              >
                <Play size={14} className="fill-current" />
                <span>{isBn ? 'সম্পূর্ণ ইউনিট পরীক্ষা' : 'Full Unit Test'}</span>
              </button>
            </div>

            {/* 3-Column Dark Lesson Cards matching Screenshot 2 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {selectedUnit.lessons.map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => handleSelectLesson(lesson)}
                  className="bg-[#10141f] hover:bg-[#151c2c] border border-[#1e2738] hover:border-emerald-500/60 rounded-2xl p-5 transition-all duration-200 cursor-pointer group shadow-card flex flex-col justify-between space-y-4"
                >
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

                  {/* Red Clock + Green Document */}
                  <div className="flex items-center gap-4 text-xs font-semibold pt-2 border-t border-[#182030]">
                    <div className="flex items-center gap-1.5 text-rose-400">
                      <Clock size={14} className="stroke-[2.2]" />
                      <span>{lesson.duration || '১ ঘণ্টা ৪০ মিনিট'}</span>
                    </div>

                    <div className="flex items-center gap-1.5 text-emerald-400">
                      <FileText size={14} className="stroke-[2.2]" />
                      <span>{lesson.questionsCount || `${lesson.wordsCount * 4} টি প্রশ্ন`}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          /* STEP 1: 12 UNIT CARDS GRID (MATCHING SCREENSHOT 1) */
          <div className="bg-[#131824] border border-[#232c3f] rounded-3xl p-5 md:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[85vh] overflow-y-auto">
            {/* Header with Search */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-[#1f283a]">
              <div>
                <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-1">
                  <GraduationCap size={14} />
                  <span>NCTB HSC English For Today</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {isBn ? 'অধ্যায়ভিত্তিক পরীক্ষা নির্বাচন' : 'Select Unit & Lesson'}
                </h2>
              </div>

              <div className="relative w-full sm:w-72">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder={isBn ? 'ইউনিট খুঁজুন...' : 'Search unit...'}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-[#0e121a] border border-[#232c3f] rounded-xl text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500 transition-colors"
                />
              </div>
            </div>

            {/* 4-Columns Vibrant Unit Cards matching Screenshot 1 */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5">
              {filteredUnits.map((unit) => (
                <div
                  key={unit.id}
                  onClick={() => handleSelectUnit(unit)}
                  className={`relative overflow-hidden rounded-3xl p-5 sm:p-6 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-2xl cursor-pointer select-none text-white min-h-[170px] sm:min-h-[185px] flex flex-col justify-between shadow-lg ${unit.bgClass || 'bg-[#1b8a43]'}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/15 to-transparent pointer-events-none" />

                  <div className="relative z-10 space-y-1 pr-12">
                    <h3 className="text-xl sm:text-2xl font-black tracking-tight drop-shadow-sm">
                      {unit.unitNumber}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-white/90 drop-shadow-sm leading-tight">
                      {unit.unitTitle}
                    </p>
                  </div>

                  <div className="relative z-10 flex items-center justify-between text-[11px] font-semibold text-white/80 pt-4">
                    <span>{unit.lessons.length} Lessons</span>
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                      <ChevronRight size={14} className="text-white" />
                    </div>
                  </div>

                  {/* Watermark Number matching Screenshot 1 */}
                  <span className="absolute -bottom-2 -right-1 text-7xl sm:text-8xl font-black text-white/25 select-none pointer-events-none leading-none tracking-tighter">
                    {unit.number}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
