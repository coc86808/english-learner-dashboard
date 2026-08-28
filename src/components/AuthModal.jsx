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
  GraduationCap 
} from 'lucide-react';

export default function AuthModal({ 
  isOpen, 
  onClose, 
  lang = 'en', 
  isSignUpDefault = true,
  onAuthSuccess 
}) {
  const [isSignUp, setIsSignUp] = useState(isSignUpDefault);
  const [name, setName] = useState('');
  const [college, setCollege] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = {
      name: name || 'Tanvir Ahmed',
      college: college || 'Notre Dame College, Dhaka',
      batch: 'HSC 2026',
      email: email || 'tanvir@student.edu'
    };
    if (onAuthSuccess) {
      onAuthSuccess(user);
    }
    onClose();
  };

  const handleDemoLogin = () => {
    const demoUser = {
      name: 'Tanvir Ahmed',
      college: 'Notre Dame College, Dhaka',
      batch: 'HSC 2026',
      email: 'tanvir.demo@hsc2026.edu'
    };
    if (onAuthSuccess) {
      onAuthSuccess(demoUser);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#101522] border border-[#222e44] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0a0e17] border-b border-[#1b2538] flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm sm:text-base">
            <Sparkles size={18} />
            <span>
              {isSignUp 
                ? (isBn ? 'নতুন একাউন্ট খুলুন (Sign Up)' : 'Create Student Account') 
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

        {/* 1-Click Demo Login Banner for Instant Testing */}
        <div className="p-5 pb-0">
          <button
            type="button"
            onClick={handleDemoLogin}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-amber-500/20 hover:from-amber-500/30 hover:to-orange-500/30 border border-amber-500/40 text-amber-300 font-bold text-xs flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm active:scale-95"
          >
            <Zap size={16} className="fill-amber-400 text-amber-400" />
            <span>{isBn ? '⚡ ১-ক্লিকে ডেমো স্টুডেন্ট লগইন করুন' : '⚡ 1-Click Instant Demo Login'}</span>
          </button>
          
          <div className="relative flex py-4 items-center">
            <div className="flex-grow border-t border-[#1e273a]"></div>
            <span className="flex-shrink mx-3 text-slate-500 text-[11px] font-semibold uppercase tracking-wider">
              {isBn ? 'অথবা ইমেইল দিয়ে' : 'Or with Email'}
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
                  {isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'}
                </label>
                <div className="relative">
                  <User size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={isBn ? 'নাম লিখুন (যেমন: Tanvir Ahmed)' : 'e.g. Tanvir Ahmed'}
                    className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'কলেজের নাম' : 'College Name'}
                </label>
                <div className="relative">
                  <Building size={15} className="absolute left-3.5 top-3 text-slate-500" />
                  <input
                    type="text"
                    value={college}
                    onChange={(e) => setCollege(e.target.value)}
                    placeholder={isBn ? 'যেমন: Notre Dame College' : 'e.g. Notre Dame College'}
                    className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
                  />
                </div>
              </div>
            </>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isBn ? 'ইমেইল বা ফোন নম্বর' : 'Email or Phone'}
            </label>
            <div className="relative">
              <Mail size={15} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@hsc2026.edu"
                className="w-full bg-[#151c2c] border border-[#232f44] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1">
              {isBn ? 'পাসওয়ার্ড' : 'Password'}
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

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-emerald-950/60 flex items-center justify-center gap-2 transition-all cursor-pointer active:scale-95"
          >
            <span>{isSignUp ? (isBn ? 'সাইন আপ সম্পন্ন করুন' : 'Complete Sign Up') : (isBn ? 'লগইন করুন' : 'Sign In Now')}</span>
            <ArrowRight size={16} />
          </button>

          <div className="pt-3 text-center border-t border-[#1b2436]">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-medium text-slate-400 hover:text-emerald-400 transition-colors cursor-pointer"
            >
              {isSignUp
                ? (isBn ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন' : 'Already have an account? Sign In')
                : (isBn ? 'নতুন ব্যবহারকারী? ফ্রি সাইন আপ করুন' : "Don't have an account? Sign Up Free")}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
