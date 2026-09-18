import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Scale,
  ShieldCheck,
  FileText,
  Lock,
  Award,
  AlertTriangle,
  Mail,
  Printer,
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Users,
  Globe2,
  ExternalLink
} from 'lucide-react';

export default function TermsPage({ lang = 'en', onNavigate }) {
  const isBn = lang === 'bn';
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (id) => {
    setExpandedSection((prev) => (prev === id ? null : id));
  };

  const handlePrint = () => {
    window.print();
  };

  const SECTIONS = [
    {
      id: 'eligibility',
      titleEn: '1. Eligibility & Account Registration',
      titleBn: '১. যোগ্যতা ও অ্যাকাউন্ট নিবন্ধন',
      icon: Users,
      summaryEn: 'Age guidelines, authentic student credentials, and account security.',
      summaryBn: 'বয়সসীমা, সঠিক তথ্যের ব্যবহার এবং অ্যাকাউন্টের গোপনীয়তা রক্ষা।',
      contentEn: [
        '1.1. **Target Audience & Age Guidelines:** This educational platform is primarily designed for Higher Secondary Certificate (HSC), SSC, College, and University Admission test candidates in Bangladesh and worldwide learners. Students under the age of 18 represent that they have obtained guardian consent to use this digital learning aid.',
        '1.2. **Accurate Profile Information:** When creating an account (via Google OAuth or Email registration), you agree to provide authentic and accurate details (Name, College / Educational Institution, HSC Batch, and Contact Email).',
        '1.3. **Credential Confidentiality:** You are solely responsible for safeguarding your login credentials. Any activity, exam submissions, or points earned under your authenticated session are deemed your responsibility. Notify support immediately if unauthorized access is suspected.'
      ],
      contentBn: [
        '১.১. **লক্ষ্য শিক্ষার্থী ও বয়সসীমা:** এই প্ল্যাটফর্মটি মূলত বাংলাদেশের এইচএসসি (HSC), এসএসসি (SSC), কলেজ ও বিশ্ববিদ্যালয় ভর্তি পরীক্ষার্থীদের জন্য প্রস্তুতকৃত। ১৮ বছরের কম বয়সী শিক্ষার্থীদের ক্ষেত্রে অভিভাবকের সম্মতিক্রমে ওয়েবসাইট ব্যবহারের পরামর্শ দেওয়া হয়।',
        '১.২. **সঠিক তথ্যের নিশ্চয়তা:** অ্যাকাউন্ট তৈরির সময় (গুগল সাইন-ইন বা ইমেইল) শিক্ষার্থীকে তার সঠিক নাম, কলেজ বা শিক্ষা প্রতিষ্ঠান, এইচএসসি ব্যাচ এবং ইমেইল ঠিকানা প্রদান করতে হবে।',
        '১.৩. **লগইন তথ্যের নিরাপত্তা:** আপনার অ্যাকাউন্টের গোপনীয়তা রক্ষার দায়িত্ব সম্পূর্ণ আপনার। আপনার অ্যাকাউন্ট থেকে সম্পন্ন হওয়া কুইজ ও পরীক্ষার স্কোরের দায়ভার আপনার। কোনো অস্বাভাবিক গতিবিধি দেখলে অবিলম্বে আমাদের সাপোর্ট টিমকে অবহিত করুন।'
      ]
    },
    {
      id: 'ipr',
      titleEn: '2. Intellectual Property & NCTB Educational Fair Use',
      titleBn: '২. মেধাস্বত্ব ও এনসিটিবি শিক্ষামূলক ফেয়ার-ইউজ',
      icon: BookOpen,
      summaryEn: 'Proprietary software rights, algorithm protection, and fair-use reference.',
      summaryBn: 'সফটওয়্যার কোডের মালিকানা, অ্যালগরিদম সুরক্ষা ও পাঠ্যবই রেফারেন্সের আইনি পরিধি।',
      contentEn: [
        '2.1. **Platform Intellectual Property:** All software code, user interface designs, algorithmic spaced-repetition logic, interactive flashcard architectures, automated MCQ generation engines, and branding assets belong exclusively to this platform.',
        '2.2. **NCTB Curriculum Fair Use Disclaimer:** References to National Curriculum and Textbook Board (NCTB) English First Paper passages, vocabulary, and units are strictly utilized under international and Bangladeshi Educational Fair-Use doctrines for non-commercial educational instruction, vocabulary enhancement, and exam preparedness.',
        '2.3. **Strict Restrictions:** Users, scrapers, and third-party commercial entities are strictly prohibited from copying, decompiling, mass-scraping, reproducing, or commercially reselling our question databases and platform software.'
      ],
      contentBn: [
        '২.১. **প্ল্যাটফর্মের মেধাস্বত্ব:** ওয়েবসাইটের সকল সোর্স কোড, ইন্টারফেস ডিজাইন, স্পেসড রিপিটিশন অ্যালগরিদম, ৩ডি ফ্ল্যাশকার্ড আর্কিটেকচার এবং স্বয়ংক্রিয় MCQ ইঞ্জিন এই প্ল্যাটফর্মের নিজস্ব বুদ্ধিবৃত্তিক সম্পদ।',
        '২.২. **এনসিটিবি পাঠ্যবই ফেয়ার-ইউজ:** জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (NCTB)-এর ইংরেজি প্রথম পত্র পাঠ্যবইয়ের প্যাসেজ ও শব্দার্থের রেফারেন্সসমূহ সম্পূর্ণভাবে শিক্ষামূলক "Fair Use" নীতির আওতায় শিক্ষার্থীদের ভাষা দক্ষতা ও পরীক্ষার প্রস্তুতির উদ্দেশ্যে ব্যবহৃত হয়েছে।',
        '২.৩. **অননুমোদিত ব্যবহার নিষিদ্ধ:** কোনো ব্যক্তি বা বাণিজ্যিক প্রতিষ্ঠান আমাদের প্রশ্নব্যাংক, অ্যালগরিদম বা সফটওয়্যার কোড অনুমতি ছাড়া কপি, স্ক্র্যাপ, রিভার্স-ইঞ্জিনিয়ার বা বিক্রি করতে পারবে না।'
      ]
    },
    {
      id: 'fairplay',
      titleEn: '3. Fair Play & National Leaderboard Integrity',
      titleBn: '৩. কুইজ সততা ও জাতীয় লিডারবোর্ড নীতি',
      icon: Award,
      summaryEn: 'No botting, no automated script exploitation, zero cheating tolerance.',
      summaryBn: 'বট ও স্ক্রিপ্ট ব্যবহার নিষিদ্ধ, কুইজে নকল রোধ এবং লিডারবোর্ডের স্বচ্ছতা রক্ষা।',
      contentEn: [
        '3.1. **Integrity of Scores & Streaks:** Every point (XP), streak day, and accuracy percentage earned on the platform must be achieved through authentic human practice and examination completion.',
        '3.2. **Prohibited Activities:** The use of automated browser scripts, network interceptors, bots, rapid automated answer submitters, or multi-account point farming is strictly prohibited.',
        '3.3. **Disciplinary Actions:** Master Admin reserves the right to audit suspicious test times (e.g. 50 questions answered in 2 seconds) and immediately reset fraudulent XP, disqualify from leaderboard ranks, or permanently ban offending accounts without prior warning.'
      ],
      contentBn: [
        '৩.১. **পয়েন্ট ও স্কোরের সততা:** প্ল্যাটফর্মে অর্জিত সকল XP পয়েন্ট, ডেইলি স্ট্রিক ও লিডারবোর্ড র‍্যাঙ্ক অবশ্যই শিক্ষার্থীর নিজস্ব মেধা ও অনুশীলনের মাধ্যমে অর্জিত হতে হবে।',
        '৩.২. **নিষিদ্ধ কার্যক্রম:** কোনো প্রকার স্বয়ংক্রিয় স্ক্রিপ্ট, বট, হ্যাকিং টুল বা একাধিক ভুয়া অ্যাকাউন্ট তৈরি করে পয়েন্ট বাড়ানোর চেষ্টা কঠোরভাবে নিষিদ্ধ।',
        '৩.৩. **শাস্তিমূলক ব্যবস্থা:** অস্বাভাবিক স্কোর বা জালিয়াতি পরিলক্ষিত হলে মাস্টার অ্যাডমিন যেকোনো সময় তদন্ত সাপেক্ষে সংশ্লিষ্ট অ্যাকাউন্টের পয়েন্ট রিসেট, লিডারবোর্ড থেকে বহিষ্কার বা স্থায়ীভাবে অ্যাকাউন্ট ব্যান করার পূর্ণ অধিকার সংরক্ষণ করেন।'
      ]
    },
    {
      id: 'privacy',
      titleEn: '4. Student Privacy & Data Security (Cyber Law & GDPR)',
      titleBn: '৪. শিক্ষার্থী তথ্য সুরক্ষা ও গোপনীয়তা (সাইবার আইন ও জিডিপিআর)',
      icon: Lock,
      summaryEn: 'Zero data reselling, encrypted storage, and right to account deletion.',
      summaryBn: 'তথ্য বিক্রি না করার নিশ্চয়তা, এনক্রিপ্টেড ডাটাবেজ এবং ডাটা ডিলিট করার পূর্ণ অধিকার।',
      contentEn: [
        '4.1. **Compliance with Bangladesh ICT Act 2006 & Cyber Security Act 2023:** We enforce robust data protection standards to safeguard student records, encrypted passwords, and exam performance histories.',
        '4.2. **Zero Third-Party Commercial Reselling:** We will NEVER sell, rent, or trade student personal data, college info, or contact numbers to advertising networks, third-party coaching centers, or data brokers.',
        '4.3. **GDPR Right to Erasure / Account Deletion:** Every student possesses the legal right to request complete deletion of their account profile, exam logs, and weak-word history at any time.'
      ],
      contentBn: [
        '৪.১. **বাংলাদেশ আইসিটি আইন ২০০৬ ও সাইবার নিরাপত্তা আইন ২০২৩ অনুগত:** শিক্ষার্থীদের সকল তথ্য, এনক্রিপ্টেড পাসওয়ার্ড এবং পরীক্ষার ফলাফল সর্বোচ্চ ডিজিটাল নিরাপত্তায় সংরক্ষিত থাকে।',
        '৪.২. **তথ্য বিক্রি না করার অঙ্গীকার:** আমরা কোনো অবস্থাতেই শিক্ষার্থীদের ব্যক্তিগত তথ্য, ফোন নম্বর বা ইমেইল কোনো তৃতীয় পক্ষের বিজ্ঞাপনদাতা বা কোচিং সেন্টারের কাছে বিক্রি বা হস্তান্তর করি না।',
        '৪.৩. **তথ্য মুছে ফেলার অধিকার (GDPR):** যেকোনো শিক্ষার্থী চাইলে যেকোনো সময় তার সম্পূর্ণ অ্যাকাউন্ট এবং পরীক্ষার ইতিহাস স্থায়ীভাবে মুছে ফেলার জন্য অনুরোধ করতে পারেন।'
      ]
    },
    {
      id: 'disclaimer',
      titleEn: '5. Educational Disclaimer & Limitation of Liability',
      titleBn: '৫. শিক্ষামূলক ডিসক্লেইমার ও দায়বদ্ধতার সীমা',
      icon: AlertTriangle,
      summaryEn: 'Independent study tool, board examination outcome disclaimer.',
      summaryBn: 'স্বাধীন ডিজিটাল অনুশীলন মাধ্যম এবং বোর্ড পরীক্ষার ফলাফল সম্পর্কিত সুস্পষ্ট বার্তা।',
      contentEn: [
        '5.1. **Educational Study Aid:** This platform is an independent digital learning and revision aid. While our database is built with rigorous NCTB textbook alignment and board exam standards, individual examination grades ultimately depend on personal student effort, comprehensive syllabus coverage, and board examiners.',
        '5.2. **System Availability:** We maintain high cloud server uptime. However, we are not liable for temporary service delays resulting from public internet failures, mobile network fluctuations, or scheduled infrastructure upgrades.'
      ],
      contentBn: [
        '৫.১. **সহায়ক ডিজিটাল মাধ্যম:** এই প্ল্যাটফর্মটি একটি সহায়ক অনুশীলন মাধ্যম। পাঠ্যবই ও বিগত বোর্ড পরীক্ষার প্রশ্নের সাথে শতভাগ সামঞ্জস্য রেখে প্রশ্ন তৈরি করা হলেও চূড়ান্ত পরীক্ষার ফলাফল শিক্ষার্থীর সামগ্রিক প্রস্তুতি ও প্রচেষ্টার ওপর নির্ভরশীল।',
        '৫.২. **সার্ভার প্রাপ্যতা:** সার্বক্ষণিক সেবা সচল রাখার সর্বোচ্চ চেষ্টা করা হলেও ইন্টারনেট সংযোগের ত্রুটি বা সার্ভার রক্ষণাবেক্ষণজনিত সাময়িক বাধার জন্য প্ল্যাটফর্ম দায়ী থাকবে না।'
      ]
    },
    {
      id: 'governing',
      titleEn: '6. Governing Law & Legal Jurisdiction',
      titleBn: '৬. প্রযোজ্য আইন ও বিচারিক এখতিয়ার',
      icon: Scale,
      summaryEn: 'Governed by the laws of the People\'s Republic of Bangladesh.',
      summaryBn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান ও ডিজিটাল আইন দ্বারা পরিচালিত।',
      contentEn: [
        '6.1. **Jurisdiction:** These Terms and Conditions shall be governed by, interpreted, and enforced in accordance with the laws of the **People\'s Republic of Bangladesh**.',
        '6.2. **Dispute Resolution:** Any dispute or legal question arising in connection with the use of this website shall be resolved primarily through mutual amicable discussion, and failing that, submitted to the jurisdiction of the civil and cyber tribunals located in **Dhaka, Bangladesh**.'
      ],
      contentBn: [
        '৬.১. **আইনি এখতিয়ার:** এই শর্তাবলী **গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন** দ্বারা পরিচালিত ও নিয়ন্ত্রিত হবে।',
        '৬.২. **বিরোধ নিষ্পত্তি:** ওয়েবসাইট ব্যবহার সংক্রান্ত যেকোনো আইনগত বিরোধ বা জিজ্ঞাসা প্রাথমিকভাবে পারস্পরিক আলোচনার মাধ্যমে এবং প্রয়োজনে **ঢাকা, বাংলাদেশ**-এর উপযুক্ত আদালতের এখতিয়ারে নিষ্পত্তি হবে।'
      ]
    }
  ];

  const filteredSections = SECTIONS.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      sec.titleEn.toLowerCase().includes(q) ||
      sec.titleBn.toLowerCase().includes(q) ||
      sec.summaryEn.toLowerCase().includes(q) ||
      sec.summaryBn.toLowerCase().includes(q)
    );
  });

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-28 font-sans">
      {/* 1. Hero Header Banner */}
      <div className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#121827] via-[#101522] to-[#0c0f17] border border-[#1e293b] shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 h-72 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-60 h-60 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 flex items-center gap-1.5 shadow-sm">
              <Scale size={14} className="text-emerald-400" />
              <span>{isBn ? 'আইনি নীতিমালা ও শর্তাবলী' : 'Legal Terms of Service'}</span>
            </span>
            <span className="flex items-center gap-1.5 text-[11px] font-bold text-teal-300 bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-500/30">
              <ShieldCheck size={13} className="text-teal-400" />
              <span>{isBn ? 'বাংলাদেশ আইসিটি আইন ২০০৬ ও সাইবার সিকিউরিটি আইন ২০২৩ অনুগত' : 'Compliant with BD ICT Act & Cyber Law'}</span>
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            {isBn ? 'ব্যবহারের শর্তাবলী ও প্রাতিষ্ঠানিক নীতিমালা' : 'Terms & Conditions of Service'}
          </h1>

          <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
            {isBn
              ? 'আমাদের প্ল্যাটফর্ম ব্যবহারের পূর্বে অনুগ্রহ করে এই শর্তাবলী মনোযোগ সহকারে পড়ুন। শিক্ষার্থী সুরক্ষা, ন্যায্য লিডারবোর্ড প্রতিযোগিতা এবং মেধাস্বত্ব সুরক্ষায় আমরা প্রতিশ্রুতিবদ্ধ।'
              : 'Please read these terms carefully before accessing or using our educational platform. By creating an account or practicing on our platform, you agree to comply with all ethical and legal standards.'}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-4 text-xs font-semibold text-slate-400 border-t border-[#1e293b]">
            <span className="flex items-center gap-1.5 text-slate-300">
              <FileText size={14} className="text-emerald-400" />
              <span>{isBn ? 'সর্বশেষ হালনাগাদ: সেপ্টেম্বর ২০২৬' : 'Last Updated: September 2026'}</span>
            </span>
            <span className="text-slate-600">•</span>
            <span className="flex items-center gap-1.5 text-slate-300">
              <Globe2 size={14} className="text-teal-400" />
              <span>{isBn ? 'এখতিয়ার: ঢাকা, বাংলাদেশ' : 'Jurisdiction: Dhaka, Bangladesh'}</span>
            </span>
            <span className="text-slate-600">•</span>
            <button
              onClick={handlePrint}
              className="ml-auto px-3 py-1.5 rounded-xl bg-[#162033] hover:bg-[#1f2c45] border border-[#283854] text-slate-200 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer text-xs font-bold"
            >
              <Printer size={13} />
              <span>{isBn ? 'প্রিন্ট / সেভ করুন' : 'Print Document'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Legal Pillars Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          {
            icon: ShieldCheck,
            titleEn: '100% Fair Play',
            titleBn: '১০০% ন্যায্য প্রতিযোগিতা',
            descEn: 'Zero tolerance for automated scripts, bots, or fake leaderboard gaming.',
            descBn: 'লিডারবোর্ডে বট ও স্ক্রিপ্টের ব্যবহার সম্পূর্ণ নিষিদ্ধ ও প্রতিরোধযোগ্য।',
            color: 'from-emerald-500 to-teal-500'
          },
          {
            icon: Lock,
            titleEn: 'Student Privacy Guaranteed',
            titleBn: 'শিক্ষার্থীর তথ্য শতভাগ নিরাপদ',
            descEn: 'Zero commercial data reselling. Complete GDPR right to data erasure.',
            descBn: 'কোনো বিজ্ঞাপনদাতার কাছে তথ্য বিক্রি করা হয় না। সম্পূর্ণ নিরাপদ ডাটাবেজ।',
            color: 'from-cyan-500 to-blue-500'
          },
          {
            icon: BookOpen,
            titleEn: 'NCTB Educational Fair Use',
            titleBn: 'এনসিটিবি শিক্ষামূলক ফেয়ার-ইউজ',
            descEn: 'Proprietary questions aligned with authentic national curriculum context.',
            descBn: 'বোর্ড স্ট্যান্ডার্ড প্রশ্ন ও স্পেসড রিপিটিশন অ্যালগরিদম দ্বারা সুরক্ষিত।',
            color: 'from-purple-500 to-indigo-500'
          }
        ].map((pillar, idx) => {
          const Icon = pillar.icon;
          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#111723] border border-[#1e293b] shadow-card space-y-2"
            >
              <div className="flex items-center gap-3">
                <div className={`w-9 h-9 rounded-xl bg-gradient-to-tr ${pillar.color} flex items-center justify-center text-slate-950 font-black shadow-md shrink-0`}>
                  <Icon size={18} className="text-slate-950" />
                </div>
                <h3 className="text-sm font-bold text-white">
                  {isBn ? pillar.titleBn : pillar.titleEn}
                </h3>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed pl-12">
                {isBn ? pillar.descBn : pillar.descEn}
              </p>
            </div>
          );
        })}
      </div>

      {/* 3. Search Within Legal Terms */}
      <div className="relative">
        <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={isBn ? 'শর্তাবলীর মধ্যে খুঁজুন (যেমন: লিডারবোর্ড, ফেয়ার ইউজ, গোপনীয়তা)...' : 'Search within terms (e.g. Leaderboard, Fair use, Privacy)...'}
          className="w-full pl-11 pr-4 py-3 rounded-2xl bg-[#111723] border border-[#1e293b] text-slate-200 placeholder-slate-500 text-xs sm:text-sm outline-none focus:border-emerald-500 shadow-card transition-all"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-white cursor-pointer"
          >
            Clear
          </button>
        )}
      </div>

      {/* 4. Interactive Accordion Legal Clauses */}
      <div className="space-y-4">
        {filteredSections.map((section) => {
          const isExpanded = expandedSection === section.id || searchQuery.trim().length > 0;
          const Icon = section.icon;

          return (
            <motion.div
              key={section.id}
              layout
              className="rounded-3xl bg-[#111723] border border-[#1e293b] shadow-card overflow-hidden transition-all duration-300 hover:border-slate-600/80"
            >
              {/* Header Accordion Button */}
              <button
                onClick={() => toggleSection(section.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 cursor-pointer select-none transition-colors hover:bg-[#151c2c]"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 flex items-center justify-center shrink-0">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                      {isBn ? section.titleBn : section.titleEn}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isBn ? section.summaryBn : section.summaryEn}
                    </p>
                  </div>
                </div>

                <div className="w-8 h-8 rounded-lg bg-[#162033] border border-[#232f45] flex items-center justify-center text-slate-300 shrink-0">
                  {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
              </button>

              {/* Collapsible Content Body */}
              <AnimatePresence initial={false}>
                {isExpanded && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="border-t border-[#1e293b] px-5 sm:px-8 py-6 bg-[#0c101a] space-y-4 text-xs sm:text-sm text-slate-300 leading-relaxed"
                  >
                    {(isBn ? section.contentBn : section.contentEn).map((para, pIdx) => {
                      const parts = para.split(/(\*\*.*?\*\*)/g);
                      return (
                        <p key={pIdx} className="space-y-1">
                          {parts.map((part, i) => {
                            if (part.startsWith('**') && part.endsWith('**')) {
                              return (
                                <strong key={i} className="text-white font-bold">
                                  {part.slice(2, -2)}
                                </strong>
                              );
                            }
                            return <span key={i}>{part}</span>;
                          })}
                        </p>
                      );
                    })}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      {/* 5. Legal Contact & Grievance Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#121827] to-[#0d121c] border border-emerald-500/30 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-1 text-center sm:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
            {isBn ? 'আইনি ও কপিরাইট সহায়তা' : 'Legal & Compliance Desk'}
          </span>
          <h3 className="text-lg sm:text-xl font-extrabold text-white">
            {isBn ? 'কোনো আইনি জিজ্ঞাসা বা পরামর্শ রয়েছে?' : 'Have Legal or Privacy Questions?'}
          </h3>
          <p className="text-xs text-slate-400 max-w-xl">
            {isBn
              ? 'শর্তাবলী বা ডাটা ডিলিশন সংক্রান্ত যেকোনো বিষয়ে আমাদের আইনি দলের সাথে সরাসরি যোগাযোগ করতে পারেন।'
              : 'Our legal and compliance team is available to assist with student privacy, copyright clarifications, or terms inquiries.'}
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate('/about')}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold shadow-lg shadow-emerald-950/50 flex items-center gap-1.5 transition-all cursor-pointer active:scale-95"
          >
            <span>{isBn ? 'যোগাযোগ পেজ' : 'Contact Support'}</span>
            <ExternalLink size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
