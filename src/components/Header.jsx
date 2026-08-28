import React, { useState } from 'react';
import {
  Menu,
  Flame,
  Moon,
  Sun,
  Bell,
  Languages,
  Sparkles,
  ToggleLeft,
  ToggleRight,
  User,
  Shield
} from 'lucide-react';

export default function Header({
  activeTabTitle,
  onToggleSidebar,
  lang,
  setLang,
  streakCount = 2,
  onOpenNotifications,
  onOpenStreakModal,
  onOpenAdmin,
  isAdminActive
}) {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [toggleA, setToggleA] = useState(true);
  const [toggleB, setToggleB] = useState(false);

  const isBn = lang === 'bn';

  return (
    <header className="h-16 bg-[#0c0f17]/90 backdrop-blur-md border-b border-[#192030] px-4 md:px-8 flex items-center justify-between sticky top-0 z-30">
      {/* Left Title & Sidebar Toggle */}
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleSidebar}
          className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#141a27] transition-colors"
          title="Toggle Navigation"
        >
          <Menu size={20} />
        </button>

        <h1 className="text-lg md:text-xl font-bold text-white tracking-wide">
          {activeTabTitle}
        </h1>
      </div>

      {/* Right Tools & Controls matching screenshot */}
      <div className="flex items-center gap-2.5 md:gap-4">
        {/* Streak Counter Pill */}
        <button
          onClick={onOpenStreakModal}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#18131e] border border-orange-500/30 hover:border-orange-500/60 text-orange-400 font-semibold text-xs md:text-sm shadow-sm hover:scale-105 transition-all"
        >
          <Flame size={16} className="text-orange-500 fill-orange-500 animate-flame" />
          <span>{isBn ? '২' : streakCount}</span>
        </button>

        {/* Custom Toggle Switch 1 (matching visual switch in screenshot) */}
        <button
          onClick={() => setToggleA(!toggleA)}
          className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
            toggleA ? 'bg-slate-700' : 'bg-slate-800 border border-slate-700'
          }`}
          title="Mode Toggle 1"
        >
          <div
            className={`w-4 h-4 rounded-full bg-slate-300 shadow transform transition-transform ${
              toggleA ? 'translate-x-4 bg-emerald-400' : 'translate-x-0'
            }`}
          />
        </button>

        {/* Custom Toggle Switch 2 (matching visual switch in screenshot) */}
        <button
          onClick={() => setToggleB(!toggleB)}
          className={`w-9 h-5 rounded-full transition-colors relative flex items-center px-0.5 ${
            toggleB ? 'bg-emerald-600' : 'bg-slate-800 border border-slate-700'
          }`}
          title="Mode Toggle 2"
        >
          <div
            className={`w-4 h-4 rounded-full bg-slate-300 shadow transform transition-transform ${
              toggleB ? 'translate-x-4 bg-white' : 'translate-x-0'
            }`}
          />
        </button>

        {/* Theme Icon (Moon / Sun) */}
        <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className="p-2 rounded-xl text-slate-400 hover:text-amber-400 hover:bg-[#141a27] transition-all"
          title="Toggle Day/Night mode"
        >
          {isDarkMode ? <Moon size={18} /> : <Sun size={18} />}
        </button>

        {/* Language Switcher */}
        <button
          onClick={() => setLang(lang === 'bn' ? 'en' : 'bn')}
          className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-[#151c2a] border border-[#232c3f] text-slate-300 hover:text-white hover:border-emerald-500/50 transition-all flex items-center gap-1"
          title="Change Language"
        >
          <Languages size={14} className="text-emerald-400" />
          <span>{lang === 'bn' ? 'বাং' : 'EN'}</span>
        </button>

        {/* Admin Portal Toggle Button */}
        <button
          onClick={onOpenAdmin}
          className={`px-2.5 py-1 rounded-lg text-xs font-bold border transition-all flex items-center gap-1.5 shadow-sm ${
            isAdminActive
              ? 'bg-purple-600 border-purple-400 text-white shadow-purple-950/50'
              : 'bg-[#181326] border-purple-500/30 text-purple-300 hover:border-purple-500/60 hover:text-white'
          }`}
          title="Admin Control Panel"
        >
          <Shield size={14} className={isAdminActive ? 'text-white' : 'text-purple-400'} />
          <span className="hidden sm:inline">{isAdminActive ? (isBn ? 'অ্যাডমিন মোড' : 'Admin Active') : (isBn ? 'অ্যাডমিন' : 'Admin')}</span>
        </button>

        {/* Notifications */}
        <button
          onClick={onOpenNotifications}
          className="relative p-2 rounded-xl text-slate-400 hover:text-white hover:bg-[#141a27] transition-colors"
        >
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-emerald-500" />
        </button>
      </div>
    </header>
  );
}
