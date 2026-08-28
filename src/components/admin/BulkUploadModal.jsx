import React, { useState } from 'react';
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export default function BulkUploadModal({ isOpen, onClose, onBulkImport, lang }) {
  const isBn = lang === 'bn';
  const [inputText, setInputText] = useState('');
  const [selectedUnit, setSelectedUnit] = useState('Unit 1: Lesson 1 (Nelson Mandela)');

  if (!isOpen) return null;

  const sampleFormat = `Word, Bengali Meaning, Synonym, Antonym, Options, Correct(1-4), Question
Emancipation, মুক্তি, Liberation, Slavery, "Liberation | Enslavement | Persecution | Hesitation", 1, "What is the synonym of Emancipation?"
Apartheid, বর্ণবাদ, Segregation, Equality, "Segregation | Equality | Discrimination | Chauvinism", 2, "What is the antonym of Apartheid?"`;

  const handleImport = () => {
    if (!inputText.trim()) {
      alert(isBn ? 'অনুগ্রহ করে টেক্সট বা শব্দ তালিকা দিন' : 'Please paste word list or CSV text');
      return;
    }

    const lines = inputText.split('\n').filter((l) => l.trim().length > 0);
    const newQuestions = [];

    lines.forEach((line, index) => {
      // Basic comma or tab parser
      const parts = line.split(',').map((p) => p.trim());
      if (parts.length >= 2) {
        const word = parts[0];
        const bengaliMeaning = parts[1] || 'অর্থ দেওয়া নেই';
        const syn = parts[2] || '';
        const ant = parts[3] || '';

        newQuestions.push({
          id: `bulk-${Date.now()}-${index}`,
          word: word,
          bengaliMeaning: bengaliMeaning,
          unit: selectedUnit,
          partsOfSpeech: 'Noun',
          questionText: `What is the closest meaning/synonym of "${word}"?`,
          options: [
            syn || 'Option A',
            ant || 'Option B',
            'Option C',
            'Option D'
          ],
          correctOption: 0,
          synonyms: syn,
          antonyms: ant,
          exampleSentence: `Textbook context sentence for ${word}.`,
          boardExamTag: 'HSC Syllabus Board Prep',
          difficulty: 'Medium'
        });
      }
    });

    if (newQuestions.length > 0) {
      onBulkImport(newQuestions);
      alert(isBn ? `সফলভাবে ${newQuestions.length} টি শব্দ ও প্রশ্ন যোগ হয়েছে!` : `Successfully imported ${newQuestions.length} vocabulary questions!`);
      setInputText('');
      onClose();
    } else {
      alert(isBn ? 'সঠিক ফরম্যাটে কোনো শব্দ পাওয়া যায়নি' : 'Could not parse any valid words from the text');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="bg-[#131824] border border-[#232c3f] rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 bg-[#0e121a] border-b border-[#1f2738] flex items-center justify-between">
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-base md:text-lg">
            <UploadCloud size={20} />
            <span>{isBn ? 'HSC বইয়ের শব্দ একবারে ইমপোর্ট করুন (Bulk Import)' : 'Bulk Import HSC Vocabulary & Questions'}</span>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-[#1f2738] transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              {isBn ? 'টার্গেট অধ্যায় নির্বাচন করুন (Unit/Lesson)' : 'Select Target Unit / Chapter'}
            </label>
            <input
              type="text"
              value={selectedUnit}
              onChange={(e) => setSelectedUnit(e.target.value)}
              placeholder="e.g. Unit 1: Lesson 1 (Nelson Mandela)"
              className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-cyan-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-300">
                {isBn ? 'শব্দ তালিকা বা CSV পেস্ট করুন' : 'Paste Words or CSV Lines'}
              </label>
              <span className="text-[11px] text-slate-400">
                {isBn ? 'ফরম্যাট: Word, Meaning, Synonym, Antonym' : 'Format: Word, Meaning, Synonym, Antonym'}
              </span>
            </div>
            <textarea
              rows={8}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={`Emancipation, মুক্তি, Liberation, Slavery\nApartheid, বর্ণবাদ, Segregation, Equality\nShackles, শৃঙ্খল, Chains, Freedom\nVulnerable, অরক্ষিত, Fragile, Protected\nHazardous, ঝুঁকিপূর্ণ, Dangerous, Safe`}
              className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-cyan-500 rounded-xl p-3 text-sm text-white font-mono placeholder-slate-600 outline-none"
            />
          </div>

          <div className="p-3 bg-[#0e131e] rounded-xl border border-[#1b2333] text-xs text-slate-400 flex items-start gap-2">
            <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="text-slate-200 font-semibold block mb-0.5">
                {isBn ? '💡 দ্রুত ইমপোর্ট টিপ:' : '💡 Bulk Import Tip:'}
              </span>
              {isBn
                ? 'আপনি HSC বইয়ের অধ্যায় অনুযায়ী যেকোনো শব্দের তালিকা সরাসরি এখানে পেস্ট করতে পারেন। স্বয়ংক্রিয়ভাবে প্রতিটি শব্দের জন্য কুইজ ও শব্দকার্ড তৈরি হয়ে যাবে।'
                : 'You can paste full chapter vocabulary lists directly. The platform will automatically generate interactive quiz options and flashcards for every word.'}
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-[#1f2738] flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-semibold transition-colors"
            >
              {isBn ? 'বাতিল' : 'Cancel'}
            </button>

            <button
              type="button"
              onClick={handleImport}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-teal-600 hover:from-cyan-500 hover:to-teal-500 text-white text-sm font-bold shadow-lg shadow-cyan-950/40 inline-flex items-center gap-2 transition-all"
            >
              <UploadCloud size={16} />
              <span>{isBn ? 'শব্দগুলো ইমপোর্ট করুন' : 'Import Words Now'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
