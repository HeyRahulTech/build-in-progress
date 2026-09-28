"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProfileSetupPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (fullName) {
      router.push('/location-setup');
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col bg-slate-50">
      <div className="flex-1 mt-10">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">Create Profile</h1>
        <p className="text-slate-500 mb-8">Tell us a bit about yourself.</p>

        <form onSubmit={handleSave} className="flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Full Name *</label>
            <input
              type="text"
              placeholder="John Doe"
              className="px-4 py-4 rounded-xl border border-slate-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Email Address (Optional)</label>
            <input
              type="email"
              placeholder="john@example.com"
              className="px-4 py-4 rounded-xl border border-slate-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button
            type="submit"
            disabled={!fullName}
            className="mt-6 w-full bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-lg shadow-md active:scale-95 transition-all"
          >
            Save Profile
          </button>
        </form>
      </div>
    </div>
  );
}
