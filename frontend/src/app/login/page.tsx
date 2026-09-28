"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length >= 10) {
      // In a real app, send OTP here
      router.push('/verify');
    }
  };

  return (
    <div className="p-6 h-screen flex flex-col bg-white">
      <div className="flex-1 mt-10">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">Welcome to Buildr</h1>
        <p className="text-slate-500 mb-8">Enter your mobile number to get started.</p>

        <form onSubmit={handleLogin} className="flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-semibold text-slate-700">Mobile Number</label>
            <div className="flex items-center border border-slate-300 rounded-xl overflow-hidden focus-within:border-orange-500 focus-within:ring-1 focus-within:ring-orange-500 transition-all">
              <div className="bg-slate-50 px-4 py-4 text-slate-500 font-medium border-r border-slate-300">
                +91
              </div>
              <input
                type="tel"
                placeholder="99999 99999"
                className="flex-1 px-4 py-4 outline-none font-medium"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value.replace(/\D/g, ''))}
                maxLength={10}
                required
              />
            </div>
          </div>

          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 accent-orange-600 rounded cursor-pointer"
              checked={whatsappUpdates}
              onChange={(e) => setWhatsappUpdates(e.target.checked)}
            />
            <span className="text-sm text-slate-600 font-medium">
              Get booking updates on WhatsApp
            </span>
          </label>

          <button
            type="submit"
            disabled={phoneNumber.length < 10}
            className="mt-4 bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-lg shadow-md active:scale-95 transition-all"
          >
            Send OTP
          </button>
        </form>
      </div>
      
      <p className="text-xs text-center text-slate-400 mb-4">
        By continuing, you agree to our Terms of Service & Privacy Policy
      </p>
    </div>
  );
}
