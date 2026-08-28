import React from 'react';
import { Clock, Award, ArrowRight, BookCheck, Play } from 'lucide-react';
import { mockRecentExams } from '../data/mockData';

export default function RecentExams({ lang, onOpenAllExams, onStartExam }) {
  const isBn = lang === 'bn';

  return (
    <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-5 md:p-6 flex flex-col justify-between shadow-card">
      <div>
        {/* Title */}
        <h2 className="text-white font-bold text-base md:text-lg text-center mb-6 tracking-wide">
          {isBn ? 'সাম্প্রতিক পরীক্ষাসমূহ' : 'Recent Exams & Tests'}
        </h2>

        {/* Exam Cards List */}
        <div className="space-y-4">
          {mockRecentExams.map((exam) => (
            <div
              key={exam.id}
              className="bg-[#10141f] border border-[#1d2536] hover:border-[#2a364d] rounded-xl p-4 transition-all duration-200 hover:shadow-lg group"
            >
              {/* Header: Title & Date */}
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div>
                  <h3 className="text-slate-100 font-bold text-sm md:text-base group-hover:text-emerald-400 transition-colors leading-snug">
                    {exam.title}
                  </h3>
                  {exam.subtitle && (
                    <span className="text-xs text-slate-400 block mt-0.5">
                      {exam.subtitle}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1 text-[11px] text-slate-400 shrink-0 font-medium bg-[#161c2b] px-2 py-0.5 rounded-md border border-[#232c3f]">
                  <span>{isBn ? exam.date : exam.dateEn}</span>
                </div>
              </div>

              {/* Bottom Tags / Badges */}
              <div className="flex flex-wrap items-center gap-2 mt-3 pt-2 border-t border-[#1a2130]">
                {/* Score Pill matching screenshot style */}
                <span className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                  <span className="text-slate-400 font-normal">
                    {isBn ? 'মার্কস :' : 'Score:'}
                  </span>
                  <span>{isBn ? exam.score : exam.scoreRaw}</span>
                </span>

                {/* Category Pill */}
                <span className="text-[11px] font-medium px-2.5 py-0.5 rounded-full bg-[#182030] text-slate-300 border border-[#252f44]">
                  {exam.category}
                </span>

                {/* Retake / Review Button */}
                <button
                  onClick={() => onStartExam(exam)}
                  className="ml-auto text-xs text-slate-400 hover:text-emerald-400 flex items-center gap-1 font-medium transition-colors opacity-80 group-hover:opacity-100"
                >
                  <Play size={12} className="fill-current" />
                  <span>{isBn ? 'পুনরায় দাও' : 'Retake'}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer "সবগুলো দেখো" */}
      <div className="mt-6 pt-4 border-t border-[#1d2536] text-center">
        <button
          onClick={onOpenAllExams}
          className="text-slate-400 hover:text-emerald-400 text-xs md:text-sm font-medium transition-colors inline-flex items-center gap-1.5 group"
        >
          <span>{isBn ? 'সবগুলো দেখো' : 'View All Test Results'}</span>
          <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
}
