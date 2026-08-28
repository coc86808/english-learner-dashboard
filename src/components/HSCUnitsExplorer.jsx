import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  Search,
  CheckCircle2,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Play,
  Layers,
  Sparkles
} from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';

export default function HSCUnitsExplorer({ lang, onStartUnitQuiz }) {
  const isBn = lang === 'bn';
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedUnitId, setExpandedUnitId] = useState('unit-1');

  const filteredUnits = hscUnits.filter((u) => {
    const matchesTitle =
      u.unitTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.unitTitleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.unitNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesLessons = u.lessons.some(
      (l) =>
        l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.titleBn.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return matchesTitle || matchesLessons;
  });

  const toggleExpand = (id) => {
    setExpandedUnitId(expandedUnitId === id ? null : id);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Search Header */}
      <div className="bg-gradient-to-r from-[#141b2a] via-[#101622] to-[#121927] border border-[#1f2a3e] p-6 rounded-3xl shadow-card flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 mb-2">
            <GraduationCap size={15} />
            <span>HSC English For Today (12 Units & Lessons)</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-black text-white tracking-tight">
            {isBn ? 'HSC সম্পূর্ণ পাঠ্যবই ও অধ্যায়ভিত্তিক শব্দকোষ' : 'HSC English Textbook & Vocabulary Bank'}
          </h2>
          <p className="text-xs md:text-sm text-slate-400 mt-1 max-w-xl">
            {isBn
              ? 'বোর্ড সিলেবাসের ১২টি ইউনিট এবং প্রতিটি লেসনের গুরুত্বপূর্ণ ভোকাবুলারি, বাংলা অর্থ, সমার্থক-বিপরীত শব্দ ও বোর্ড পরীক্ষার প্রশ্ন।'
              : 'Master all 12 units and individual lessons with textbook definitions, synonyms, antonyms, and past board questions.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="w-full md:w-80 relative">
          <Search size={17} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBn ? 'ইউনিট বা লেসন খুঁজুন...' : 'Search unit or lesson...'}
            className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-2xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
          />
        </div>
      </div>

      {/* Grid of all 12 Units with Expandable Lessons */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredUnits.map((unit) => {
          const isExpanded = expandedUnitId === unit.id;

          return (
            <div
              key={unit.id}
              className={`bg-[#131824] border rounded-2xl p-5 shadow-card transition-all duration-200 flex flex-col justify-between ${
                isExpanded ? 'border-emerald-500/40 bg-[#141a27]' : 'border-[#1d2536] hover:border-[#28354c]'
              }`}
            >
              <div>
                {/* Unit Header */}
                <div
                  onClick={() => toggleExpand(unit.id)}
                  className="flex items-start justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-sm shrink-0 shadow-sm">
                      {unit.unitNumber.replace('Unit ', 'U')}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-black text-emerald-400 uppercase tracking-wider">
                          {unit.unitNumber}
                        </span>
                        <span className="text-xs text-slate-500">• {unit.lessons.length} {isBn ? 'টি লেসন' : 'Lessons'}</span>
                      </div>
                      <h3 className="text-white font-extrabold text-base md:text-lg group-hover:text-emerald-300 transition-colors mt-0.5">
                        {isBn ? unit.unitTitleBn : unit.unitTitle}
                      </h3>
                      <span className="text-xs text-slate-400 font-medium">
                        {unit.unitTitle}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-1 rounded-lg border border-emerald-500/20">
                      {unit.progress}%
                    </span>
                    <button className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 group-hover:text-white">
                      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-[#1c2436] h-1.5 rounded-full overflow-hidden mt-3.5">
                  <div
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.max(unit.progress, 5)}%` }}
                  />
                </div>

                {/* Lessons Details List */}
                {isExpanded && (
                  <div className="mt-4 pt-3.5 border-t border-[#1e2738] space-y-2 animate-in fade-in duration-200">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                      {isBn ? 'অন্তর্ভুক্ত লেসনসমূহ:' : 'Included Lessons:'}
                    </span>

                    {unit.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="p-3 rounded-xl bg-[#0e131e] border border-[#1b2333] hover:border-emerald-500/30 flex items-center justify-between gap-3 group/lesson transition-all"
                      >
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2
                            size={15}
                            className={lesson.progress >= 50 ? 'text-emerald-400' : 'text-slate-600'}
                          />
                          <div>
                            <span className="text-xs md:text-sm font-bold text-white group-hover/lesson:text-emerald-300 transition-colors block">
                              {lesson.number}: {lesson.title}
                            </span>
                            {isBn && (
                              <span className="text-[11px] text-slate-400">
                                {lesson.titleBn}
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <span className="text-[11px] text-slate-400 bg-[#161c2b] px-2 py-0.5 rounded border border-[#232c3f]">
                            {lesson.wordsCount} words
                          </span>

                          <button
                            onClick={() => onStartUnitQuiz && onStartUnitQuiz(unit, lesson)}
                            className="p-1.5 rounded-lg bg-emerald-600/20 hover:bg-emerald-600 text-emerald-300 hover:text-white border border-emerald-500/30 transition-all"
                            title="Start Lesson Quiz"
                          >
                            <Play size={13} className="fill-current" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Quick Test Trigger */}
              <div className="mt-4 pt-3 border-t border-[#1c2436] flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  {isBn ? 'মুখস্থ হয়েছে:' : 'Mastered:'}{' '}
                  <strong className="text-emerald-400 font-bold">{unit.masteredWords}</strong>/{unit.totalWords}
                </span>

                <button
                  onClick={() => onStartUnitQuiz && onStartUnitQuiz(unit)}
                  className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs inline-flex items-center gap-1.5 shadow-md shadow-emerald-950/40 transition-all"
                >
                  <Play size={12} className="fill-current" />
                  <span>{isBn ? 'ইউনিট টেস্ট শুরু করুন' : 'Start Unit Test'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
