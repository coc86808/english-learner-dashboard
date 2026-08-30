import React, { useState, useMemo } from 'react';
import {
  Users,
  Search,
  UserPlus,
  Shield,
  ShieldAlert,
  Trash2,
  Edit3,
  Award,
  Flame,
  CheckCircle2,
  Ban,
  Filter,
  Key,
  Download,
  FileSpreadsheet,
  FileCode,
  Copy,
  Check,
  RefreshCw,
  X,
  AlertCircle,
  Clock,
  Sparkles,
  ChevronDown,
  GraduationCap
} from 'lucide-react';

export default function UserManagement({ users = [], onUpdateUsers, lang = 'en' }) {
  const isBn = lang === 'bn';

  // Search, Filter & Sort State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All'); // 'All' | 'Student' | 'Admin' | 'Active' | 'Pending' | 'Banned'
  const [sortBy, setSortBy] = useState('default'); // 'default' | 'name' | 'streak' | 'points' | 'newest'

  // Modals & Drawers State
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [passwordResetUser, setPasswordResetUser] = useState(null);
  const [newPasswordValue, setNewPasswordValue] = useState('');
  const [copiedNotice, setCopiedNotice] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  // New/Edit User Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    college: 'Notre Dame College, Dhaka',
    hscBatch: 'HSC 2026',
    role: 'Student',
    status: 'Active',
    password: ''
  });

  // Helper to trigger floating toast
  const showToast = (message, type = 'success') => {
    setToastMessage({ message, type });
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  // Helper to generate strong temporary password
  const generateStrongPassword = () => {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnpqrstuvwxyz23456789!@#$%&*';
    let pass = 'HSC@';
    for (let i = 0; i < 6; i++) {
      pass += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pass + '!26';
  };

  // 1. Filtered & Sorted Users List
  const processedUsers = useMemo(() => {
    let result = (users || []).filter((u) => {
      if (!u) return false;
      const term = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !term ||
        (u.name && u.name.toLowerCase().includes(term)) ||
        (u.email && u.email.toLowerCase().includes(term)) ||
        (u.college && u.college.toLowerCase().includes(term)) ||
        (u.phone && u.phone.toLowerCase().includes(term)) ||
        (u.hscBatch && u.hscBatch.toLowerCase().includes(term));

      let matchesStatus = true;
      if (statusFilter === 'Student') {
        matchesStatus = (u.role || '').toLowerCase() === 'student';
      } else if (statusFilter === 'Admin') {
        matchesStatus = (u.role || '').toLowerCase() === 'admin';
      } else if (statusFilter === 'Active') {
        matchesStatus = (u.status || '').toLowerCase() === 'active';
      } else if (statusFilter === 'Pending') {
        matchesStatus = (u.status || '').toLowerCase() === 'pending';
      } else if (statusFilter === 'Banned') {
        matchesStatus = (u.status || '').toLowerCase() === 'banned' || (u.status || '').toLowerCase() === 'suspended';
      }

      return matchesSearch && matchesStatus;
    });

    // Sorting
    if (sortBy === 'name') {
      result.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (sortBy === 'streak') {
      result.sort((a, b) => (b.streak || 0) - (a.streak || 0));
    } else if (sortBy === 'points') {
      result.sort((a, b) => (b.points || 0) - (a.points || 0));
    } else if (sortBy === 'newest') {
      result.sort((a, b) => (b.id || '').localeCompare(a.id || ''));
    }

    return result;
  }, [users, searchTerm, statusFilter, sortBy]);

  // KPI Calculations
  const stats = useMemo(() => {
    const total = (users || []).length;
    const active = (users || []).filter((u) => (u.status || '').toLowerCase() === 'active').length;
    const admins = (users || []).filter((u) => (u.role || '').toLowerCase() === 'admin').length;
    const pending = (users || []).filter((u) => (u.status || '').toLowerCase() === 'pending').length;
    const banned = (users || []).filter((u) => (u.status || '').toLowerCase() === 'banned' || (u.status || '').toLowerCase() === 'suspended').length;
    return { total, active, admins, pending, banned };
  }, [users]);

  // 1-Click Action 1: Authorize / Approve Account
  const handleAuthorizeUser = (userId) => {
    const targetUser = users.find((u) => u.id === userId);
    const updated = users.map((u) => (u.id === userId ? { ...u, status: 'Active' } : u));
    onUpdateUsers(updated);
    showToast(
      isBn
        ? `✓ ${targetUser?.name || 'ব্যবহারকারী'} এর অ্যাকাউন্ট সফলভাবে অনুমোদিত হয়েছে!`
        : `✓ Account for ${targetUser?.name || 'User'} is now Authorized & Active!`,
      'success'
    );
  };

  // 1-Click Action 2: Ban / Suspend / Unban Account
  const handleToggleBanStatus = (userId) => {
    const targetUser = users.find((u) => u.id === userId);
    const isCurrentlyActive = (targetUser?.status || '').toLowerCase() === 'active';
    const nextStatus = isCurrentlyActive ? 'Banned' : 'Active';

    const updated = users.map((u) => (u.id === userId ? { ...u, status: nextStatus } : u));
    onUpdateUsers(updated);

    if (nextStatus === 'Banned') {
      showToast(
        isBn
          ? `🚫 ${targetUser?.name || 'ব্যবহারকারী'} কে সাময়িকভাবে ব্যান করা হয়েছে।`
          : `🚫 ${targetUser?.name || 'User'} has been Suspended/Banned.`,
        'danger'
      );
    } else {
      showToast(
        isBn
          ? `✓ ${targetUser?.name || 'ব্যবহারকারী'} এর ব্যান প্রত্যাহার করা হয়েছে।`
          : `✓ Ban lifted for ${targetUser?.name || 'User'}. Account restored to Active.`,
        'success'
      );
    }
  };

  // 1-Click Action 3: Role Switch (Student <-> Admin)
  const handleToggleRole = (userId) => {
    const targetUser = users.find((u) => u.id === userId);
    const currentRole = (targetUser?.role || 'Student').toLowerCase();
    const nextRole = currentRole === 'admin' ? 'Student' : 'Admin';

    const updated = users.map((u) => (u.id === userId ? { ...u, role: nextRole } : u));
    onUpdateUsers(updated);

    showToast(
      isBn
        ? `🛡️ ${targetUser?.name || 'ব্যবহারকারী'} এর রোল পরিবর্তন করে '${nextRole}' করা হয়েছে।`
        : `🛡️ Role for ${targetUser?.name || 'User'} changed to '${nextRole}'.`,
      'info'
    );
  };

  // 1-Click Action 4: Open Password Reset Modal
  const handleOpenPasswordReset = (user) => {
    setPasswordResetUser(user);
    setNewPasswordValue(generateStrongPassword());
    setCopiedNotice(false);
  };

  // Save Password Reset
  const handleSavePasswordReset = (e) => {
    e.preventDefault();
    if (!passwordResetUser || !newPasswordValue.trim()) return;

    const updated = users.map((u) =>
      u.id === passwordResetUser.id ? { ...u, password: newPasswordValue.trim() } : u
    );
    onUpdateUsers(updated);

    showToast(
      isBn
        ? `🔑 ${passwordResetUser.name} এর নতুন পাসওয়ার্ড সফলভাবে আপডেট করা হয়েছে!`
        : `🔑 Password for ${passwordResetUser.name} has been reset successfully!`,
      'success'
    );
    setPasswordResetUser(null);
  };

  // Copy Password to Clipboard
  const handleCopyPassword = () => {
    if (!newPasswordValue) return;
    navigator.clipboard?.writeText(newPasswordValue);
    setCopiedNotice(true);
    setTimeout(() => setCopiedNotice(false), 2500);
  };

  // Add or Edit User Handler
  const handleSaveUser = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) return;

    if (editingUser) {
      const updated = users.map((u) =>
        u.id === editingUser.id ? { ...u, ...formData } : u
      );
      onUpdateUsers(updated);
      showToast(
        isBn
          ? `✓ ${formData.name} এর তথ্য সফলভাবে আপডেট হয়েছে!`
          : `✓ User ${formData.name} updated successfully!`,
        'success'
      );
      setEditingUser(null);
    } else {
      const created = {
        ...formData,
        id: `usr-${Date.now()}`,
        streak: 1,
        points: 50,
        testsCompleted: 0,
        masteredWordsCount: 0,
        joinedDate: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      };
      onUpdateUsers([created, ...users]);
      showToast(
        isBn
          ? `✓ নতুন শিক্ষার্থী ${formData.name} সফলভাবে যোগ করা হয়েছে!`
          : `✓ New student ${formData.name} registered successfully!`,
        'success'
      );
    }

    setIsAddUserOpen(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      college: 'Notre Dame College, Dhaka',
      hscBatch: 'HSC 2026',
      role: 'Student',
      status: 'Active',
      password: ''
    });
  };

  // Delete User Handler
  const handleDeleteUser = (user) => {
    const confirmMsg = isBn
      ? `আপনি কি নিশ্চিত '${user.name}' ব্যবহারকারীকে সম্পূর্ণ মুছে ফেলতে চান?`
      : `Are you sure you want to permanently delete user '${user.name}'?`;

    if (window.confirm(confirmMsg)) {
      const updated = users.filter((u) => u.id !== user.id);
      onUpdateUsers(updated);
      showToast(
        isBn
          ? `🗑️ ${user.name} এর অ্যাকাউন্ট মুছে ফেলা হয়েছে।`
          : `🗑️ User ${user.name} removed from roster.`,
        'danger'
      );
    }
  };

  // Open Edit Modal
  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name || '',
      email: user.email || '',
      phone: user.phone || '',
      college: user.college || 'Notre Dame College, Dhaka',
      hscBatch: user.hscBatch || 'HSC 2026',
      role: user.role || 'Student',
      status: user.status || 'Active',
      password: user.password || ''
    });
    setIsAddUserOpen(true);
  };

  // Export User Roster to CSV
  const handleExportCSV = () => {
    const headers = [
      'User ID',
      'Full Name',
      'Email Address',
      'Phone Number',
      'College Name',
      'HSC Batch',
      'System Role',
      'Account Status',
      'Active Streak (Days)',
      'Total Points (XP)',
      'Mastered Words',
      'Joined Date'
    ];

    let csvContent = headers.join(',') + '\n';

    (users || []).forEach((u) => {
      const row = [
        `"${u.id || ''}"`,
        `"${(u.name || '').replace(/"/g, '""')}"`,
        `"${(u.email || '').replace(/"/g, '""')}"`,
        `"${(u.phone || '').replace(/"/g, '""')}"`,
        `"${(u.college || '').replace(/"/g, '""')}"`,
        `"${u.hscBatch || ''}"`,
        `"${u.role || 'Student'}"`,
        `"${u.status || 'Active'}"`,
        u.streak || 0,
        u.points || 0,
        u.masteredWordsCount || 0,
        `"${u.joinedDate || 'Recent'}"`
      ];
      csvContent += row.join(',') + '\n';
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hsc_student_roster_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      isBn ? '📥 শিক্ষার্থীদের রোস্টার CSV ফরম্যাটে ডাউনলোড হয়েছে!' : '📥 User roster exported to CSV successfully!',
      'success'
    );
  };

  // Export User Roster to JSON
  const handleExportJSON = () => {
    const jsonStr = JSON.stringify(users, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `hsc_users_backup_${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showToast(
      isBn ? '📥 সম্পূর্ণ ব্যবহারকারী ডাটা JSON ফরম্যাটে এক্সপোর্ট হয়েছে!' : '📥 Full user roster exported to JSON backup!',
      'success'
    );
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      {/* Floating Action Toast */}
      {toastMessage && (
        <div
          className={`fixed top-5 right-5 z-50 px-4 py-3 rounded-2xl border shadow-2xl backdrop-blur-xl text-xs sm:text-sm font-bold flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-300 ${
            toastMessage.type === 'danger'
              ? 'bg-rose-950/95 border-rose-500/60 text-rose-200 shadow-rose-950/50'
              : toastMessage.type === 'info'
              ? 'bg-purple-950/95 border-purple-500/60 text-purple-200 shadow-purple-950/50'
              : 'bg-emerald-950/95 border-emerald-500/60 text-emerald-200 shadow-emerald-950/50'
          }`}
        >
          {toastMessage.type === 'danger' ? (
            <AlertCircle size={16} className="text-rose-400 shrink-0" />
          ) : toastMessage.type === 'info' ? (
            <Shield size={16} className="text-purple-400 shrink-0" />
          ) : (
            <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
          )}
          <span>{toastMessage.message}</span>
        </div>
      )}

      {/* Top Header & Bulk Export Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 bg-[#111723] border border-[#1e293b] p-5 sm:p-6 rounded-3xl shadow-card">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
              Master Admin Control
            </span>
            <span className="text-[11px] font-semibold text-slate-400">
              HSC 2026 Batch
            </span>
          </div>
          <h2 className="text-white font-extrabold text-xl md:text-2xl flex items-center gap-2.5">
            <Users className="text-emerald-400" size={24} />
            <span>{isBn ? 'শিক্ষার্থী ও ব্যবহারকারী ব্যবস্থাপনা' : 'Student & User Management'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            {isBn
              ? '১-ক্লিকে অ্যাকাউন্ট অনুমোদন, রোল পরিবর্তন, পাসওয়ার্ড রিসেট ও পারফরম্যান্স নিয়ন্ত্রণ।'
              : '1-click account authorization, role switching, password resets, and student roster management.'}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Export CSV Button */}
          <button
            onClick={handleExportCSV}
            title="Export roster to CSV"
            className="px-3.5 py-2.5 rounded-xl bg-[#161e2e] hover:bg-[#1f2b42] border border-[#22304a] text-slate-200 hover:text-emerald-400 text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <FileSpreadsheet size={15} className="text-emerald-400" />
            <span>{isBn ? 'CSV এক্সপোর্ট' : 'Export CSV'}</span>
          </button>

          {/* Export JSON Button */}
          <button
            onClick={handleExportJSON}
            title="Export full JSON backup"
            className="px-3.5 py-2.5 rounded-xl bg-[#161e2e] hover:bg-[#1f2b42] border border-[#22304a] text-slate-200 hover:text-cyan-400 text-xs font-bold inline-flex items-center gap-1.5 transition-all shadow-md active:scale-95 cursor-pointer"
          >
            <FileCode size={15} className="text-cyan-400" />
            <span>{isBn ? 'JSON ব্যাকআপ' : 'JSON Backup'}</span>
          </button>

          {/* Add New Student Button */}
          <button
            onClick={() => {
              setEditingUser(null);
              setFormData({
                name: '',
                email: '',
                phone: '',
                college: 'Notre Dame College, Dhaka',
                hscBatch: 'HSC 2026',
                role: 'Student',
                status: 'Active',
                password: generateStrongPassword()
              });
              setIsAddUserOpen(true);
            }}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-xs md:text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-950/60 active:scale-95 transition-all cursor-pointer"
          >
            <UserPlus size={16} />
            <span>{isBn ? 'নতুন শিক্ষার্থী যোগ' : 'Add New Student'}</span>
          </button>
        </div>
      </div>

      {/* KPI Overview Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
        <div className="bg-[#111723] border border-[#1e293b] p-4 rounded-2xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">{isBn ? 'মোট শিক্ষার্থী' : 'Total Learners'}</span>
            <span className="text-2xl font-black text-white">{stats.total}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <Users size={20} />
          </div>
        </div>

        <div className="bg-[#111723] border border-[#1e293b] p-4 rounded-2xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">{isBn ? 'অনুমোদিত / সক্রিয়' : 'Active & Authorized'}</span>
            <span className="text-2xl font-black text-emerald-400">{stats.active}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
            <CheckCircle2 size={20} />
          </div>
        </div>

        <div className="bg-[#111723] border border-[#1e293b] p-4 rounded-2xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">{isBn ? 'অ্যাডমিন একাউন্ট' : 'Administrators'}</span>
            <span className="text-2xl font-black text-purple-400">{stats.admins}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/30 flex items-center justify-center text-purple-400">
            <Shield size={20} />
          </div>
        </div>

        <div className="bg-[#111723] border border-[#1e293b] p-4 rounded-2xl shadow-card flex items-center justify-between">
          <div>
            <span className="text-[11px] text-slate-400 block">{isBn ? 'অপেক্ষমাণ / নিষিদ্ধ' : 'Pending / Banned'}</span>
            <span className={`text-2xl font-black ${stats.pending > 0 || stats.banned > 0 ? 'text-amber-400' : 'text-slate-400'}`}>
              {stats.pending + stats.banned}
            </span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
            <Clock size={20} />
          </div>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-[#111723] border border-[#1e293b] p-4 rounded-2xl shadow-card space-y-3">
        <div className="flex flex-col md:flex-row items-center gap-3">
          {/* Search Input */}
          <div className="relative flex-1 w-full">
            <Search size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={
                isBn
                  ? 'নাম, ইমেইল, কলেজ বা ফোন নম্বর দিয়ে খুঁজুন...'
                  : 'Search by student name, email, college, phone, or batch...'
              }
              className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none transition-colors"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-3 text-slate-400 hover:text-white"
              >
                <X size={15} />
              </button>
            )}
          </div>

          {/* Sort Dropdown */}
          <div className="w-full md:w-56 shrink-0">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              aria-label="Sort users by"
              className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-xs font-semibold text-slate-200 outline-none cursor-pointer"
            >
              <option value="default">{isBn ? 'সাজান: ডিফল্ট' : 'Sort: Default'}</option>
              <option value="name">{isBn ? 'নাম অনুযায়ী (A-Z)' : 'Name (A to Z)'}</option>
              <option value="streak">{isBn ? 'সর্বোচ্চ স্ট্রিক (Streak)' : 'Streak (High to Low)'}</option>
              <option value="points">{isBn ? 'সর্বোচ্চ পয়েন্ট (XP)' : 'Points (High to Low)'}</option>
              <option value="newest">{isBn ? 'নতুন নিবন্ধিত' : 'Newest First'}</option>
            </select>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar pt-1">
          <span className="text-[11px] font-bold text-slate-400 mr-1 flex items-center gap-1 shrink-0">
            <Filter size={13} />
            <span>{isBn ? 'ফিল্টার:' : 'Filter:'}</span>
          </span>

          {[
            { id: 'All', labelEn: 'All Users', labelBn: 'সকল', count: stats.total },
            { id: 'Student', labelEn: 'Students', labelBn: 'শিক্ষার্থী', count: stats.total - stats.admins },
            { id: 'Admin', labelEn: 'Admins', labelBn: 'অ্যাডমিন', count: stats.admins },
            { id: 'Active', labelEn: 'Active', labelBn: 'সক্রিয়', count: stats.active },
            { id: 'Pending', labelEn: 'Pending', labelBn: 'অপেক্ষমাণ', count: stats.pending },
            { id: 'Banned', labelEn: 'Banned / Suspended', labelBn: 'ব্যান', count: stats.banned }
          ].map((item) => {
            const isActive = statusFilter === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setStatusFilter(item.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all whitespace-nowrap flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/50'
                    : 'bg-[#0c0f17] text-slate-400 border-[#1e293b] hover:text-white hover:border-[#2d3b52]'
                }`}
              >
                <span>{isBn ? item.labelBn : item.labelEn}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                  isActive ? 'bg-white/20 text-white' : 'bg-slate-800 text-slate-300'
                }`}>
                  {item.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Users Table Container */}
      <div className="bg-[#111723] border border-[#1e293b] rounded-3xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-[#0c0f17] text-slate-400 border-b border-[#1e293b] uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="py-4 px-4 sm:px-5">{isBn ? 'শিক্ষার্থীর বিবরণ' : 'Student & Contact'}</th>
                <th className="py-4 px-4">{isBn ? 'কলেজ ও এইচএসসি ব্যাচ' : 'College & Batch'}</th>
                <th className="py-4 px-4">{isBn ? 'স্ট্রিক ও পয়েন্ট' : 'Streak & Points'}</th>
                <th className="py-4 px-4">{isBn ? 'রোল ও বর্তমান স্ট্যাটাস' : 'Role & Status'}</th>
                <th className="py-4 px-4 sm:px-5 text-right">{isBn ? 'মাস্টার অ্যাকশন' : '1-Click Master Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#182133]">
              {processedUsers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400">
                    <Users size={36} className="mx-auto mb-2 text-slate-600 opacity-50" />
                    <p className="font-semibold">{isBn ? 'কোনো শিক্ষার্থী পাওয়া যায়নি।' : 'No users match the search criteria.'}</p>
                    <button
                      onClick={() => {
                        setSearchTerm('');
                        setStatusFilter('All');
                      }}
                      className="mt-2 text-xs text-emerald-400 hover:underline font-bold"
                    >
                      {isBn ? 'ফিল্টার রিসেট করুন' : 'Clear all filters'}
                    </button>
                  </td>
                </tr>
              ) : (
                processedUsers.map((user) => {
                  const isAdmin = (user.role || '').toLowerCase() === 'admin';
                  const isActive = (user.status || '').toLowerCase() === 'active';
                  const isPending = (user.status || '').toLowerCase() === 'pending';
                  const isBanned = (user.status || '').toLowerCase() === 'banned' || (user.status || '').toLowerCase() === 'suspended';

                  return (
                    <tr key={user.id} className="hover:bg-[#141b29] transition-colors group">
                      {/* 1. Student Name & Contact */}
                      <td className="py-3.5 px-4 sm:px-5">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-sm shadow-md shrink-0 ${
                            isAdmin 
                              ? 'bg-gradient-to-tr from-purple-700 to-indigo-500 shadow-purple-950/60 ring-1 ring-purple-400/40' 
                              : 'bg-gradient-to-tr from-emerald-700 to-teal-500 shadow-emerald-950/60'
                          }`}>
                            {(user.name || 'S').charAt(0).toUpperCase()}
                          </div>
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5">
                              <span className="font-bold text-white text-sm block truncate group-hover:text-emerald-300 transition-colors">
                                {user.name}
                              </span>
                              {isAdmin && (
                                <span className="text-[9px] font-extrabold px-1.5 py-0.2 rounded bg-purple-500/25 text-purple-300 border border-purple-500/40">
                                  ADMIN
                                </span>
                              )}
                            </div>
                            <span className="text-[11px] text-slate-400 block truncate">{user.email}</span>
                            {user.phone && (
                              <span className="text-[10px] text-slate-500 block truncate">{user.phone}</span>
                            )}
                          </div>
                        </div>
                      </td>

                      {/* 2. College & Batch */}
                      <td className="py-3.5 px-4">
                        <span className="font-medium text-slate-200 block text-xs truncate max-w-[200px]">
                          {user.college || 'Notre Dame College'}
                        </span>
                        <div className="flex items-center gap-1.5 mt-0.5">
                          <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.2 rounded border border-emerald-500/20">
                            {user.hscBatch || 'HSC 2026'}
                          </span>
                          <span className="text-[10px] text-slate-500">
                            Joined: {user.joinedDate || 'Recent'}
                          </span>
                        </div>
                      </td>

                      {/* 3. Streak & Points */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2.5">
                          <span className="inline-flex items-center gap-1 text-orange-400 font-extrabold text-xs bg-orange-500/10 px-2 py-0.5 rounded-lg border border-orange-500/25">
                            <Flame size={13} className="fill-orange-400 animate-pulse" />
                            {user.streak || 0}d
                          </span>
                          <span className="inline-flex items-center gap-1 text-yellow-400 font-extrabold text-xs bg-yellow-500/10 px-2 py-0.5 rounded-lg border border-yellow-500/25">
                            <Award size={13} />
                            {user.points || 0} XP
                          </span>
                        </div>
                        <span className="text-[10px] text-slate-400 block mt-1">
                          {user.testsCompleted || 0} exams completed
                        </span>
                      </td>

                      {/* 4. Role & Status Badges */}
                      <td className="py-3.5 px-4">
                        <div className="flex flex-col gap-1.5 items-start">
                          {/* Role Badge */}
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider inline-flex items-center gap-1 ${
                              isAdmin
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm shadow-purple-950/40'
                                : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                            }`}
                          >
                            {isAdmin ? <Shield size={11} /> : <GraduationCap size={11} />}
                            <span>{isAdmin ? 'Master Admin' : 'Student'}</span>
                          </span>

                          {/* Status Badge */}
                          <span
                            className={`text-[10px] font-extrabold px-2.5 py-0.5 rounded-full inline-flex items-center gap-1 ${
                              isActive
                                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                                : isPending
                                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                                : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                            }`}
                          >
                            {isActive ? (
                              <>
                                <CheckCircle2 size={11} className="text-emerald-400" />
                                <span>{isBn ? '✓ অনুমোদিত (Active)' : 'Authorized'}</span>
                              </>
                            ) : isPending ? (
                              <>
                                <Clock size={11} className="text-amber-400" />
                                <span>{isBn ? '⏳ অপেক্ষমাণ (Pending)' : 'Pending'}</span>
                              </>
                            ) : (
                              <>
                                <Ban size={11} className="text-rose-400" />
                                <span>{isBn ? '🚫 নিষিদ্ধ (Banned)' : 'Suspended'}</span>
                              </>
                            )}
                          </span>
                        </div>
                      </td>

                      {/* 5. 1-Click Master Admin Action Controls */}
                      <td className="py-3.5 px-4 sm:px-5 text-right">
                        <div className="flex items-center justify-end gap-1.5 flex-wrap">
                          {/* 1-Click Action 1: Authorize / Approve button */}
                          {!isActive ? (
                            <button
                              onClick={() => handleAuthorizeUser(user.id)}
                              title={isBn ? 'অ্যাকাউন্ট অনুমোদন করুন' : 'Authorize Account (1-Click)'}
                              className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs inline-flex items-center gap-1 shadow-md shadow-emerald-950/60 active:scale-95 transition-all cursor-pointer"
                            >
                              <CheckCircle2 size={13} />
                              <span>{isBn ? 'অনুমোদন' : 'Authorize'}</span>
                            </button>
                          ) : null}

                          {/* 1-Click Action 2: Role Switch (Student <-> Admin) */}
                          <button
                            onClick={() => handleToggleRole(user.id)}
                            title={
                              isAdmin
                                ? isBn ? 'রোল পরিবর্তন করে Student করুন' : 'Switch Role to Student'
                                : isBn ? 'রোল পরিবর্তন করে Admin করুন' : 'Switch Role to Admin'
                            }
                            className={`px-2.5 py-1.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1 transition-all active:scale-95 cursor-pointer ${
                              isAdmin
                                ? 'bg-purple-950/60 border-purple-500/50 text-purple-300 hover:bg-purple-900 shadow-sm'
                                : 'bg-[#161e2e] border-[#22304a] text-slate-300 hover:text-purple-300 hover:border-purple-500/30'
                            }`}
                          >
                            <Shield size={13} className={isAdmin ? 'text-purple-400' : 'text-slate-400'} />
                            <span className="hidden sm:inline">
                              {isAdmin ? (isBn ? 'Admin' : 'Admin') : (isBn ? 'Make Admin' : 'Make Admin')}
                            </span>
                          </button>

                          {/* 1-Click Action 3: Password Reset Modal trigger */}
                          <button
                            onClick={() => handleOpenPasswordReset(user)}
                            title={isBn ? 'পাসওয়ার্ড রিসেট করুন' : 'Reset Password (1-Click Modal)'}
                            className="p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl bg-[#161e2e] hover:bg-[#1f2b42] border border-[#22304a] text-amber-300 hover:text-white font-bold text-xs inline-flex items-center gap-1 transition-all active:scale-95 cursor-pointer"
                          >
                            <Key size={13} />
                            <span className="hidden md:inline">{isBn ? 'পাসওয়ার্ড' : 'Reset'}</span>
                          </button>

                          {/* 1-Click Action 4: Ban / Unban Toggle */}
                          <button
                            onClick={() => handleToggleBanStatus(user.id)}
                            title={
                              isActive
                                ? isBn ? 'অ্যাকাউন্ট সাসপেন্ড / ব্যান করুন' : 'Ban / Suspend User'
                                : isBn ? 'ব্যান প্রত্যাহার করুন' : 'Unban / Restore User'
                            }
                            className={`p-1.5 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                              isActive
                                ? 'bg-[#161e2e] border-[#22304a] text-slate-400 hover:text-rose-400 hover:bg-rose-950/40 hover:border-rose-500/40'
                                : 'bg-rose-950/70 border-rose-500/50 text-rose-300 hover:bg-rose-900'
                            }`}
                          >
                            <Ban size={14} />
                          </button>

                          {/* Edit Details */}
                          <button
                            onClick={() => handleOpenEdit(user)}
                            title={isBn ? 'তথ্য সম্পাদন' : 'Edit User'}
                            className="p-1.5 rounded-xl bg-[#161e2e] hover:bg-[#1f2b42] border border-[#22304a] text-slate-300 hover:text-emerald-400 transition-colors active:scale-95 cursor-pointer"
                          >
                            <Edit3 size={14} />
                          </button>

                          {/* Delete User */}
                          <button
                            onClick={() => handleDeleteUser(user)}
                            title={isBn ? 'মুছে ফেলুন' : 'Delete User'}
                            className="p-1.5 rounded-xl bg-[#161e2e] hover:bg-rose-950/60 border border-[#22304a] hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-colors active:scale-95 cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: 1-Click Password Reset Modal with Copy to Clipboard */}
      {passwordResetUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl w-full max-w-md overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4.5 bg-[#0c0f17] border-b border-[#1e293b] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400">
                  <Key size={16} />
                </div>
                <div>
                  <h3 className="text-white font-extrabold text-base">
                    {isBn ? 'পাসওয়ার্ড রিসেট ও কী জেনারেটর' : 'Reset Student Password'}
                  </h3>
                  <span className="text-[11px] text-slate-400">
                    {passwordResetUser.name} ({passwordResetUser.email})
                  </span>
                </div>
              </div>

              <button
                onClick={() => setPasswordResetUser(null)}
                className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-[#161e2e] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSavePasswordReset} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1.5">
                  {isBn ? 'নতুন পাসওয়ার্ড (New Password)' : 'New Temporary Password'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={newPasswordValue}
                    onChange={(e) => setNewPasswordValue(e.target.value)}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-amber-500 rounded-xl pl-3.5 pr-24 py-2.5 text-sm text-white font-mono outline-none"
                    placeholder="Enter or generate password"
                  />
                  <div className="absolute right-1.5 top-1.5 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setNewPasswordValue(generateStrongPassword())}
                      title="Generate New Password"
                      className="p-1.5 rounded-lg bg-[#161e2e] hover:bg-[#202b3f] text-slate-300 hover:text-amber-400 transition-colors cursor-pointer"
                    >
                      <RefreshCw size={14} />
                    </button>
                    <button
                      type="button"
                      onClick={handleCopyPassword}
                      title="Copy to Clipboard"
                      className="px-2 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-[11px] font-bold inline-flex items-center gap-1 border border-amber-500/40 transition-colors cursor-pointer"
                    >
                      {copiedNotice ? <Check size={12} className="text-emerald-400" /> : <Copy size={12} />}
                      <span>{copiedNotice ? (isBn ? 'কপি হয়েছে' : 'Copied!') : (isBn ? 'কপি' : 'Copy')}</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Password Info Callout */}
              <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/25 text-amber-200 text-xs leading-relaxed space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Sparkles size={14} className="text-amber-400" />
                  <span>{isBn ? 'নিরাপত্তা নির্দেশনা:' : 'Security Note:'}</span>
                </p>
                <p className="text-[11px] text-slate-300">
                  {isBn
                    ? 'পাসওয়ার্ডটি কপি করে শিক্ষার্থীকে প্রদান করুন। শিক্ষার্থী পরবর্তীতে সেটিংস পেজ থেকে নিজস্ব পাসওয়ার্ড পরিবর্তন করতে পারবেন।'
                    : 'Copy the temporary password and share with the student. They can update their password later via Settings.'}
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setPasswordResetUser(null)}
                  className="px-4 py-2.5 rounded-xl bg-[#161e2e] hover:bg-[#1f2b42] text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-400 hover:to-yellow-300 text-slate-950 font-black text-xs shadow-lg shadow-amber-500/30 active:scale-95 transition-all cursor-pointer"
                >
                  {isBn ? 'পাসওয়ার্ড সংরক্ষণ করুন' : 'Save & Update Password'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add / Edit User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
          <div className="bg-[#111723] border border-[#1e293b] rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-4.5 bg-[#0c0f17] border-b border-[#1e293b] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <UserPlus size={16} />
                </div>
                <h3 className="text-white font-extrabold text-base">
                  {editingUser
                    ? isBn ? 'শিক্ষার্থীর তথ্য সম্পাদন' : 'Edit Student Details'
                    : isBn ? 'নতুন শিক্ষার্থী নিবন্ধন' : 'Register New Student'}
                </h3>
              </div>

              <button
                onClick={() => setIsAddUserOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-xl hover:bg-[#161e2e] transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveUser} className="p-6 space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  {isBn ? 'পূর্ণ নাম' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Sakib Al Hasan"
                  className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isBn ? 'ইমেইল ঠিকানা' : 'Email Address'} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="student@example.com"
                    className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isBn ? 'ফোন নম্বর' : 'Phone Number'}
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+880 1700-000000"
                    className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isBn ? 'কলেজের নাম' : 'College Name'}
                  </label>
                  <input
                    type="text"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    placeholder="Notre Dame College"
                    className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isBn ? 'HSC ব্যাচ' : 'HSC Batch'}
                  </label>
                  <select
                    value={formData.hscBatch}
                    onChange={(e) => setFormData({ ...formData, hscBatch: e.target.value })}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="HSC 2026">HSC 2026</option>
                    <option value="HSC 2025">HSC 2025</option>
                    <option value="HSC 2027">HSC 2027</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isBn ? 'সিস্টেম রোল' : 'System Role'}
                  </label>
                  <select
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Student">Student (শিক্ষার্থী)</option>
                    <option value="Admin">Admin (মাস্টার অ্যাডমিন)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isBn ? 'অ্যাকাউন্ট স্ট্যাটাস' : 'Account Status'}
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white outline-none cursor-pointer"
                  >
                    <option value="Active">Active (অনুমোদিত)</option>
                    <option value="Pending">Pending (অপেক্ষমাণ)</option>
                    <option value="Banned">Banned (স্থগিত)</option>
                  </select>
                </div>
              </div>

              {!editingUser && (
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    {isBn ? 'প্রারম্ভিক পাসওয়ার্ড' : 'Initial Password'}
                  </label>
                  <input
                    type="text"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    placeholder="Enter initial password"
                    className="w-full bg-[#0c0f17] border border-[#1e293b] focus:border-emerald-500 rounded-xl px-3.5 py-2.5 text-sm text-white font-mono outline-none"
                  />
                </div>
              )}

              <div className="pt-3 border-t border-[#1e293b] flex justify-end gap-2.5">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2.5 rounded-xl bg-[#161e2e] hover:bg-[#1f2b42] text-slate-300 text-xs font-bold transition-all cursor-pointer"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-950/50 active:scale-95 transition-all cursor-pointer"
                >
                  {isBn ? 'সংরক্ষণ করুন' : 'Save Student'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
