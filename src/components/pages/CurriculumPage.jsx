import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Sparkles, 
  ArrowLeft, 
  ArrowRight, 
  Layers, 
  CheckCircle2, 
  Search, 
  FileText, 
  ChevronRight, 
  Globe2, 
  Play 
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';

export default function CurriculumPage({ lang = 'bn', onNavigate, onOpenAuth, onSelectUnit, currentUser }) {
  const [internalLang, setInternalLang] = useState(lang);
  const isBn = internalLang === 'bn';
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedUnitId, setSelectedUnitId] = useState(null);

  // Exclude Unit 4 as per curriculum instruction
  const activeUnits = hscUnits.filter((u) => u.id !== 'unit-4');

  const filteredUnits = activeUnits.filter((u) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      u.unitNumber.toLowerCase().includes(query) ||
      u.unitTitle.toLowerCase().includes(query) ||
      u.unitTitleBn.toLowerCase().includes(query) ||
      (u.lessons && u.lessons.some((l) => l.title.toLowerCase().includes(query) || l.titleBn.toLowerCase().includes(query)))
    );
  });

  const totalWords = activeUnits.reduce((acc, u) => acc + (u.totalWords || 0), 0);
  const totalLessons = activeUnits.reduce((acc, u) => acc + (u.lessons?.length || 0), 0);

  return (
    <div className="min-h-screen bg-[#0c0f17] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Standalone Navigation Bar */}
      {!currentUser && (
        <header className="sticky top-0 z-40 bg-[#0c0f17]/90 backdrop-blur-xl border-b border-[#1b2538] px-4 sm:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate('/')}
              className="p-2 rounded-xl bg-[#111723] hover:bg-[#182234] border border-[#1e293b] text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{isBn ? 'মূল পাতা' : 'Home'}</span>
            </button>

            <div 
              onClick={() => onNavigate('/')}
              className="flex items-center gap-2.5 cursor-pointer ml-1"
            >
              <img
                src="/logo.png"
                alt="Learner Hub"
                className="w-8 h-8 rounded-xl object-cover border border-emerald-500/30 shadow-sm"
              />
              <div>
                <span className="text-sm sm:text-base font-extrabold text-white block leading-tight">Learner Hub</span>
                <span className="text-[10px] text-emerald-400 font-semibold">{isBn ? 'পাঠ্যক্রম ডিরেক্টরি' : 'Curriculum Hub'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => setInternalLang(isBn ? 'en' : 'bn')}
              className="px-3 py-1.5 rounded-xl bg-[#111723] hover:bg-[#182234] border border-[#1e293b] text-slate-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Globe2 size={13} className="text-emerald-400" />
              <span>{isBn ? 'English' : 'বাংলা'}</span>
            </button>

            <button
              onClick={() => onOpenAuth ? onOpenAuth(false) : onNavigate('/auth')}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
            >
              {isBn ? 'লগইন করুন' : 'Sign In'}
            </button>
          </div>
        </header>
      )}

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8">
        {/* Page Hero Title Card */}
        <div className="bg-gradient-to-br from-[#111723] via-[#0e1422] to-[#121929] border border-[#1f293d] rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-3xl space-y-3 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
              <Sparkles size={13} />
              <span>NCTB English For Today (2025–2026)</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
              {isBn ? 'সম্পূর্ণ এইচএসসি ইংরেজি ১ম পত্র পাঠ্যক্রম' : 'Complete HSC English 1st Paper Curriculum'}
            </h1>

            <p className="text-xs sm:text-sm md:text-base text-slate-300 leading-relaxed">
              {isBn
                ? 'জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB) অনুমোদিত পাঠ্যবইয়ের প্রতিটি ইউনিট ও লেসনের গুরুত্বপূর্ণ শব্দাবলী, ব্যাকরণিক অর্থ এবং বোর্ড স্ট্যান্ডার্ড ৪-ক্যাটাগরি প্রশ্নভাণ্ডার।'
                : 'Full breakdown of all authentic units and lessons aligned with the latest NCTB curriculum. Every unit is engineered with contextual vocabulary and board standard MCQs.'}
            </p>

            {/* Quick Stat Pills */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <span className="px-3.5 py-1.5 rounded-xl bg-[#172033] border border-[#263552] text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>{activeUnits.length} {isBn ? 'টি সক্রিয় ইউনিট' : 'Active Units'}</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#172033] border border-[#263552] text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400" />
                <span>{totalLessons} {isBn ? 'টি সম্পূর্ণ লেসন' : 'Textbook Lessons'}</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#172033] border border-[#263552] text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>{totalWords} {isBn ? 'টি পাঠ্যবই ভোকাবুলারি' : 'Textbook Words'}</span>
              </span>
              <span className="px-3.5 py-1.5 rounded-xl bg-[#172033] border border-[#263552] text-xs font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-purple-400" />
                <span>{totalWords * 4} {isBn ? 'টি ৪-ক্যাটাগরি MCQ' : 'Board MCQs'}</span>
              </span>
            </div>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'পাঠ্যক্রমের ইউনিট বা লেসন খুঁজুন (যেমন: Education, Folk Music, Dreams, Shilpi)...' : 'Search units or lessons (e.g. Education, Folk Music, Dreams)...'}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#111723] border border-[#1e293b] text-white placeholder-slate-500 text-xs sm:text-sm outline-none focus:border-emerald-500 shadow-xl transition-all"
          />
        </div>

        {/* Units Grid */}
        <div className="space-y-6">
          {filteredUnits.map((unit) => (
            <div
              key={unit.id}
              className="bg-[#101624] border border-[#1e293b] rounded-3xl p-5 sm:p-7 shadow-xl hover:border-emerald-500/40 transition-all space-y-4"
            >
              {/* Unit Header Bar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1a2335]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 font-black text-sm shadow-md shrink-0">
                    U{unit.number}
                  </div>
                  <div>
                    <span className="text-[11px] font-extrabold text-emerald-400 uppercase tracking-wider block">
                      {unit.unitNumber}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {isBn ? unit.unitTitleBn : unit.unitTitle}
                      <span className="text-slate-400 font-normal text-xs ml-2">({unit.unitTitle})</span>
                    </h3>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold">
                  <span className="px-3 py-1 rounded-xl bg-[#162033] text-cyan-300 border border-cyan-500/30">
                    {unit.lessons?.length || 0} {isBn ? 'টি লেসন' : 'Lessons'}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-[#162033] text-emerald-300 border border-emerald-500/30">
                    {unit.totalWords} {isBn ? 'টি শব্দ' : 'Words'}
                  </span>
                  <span className="px-3 py-1 rounded-xl bg-[#162033] text-purple-300 border border-purple-500/30 font-mono">
                    {unit.totalWords * 4} MCQ
                  </span>
                </div>
              </div>

              {/* Lessons Subgrid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {(unit.lessons || []).map((lesson) => (
                  <div
                    key={lesson.id}
                    className="p-3.5 rounded-2xl bg-[#0a0e17] border border-[#192336] hover:border-slate-600 transition-all flex flex-col justify-between space-y-2.5"
                  >
                    <div>
                      <span className="text-[10px] font-black text-slate-500 uppercase tracking-wide block">
                        {lesson.number}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-200 line-clamp-1">
                        {isBn ? lesson.titleBn : lesson.title}
                      </h4>
                      <p className="text-[11px] text-slate-400 truncate">
                        {lesson.title}
                      </p>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#141d2e] text-[11px] text-slate-400">
                      <span className="font-semibold text-emerald-400 font-mono">
                        {lesson.wordsCount} {isBn ? 'টি শব্দ' : 'Words'}
                      </span>
                      <span className="font-mono text-purple-300">
                        {lesson.wordsCount * 4} MCQ
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Standalone Page Footer */}
      <footer className="mt-16 border-t border-[#171f2e] bg-[#070a10] py-10 text-xs text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium">
            <button onClick={() => onNavigate('/')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'মূল পাতা (Home)' : 'Home'}
            </button>
            <button onClick={() => onNavigate('/teachers')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'শিক্ষকদের জন্য (Teachers)' : 'Teachers'}
            </button>
            <button onClick={() => onNavigate('/faq')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'সাধারণ প্রশ্ন (FAQ)' : 'FAQ'}
            </button>
            <button onClick={() => onNavigate('/about')} className="hover:text-cyan-400 transition-colors cursor-pointer">
              {isBn ? 'পরিচিতি (About)' : 'About'}
            </button>
            <button onClick={() => onNavigate('/terms')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'শর্তাবলী ও নীতিমালা (Terms & Policy)' : 'Terms & Policy'}
            </button>
          </div>
          <p className="text-slate-500">
            © 2026 Learner Hub. Tailored for NCTB Higher Secondary Certificate (HSC) Students in Bangladesh.
          </p>
        </div>
      </footer>
    </div>
  );
}
