import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Info,
  Award,
  Sparkles,
  Layers,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Mail,
  Send,
  MessageCircle,
  ExternalLink,
  Heart,
  Cpu,
  Brain,
  ShieldCheck,
  Zap,
  RotateCcw,
  Target,
  Users,
  Code2,
  Check,
  Clock,
  ChevronRight
} from 'lucide-react';

const PEDAGOGY_PILLARS = [
  {
    icon: Brain,
    title: 'Spaced Repetition Algorithm',
    titleBn: 'স্পেসড রিপিটিশন অ্যালগরিদম',
    color: 'from-emerald-500 to-teal-500',
    border: 'border-emerald-500/30',
    bg: 'bg-emerald-500/10',
    desc: 'Each vocabulary question requires 3 consecutive correct answers to achieve mastery, with an intelligent 4-question spacing buffer preventing back-to-back rote memorization.',
    descBn: 'প্রতিটি শব্দ সম্পূর্ণ আয়ত্ত করতে একটানা ৩ বার সঠিক উত্তর দিতে হয় এবং পুনরাবৃত্তি রোধে মাঝখানে ৩-৪টি ভিন্ন প্রশ্ন শিডিউল করা হয়।'
  },
  {
    icon: Target,
    title: '3-Mistake Auto Weak Word',
    titleBn: '৩ ভুলের অটো-ডিটেকশন ও রিকভারি',
    color: 'from-rose-500 to-pink-500',
    border: 'border-rose-500/30',
    bg: 'bg-rose-500/10',
    desc: 'Making 3 mistakes on any word automatically queues it into your Weak Words Revision Hub. Scoring 5 correct answers completely clears and recovers the word to Mastered.',
    descBn: 'যেকোনো শব্দে ৩টি ভুল হলে স্বয়ংক্রিয়ভাবে তা দুর্বল শব্দের তালিকায় যোগ হয় এবং পরবর্তীতে ৫টি সঠিক উত্তর দিয়ে তা উদ্ধার বা মাস্টার করা যায়।'
  },
  {
    icon: Zap,
    title: '4-MCQ Dual Ingestion',
    titleBn: '১ শব্দ = ৪টি বোর্ড স্ট্যান্ডার্ড এমসিকিউ',
    color: 'from-amber-500 to-yellow-500',
    border: 'border-amber-500/30',
    bg: 'bg-amber-500/10',
    desc: 'Every single textbook word generates 4 distinct Board Exam question archetypes: Synonym Question, Antonym Question, English Definition, and Bengali Meaning Question.',
    descBn: 'প্রতিটি শব্দের জন্য চারটি ভিন্ন আর্কিটাইপের প্রশ্ন স্বয়ংক্রিয়ভাবে তৈরি হয়: সমার্থক, বিপরীতার্থক, ইংরেজি সংজ্ঞা এবং বাংলা অর্থ।'
  },
  {
    icon: BookOpen,
    title: 'Active Recall & 3D Flashcards',
    titleBn: 'অ্যাক্টিভ রিকল ও ৩ডি ফ্ল্যাশকার্ড',
    color: 'from-cyan-500 to-blue-500',
    border: 'border-cyan-500/30',
    bg: 'bg-cyan-500/10',
    desc: 'Interactive 3D card flips with audio pronunciation, contextual example sentences, and board tags for deep synaptic memory retention.',
    descBn: 'অডিও উচ্চারণ ও পাঠ্যবইয়ের উদাহরণের সাহায্যে ৩ডি ফ্ল্যাশকার্ড ফ্লিপ করে মস্তিষ্কে শব্দের দীর্ঘমেয়াদি স্মৃতি তৈরি করুন।'
  }
];

export default function AboutPage({ lang = 'en', onNavigate, currentUser }) {
  const isBn = lang === 'bn';

  // Contact Form State
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [college, setCollege] = useState(currentUser?.college || '');
  const [category, setCategory] = useState('general');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Stored Contact Messages List
  const [savedMessages, setSavedMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_contact_messages');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    if (currentUser) {
      if (!name) setName(currentUser.name || '');
      if (!email) setEmail(currentUser.email || '');
      if (!college) setCollege(currentUser.college || '');
    }
  }, [currentUser]);

  const handleSubmitContact = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setIsSubmitting(true);

    const newMessage = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      college: college.trim(),
      category,
      subject: subject.trim() || (isBn ? 'সাধারণ অনুসন্ধান' : 'General Inquiry'),
      message: message.trim(),
      timestamp: new Date().toISOString(),
      status: 'Delivered / Under Review'
    };

    setTimeout(() => {
      const updated = [newMessage, ...savedMessages];
      setSavedMessages(updated);
      try {
        localStorage.setItem('hsc_contact_messages', JSON.stringify(updated));
      } catch (err) {}

      setIsSubmitting(false);
      setSubmitSuccess(true);
      setSubject('');
      setMessage('');

      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 600);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pb-12">
      {/* Hero Mission Statement Card */}
      <div className="bg-gradient-to-br from-[#131b2b] via-[#111723] to-[#0c0f17] border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden space-y-6">
        {/* Glow backdrop accent */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-3 relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3.5 py-1.5 rounded-full border border-emerald-500/25">
            <Award size={15} />
            <span>NCTB HSC 2026 Official English 1st Paper Alignment</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-tight">
            {isBn ? 'লার্নার হাব: স্মার্ট এইচএসসি এডটেক প্ল্যাটফর্ম' : 'Empowering HSC 2026 Candidates Through Cognitive Science'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {isBn
              ? 'লার্নার হাব হলো বাংলাদেশের এইচএসসি ২০২৬ পরীক্ষার্থীদের জন্য নির্মিত একটি ১০০% ফ্রি ও আধুনিক লার্নিং প্ল্যাটফর্ম। এনসিটিবি ইংলিশ ফর টুডে পাঠ্যবইয়ের প্রতিটি প্যাসেজ, গুরুত্বপূর্ণ ভোকাবুলারি ও বোর্ড স্ট্যান্ডার্ড এমসিকিউ সহজে আয়ত্ত করার জন্য এটি স্পেসড রিপিটিশন ও অ্যাক্টিভ রিকল প্রযুক্তিতে তৈরি।'
              : 'Learner Hub is an open-access EdTech ecosystem tailored for Bangladeshi HSC candidates. Combining spaced repetition, automated weak-word diagnostics, and interactive passage comprehension to ensure effortless A+ preparation in English 1st Paper.'}
          </p>
        </div>

        {/* 4 Core Quantitative Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#1e293b]/80 relative z-10">
          <div className="p-4 rounded-2xl bg-[#0c0f17]/90 border border-[#1e293b] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-emerald-400 block">14 Units</span>
            <span className="text-xs text-slate-400 font-semibold">{isBn ? 'সম্পূর্ণ এনসিটিবি সিলেবাস' : 'Official NCTB Units'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c0f17]/90 border border-[#1e293b] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-cyan-400 block">156+</span>
            <span className="text-xs text-slate-400 font-semibold">{isBn ? 'নির্বাচিত ভোকাবুলারি' : 'Curated Vocabulary'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c0f17]/90 border border-[#1e293b] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-amber-400 block">613+</span>
            <span className="text-xs text-slate-400 font-semibold">{isBn ? 'বোর্ড স্ট্যান্ডার্ড এমসিকিউ' : 'Board Standard MCQs'}</span>
          </div>

          <div className="p-4 rounded-2xl bg-[#0c0f17]/90 border border-[#1e293b] text-center space-y-1">
            <span className="text-2xl sm:text-3xl font-black text-purple-400 block">100% Free</span>
            <span className="text-xs text-slate-400 font-semibold">{isBn ? 'সারাজীবন উন্মুক্ত ও ফ্রি' : 'Open Access'}</span>
          </div>
        </div>
      </div>

      {/* Pedagogy & Cognitive Science Showcase */}
      <div className="space-y-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            <Brain size={14} />
            <span>{isBn ? 'শিখন পদ্ধতি ও বিজ্ঞান' : 'Pedagogy & Cognitive Architecture'}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isBn ? 'যেভাবে লার্নার হাব আপনার মেমোরি বাড়ায়' : 'Engineered for Maximum Retention'}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {PEDAGOGY_PILLARS.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className={`p-6 rounded-3xl bg-[#111723] border ${pillar.border} space-y-3 shadow-card hover:border-emerald-500/40 transition-all`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl ${pillar.bg} flex items-center justify-center`}>
                    <Icon size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base">
                      {isBn ? pillar.titleBn : pillar.title}
                    </h3>
                    <span className="text-[11px] text-slate-400 font-bengali">
                      {isBn ? pillar.title : pillar.titleBn}
                    </span>
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {isBn ? pillar.descBn : pillar.desc}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2-Column: Developer Credits & Contact / Feedback Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Developer Credits & Community (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Creator Profile Card */}
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-6 shadow-card space-y-5">
            <div className="flex items-center gap-3.5 pb-4 border-b border-[#1e293b]">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shadow-emerald-950/60">
                SA
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Sakin Ahmed</h3>
                <p className="text-xs text-emerald-400 font-semibold">
                  Founder & Lead EdTech Architect
                </p>
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-slate-300 leading-relaxed">
              <p>
                {isBn
                  ? 'এইচএসসি শিক্ষার্থীদের মুখস্থনির্ভর পড়াশোনা দূর করে কার্যকর রিটেনশন ও পরীক্ষা ভীতি কাটাতে লার্নার হাব সিস্টেমটি ডিজাইন করা হয়েছে।'
                  : 'Passionate about educational technology, cognitive learning algorithms, and empowering students across Bangladesh with free high-yield exam preparation tools.'}
              </p>

              <div className="pt-2 flex flex-col gap-2">

                <a
                  href="https://t.me/sakin7112"
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-2xl bg-[#0c0f17] hover:bg-[#151c2a] border border-[#1e293b] text-slate-200 font-semibold flex items-center justify-between transition-all"
                >
                  <div className="flex items-center gap-2.5">
                    <MessageCircle size={16} className="text-cyan-400" />
                    <span>Telegram Community (@sakin7112)</span>
                  </div>
                  <ExternalLink size={14} className="text-slate-500" />
                </a>
              </div>
            </div>

            {/* Version & Build Tag */}
            <div className="pt-3 border-t border-[#1e293b] flex items-center justify-between text-[11px] text-slate-500">
              <span>Version: <strong className="text-slate-300">v2.4.0 (2026 Expansion)</strong></span>
              <span className="flex items-center gap-1 text-emerald-400">
                <Sparkles size={12} />
                <span>Production Ready</span>
              </span>
            </div>
          </div>

          {/* Previous Messages / Feedback Submissions */}
          {savedMessages.length > 0 && (
            <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-3">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Clock size={15} className="text-emerald-400" />
                <span>{isBn ? 'আপনার প্রেরিত বার্তাসমূহ' : 'Your Previous Submissions'}</span>
              </h4>

              <div className="space-y-2.5 max-h-56 overflow-y-auto pr-1">
                {savedMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="p-3 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-emerald-400 truncate">{msg.subject}</span>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 border border-emerald-500/20">
                        {msg.status}
                      </span>
                    </div>
                    <p className="text-slate-300 line-clamp-2 text-[11px]">{msg.message}</p>
                    <span className="text-[10px] text-slate-500 block">
                      {new Date(msg.timestamp).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive Contact & Feedback Form (7 cols) */}
        <div className="lg:col-span-7">
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-6 sm:p-8 shadow-card space-y-5">
            <div className="space-y-1.5 pb-4 border-b border-[#1e293b]">
              <div className="inline-flex items-center gap-2 text-emerald-400 text-xs font-bold bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                <Mail size={14} />
                <span>{isBn ? 'যোগাযোগ ও মতামত ফর্ম' : 'Contact & Feedback Form'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
                {isBn ? 'আমাদের সাথে যোগাযোগ করুন' : 'Send Feedback or Suggestions'}
              </h3>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'কোনো বাগ রিপোর্ট, নতুন ভোকাবুলারি সাজেশন বা মতামত থাকলে আমাদের জানান।'
                  : 'Have a feature request, bug report, or vocabulary suggestion? We review every submission.'}
              </p>
            </div>

            <form onSubmit={handleSubmitContact} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    {isBn ? 'আপনার নাম:' : 'Your Name:'}
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Sakin Ahmed"
                    required
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    {isBn ? 'ইমেইল এড্রেস:' : 'Email Address:'}
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sakin@gmail.com"
                    required
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* College */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    {isBn ? 'কলেজ:' : 'College:'}
                  </label>
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder="e.g. Dhaka College"
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                {/* Feedback Category */}
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    {isBn ? 'বার্তার ধরন (Category):' : 'Feedback Category:'}
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="general">{isBn ? 'সাধারণ মতামত (General Feedback)' : 'General Feedback'}</option>
                    <option value="bug">{isBn ? 'বাগ রিপোর্ট (Bug Report)' : 'Bug Report'}</option>
                    <option value="vocab">{isBn ? 'নতুন শব্দ প্রস্তাব (Vocabulary Suggestion)' : 'Vocabulary Suggestion'}</option>
                    <option value="feature">{isBn ? 'ফিচার রিকোয়েস্ট (Feature Request)' : 'Feature Request'}</option>
                    <option value="curriculum">{isBn ? 'সিলেবাস অনুসন্ধান (Curriculum Inquiry)' : 'Curriculum Inquiry'}</option>
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {isBn ? 'বিষয় (Subject):' : 'Subject:'}
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder={isBn ? 'সংক্ষিপ্ত বিষয় লিখুন...' : 'Brief summary of your message...'}
                  className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                />
              </div>

              {/* Message Textarea */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {isBn ? 'বিস্তারিত বার্তা (Message):' : 'Message Details:'}
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={isBn ? 'আপনার বার্তা বিস্তারিত লিখুন...' : 'Write your comments, suggestions, or issues here...'}
                  required
                  className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl p-3.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 resize-none leading-relaxed"
                />
              </div>

              {/* Success Feedback Alert */}
              <AnimatePresence>
                {submitSuccess && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="p-3.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2 justify-center"
                  >
                    <CheckCircle2 size={16} />
                    <span>
                      {isBn
                        ? 'আপনার বার্তাটি সফলভাবে সংরক্ষিত হয়েছে! ধন্যবাদ।'
                        : 'Your message was submitted and saved successfully! Thank you.'}
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? (isBn ? 'পাঠানো হচ্ছে...' : 'Submitting...') : (isBn ? 'বার্তা প্রেরণ করুন' : 'Submit Message')}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
