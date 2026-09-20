import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  GraduationCap, 
  BookOpen, 
  Printer, 
  Award, 
  CheckCircle2, 
  Users, 
  FileText, 
  ArrowLeft, 
  Sparkles, 
  ShieldCheck, 
  Globe2, 
  BarChart3,
  HelpCircle
} from 'lucide-react';

export default function TeachersPage({ lang = 'bn', onNavigate, onOpenAuth, currentUser }) {
  const [internalLang, setInternalLang] = useState(lang);
  const isBn = internalLang === 'bn';

  const teacherFeatures = [
    {
      icon: Printer,
      titleEn: 'Printable 4-Column PDF Sheets',
      titleBn: 'প্রিন্টযোগ্য ৪-কলাম PDF রিভিশন শিট',
      descEn: 'Generate high-resolution printable vocabulary sheets with English words, exact Bengali meanings, synonyms, antonyms, and textbook context sentences for classroom pop quizzes and homework.',
      descBn: 'ক্লাসরুম টেস্ট ও হোমওয়ার্কের জন্য শিক্ষার্থীর নাম ও কলেজসহ ঝকঝকে ৪-কলাম PDF শব্দভাণ্ডার শিট এক ক্লিকে প্রিন্ট ও বিতরণ করুন।'
    },
    {
      icon: BookOpen,
      titleEn: '100% NCTB Textbook Alignment',
      titleBn: 'এনসিটিবি পাঠ্যবইয়ের সাথে শতভাগ সামঞ্জস্য',
      descEn: 'Every single word, sentence, and exercise is mapped strictly to the official NCTB English For Today textbook for HSC 2025–2026 examination batches.',
      descBn: 'এইচএসসি ২০২৫-২০২৬ ব্যাচের বোর্ডের নতুন শিক্ষাক্রম অনুযায়ী প্রতিটি ইউনিট ও লেসনের হুবহু পাঠ্যবই বাক্যের নির্ভরযোগ্য রেফারেন্স।'
    },
    {
      icon: Award,
      titleEn: 'Board-Standard 4-Format MCQs',
      titleBn: 'বোর্ড স্ট্যান্ডার্ড ৪-ক্যাটাগরি MCQ মডেল',
      descEn: 'Train students on the 4 canonical question styles tested in HSC Board Exams: Synonyms, Antonyms, English Definitions, and Authentic Bengali Meanings.',
      descBn: 'বোর্ড পরীক্ষায় যেভাবে প্রশ্ন আসে: সমার্থক শব্দ, বিপরীতার্থক শব্দ, ইংরেজি সংজ্ঞা ও বাংলা অর্থ — প্রতিটি শব্দের জন্য ৪টি পূর্ণাঙ্গ প্রশ্ন।'
    },
    {
      icon: BarChart3,
      titleEn: 'Automated Weak Word Recovery',
      titleBn: 'দুর্বল শব্দ শনাক্ত ও স্বয়ংক্রিয় সমাধান',
      descEn: 'Our SM-2 algorithm tracks repeated mistakes (3 mistakes flags a weak word; 5 correct answers masters it), ensuring struggling students get targeted practice.',
      descBn: 'শিক্ষার্থী ৩ বার ভুল করলে শব্দটি দুর্বল তালিকায় জমা হয় এবং ৫ বার সঠিক উত্তর দিলে উত্তীর্ণ হয়—ফলে ক্লাসের দুর্বল শিক্ষার্থীরাও দ্রুত উন্নতি করে।'
    }
  ];

  return (
    <div className="min-h-screen bg-[#0c0f17] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Navigation Bar */}
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
                <span className="text-[10px] text-emerald-400 font-semibold">{isBn ? 'শিক্ষক ও একাডেমি কর্নার' : 'Educator & Teacher Hub'}</span>
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

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-10">
        {/* Hero Card */}
        <div className="bg-gradient-to-br from-[#121929] via-[#0f1523] to-[#141b2e] border border-[#212f47] rounded-3xl p-6 sm:p-12 shadow-2xl relative overflow-hidden text-center space-y-4">
          <div className="absolute top-0 right-1/4 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 flex items-center justify-center mx-auto shadow-lg shadow-cyan-950/40">
            <GraduationCap size={30} />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 text-xs font-extrabold uppercase tracking-wider">
            <Sparkles size={13} />
            <span>{isBn ? 'কলেজ শিক্ষক ও কোচিং ইনস্ট্রাক্টরদের জন্য' : 'For College Teachers & Educators'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight max-w-3xl mx-auto">
            {isBn
              ? 'এইচএসসি ইংরেজি ক্লাসরুম শিক্ষাদানকে করুন আধুনিক, নিখুঁত ও গতিশীল'
              : 'Empower Your HSC English Classroom with Smart Academic Tools'}
          </h1>

          <p className="text-xs sm:text-sm md:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
            {isBn
              ? 'এনসিটিবি পাঠ্যবইয়ের ১১টি ইউনিট ও ৪৫টি লেসনের সম্পূর্ণ শব্দার্থ ও প্রশ্নভাণ্ডার ব্যবহার করে শিক্ষার্থীদের নিয়মিত ক্লাসরুম টেস্ট, সাপ্তাহিক অ্যাসাইনমেন্ট ও প্রিন্টযোগ্য রিভিশন শিট তৈরি করুন।'
              : 'Equip your students with curriculum-aligned vocabulary practice, automated mistake tracking, and high-quality printable exam revision materials.'}
          </p>
        </div>

        {/* 4 Pillar Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {teacherFeatures.map((feat, idx) => {
            const Icon = feat.icon;
            return (
              <div
                key={idx}
                className="bg-[#101624] border border-[#1e293b] hover:border-cyan-500/40 rounded-3xl p-6 sm:p-7 shadow-xl transition-all space-y-3"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 flex items-center justify-center shrink-0 shadow-md">
                    <Icon size={22} />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white">
                    {isBn ? feat.titleBn : feat.titleEn}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed pl-1">
                  {isBn ? feat.descBn : feat.descEn}
                </p>
              </div>
            );
          })}
        </div>

        {/* Step-by-Step Classroom Guide */}
        <div className="bg-[#0e1420] border border-[#1b263b] rounded-3xl p-6 sm:p-8 space-y-6">
          <h2 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
            <CheckCircle2 size={20} className="text-emerald-400" />
            <span>{isBn ? 'শ্রেণিকক্ষে ব্যবহারের সহজ ধাপসমূহ' : 'Classroom Workflow for Teachers'}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="p-4 rounded-2xl bg-[#090d15] border border-[#172235] space-y-2">
              <span className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center font-mono">
                ১
              </span>
              <h4 className="font-bold text-white text-sm">
                {isBn ? 'ইউনিট ও লেসন নির্বাচন' : '1. Assign Lessons'}
              </h4>
              <p className="text-slate-400 leading-relaxed">
                {isBn
                  ? 'পাঠ্যবইয়ের সংশ্লিষ্ট লেসনটি ক্লাসে পড়ানোর পর শিক্ষার্থীদের Learner Hub থেকে ওই লেসনের এমসিকিউ অনুশীলন করতে বলুন।'
                  : 'Assign specific lessons under the NCTB syllabus for students to practice online or on mobile.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090d15] border border-[#172235] space-y-2">
              <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold flex items-center justify-center font-mono">
                ২
              </span>
              <h4 className="font-bold text-white text-sm">
                {isBn ? 'PDF শিট প্রিন্ট ও ক্লাস টেস্ট' : '2. Print Exam Sheets'}
              </h4>
              <p className="text-slate-400 leading-relaxed">
                {isBn
                  ? 'Vocabulary Bank থেকে ফিল্টার করে সরাসরি ৪-কলাম প্রিন্টযোগ্য শিট ডাউনলোড করুন এবং ক্লাসরুম মক টেস্ট নিন।'
                  : 'Download standardized 4-column sheets directly for physical pen-and-paper revision quizzes.'}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#090d15] border border-[#172235] space-y-2">
              <span className="w-6 h-6 rounded-lg bg-purple-500/20 text-purple-400 font-bold flex items-center justify-center font-mono">
                ৩
              </span>
              <h4 className="font-bold text-white text-sm">
                {isBn ? 'দুর্বল শব্দ পর্যালোচনা' : '3. Review Weak Words'}
              </h4>
              <p className="text-slate-400 leading-relaxed">
                {isBn
                  ? 'শিক্ষার্থীরা যেসব প্রশ্নে বারবার ভুল করে, তা Weak Words সেকশনে স্বয়ংক্রিয়ভাবে জমা থাকে, যা নিয়ে ক্লাসে বিশেষ আলোচনা করা যায়।'
                  : 'Address commonly missed vocabulary in class based on automated spaced repetition mistake tracking.'}
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#171f2e] bg-[#070a10] py-10 text-xs text-slate-400 text-center">
        <div className="max-w-7xl mx-auto px-4 space-y-4">
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium">
            <button onClick={() => onNavigate('/')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'মূল পাতা (Home)' : 'Home'}
            </button>
            <button onClick={() => onNavigate('/curriculum')} className="hover:text-emerald-400 transition-colors cursor-pointer">
              {isBn ? 'পাঠ্যক্রম (Curriculum)' : 'Curriculum'}
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
