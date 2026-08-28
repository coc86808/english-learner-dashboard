import React from 'react';
import { X, Pencil, Timer, CheckCircle, AlertCircle, Play } from 'lucide-react';

export default function MockExamModal({ isOpen, onClose, lang, onStartExamDirect }) {
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  const examList = [
    {
      id: 'm-1',
      title: isBn ? 'BBA (IBA) ফুল মডেল টেস্ট ২০২৬' : 'BBA (IBA) Full Model Test 2026',
      duration: isBn ? '১২০ মিনিট' : '120 Mins',
      marks: '100 Marks',
      questions: '100 Questions',
      difficulty: isBn ? 'কঠিন' : 'Hard',
      diffColor: 'text-rose-400 bg-rose-500/10 border-rose-500/30'
    },
    {
      id: 'm-2',
      title: isBn ? 'HSC English 1st & 2nd Paper Mega Exam' : 'HSC English Mega Mock Exam',
      duration: isBn ? '৬০ মিনিট' : '60 Mins',
      marks: '50 Marks',
      questions: '50 Questions',
      difficulty: isBn ? 'মাঝারি' : 'Medium',
      diffColor: 'text-amber-400 bg-amber-500/10 border-amber-500/30'
    },
    {
      id: 'm-3',
      title: isBn ? 'BCS English Grammar & Literature Special' : 'BCS English Special Test',
      duration: isBn ? '৪৫ মিনিট' : '45 Mins',
      marks: '35 Marks',
      questions: '35 Questions',
      difficulty: isBn ? 'চ্যালেঞ্জিং' : 'Challenging',
      diffColor: 'text-purple-400 bg-purple-500/10 border-purple-500/30'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#131824] border border-[#232c3f] rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0e121a] border-b border-[#1f2738] flex items-center justify-between">
          <div className="flex items-center gap-2 text-rose-400 font-bold">
            <Pencil size={20} />
            <span>{isBn ? 'লাইভ মক পরীক্ষা' : 'Live Mock Exams'}</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2738] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-3.5 flex-1">
          {examList.map((exam) => (
            <div
              key={exam.id}
              className="p-4 rounded-xl bg-[#161c2a] border border-[#222c40] hover:border-rose-500/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 group"
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="text-white font-bold text-sm md:text-base group-hover:text-rose-400 transition-colors">
                    {exam.title}
                  </h4>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full border ${exam.diffColor}`}>
                    {exam.difficulty}
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs text-slate-400 mt-2">
                  <span className="flex items-center gap-1">
                    <Timer size={13} className="text-slate-500" />
                    {exam.duration}
                  </span>
                  <span>•</span>
                  <span>{exam.questions}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-medium">{exam.marks}</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onStartExamDirect(exam);
                }}
                className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-semibold text-xs inline-flex items-center justify-center gap-1.5 shadow-md shadow-rose-950/40 transition-all shrink-0"
              >
                <Play size={13} className="fill-current" />
                <span>{isBn ? 'শুরু করুন' : 'Start Exam'}</span>
              </button>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e121a] border-t border-[#1f2738] flex items-center justify-between text-xs text-slate-400">
          <span>{isBn ? 'নেগেটিভ মার্কিং: ০.২৫' : 'Negative marking: 0.25 per wrong answer'}</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-medium transition-colors"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>
        </div>
      </div>
    </div>
  );
}
