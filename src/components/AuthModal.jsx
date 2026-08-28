import React, { useState } from 'react';
import { X, Mail, Lock, User, Sparkles, ArrowRight } from 'lucide-react';

export default function AuthModal({ isOpen, onClose, lang }) {
  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const isBn = lang === 'bn';

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isBn ? 'সফলভাবে সম্পন্ন হয়েছে!' : 'Logged in successfully!');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#131824] border border-[#232c3f] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0e121a] border-b border-[#1f2738] flex items-center justify-between">
          <div className="flex items-center gap-2 text-emerald-400 font-bold">
            <Sparkles size={18} />
            <span>{isSignUp ? (isBn ? 'নতুন একাউন্ট তৈরি করুন' : 'Create Account') : (isBn ? 'লগইন করুন' : 'Welcome Back')}</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2738] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                {isBn ? 'আপনার পূর্ণ নাম' : 'Full Name'}
              </label>
              <div className="relative">
                <User size={16} className="absolute left-3.5 top-3 text-slate-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={isBn ? 'নাম লিখুন' : 'Enter your name'}
                  className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {isBn ? 'ইমেইল বা ফোন নম্বর' : 'Email or Phone'}
            </label>
            <div className="relative">
              <Mail size={16} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@domain.com"
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {isBn ? 'পাসওয়ার্ড' : 'Password'}
            </label>
            <div className="relative">
              <Lock size={16} className="absolute left-3.5 top-3 text-slate-500" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full mt-2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/50 flex items-center justify-center gap-2 transition-all"
          >
            <span>{isSignUp ? (isBn ? 'সাইন আপ করুন' : 'Sign Up') : (isBn ? 'লগইন' : 'Log In')}</span>
            <ArrowRight size={16} />
          </button>

          <div className="pt-3 text-center border-t border-[#1d2536]">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs text-slate-400 hover:text-emerald-400 transition-colors"
            >
              {isSignUp
                ? (isBn ? 'ইতিমধ্যে অ্যাকাউন্ট আছে? লগইন করুন' : 'Already have an account? Log In')
                : (isBn ? 'নতুন ব্যবহারকারী? সাইন আপ করুন' : 'New here? Create an Account')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
