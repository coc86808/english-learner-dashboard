import React, { useState } from 'react';
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
  Award
} from 'lucide-react';
import UserManagement from './UserManagement';
import QuestionManagement from './QuestionManagement';
import AdminAnalytics from './AdminAnalytics';
import QuizMakerSettings from './QuizMakerSettings';
import { Sliders } from 'lucide-react';

export default function AdminDashboard({
  users,
  setUsers,
  questions,
  setQuestions,
  onExitAdmin,
  lang
}) {
  const isBn = lang === 'bn';
  const [adminTab, setAdminTab] = useState('questions'); // 'questions' | 'users' | 'analytics' | 'broadcast'
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastList, setBroadcastList] = useState([
    {
      id: 1,
      text: '📢 HSC 2026 Batch: Unit 1 Nelson Mandela Mega Vocabulary Quiz starts this Friday at 8:00 PM!',
      date: '28 Aug 2026',
      active: true
    }
  ]);

  const handleSendBroadcast = (e) => {
    e.preventDefault();
    if (!broadcastMessage.trim()) return;

    setBroadcastList([
      {
        id: Date.now(),
        text: `📢 ${broadcastMessage}`,
        date: 'Just now',
        active: true
      },
      ...broadcastList
    ]);
    setBroadcastMessage('');
    alert(isBn ? 'ঘোষণা সকল শিক্ষার্থীর ড্যাশবোর্ডে পাঠানো হয়েছে!' : 'Broadcast announcement sent to all learners!');
  };

  const totalPointsAwarded = users.reduce((sum, u) => sum + (u.points || 0), 0);

  return (
    <div className="space-y-6 max-w-[1550px] mx-auto pb-10">
      {/* Admin Banner & Switch Back */}
      <div className="bg-gradient-to-r from-purple-950/80 via-[#191830] to-emerald-950/80 border border-purple-500/40 p-4 md:p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 flex items-center justify-center text-purple-300">
            <Shield size={22} />
          </div>
          <div>
            <h1 className="text-white font-black text-base md:text-lg flex items-center gap-2">
              <span>{isBn ? 'অ্যাডমিন কন্ট্রোল পোর্টাল' : 'Master Admin Control Panel'}</span>
              <span className="text-[10px] bg-purple-500/30 text-purple-200 border border-purple-400/40 px-2 py-0.5 rounded-full font-bold">
                ROOT ACCESS
              </span>
            </h1>
            <p className="text-xs text-slate-300">
              {isBn
                ? 'শিক্ষার্থী পরিচালনা, HSC বইয়ের শব্দ ও প্রশ্ন তৈরি, সম্পাদনা এবং নোটিফিকেশন সিস্টেম।'
                : 'Manage students, create & edit HSC textbook vocabulary, questions, and send announcements.'}
            </p>
          </div>
        </div>

        <button
          onClick={onExitAdmin}
          className="px-4 py-2.5 rounded-xl bg-[#131824] hover:bg-[#1a2233] border border-[#2b374e] text-slate-200 hover:text-emerald-400 font-bold text-xs md:text-sm inline-flex items-center gap-2 transition-all shadow-md self-stretch sm:self-auto justify-center"
        >
          <ArrowLeft size={16} />
          <span>{isBn ? 'স্টুডেন্ট ভিউতে ফিরে যান' : 'Back to Student Portal'}</span>
        </button>
      </div>

      {/* Top Quick Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Stat 1: Total Users */}
        <div className="bg-[#131824] border border-[#1d2536] p-4 md:p-5 rounded-2xl shadow-card">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>{isBn ? 'মোট শিক্ষার্থী' : 'Total Students'}</span>
            <Users size={16} className="text-emerald-400" />
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white">
            {users.length}
          </div>
          <span className="text-[11px] text-emerald-400 mt-1 block font-medium">
            +3 new this week
          </span>
        </div>

        {/* Stat 2: Total Questions */}
        <div className="bg-[#131824] border border-[#1d2536] p-4 md:p-5 rounded-2xl shadow-card">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>{isBn ? 'HSC প্রশ্ন ও শব্দভাণ্ডার' : 'Total Vocab & Questions'}</span>
            <BookOpen size={16} className="text-amber-400" />
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white">
            {questions.length}
          </div>
          <span className="text-[11px] text-amber-400 mt-1 block font-medium">
            Across {new Set(questions.map((q) => q.unit)).size} Units
          </span>
        </div>

        {/* Stat 3: Points Earned */}
        <div className="bg-[#131824] border border-[#1d2536] p-4 md:p-5 rounded-2xl shadow-card">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>{isBn ? 'মোট অর্জিত পয়েন্ট' : 'Total Student Points'}</span>
            <Award size={16} className="text-yellow-400" />
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-white">
            {totalPointsAwarded}
          </div>
          <span className="text-[11px] text-yellow-400 mt-1 block font-medium">
            Avg 480 pts / student
          </span>
        </div>

        {/* Stat 4: Active Streaks */}
        <div className="bg-[#131824] border border-[#1d2536] p-4 md:p-5 rounded-2xl shadow-card">
          <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
            <span>{isBn ? 'সক্রিয় স্ট্রিক' : 'Daily Streak Health'}</span>
            <Flame size={16} className="text-orange-400" />
          </div>
          <div className="text-2xl md:text-3xl font-extrabold text-orange-400">
            85%
          </div>
          <span className="text-[11px] text-slate-400 mt-1 block font-medium">
            Daily practice retention
          </span>
        </div>
      </div>

      {/* Admin Tab Navigation */}
      <div className="flex items-center gap-2 border-b border-[#1d2536] pb-2 overflow-x-auto no-scrollbar">
        {[
          { id: 'questions', label: isBn ? 'প্রশ্ন ও ভোকাবুলারি ব্যাংক' : 'Questions & Vocab Bank', icon: BookOpen },
          { id: 'users', label: isBn ? 'শিক্ষার্থী ব্যবস্থাপনা' : 'Student Management', icon: Users },
          { id: 'analytics', label: isBn ? 'অ্যানালিটিক্স ও রিপোর্ট' : 'Analytics & Stats', icon: TrendingUp },
          { id: 'quiz-settings', label: isBn ? 'কুইজ মেকার সেটিংস' : 'Quiz Maker Pro Settings', icon: Sliders },
          { id: 'broadcast', label: isBn ? 'নোটিশ ও অ্যানাউন্সমেন্ট' : 'Broadcast & Notices', icon: Bell },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = adminTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setAdminTab(tab.id)}
              className={`px-4 py-2.5 rounded-xl text-xs md:text-sm font-bold inline-flex items-center gap-2 transition-all whitespace-nowrap ${
                isActive
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-950/50'
                  : 'bg-[#131824] text-slate-400 hover:text-white border border-[#1d2536]'
              }`}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content Rendering */}
      {adminTab === 'questions' && (
        <QuestionManagement
          questions={questions}
          onUpdateQuestions={setQuestions}
          lang={lang}
        />
      )}

      {adminTab === 'users' && (
        <UserManagement
          users={users}
          onUpdateUsers={setUsers}
          lang={lang}
        />
      )}

      {adminTab === 'broadcast' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Send Broadcast Form */}
          <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-6 shadow-card space-y-4">
            <h3 className="text-white font-bold text-base flex items-center gap-2">
              <Bell className="text-purple-400" size={18} />
              <span>{isBn ? 'শিক্ষার্থীদের নতুন নোটিশ পাঠান' : 'Broadcast Notice to Learners'}</span>
            </h3>

            <form onSubmit={handleSendBroadcast} className="space-y-3">
              <textarea
                rows={4}
                required
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder={
                  isBn
                    ? 'নোটিশ বা পরীক্ষার তথ্য লিখুন (যেমন: HSC Unit 1 এর নতুন ৫০টি ভোকাবুলারি টেস্ট যুক্ত হয়েছে)...'
                    : 'Write announcement text (e.g., 50 new HSC Unit 1 vocabulary flashcards are live!)...'
                }
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-purple-500 rounded-xl p-3 text-sm text-white placeholder-slate-500 outline-none"
              />

              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs md:text-sm inline-flex items-center gap-2 shadow-lg shadow-purple-950/40 transition-all"
              >
                <Send size={15} />
                <span>{isBn ? 'নোটিশ ব্রডকাস্ট করুন' : 'Send Broadcast'}</span>
              </button>
            </form>
          </div>

          {/* Past Broadcasts List */}
          <div className="bg-[#131824] border border-[#1d2536] rounded-2xl p-6 shadow-card space-y-3">
            <h3 className="text-white font-bold text-base">
              {isBn ? 'সাম্প্রতিক নোটিশসমূহ' : 'Active Announcements'}
            </h3>

            <div className="space-y-3">
              {broadcastList.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-xl bg-[#161c2b] border border-[#222c40] flex items-start justify-between gap-3 text-xs"
                >
                  <p className="text-slate-200 leading-relaxed font-medium">{item.text}</p>
                  <span className="text-[10px] text-slate-500 shrink-0 font-semibold">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {adminTab === 'analytics' && (
        <AdminAnalytics
          users={users}
          questions={questions}
          lang={lang}
        />
      )}

      {adminTab === 'quiz-settings' && (
        <QuizMakerSettings
          lang={lang}
        />
      )}
    </div>
  );
}
