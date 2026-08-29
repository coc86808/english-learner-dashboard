import React from 'react';
import { 
  X, 
  User, 
  GraduationCap, 
  Building, 
  FileDown, 
  Flame, 
  Trophy, 
  Layers, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';
import WeakWordsSection from './WeakWordsSection';
import { generateWeakWordsPDF } from '../utils/pdfGenerator';
import { hscVocabularyList } from '../data/questions/hscQuestionsData';

export default function UserProfileModal({ 
  isOpen, 
  onClose, 
  lang = 'en', 
  weakWords = [], 
  onRemoveWeakWord,
  onOpenFlashcards,
  currentUser,
  onOpenAuth
}) {
  if (!isOpen) return null;

  const isBn = lang === 'bn';
  const studentInfo = {
    name: currentUser?.name || 'HSC Student',
    college: currentUser?.college || 'HSC 2026 Batch',
    batch: currentUser?.batch || 'HSC 2026',
    streak: currentUser?.streak || 0,
    points: currentUser?.points || 0,
    rank: currentUser?.rank || '-'
  };

  const effectiveWeakWords = Array.isArray(weakWords) ? weakWords : [];

  const handleDownloadPDF = () => {
    generateWeakWordsPDF({
      words: effectiveWeakWords,
      studentInfo,
      lang
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto bg-[#0d121c] border border-[#1e283b] rounded-3xl p-5 sm:p-8 shadow-2xl space-y-6 text-slate-100 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-9 h-9 rounded-full bg-[#161e2e] hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-white flex items-center justify-center shadow-xl transition-all cursor-pointer"
          title="Close Profile"
        >
          <X size={18} />
        </button>

        {/* Profile Card Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-[#1b2536]">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-2xl shadow-xl shadow-emerald-950/60 ring-2 ring-emerald-500/40">
              {studentInfo.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() || 'ST'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl sm:text-2xl font-black text-white">
                  {studentInfo.name}
                </h2>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 uppercase">
                  {studentInfo.batch}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                <Building size={13} className="text-slate-500" />
                <span>{studentInfo.college}</span>
              </div>
            </div>
          </div>

          {/* Key Stat Badges & Admin Switch */}
          <div className="flex items-center gap-2.5 flex-wrap">
            {currentUser?.role === 'admin' ? (
              <span className="px-3.5 py-1.5 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-300 text-xs font-bold flex items-center gap-1.5 shadow-sm">
                👑 Master Admin Active
              </span>
            ) : (
              onOpenAuth && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAuth();
                  }}
                  className="px-3.5 py-1.5 rounded-xl bg-purple-950/40 hover:bg-purple-900/60 border border-purple-500/40 text-purple-300 hover:text-white text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  title="Log in with Admin credentials"
                >
                  <span>👑 Admin Login</span>
                </button>
              )
            )}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141b28] border border-orange-500/30 text-orange-400 text-xs font-bold">
              <Flame size={15} className="fill-orange-500" />
              <span>{studentInfo.streak} Days Streak</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#141b28] border border-amber-500/30 text-amber-300 text-xs font-bold">
              <Trophy size={14} />
              <span>{studentInfo.points} pts</span>
            </div>
          </div>
        </div>

        {/* Weak Words Section with PDF Export */}
        <WeakWordsSection
          weakWords={effectiveWeakWords}
          onRemoveWeakWord={onRemoveWeakWord}
          onOpenFlashcards={() => {
            onClose();
            if (onOpenFlashcards) onOpenFlashcards();
          }}
          lang={lang}
          studentInfo={studentInfo}
        />
      </div>
    </div>
  );
}
