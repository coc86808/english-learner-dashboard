import React, { useRef } from 'react';
import { Award, Download, Printer, X, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';

export default function CertificateModal({
  isOpen,
  onClose,
  studentName = 'Tanvir Ahmed',
  collegeName = 'Notre Dame College, Dhaka',
  hscBatch = 'HSC 2026',
  examTitle = 'HSC English Textbook Vocabulary Mastery',
  score = '100%',
  totalMastered = 5,
  date = '29 August 2026',
  lang = 'bn'
}) {
  const certificateRef = useRef(null);
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#10141f] border border-[#2a364d] rounded-3xl p-6 shadow-2xl space-y-5 animate-in fade-in zoom-in duration-200">
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-3 -right-3 z-50 w-9 h-9 rounded-full bg-[#182030] hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all"
        >
          <X size={18} />
        </button>

        {/* Certificate Card Content */}
        <div
          ref={certificateRef}
          className="p-8 sm:p-10 rounded-2xl bg-gradient-to-b from-[#182236] via-[#101624] to-[#0c101a] border-4 border-amber-500/40 relative overflow-hidden shadow-2xl text-center space-y-5"
        >
          {/* Certificate Corner Decorations */}
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-amber-400/70 pointer-events-none" />
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-amber-400/70 pointer-events-none" />
          <div className="absolute bottom-2 left-2 w-8 h-8 border-b-2 border-l-2 border-amber-400/70 pointer-events-none" />
          <div className="absolute bottom-2 right-2 w-8 h-8 border-b-2 border-r-2 border-amber-400/70 pointer-events-none" />

          {/* Golden Badge Logo */}
          <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-amber-500 to-yellow-300 mx-auto flex items-center justify-center shadow-lg shadow-amber-500/30 border-2 border-yellow-200">
            <Award size={36} className="text-slate-950" />
          </div>

          <div>
            <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase">
              HSC English Learner Hub
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-black text-white tracking-wide mt-1">
              Certificate of Vocabulary Mastery
            </h2>
            <p className="text-xs text-slate-400 mt-1 italic">
              This is proudly presented to certify that
            </p>
          </div>

          {/* Student Name */}
          <div className="py-2 border-b-2 border-amber-500/30 max-w-sm mx-auto">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
              {studentName}
            </h3>
            <span className="text-xs text-slate-300 block mt-1">
              {collegeName} • {hscBatch}
            </span>
          </div>

          {/* Achievement Description */}
          <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
            Has successfully demonstrated excellence by mastering all vocabulary words with 3 consecutive correct repetitions in the <strong className="text-emerald-400 font-semibold">{examTitle}</strong> module.
          </p>

          {/* Certificate Footer with Date, Score and Seal */}
          <div className="pt-5 flex items-center justify-between border-t border-slate-800 text-xs text-slate-400">
            <div className="text-left">
              <span className="block font-bold text-slate-300">{date}</span>
              <span className="text-[10px] text-slate-500">Date of Award</span>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                <ShieldCheck size={20} />
              </div>
              <span className="text-[9px] text-emerald-400 font-bold mt-0.5">VERIFIED</span>
            </div>

            <div className="text-right">
              <span className="block font-bold text-amber-400">{score} (100% Mastered)</span>
              <span className="text-[10px] text-slate-500">Achievement Level</span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-1">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
          >
            {isBn ? 'বন্ধ করুন' : 'Close'}
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold inline-flex items-center gap-1.5 shadow-lg shadow-emerald-950/50 transition-all"
            >
              <Printer size={15} />
              <span>{isBn ? 'প্রিন্ট / PDF সংরক্ষণ করুন' : 'Print / Save PDF'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
