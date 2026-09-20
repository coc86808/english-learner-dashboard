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
  ChevronDown,
  ChevronUp,
  Search,
  BookOpen,
  Users,
  Globe2,
  ExternalLink,
  Cookie,
  HeartHandshake,
  RotateCcw,
  AlertCircle,
  X,
  ArrowLeft
} from 'lucide-react';

export default function TermsPage({ lang: initialLang = 'en', onNavigate, initialSection = null, currentUser, onOpenAuth }) {
  const [internalLang, setInternalLang] = useState(() => {
    try {
      return localStorage.getItem('hsc_language') || initialLang;
    } catch (e) {
      return initialLang;
    }
  });
  const isBn = internalLang === 'bn';
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedSection, setExpandedSection] = useState(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('section')) return urlParams.get('section');
      if (window.location.hash) return window.location.hash.replace('#', '');
    }
    return initialSection || null;
  });
  const [showRefundModal, setShowRefundModal] = useState(false);

  const toggleSection = (id) => {
    setExpandedSection((prev) => (prev === id ? null : id));
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
        '4.3. **GDPR Right to Erasure / Account Deletion:** Every student possesses the legal right to request complete deletion of their account profile, exam logs, and weak-word history at any time.',
        '4.4. **Third-Party Service Providers for Service Quality & Cloud Reliability:** To enhance service quality and cloud reliability, necessary operational data may be shared with trusted third-party service providers under strict data protection and confidentiality standards. This data is utilized solely for technical reliability and platform uptime, and will never be sold, leased, or disclosed to advertisers or external commercial entities.'
      ],
      contentBn: [
        '৪.১. **বাংলাদেশ আইসিটি আইন ২০০৬ ও সাইবার নিরাপত্তা আইন ২০২৩ অনুগত:** শিক্ষার্থীদের সকল তথ্য, এনক্রিপ্টেড পাসওয়ার্ড এবং পরীক্ষার ফলাফল সর্বোচ্চ ডিজিটাল নিরাপত্তায় সংরক্ষিত থাকে।',
        '৪.২. **তথ্য বিক্রি না করার অঙ্গীকার:** আমরা কোনো অবস্থাতেই শিক্ষার্থীদের ব্যক্তিগত তথ্য, ফোন নম্বর বা ইমেইল কোনো তৃতীয় পক্ষের বিজ্ঞাপনদাতা বা কোচিং সেন্টারের কাছে বিক্রি বা হস্তান্তর করি না।',
        '৪.৩. **তথ্য মুছে ফেলার অধিকার (GDPR):** যেকোনো শিক্ষার্থী চাইলে যেকোনো সময় তার সম্পূর্ণ অ্যাকাউন্ট এবং পরীক্ষার ইতিহাস স্থায়ীভাবে মুছে ফেলার জন্য অনুরোধ করতে পারেন।',
        '৪.৪. **সেবার গুণমান ও ক্লাউড নির্ভরযোগ্যতা (Third-Party Service Providers):** সেবার গুণমান ও ক্লাউড নির্ভরযোগ্যতা বৃদ্ধির জন্য বিশ্বস্ত থার্ড-পার্টি সার্ভিস প্রোভাইডারদের সাথে প্রয়োজনীয় ডাটা শেয়ার সংক্রান্ত আইনি ধারা কার্যকর থাকবে। উন্নত সেবা প্রদান ও ক্লাউড সিস্টেম সচল রাখার স্বার্থে প্রয়োজনীয় প্রযুক্তিগত তথ্য কেবল বিশ্বস্ত থার্ড-পার্টির সাথে সর্বোচ্চ গোপনীয়তায় আদান-প্রদান করা হতে পারে। এই ডাটা কোনো অবস্থাতেই কোনো বিজ্ঞাপনদাতা বা বাণিজ্যিক সংস্থার কাছে হস্তান্তর বা বিক্রি করা হয় না।'
      ]
    },
    {
      id: 'cookies',
      titleEn: '5. Cookie Usage & Browsing Consent',
      titleBn: '৫. কুকিজ ব্যবহার ও ব্রাউজিং সম্মতি',
      icon: Cookie,
      summaryEn: 'Automatic cookie & local storage consent granted by browsing this website.',
      summaryBn: 'ওয়েবসাইট ব্রাউজ করার মাধ্যমে স্বয়ংক্রিয়ভাবে প্রয়োজনীয় কুকিজ ব্যবহারের অনুমতি ও সম্মতি।',
      contentEn: [
        '5.1. **Implied Consent by Browsing:** By accessing, browsing, interacting with, or continuing to use this website, you explicitly acknowledge, agree, and grant us full legal consent to use essential cookies, browser storage (LocalStorage & SessionStorage), and cached tokens on your device.',
        '5.2. **Purpose of Cookies & Storage:** Cookies and storage are strictly utilized to deliver an optimal, frictionless educational experience: securely maintaining your active student login session, remembering your selected interface language (বাংলা / English), preserving your theme and font preferences, tracking test timers during mock exams, calculating daily learning streaks, and powering the Spaced Repetition engine by safely saving your weak vocabulary words.',
        '5.3. **Zero Third-Party Advertising Trackers:** We respect student privacy. We do NOT use intrusive third-party commercial advertising cookies, behavioral trackers, or data-broker profiling scripts. All cookies are purely functional and internal to your HSC learning dashboard.',
        '5.4. **Managing Cookie Settings:** You may inspect, block, or clear cookies and local browser storage through your web browser preferences at any time. Please note that disabling essential cookies or local storage may disable persistent login, offline flashcard caching, or active exam state preservation.'
      ],
      contentBn: [
        '৫.১. **ব্রাউজিংয়ের মাধ্যমে স্পষ্ট সম্মতি:** আমাদের ওয়েবসাইট প্রবেশ, ব্রাউজ বা যেকোনোভাবে ব্যবহার করার মাধ্যমে আপনি সুস্পষ্টভাবে স্বীকার ও সম্মতি দিচ্ছেন যে, আপনি আমাদেরকে আপনার ডিভাইসে প্রয়োজনীয় কুকিজ (Cookies) এবং ব্রাউজার লোকাল স্টোরেজ (LocalStorage ও SessionStorage) ব্যবহারের পূর্ণ অনুমতি প্রদান করেছেন।',
        '৫.২. **কুকিজ ব্যবহারের উদ্দেশ্য:** এই কুকিজ ও লোকাল স্টোরেজ সম্পূর্ণভাবে শিক্ষার্থীবান্ধব ও কারিগরি কারণে ব্যবহৃত হয়: আপনার লগইন সেশন সুরক্ষিত রাখা, পছন্দের ভাষা (বাংলা/English) ও ফন্ট সাইজ মনে রাখা, পরীক্ষার সময় লাইভ টাইমার পরিচালনা করা, দৈনিক স্ট্রিক হিসাব করা এবং স্পেসড রিপিটিশন অ্যালগরিদমের মাধ্যমে দুর্বল শব্দসমূহ ডিভাইসে সংরক্ষণ করা।',
        '৫.৩. **বিজ্ঞাপনমুক্ত ও ব্যক্তিগত তথ্যের সুরক্ষা:** আমরা কোনো প্রকার তৃতীয় পক্ষের বাণিজ্যিক বিজ্ঞাপন ট্র্যাকার বা ডাটা-ব্রোকার কুকিজ ব্যবহার করি না। সংরক্ষিত সকল কুকিজ কেবলমাত্র প্ল্যাটফর্মের গতি ও কার্যক্ষমতা বৃদ্ধির জন্য নিবেদিত।',
        '৫.৪. **কুকিজ নিয়ন্ত্রণ ও মুছে ফেলা:** আপনি চাইলে যেকোনো সময় আপনার ব্রাউজারের সেটিংস থেকে কুকিজ ও লোকাল ডাটা মুছে ফেলতে বা নিয়ন্ত্রণ করতে পারেন। তবে প্রয়োজনীয় কুকিজ বা স্টোরেজ বন্ধ রাখলে স্বয়ংক্রিয় লগইন বা পরীক্ষার টাইমার সংক্রান্ত কিছু ফিচার সাময়িকভাবে ব্যাহত হতে পারে।'
      ]
    },
    {
      id: 'refund',
      titleEn: '6. Premium Membership & Non-Refundable Policy',
      titleBn: '৬. প্রিমিয়াম মেম্বারশিপ ও রিফান্ড নীতিমালা (Refund Policy)',
      icon: HeartHandshake,
      summaryEn: 'Digital service terms, immediate access delivery, and non-refundable policy statement.',
      summaryBn: 'ডিজিটাল শিক্ষামূলক সেবার নিয়মাবলী, তাৎক্ষণিক আনলক এবং রিফান্ড পলিসি সংক্রান্ত নির্দেশনা।',
      contentEn: [
        '6.1. **Instant Digital Access Delivery:** All paid packages, premium diagnostic exam modules, full-length NCTB mock question banks, audio-enabled passage readers, and algorithmic spaced-repetition vocabulary tools are strictly digital intangible goods. Access to all features is provisioned and unlocked immediately upon account authentication or upgrade.',
        '6.2. **Strict Non-Refundable Policy:** Due to the instant delivery and digital nature of our educational software, study materials, and cloud computing resources, **all purchases and subscription fees are strictly non-refundable**. We do not offer cash refunds, partial credits, or payment reversals once an account has gained access to the platform.',
        '6.3. **Refund Option Notice & Heartfelt Apology:** We are truly and sincerely sorry, but there is no refund option available from our end. We express our deepest regret and apologies that after taking premium from us, you felt the need to visit this refund option. We strive for 100% student satisfaction, and if you have encountered any technical issue or study impediment, our academic support team is committed to assisting and resolving it for you immediately.'
      ],
      contentBn: [
        '৬.১. **ডিজিটাল সেবার তাৎক্ষণিক অ্যাক্টিভেশন:** আমাদের সকল প্রিমিয়াম কোর্স, পূর্ণাঙ্গ এনসিটিবি বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট, অডিও পাঠ্যবই রিডার এবং স্পেসড রিপিটিশন অ্যালগরিদম ভিত্তিক উইক-ওয়ার্ড রিকভারি ইঞ্জিন সম্পূর্ণ ডিজিটাল শিক্ষামূলক পণ্য। প্রিমিয়াম সক্রিয় করার সাথে সাথেই সকল কন্টেন্ট শিক্ষার্থীর অ্যাকাউন্টে তাৎক্ষণিকভাবে আনলক হয়ে যায়।',
        '৬.২. **নো-রিফান্ড বা অফেরতযোগ্য নীতিমালা:** ডিজিটাল কন্টেন্টের তাৎক্ষণিক প্রাপ্যতা ও সার্ভার রিসোর্স বরাদ্দের কারণে আমাদের প্ল্যাটফর্মে **যেকোনো পেমেন্ট বা সাবস্ক্রিপশন সম্পূর্ণ অফেরতযোগ্য (Non-refundable)**। একবার সেবা সক্রিয় হওয়ার পর কোনো প্রকার ক্যাশ রিফান্ড, চার্জব্যাক বা অর্থ ফেরতের সুযোগ নেই।',
        '৬.৩. **রিফান্ড অপশন সংক্রান্ত বিশেষ দুঃখ প্রকাশ:** আমরা আন্তরিকভাবে অত্যন্ত দুঃখিত, কিন্তু আমাদের পক্ষ থেকে রিফান্ডের কোনো অপশন নেই। আমরা গভীরভাবে দুঃখ প্রকাশ করছি কারণ আমাদের থেকে প্রিমিয়াম নেওয়ার পরে আপনাকে রিফান্ড অপশনে আসতে হয়েছে। একজন শিক্ষার্থী হিসেবে আপনার সন্তুষ্টি আমাদের কাছে সর্বাধিক গুরুত্বপূর্ণ। প্ল্যাটফর্মে কোনো কারিগরি সমস্যা বা পড়াশোনায় কোনো অসুবিধা হলে আমাদের সাপোর্ট ডেস্ক সর্বোচ্চ গুরুত্ব দিয়ে আপনার পাশে থাকবে।'
      ]
    },
    {
      id: 'disclaimer',
      titleEn: '7. Educational Disclaimer & Limitation of Liability',
      titleBn: '৭. শিক্ষামূলক ডিসক্লেইমার ও দায়বদ্ধতার সীমা',
      icon: AlertTriangle,
      summaryEn: 'Independent study tool, board examination outcome disclaimer.',
      summaryBn: 'স্বাধীন ডিজিটাল অনুশীলন মাধ্যম এবং বোর্ড পরীক্ষার ফলাফল সম্পর্কিত সুস্পষ্ট বার্তা।',
      contentEn: [
        '7.1. **Educational Study Aid:** This platform is an independent digital learning and revision aid. While our database is built with rigorous NCTB textbook alignment and board exam standards, individual examination grades ultimately depend on personal student effort, comprehensive syllabus coverage, and board examiners.',
        '7.2. **System Availability:** We maintain high cloud server uptime. However, we are not liable for temporary service delays resulting from public internet failures, mobile network fluctuations, or scheduled infrastructure upgrades.'
      ],
      contentBn: [
        '৭.১. **সহায়ক ডিজিটাল মাধ্যম:** এই প্ল্যাটফর্মটি একটি সহায়ক অনুশীলন মাধ্যম। পাঠ্যবই ও বিগত বোর্ড পরীক্ষার প্রশ্নের সাথে শতভাগ সামঞ্জস্য রেখে প্রশ্ন তৈরি করা হলেও চূড়ান্ত পরীক্ষার ফলাফল শিক্ষার্থীর সামগ্রিক প্রস্তুতি ও প্রচেষ্টার ওপর নির্ভরশীল।',
        '৭.২. **সার্ভার প্রাপ্যতা:** সার্বক্ষণিক সেবা সচল রাখার সর্বোচ্চ চেষ্টা করা হলেও ইন্টারনেট সংযোগের ত্রুটি বা সার্ভার রক্ষণাবেক্ষণজনিত সাময়িক বাধার জন্য প্ল্যাটফর্ম দায়ী থাকবে না।'
      ]
    },
    {
      id: 'governing',
      titleEn: '8. Governing Law & Legal Jurisdiction',
      titleBn: '৮. প্রযোজ্য আইন ও বিচারিক এখতিয়ার',
      icon: Scale,
      summaryEn: 'Governed by the laws of the People\'s Republic of Bangladesh.',
      summaryBn: 'গণপ্রজাতন্ত্রী বাংলাদেশের সংবিধান ও ডিজিটাল আইন দ্বারা পরিচালিত।',
      contentEn: [
        '8.1. **Jurisdiction:** These Terms and Conditions shall be governed by, interpreted, and enforced in accordance with the laws of the **People\'s Republic of Bangladesh**.',
        '8.2. **Dispute Resolution:** Any dispute or legal question arising in connection with the use of this website shall be resolved primarily through mutual amicable discussion, and failing that, submitted to the jurisdiction of the civil and cyber tribunals located in **Dhaka, Bangladesh**.'
      ],
      contentBn: [
        '৮.১. **আইনি এখতিয়ার:** এই শর্তাবলী **গণপ্রজাতন্ত্রী বাংলাদেশের প্রচলিত আইন** দ্বারা পরিচালিত ও নিয়ন্ত্রিত হবে।',
        '৮.২. **বিরোধ নিষ্পত্তি:** ওয়েবসাইট ব্যবহার সংক্রান্ত যেকোনো আইনগত বিরোধ বা জিজ্ঞাসা প্রাথমিকভাবে পারস্পরিক আলোচনার মাধ্যমে এবং প্রয়োজনে **ঢাকা, বাংলাদেশ**-এর উপযুক্ত আদালতের এখতিয়ারে নিষ্পত্তি হবে।'
      ]
    }
  ];

  const filteredSections = SECTIONS.filter((sec) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    const contentEnStr = (sec.contentEn || []).join(' ').toLowerCase();
    const contentBnStr = (sec.contentBn || []).join(' ').toLowerCase();
    return (
      sec.titleEn.toLowerCase().includes(q) ||
      sec.titleBn.toLowerCase().includes(q) ||
      sec.summaryEn.toLowerCase().includes(q) ||
      sec.summaryBn.toLowerCase().includes(q) ||
      contentEnStr.includes(q) ||
      contentBnStr.includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-[#0c0f17] text-slate-100 font-sans selection:bg-emerald-500/30 selection:text-emerald-200">
      {/* Top Header */}
      {!currentUser && (
        <header className="sticky top-0 z-40 bg-[#0c0f17]/90 backdrop-blur-xl border-b border-[#1b2538] px-4 sm:px-8 py-3.5 flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigate ? onNavigate('/') : window.location.href = '/'}
              className="p-2 rounded-xl bg-[#111723] hover:bg-[#182234] border border-[#1e293b] text-slate-300 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            >
              <ArrowLeft size={16} />
              <span className="hidden sm:inline">{isBn ? 'মূল পাতা' : 'Home'}</span>
            </button>

            <div 
              onClick={() => onNavigate ? onNavigate('/') : window.location.href = '/'}
              className="flex items-center gap-2.5 cursor-pointer ml-1"
            >
              <img
                src="/logo.png"
                alt="Learner Hub"
                className="w-8 h-8 rounded-xl object-cover border border-emerald-500/30 shadow-sm"
              />
              <div>
                <span className="text-sm sm:text-base font-extrabold text-white block leading-tight">Learner Hub</span>
                <span className="text-[10px] text-emerald-400 font-semibold">{isBn ? 'শর্তাবলী ও নীতিমালা' : 'Terms & Policy'}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              onClick={() => {
                const next = isBn ? 'en' : 'bn';
                setInternalLang(next);
                try { localStorage.setItem('hsc_language', next); } catch (e) {}
              }}
              className="px-3 py-1.5 rounded-xl bg-[#111723] hover:bg-[#182234] border border-[#1e293b] text-slate-300 hover:text-white transition-all text-xs font-bold flex items-center gap-1.5 cursor-pointer"
            >
              <Globe2 size={13} className="text-emerald-400" />
              <span>{isBn ? 'English' : 'বাংলা'}</span>
            </button>

            <button
              onClick={() => onOpenAuth ? onOpenAuth(false) : (onNavigate ? onNavigate('/auth') : window.location.href = '/auth')}
              className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold shadow-md cursor-pointer transition-all active:scale-95"
            >
              {isBn ? 'লগইন করুন' : 'Sign In'}
            </button>
          </div>
        </header>
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 space-y-8 pb-28 font-sans">
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
              ? 'আমাদের প্ল্যাটফর্ম ব্যবহারের পূর্বে অনুগ্রহ করে এই শর্তাবলী মনোযোগ সহকারে পড়ুন। শিক্ষার্থী সুরক্ষা, ন্যায্য লিডারবোর্ড প্রতিযোগিতা এবং মেধাস্বত্ব সুরক্ষায় আমরা প্রতিশ্রুতিবদ্ধ। আমাদের ওয়েবসাইট ব্রাউজ ও ব্যবহার করার মাধ্যমে আপনি আমাদের শর্তাবলী ও প্রয়োজনীয় কুকিজ (Cookies) ব্যবহারের অনুমতি প্রদান করছেন।'
              : 'Please read these terms carefully before accessing or using our educational platform. By browsing, accessing, or practicing on our website, you agree to comply with our terms and grant us permission to use essential cookies and local storage for your learning session.'}
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
            <div className="ml-auto flex items-center gap-2">
              <button
                onClick={() => {
                  const next = isBn ? 'en' : 'bn';
                  setInternalLang(next);
                  try {
                    localStorage.setItem('hsc_language', next);
                  } catch (e) {}
                }}
                className="px-3.5 py-1.5 rounded-xl bg-[#162033] hover:bg-[#1f2c45] border border-emerald-500/30 text-emerald-300 hover:text-white flex items-center gap-1.5 transition-all cursor-pointer text-xs font-bold"
              >
                <Globe2 size={13} className="text-emerald-400" />
                <span>{isBn ? 'English ভার্সন' : 'বাংলা সংস্করণ'}</span>
              </button>
            </div>
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

                    {/* Dedicated Refund Option & Apology Container (Per User Request) */}
                    {section.id === 'refund' && (
                      <div className="mt-5 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#141b2c] via-[#101522] to-[#0c0f17] border border-amber-500/40 shadow-xl space-y-4">
                        <div className="flex items-start gap-3.5">
                          <div className="w-11 h-11 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
                            <HeartHandshake size={24} />
                          </div>
                          <div className="space-y-2 flex-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/40">
                                {isBn ? 'রিফান্ড অপশন ও বিশেষ বিজ্ঞপ্তি' : 'Refund Option & Special Notice'}
                              </span>
                              <span className="text-[11px] font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/20">
                                {isBn ? 'অফেরতযোগ্য ডিজিটাল সেবা' : 'Non-Refundable Digital Service'}
                              </span>
                            </div>

                            <h4 className="text-base sm:text-lg font-extrabold text-white leading-snug">
                              {isBn
                                ? 'আমরা আন্তরিকভাবে অত্যন্ত দুঃখিত, কিন্তু আমাদের পক্ষ থেকে রিফান্ডের কোনো অপশন নেই।'
                                : 'We are very sorry, but there is no refund option available from our end.'}
                            </h4>

                            <div className="p-4 rounded-xl bg-[#0a0d14] border border-[#1e293b] space-y-2 text-xs sm:text-sm text-slate-300">
                              <p className="leading-relaxed font-semibold text-amber-200/95">
                                {isBn
                                  ? 'আমরা গভীরভাবে দুঃখ প্রকাশ করছি কারণ আমাদের থেকে প্রিমিয়াম নেওয়ার পরে আপনাকে রিফান্ড অপশনে আসতে হয়েছে।'
                                  : 'We sincerely express our deepest regret and apologize because after taking premium from us, you had to come to the refund option.'}
                              </p>
                              <p className="text-xs text-slate-400 leading-relaxed">
                                {isBn
                                  ? 'যেহেতু আমাদের সকল প্রশ্নব্যাংক, স্পেসড রিপিটিশন অ্যালগরিদম, পূর্ণাঙ্গ বোর্ড স্ট্যান্ডার্ড মডেল টেস্ট এবং ইন্টারেক্টিভ পাঠ্যবই রিডার সেবা সম্পূর্ণ ডিজিটাল পণ্য এবং সাবস্ক্রিপশন সম্পন্ন হওয়ামাত্রই শিক্ষার্থীর অ্যাকাউন্টে তাৎক্ষণিকভাবে আনলক হয়ে যায়, তাই একবার সেবা সক্রিয় হওয়ার পর অর্থ ফেরতের কোনো সুযোগ রাখা হয়নি। তবে আপনার অ্যাকাডেমিক প্রস্তুতিতে কোনো কারিগরি ত্রুটি বা অসন্তোষ থাকলে অনুগ্রহ করে আমাদের সাপোর্ট টিমে জানান; আপনার সমস্যা সমাধান করে দিতে আমরা প্রতিশ্রুতিবদ্ধ।'
                                  : 'Because all question banks, spaced repetition algorithms, full-length board mock exams, and textbook readers are instant-access digital goods unlocked upon purchase, no technical or financial refund option exists once active. However, if you encounter any technical difficulty or learning dissatisfaction, our dedicated support team is committed to resolving it for you.'}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Interactive Refund Option Buttons */}
                        <div className="pt-3 border-t border-[#1e293b] flex flex-wrap items-center justify-between gap-3">
                          <span className="text-xs text-slate-400 flex items-center gap-1.5">
                            <AlertCircle size={14} className="text-amber-400" />
                            <span>{isBn ? 'ডিজিটাল সেবায় নো-রিফান্ড পলিসি কার্যকর' : 'Instant digital access is non-refundable'}</span>
                          </span>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setShowRefundModal(true)}
                              className="px-4 py-2 rounded-xl bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30 text-amber-300 text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                            >
                              <RotateCcw size={13} />
                              <span>{isBn ? 'রিফান্ড অপশন বিস্তারিত' : 'View Refund Details'}</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => {
                                if (onNavigate) onNavigate('/about');
                                else window.location.href = '/about';
                              }}
                              className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-md shadow-emerald-950/50 transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                            >
                              <Mail size={13} />
                              <span>{isBn ? 'সাপোর্ট ডেস্কে যোগাযোগ' : 'Contact Support Desk'}</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
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

      {/* Refund Apology & Notice Interactive Modal */}
      <AnimatePresence>
        {showRefundModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-[#101522] border border-amber-500/40 rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl space-y-5 text-slate-100 relative"
            >
              <button
                onClick={() => setShowRefundModal(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-amber-500/15 border border-amber-500/30 text-amber-400 flex items-center justify-center shadow-md">
                <HeartHandshake size={26} />
              </div>

              <div className="space-y-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-black uppercase tracking-wider bg-rose-500/20 text-rose-300 border border-rose-500/30 px-2.5 py-0.5 rounded-full">
                    {isBn ? 'রিফান্ড নীতি' : 'Refund Policy'}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">
                    {isBn ? 'সরাসরি বিজ্ঞপ্তি' : 'Direct Notice'}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-extrabold text-white leading-tight">
                  {isBn ? 'রিফান্ড সংক্রান্ত বিজ্ঞপ্তি ও আন্তরিক ক্ষমা' : 'Refund Status & Sincere Apology'}
                </h3>

                <p className="text-sm font-bold text-amber-300 leading-snug">
                  {isBn
                    ? 'আমরা আন্তরিকভাবে অত্যন্ত দুঃখিত, কিন্তু আমাদের পক্ষ থেকে রিফান্ডের কোনো অপশন নেই।'
                    : 'We are very sorry, but there is no refund option available from our end.'}
                </p>

                <div className="p-3.5 rounded-2xl bg-[#0c101a] border border-[#1e293b] space-y-2 text-xs sm:text-sm text-slate-300">
                  <p className="leading-relaxed font-semibold text-amber-200/90">
                    {isBn
                      ? 'আমরা গভীরভাবে দুঃখ প্রকাশ করছি কারণ আমাদের থেকে প্রিমিয়াম নেওয়ার পরে আপনাকে রিফান্ড অপশনে আসতে হয়েছে।'
                      : 'We sincerely express our deep regret and apologize because after taking premium from us, you had to come to the refund option.'}
                  </p>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isBn
                      ? 'ডিজিটাল শিক্ষামূলক সেবাসমূহ সাবস্ক্রিপশনের সাথে সাথেই শিক্ষার্থীর প্রোফাইলে আনলক হয়ে যায় বিধায় রিফান্ডের কোনো সুযোগ রাখা হয়নি। তবে আপনার অ্যাকাউন্টে কোনো সমস্যা, লগইন বা প্র্যাকটিস সংক্রান্ত অসুবিধা থাকলে আমরা তাৎক্ষণিকভাবে তা সমাধান করে দেব।'
                      : 'All premium exam features and study modules are instantly delivered digital assets, making automated refunds unavailable. Our support desk will promptly assist you with any questions.'}
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#0a0d14] border border-[#1b2333] text-xs text-slate-400 flex items-center justify-between gap-2">
                <span>{isBn ? 'সাপোর্ট যোগাযোগ:' : 'Support Contact:'}</span>
                <span className="font-mono text-emerald-400 font-bold">support@learnerhub.com</span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => setShowRefundModal(false)}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-colors cursor-pointer"
                >
                  {isBn ? 'বন্ধ করুন' : 'Close'}
                </button>
                <button
                  onClick={() => {
                    setShowRefundModal(false);
                    if (onNavigate) onNavigate('/about');
                    else window.location.href = '/about';
                  }}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <Mail size={14} />
                  <span>{isBn ? 'সাপোর্ট টিমকে জানান' : 'Message Support'}</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Standalone Footer */}
      <footer className="mt-16 pt-8 border-t border-[#1a2335] text-center text-xs text-slate-400 space-y-4">
        <div className="flex flex-wrap items-center justify-center gap-6 text-slate-300 font-medium">
          <button onClick={() => onNavigate ? onNavigate('/') : window.location.href = '/'} className="hover:text-emerald-400 transition-colors cursor-pointer">
            {isBn ? 'মূল পাতা (Home)' : 'Home'}
          </button>
          <button onClick={() => onNavigate ? onNavigate('/curriculum') : window.location.href = '/curriculum'} className="hover:text-emerald-400 transition-colors cursor-pointer">
            {isBn ? 'পাঠ্যক্রম (Curriculum)' : 'Curriculum'}
          </button>
          <button onClick={() => onNavigate ? onNavigate('/teachers') : window.location.href = '/teachers'} className="hover:text-emerald-400 transition-colors cursor-pointer">
            {isBn ? 'শিক্ষকদের জন্য (Teachers)' : 'Teachers'}
          </button>
          <button onClick={() => onNavigate ? onNavigate('/faq') : window.location.href = '/faq'} className="hover:text-emerald-400 transition-colors cursor-pointer">
            {isBn ? 'সাধারণ প্রশ্ন (FAQ)' : 'FAQ'}
          </button>
          <button onClick={() => onNavigate ? onNavigate('/about') : window.location.href = '/about'} className="hover:text-cyan-400 transition-colors cursor-pointer">
            {isBn ? 'পরিচিতি (About)' : 'About'}
          </button>
          <button onClick={() => onNavigate ? onNavigate('/terms') : window.location.href = '/terms'} className="hover:text-emerald-400 transition-colors cursor-pointer font-bold text-emerald-400">
            {isBn ? 'শর্তাবলী ও নীতিমালা (Terms & Policy)' : 'Terms & Policy'}
          </button>
        </div>
        <p className="text-slate-500">
          © 2026 Learner Hub • NCTB HSC English Learning Platform
        </p>
      </footer>
      </div>
    </div>
  );
}

