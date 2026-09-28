'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, MapPin, Search, Navigation } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [step, setStep] = useState<'phone' | 'otp' | 'details' | 'location'>('phone');
  
  // Form State
  const [phone, setPhone] = useState('');
  const [whatsappUpdates, setWhatsappUpdates] = useState(true);
  const [otp, setOtp] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [location, setLocation] = useState('');

  const handlePhoneSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phone.length >= 10) setStep('otp');
  };

  const handleOtpSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 4) {
      // Check if user exists in Supabase
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('phone', phone)
        .single();
      
      if (data) {
        // User already exists, log them in
        localStorage.setItem('user', JSON.stringify(data));
        router.push('/');
      } else {
        // New user
        setStep('details');
      }
    }
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name) setStep('location');
  };

  const handleLocationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (location) {
      const newUser = {
        name,
        phone,
        email,
        location,
        role: 'customer'
      };
      
      // Insert into Supabase
      const { data, error } = await supabase
        .from('users')
        .insert([newUser])
        .select()
        .single();
        
      if (error) {
        alert("Error saving user: " + error.message);
        return;
      }

      // Setup complete! Save to localStorage to mark as logged in
      localStorage.setItem('user', JSON.stringify(data));
      router.push('/');
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans flex flex-col">
      {/* Dynamic Header */}
      <header className="p-4 flex items-center">
        {step !== 'phone' && (
          <button 
            onClick={() => {
              if (step === 'otp') setStep('phone');
              if (step === 'details') setStep('otp');
              if (step === 'location') setStep('details');
            }} 
            className="p-2 -ml-2 bg-slate-50 rounded-full text-slate-700"
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </header>

      <main className="flex-1 px-6 pb-6 flex flex-col">
        {step === 'phone' && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in-up">
            <div className="mb-10 text-center">
              <h1 className="text-5xl font-extrabold text-[#1E3A8A] tracking-tighter mb-2">Buildr.</h1>
              <p className="text-lg font-bold text-slate-500">Get Professional House Build</p>
              
              <div className="flex justify-center gap-4 mt-8">
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🧱</div>
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🔨</div>
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner">🔧</div>
                <div className="bg-slate-50 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner">⚡</div>
              </div>
            </div>

            <div className="bg-slate-50 p-1.5 rounded-full flex mb-8">
              <button className="flex-1 py-3 text-sm font-extrabold bg-white text-[#1E3A8A] rounded-full shadow-sm">Log In</button>
              <button className="flex-1 py-3 text-sm font-extrabold text-slate-500 rounded-full">Sign Up</button>
            </div>

            <form onSubmit={handlePhoneSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-extrabold text-[#1E3A8A] mb-2">Mobile Number</label>
                <div className="flex bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden focus-within:border-[#0C831F] focus-within:ring-2 focus-within:ring-green-500/20 transition-all">
                  <div className="px-4 py-4 font-extrabold text-slate-500 border-r border-slate-200 bg-slate-100 flex items-center">
                    +91
                  </div>
                  <input 
                    type="tel"
                    required
                    maxLength={10}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value.replace(/\D/g, ''))}
                    placeholder="Enter your number"
                    className="flex-1 px-4 py-4 bg-transparent outline-none font-bold text-lg"
                  />
                </div>
              </div>

              <label className="flex items-center gap-3 cursor-pointer mt-1">
                <input 
                  type="checkbox" 
                  checked={whatsappUpdates}
                  onChange={(e) => setWhatsappUpdates(e.target.checked)}
                  className="w-5 h-5 rounded border-slate-300 text-[#1E3A8A] focus:ring-[#1E3A8A] cursor-pointer"
                />
                <span className="text-sm font-bold text-slate-600">Get updates on WhatsApp</span>
              </label>

              <button 
                type="submit"
                disabled={phone.length < 10}
                className="w-full bg-[#1E3A8A] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-blue-900/30 active:scale-95 transition-all mt-4 disabled:opacity-50 disabled:active:scale-100"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {step === 'otp' && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in-up">
            <h2 className="text-3xl font-extrabold text-[#1E3A8A] tracking-tight mb-2">Verify Number</h2>
            <p className="text-sm font-bold text-slate-500 mb-8">We've sent a 4-digit OTP to +91 {phone}</p>
            
            <form onSubmit={handleOtpSubmit} className="flex flex-col gap-8">
              <div className="flex justify-between gap-3">
                {[0, 1, 2, 3].map((_, i) => (
                  <input
                    key={i}
                    id={`otp-${i}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    required
                    value={otp[i] || ''}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, ''); // Ensure numeric
                      const newOtp = otp.split('');
                      newOtp[i] = val;
                      setOtp(newOtp.join(''));
                      
                      // Auto-focus next input
                      if (val && i < 3) {
                        document.getElementById(`otp-${i + 1}`)?.focus();
                      }
                    }}
                    onKeyDown={(e) => {
                      // Auto-focus previous input on backspace if current is empty
                      if (e.key === 'Backspace' && !otp[i] && i > 0) {
                        document.getElementById(`otp-${i - 1}`)?.focus();
                      }
                    }}
                    className="w-16 h-16 bg-slate-50 border border-slate-200 rounded-2xl text-center text-2xl font-extrabold text-[#1E3A8A] focus:border-[#0C831F] focus:ring-2 focus:ring-green-500/20 outline-none transition-all"
                  />
                ))}
              </div>

              <div className="text-center">
                <button type="button" className="text-sm font-extrabold text-[#0C831F]">Resend OTP</button>
              </div>

              <button 
                type="submit"
                disabled={otp.length < 4}
                className="w-full bg-[#1E3A8A] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-blue-900/30 active:scale-95 transition-all mt-2 disabled:opacity-50 disabled:active:scale-100"
              >
                Confirm Login
              </button>
            </form>
          </div>
        )}

        {step === 'details' && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in-up">
            <h2 className="text-3xl font-extrabold text-[#1E3A8A] tracking-tight mb-2">A bit about you</h2>
            <p className="text-sm font-bold text-slate-500 mb-8">Help us personalize your experience.</p>
            
            <form onSubmit={handleDetailsSubmit} className="flex flex-col gap-5">
              <div>
                <label className="block text-sm font-extrabold text-[#1E3A8A] mb-2">Full Name</label>
                <input 
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full bg-slate-50 rounded-2xl border border-slate-200 px-4 py-4 font-bold text-lg outline-none focus:border-[#0C831F] focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-extrabold text-[#1E3A8A] mb-2">Email Address (Optional)</label>
                <input 
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full bg-slate-50 rounded-2xl border border-slate-200 px-4 py-4 font-bold text-lg outline-none focus:border-[#0C831F] focus:ring-2 focus:ring-green-500/20 transition-all"
                />
              </div>

              <button 
                type="submit"
                disabled={!name}
                className="w-full bg-[#1E3A8A] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-blue-900/30 active:scale-95 transition-all mt-4 disabled:opacity-50 disabled:active:scale-100"
              >
                Continue
              </button>
            </form>
          </div>
        )}

        {step === 'location' && (
          <div className="flex-1 flex flex-col justify-center animate-fade-in-up">
            <div className="w-16 h-16 bg-blue-50 text-[#1E3A8A] rounded-2xl flex items-center justify-center mb-6">
              <MapPin size={32} />
            </div>
            <h2 className="text-3xl font-extrabold text-[#1E3A8A] tracking-tight mb-2">Where do you need service?</h2>
            <p className="text-sm font-bold text-slate-500 mb-8">We need your location to find nearby professionals.</p>
            
            <form onSubmit={handleLocationSubmit} className="flex flex-col gap-4">
              <div className="flex bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden focus-within:border-[#0C831F] focus-within:ring-2 focus-within:ring-green-500/20 transition-all px-4 items-center gap-3">
                <Search size={20} className="text-slate-400" />
                <input 
                  type="text"
                  required
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Search your area, building, street..."
                  className="flex-1 py-4 bg-transparent outline-none font-bold text-base"
                />
              </div>

              <div className="flex items-center gap-4 py-3">
                <div className="h-px bg-slate-200 flex-1"></div>
                <span className="text-xs font-extrabold text-slate-400 uppercase tracking-widest">OR</span>
                <div className="h-px bg-slate-200 flex-1"></div>
              </div>

              <button 
                type="button"
                onClick={() => setLocation('Delhi, NCR (Detected)')}
                className="w-full bg-slate-50 text-[#1E3A8A] border border-slate-200 font-extrabold text-base py-4 rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <Navigation size={18} />
                Use Current Location
              </button>

              <button 
                type="submit"
                disabled={!location}
                className="w-full bg-[#0C831F] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-green-600/30 active:scale-95 transition-all mt-6 disabled:opacity-50 disabled:active:scale-100"
              >
                Complete Setup
              </button>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
