import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FileText,
  Plus,
  Search,
  Trash2,
  Edit3,
  Download,
  Upload,
  Pin,
  Tag,
  BookOpen,
  Calendar,
  Clock,
  Sparkles,
  Check,
  CheckCircle2,
  Copy,
  Layers,
  Printer,
  X,
  Eye,
  Bold,
  Italic,
  List,
  ListOrdered,
  Quote,
  Heading2,
  Highlighter,
  FileDown
} from 'lucide-react';
import { hscUnits } from '../../data/hscUnitsData';

// Default starter notes if storage is empty
const INITIAL_STARTER_NOTES = [
  {
    id: 'note-starter-1',
    title: "Unit 1 L1: The Parrot's Tale — Core Satire & Metaphor",
    unitId: 'unit-1',
    lessonId: 'u1-l1',
    tags: ['Passage Summary', 'Satire', 'Board Focus'],
    isPinned: true,
    content: `### Main Literary Themes of "The Parrot's Tale" (তোতাকাহিনী)
- **Author**: Rabindranath Tagore (রবীন্দ্রনাথ ঠাকুর)
- **Genre**: Allegorical Satire (রূপকধর্মী ব্যঙ্গাত্মক গল্প)

#### Key Takeaways for Board Exam:
1. **The Golden Cage (সোনার খাঁচা)** represents the expensive, superficial infrastructure of the colonial education system that prioritizes outward grandeur over real human learning.
2. **Force-feeding of texts (পুঁথির পাতা গেলানো)** symbolizes mechanical rote learning and memorization without critical thinking or genuine understanding.
3. **The Goldsmith & Scribes** represent the corrupt middlemen and profiteers who thrive on educational commerce while the actual student (the bird) starves to death.

#### Crucial Vocabulary:
- **Detractor** (নিন্দুক / সমালোচক) — *Synonyms*: Critic, disparager
- **Exquisite** (নিখুঁত ও চমৎকার) — *Synonyms*: Delicate, magnificent
- **Gilded** (সোনার জলে মোড়ানো) — *Synonyms*: Gold-plated, ornate`,
    createdAt: '2026-08-28T10:00:00Z',
    updatedAt: '2026-08-28T10:00:00Z'
  },
  {
    id: 'note-starter-2',
    title: 'Unit 10 L1: Global Manners & Cultural Etiquette Matrix',
    unitId: 'unit-10',
    lessonId: 'u10-l1',
    tags: ['Vocabulary', 'Curriculum Matrix', 'Exam Tips'],
    isPinned: false,
    content: `### Comparison of Cultural Manners Across 4 Regions

| Region | Dining Rule | Gift Protocol | Greetings Gesture |
| :--- | :--- | :--- | :--- |
| **China** 🇨🇳 | Don't make noise eating soup; avoid pointing with chopsticks | Refuse gift politely before accepting; no white flowers | Soft handshake; greet the eldest/senior first |
| **South Africa** 🇿🇦 | Oldest man begins eating first; don't use left hand | Bring flowers & chocolates; share gift costs | Handshake with direct eye contact; women may nod |
| **Great Britain** 🇬🇧 | Use fork to soak sauce with bread (never fingers) | Host gift: flowers or chocolates; open on receipt | Formal handshake; cheek kiss only for close opposite sex |
| **Middle East** 🇸🇦 | Use RIGHT hand only; never left hand on table | Food gifts (sweets, dates); given to show respect | "Assalamu Alaykum"; same-sex cheek kiss / hugs common |

*Remember: In Board MCQs, question distractors frequently test right vs left hand usage in Middle East & South Africa!*`,
    createdAt: '2026-08-29T14:30:00Z',
    updatedAt: '2026-08-29T14:30:00Z'
  }
];

export default function NotesPage({ lang = 'en', onNavigate }) {
  const isBn = lang === 'bn';

  // Notes state
  const [notes, setNotes] = useState(() => {
    try {
      const saved = localStorage.getItem('hsc_student_notes');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return INITIAL_STARTER_NOTES;
  });

  // Editor State
  const [selectedNoteId, setSelectedNoteId] = useState(notes[0]?.id || null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState('');
  const [editContent, setEditContent] = useState('');
  const [editUnitId, setEditUnitId] = useState('unit-1');
  const [editLessonId, setEditLessonId] = useState('u1-l1');
  const [editTags, setEditTags] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [saveStatus, setSaveStatus] = useState('saved'); // 'saved' | 'saving' | 'unsaved'

  // Filter & Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [activeUnitFilter, setActiveUnitFilter] = useState('all');
  const [activeTagFilter, setActiveTagFilter] = useState('all');
  const [copiedNoteId, setCopiedNoteId] = useState(null);

  const textareaRef = useRef(null);

  // Sync with localStorage & custom events
  useEffect(() => {
    try {
      localStorage.setItem('hsc_student_notes', JSON.stringify(notes));
    } catch (e) {}
  }, [notes]);

  useEffect(() => {
    const handleStorageSync = () => {
      try {
        const saved = localStorage.getItem('hsc_student_notes');
        if (saved) {
          const parsed = JSON.parse(saved);
          if (Array.isArray(parsed)) setNotes(parsed);
        }
      } catch (e) {}
    };

    window.addEventListener('hsc_student_notes_updated', handleStorageSync);
    window.addEventListener('storage', handleStorageSync);
    return () => {
      window.removeEventListener('hsc_student_notes_updated', handleStorageSync);
      window.removeEventListener('storage', handleStorageSync);
    };
  }, []);

  // Currently selected note
  const activeNote = useMemo(() => {
    return notes.find((n) => n.id === selectedNoteId) || notes[0] || null;
  }, [notes, selectedNoteId]);

  // Available unique tags
  const allTags = useMemo(() => {
    const set = new Set();
    notes.forEach((n) => {
      if (Array.isArray(n.tags)) {
        n.tags.forEach((t) => set.add(t));
      }
    });
    return Array.from(set);
  }, [notes]);

  // Filtered Notes List
  const filteredNotes = useMemo(() => {
    return notes.filter((n) => {
      const matchesSearch =
        !searchQuery.trim() ||
        n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        n.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (Array.isArray(n.tags) && n.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));

      const matchesUnit = activeUnitFilter === 'all' || n.unitId === activeUnitFilter;
      const matchesTag = activeTagFilter === 'all' || (Array.isArray(n.tags) && n.tags.includes(activeTagFilter));

      return matchesSearch && matchesUnit && matchesTag;
    }).sort((a, b) => {
      // Pinned notes first, then latest updated
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return new Date(b.updatedAt || 0) - new Date(a.updatedAt || 0);
    });
  }, [notes, searchQuery, activeUnitFilter, activeTagFilter]);

  // Trigger Edit on active note
  const handleStartEdit = (noteToEdit = activeNote) => {
    if (!noteToEdit) return;
    setSelectedNoteId(noteToEdit.id);
    setEditTitle(noteToEdit.title);
    setEditContent(noteToEdit.content);
    setEditUnitId(noteToEdit.unitId || 'unit-1');
    setEditLessonId(noteToEdit.lessonId || 'u1-l1');
    setEditTags(noteToEdit.tags || []);
    setIsEditing(true);
    setIsPreviewMode(false);
  };

  // Create brand new note
  const handleCreateNewNote = () => {
    const newNote = {
      id: `note-${Date.now()}`,
      title: isBn ? 'নতুন স্টাডি নোট' : 'Untitled Study Note',
      unitId: activeUnitFilter !== 'all' ? activeUnitFilter : 'unit-1',
      lessonId: 'u1-l1',
      tags: ['General'],
      isPinned: false,
      content: isBn
        ? '### নতুন নোটের বিবরণ\n\nএখানে আপনার পাঠ্যবইয়ের সারসংক্ষেপ, গুরুত্বপূর্ণ ব্যাকরণ বা ভোকাবুলারি নোট লিখুন...'
        : '### Study Takeaways\n\nWrite your passage summary, grammar notes, or important vocabulary points here...',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const next = [newNote, ...notes];
    setNotes(next);
    setSelectedNoteId(newNote.id);
    handleStartEdit(newNote);
  };

  // Save changes to current note
  const handleSaveNote = () => {
    if (!selectedNoteId) return;
    setSaveStatus('saving');

    const next = notes.map((n) => {
      if (n.id === selectedNoteId) {
        return {
          ...n,
          title: editTitle.trim() || (isBn ? 'শিরোনামহীন নোট' : 'Untitled Note'),
          content: editContent,
          unitId: editUnitId,
          lessonId: editLessonId,
          tags: editTags,
          updatedAt: new Date().toISOString()
        };
      }
      return n;
    });

    setNotes(next);
    setIsEditing(false);
    setTimeout(() => setSaveStatus('saved'), 400);

    // Notify other components (like QuickNoteFAB or dashboard)
    window.dispatchEvent(new CustomEvent('hsc_student_notes_updated'));
  };

  // Toggle Pin Status
  const handleTogglePin = (noteId, e) => {
    if (e) e.stopPropagation();
    const next = notes.map((n) => {
      if (n.id === noteId) {
        return { ...n, isPinned: !n.isPinned };
      }
      return n;
    });
    setNotes(next);
  };

  // Delete note
  const handleDeleteNote = (noteId, e) => {
    if (e) e.stopPropagation();
    const confirmed = window.confirm(
      isBn ? 'আপনি কি নিশ্চিত যে এই নোটটি মুছে ফেলতে চান?' : 'Are you sure you want to delete this note?'
    );
    if (!confirmed) return;

    const next = notes.filter((n) => n.id !== noteId);
    setNotes(next);
    if (selectedNoteId === noteId) {
      setSelectedNoteId(next[0]?.id || null);
      setIsEditing(false);
    }
  };

  // Duplicate note
  const handleDuplicateNote = (note) => {
    const copy = {
      ...note,
      id: `note-${Date.now()}`,
      title: `${note.title} (Copy)`,
      isPinned: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    setNotes([copy, ...notes]);
    setSelectedNoteId(copy.id);
  };

  // Copy Markdown to clipboard
  const handleCopyContent = (note) => {
    if (!note) return;
    navigator.clipboard.writeText(note.content);
    setCopiedNoteId(note.id);
    setTimeout(() => setCopiedNoteId(null), 2000);
  };

  // Export all notes as JSON
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(notes, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `HSC_English_Study_Notes_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Export current note as TXT/Markdown
  const handleExportMarkdown = (note = activeNote) => {
    if (!note) return;
    const fileContent = `# ${note.title}\nUnit: ${note.unitId} | Lesson: ${note.lessonId}\nTags: ${note.tags?.join(', ')}\nLast Updated: ${note.updatedAt}\n\n---\n\n${note.content}`;
    const dataStr = 'data:text/markdown;charset=utf-8,' + encodeURIComponent(fileContent);
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `${note.title.replace(/[^a-zA-Z0-9_-]/g, '_')}.md`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Markdown Toolbar helper to insert tags
  const insertFormatting = (prefix, suffix = '') => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const previousText = textarea.value;
    const selected = previousText.substring(start, end) || 'text';

    const replacement = `${prefix}${selected}${suffix}`;
    const newContent = previousText.substring(0, start) + replacement + previousText.substring(end);

    setEditContent(newContent);
    setTimeout(() => {
      textarea.focus();
      textarea.setSelectionRange(start + prefix.length, start + prefix.length + selected.length);
    }, 50);
  };

  // Add Tag
  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^#/, '');
      if (val && !editTags.includes(val)) {
        setEditTags([...editTags, val]);
        setTagInput('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setEditTags(editTags.filter((t) => t !== tagToRemove));
  };

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Header Banner */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-7 shadow-card flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-cyan-400 text-xs font-bold bg-cyan-500/10 px-3 py-1 rounded-full border border-cyan-500/20">
            <FileText size={14} />
            <span>{isBn ? 'ব্যক্তিগত পড়ার নোটবুক' : 'Personal Study Notepad & Takeaways'}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isBn ? 'এইচএসসি স্টাডি নোটস' : 'HSC English Study Notes'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            {isBn
              ? 'ইউনিট ও লেসন অনুযায়ী গুরুত্বপূর্ণ সারসংক্ষেপ, ব্যাকরণ নিয়ম এবং পরীক্ষার টিপস সংরক্ষণ করুন।'
              : 'Organize passage analyses, critical vocabulary tables, and revision summaries by Unit & Lesson.'}
          </p>
        </div>

        {/* Global Action CTAs */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportJSON}
            title="Download all notes as JSON backup"
            className="px-3.5 py-2.5 rounded-xl bg-[#162033] hover:bg-[#1f2d48] border border-[#2b3b59] text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-all shadow-sm active:scale-95"
          >
            <Download size={14} className="text-cyan-400" />
            <span>{isBn ? 'ব্যাকআপ JSON' : 'Export JSON'}</span>
          </button>

          <button
            onClick={handleCreateNewNote}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold flex items-center gap-2 shadow-lg shadow-emerald-950/60 active:scale-95 transition-all"
          >
            <Plus size={15} />
            <span>{isBn ? 'নতুন নোট তৈরি করুন' : 'New Note'}</span>
          </button>
        </div>
      </div>

      {/* Main 2-Column Interface: Notes Sidebar + Active Editor/Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Search, Tag Filters & Note List (5 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Search & Unit Filter Card */}
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-4 sm:p-5 shadow-card space-y-3">
            {/* Search Input */}
            <div className="relative">
              <Search size={15} className="absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isBn ? 'নোটের শিরোনাম বা কি-ওয়ার্ড খুঁজুন...' : 'Search notes or tags...'}
                className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl pl-9 pr-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-slate-500 hover:text-slate-300"
                >
                  <X size={14} />
                </button>
              )}
            </div>

            {/* Unit Dropdown Filter */}
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold text-slate-400 shrink-0">
                {isBn ? 'ইউনিট:' : 'Unit:'}
              </span>
              <select
                value={activeUnitFilter}
                onChange={(e) => setActiveUnitFilter(e.target.value)}
                className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="all">{isBn ? 'সকল ইউনিট (All Units)' : 'All Units'}</option>
                {hscUnits.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.unitNumber}: {u.unitTitle}
                  </option>
                ))}
              </select>
            </div>

            {/* Tag Pills Filter */}
            {allTags.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <button
                  onClick={() => setActiveTagFilter('all')}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    activeTagFilter === 'all'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'bg-[#162033] text-slate-400 hover:text-white border border-[#232f44]'
                  }`}
                >
                  All Tags ({notes.length})
                </button>
                {allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => setActiveTagFilter(t)}
                    className={`px-2 py-0.5 rounded-lg text-[10px] font-semibold transition-all ${
                      activeTagFilter === t
                        ? 'bg-emerald-500 text-slate-950 font-bold'
                        : 'bg-[#141b2a] text-slate-400 hover:text-emerald-300 border border-[#1d273a]'
                    }`}
                  >
                    #{t}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Notes Cards List */}
          <div className="space-y-3 max-h-[680px] overflow-y-auto pr-1">
            {filteredNotes.length === 0 ? (
              <div className="p-8 rounded-3xl bg-[#111723] border border-[#1e293b] text-center space-y-2">
                <FileText size={32} className="mx-auto text-slate-600" />
                <h4 className="font-bold text-white text-sm">
                  {isBn ? 'কোনো নোট পাওয়া যায়নি' : 'No Notes Found'}
                </h4>
                <p className="text-xs text-slate-400">
                  {isBn ? 'নতুন নোট তৈরি করতে উপরের বোতামে চাপুন।' : 'Try adjusting your search filter or create a new note.'}
                </p>
              </div>
            ) : (
              filteredNotes.map((n) => {
                const isSelected = n.id === selectedNoteId;
                return (
                  <div
                    key={n.id}
                    onClick={() => {
                      setSelectedNoteId(n.id);
                      setIsEditing(false);
                    }}
                    className={`p-4 rounded-2xl border transition-all cursor-pointer relative group space-y-2.5 ${
                      isSelected
                        ? 'bg-gradient-to-r from-[#162238] to-[#121929] border-cyan-500 shadow-lg shadow-cyan-950/40 ring-1 ring-cyan-500/30'
                        : 'bg-[#111723] border-[#1e293b] hover:border-slate-600 hover:bg-[#141b2a]'
                    }`}
                  >
                    {/* Top Row: Unit Tag & Pin Action */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                          {n.unitId ? n.unitId.toUpperCase() : 'UNIT'}
                        </span>
                        {n.isPinned && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/40 flex items-center gap-1">
                            <Pin size={10} className="fill-current" />
                            <span>Pinned</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => handleTogglePin(n.id, e)}
                          title={n.isPinned ? 'Unpin' : 'Pin to top'}
                          className={`p-1 rounded hover:bg-[#1f2d48] transition-colors ${
                            n.isPinned ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'
                          }`}
                        >
                          <Pin size={13} className={n.isPinned ? 'fill-current' : ''} />
                        </button>
                        <button
                          onClick={(e) => handleDeleteNote(n.id, e)}
                          title="Delete note"
                          className="p-1 rounded text-slate-500 hover:text-rose-400 hover:bg-rose-950/30 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>

                    {/* Note Title */}
                    <h3 className="font-bold text-white text-sm leading-snug line-clamp-2">
                      {n.title}
                    </h3>

                    {/* Content Snippet */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-sans">
                      {n.content.replace(/[#*`_>|]/g, '')}
                    </p>

                    {/* Tags & Timestamp Footer */}
                    <div className="flex items-center justify-between pt-1 border-t border-[#1a2336] text-[10px] text-slate-500">
                      <div className="flex items-center gap-1 flex-wrap truncate pr-2">
                        {Array.isArray(n.tags) &&
                          n.tags.slice(0, 2).map((t, idx) => (
                            <span key={idx} className="text-emerald-400/90 font-medium">
                              #{t}
                            </span>
                          ))}
                        {n.tags?.length > 2 && (
                          <span className="text-slate-500">+{n.tags.length - 2}</span>
                        )}
                      </div>
                      <span className="shrink-0">
                        {new Date(n.updatedAt || n.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Column: Active Note Editor or Viewer (8 cols) */}
        <div className="lg:col-span-8">
          {activeNote ? (
            <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-5 sm:p-7 shadow-card space-y-5 min-h-[640px] flex flex-col justify-between">
              {isEditing ? (
                /* EDIT MODE */
                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Edit Header Bar */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#1e293b]">
                    <div className="flex items-center gap-2">
                      <Edit3 size={18} className="text-emerald-400" />
                      <span className="font-bold text-white text-sm">
                        {isBn ? 'নোট সম্পাদনা (Edit Mode)' : 'Editing Note'}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setIsPreviewMode(!isPreviewMode)}
                        className={`px-3 py-1.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all ${
                          isPreviewMode
                            ? 'bg-cyan-500 text-slate-950 border-cyan-400'
                            : 'bg-[#162033] border-[#293b59] text-slate-300 hover:text-white'
                        }`}
                      >
                        <Eye size={14} />
                        <span>{isPreviewMode ? (isBn ? 'এডিটর' : 'Editor') : (isBn ? 'প্রিভিউ' : 'Live Preview')}</span>
                      </button>

                      <button
                        onClick={() => setIsEditing(false)}
                        className="px-3 py-1.5 rounded-xl bg-[#162033] hover:bg-[#1e2a40] border border-[#273752] text-slate-300 text-xs font-semibold"
                      >
                        {isBn ? 'বাতিল' : 'Cancel'}
                      </button>

                      <button
                        onClick={handleSaveNote}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                      >
                        <Check size={14} />
                        <span>{isBn ? 'সংরক্ষণ করুন' : 'Save Changes'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Title & Unit Selectors */}
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder={isBn ? 'নোটের শিরোনাম লিখুন...' : 'Enter note title...'}
                      className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-2xl px-4 py-3 text-base font-bold text-white focus:outline-none focus:border-cyan-500"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">
                          {isBn ? 'ইউনিট নির্বাচন:' : 'Assign Unit:'}
                        </label>
                        <select
                          value={editUnitId}
                          onChange={(e) => setEditUnitId(e.target.value)}
                          className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        >
                          {hscUnits.map((u) => (
                            <option key={u.id} value={u.id}>
                              {u.unitNumber}: {u.unitTitle}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div>
                        <label className="text-[11px] font-bold text-slate-400 block mb-1">
                          {isBn ? 'লেসন ট্যাগ:' : 'Lesson Tag / Ref:'}
                        </label>
                        <input
                          type="text"
                          value={editLessonId}
                          onChange={(e) => setEditLessonId(e.target.value)}
                          placeholder="e.g. u1-l1, Lesson 1"
                          className="w-full bg-[#0c0f17] border border-[#1e293b] rounded-xl px-3 py-2 text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Formatting Toolbar */}
                  {!isPreviewMode && (
                    <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-xl bg-[#0c0f17] border border-[#1e293b] text-slate-300 text-xs">
                      <button
                        type="button"
                        onClick={() => insertFormatting('**', '**')}
                        title="Bold (**text**)"
                        className="p-1.5 rounded-lg hover:bg-[#1a2336] text-slate-300 hover:text-white"
                      >
                        <Bold size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('*', '*')}
                        title="Italic (*text*)"
                        className="p-1.5 rounded-lg hover:bg-[#1a2336] text-slate-300 hover:text-white"
                      >
                        <Italic size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('### ')}
                        title="Heading (### Heading)"
                        className="p-1.5 rounded-lg hover:bg-[#1a2336] text-slate-300 hover:text-white"
                      >
                        <Heading2 size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('- ')}
                        title="Bullet List (- item)"
                        className="p-1.5 rounded-lg hover:bg-[#1a2336] text-slate-300 hover:text-white"
                      >
                        <List size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('1. ')}
                        title="Numbered List (1. item)"
                        className="p-1.5 rounded-lg hover:bg-[#1a2336] text-slate-300 hover:text-white"
                      >
                        <ListOrdered size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('> ')}
                        title="Blockquote (> quote)"
                        className="p-1.5 rounded-lg hover:bg-[#1a2336] text-slate-300 hover:text-white"
                      >
                        <Quote size={14} />
                      </button>
                      <button
                        type="button"
                        onClick={() => insertFormatting('`', '`')}
                        title="Inline Code / Key Term"
                        className="p-1.5 rounded-lg hover:bg-[#1a2336] text-slate-300 hover:text-white font-mono"
                      >
                        &lt;/&gt;
                      </button>

                      <div className="h-4 w-px bg-slate-700 mx-1" />

                      <button
                        type="button"
                        onClick={() => insertFormatting('| Column 1 | Column 2 |\n| :--- | :--- |\n| Data 1 | Data 2 |\n')}
                        className="px-2 py-1 rounded bg-[#162033] hover:bg-[#1f2d48] text-[11px] font-semibold text-emerald-300"
                      >
                        + Table
                      </button>
                    </div>
                  )}

                  {/* Body Textarea or Preview */}
                  <div className="flex-1 flex flex-col min-h-[320px]">
                    {isPreviewMode ? (
                      <div className="flex-1 p-5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] text-slate-200 leading-relaxed text-sm whitespace-pre-line font-sans overflow-y-auto">
                        {editContent}
                      </div>
                    ) : (
                      <textarea
                        ref={textareaRef}
                        value={editContent}
                        onChange={(e) => setEditContent(e.target.value)}
                        placeholder={isBn ? 'নোটের বিস্তারিত বিবরণ লিখুন (Markdown ফরম্যাট সমর্থিত)...' : 'Write your notes here (Markdown supported)...'}
                        className="flex-1 w-full p-4 rounded-2xl bg-[#0c0f17] border border-[#1e293b] text-slate-200 text-sm font-mono leading-relaxed focus:outline-none focus:border-cyan-500 resize-none min-h-[320px]"
                      />
                    )}
                  </div>

                  {/* Tag Management */}
                  <div className="space-y-2 pt-2 border-t border-[#1e293b]">
                    <span className="text-[11px] font-bold text-slate-400 block">
                      {isBn ? 'ট্যাগ যুক্ত করুন (Enter চাপুন):' : 'Add Tags (press Enter):'}
                    </span>
                    <div className="flex flex-wrap items-center gap-2">
                      {editTags.map((tag) => (
                        <span
                          key={tag}
                          className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold"
                        >
                          #{tag}
                          <button
                            type="button"
                            onClick={() => handleRemoveTag(tag)}
                            className="hover:text-rose-400"
                          >
                            <X size={12} />
                          </button>
                        </span>
                      ))}
                      <input
                        type="text"
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyDown={handleAddTag}
                        placeholder={isBn ? '+ ট্যাগ লিখুন' : '+ add tag'}
                        className="bg-[#0c0f17] border border-[#1e293b] rounded-lg px-2.5 py-1 text-xs text-slate-200 focus:outline-none focus:border-emerald-500 w-28"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                /* VIEWER MODE */
                <div className="space-y-5 flex-1 flex flex-col justify-between">
                  {/* View Header Bar */}
                  <div className="space-y-3 pb-4 border-b border-[#1e293b]">
                    <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                            {activeNote.unitId ? activeNote.unitId.toUpperCase() : 'UNIT'}
                          </span>
                          {activeNote.lessonId && (
                            <span className="text-xs font-medium px-2 py-0.5 rounded bg-[#162033] text-slate-300 border border-[#233148]">
                              {activeNote.lessonId}
                            </span>
                          )}
                          {activeNote.isPinned && (
                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                              <Pin size={11} className="fill-current" />
                              <span>Pinned</span>
                            </span>
                          )}
                        </div>

                        <h2 className="text-xl sm:text-2xl font-black text-white leading-tight">
                          {activeNote.title}
                        </h2>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          onClick={() => handleCopyContent(activeNote)}
                          title="Copy content"
                          className="p-2 rounded-xl bg-[#162033] hover:bg-[#1e2d48] border border-[#273854] text-slate-300 hover:text-white transition-all text-xs flex items-center gap-1.5"
                        >
                          {copiedNoteId === activeNote.id ? (
                            <>
                              <Check size={14} className="text-emerald-400" />
                              <span className="text-emerald-400 font-bold">Copied!</span>
                            </>
                          ) : (
                            <>
                              <Copy size={14} />
                              <span className="hidden sm:inline">Copy</span>
                            </>
                          )}
                        </button>

                        <button
                          onClick={() => handleExportMarkdown(activeNote)}
                          title="Download as Markdown file"
                          className="p-2 rounded-xl bg-[#162033] hover:bg-[#1e2d48] border border-[#273854] text-slate-300 hover:text-white transition-all"
                        >
                          <FileDown size={15} />
                        </button>

                        <button
                          onClick={() => handleStartEdit(activeNote)}
                          className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
                        >
                          <Edit3 size={14} />
                          <span>{isBn ? 'সম্পাদনা করুন' : 'Edit Note'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Metadata & Tag List */}
                    <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        {Array.isArray(activeNote.tags) &&
                          activeNote.tags.map((t, idx) => (
                            <span
                              key={idx}
                              className="px-2.5 py-0.5 rounded-lg bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 text-[11px] font-semibold"
                            >
                              #{t}
                            </span>
                          ))}
                      </div>
                      <span className="text-[11px] text-slate-500 flex items-center gap-1">
                        <Clock size={12} />
                        <span>Last updated: {new Date(activeNote.updatedAt || activeNote.createdAt).toLocaleString()}</span>
                      </span>
                    </div>
                  </div>

                  {/* Note Body Render */}
                  <div className="flex-1 p-5 rounded-2xl bg-[#0c0f17] border border-[#1e293b] text-slate-200 text-sm leading-relaxed whitespace-pre-line font-sans overflow-y-auto space-y-3">
                    {activeNote.content}
                  </div>

                  {/* Footer Context Bar */}
                  <div className="pt-3 border-t border-[#1e293b] flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDuplicateNote(activeNote)}
                        className="hover:text-slate-200 transition-colors"
                      >
                        {isBn ? 'নোটের প্রতিলিপি তৈরি করুন' : 'Duplicate Note'}
                      </button>
                      <span>•</span>
                      <button
                        onClick={() => handleDeleteNote(activeNote.id)}
                        className="hover:text-rose-400 transition-colors"
                      >
                        {isBn ? 'নোট মুছুন' : 'Delete Note'}
                      </button>
                    </div>

                    <span className="text-[11px] text-slate-500">
                      💾 Saved to localStorage • Auto-synced
                    </span>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="bg-[#111723] border border-[#1e293b] rounded-3xl p-12 shadow-card text-center space-y-4">
              <FileText size={48} className="mx-auto text-slate-600" />
              <h3 className="text-xl font-bold text-white">
                {isBn ? 'কোনো নোট নির্বাচিত নেই' : 'No Note Selected'}
              </h3>
              <p className="text-sm text-slate-400 max-w-md mx-auto">
                {isBn
                  ? 'বামপাশের তালিকা থেকে একটি নোট নির্বাচন করুন অথবা নতুন নোট তৈরি করতে বোতামে চাপুন।'
                  : 'Select an existing study note from the left sidebar or create a new one to begin taking notes.'}
              </p>
              <button
                onClick={handleCreateNewNote}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs inline-flex items-center gap-2"
              >
                <Plus size={15} />
                <span>{isBn ? 'নতুন নোট শুরু করুন' : 'Create First Note'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
