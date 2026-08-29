import React from 'react';
import {
  LayoutDashboard,
  Layers,
  GraduationCap,
  BookOpen,
  Bot,
  History,
  Trophy,
  TrendingUp,
  Sparkles,
  LogIn,
  ChevronRight,
  Menu,
  X,
  Shield,
  LogOut
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  setActiveTab,
  isOpen,
  setIsOpen,
  lang,
  onOpenAuth,
  onOpenProfile,
  currentUser,
  onLogout
}) {
  const isBn = lang === 'bn';

  const menuItems = [
    {
      id: 'dashboard',
      label: isBn ? 'ড্যাশবোর্ড' : 'Dashboard',
      icon: LayoutDashboard,
      badge: null,
      activeColor: 'bg-emerald-500/15 text-emerald-400 border-l-4 border-emerald-500'
    },
    {
      id: 'vocab_bank',
      label: isBn ? 'ভোকাবুলারি ব্যাংক' : 'Vocabulary Bank',
      icon: BookOpen,
      badge: 'NCTB',
      badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
    },
    {
      id: 'flashcards',
      label: isBn ? 'ফ্ল্যাশকার্ড' : 'Flashcards',
      icon: Layers,
      badge: 'PRO',
      badgeColor: 'bg-amber-500/20 text-amber-300'
    },
    {
      id: 'exams',
      label: isBn ? 'পরীক্ষা' : 'Exam',
      icon: GraduationCap,
      badge: null
    },
    {
      id: 'history',
      label: isBn ? 'হিস্ট্রি' : 'History',
      icon: History,
      badge: null
    },
    {
      id: 'leaderboard',
      label: isBn ? 'লিডারবোর্ড' : 'Leaderboard',
      icon: Trophy,
      badge: 'TOP 5%',
      badgeColor: 'bg-yellow-500/20 text-yellow-300'
    },
    {
      id: 'progress',
      label: isBn ? 'প্রগ্রেস' : 'Progress',
      icon: TrendingUp,
      badge: null
    },
    {
      id: 'admin',
      label: isBn ? 'অ্যাডমিন প্যানেল' : 'Admin Panel',
      icon: Shield,
      badge: 'ADMIN',
      badgeColor: 'bg-purple-500/20 text-purple-300 border border-purple-500/30'
    }
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed lg:static top-0 left-0 h-screen w-64 bg-[#0c0f17] border-r border-[#192030] z-50 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Top Branding Section */}
        <div>
          <div className="h-16 flex items-center justify-between px-5 border-b border-[#192030]">
            <div className="flex items-center gap-3">
              <img
                src="/logo.jpg"
                alt="Learner Hub"
                className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-emerald-900/30 border border-emerald-500/30"
              />
              <div>
                <span className="text-white font-bold text-lg tracking-tight block">
                  {isBn ? 'লার্নার হাব' : 'Learner Hub'}
                </span>
                <span className="text-[11px] text-emerald-400 font-medium tracking-wide">
                  {isBn ? 'স্মার্ট প্র্যাকটিস' : 'Smart Practice'}
                </span>
              </div>
            </div>

            {/* Mobile close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="lg:hidden text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
            >
              <X size={20} />
            </button>
          </div>

          {/* Nav List */}
          <nav className="p-3 space-y-1.5 overflow-y-auto max-h-[calc(100vh-170px)]">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) setIsOpen(false);
                  }}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    isActive
                      ? 'bg-[#151c2a] text-emerald-400 shadow-md border-l-[3px] border-emerald-500'
                      : 'text-slate-300 hover:text-white hover:bg-[#131926]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon
                      size={18}
                      className={`transition-colors ${
                        isActive
                          ? 'text-emerald-400'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                    />
                    <span>{item.label}</span>
                  </div>

                  {item.badge && (
                    <span
                      className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${
                        item.badgeColor || 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Auth / Profile Section */}
        <div className="p-3.5 border-t border-[#192030] bg-[#090c13]/50">
          <div className="w-full flex items-center justify-between p-2 rounded-xl bg-[#121824] border border-[#1e293c] shadow-sm">
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer group flex-1"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md">
                {currentUser && currentUser.name ? currentUser.name.split(' ').map(n=>n[0]).join('').slice(0, 2) : 'TA'}
              </div>
              <div className="min-w-0">
                <span className="block text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                  {currentUser ? currentUser.name : 'Tanvir Ahmed'}
                </span>
                <span className="block text-[10px] text-slate-400 truncate">
                  {isBn ? 'প্রোফাইল ও দুর্বল শব্দ' : 'Profile & Weak Words'}
                </span>
              </div>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-all cursor-pointer shrink-0 ml-1"
                title={isBn ? 'লগআউট' : 'Log Out'}
              >
                <LogOut size={15} />
              </button>
            )}
          </div>
        </div>
      </aside>
    </>
  );
}
