import React, { useState, useRef, useEffect } from 'react';
import { X, Sparkles, Send, Bot, User, CornerDownLeft, RefreshCw } from 'lucide-react';

export default function AIPracticeModal({ isOpen, onClose, lang }) {
  const isBn = lang === 'bn';

  const [messages, setMessages] = useState([
    {
      sender: 'ai',
      text: isBn
        ? 'হ্যালো! আমি আপনার AI স্টাডি সহকারী। ইংরেজি গ্রামার, ভোকাবুলারি বা কোনো পরীক্ষার প্রশ্ন নিয়ে যেকোনো সাহায্য চান?'
        : 'Hello! I am your AI study assistant. Need help with English grammar, vocabulary, or exam questions?'
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  if (!isOpen) return null;

  const quickPrompts = isBn
    ? [
        'Appropriate Preposition এর ৫টি নিয়ম বলুন',
        'IELTS এর জন্য ৫টি দরকারি Synonym দিন',
        'বাক্য শুদ্ধি: "He is senior than me" কেন ভুল?',
        'Daily English Conversation প্র্যাকটিস করি'
      ]
    : [
        'Explain 5 common rules of prepositions',
        'Give me 5 high-band IELTS synonyms',
        'Grammar check: Why is "He is senior than me" incorrect?',
        'Let\'s practice a short daily conversation'
      ];

  const handleSend = (textToSend) => {
    const query = textToSend || inputText;
    if (!query.trim()) return;

    // Add user message
    setMessages((prev) => [...prev, { sender: 'user', text: query }]);
    setInputText('');
    setIsTyping(true);

    // Simulate smart AI response
    setTimeout(() => {
      let response = '';

      if (query.includes('senior') || query.includes('ভুল')) {
        response = isBn
          ? '👉 উত্তর: "He is senior to me" সঠিক হবে। কারণ Latin Comparative Adjectives যেমন Senior, Junior, Superior, Inferior, Prior ইত্যাদির পর "than" না বসে "to" বসে।'
          : '👉 Answer: The correct sentence is "He is senior to me". Words derived from Latin comparatives (senior, junior, superior, inferior, prior) take the preposition "to", not "than".';
      } else if (query.includes('Synonym') || query.includes('ভোকাবুলারি')) {
        response = isBn
          ? '🌟 ৫টি গুরুত্বপূর্ণ Vocabulary & Synonyms:\n1. Meticulous = Thorough, Diligent (পুঙ্খানুপুঙ্খ)\n2. Ephemeral = Short-lived, Fleeting (ক্ষণস্থায়ী)\n3. Ubiquitous = Omnipresent, Pervasive (সর্বব্যাপী)\n4. Pragmatic = Practical, Realistic (বাস্তবধর্মী)\n5. Eloquent = Articulate, Fluent (বাকপটু)'
          : '🌟 5 Essential High-Band Synonyms:\n1. Meticulous = Thorough, Diligent\n2. Ephemeral = Short-lived, Fleeting\n3. Ubiquitous = Omnipresent, Pervasive\n4. Pragmatic = Practical, Realistic\n5. Eloquent = Fluent, Expressive';
      } else if (query.includes('Preposition') || query.includes('নিয়ম')) {
        response = isBn
          ? '📘 Preposition এর কিছু গুরুত্বপূর্ণ নিয়ম:\n1. Abide by (মেনে চলা) - You must abide by the rules.\n2. Addicted to (আসক্ত) - He is addicted to gaming.\n3. Congratulate on (অভিনন্দন জানানো) - I congratulate you on your success.\n4. Rely on (ভরসা করা) - You can rely on me.'
          : '📘 Key Preposition Rules:\n1. Abide by = You must abide by the rules.\n2. Addicted to = He is addicted to learning.\n3. Congratulate on = I congratulate you on your success.\n4. Depend/Rely on = You can rely on us.';
      } else {
        response = isBn
          ? `খুব চমৎকার প্রশ্ন! "${query}" সম্পর্কে বিস্তারিত জানুন: নিয়মমাফিক নিয়মিত অনুশীলন এবং বিগত বছরের প্রশ্ন সমাধান করলে আপনি এই বিষয়ে সর্বোচ্চ দক্ষতা অর্জন করতে পারবেন। কোনো নির্দিষ্ট উদাহরণ অনুশীলন করতে চান?`
          : `Great question regarding "${query}"! Daily practice and contextual usage will help you master this concept completely. Would you like a practice sentence on this?`;
      }

      setMessages((prev) => [...prev, { sender: 'ai', text: response }]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-[#131824] border border-[#232c3f] rounded-2xl w-full max-w-2xl h-[80vh] flex flex-col overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0e121a] border-b border-[#1f2738] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-900/40">
              <Sparkles size={17} />
            </div>
            <div>
              <h3 className="text-white font-bold text-sm md:text-base flex items-center gap-2">
                <span>{isBn ? 'চর্চা AI টিউটর' : 'Practice AI Tutor'}</span>
                <span className="text-[10px] font-semibold bg-purple-500/20 text-purple-300 px-2 py-0.5 rounded-full border border-purple-500/30">
                  GPT-Powered
                </span>
              </h3>
              <p className="text-[11px] text-slate-400">
                {isBn ? '২৪/৭ ইংরেজি ও ভর্তি পরীক্ষার সঙ্গী' : '24/7 English & Exam Companion'}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2738] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'ai' && (
                <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300 shrink-0 mt-0.5">
                  <Bot size={15} />
                </div>
              )}

              <div
                className={`p-3.5 rounded-2xl max-w-[82%] text-sm whitespace-pre-line leading-relaxed shadow-sm ${
                  msg.sender === 'user'
                    ? 'bg-emerald-600 text-white rounded-br-none'
                    : 'bg-[#182030] text-slate-200 border border-[#222c40] rounded-bl-none'
                }`}
              >
                {msg.text}
              </div>

              {msg.sender === 'user' && (
                <div className="w-7 h-7 rounded-lg bg-emerald-600/30 border border-emerald-500/30 flex items-center justify-center text-emerald-300 shrink-0 mt-0.5">
                  <User size={15} />
                </div>
              )}
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center text-xs text-purple-400">
              <div className="w-7 h-7 rounded-lg bg-purple-600/30 border border-purple-500/30 flex items-center justify-center text-purple-300">
                <RefreshCw size={13} className="animate-spin" />
              </div>
              <span className="bg-[#182030] px-3 py-1.5 rounded-xl border border-[#222c40]">
                {isBn ? 'AI ভাবছে...' : 'AI is typing...'}
              </span>
            </div>
          )}

          <div ref={chatEndRef} />
        </div>

        {/* Quick Suggestion Prompts */}
        <div className="px-4 py-2 bg-[#0e121a]/80 border-t border-[#1a2130] flex gap-2 overflow-x-auto no-scrollbar">
          {quickPrompts.map((prompt, i) => (
            <button
              key={i}
              onClick={() => handleSend(prompt)}
              className="text-xs bg-[#161c2b] hover:bg-purple-900/30 border border-[#252f44] hover:border-purple-500/40 text-slate-300 hover:text-purple-300 px-3 py-1.5 rounded-full shrink-0 transition-all"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-4 bg-[#0e121a] border-t border-[#1f2738]">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isBn
                  ? 'আপনার প্রশ্ন বা বাক্যটি এখানে লিখুন...'
                  : 'Type your question or English sentence here...'
              }
              className="flex-1 bg-[#161c2b] border border-[#232c3f] focus:border-purple-500 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white shadow-md shadow-purple-950/40 transition-all"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
