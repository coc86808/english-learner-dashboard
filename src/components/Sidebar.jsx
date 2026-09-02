import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  GraduationCap,
  BookOpen,
  Layers,
  Zap,
  CheckSquare,
  AlertTriangle,
  TrendingUp,
  Trophy,
  Award,
  FileText,
  Settings,
  Info,
  Shield,
  Users,
  Activity,
  Sliders,
  X,
  LogOut,
  ChevronRight,
  Sparkles,
  BookMarked
} from 'lucide-react';

export default function Sidebar({
  activeTab,
  currentPath = '/dashboard',
  navigate,
  setActiveTab,
  isOpen,
  setIsOpen,
  lang = 'en',
  onOpenAuth,
  onOpenProfile,
  currentUser,
  onLogout,
  weakWordsCount = 0
}) {
  const isBn = lang === 'bn';

  // Navigation handler supporting both path and tab id
  const handleNav = (path, tabId) => {
    if (typeof navigate === 'function') {
      navigate(path);
    } else if (typeof setActiveTab === 'function') {
      setActiveTab(tabId || path.replace('/', ''));
    }
    if (window.innerWidth < 1024 && typeof setIsOpen === 'function') {
      setIsOpen(false);
    }
  };

  // Section Groups specification matching Milestone 1 requirements
  const sections = [
    {
      id: 'study',
      titleEn: 'STUDY',
      titleBn: 'পড়াশোনা',
      items: [
        {
          path: '/dashboard',
          tabId: 'dashboard',
          labelEn: 'Dashboard',
          labelBn: 'ড্যাশবোর্ড',
          icon: LayoutDashboard,
          badge: null
        },
        {
          path: '/units',
          tabId: 'units',
          labelEn: 'Units & Lessons',
          labelBn: 'ইউনিট ও লেসন',
          icon: GraduationCap,
          badge: '14 Units',
          badgeColor: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
        },
        {
          path: '/textbook',
          tabId: 'textbook',
          labelEn: 'Textbook Reader',
          labelBn: 'পাঠ্যবই রিডার',
          icon: BookOpen,
          badge: 'NCTB',
          badgeColor: 'bg-cyan-500/15 text-cyan-300 border border-cyan-500/30'
        },
        {
          path: '/vocabulary-bank',
          tabId: 'vocab_bank',
          labelEn: 'Vocabulary Bank',
          labelBn: 'ভোকাবুলারি ব্যাংক',
          icon: BookMarked,
          badge: '156 Words',
          badgeColor: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
        },
        {
          path: '/flashcards',
          tabId: 'flashcards',
          labelEn: '3D Flashcards',
          labelBn: 'থ্রিডি ফ্ল্যাশকার্ড',
          icon: Layers,
          badge: '3D PRO',
          badgeColor: 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
        }
      ]
    },
    {
      id: 'practice',
      titleEn: 'PRACTICE',
      titleBn: 'অনুশীলন',
      items: [
        {
          path: '/practice',
          tabId: 'practice',
          labelEn: 'Quick Practice',
          labelBn: 'দ্রুত অনুশীলন',
          icon: Zap,
          badge: 'MCQ',
          badgeColor: 'bg-teal-500/15 text-teal-300 border border-teal-500/30'
        },
        {
          path: '/exam',
          tabId: 'exams',
          labelEn: 'MCQ Vocab',
          labelBn: 'MCQ ভোকাব',
          icon: CheckSquare,
          badge: '2,729 MCQs',
          badgeColor: 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
        },
        {
          path: '/weak-words',
          tabId: 'weak-words',
          labelEn: 'Weak Words Hub',
          labelBn: 'দুর্বল শব্দ ভান্ডার',
          icon: AlertTriangle,
          badge: weakWordsCount > 0 ? `${weakWordsCount}` : 'Review',
          badgeColor: weakWordsCount > 0 
            ? 'bg-rose-500/25 text-rose-300 border border-rose-500/40 font-bold animate-pulse'
            : 'bg-slate-800 text-slate-400'
        }
      ]
    },
    {
      id: 'progress',
      titleEn: 'PROGRESS',
      titleBn: 'অগ্রগতি',
      items: [
        {
          path: '/progress',
          tabId: 'progress',
          labelEn: 'Progress Dashboard',
          labelBn: 'প্রগ্রেস ড্যাশবোর্ড',
          icon: TrendingUp,
          badge: null
        },
        {
          path: '/leaderboard',
          tabId: 'leaderboard',
          labelEn: 'Leaderboard',
          labelBn: 'লিডারবোর্ড',
          icon: Trophy,
          badge: 'TOP 5%',
          badgeColor: 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/30'
        }
      ]
    },
    {
      id: 'account',
      titleEn: 'ACCOUNT',
      titleBn: 'অ্যাকাউন্ট',
      items: [
        {
          path: '/notes',
          tabId: 'notes',
          labelEn: 'Personal Notes',
          labelBn: 'ব্যক্তিগত নোটস',
          icon: FileText,
          badge: null
        },
        {
          path: '/settings',
          tabId: 'settings',
          labelEn: 'Settings',
          labelBn: 'সেটিংস',
          icon: Settings,
          badge: null
        },
        {
          path: '/about',
          tabId: 'about',
          labelEn: 'About & Contact',
          labelBn: 'পরিচিতি ও যোগাযোগ',
          icon: Info,
          badge: null
        }
      ]
    },
    ...(currentUser?.role === 'admin'
      ? [
          {
            id: 'admin',
            titleEn: 'MASTER ADMIN',
            titleBn: 'মাস্টার অ্যাডমিন',
            isAdmin: true,
            items: [
              {
                path: '/admin',
                tabId: 'admin',
                labelEn: 'Admin Overview',
                labelBn: 'অ্যাডমিন ড্যাশবোর্ড',
                icon: Shield,
                badge: 'ROOT',
                badgeColor: 'bg-purple-500/30 text-purple-200 border border-purple-400/40'
              },
              {
                path: '/admin/users',
                tabId: 'admin_users',
                labelEn: 'User Management',
                labelBn: 'শিক্ষার্থী ব্যবস্থাপনা',
                icon: Users,
                badge: null
              },
              {
                path: '/admin/questions',
                tabId: 'admin_questions',
                labelEn: 'Question Bank',
                labelBn: 'প্রশ্ন ও শব্দভাণ্ডার',
                icon: BookOpen,
                badge: null
              },
              {
                path: '/admin/analytics',
                tabId: 'admin_analytics',
                labelEn: 'Platform Analytics',
                labelBn: 'প্ল্যাটফর্ম অ্যানালিটিক্স',
                icon: Activity,
                badge: null
              },
              {
                path: '/admin/settings',
                tabId: 'admin_settings',
                labelEn: 'Quiz Settings',
                labelBn: 'কুইজ মেকার সেটিংস',
                icon: Sliders,
                badge: null
              }
            ]
          }
        ]
      : [])
  ];

  // Determine active route state
  const isItemActive = (item) => {
    const normPath = (currentPath || '').toLowerCase();
    const normItemPath = item.path.toLowerCase();
    if (normPath === normItemPath) return true;
    if (activeTab && item.tabId === activeTab) return true;

    // Handle synonym paths
    if ((normItemPath === '/vocabulary-bank' || normItemPath === '/vocabulary') &&
        (normPath === '/vocabulary-bank' || normPath === '/vocabulary' || activeTab === 'vocab_bank')) {
      return true;
    }
    if ((normItemPath === '/exam' || normItemPath === '/exams') &&
        (normPath === '/exam' || normPath === '/exams' || activeTab === 'exams')) {
      return true;
    }
    if (normItemPath === '/weak-words' && (normPath === '/weak-words' || activeTab === 'weak-words')) {
      return true;
    }
    if (normItemPath.startsWith('/admin') && normPath === normItemPath) {
      return true;
    }
    return false;
  };

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#0c0f17] border-r border-[#1e293b] text-slate-100 select-none">
      {/* 1. Top Branding Section */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-[#1e293b] bg-[#0c0f17]/95 backdrop-blur-md">
        <div 
          onClick={() => handleNav('/dashboard', 'dashboard')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          <div className="relative">
            <img
              src="/logo.jpg"
              alt="Learner Hub"
              className="w-10 h-10 rounded-xl object-cover shadow-lg shadow-emerald-950/60 border border-emerald-500/30 group-hover:border-emerald-400/70 transition-all duration-300 group-hover:scale-105"
            />
            <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#0c0f17]" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-white font-black text-base tracking-tight group-hover:text-emerald-300 transition-colors">
                {isBn ? 'লার্নার হাব' : 'Learner Hub'}
              </span>
              <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                HSC
              </span>
            </div>
            <span className="text-[11px] text-emerald-400 font-medium tracking-wide flex items-center gap-1">
              <Sparkles size={11} className="text-emerald-400 animate-pulse" />
              {isBn ? 'স্মার্ট প্র্যাকটিস প্ল্যাটফর্ম' : 'Smart EdTech 2026'}
            </span>
          </div>
        </div>

        {/* Mobile close button */}
        <button
          onClick={() => setIsOpen(false)}
          className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-[#161e2e] transition-colors border border-transparent hover:border-[#1e293b]"
          aria-label="Close Sidebar"
        >
          <X size={18} />
        </button>
      </div>

      {/* 2. Scrollable Navigation List */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-5 scrollbar-thin scrollbar-thumb-[#1f2738] hover:scrollbar-thumb-[#2e384d]">
        {sections.map((section) => (
          <div key={section.id} className="space-y-1">
            {/* Section Header */}
            <div className="px-3 py-1 flex items-center justify-between">
              <span className={`text-[10px] font-extrabold tracking-wider ${
                section.isAdmin 
                  ? 'text-purple-400/90' 
                  : 'text-slate-400'
              }`}>
                {isBn ? section.titleBn : section.titleEn}
              </span>
              {section.isAdmin && (
                <span className="text-[9px] px-1.5 py-0.2 rounded bg-purple-500/20 text-purple-300 border border-purple-500/40 font-bold">
                  ADMIN
                </span>
              )}
            </div>

            {/* Section Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isItemActive(item);

                return (
                  <button
                    key={item.path}
                    onClick={() => handleNav(item.path, item.tabId)}
                    className={`relative w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all duration-200 group cursor-pointer ${
                      active
                        ? 'text-emerald-300 bg-[#111723] border border-emerald-500/30 shadow-[0_0_20px_-3px_rgba(16,185,129,0.25)]'
                        : 'text-slate-300 hover:text-white hover:bg-[#141b29] border border-transparent'
                    }`}
                  >
                    {/* Glowing active left accent indicator */}
                    {active && (
                      <motion.div
                        layoutId="activeSidebarIndicator"
                        className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500/15 via-emerald-500/5 to-transparent pointer-events-none"
                        transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                      />
                    )}

                    <div className="flex items-center gap-2.5 relative z-10">
                      <div className={`p-1.5 rounded-lg transition-colors ${
                        active 
                          ? 'bg-emerald-500/20 text-emerald-400 shadow-sm' 
                          : 'text-slate-400 group-hover:text-emerald-400 group-hover:bg-[#192233]'
                      }`}>
                        <Icon size={16} className="shrink-0" />
                      </div>
                      <span className="truncate">
                        {isBn ? item.labelBn : item.labelEn}
                      </span>
                    </div>

                    {/* Badge */}
                    <div className="flex items-center gap-1 relative z-10">
                      {item.badge && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-md ${
                          item.badgeColor || 'bg-slate-800 text-slate-300'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                      <ChevronRight 
                        size={13} 
                        className={`transition-transform duration-200 ${
                          active 
                            ? 'text-emerald-400 opacity-100 translate-x-0' 
                            : 'text-slate-600 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5'
                        }`} 
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* 3. Bottom User Profile & Auth Section */}
      <div className="p-3 border-t border-[#1e293b] bg-[#0a0d14]/80 backdrop-blur-md">
        {currentUser ? (
          <div className="flex items-center justify-between p-2 rounded-2xl bg-[#111723] border border-[#1e293b] shadow-md hover:border-emerald-500/30 transition-all">
            <div
              onClick={onOpenProfile}
              className="flex items-center gap-2.5 min-w-0 cursor-pointer group flex-1"
            >
              <div className="relative">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white font-black text-xs shrink-0 shadow-md shadow-emerald-950/60 group-hover:scale-105 transition-transform">
                  {currentUser?.name 
                    ? currentUser.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() 
                    : 'TA'}
                </div>
                {currentUser.role === 'admin' && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-500 rounded-full border-2 border-[#111723] flex items-center justify-center text-[7px] text-white font-bold">
                    ★
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1">
                  <span className="block text-xs font-bold text-white group-hover:text-emerald-300 truncate">
                    {currentUser?.name || 'Student'}
                  </span>
                  {currentUser.role === 'admin' && (
                    <span className="text-[8px] font-bold px-1 rounded bg-purple-500/30 text-purple-200">
                      ADMIN
                    </span>
                  )}
                </div>
                <span className="block text-[10px] text-slate-400 truncate">
                  {currentUser?.college || (isBn ? 'HSC পরীক্ষার্থী' : 'HSC 2026 Candidate')}
                </span>
              </div>
            </div>

            {onLogout && (
              <button
                onClick={onLogout}
                className="p-2 rounded-xl text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 transition-all cursor-pointer shrink-0 ml-1 border border-transparent hover:border-rose-500/30"
                title={isBn ? 'লগআউট' : 'Log Out'}
              >
                <LogOut size={15} />
              </button>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 active:scale-95 transition-all"
          >
            <Sparkles size={14} />
            <span>{isBn ? 'লগইন / সাইন আপ' : 'Sign In / Register'}</span>
          </button>
        )}
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Drawer with Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 bottom-0 w-72 z-50 lg:hidden shadow-2xl"
            >
              {sidebarContent}
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Static Sidebar */}
      <aside className="hidden lg:flex w-64 h-screen shrink-0 sticky top-0 flex-col z-30">
        {sidebarContent}
      </aside>
    </>
  );
}
