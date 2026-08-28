import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Layers, CheckCircle2, ArrowRight } from 'lucide-react';
import { mockSubjects } from '../data/mockData';

export default function SubjectReport({ lang, onOpenAllSubjects }) {
  const [expandedId, setExpandedId] = useState(null);
  const isBn = lang === 'bn';

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-card">
      <div>
        {/* Title */}
        <h2 className="text-white font-bold text-base md:text-lg text-center mb-6 tracking-wide">
          {isBn ? 'বিষয়ভিত্তিক রিপোর্ট' : 'Subject-wise Performance'}
        </h2>

        {/* Subjects List */}
        <div className="space-y-4">
          {mockSubjects.map((sub) => {
            const isExpanded = expandedId === sub.id;

            return (
              <div
                key={sub.id}
                className="rounded-xl transition-colors border border-transparent hover:border-[#222c40] p-1.5"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(sub.id)}
                  className="flex items-center justify-between cursor-pointer group py-1"
                >
                  <span className="text-slate-200 font-semibold text-sm md:text-base group-hover:text-emerald-400 transition-colors">
                    {isBn ? sub.name : sub.nameEn}
                  </span>

                  <div className="flex items-center gap-1 text-slate-400 text-xs font-semibold">
                    <span>{sub.progress}%</span>
                    {isExpanded ? (
                      <ChevronUp size={15} className="text-slate-400" />
                    ) : (
                      <ChevronDown size={15} className="text-slate-400" />
                    )}
                  </div>
                </div>

                {/* Progress Bar matching screenshot style */}
                <div className="w-full bg-[#1e2738] h-1.5 rounded-full overflow-hidden mt-1.5">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all duration-700 ease-out"
                    style={{ width: `${Math.max(sub.progress, 3)}%` }}
                  />
                </div>

                {/* Expandable Sub-topic Details */}
                {isExpanded && (
                  <div className="mt-3.5 pl-2 pr-1 space-y-2 border-t border-[#1d2536] pt-3 text-xs">
                    {sub.subtopics.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between text-slate-400">
                        <div className="flex items-center gap-2">
                          <CheckCircle2
                            size={13}
                            className={item.progress > 0 ? 'text-emerald-400' : 'text-slate-600'}
                          />
                          <span>{item.name}</span>
                        </div>
                        <span className="text-slate-300 font-medium">{item.progress}%</span>
                      </div>
                    ))}
                    <div className="text-[11px] text-emerald-400 pt-1 text-right">
                      {isBn
                        ? `${sub.completedTopics}/${sub.totalTopics} টি অধ্যায় সম্পন্ন`
                        : `${sub.completedTopics}/${sub.totalTopics} Chapters completed`}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer "সবগুলো দেখো" (View All) */}
      <div className="mt-6 pt-4 border-t border-[#1d2536] text-center">
        <button
          onClick={onOpenAllSubjects}
          className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm font-medium transition-colors inline-flex items-center gap-1.5 group"
        >
          <span>{isBn ? 'সবগুলো দেখো' : 'View All Subjects'}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
