'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/lib/hooks/useAuth';

export default function ProfilePage() {
  const { user, loading } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    name: '',
    studentId: '',
    college: '',
  });

  const [originalForm, setOriginalForm] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /* ---------------- AUTO-FILL FORM ---------------- */
  useEffect(() => {
    if (user) {
      const data = {
        name: user.name || '',
        studentId: user.studentId || '',
        college: user.college || '',
      };
      setForm(data);
      setOriginalForm(data);
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Loading profile...
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        Please login first.
      </div>
    );
  }

  /* ---------------- HANDLERS ---------------- */

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      setError('');
      setSuccess('');

      await updateDoc(doc(db, 'Users', user.uid), {
        name: form.name,
        studentId: form.studentId,
        college: form.college,
      });

      setOriginalForm(form);
      setEditMode(false);
      setSuccess('Profile updated successfully ✔');

    } catch (err) {
      setError('Failed to update profile');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm(originalForm);
    setEditMode(false);
    setError('');
    setSuccess('');
  };

  /* ---------------- UI ---------------- */

  return (
    <main className="min-h-screen relative flex items-center justify-center bg-gradient-to-br from-[#3B101A] via-[#471942] to-[#2C285C]">

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="
          w-full max-w-lg
          mt-25
          bg-white/10 backdrop-blur-2xl
          border border-white/30
          rounded-3xl
          shadow-[0_60px_160px_rgba(0,0,0,0.55)]
          p-10
          text-white
        "
      >
        <h1 className="text-3xl font-bold text-center mb-4">
          My Profile
        </h1>

        {/* EMAIL (READ ONLY) */}
        <div className="mb-4">
          <label className="text-sm text-[#ffd4b9]">Email</label>
          <input
            value={user.email}
            disabled
            className="w-full mt-1 p-3 rounded-xl bg-white/20 border border-white/25 opacity-70 cursor-not-allowed"
          />
        </div>

        {/* NAME */}
        <div className="mb-4">
          <label className="text-sm text-[#ffd4b9]">Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full mt-1 p-3 rounded-xl border border-white/25 outline-none
              ${editMode ? 'bg-white/20' : 'bg-white/10 opacity-70'}
            `}
          />
        </div>

        {/* STUDENT ID */}
        <div className="mb-4">
          <label className="text-sm text-[#ffd4b9]">Student ID</label>
          <input
            name="studentId"
            value={form.studentId}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full mt-1 p-3 rounded-xl border border-white/25 outline-none
              ${editMode ? 'bg-white/20' : 'bg-white/10 opacity-70'}
            `}
          />
        </div>

        {/* COLLEGE */}
        <div className="mb-4">
          <label className="text-sm text-[#ffd4b9]">College</label>
          <input
            name="college"
            value={form.college}
            onChange={handleChange}
            disabled={!editMode}
            className={`w-full mt-1 p-3 rounded-xl border border-white/25 outline-none
              ${editMode ? 'bg-white/20' : 'bg-white/10 opacity-70'}
            `}
          />
        </div>

        {/* STATUS */}
        {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
        {success && <p className="text-green-400 text-sm mb-3">{success}</p>}

        {/* BUTTONS */}
        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#f7548a] to-[#F593B5] font-semibold"
          >
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 py-3 rounded-xl bg-white text-black font-semibold"
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleCancel}
              className="flex-1 py-3 rounded-xl bg-white/20"
            >
              Cancel
            </button>
          </div>
        )}
      </motion.div>
    </main>
  );
}
