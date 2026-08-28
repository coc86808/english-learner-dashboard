import React, { useState } from 'react';
import { X, Package, Search, BookOpen, ChevronRight, Filter } from 'lucide-react';

export default function QuestionBankModal({ isOpen, onClose, lang }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  const categories = [
    {
      title: isBn ? 'ঢাকা বিশ্ববিদ্যালয় (DU A, B, C Unit)' : 'Dhaka University (DU A, B, C)',
      count: '1,450+ Questions',
      badge: 'DU',
      color: 'border-emerald-500/30'
    },
    {
      title: isBn ? 'IBA / BBA Admission Test' : 'IBA / BBA Admission Test',
      count: '980+ Questions',
      badge: 'IBA',
      color: 'border-amber-500/30'
    },
    {
      title: isBn ? 'BCS & Govt Job English Prep' : 'BCS & Govt Job English Prep',
      count: '2,800+ Questions',
      badge: 'BCS',
      color: 'border-purple-500/30'
    },
    {
      title: isBn ? 'HSC বিষয়ভিত্তিক প্রশ্নব্যাংক' : 'HSC Subject-wise Question Bank',
      count: '3,200+ Questions',
      badge: 'HSC',
      color: 'border-cyan-500/30'
    },
    {
      title: isBn ? 'IELTS & Spoken English Flashcards' : 'IELTS & Spoken English Flashcards',
      count: '1,200+ Flashcards',
      badge: 'IELTS',
      color: 'border-rose-500/30'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#131824] border border-[#232c3f] rounded-2xl w-full max-w-xl max-h-[85vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0e121a] border-b border-[#1f2738] flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-400 font-bold">
            <Package size={20} />
            <span>{isBn ? 'প্রশ্নব্যাংক আর্কাইভ' : 'Question Bank Archive'}</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2738] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 bg-[#10141f] border-b border-[#1d2536] space-y-3">
          <div className="relative">
            <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={isBn ? 'প্রশ্নব্যাংক বা টপিক খুঁজুন...' : 'Search question bank or topics...'}
              className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-amber-500 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-slate-500 outline-none"
            />
          </div>
        </div>

        {/* Categories List */}
        <div className="p-4 md:p-6 overflow-y-auto space-y-3 flex-1">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl bg-[#161c2a] border ${cat.color} hover:bg-[#1b2336] transition-all flex items-center justify-between cursor-pointer group`}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 font-black text-xs">
                  {cat.badge}
                </div>
                <div>
                  <h4 className="text-white font-semibold text-sm group-hover:text-amber-400 transition-colors">
                    {cat.title}
                  </h4>
                  <span className="text-xs text-slate-400">{cat.count}</span>
                </div>
              </div>

              <ChevronRight
                size={18}
                className="text-slate-500 group-hover:text-white group-hover:translate-x-1 transition-all"
              />
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#0e121a] border-t border-[#1f2738] flex items-center justify-between text-xs text-slate-400">
          <span>{isBn ? 'মোট ৯,৫০০+ বিগত সালের প্রশ্নাবলী' : 'Total 9,500+ past exam questions'}</span>
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
