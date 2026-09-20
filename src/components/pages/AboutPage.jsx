import React, { useState } from 'react';
import { 
  Info, 
  ArrowLeft, 
  Sparkles, 
  Globe2, 
  BookOpen, 
  ArrowRight,
  Clock
} from 'lucide-react';

export default function AboutPage({ lang = 'bn', onNavigate, onOpenAuth, currentUser }) {
  const [internalLang, setInternalLang] = useState(lang);
  const isBn = internalLang === 'bn';

  return (
    <div className="min-h-screen bg-[#0c0f17] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Header */}
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
              <span className="text-[10px] text-cyan-400 font-semibold">{isBn ? 'পরিচিতি' : 'About Us'}</span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setInternalLang(isBn ? 'en' : 'bn')}
            className="px-3 py-1.5 rounded-xl bg-[#111723] hover:bg-[#182234] border border-[#1e293b] text-slate-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
          >
            <Globe2 size={13} className="text-cyan-400" />
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

      {/* Main Minimal Placeholder */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center mx-auto shadow-xl shadow-cyan-950/40">
          <Clock size={32} />
        </div>

        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-bold uppercase tracking-wider">
          <Sparkles size={13} />
          <span>{isBn ? 'আপডেট আসছে' : 'Coming Soon'}</span>
        </div>

        <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
          {isBn ? 'আমাদের পরিচিতি (About Us)' : 'About Learner Hub'}
        </h1>

        <div className="bg-[#101624] border border-[#1e293b] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-4">
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-lg mx-auto">
            {isBn
              ? 'আমাদের পরিচিতি ও প্ল্যাটফর্মের বিস্তারিত বিবরণ শীঘ্রই এখানে প্রকাশ করা হবে।'
              : 'Detailed information and official background about our platform will be updated here soon.'}
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => onNavigate('/curriculum')}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen size={15} />
              <span>{isBn ? 'পাঠ্যক্রম দেখুন' : 'Explore Curriculum'}</span>
            </button>

            <button
              onClick={() => onNavigate('/')}
              className="px-5 py-2.5 rounded-xl bg-[#162033] hover:bg-[#1f2d48] border border-[#2b3d5e] text-slate-200 font-bold text-xs transition-all cursor-pointer"
            >
              {isBn ? 'মূল পাতায় ফিরে যান' : 'Back to Home'}
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-[#171f2e] bg-[#070a10] py-10 text-xs text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium">
            <button onClick={() => onNavigate('/')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'মূল পাতা (Home)' : 'Home'}
            </button>
            <button onClick={() => onNavigate('/curriculum')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'পাঠ্যক্রম (Curriculum)' : 'Curriculum'}
            </button>
            <button onClick={() => onNavigate('/teachers')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'শিক্ষকদের জন্য (Teachers)' : 'Teachers'}
            </button>
            <button onClick={() => onNavigate('/faq')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'সাধারণ প্রশ্ন (FAQ)' : 'FAQ'}
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
