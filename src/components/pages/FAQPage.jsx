import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  Search, 
  Sparkles, 
  ArrowLeft, 
  Globe2, 
  BookOpen, 
  CheckCircle2, 
  Layers, 
  FileText 
} from 'lucide-react';

export default function FAQPage({ lang = 'bn', onNavigate, onOpenAuth, currentUser }) {
  const [internalLang, setInternalLang] = useState(lang);
  const isBn = internalLang === 'bn';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openIdx, setOpenIdx] = useState(0);

  const categories = [
    { id: 'all', labelEn: 'All Questions', labelBn: 'সকল প্রশ্ন' },
    { id: 'spaced', labelEn: 'Spaced Repetition', labelBn: 'স্পেসড রিপিটিশন' },
    { id: 'mcq', labelEn: 'MCQ & Exam Engine', labelBn: 'এমসিকিউ ও পরীক্ষা' },
    { id: 'pdf', labelEn: 'PDF & Revision', labelBn: 'পিডিএফ ও রিভিশন শিট' },
    { id: 'nctb', labelEn: 'NCTB Syllabus', labelBn: 'এনসিটিবি পাঠ্যক্রম' }
  ];

  const faqs = [
    {
      category: 'spaced',
      qEn: 'How does the Spaced Repetition (SM-2) engine work?',
      qBn: 'স্পেসড-রিপিটিশন (Spaced Repetition) ইঞ্জিন কীভাবে কাজ করে?',
      aEn: 'When you take an MCQ test or flashcard drill, questions you answer correctly are marked as "Done". However, if you make a mistake or click "Not Sure", the algorithm re-queues that question every 3–4 items. If you make 3 mistakes on the same word, it is automatically marked as a "Weak Word". Answering it correctly 5 times removes it from weak words and flags it as Mastered.',
      aBn: 'কুইজ বা পরীক্ষার সময় আপনি কোনো প্রশ্নে ভুল করলে বা "Not sure" দিলে সিস্টেম সেটিকে তাৎক্ষণিকভাবে Mistake তালিকায় নেয় এবং পরবর্তী ৩-৪টি প্রশ্ন পরপর পুনরায় সামনে আনে। একই শব্দে ৩ বার ভুল করলে তা স্বয়ংক্রিয়ভাবে "Weak Word" হিসেবে সংরক্ষিত হয়। পরবর্তীতে ৫ বার সঠিক উত্তর দিলে তা সম্পূর্ণ আয়ত্ত (Mastered) হিসেবে গণ্য হয়।'
    },
    {
      category: 'mcq',
      qEn: 'What are the 4 question formats generated for every vocabulary word?',
      qBn: 'প্রতিটি শব্দের জন্য কোন ৪টি ফরম্যাটে প্রশ্ন তৈরি হয়?',
      aEn: 'Every textbook vocabulary word features 4 board-standard multiple-choice questions: (1) Synonym Question, (2) Antonym Question, (3) Concise English Definition Question, and (4) Authentic Bengali Meaning Question. Each question provides 4 realistic distractors and verbatim sentence context from the textbook.',
      aBn: 'পাঠ্যবইয়ের প্রতিটি শব্দের জন্য ৪টি পূর্ণাঙ্গ বোর্ড স্ট্যান্ডার্ড প্রশ্ন থাকে: (১) সমার্থক শব্দ (Synonym), (২) বিপরীতার্থক শব্দ (Antonym), (৩) ইংরেজি প্রমিত সংজ্ঞা (English Definition), এবং (৪) সঠিক বাংলা অর্থ (Bangla Meaning)। প্রতিটি প্রশ্নে ৪টি অপশন ও পাঠ্যবইয়ের বাক্য ব্যাখ্যা হিসেবে থাকে।'
    },
    {
      category: 'pdf',
      qEn: 'How do I generate and print the 4-Column PDF Revision Sheet?',
      qBn: '৪-কলামবিশিষ্ট PDF রিভিশন শিট কীভাবে তৈরি ও প্রিন্ট করব?',
      aEn: 'Go to the "Vocabulary Bank" or "Weak Words Hub" and click the "Print / Export PDF" button. A customization modal opens where you can personalize your Student Name, College Name, and HSC Batch. The system instantly formats a clean printable PDF sheet with colors and Bangla meanings.',
      aBn: 'Vocabulary Bank অথবা Weak Words সেকশনে গিয়ে "PDF মুদ্রণ ও প্রিন্ট" বাটনে ক্লিক করুন। একটি পপআপ আসবে যেখানে আপনি আপনার নাম, কলেজ ও এইচএসসি ব্যাচ লিখে সরাসরি ঝকঝকে কালার-কোডেড ৪-কলাম PDF শিট জেনারেট ও প্রিন্ট করতে পারবেন।'
    },
    {
      category: 'nctb',
      qEn: 'Is this content 100% aligned with the official NCTB English For Today textbook?',
      qBn: 'এটি কি জাতীয় শিক্ষাক্রম (NCTB) অনুমোদিত পাঠ্যবইয়ের সাথে হুবহু সামঞ্জস্যপূর্ণ?',
      aEn: 'Yes. All 858 words and 3,432 MCQs are sourced directly from the official NCTB HSC English First Paper textbook for 2025–2026 exam batches. Every single word has its authentic context sentence extracted from the respective lesson passage.',
      aBn: 'হ্যাঁ, সম্পূর্ণভাবে। প্ল্যাটফর্মের ৮৫৮টি শব্দ এবং ৩,৪৩২টি বোর্ড এমসিকিউ এইচএসসি ২০২৫-২০২৬ ব্যাচের অফিশিয়াল NCTB ইংরেজি প্রথম পত্র বইয়ের প্রতিটি প্যাসেজ থেকে সরাসরি সংকলিত। প্রতিটি শব্দের সাথে পাঠ্যবইয়ের হুবহু বাক্য যুক্ত রয়েছে।'
    },
    {
      category: 'mcq',
      qEn: 'Can I practice individual units and lessons separately?',
      qBn: 'আমি কি প্রতিটি ইউনিট ও লেসন আলাদাভাবে প্র্যাকটিস করতে পারব?',
      aEn: 'Absolutely. Use the "Unit & Lesson Exam Modal" or the "Textbook Reader" to pick any specific lesson (e.g. Unit 1 Lesson 1, Unit 2 Lesson 2, Unit 9 Lesson 4) and practice 10, 20, or all available questions for that exact lesson.',
      aBn: 'অবশ্যই। Unit & Lesson কুইজ মোডাল অথবা পাঠ্যবই রিডার থেকে যেকোনো নির্দিষ্ট ইউনিট ও লেসন (যেমন: ইউনিট ১ লেসন ১, ইউনিট ৯ লেসন ৪) সিলেক্ট করে ১০টি, ২০টি বা সকল প্রশ্নের সেট আলাদাভাবে পরীক্ষা দেওয়া যায়।'
    },
    {
      category: 'spaced',
      qEn: 'Where are my exam scores, weak words, and streak saved?',
      qBn: 'আমার পরীক্ষার স্কোর, দুর্বল শব্দ এবং স্ট্রিক কোথায় সংরক্ষিত হয়?',
      aEn: 'Your progress is stored securely in your browser LocalStorage and synchronized in real time with our cloud database whenever you are logged in. You can resume exams and view historical test performance anytime.',
      aBn: 'আপনার সকল স্কোর, দৈনিক স্ট্রিক ও দুর্বল শব্দ আপনার ডিভাইসে এবং ক্লাউড ডাটাবেজে স্বয়ংক্রিয়ভাবে সংরক্ষিত হয়। যেকোনো সময় লগইন করে আপনার অগ্রগতি ও লিডারবোর্ড র‍্যাঙ্ক দেখা যায়।'
    }
  ];

  const filteredFaqs = faqs.filter((item) => {
    const matchesCat = activeCategory === 'all' || item.category === activeCategory;
    if (!matchesCat) return false;
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase();
    return (
      item.qEn.toLowerCase().includes(query) ||
      item.qBn.toLowerCase().includes(query) ||
      item.aEn.toLowerCase().includes(query) ||
      item.aBn.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-[#0c0f17] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Header */}
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
                <span className="text-[10px] text-emerald-400 font-semibold">{isBn ? 'প্রশ্নোত্তর ও হেল্প সেন্টার' : 'FAQ & Help Center'}</span>
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
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14 space-y-8">
        {/* Title Hero */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            <HelpCircle size={14} />
            <span>{isBn ? 'সাধারণ জিজ্ঞাসা' : 'Frequently Asked Questions'}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {isBn ? 'আপনার প্রশ্নের সহজ ও সুস্পষ্ট সমাধান' : 'Clear Answers to Your Learning Queries'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto leading-relaxed">
            {isBn
              ? 'Learner Hub এর স্পেসড রিপিটিশন অ্যালগরিদম, প্রশ্নভাণ্ডার, পিডিএফ ডাউনলোড এবং অ্যাকাউন্টের কার্যপ্রণালী সংক্রান্ত প্রয়োজনীয় তথ্য।'
              : 'Everything you need to know about our spaced repetition engine, textbook MCQs, and printable PDF tools.'}
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isBn ? 'প্রশ্ন বা বিষয় খুঁজুন (যেমন: Spaced Repetition, PDF, Weak Words, NCTB)...' : 'Search questions (e.g. Spaced Repetition, PDF, Weak Words)...'}
            className="w-full pl-11 pr-4 py-3.5 rounded-2xl bg-[#111723] border border-[#1e293b] text-white placeholder-slate-500 text-xs sm:text-sm outline-none focus:border-emerald-500 shadow-xl transition-all"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((c) => (
            <button
              key={c.id}
              onClick={() => setActiveCategory(c.id)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeCategory === c.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/60 border border-emerald-400/50'
                  : 'bg-[#111723] hover:bg-[#161e2e] text-slate-400 hover:text-slate-200 border border-[#1e293b]'
              }`}
            >
              {isBn ? c.labelBn : c.labelEn}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className="space-y-3 pt-2">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIdx === idx;
            return (
              <div
                key={idx}
                className="bg-[#101624] border border-[#1e293b] rounded-2xl overflow-hidden shadow-lg transition-all"
              >
                <button
                  onClick={() => setOpenIdx(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-3 cursor-pointer hover:bg-[#141b2b] transition-colors"
                >
                  <span className="text-xs sm:text-sm md:text-base font-bold text-white flex items-center gap-2.5">
                    <span className="text-emerald-400">Q.</span>
                    <span>{isBn ? faq.qBn : faq.qEn}</span>
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-[#162033] flex items-center justify-center text-slate-400 shrink-0">
                    {isOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-[#182236]">
                        <p className="pl-6 border-l-2 border-emerald-500/40">
                          {isBn ? faq.aBn : faq.aEn}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}

          {filteredFaqs.length === 0 && (
            <div className="text-center py-10 bg-[#101624] border border-[#1e293b] rounded-2xl p-6 space-y-2">
              <p className="text-sm font-bold text-slate-300">
                {isBn ? 'কোনো ফলাফল পাওয়া যায়নি।' : 'No matching questions found.'}
              </p>
              <p className="text-xs text-slate-500">
                {isBn ? 'অন্য কোনো কীওয়ার্ড দিয়ে সার্চ করার চেষ্টা করুন।' : 'Try searching with different keywords.'}
              </p>
            </div>
          )}
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
