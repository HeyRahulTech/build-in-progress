"use client";
import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function VerifyPage() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)];

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleBackspace = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyOtp = () => {
    const code = otp.join('');
    if (code.length === 4) {
      // In a real app, verify OTP here
      router.push('/profile-setup');
    }
  };

  useEffect(() => {
    inputRefs[0].current?.focus();
  }, []);

  return (
    <div className="p-6 h-screen flex flex-col bg-white">
      <div className="flex-1 mt-10">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">Verify Details</h1>
        <p className="text-slate-500 mb-8">Enter the 4-digit OTP sent to your number.</p>

        <div className="flex justify-between gap-4 mb-8">
          {otp.map((digit, i) => (
            <input
              key={i}
              ref={inputRefs[i]}
              type="text"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleBackspace(i, e)}
              className="w-16 h-16 text-center text-2xl font-bold border-2 border-slate-200 rounded-xl focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-all"
            />
          ))}
        </div>

        <button
          onClick={verifyOtp}
          disabled={otp.join('').length < 4}
          className="w-full bg-navy-900 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold text-lg shadow-md active:scale-95 transition-all"
        >
          Verify & Proceed
        </button>
        
        <div className="text-center mt-6">
          <button className="text-orange-600 font-semibold text-sm">Resend OTP</button>
        </div>
      </div>
    </div>
  );
}
