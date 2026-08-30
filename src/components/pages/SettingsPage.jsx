import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings as SettingsIcon,
  User,
  Lock,
  Palette,
  Globe,
  Bell,
  Database,
  Shield,
  Check,
  AlertTriangle,
  Download,
  Trash2,
  RefreshCw,
  Eye,
  EyeOff,
  Sparkles,
  Volume2,
  VolumeX,
  Smartphone,
  School,
  Calendar,
  KeyRound,
  CheckCircle2,
  XCircle,
  HelpCircle,
  LogOut
} from 'lucide-react';

export default function SettingsPage({
  currentUser,
  onUpdateProfile,
  lang = 'en',
  onToggleLang,
  onLogout,
  onNavigate
}) {
  const isBn = lang === 'bn';

  // Settings State initialized from localStorage
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_user_settings');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      theme: 'cyber-dark', // 'cyber-dark' | 'midnight-blue' | 'pure-black' | 'light-clean'
      soundEffects: true,
      dailyReminder: true,
      examAnnouncements: true,
      weakWordAlerts: true,
      ttsAutoPlay: false,
      fontSize: 'normal'
    };
  });

  // Profile Form State
  const [name, setName] = useState(currentUser?.name || 'HSC Candidate');
  const [college, setCollege] = useState(currentUser?.college || 'Dhaka Residential Model College');
  const [phone, setPhone] = useState(currentUser?.phone || '01700000000');
  const [batch, setBatch] = useState(currentUser?.batch || 'HSC 2026');
  const [profileSuccessToast, setProfileSuccessToast] = useState('');

  // Password Form State
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrentPass, setShowCurrentPass] = useState(false);
  const [showNewPass, setShowNewPass] = useState(false);
  const [passError, setPassError] = useState('');
  const [passSuccessToast, setPassSuccessToast] = useState('');

  // Modals
  const [isResetDataOpen, setIsResetDataOpen] = useState(false);
  const [isDeleteAccountOpen, setIsDeleteAccountOpen] = useState(false);
  const [deleteConfirmInput, setDeleteConfirmInput] = useState('');
  const [actionNotice, setActionNotice] = useState('');

  // Sync settings to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('hsc_user_settings', JSON.stringify(settings));
    } catch (e) {}
  }, [settings]);

  // Sync profile values if currentUser changes
  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setCollege(currentUser.college || '');
      setPhone(currentUser.phone || '');
      setBatch(currentUser.batch || 'HSC 2026');
    }
  }, [currentUser]);

  // Password Strength Calculator
  const passwordStrength = React.useMemo(() => {
    if (!newPassword) return 0;
    let score = 0;
    if (newPassword.length >= 8) score += 25;
    if (/[A-Z]/.test(newPassword)) score += 25;
    if (/[0-9]/.test(newPassword)) score += 25;
    if (/[^A-Za-z0-9]/.test(newPassword)) score += 25;
    return score;
  }, [newPassword]);

  // Handle Profile Update
  const handleSaveProfile = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    const updated = {
      ...(currentUser || {}),
      name: name.trim(),
      college: college.trim(),
      phone: phone.trim(),
      batch
    };

    if (onUpdateProfile) {
      onUpdateProfile(updated);
    } else {
      try {
        localStorage.setItem('hsc_auth_user', JSON.stringify(updated));
      } catch (err) {}
    }

    setProfileSuccessToast(isBn ? 'প্রোফাইল সফলভাবে আপডেট করা হয়েছে!' : 'Profile updated successfully!');
    setTimeout(() => setProfileSuccessToast(''), 3000);
  };

  // Handle Password Change
  const handleSavePassword = (e) => {
    e.preventDefault();
    setPassError('');

    if (!currentPassword) {
      setPassError(isBn ? 'বর্তমান পাসওয়ার্ড প্রদান করুন।' : 'Please enter your current password.');
      return;
    }

    // Verify current password if user has one stored
    if (currentUser?.password && currentUser.password !== currentPassword) {
      setPassError(isBn ? 'বর্তমান পাসওয়ার্ডটি সঠিক নয়!' : 'Current password does not match!');
      return;
    }

    if (newPassword.length < 6) {
      setPassError(isBn ? 'নতুন পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে।' : 'New password must be at least 6 characters.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setPassError(isBn ? 'নতুন পাসওয়ার্ড ও নিশ্চিতকরণ পাসওয়ার্ড মিলছে না।' : 'Passwords do not match.');
      return;
    }

    const updated = {
      ...(currentUser || {}),
      password: newPassword
    };

    if (onUpdateProfile) {
      onUpdateProfile(updated);
    } else {
      try {
        localStorage.setItem('hsc_auth_user', JSON.stringify(updated));
      } catch (err) {}
    }

    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setPassSuccessToast(isBn ? 'পাসওয়ার্ড সফলভাবে পরিবর্তিত হয়েছে!' : 'Password changed successfully!');
    setTimeout(() => setPassSuccessToast(''), 3000);
  };

  // Handle Setting Toggles
  const handleToggleSetting = (key) => {
    setSettings((prev) => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle Theme Selection
  const handleSelectTheme = (themeName) => {
    setSettings((prev) => ({
      ...prev,
      theme: themeName
    }));
    setActionNotice(isBn ? `থিম পরিবর্তিত: ${themeName}` : `Theme switched to: ${themeName}`);
    setTimeout(() => setActionNotice(''), 2000);
  };

  // Export All Student Data
  const handleExportAllData = () => {
    const backupObject = {
      exportDate: new Date().toISOString(),
      user: currentUser,
      settings: settings,
      weakWords: JSON.parse(localStorage.getItem('hsc_weak_words') || '[]'),
      notes: JSON.parse(localStorage.getItem('hsc_student_notes') || '[]'),
      examHistory: JSON.parse(localStorage.getItem('hsc_exam_history') || '[]')
    };

    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(backupObject, null, 2));
    const dl = document.createElement('a');
    dl.setAttribute('href', dataStr);
    dl.setAttribute('download', `HSC_LearnerHub_Data_Export_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(dl);
    dl.click();
    dl.remove();
  };

  // Clear Local Cache
  const handleClearCache = () => {
    try {
      const authUser = localStorage.getItem('hsc_auth_user');
      const registeredUsers = localStorage.getItem('hsc_registered_users');
      localStorage.removeItem('hsc_temp_quiz_state');
      localStorage.removeItem('hsc_cache_timestamps');
      if (authUser) localStorage.setItem('hsc_auth_user', authUser);
      if (registeredUsers) localStorage.setItem('hsc_registered_users', registeredUsers);

      setActionNotice(isBn ? 'ক্যাশ সফলভাবে পরিষ্কার করা হয়েছে!' : 'Local cache cleared successfully!');
      setTimeout(() => setActionNotice(''), 2500);
    } catch (e) {
      console.error(e);
    }
  };

  // Reset Learning Progress
  const handleResetLearningData = () => {
    try {
      localStorage.removeItem('hsc_weak_words');
      localStorage.removeItem('hsc_exam_history');
      window.dispatchEvent(new CustomEvent('hsc_weak_words_updated'));
      setIsResetDataOpen(false);
      setActionNotice(isBn ? 'সকল দুর্বল শব্দ ও পরীক্ষার স্কোর রিসেট করা হয়েছে।' : 'Weak words & exam stats reset successfully.');
      setTimeout(() => setActionNotice(''), 2500);
    } catch (e) {}
  };

  // Delete Account
  const handleDeleteAccount = () => {
    if (deleteConfirmInput !== 'DELETE') return;
    try {
      localStorage.removeItem('hsc_auth_user');
      localStorage.removeItem('hsc_weak_words');
      localStorage.removeItem('hsc_student_notes');
      localStorage.removeItem('hsc_user_settings');
      setIsDeleteAccountOpen(false);
      if (onLogout) onLogout();
      if (onNavigate) onNavigate('/');
    } catch (e) {}
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-7 shadow-card space-y-2">
        <div className="inline-flex items-center gap-2 text-slate-400 text-xs font-bold bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
          <SettingsIcon size={14} className="text-emerald-400" />
          <span>{isBn ? 'অ্যাকাউন্ট সেটিংস ও কাস্টমাইজেশন' : 'Account Settings & Preferences'}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
          {isBn ? 'পছন্দসমূহ ও অ্যাকাউন্ট নিয়ন্ত্রণ' : 'Preferences & Security'}
        </h1>
        <p className="text-xs sm:text-sm text-slate-400">
          {isBn
            ? 'আপনার প্রোফাইল তথ্য, থিম, ইন্টারফেস ভাষা, নোটিফিকেশন এবং ডাটা এক্সপোর্ট ব্যবস্থাপনা করুন।'
            : 'Configure your profile details, dark/light theme, UI language, alert preferences, and data privacy.'}
        </p>

        {/* Global Action Toast */}
        <AnimatePresence>
          {actionNotice && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              className="p-3 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2"
            >
              <CheckCircle2 size={16} />
              <span>{actionNotice}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Grid: 2 Columns for Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Profile & Security (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 1. Profile Edit Card */}
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center">
                  <User size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {isBn ? 'প্রোফাইল তথ্য (Profile)' : 'Profile Details'}
                  </h3>
                  <span className="text-[11px] text-slate-400 block">
                    {currentUser?.email || 'student@learnerhub.com'}
                  </span>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {currentUser?.role === 'admin' ? 'Master Admin' : 'HSC Student'}
              </span>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs">
              {/* Name */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {isBn ? 'পূর্ণ নাম (Full Name):' : 'Full Name:'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-100 focus:outline-none focus:border-emerald-500"
                  required
                />
              </div>

              {/* College */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {isBn ? 'কলেজের নাম (College Name):' : 'College Name:'}
                </label>
                <div className="relative">
                  <School size={14} className="absolute left-3 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    placeholder="e.g. Notre Dame College, Dhaka"
                  />
                </div>
              </div>

              {/* Phone & Batch */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    {isBn ? 'ফোন নম্বর:' : 'Phone Number:'}
                  </label>
                  <div className="relative">
                    <Smartphone size={14} className="absolute left-3 top-3 text-slate-500" />
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-slate-400 block mb-1">
                    {isBn ? 'এইচএসসি ব্যাচ:' : 'HSC Batch:'}
                  </label>
                  <select
                    value={batch}
                    onChange={(e) => setBatch(e.target.value)}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="HSC 2025">HSC 2025</option>
                    <option value="HSC 2026">HSC 2026 (Target)</option>
                    <option value="HSC 2027">HSC 2027</option>
                  </select>
                </div>
              </div>

              {profileSuccessToast && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <Check size={14} />
                  <span>{profileSuccessToast}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center justify-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer"
                >
                  <Check size={15} />
                  <span>{isBn ? 'প্রোফাইল পরিবর্তন সংরক্ষণ করুন' : 'Save Profile Changes'}</span>
                </button>
              </div>
            </form>
          </div>

          {/* 2. Password Change Card */}
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#1e293b] pb-3">
              <div className="w-8 h-8 rounded-xl bg-cyan-500/15 text-cyan-400 flex items-center justify-center">
                <KeyRound size={18} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {isBn ? 'পাসওয়ার্ড পরিবর্তন (Security)' : 'Change Password'}
                </h3>
                <span className="text-[11px] text-slate-400 block">
                  {isBn ? 'আপনার অ্যাকাউন্টের নিরাপত্তা নিশ্চিত করুন' : 'Ensure strong credentials for account safety'}
                </span>
              </div>
            </div>

            <form onSubmit={handleSavePassword} className="space-y-3.5 text-xs">
              {/* Current Password */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {isBn ? 'বর্তমান পাসওয়ার্ড:' : 'Current Password:'}
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPass ? 'text' : 'password'}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPass(!showCurrentPass)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showCurrentPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {isBn ? 'নতুন পাসওয়ার্ড:' : 'New Password:'}
                </label>
                <div className="relative">
                  <input
                    type={showNewPass ? 'text' : 'password'}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500 pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPass(!showNewPass)}
                    className="absolute right-3 top-2.5 text-slate-500 hover:text-slate-300"
                  >
                    {showNewPass ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>

                {/* Strength Meter */}
                {newPassword && (
                  <div className="mt-2 space-y-1">
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-300 ${
                          passwordStrength <= 25
                            ? 'bg-rose-500 w-1/4'
                            : passwordStrength <= 50
                            ? 'bg-amber-500 w-2/4'
                            : passwordStrength <= 75
                            ? 'bg-cyan-500 w-3/4'
                            : 'bg-emerald-500 w-full'
                        }`}
                      />
                    </div>
                    <span className="text-[10px] text-slate-400">
                      Strength:{' '}
                      <span className="font-bold text-slate-200">
                        {passwordStrength <= 25
                          ? 'Weak'
                          : passwordStrength <= 50
                          ? 'Fair'
                          : passwordStrength <= 75
                          ? 'Good'
                          : 'Strong (Recommended)'}
                      </span>
                    </span>
                  </div>
                )}
              </div>

              {/* Confirm New Password */}
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {isBn ? 'নতুন পাসওয়ার্ড নিশ্চিত করুন:' : 'Confirm New Password:'}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3.5 py-2.5 text-xs text-slate-100 focus:outline-none focus:border-cyan-500"
                  placeholder="••••••••"
                />
              </div>

              {passError && (
                <div className="p-2.5 rounded-xl bg-rose-500/20 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-center gap-1.5">
                  <XCircle size={14} />
                  <span>{passError}</span>
                </div>
              )}

              {passSuccessToast && (
                <div className="p-2.5 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <Check size={14} />
                  <span>{passSuccessToast}</span>
                </div>
              )}

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={!newPassword || !currentPassword}
                  className="w-full py-2.5 rounded-xl bg-[#182338] hover:bg-[#202f4a] disabled:opacity-50 border border-[#2b3d5e] text-cyan-300 font-extrabold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                >
                  <Lock size={14} />
                  <span>{isBn ? 'পাসওয়ার্ড আপডেট করুন' : 'Update Password'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Appearance, Language, Alerts & Danger Zone (6 cols) */}
        <div className="lg:col-span-6 space-y-6">
          {/* 3. Appearance & Theme Selector */}
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#1e293b] pb-3">
              <div className="w-8 h-8 rounded-xl bg-purple-500/15 text-purple-400 flex items-center justify-center">
                <Palette size={18} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {isBn ? 'থিম ও রূপরেখা (Theme)' : 'Appearance & Theme'}
                </h3>
                <span className="text-[11px] text-slate-400 block">
                  {isBn ? 'আপনার চোখের জন্য সুবিধাজনক থিম বাছুন' : 'Select your preferred visual atmosphere'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {[
                {
                  id: 'cyber-dark',
                  label: isBn ? 'সাইবার ডার্ক (মূল)' : 'Cyber Dark (Default)',
                  desc: 'Deep Navy & Emerald',
                  bg: 'bg-[#0c0f17] border-emerald-500/40 text-emerald-300'
                },
                {
                  id: 'midnight-blue',
                  label: isBn ? 'মিডনাইট ব্লু' : 'Midnight Blue',
                  desc: 'Sapphire & Cyan',
                  bg: 'bg-[#080e1e] border-cyan-500/40 text-cyan-300'
                },
                {
                  id: 'pure-black',
                  label: isBn ? 'পিওর ব্ল্যাক OLED' : 'Pure Black OLED',
                  desc: 'Ultra High Contrast',
                  bg: 'bg-black border-slate-700 text-slate-100'
                },
                {
                  id: 'light-clean',
                  label: isBn ? 'হাই-কনট্রাস্ট লাইট' : 'High Contrast Light',
                  desc: 'Day Mode Reading',
                  bg: 'bg-slate-900 border-amber-500/40 text-amber-300'
                }
              ].map((th) => {
                const isActive = settings.theme === th.id;
                return (
                  <button
                    key={th.id}
                    type="button"
                    onClick={() => handleSelectTheme(th.id)}
                    className={`p-3 rounded-2xl border text-left transition-all ${
                      isActive
                        ? `${th.bg} ring-2 ring-emerald-500/50 shadow-md`
                        : 'bg-[#0c0f17] border-[#1e293b] text-slate-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-xs">{th.label}</span>
                      {isActive && <Check size={13} className="text-emerald-400" />}
                    </div>
                    <span className="text-[10px] text-slate-500 block">{th.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 4. Language & Localization */}
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center justify-between border-b border-[#1e293b] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 text-amber-400 flex items-center justify-center">
                  <Globe size={18} />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base">
                    {isBn ? 'ইন্টারফেস ভাষা (UI Language)' : 'Interface Language'}
                  </h3>
                  <span className="text-[11px] text-slate-400 block">
                    {isBn ? 'ইংরেজি ও বাংলা উভয় ভাষায় উপলব্ধ' : 'Switch seamlessly between English and Bengali'}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={onToggleLang}
                className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <span>{isBn ? 'English চালু করুন' : 'বাংলায় পরিবর্তন করুন'}</span>
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] flex items-center justify-between text-xs text-slate-300">
              <span>{isBn ? 'বর্তমান ভাষা:' : 'Active System Language:'}</span>
              <span className="font-bold text-emerald-400">
                {isBn ? 'বাংলা (Bengali - Active)' : 'English (Active)'}
              </span>
            </div>
          </div>

          {/* 5. Notifications & Sound Effects */}
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#1e293b] pb-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
                <Bell size={18} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {isBn ? 'বিজ্ঞপ্তি ও সাউন্ড (Notifications)' : 'Notifications & Sound'}
                </h3>
                <span className="text-[11px] text-slate-400 block">
                  {isBn ? 'অ্যালার্ট ও সাউন্ড সেটিংস নিয়ন্ত্রণ করুন' : 'Control chimes and daily reminders'}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Daily Streak Reminder */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0c0f17] border border-[#1e293b]">
                <div>
                  <span className="font-bold text-white block">{isBn ? 'দৈনিক স্ট্রিক রিমাইন্ডার' : 'Daily Streak Reminder'}</span>
                  <span className="text-[10px] text-slate-400">{isBn ? 'প্রতিদিন পড়ার তাগিদ' : 'Keep your learning streak active'}</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.dailyReminder}
                  onChange={() => handleToggleSetting('dailyReminder')}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              {/* Sound Effects */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0c0f17] border border-[#1e293b]">
                <div>
                  <span className="font-bold text-white block">{isBn ? 'MCQ সাউন্ড ইফেক্টস' : 'MCQ Sound Effects'}</span>
                  <span className="text-[10px] text-slate-400">{isBn ? 'সঠিক/ভুল উত্তরের অডিও বেল' : 'Audio chime for correct & wrong answers'}</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.soundEffects}
                  onChange={() => handleToggleSetting('soundEffects')}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>

              {/* Weak Word Revision Alerts */}
              <div className="flex items-center justify-between p-3 rounded-2xl bg-[#0c0f17] border border-[#1e293b]">
                <div>
                  <span className="font-bold text-white block">{isBn ? 'দুর্বল শব্দ রিভিশন অ্যালার্ট' : 'Weak Word Revision Alerts'}</span>
                  <span className="text-[10px] text-slate-400">{isBn ? 'ভুল হওয়া শব্দের রিমাইন্ডার' : 'Targeted queue reminders for missed words'}</span>
                </div>
                <input
                  type="checkbox"
                  checked={settings.weakWordAlerts}
                  onChange={() => handleToggleSetting('weakWordAlerts')}
                  className="w-4 h-4 accent-emerald-500 rounded cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* 6. Data Management & Danger Zone */}
          <div className="bg-[#111723] border border-rose-950/40 rounded-3xl p-5 sm:p-6 shadow-card space-y-4">
            <div className="flex items-center gap-2.5 border-b border-[#1e293b] pb-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500/15 text-rose-400 flex items-center justify-center">
                <Database size={18} />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">
                  {isBn ? 'ডাটা ব্যবস্থাপনা ও নিয়ন্ত্রণ (Data)' : 'Data Management & Privacy'}
                </h3>
                <span className="text-[11px] text-slate-400 block">
                  {isBn ? 'ব্যাকআপ ডাউনলোড ও রিসেট বিকল্প' : 'Backup exports and reset controls'}
                </span>
              </div>
            </div>

            <div className="space-y-2.5 text-xs">
              {/* Export Full Data */}
              <button
                type="button"
                onClick={handleExportAllData}
                className="w-full p-3 rounded-2xl bg-[#141b2a] hover:bg-[#1c273c] border border-[#233148] text-cyan-300 font-bold flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Download size={15} />
                  <span>{isBn ? 'সকল লার্নিং ডাটা ডাউনলোড করুন (JSON)' : 'Export Full Learning Data (JSON)'}</span>
                </div>
                <span className="text-[10px] text-slate-400">Download</span>
              </button>

              {/* Clear Cache */}
              <button
                type="button"
                onClick={handleClearCache}
                className="w-full p-3 rounded-2xl bg-[#141b2a] hover:bg-[#1c273c] border border-[#233148] text-slate-200 font-bold flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <RefreshCw size={15} />
                  <span>{isBn ? 'লোকাল ক্যাশ পরিষ্কার করুন' : 'Clear Local App Cache'}</span>
                </div>
                <span className="text-[10px] text-slate-400">Clear Cache</span>
              </button>

              {/* Reset Stats */}
              <button
                type="button"
                onClick={() => setIsResetDataOpen(true)}
                className="w-full p-3 rounded-2xl bg-amber-950/20 hover:bg-amber-950/40 border border-amber-500/30 text-amber-300 font-bold flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <AlertTriangle size={15} />
                  <span>{isBn ? 'দুর্বল শব্দ ও স্কোর রিসেট করুন' : 'Reset Weak Words & Study Scores'}</span>
                </div>
                <span className="text-[10px] text-amber-400">Reset</span>
              </button>

              {/* Delete Account */}
              <button
                type="button"
                onClick={() => setIsDeleteAccountOpen(true)}
                className="w-full p-3 rounded-2xl bg-rose-950/20 hover:bg-rose-950/40 border border-rose-500/30 text-rose-300 font-bold flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <Trash2 size={15} />
                  <span>{isBn ? 'অ্যাকাউন্ট মুছে ফেলুন (Delete Account)' : 'Delete Account Permanently'}</span>
                </div>
                <span className="text-[10px] text-rose-400">Danger</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Confirmation Modal: Reset Data */}
      <AnimatePresence>
        {isResetDataOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#131824] border border-[#2b3850] rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
                <AlertTriangle size={24} />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-white">
                  {isBn ? 'আপনি কি ডাটা রিসেট করতে চান?' : 'Reset Learning Stats?'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isBn
                    ? 'এটি আপনার সকল দুর্বল শব্দের তালিকা এবং অতীতের পরীক্ষার স্কোর মুছে ফেলবে। আপনার অ্যাকাউন্ট ও নোটস সুরক্ষিত থাকবে।'
                    : 'This action will clear your saved weak words and past exam scores. Your account and study notes will remain intact.'}
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsResetDataOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#1a2334] text-slate-300 text-xs font-semibold"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="button"
                  onClick={handleResetLearningData}
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-500 text-slate-950 font-extrabold text-xs"
                >
                  {isBn ? 'হ্যাঁ, রিসেট করুন' : 'Confirm Reset'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Confirmation Modal: Delete Account */}
      <AnimatePresence>
        {isDeleteAccountOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="w-full max-w-md bg-[#131824] border border-rose-900/60 rounded-3xl p-6 shadow-2xl space-y-4 text-slate-100"
            >
              <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
                <Trash2 size={24} />
              </div>

              <div className="text-center space-y-1">
                <h3 className="text-lg font-bold text-white">
                  {isBn ? 'অ্যাকাউন্ট স্থায়ীভাবে মুছতে চান?' : 'Delete Account Permanently?'}
                </h3>
                <p className="text-xs text-slate-400">
                  {isBn
                    ? 'এই কাজটি আর ফেরানো যাবে না। নিশ্চিত করতে নিচের ঘরে "DELETE" লিখুন।'
                    : 'This action is irreversible. Type "DELETE" in uppercase to confirm.'}
                </p>
              </div>

              <div>
                <input
                  type="text"
                  value={deleteConfirmInput}
                  onChange={(e) => setDeleteConfirmInput(e.target.value)}
                  placeholder='Type "DELETE"'
                  className="w-full bg-[#0c0f17] border border-rose-900 rounded-xl px-3 py-2 text-center text-xs font-bold text-white focus:outline-none focus:border-rose-500"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsDeleteAccountOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#1a2334] text-slate-300 text-xs font-semibold"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="button"
                  disabled={deleteConfirmInput !== 'DELETE'}
                  onClick={handleDeleteAccount}
                  className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:opacity-40 text-white font-extrabold text-xs"
                >
                  {isBn ? 'স্থায়ীভাবে মুছুন' : 'Delete Account'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
