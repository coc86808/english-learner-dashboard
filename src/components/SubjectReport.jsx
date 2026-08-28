import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Layers, CheckCircle2, ArrowRight, Sparkles, GraduationCap } from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';

export default function SubjectReport({ lang, onOpenAllSubjects, onSelectLesson }) {
  const [expandedId, setExpandedId] = useState('unit-1'); // Default expand Unit 1
  const [visibleCount, setVisibleCount] = useState(6); // Show 6 units by default or all 12
  const isBn = lang === 'bn';

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const displayedUnits = hscUnits.slice(0, visibleCount);

  return (
    <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-card">
      <div>
        {/* Title Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-1.5">
            <GraduationCap size={14} />
            <span>HSC English For Today</span>
          </div>
          <h2 className="text-white font-bold text-base md:text-lg tracking-wide">
            {isBn ? 'অধ্যায়ভিত্তিক অগ্রগতি ও ভোকাবুলারি' : 'Unit & Lesson Progress'}
          </h2>
        </div>

        {/* Units List */}
        <div className="space-y-3.5">
          {displayedUnits.map((unit) => {
            const isExpanded = expandedId === unit.id;

            return (
              <div
                key={unit.id}
                className={`rounded-xl transition-all border p-2.5 ${
                  isExpanded
                    ? 'bg-[#10141f] border-[#29364c]'
                    : 'bg-[#10141f]/60 border-[#1c2436] hover:border-[#253045]'
                }`}
              >
                {/* Unit Header Row */}
                <div
                  onClick={() => toggleExpand(unit.id)}
                  className="flex items-center justify-between cursor-pointer group py-1"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-xs font-black text-emerald-400 bg-[#161c2b] px-2 py-0.5 rounded-md border border-[#232c3f]">
                      {unit.unitNumber}
                    </span>
                    <div>
                      <span className="text-slate-100 font-bold text-sm group-hover:text-emerald-300 transition-colors block">
                        {isBn ? unit.unitTitleBn : unit.unitTitle}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        {unit.unitTitle} • {unit.lessons.length} {isBn ? 'টি লেসন' : 'Lessons'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold shrink-0">
                    <span className="text-emerald-400 font-bold">{unit.progress}%</span>
                    {isExpanded ? (
                      <ChevronUp size={15} className="text-slate-300" />
                    ) : (
                      <ChevronDown size={15} className="text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#1c2436] h-1.5 rounded-full overflow-hidden mt-2">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.max(unit.progress, 4)}%` }}
                  />
                </div>

                {/* Expandable Lessons Details */}
                {isExpanded && (
                  <div className="mt-3 pl-2 pr-1 space-y-2 border-t border-[#1c2436] pt-3 text-xs animate-in fade-in duration-200">
                    {unit.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        onClick={() => onSelectLesson && onSelectLesson(lesson, unit)}
                        className="flex items-center justify-between text-slate-300 p-1.5 rounded-lg hover:bg-[#182030] cursor-pointer transition-colors group"
                      >
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            size={13}
                            className={lesson.progress >= 50 ? 'text-emerald-400' : 'text-slate-600'}
                          />
                          <div>
                            <span className="font-semibold text-white group-hover:text-emerald-300 transition-colors block">
                              {lesson.number}: {lesson.title}
                            </span>
                            {isBn && (
                              <span className="text-[10px] text-slate-400">
                                {lesson.titleBn}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="text-[11px] font-bold text-emerald-400">
                            {lesson.progress}%
                          </span>
                          <span className="text-[10px] text-slate-500 block">
                            {lesson.wordsCount} words
                          </span>
                        </div>
                      </div>
                    ))}

                    <div className="text-[11px] text-emerald-400/90 pt-1.5 text-right font-medium flex items-center justify-between border-t border-[#1a2233]">
                      <span className="text-slate-500 text-[10px]">
                        {unit.masteredWords}/{unit.totalWords} {isBn ? 'শব্দ সম্পন্ন' : 'words mastered'}
                      </span>
                      <span>
                        {unit.lessons.length} {isBn ? 'টি পাঠ অন্তর্ভুক্ত' : 'Lessons Total'}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Toggle between 6 units or all 12 units */}
      <div className="mt-5 pt-3.5 border-t border-[#1d2536] text-center">
        {visibleCount < hscUnits.length ? (
          <button
            onClick={() => setVisibleCount(hscUnits.length)}
            className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm font-medium transition-colors inline-flex items-center gap-1.5 group"
          >
            <span>{isBn ? `সকল ১২টি ইউনিট দেখুন (${hscUnits.length} Units)` : `View All 12 Units`}</span>
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        ) : (
          <button
            onClick={() => setVisibleCount(6)}
            className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm font-medium transition-colors inline-flex items-center gap-1.5"
          >
            <span>{isBn ? 'সংক্ষিপ্ত ভিউ' : 'Show Less Units'}</span>
          </button>
        )}
      </div>
    </div>
  );
}
