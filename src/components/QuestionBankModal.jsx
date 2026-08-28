import React, { useState } from 'react';
import { X, Package, Search, BookOpen, ChevronRight, GraduationCap } from 'lucide-react';
import { hscUnits } from '../data/hscUnitsData';

export default function QuestionBankModal({ isOpen, onClose, lang, onSelectUnit }) {
  const [searchTerm, setSearchTerm] = useState('');
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  const filteredUnits = hscUnits.filter((u) => {
    return (
      u.unitTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.unitTitleBn.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.lessons.some((l) => l.title.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#131824] border border-[#232c3f] rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0e121a] border-b border-[#1f2738] flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <GraduationCap size={20} />
            <span>{isBn ? 'HSC পাঠ্যবই প্রশ্নব্যাংক (১২টি অধ্যায়)' : 'HSC Textbook Question Bank (12 Units)'}</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2738] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4 bg-[#10141f] border-b border-[#1d2536]">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isBn ? 'ইউনিট বা লেসন খুঁজুন (যেমন: Education, Dreams, Art)...' : 'Search unit or lesson name...'}
              className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 outline-none"
            />
          </div>
        </div>

        {/* Units List */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-3 flex-1">
          {filteredUnits.map((u) => (
            <div
              key={u.id}
              onClick={() => {
                if (onSelectUnit) onSelectUnit(u);
                onClose();
              }}
              className="p-3.5 rounded-xl bg-[#161c2a] border border-[#222d42] hover:border-emerald-500/40 hover:bg-[#1b2438] transition-all flex items-center justify-between cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-black text-xs shrink-0">
                  {u.unitNumber}
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm group-hover:text-emerald-300 transition-colors">
                    {isBn ? u.unitTitleBn : u.unitTitle}
                  </h4>
                  <span className="text-xs text-slate-400 block mt-0.5">
                    {u.unitTitle} • {u.lessons.length} Lessons • {u.totalWords} Words
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-500/20">
                  {u.progress}%
                </span>
                <ChevronRight
                  size={18}
                  className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e121a] border-t border-[#1f2738] flex items-center justify-between text-xs text-slate-400">
          <span>{isBn ? 'সম্পূর্ণ NCTB সিলেবাস অনুযায়ী সংকলিত' : 'Compiled according to NCTB HSC Syllabus'}</span>
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
