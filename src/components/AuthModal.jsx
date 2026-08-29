import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  Building, 
  Sparkles, 
  ArrowRight, 
  Zap, 
  AlertCircle,
  CheckCircle2,
  ShieldCheck,
  GraduationCap 
} from 'lucide-react';
import { saveUserToFirestore, signInWithGoogle } from '../services/firebase';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  lang = 'en', 
  isSignUpDefault = true,
  onAuthSuccess,
  registeredUsers = [],
  onUpdateUsers
}) {
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  const handleSwitchMode = (signUpMode) => {
    setIsSignUp(signUpMode);
    setErrorMessage('');
    setSuccessMessage('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');

    const normalizedEmail = (email || '').trim().toLowerCase();
    const cleanPassword = (password || '').trim();

    if (!normalizedEmail) {
      setErrorMessage(isBn ? 'ইমেইল বা ইউজারনেম আবশ্যক।' : 'Email or username is required.');
      return;
    }

    if (!cleanPassword) {
      setErrorMessage(isBn ? 'পাসওয়ার্ড আবশ্যক।' : 'Password is required.');
      return;
    }

    // -------------------------------------------------------------
    // 1. REGISTRATION (SIGN UP) MODE
    // -------------------------------------------------------------
    if (isSignUp) {
      if (!name.trim()) {
        setErrorMessage(isBn ? 'অনুগ্রহ করে আপনার পূর্ণ নাম লিখুন।' : 'Please enter your full name.');
        return;
      }

      if (!college.trim()) {
        setErrorMessage(isBn ? 'অনুগ্রহ করে আপনার কলেজের নাম লিখুন।' : 'Please enter your college name.');
        return;
      }

      if (cleanPassword.length < 6) {
        setErrorMessage(isBn ? 'পাসওয়ার্ড অন্তত ৬ অক্ষরের হতে হবে।' : 'Password must be at least 6 characters long.');
        return;
      }

      if (cleanPassword !== confirmPassword.trim()) {
        setErrorMessage(isBn ? 'পাসওয়ার্ড দুটি মেলেনি! পুনরায় যাচাই করুন।' : 'Passwords do not match! Please retype.');
        return;
      }

      // Check if user already exists
      const existingUser = (registeredUsers || []).find(
        (u) =>
          (u.email && u.email.toLowerCase() === normalizedEmail) ||
          (u.phone && u.phone === normalizedEmail)
      );

      if (existingUser || normalizedEmail === 'admin@learnerhub.com' || normalizedEmail === 'sakin7112') {
        setErrorMessage(
          isBn
            ? 'এই ইমেইল বা ইউজারনেম দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট তৈরি আছে। দয়া করে লগইন করুন।'
            : 'An account with this email/username already exists. Please Sign In.'
        );
        return;
      }

      // Create & Register New Student
      const newStudent = {
        id: `usr-${Date.now()}`,
        name: name.trim(),
        college: college.trim(),
        hscBatch: 'HSC 2026',
        email: normalizedEmail,
        phone: normalizedEmail,
        password: cleanPassword,
        role: 'student',
        streak: 0,
        points: 0,
        testsCompleted: 0,
        masteredWordsCount: 0,
        status: 'Active',
        joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
        avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop`
      };

      // Save to Cloud Firestore & Local State immediately
      saveUserToFirestore(newStudent);
      const currentLocal = (() => {
        try {
          const raw = localStorage.getItem('hsc_registered_users');
          if (raw) {
            const p = JSON.parse(raw);
            if (Array.isArray(p) && p.length > 0) return p;
          }
        } catch (e) {}
        return Array.isArray(registeredUsers) ? registeredUsers : [];
      })();

      const updatedList = [newStudent, ...currentLocal.filter((u) => u && u.email !== newStudent.email)];
      try {
        localStorage.setItem('hsc_registered_users', JSON.stringify(updatedList));
      } catch (e) {}
      if (onUpdateUsers) onUpdateUsers(updatedList);

      setSuccessMessage(isBn ? '✅ সফলভাবে রেজিস্ট্রেশন সম্পন্ন হয়েছে!' : '✅ Registration successful!');

      setTimeout(() => {
        if (onAuthSuccess) onAuthSuccess(newStudent);
        onClose();
      }, 700);
      return;
    }

    // -------------------------------------------------------------
    // 2. SIGN IN (LOGIN) MODE - STRICT VERIFICATION
    // -------------------------------------------------------------

    // Check Master Admin Account
    const isAdminAccount =
      (normalizedEmail === 'admin@learnerhub.com' ||
        normalizedEmail === 'sakin@gmail.com' ||
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
      return;
    }

    // Merge latest memory users with latest localStorage users
    const allUsers = (() => {
      try {
        const local = localStorage.getItem('hsc_registered_users');
        if (local) {
          const parsed = JSON.parse(local);
          if (Array.isArray(parsed) && parsed.length > 0) {
            const map = new Map();
            (registeredUsers || []).forEach((u) => u && u.email && map.set(u.email.toLowerCase().trim(), u));
            parsed.forEach((u) => u && u.email && map.set(u.email.toLowerCase().trim(), u));
            return Array.from(map.values());
          }
        }
      } catch (e) {}
      return registeredUsers || [];
    })();

    // Smart typo correction for @gamil.com -> @gmail.com
    const cleanEmail = normalizedEmail.replace('@gamil.', '@gmail.');

    // Look for Registered Student in database
    const matchedUser = allUsers.find(
      (u) =>
        (u.email && (u.email.toLowerCase().trim() === normalizedEmail || u.email.toLowerCase().trim() === cleanEmail)) ||
        (u.phone && (u.phone.trim() === normalizedEmail || u.phone.trim() === cleanEmail)) ||
        (u.name && u.name.toLowerCase().trim() === normalizedEmail)
    );

    // If Account does not exist -> Block login & require registration!
    if (!matchedUser) {
      setErrorMessage(
        isBn
          ? '❌ এই অ্যাকাউন্টটি নিবন্ধিত নয়। দয়া করে প্রথমে সাইন আপ (রেজিস্ট্রেশন) করুন।'
          : '❌ Account not found! Please register (Sign Up) first.'
      );
      return;
    }

    // Verify Password
    const isPasswordValid =
      matchedUser.password === cleanPassword ||
      (!matchedUser.password && cleanPassword === 'Student@123');

    if (!isPasswordValid) {
      setErrorMessage(
        isBn
          ? '❌ ভুল পাসওয়ার্ড! অনুগ্রহ করে আপনার সঠিক পাসওয়ার্ড দিন।'
          : '❌ Incorrect password! Please check and enter the correct password.'
      );
      return;
    }

    // Login Success
    if (onAuthSuccess) {
      onAuthSuccess({
        ...matchedUser,
        role: matchedUser.role || 'student'
      });
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#101522] border border-[#222e44] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[95vh] overflow-y-auto">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a0e17] border-b border-[#1b2538] flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
            <Sparkles size={18} />
            <span>
              {isSignUp 
                ? (isBn ? 'নতুন স্টুডেন্ট রেজিস্ট্রেশন (Sign Up)' : 'Student Registration (Sign Up)') 
                : (isBn ? 'লগইন করুন (Sign In)' : 'Welcome Back (Sign In)')}
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
          <div className="mx-5 mb-2 p-3 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-300 text-xs font-semibold flex items-start gap-2 animate-in fade-in">
            <AlertCircle size={16} className="text-rose-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="mx-5 mb-2 p-3 rounded-xl bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-semibold flex items-start gap-2 animate-in fade-in">
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* 1-Click Google Sign In */}
        <div className="p-5 pb-0">
          <button
            type="button"
            onClick={async () => {
              setErrorMessage('');
              const res = await signInWithGoogle();
              if (res && res.success) {
                if (onAuthSuccess) onAuthSuccess(res.user);
                onClose();
              } else if (res && res.error) {
                setErrorMessage(res.error);
              }
            }}
            className="w-full py-2.5 px-4 rounded-xl bg-[#182030] hover:bg-[#202b40] border border-[#2c3b54] text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24">
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
            <span>{isBn ? 'Google দিয়ে ১-ক্লিকে লগইন' : 'Continue with Google'}</span>
          </button>

          <div className="relative flex py-3.5 items-center">
            <div className="flex-grow border-t border-[#1e273a]"></div>
            <span className="flex-shrink mx-3 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
              {isSignUp ? (isBn ? 'অথবা তথ্য দিয়ে সাইন আপ' : 'Or with Email Form') : (isBn ? 'অথবা ইমেইল দিয়ে লগইন' : 'Or Sign In with Email')}
            </span>
            <div className="flex-grow border-t border-[#1e273a]"></div>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 pt-0 space-y-3.5">
          {isSignUp && (
            <>
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'আপনার পূর্ণ নাম *' : 'Full Name *'}
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isBn ? 'যেমন: Tanvir Ahmed' : 'e.g. Tanvir Ahmed'}
                    className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'কলেজের নাম *' : 'College Name *'}
                </label>
                <div className="relative">
                  <Building size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder={isBn ? 'যেমন: Notre Dame College, Dhaka' : 'e.g. Notre Dame College, Dhaka'}
                    className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isSignUp 
                ? (isBn ? 'ইমেইল বা ফোন নম্বর *' : 'Email or Phone Number *')
                : (isBn ? 'ইমেইল বা ইউজারনেম *' : 'Email or Username *')}
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="text"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={isSignUp ? (isBn ? 'ইমেইল বা ফোন নম্বর (e.g. 017xxxxxxxx)' : 'student@hsc2026.edu / 017xxxxxxxx') : (isBn ? 'ইমেইল বা ইউজারনেম' : 'student@hsc2026.edu / username')}
                className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isSignUp ? (isBn ? 'পাসওয়ার্ড (কমপক্ষে ৬ অক্ষর) *' : 'Password (min 6 chars) *') : (isBn ? 'পাসওয়ার্ড *' : 'Password *')}
            </label>
            <div className="relative">
              <Lock size={15} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                {isBn ? 'পাসওয়ার্ড নিশ্চিত করুন *' : 'Confirm Password *'}
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="password"
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <span>{isSignUp ? (isBn ? 'রেজিস্ট্রেশন সম্পন্ন করুন' : 'Complete Registration') : (isBn ? 'লগইন করুন' : 'Sign In Now')}</span>
            <ArrowRight size={16} />
          </button>

          <div className="pt-3 text-center border-t border-[#1b2436]">
            <button
              type="button"
              onClick={() => handleSwitchMode(!isSignUp)}
              className="text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {isSignUp
                ? (isBn ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন' : 'Already have an account? Sign In')
                : (isBn ? 'নতুন ব্যবহারকারী? ফ্রি রেজিস্ট্রেশন করুন' : "Don't have an account? Register Free")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
