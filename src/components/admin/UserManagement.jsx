import React, { useState } from 'react';
import { Users, Search, UserPlus, Shield, Trash2, Edit3, Award, Flame, CheckCircle, Ban, Filter } from 'lucide-react';

export default function UserManagement({ users, onUpdateUsers, lang }) {
  const isBn = lang === 'bn';
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('All');
  const [isAddUserOpen, setIsAddUserOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // New user form state
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    phone: '',
    college: 'Notre Dame College',
    hscBatch: 'HSC 2026',
    role: 'Student',
    status: 'Active'
  });

  const filteredUsers = users.filter((u) => {
    const matchesSearch =
      u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.college.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === 'All' || u.role === roleFilter || (roleFilter === 'Active' && u.status === 'Active');
    return matchesSearch && matchesRole;
  });

  const handleAddOrEditUser = (e) => {
    e.preventDefault();
    if (editingUser) {
      const updated = users.map((u) => (u.id === editingUser.id ? { ...u, ...newUser } : u));
      onUpdateUsers(updated);
      setEditingUser(null);
    } else {
      const created = {
        ...newUser,
        id: `usr-${Date.now()}`,
        streak: 1,
        points: 50,
        testsCompleted: 0,
        joinedDate: 'Today'
      };
      onUpdateUsers([created, ...users]);
    }
    setIsAddUserOpen(false);
    setNewUser({
      name: '',
      email: '',
      phone: '',
      college: 'Notre Dame College',
      hscBatch: 'HSC 2026',
      role: 'Student',
      status: 'Active'
    });
  };

  const handleDeleteUser = (id) => {
    if (window.confirm(isBn ? 'আপনি কি নিশ্চিত এই ব্যবহারকারীকে মুছে ফেলতে চান?' : 'Are you sure you want to remove this user?')) {
      const updated = users.filter((u) => u.id !== id);
      onUpdateUsers(updated);
    }
  };

  const handleToggleStatus = (id) => {
    const updated = users.map((u) => {
      if (u.id === id) {
        const newStatus = u.status === 'Active' ? 'Banned' : 'Active';
        return { ...u, status: newStatus };
      }
      return u;
    });
    onUpdateUsers(updated);
  };

  const handleOpenEdit = (user) => {
    setEditingUser(user);
    setNewUser({
      name: user.name,
      email: user.email,
      phone: user.phone,
      college: user.college,
      hscBatch: user.hscBatch,
      role: user.role,
      status: user.status
    });
    setIsAddUserOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#131824] border border-[#1d2536] p-5 rounded-2xl">
        <div>
          <h2 className="text-white font-bold text-lg md:text-xl flex items-center gap-2">
            <Users className="text-emerald-400" size={22} />
            <span>{isBn ? 'সকল শিক্ষার্থী ও ব্যবহারকারী ব্যবস্থাপনা' : 'Student & User Management'}</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            {isBn ? `মোট রেজিস্টার্ড শিক্ষার্থী: ${users.length} জন` : `Total registered learners: ${users.length}`}
          </p>
        </div>

        <button
          onClick={() => {
            setEditingUser(null);
            setIsAddUserOpen(true);
          }}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs md:text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-950/50 transition-all self-start sm:self-auto"
        >
          <UserPlus size={16} />
          <span>{isBn ? 'নতুন শিক্ষার্থী যোগ করুন' : 'Add New Student'}</span>
        </button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search size={16} className="absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={isBn ? 'নাম, ইমেইল বা কলেজ দিয়ে খুঁজুন...' : 'Search by student name, email, or college...'}
            className="w-full bg-[#131824] border border-[#1d2536] focus:border-emerald-500 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white placeholder-slate-500 outline-none"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          {['All', 'Student', 'Admin', 'Active'].map((f) => (
            <button
              key={f}
              onClick={() => setRoleFilter(f)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                roleFilter === f
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950/40'
                  : 'bg-[#131824] text-slate-400 border-[#1d2536] hover:text-white'
              }`}
            >
              {f === 'All' ? (isBn ? 'সকল' : 'All') : f}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-[#131824] border border-[#1d2536] rounded-2xl overflow-hidden shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs md:text-sm">
            <thead className="bg-[#0e121a] text-slate-400 border-b border-[#1d2536] uppercase font-semibold text-[11px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4">{isBn ? 'শিক্ষার্থী' : 'Student Name'}</th>
                <th className="py-3.5 px-4">{isBn ? 'কলেজ ও ব্যাচ' : 'College & Batch'}</th>
                <th className="py-3.5 px-4">{isBn ? 'স্ট্রিক ও পয়েন্ট' : 'Streak & Points'}</th>
                <th className="py-3.5 px-4">{isBn ? 'রোল / স্ট্যাটাস' : 'Role / Status'}</th>
                <th className="py-3.5 px-4 text-right">{isBn ? 'অ্যাকশন' : 'Actions'}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1a2233]">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-[#161c2b] transition-colors">
                  {/* Name & Contact */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-700 to-teal-500 flex items-center justify-center text-white font-bold text-sm shadow-md">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <span className="font-bold text-white block text-sm">{user.name}</span>
                        <span className="text-[11px] text-slate-400">{user.email}</span>
                      </div>
                    </div>
                  </td>

                  {/* College & Batch */}
                  <td className="py-3.5 px-4">
                    <span className="font-medium text-slate-200 block">{user.college}</span>
                    <span className="text-[11px] text-emerald-400 font-semibold">{user.hscBatch}</span>
                  </td>

                  {/* Streak & Points */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <span className="inline-flex items-center gap-1 text-orange-400 font-bold bg-orange-500/10 px-2 py-0.5 rounded-md border border-orange-500/20">
                        <Flame size={13} className="fill-orange-400" />
                        {user.streak}d
                      </span>
                      <span className="inline-flex items-center gap-1 text-yellow-400 font-bold bg-yellow-500/10 px-2 py-0.5 rounded-md border border-yellow-500/20">
                        <Award size={13} />
                        {user.points} pts
                      </span>
                    </div>
                  </td>

                  {/* Role & Status */}
                  <td className="py-3.5 px-4">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                            user.role === 'Admin'
                              ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40'
                              : 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                          }`}
                        >
                          {user.role}
                        </span>
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            user.status === 'Active'
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : user.status === 'Pending'
                              ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                              : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          }`}
                        >
                          {user.status === 'Active' ? (isBn ? '✓ অনুমোদিত' : 'Active') : user.status}
                        </span>
                      </div>
                      {user.password && (
                        <span className="text-[10px] text-slate-500 font-mono">
                          Key: ••••••••
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Actions & Authorization */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      {user.status !== 'Active' ? (
                        <button
                          onClick={() => {
                            const updated = users.map((u) => (u.id === user.id ? { ...u, status: 'Active' } : u));
                            onUpdateUsers(updated);
                          }}
                          title={isBn ? 'অ্যাকাউন্ট অনুমোদন করুন' : 'Authorize Account'}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 transition-all shadow-sm cursor-pointer"
                        >
                          <CheckCircle size={13} />
                          <span>{isBn ? 'অনুমোদন' : 'Authorize'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            const nextRole = user.role === 'Admin' ? 'Student' : 'Admin';
                            const updated = users.map((u) => (u.id === user.id ? { ...u, role: nextRole } : u));
                            onUpdateUsers(updated);
                          }}
                          title={isBn ? 'রোল পরিবর্তন করুন' : 'Toggle Role'}
                          className={`p-1.5 rounded-lg border text-xs font-bold transition-all ${
                            user.role === 'Admin'
                              ? 'bg-purple-950/60 border-purple-500/40 text-purple-300 hover:bg-purple-900'
                              : 'bg-[#192233] border-[#222e44] text-slate-300 hover:text-purple-300'
                          }`}
                        >
                          <Shield size={14} />
                        </button>
                      )}

                      <button
                        onClick={() => handleOpenEdit(user)}
                        title="Edit User"
                        className="p-1.5 rounded-lg bg-[#192233] hover:bg-[#222e44] text-slate-300 hover:text-emerald-400 transition-colors"
                      >
                        <Edit3 size={14} />
                      </button>

                      <button
                        onClick={() => handleToggleStatus(user.id)}
                        title={user.status === 'Active' ? 'Ban User' : 'Unban User'}
                        className={`p-1.5 rounded-lg transition-colors ${
                          user.status === 'Active'
                            ? 'bg-[#192233] hover:bg-rose-950 text-slate-300 hover:text-rose-400'
                            : 'bg-emerald-950 text-emerald-400 hover:bg-emerald-900'
                        }`}
                      >
                        <Ban size={14} />
                      </button>

                      <button
                        onClick={() => handleDeleteUser(user.id)}
                        title="Delete User"
                        className="p-1.5 rounded-lg bg-[#192233] hover:bg-rose-950 text-slate-300 hover:text-rose-400 transition-colors"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit User Modal */}
      {isAddUserOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#131824] border border-[#232c3f] rounded-2xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
            <div className="px-6 py-4 bg-[#0e121a] border-b border-[#1f2738] flex items-center justify-between">
              <h3 className="text-white font-bold text-base">
                {editingUser
                  ? isBn ? 'শিক্ষার্থীর তথ্য পরিবর্তন' : 'Edit Student Details'
                  : isBn ? 'নতুন শিক্ষার্থী যোগ' : 'Add New Student'}
              </h3>
              <button
                onClick={() => setIsAddUserOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleAddOrEditUser} className="p-6 space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'পূর্ণ নাম' : 'Full Name'} *
                </label>
                <input
                  type="text"
                  required
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  placeholder="e.g. Tanvir Ahmed"
                  className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {isBn ? 'ইমেইল' : 'Email'} *
                </label>
                <input
                  type="email"
                  required
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  placeholder="student@example.com"
                  className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isBn ? 'কলেজ' : 'College'}
                  </label>
                  <input
                    type="text"
                    value={newUser.college}
                    onChange={(e) => setNewUser({ ...newUser, college: e.target.value })}
                    placeholder="Notre Dame College"
                    className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isBn ? 'HSC ব্যাচ' : 'HSC Batch'}
                  </label>
                  <input
                    type="text"
                    value={newUser.hscBatch}
                    onChange={(e) => setNewUser({ ...newUser, hscBatch: e.target.value })}
                    placeholder="HSC 2026"
                    className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3.5 py-2 text-sm text-white outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isBn ? 'রোল' : 'Role'}
                  </label>
                  <select
                    value={newUser.role}
                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                    className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-white outline-none"
                  >
                    <option value="Student">Student</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    {isBn ? 'স্ট্যাটাস' : 'Status'}
                  </label>
                  <select
                    value={newUser.status}
                    onChange={(e) => setNewUser({ ...newUser, status: e.target.value })}
                    className="w-full bg-[#161c2b] border border-[#232c3f] focus:border-emerald-500 rounded-xl px-3 py-2 text-sm text-white outline-none"
                  >
                    <option value="Active">Active</option>
                    <option value="Banned">Banned</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 border-t border-[#1f2738] flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddUserOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-xs font-semibold"
                >
                  {isBn ? 'বাতিল' : 'Cancel'}
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold"
                >
                  {isBn ? 'সংরক্ষণ' : 'Save'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
