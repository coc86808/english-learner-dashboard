import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Sparkles, 
  ArrowRight, 
  AlertCircle,
  CheckCircle2,
  GraduationCap,
  Shield,
  BookOpen
} from 'lucide-react';
import { saveUserToFirestore, signInWithGoogle } from '../services/firebase';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  lang = 'en', 
  onAuthSuccess,
  registeredUsers = [],
  onUpdateUsers
}) {
  // Views: 'google' (Main) | 'onboarding' (Name, College, Batch) | 'admin' (Discreet Admin Login)
  const [view, setView] = useState('google');
  const [currentUserData, setCurrentUserData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Onboarding Form State
  const [onboardingName, setOnboardingName] = useState('');
  const [onboardingCollege, setOnboardingCollege] = useState('');
  const [onboardingBatch, setOnboardingBatch] = useState('HSC 2026');

  // Admin Manual Form State
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  // 1. Google 1-Click Authentication
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setErrorMessage('');
    setSuccessMessage('');

    try {
      const res = await signInWithGoogle();
      setLoading(false);

      if (res && res.success && res.user) {
        // If user is Admin, bypass onboarding directly
        if (res.user.role === 'admin') {
          if (onAuthSuccess) onAuthSuccess(res.user);
          onClose();
          return;
        }

        // If user needs onboarding (first time sign-up or missing college/batch)
        if (res.needsOnboarding || !res.user.college || res.user.college === 'HSC College') {
          setCurrentUserData(res.user);
          setOnboardingName(res.user.name || '');
          setOnboardingCollege(res.user.college !== 'HSC College' ? res.user.college : '');
          setOnboardingBatch(res.user.hscBatch || 'HSC 2026');
          setView('onboarding');
        } else {
          // Returning student with completed profile
          if (onAuthSuccess) onAuthSuccess(res.user);
          onClose();
        }
      } else if (res && res.error) {
        setErrorMessage(res.error);
      }
    } catch (err) {
      setLoading(false);
      setErrorMessage(err.message || 'Google Sign-In failed');
    }
  };

  // 2. Complete Student Profile Onboarding
  const handleCompleteOnboarding = async (e) => {
    e.preventDefault();
    if (!onboardingName.trim()) {
      setErrorMessage(isBn ? 'অনুগ্রহ করে আপনার নাম লিখুন।' : 'Please enter your name.');
      return;
    }
    if (!onboardingCollege.trim()) {
      setErrorMessage(isBn ? 'অনুগ্রহ করে আপনার কলেজের নাম লিখুন।' : 'Please enter your college name.');
      return;
    }

    const completedProfile = {
      ...currentUserData,
      name: onboardingName.trim(),
      college: onboardingCollege.trim(),
      hscBatch: onboardingBatch
    };

    setLoading(true);
    await saveUserToFirestore(completedProfile);

    // Update local storage and app state
    try {
      const local = localStorage.getItem('hsc_registered_users');
      const parsed = local ? JSON.parse(local) : [];
      const updated = [completedProfile, ...parsed.filter((u) => u && u.email !== completedProfile.email)];
      localStorage.setItem('hsc_registered_users', JSON.stringify(updated));
      if (onUpdateUsers) onUpdateUsers(updated);
    } catch (err) {}

    setLoading(false);
    setSuccessMessage(isBn ? '✅ প্রোফাইল সফলভাবে তৈরি হয়েছে!' : '✅ Profile saved successfully!');

    setTimeout(() => {
      if (onAuthSuccess) onAuthSuccess(completedProfile);
      onClose();
      setView('google');
    }, 600);
  };

  // 3. Discreet Admin Login Handler
  const handleAdminSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    const normalizedEmail = (adminEmail || '').trim().toLowerCase();
    const cleanPassword = (adminPassword || '').trim();

    const isAdminAccount =
      (normalizedEmail === 'admin@learnerhub.com' ||
        normalizedEmail === 'sakin@gmail.com' ||
        normalizedEmail === 'sakin7112@gmail.com' ||
        normalizedEmail === 'sakinadmin' ||
        normalizedEmail === 'admin' ||
        normalizedEmail === 'sakin7112' ||
        normalizedEmail.includes('sakin')) &&
      (cleanPassword === 'AdminHSC@2026!' ||
        cleanPassword === 'Abc@#123' ||
        cleanPassword === 'Z%#91V4PrG');

    if (isAdminAccount) {
      const adminUser = {
        name: 'Master Admin (Sakin)',
        college: 'Learner Hub Management',
        batch: 'Admin Access',
        email: normalizedEmail || 'sakin@gmail.com',
        role: 'admin',
        points: 0,
        streak: 0
      };
      if (onAuthSuccess) onAuthSuccess(adminUser);
      onClose();
      setView('google');
      return;
    }

    setErrorMessage(isBn ? '❌ ভুল পাসওয়ার্ড বা ক্রেডেনশিয়াল।' : '❌ Invalid admin credentials.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#101522] border border-[#222e44] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a0e17] border-b border-[#1b2538] flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
            <Sparkles size={18} />
            <span>
              {view === 'onboarding'
                ? (isBn ? '🎓 শিক্ষার্থী প্রোফাইল সম্পন্ন করুন' : '🎓 Complete Student Profile')
                : view === 'admin'
                ? (isBn ? '👑 অ্যাডমিন লগইন' : '👑 Master Admin Login')
                : (isBn ? 'HSC 2026 Learner Hub' : 'HSC 2026 Learner Hub')}
            </span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1.5 rounded-xl hover:bg-[#1b2538] transition-colors cursor-pointer"
          >
            <X size={18} />
          </button>
        </div>

        {/* Error / Success Feedback Banner */}
        {errorMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-start gap-2 animate-in fade-in">
            <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-start gap-2 animate-in fade-in">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: GOOGLE 1-CLICK SIGN-IN / SIGN-UP (PRIMARY)            */}
        {/* ------------------------------------------------------------- */}
        {view === 'google' && (
          <div className="p-6 space-y-6 text-center">
            <div className="space-y-2">
              <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-tr from-emerald-500 to-teal-400 flex items-center justify-center text-slate-950 shadow-lg shadow-emerald-950/60 ring-2 ring-emerald-500/30">
                <BookOpen size={28} className="stroke-[2.5]" />
              </div>
              <h3 className="text-lg font-black text-white tracking-tight">
                {isBn ? 'Google দিয়ে ১-ক্লিকে শুরু করুন' : 'Sign in with Google to Start Free'}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {isBn 
                  ? 'কোনো পাসওয়ার্ড ছাড়াই গুগল দিয়ে অ্যাকাউন্ট খুলুন। পরীক্ষার স্কোর ও প্রোগ্রেস ক্লাউডে অটো সেভ থাকবে।'
                  : 'Instant access without manual passwords. Your quiz scores, flashcards, and progress automatically sync to cloud.'}
              </p>
            </div>

            {/* Google Sign-In Button */}
            <button
              type="button"
              disabled={loading}
              onClick={handleGoogleSignIn}
              className="w-full py-3.5 px-4 rounded-2xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-xl hover:shadow-2xl active:scale-95 cursor-pointer disabled:opacity-50"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>{loading ? (isBn ? 'লগইন হচ্ছে...' : 'Connecting...') : (isBn ? 'Google অ্যাকাউন্ট দিয়ে প্রবেশ করুন' : 'Continue with Google')}</span>
            </button>

            {/* Feature Highlights */}
            <div className="pt-2 flex items-center justify-center gap-4 text-[11px] text-slate-400 font-medium border-t border-[#1b2538]">
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-400" />
                {isBn ? '১০০% ফ্রি' : '100% Free'}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-400" />
                {isBn ? 'ক্লাউড সিঙ্ক' : 'Cloud Sync'}
              </span>
              <span className="flex items-center gap-1">
                <CheckCircle2 size={13} className="text-emerald-400" />
                {isBn ? '১২টি ইউনিট' : '12 Units'}
              </span>
            </div>

            {/* Discreet Admin Link */}
            <div className="pt-1 text-center">
              <button
                type="button"
                onClick={() => {
                  setView('admin');
                  setErrorMessage('');
                }}
                className="text-[11px] text-slate-500 hover:text-slate-400 transition-colors cursor-pointer"
              >
                {isBn ? 'অ্যাডমিন এক্সেস' : 'Admin Access'}
              </button>
            </div>
          </div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: POST-GOOGLE SIGN-UP ONBOARDING (NAME, COLLEGE, BATCH)  */}
        {/* ------------------------------------------------------------- */}
        {view === 'onboarding' && (
          <form onSubmit={handleCompleteOnboarding} className="p-6 space-y-4">
            <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/25 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-emerald-500/40">
                <img
                  src={currentUserData?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'}
                  alt="Google Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-white truncate">{currentUserData?.name}</p>
                <p className="text-[11px] text-emerald-400 truncate">{currentUserData?.email}</p>
              </div>
            </div>

            {/* Full Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={onboardingName}
                  onChange={(e) => setOnboardingName(e.target.value)}
                  placeholder={isBn ? 'যেমন: Sakin Ahmed' : 'e.g. Sakin Ahmed'}
                  className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            {/* College Name */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'কলেজের নাম *' : 'College Name *'}
              </label>
              <div className="relative">
                <Building size={15} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={onboardingCollege}
                  onChange={(e) => setOnboardingCollege(e.target.value)}
                  placeholder={isBn ? 'যেমন: Notre Dame College, Dhaka' : 'e.g. Notre Dame College, Dhaka'}
                  className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            {/* HSC Batch Selector */}
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {isBn ? 'এইচএসসি ব্যাচ *' : 'HSC Batch *'}
              </label>
              <div className="grid grid-cols-3 gap-2">
                {['HSC 2025', 'HSC 2026', 'HSC 2027'].map((batch) => (
                  <button
                    key={batch}
                    type="button"
                    onClick={() => setOnboardingBatch(batch)}
                    className={`py-2 px-3 rounded-xl font-bold text-xs border transition-all cursor-pointer ${
                      onboardingBatch === batch
                        ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/50'
                        : 'bg-[#151c2c] text-slate-400 border-[#232f44] hover:text-white'
                    }`}
                  >
                    {batch}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-3 py-3.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95 disabled:opacity-50"
            >
              <span>{loading ? (isBn ? 'সংরক্ষণ হচ্ছে...' : 'Saving...') : (isBn ? '🚀 ড্যাশবোর্ডে প্রবেশ করুন' : '🚀 Enter Dashboard')}</span>
              <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 3: DISCREET MASTER ADMIN PASSWORD LOGIN                   */}
        {/* ------------------------------------------------------------- */}
        {view === 'admin' && (
          <form onSubmit={handleAdminSubmit} className="p-6 space-y-4">
            <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold">
              <Shield size={16} />
              <span>{isBn ? 'মাস্টার অ্যাডমিন লগইন ফর্ম' : 'Master Admin Confidential Access'}</span>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'অ্যাডমিন ইমেইল / ইউজারনেম' : 'Admin Email / Username'}
              </label>
              <div className="relative">
                <Mail size={15} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="sakin@gmail.com / sakin7112"
                  className="w-full bg-[#151c2c] border border-[#232f44] focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'অ্যাডমিন পাসওয়ার্ড' : 'Admin Password'}
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#151c2c] border border-[#232f44] focus:border-purple-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-purple-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
            >
              <span>{isBn ? 'অ্যাডমিন প্যানেলে প্রবেশ করুন' : 'Unlock Admin Panel'}</span>
              <ArrowRight size={16} />
            </button>

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setView('google');
                  setErrorMessage('');
                }}
                className="text-xs font-medium text-slate-400 hover:text-white transition-colors cursor-pointer"
              >
                {isBn ? '← গুগল সাইন-ইন-এ ফিরে যান' : '← Back to Google Sign-In'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
