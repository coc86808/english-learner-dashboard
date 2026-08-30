import React, { useState, useEffect, useMemo } from 'react';
import {
  Shield,
  Users,
  BookOpen,
  TrendingUp,
  Bell,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Send,
  Download,
  Flame,
  Award,
  Sliders,
  AlertCircle,
  Clock,
  Plus,
  FileSpreadsheet,
  Zap,
  Activity,
  Layers,
  ChevronRight,
  ExternalLink,
  Trash2
} from 'lucide-react';
import UserManagement from './UserManagement';
import QuestionManagement from './QuestionManagement';
import AdminAnalytics from './AdminAnalytics';
import QuizMakerSettings from './QuizMakerSettings';

export default function AdminDashboard({
  users = [],
  setUsers,
  questions = [],
  setQuestions,
  onExitAdmin,
  currentPath = '/admin',
  navigate,
  lang = 'en'
}) {
  const isBn = lang === 'bn';

  // Determine active tab based on route or internal state
  const initialTab = useMemo(() => {
    if (typeof window !== 'undefined') {
      const p = window.location.pathname.toLowerCase();
      if (p === '/admin/users') return 'users';
      if (p === '/admin/questions') return 'questions';
      if (p === '/admin/analytics') return 'analytics';
      if (p === '/admin/settings') return 'quiz-settings';
    }
    if (currentPath === '/admin/users') return 'users';
    if (currentPath === '/admin/questions') return 'questions';
    if (currentPath === '/admin/analytics') return 'analytics';
    if (currentPath === '/admin/settings') return 'quiz-settings';
    return 'overview';
  }, [currentPath]);

  const [adminTab, setAdminTab] = useState(initialTab);

  // Sync tab when prop / path changes
  useEffect(() => {
    if (currentPath === '/admin/users') setAdminTab('users');
    else if (currentPath === '/admin/questions') setAdminTab('questions');
    else if (currentPath === '/admin/analytics') setAdminTab('analytics');
    else if (currentPath === '/admin/settings') setAdminTab('quiz-settings');
    else if (currentPath === '/admin') setAdminTab('overview');
  }, [currentPath]);

  // Handle Tab Switch
  const handleTabChange = (tabId) => {
    setAdminTab(tabId);
    if (typeof navigate === 'function') {
      if (tabId === 'overview') navigate('/admin');
      else if (tabId === 'users') navigate('/admin/users');
      else if (tabId === 'questions') navigate('/admin/questions');
      else if (tabId === 'analytics') navigate('/admin/analytics');
      else if (tabId === 'quiz-settings') navigate('/admin/settings');
    } else if (typeof window !== 'undefined') {
      const target = tabId === 'overview' ? '/admin' : `/admin/${tabId === 'quiz-settings' ? 'settings' : tabId}`;
      try {
        window.history.pushState({ path: target }, '', target);
      } catch (e) {}
    }
  };

  // Broadcast & Announcements state with localStorage persistence
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastList, setBroadcastList] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_admin_broadcasts');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return [
      {
        id: 1,
        text: '📢 HSC 2026 Batch: Unit 1 Nelson Mandela Mega Vocabulary Quiz starts this Friday at 8:00 PM!',
        date: '28 Aug 2026',
        author: 'Master Admin (Sakin)',
        active: true
      },
      {
        id: 2,
        text: '⚡ New Feature: 3D Flip Flashcards with automatic spaced repetition buffer are now live for all units.',
        date: '29 Aug 2026',
        author: 'Admin Team',
        active: true
      }
    ];
  });

  const [broadcastToast, setBroadcastToast] = useState(false);

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    const newBroadcast = {
      id: Date.now(),
      text: `📢 ${broadcastMessage.trim()}`,
      date: 'Just now',
      author: 'Master Admin',
      active: true
    };

    const updated = [newBroadcast, ...broadcastList];
    setBroadcastList(updated);
    try {
      localStorage.setItem('hsc_admin_broadcasts', JSON.stringify(updated));
    } catch (e) {}

    setBroadcastMessage('');
    setBroadcastToast(true);
    setTimeout(() => setBroadcastToast(false), 3500);
  };

  const handleDeleteBroadcast = (id) => {
    const updated = broadcastList.filter((b) => b.id !== id);
    setBroadcastList(updated);
    try {
      localStorage.setItem('hsc_admin_broadcasts', JSON.stringify(updated));
    } catch (e) {}
  };

  // Aggregated KPIs
  const totalStudents = users.length;
  const activeStudents = users.filter((u) => (u.status || '').toLowerCase() === 'active').length;
  const pendingUsers = users.filter((u) => (u.status || '').toLowerCase() === 'pending').length;
  const totalPointsAwarded = users.reduce((sum, u) => sum + (u.points || 0), 0);
  const totalUnits = useMemo(() => new Set(questions.map((q) => q.unit)).size || 12, [questions]);

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-10 animate-in fade-in duration-300">
      {/* 1. Master Admin Root Banner */}
      <div className="bg-gradient-to-r from-purple-950/90 via-[#181a30] to-emerald-950/90 border border-purple-500/40 p-5 sm:p-6 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-2xl backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-purple-500/20 border border-purple-500/50 flex items-center justify-center text-purple-300 shadow-inner shrink-0">
            <Shield size={26} />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="text-white font-black text-lg sm:text-xl md:text-2xl tracking-tight">
                {isBn ? 'মাস্টার অ্যাডমিন কন্ট্রোল সেন্টার' : 'Master Admin Control Center'}
              </h1>
              <span className="text-[10px] bg-purple-500/30 text-purple-200 border border-purple-400/50 px-2.5 py-0.5 rounded-full font-extrabold shadow-sm">
                ROOT ACCESS • ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
              {isBn
                ? 'শিক্ষার্থী অনুমোদন ও পরিচালনা, HSC পাঠ্যবইয়ের প্রশ্ন ও শব্দভাণ্ডার তৈরি, প্ল্যাটফর্ম অ্যানালিটিক্স এবং স্পেসড রিপিটিশন সেটিংস।'
                : 'Comprehensive management of student authorizations, NCTB vocabulary & MCQs, learning analytics, and spaced repetition engine.'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 self-stretch sm:self-auto justify-end">
          <button
            onClick={onExitAdmin}
            className="px-4 py-2.5 rounded-xl bg-[#111723] hover:bg-[#192233] border border-[#27344d] text-slate-200 hover:text-emerald-400 font-bold text-xs sm:text-sm inline-flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer flex-1 sm:flex-initial"
          >
            <ArrowLeft size={16} />
            <span>{isBn ? 'স্টুডেন্ট পোর্টালে যান' : 'Student Portal'}</span>
          </button>
        </div>
      </div>

      {/* 2. Top Admin KPI Overview Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        {/* KPI 1: Total Students */}
        <div className="bg-[#111723] border border-[#1e293b] p-4 sm:p-5 rounded-2xl shadow-card flex flex-col justify-between hover:border-emerald-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-semibold">{isBn ? 'মোট শিক্ষার্থী' : 'Total Students'}</span>
            <Users size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-white">
            {totalStudents}
          </div>
          <div className="flex items-center gap-1 text-[11px] text-emerald-400 mt-2 font-bold">
            <TrendingUp size={13} />
            <span>+12% {isBn ? 'এই সপ্তাহে' : 'this week'}</span>
          </div>
        </div>

        {/* KPI 2: Active Today / DAU */}
        <div className="bg-[#111723] border border-[#1e293b] p-4 sm:p-5 rounded-2xl shadow-card flex flex-col justify-between hover:border-purple-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-semibold">{isBn ? 'দৈনিক সক্রিয় (DAU)' : 'Daily Active (DAU)'}</span>
            <Activity size={16} className="text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">
            {activeStudents}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block font-medium">
            {Math.round((activeStudents / Math.max(totalStudents, 1)) * 100)}% {isBn ? 'অংশগ্রহণের হার' : 'active retention'}
          </span>
        </div>

        {/* KPI 3: Total MCQs & Vocab Bank */}
        <div className="bg-[#111723] border border-[#1e293b] p-4 sm:p-5 rounded-2xl shadow-card flex flex-col justify-between hover:border-amber-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-semibold">{isBn ? 'MCQ ও শব্দভাণ্ডার' : 'Total Questions'}</span>
            <BookOpen size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {questions.length}
          </div>
          <span className="text-[11px] text-slate-400 mt-2 block font-medium">
            Across {totalUnits} NCTB Units
          </span>
        </div>

        {/* KPI 4: Platform Average Accuracy */}
        <div className="bg-[#111723] border border-[#1e293b] p-4 sm:p-5 rounded-2xl shadow-card flex flex-col justify-between hover:border-cyan-500/30 transition-all">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-semibold">{isBn ? 'গড় নির্ভুলতা' : 'Platform Accuracy'}</span>
            <CheckCircle2 size={16} className="text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">
            78.6%
          </div>
          <span className="text-[11px] text-emerald-400 mt-2 block font-bold">
            +4.2% {isBn ? 'উন্নতি' : 'improvement'}
          </span>
        </div>

        {/* KPI 5: Pending Authorizations Alert */}
        <div 
          onClick={() => handleTabChange('users')}
          className={`border p-4 sm:p-5 rounded-2xl shadow-card flex flex-col justify-between cursor-pointer transition-all ${
            pendingUsers > 0 
              ? 'bg-amber-950/20 border-amber-500/50 hover:border-amber-400' 
              : 'bg-[#111723] border-[#1e293b] hover:border-emerald-500/30'
          }`}
        >
          <div className="flex items-center justify-between text-slate-400 text-xs mb-1.5">
            <span className="font-semibold">{isBn ? 'অপেক্ষমাণ অনুমোদন' : 'Pending Authorize'}</span>
            <AlertCircle size={16} className={pendingUsers > 0 ? 'text-amber-400 animate-bounce' : 'text-slate-400'} />
          </div>
          <div className={`text-2xl sm:text-3xl font-black ${pendingUsers > 0 ? 'text-amber-400' : 'text-slate-200'}`}>
            {pendingUsers}
          </div>
          <span className="text-[11px] text-amber-300 mt-2 block font-bold">
            {pendingUsers > 0 ? (isBn ? '১-ক্লিকে অনুমোদন করুন →' : 'Review & Approve →') : (isBn ? 'সকল প্রস্তুত' : 'All clear')}
          </span>
        </div>
      </div>

      {/* 3. Admin Sub-Navigation Tabs Bar */}
      <div className="flex items-center gap-2 border-b border-[#1e293b] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'overview', labelEn: 'Overview & Notices', labelBn: 'ওভারভিউ ও নোটিশ', icon: Shield, path: '/admin' },
          { id: 'users', labelEn: 'User Management', labelBn: 'শিক্ষার্থী ব্যবস্থাপনা', icon: Users, path: '/admin/users', badge: pendingUsers > 0 ? `${pendingUsers}` : null },
          { id: 'questions', labelEn: 'Question Bank', labelBn: 'প্রশ্ন ও ভোকাবুলারি', icon: BookOpen, path: '/admin/questions' },
          { id: 'analytics', labelEn: 'Platform Analytics', labelBn: 'অ্যানালিটিক্স ও রিপোর্ট', icon: TrendingUp, path: '/admin/analytics' },
          { id: 'quiz-settings', labelEn: 'Quiz Maker Settings', labelBn: 'কুইজ মেকার সেটিংস', icon: Sliders, path: '/admin/settings' },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-extrabold inline-flex items-center gap-2 transition-all whitespace-nowrap cursor-pointer ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/60 border border-emerald-500'
                  : 'bg-[#111723] text-slate-400 hover:text-white border border-[#1e293b] hover:border-[#2b384e]'
              }`}
            >
              <Icon size={16} />
              <span>{isBn ? tab.labelBn : tab.labelEn}</span>
              {tab.badge && (
                <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 font-black">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Broadcast Toast Feedback */}
      {broadcastToast && (
        <div className="p-4 rounded-2xl bg-emerald-950/90 border border-emerald-500 text-emerald-200 text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in fade-in slide-in-from-top-2 shadow-2xl">
          <CheckCircle2 size={18} className="text-emerald-400" />
          <span>{isBn ? 'ঘোষণা সফলভাবে সকল শিক্ষার্থীর ড্যাশবোর্ডে প্রকাশিত হয়েছে!' : 'Broadcast announcement dispatched to all learner dashboards!'}</span>
        </div>
      )}

      {/* 4. Tab Content Rendering */}

      {/* TAB: OVERVIEW & NOTICE BOARD */}
      {adminTab === 'overview' && (
        <div className="space-y-6">
          {/* Quick Action Shortcuts Grid */}
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
            <h3 className="text-white font-extrabold text-base flex items-center gap-2">
              <Zap size={18} className="text-amber-400" />
              <span>{isBn ? 'দ্রুত মাস্টার অ্যাকশন ও শর্টকাট' : 'Quick Master Actions & Shortcuts'}</span>
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
              <button
                onClick={() => handleTabChange('users')}
                className="p-3.5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] hover:border-emerald-500/50 flex flex-col items-center text-center gap-2 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Users size={18} />
                </div>
                <span className="text-xs font-bold">{isBn ? 'শিক্ষার্থী তালিকা' : 'Manage Users'}</span>
              </button>

              <button
                onClick={() => handleTabChange('questions')}
                className="p-3.5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] hover:border-amber-500/50 flex flex-col items-center text-center gap-2 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <BookOpen size={18} />
                </div>
                <span className="text-xs font-bold">{isBn ? 'নতুন প্রশ্ন যোগ' : 'Add Questions'}</span>
              </button>

              <button
                onClick={() => handleTabChange('analytics')}
                className="p-3.5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] hover:border-cyan-500/50 flex flex-col items-center text-center gap-2 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <TrendingUp size={18} />
                </div>
                <span className="text-xs font-bold">{isBn ? 'মিস্টেক হিটম্যাপ' : 'Mistake Heatmap'}</span>
              </button>

              <button
                onClick={() => handleTabChange('quiz-settings')}
                className="p-3.5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] hover:border-purple-500/50 flex flex-col items-center text-center gap-2 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Sliders size={18} />
                </div>
                <span className="text-xs font-bold">{isBn ? 'স্পেসড রিপিটিশন' : 'Quiz Engine'}</span>
              </button>

              <button
                onClick={() => {
                  const fakeMsg = isBn ? 'এইচএসসি ২০২৬ এর নতুন ভোকাবুলারি কুইজ চালু হয়েছে!' : 'New HSC 2026 Vocabulary Session is live!';
                  setBroadcastMessage(fakeMsg);
                  window.scrollTo({ top: 800, behavior: 'smooth' });
                }}
                className="p-3.5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] hover:border-teal-500/50 flex flex-col items-center text-center gap-2 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-teal-500/15 text-teal-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bell size={18} />
                </div>
                <span className="text-xs font-bold">{isBn ? 'নোটিশ পাঠান' : 'Send Broadcast'}</span>
              </button>

              <button
                onClick={onExitAdmin}
                className="p-3.5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] hover:border-rose-500/50 flex flex-col items-center text-center gap-2 text-slate-200 hover:text-white transition-all cursor-pointer group"
              >
                <div className="w-10 h-10 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <ArrowLeft size={18} />
                </div>
                <span className="text-xs font-bold">{isBn ? 'স্টুডেন্ট ভিউ' : 'Student View'}</span>
              </button>
            </div>
          </div>

          {/* Broadcast Announcement Center */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left 6 Cols: Send Broadcast Form */}
            <div className="lg:col-span-6 bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
              <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                <Bell className="text-purple-400" size={18} />
                <span>{isBn ? 'সকল শিক্ষার্থীর ড্যাশবোর্ডে জরুরি নোটিশ পাঠান' : 'Broadcast Live Notice to Learners'}</span>
              </h3>
              <p className="text-xs text-slate-400">
                {isBn
                  ? 'এখানে প্রকাশিত বার্তা সকল শিক্ষার্থীর নোটিফিকেশন বার এবং ড্যাশবোর্ডে তাৎক্ষণিকভাবে প্রদর্শিত হবে।'
                  : 'Announcements will instantly appear on all registered student dashboards and notification trays.'}
              </p>

              <form onSubmit={handleSendBroadcast} className="space-y-3.5">
                <textarea
                  rows={4}
                  required
                  value={broadcastMessage}
                  onChange={(e) => setBroadcastMessage(e.target.value)}
                  placeholder={
                    isBn
                      ? 'নোটিশের বিবরণ লিখুন (যেমন: HSC ২০২৬ ব্যাচ: আগামী শুক্রবার রাত ৮টায় Unit 1 মেগা কুইজ অনুষ্ঠিত হবে)...'
                      : 'Write broadcast text (e.g. HSC 2026 Batch: Unit 1 Mega Vocabulary Exam goes live this Friday at 8 PM!)...'
                  }
                  className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-purple-500 rounded-2xl p-4 text-xs sm:text-sm text-white placeholder-slate-500 outline-none leading-relaxed"
                />

                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-lg shadow-purple-950/60 active:scale-95 transition-all cursor-pointer"
                >
                  <Send size={15} />
                  <span>{isBn ? 'নোটিশ ব্রডকাস্ট করুন' : 'Dispatch Announcement'}</span>
                </button>
              </form>
            </div>

            {/* Right 6 Cols: Active Announcements Feed */}
            <div className="lg:col-span-6 bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-white font-extrabold text-base flex items-center gap-2">
                  <Sparkles className="text-amber-400" size={18} />
                  <span>{isBn ? 'সক্রিয় নোটিশ ফিড' : 'Active Announcements Feed'}</span>
                </h3>
                <span className="text-xs text-slate-400 font-semibold">{broadcastList.length} Active</span>
              </div>

              <div className="space-y-3 max-h-[280px] overflow-y-auto pr-1">
                {broadcastList.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] flex items-start justify-between gap-3 text-xs group hover:border-[#29364d] transition-colors"
                  >
                    <div className="space-y-1">
                      <p className="text-slate-200 leading-relaxed font-medium">{item.text}</p>
                      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-semibold">
                        <span>{item.date}</span>
                        <span>•</span>
                        <span className="text-purple-300">{item.author}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDeleteBroadcast(item.id)}
                      title="Delete notice"
                      className="text-slate-500 hover:text-rose-400 p-1 rounded-lg transition-colors cursor-pointer shrink-0"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB: USER MANAGEMENT */}
      {adminTab === 'users' && (
        <UserManagement
          users={users}
          onUpdateUsers={setUsers}
          lang={lang}
        />
      )}

      {/* TAB: QUESTION MANAGEMENT */}
      {adminTab === 'questions' && (
        <QuestionManagement
          questions={questions}
          onUpdateQuestions={setQuestions}
          lang={lang}
        />
      )}

      {/* TAB: PLATFORM ANALYTICS */}
      {adminTab === 'analytics' && (
        <AdminAnalytics
          users={users}
          questions={questions}
          lang={lang}
        />
      )}

      {/* TAB: QUIZ MAKER PRO SETTINGS */}
      {adminTab === 'quiz-settings' && (
        <QuizMakerSettings
          lang={lang}
        />
      )}
    </div>
  );
}
