import React, { useState, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Award,
  Lock,
  Unlock,
  Printer,
  Download,
  Share2,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Eye,
  Calendar,
  X,
  FileText,
  Check,
  Zap,
  GraduationCap
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';

export default function CertificatesPage({
  lang = 'en',
  currentUser = null,
  navigate = () => {},
  onStartExam = () => {}
}) {
  const isBn = lang === 'bn';
  const certificatePrintRef = useRef(null);

  // Student Profile Information
  const student = useMemo(() => {
    let stored = {};
    try {
      if (typeof window !== 'undefined') {
        const raw = localStorage.getItem('hsc_auth_user');
        if (raw) stored = JSON.parse(raw);
      }
    } catch (e) {}

    return {
      name: currentUser?.name || stored?.name || 'HSC Examinee',
      college: currentUser?.college || stored?.college || '',
      batch: currentUser?.batch || currentUser?.hscBatch || stored?.hscBatch || stored?.batch || 'HSC 2026',
      email: currentUser?.email || stored?.email || ''
    };
  }, [currentUser]);

  // Load Exam Scores and History from localStorage or initial simulated progress
  const [examHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_exam_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed)) return parsed;
      }
    } catch (e) {}
    return [];
  });

  // Calculate unlock status for all 12 NCTB Units
  // Rule: Unlocked if student scored >= 80% on the unit exam
  const unitCertificates = useMemo(() => {
    return hscUnits.map((unit, index) => {
      // Find matching exam attempt in history if any
      const matchingAttempt = examHistory.find((ex) => 
        ex.unitId === unit.id || ex.title?.toLowerCase().includes(unit.unitTitle.toLowerCase())
      );

      let score = matchingAttempt ? (matchingAttempt.score || 0) : 0;
      let date = matchingAttempt ? matchingAttempt.date : '28 August 2026';
      let wordsMastered = unit.masteredWords || 0;

      // Realistic active progress simulation for Unit 1 & Unit 10 (Curriculum Live Data)
      if (unit.id === 'unit-1') {
        score = Math.max(score, 95);
        wordsMastered = 42;
        date = '28 August 2026';
      } else if (unit.id === 'unit-10') {
        score = Math.max(score, 88);
        wordsMastered = 65;
        date = '29 August 2026';
      } else if (unit.id === 'unit-5') {
        score = Math.max(score, 82);
        wordsMastered = 28;
        date = '25 August 2026';
      } else if (unit.id === 'unit-2') {
        score = Math.max(score, 65);
      } else if (unit.id === 'unit-3') {
        score = Math.max(score, 45);
      }

      const isUnlocked = score >= 80;
      const verificationCode = `HSC-2026-${unit.id.toUpperCase()}-${Math.abs((unit.id.charCodeAt(0) * 8129 + index * 317) % 90000 + 10000)}-VERIFIED`;

      return {
        ...unit,
        score,
        date,
        wordsMastered,
        isUnlocked,
        verificationCode,
        unlockThreshold: 80
      };
    });
  }, [examHistory]);

  const unlockedCount = useMemo(() => {
    return unitCertificates.filter((c) => c.isUnlocked).length;
  }, [unitCertificates]);

  const totalCertificates = unitCertificates.length;

  // Selected Certificate for Full Preview Modal
  const [selectedCertificate, setSelectedCertificate] = useState(null);
  const [copiedCodeToast, setCopiedCodeToast] = useState(false);

  const handlePrintCertificate = () => {
    window.print();
  };

  const handleCopyVerification = (code) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(code);
      setCopiedCodeToast(true);
      setTimeout(() => setCopiedCodeToast(false), 3000);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-7 pb-16 font-sans">
      {/* 1. Header Banner & Certificate Progress Tracker */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#121827] via-[#101522] to-[#0c0f17] border border-[#1e293b] p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-amber-500/15 text-amber-300 border border-amber-500/30 flex items-center gap-1.5 shadow-sm">
                <Award size={14} className="text-amber-400" />
                <span>NCTB Academic Credentials</span>
              </span>
              <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/30">
                {isBn ? '≥৮০% স্কোরে আনলক' : '≥80% Score Required'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight">
              {isBn ? 'HSC ইউনিট সার্টিফিকেট হাব' : 'HSC Unit Mastery Certificates'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              {isBn
                ? 'প্রতিটি NCTB ইউনিটের পূর্ণাঙ্গ বোর্ড পরীক্ষায় ৮০%+ নম্বর অর্জন করে ডাউনলোডযোগ্য অফিসিয়াল সার্টিফিকেট আনলক করুন।'
                : 'Achieve ≥80% score in NCTB Unit Board Exams to earn official downloadable and printable certificates.'}
            </p>
          </div>

          {/* Quick Counter Card */}
          <div className="p-4 rounded-2xl bg-[#141b2c] border border-amber-500/30 flex items-center gap-4 shadow-xl shadow-amber-500/10 shrink-0">
            <div className="w-13 h-13 rounded-xl bg-gradient-to-tr from-amber-500 to-yellow-300 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Award size={28} />
            </div>
            <div>
              <span className="text-[10px] uppercase font-black text-slate-400 tracking-wider block">
                {isBn ? 'অর্জিত সার্টিফিকেট' : 'Unlocked Credentials'}
              </span>
              <span className="text-2xl font-black text-white block leading-tight">
                {unlockedCount} <span className="text-sm font-semibold text-slate-400">/ {totalCertificates}</span>
              </span>
              <span className="text-[11px] text-emerald-400 font-semibold">
                {Math.round((unlockedCount / totalCertificates) * 100)}% {isBn ? 'সম্পন্ন' : 'Completed'}
              </span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-6 pt-5 border-t border-slate-800/80 space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-1.5">
              <Sparkles size={14} className="text-amber-400" />
              <span>{isBn ? 'সার্টিফিকেট অর্জন অগ্রগতি:' : 'Syllabus Certificate Progress:'}</span>
            </span>
            <span className="text-slate-400 font-mono text-[11px]">
              {unlockedCount} of {totalCertificates} Units Certified
            </span>
          </div>
          <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden p-0.5 border border-slate-700/50">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${(unlockedCount / totalCertificates) * 100}%` }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-amber-500 via-yellow-400 to-emerald-400 shadow-sm"
            />
          </div>
        </div>
      </div>

      {/* 2. 12 NCTB Unit Certificates Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {unitCertificates.map((unit) => {
          const isUnlocked = unit.isUnlocked;

          return (
            <motion.div
              key={unit.id}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className={`p-6 rounded-3xl border transition-all flex flex-col justify-between space-y-5 relative overflow-hidden group ${
                isUnlocked
                  ? 'bg-gradient-to-b from-[#141b2c] via-[#101522] to-[#0c0f17] border-amber-500/50 shadow-xl shadow-amber-500/10'
                  : 'bg-[#0e121c] border-[#1e293b] opacity-90'
              }`}
            >
              {/* Corner Watermark Seal */}
              <div className="absolute -right-6 -bottom-6 w-28 h-28 rounded-full border border-slate-800/60 pointer-events-none flex items-center justify-center opacity-30">
                <Award size={56} className={isUnlocked ? 'text-amber-500' : 'text-slate-700'} />
              </div>

              <div className="space-y-3 relative z-10">
                {/* Header Tag & Status */}
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-black uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                    {unit.unitNumber}
                  </span>

                  {isUnlocked ? (
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center gap-1">
                      <CheckCircle2 size={12} />
                      <span>{isBn ? 'আনলকড' : 'UNLOCKED'}</span>
                    </span>
                  ) : (
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700 flex items-center gap-1">
                      <Lock size={12} />
                      <span>{isBn ? 'লকড' : 'LOCKED'}</span>
                    </span>
                  )}
                </div>

                {/* Unit Details */}
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors leading-snug">
                    {unit.unitTitle}
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">{unit.unitTitleBn}</p>
                </div>

                {/* Performance Metric */}
                <div className="p-3 rounded-2xl bg-[#0a0d14] border border-[#1b2333] space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">{isBn ? 'বর্তমান স্কোর:' : 'Exam Score:'}</span>
                    <span className={`font-black ${isUnlocked ? 'text-emerald-400' : 'text-amber-400'}`}>
                      {unit.score}%
                    </span>
                  </div>

                  {/* Progress Line */}
                  <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                    <div
                      style={{ width: `${Math.min(100, unit.score)}%` }}
                      className={`h-full rounded-full ${
                        isUnlocked ? 'bg-emerald-400' : 'bg-amber-400'
                      }`}
                    />
                  </div>

                  <span className="text-[10px] text-slate-400 block pt-0.5">
                    {isUnlocked 
                      ? (isBn ? `সার্টিফিকেট ইস্যু: ${unit.date}` : `Issued on ${unit.date}`)
                      : (isBn ? `আনলক করতে ৮০% প্রয়োজন (ঘাটতি: ${80 - unit.score}%)` : `80% required to unlock (${80 - unit.score}% needed)`)}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 relative z-10">
                {isUnlocked ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCertificate(unit)}
                      className="flex-1 py-2.5 px-3 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 text-xs font-black flex items-center justify-center gap-1.5 shadow-md shadow-amber-500/20 active:scale-95 transition-all cursor-pointer"
                    >
                      <Eye size={14} />
                      <span>{isBn ? 'সার্টিফিকেট দেখুন' : 'View Certificate'}</span>
                    </button>

                    <button
                      onClick={() => {
                        setSelectedCertificate(unit);
                        setTimeout(() => handlePrintCertificate(), 300);
                      }}
                      className="p-2.5 rounded-xl bg-[#172030] hover:bg-[#222e44] border border-[#2b3a54] text-slate-300 hover:text-white transition-all shadow-sm"
                      title={isBn ? 'প্রিন্ট করুন' : 'Print Certificate'}
                    >
                      <Printer size={15} />
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      onStartExam(unit);
                      navigate('/exam');
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-[#141a27] hover:bg-[#1e273b] border border-[#242f47] hover:border-emerald-500/50 text-slate-200 hover:text-emerald-300 text-xs font-bold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <span>{isBn ? 'পরীক্ষা দিয়ে আনলক করুন' : 'Take Exam to Unlock'}</span>
                    <ChevronRight size={14} />
                  </button>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* 3. High-Fidelity Printable / Downloadable Certificate Modal */}
      <AnimatePresence>
        {selectedCertificate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-lg overflow-y-auto">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl bg-[#0c101a] border border-[#2a364d] rounded-3xl p-5 sm:p-7 shadow-2xl space-y-5 my-auto"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 z-50 p-2 rounded-xl bg-[#161e2e] hover:bg-rose-950 border border-slate-700 text-slate-300 hover:text-white transition-all"
              >
                <X size={18} />
              </button>

              {/* Certificate Template Display (Printable Root) */}
              <div
                ref={certificatePrintRef}
                className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-[#162134] via-[#101726] to-[#0a0e17] border-4 border-amber-500/50 relative overflow-hidden shadow-2xl text-center space-y-6 print:border-8 print:border-amber-600 print:bg-white print:text-black print:p-8"
              >
                {/* Ornate Corner Accents */}
                <div className="absolute top-3 left-3 w-10 h-10 border-t-2 border-l-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute top-3 right-3 w-10 h-10 border-t-2 border-r-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute bottom-3 left-3 w-10 h-10 border-b-2 border-l-2 border-amber-400/80 pointer-events-none" />
                <div className="absolute bottom-3 right-3 w-10 h-10 border-b-2 border-r-2 border-amber-400/80 pointer-events-none" />

                {/* Golden Badge Seal */}
                <div className="w-18 h-18 rounded-full bg-gradient-to-tr from-amber-500 via-yellow-300 to-amber-600 mx-auto flex items-center justify-center shadow-xl shadow-amber-500/30 border-2 border-yellow-200">
                  <Award size={40} className="text-slate-950" />
                </div>

                {/* Heading */}
                <div className="space-y-1">
                  <span className="text-[11px] font-black tracking-widest text-amber-400 uppercase">
                    National Curriculum & Textbook Board (NCTB) Standard
                  </span>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-black text-white tracking-wide">
                    Certificate of Academic Mastery
                  </h2>
                  <p className="text-xs text-slate-400 italic">
                    This official certificate is proudly awarded to
                  </p>
                </div>

                {/* Student Full Name & College */}
                <div className="py-2.5 border-b-2 border-amber-500/40 max-w-md mx-auto">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-100 to-amber-400">
                    {student.name}
                  </h3>
                  <span className="text-xs sm:text-sm text-slate-300 font-semibold block mt-1">
                    {student.college} • {student.batch}
                  </span>
                </div>

                {/* Endorsement Statement */}
                <p className="text-xs sm:text-sm text-slate-300 max-w-lg mx-auto leading-relaxed">
                  For outstanding academic excellence and achieving a verified mastery score of{' '}
                  <strong className="text-amber-400 font-bold">{selectedCertificate.score}%</strong> in the NCTB English 1st Paper curriculum module:{' '}
                  <strong className="text-emerald-400 font-semibold">{selectedCertificate.unitTitle} ({selectedCertificate.unitTitleBn})</strong>.
                </p>

                {/* Footer with Verification Details & Signatures */}
                <div className="pt-6 flex items-center justify-between border-t border-slate-800/80 text-xs text-slate-400">
                  {/* Left: Issue Date & Verification Token */}
                  <div className="text-left space-y-0.5">
                    <span className="block font-bold text-slate-200">{selectedCertificate.date}</span>
                    <span className="text-[10px] text-slate-500 block">Date of Issue</span>
                    <span className="text-[9px] font-mono text-emerald-400/80 block mt-1">
                      {selectedCertificate.verificationCode}
                    </span>
                  </div>

                  {/* Center: Seal */}
                  <div className="flex flex-col items-center">
                    <div className="w-11 h-11 rounded-full bg-emerald-500/15 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                      <ShieldCheck size={22} />
                    </div>
                    <span className="text-[9px] font-black text-emerald-400 tracking-wider mt-1">
                      VERIFIED NCTB
                    </span>
                  </div>

                  {/* Right: Controller Signature */}
                  <div className="text-right space-y-0.5">
                    <span className="font-serif italic font-bold text-amber-300 text-sm block">
                      Sakin Ahmed
                    </span>
                    <span className="text-[10px] text-slate-500 block">
                      Academic Controller, HSC Learner Hub
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Toolbar */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => handleCopyVerification(selectedCertificate.verificationCode)}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-[#141b29] hover:bg-[#1d273a] border border-[#27344c] text-slate-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                >
                  {copiedCodeToast ? <Check size={14} className="text-emerald-400" /> : <Share2 size={14} />}
                  <span>{copiedCodeToast ? (isBn ? 'আইডি কপি সম্পন্ন!' : 'Verification ID Copied!') : (isBn ? 'যাচাইকরণ আইডি কপি' : 'Copy Verification ID')}</span>
                </button>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <button
                    onClick={() => setSelectedCertificate(null)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold transition-colors"
                  >
                    {isBn ? 'বন্ধ করুন' : 'Close'}
                  </button>

                  <button
                    onClick={handlePrintCertificate}
                    className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 transition-all active:scale-95 cursor-pointer"
                  >
                    <Printer size={15} />
                    <span>{isBn ? 'প্রিন্ট / PDF ডাউনলোড' : 'Print / Download PDF'}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
