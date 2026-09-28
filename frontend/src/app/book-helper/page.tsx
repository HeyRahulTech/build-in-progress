'use client';
import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function BookHelperPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const type = searchParams.get('type') || 'instant';

  const [helperDay, setHelperDay] = useState(type === 'instant' ? 'Today' : 'Tomorrow');
  const [helperDuration, setHelperDuration] = useState('Hourly');
  const [helperTime, setHelperTime] = useState('');

  const fullDaySlots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];
  const hourlySlots = ['7:00 AM', '8:00 AM', '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM', '7:00 PM', '8:00 PM'];
  
  const currentSlots = helperDuration === 'Full Day' ? fullDaySlots : hourlySlots;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans relative pb-24">
      {/* Header */}
      <header className="bg-white px-4 py-5 shadow-sm sticky top-0 z-50 flex items-center justify-between border-b border-slate-100">
        <div className="flex items-center gap-3">
          <button onClick={() => router.back()} className="p-2 -ml-2 bg-slate-50 rounded-full text-slate-700 active:scale-95 transition-transform">
            <ChevronLeft size={20} />
          </button>
          <div>
            <h1 className="font-extrabold text-[#1E3A8A] text-xl tracking-tight">
              {type === 'instant' ? 'Instant Helper' : 'Schedule Helper'}
            </h1>
            <p className="text-xs text-slate-500 font-bold">Select Date & Time</p>
          </div>
        </div>
      </header>

      <main className="p-4 flex-1">
        <div className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 mb-6">
          {/* Day Selection */}
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">1. Select Day</h4>
          <div className="flex gap-2 overflow-x-auto pb-2 mb-6 no-scrollbar">
            {['Today', 'Tomorrow', 'Day After Tomorrow'].map(day => (
              <button
                key={day}
                onClick={() => setHelperDay(day)}
                className={`px-4 py-3 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${
                  helperDay === day 
                    ? 'bg-[#0C831F] text-white border-[#0C831F] shadow-md shadow-green-500/20' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#0C831F]'
                }`}
              >
                {day}
              </button>
            ))}
          </div>

          {/* Duration Selection */}
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">2. Service Duration</h4>
          <div className="flex gap-2 mb-6">
            {['Hourly', 'Full Day'].map(dur => (
              <button
                key={dur}
                onClick={() => {
                  setHelperDuration(dur);
                  setHelperTime(''); // reset time on duration change
                }}
                className={`flex-1 py-4 rounded-xl text-sm font-bold transition-all border ${
                  helperDuration === dur 
                    ? 'bg-blue-50 text-[#1E3A8A] border-blue-200 shadow-sm ring-1 ring-blue-400' 
                    : 'bg-slate-50 text-slate-600 border-slate-200'
                }`}
              >
                {dur === 'Full Day' ? 'Day Wise (8 Hours)' : 'Hourly Basis'}
              </button>
            ))}
          </div>

          {/* Time Selection */}
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">3. Select Time</h4>
          <div className="flex flex-wrap gap-2 mb-2">
            {currentSlots.map(time => (
              <button
                key={time}
                onClick={() => setHelperTime(time)}
                className={`px-4 py-3 rounded-xl text-sm font-bold transition-all border ${
                  helperTime === time 
                    ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-md shadow-blue-900/20' 
                    : 'bg-slate-50 text-slate-600 border-slate-200 hover:border-[#1E3A8A]'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <button 
          onClick={async () => {
            if (!helperTime) {
              alert("Please select a time slot.");
              return;
            }
            
            const storedUser = localStorage.getItem('user');
            if (!storedUser) {
              alert("Please log in first.");
              router.push('/login');
              return;
            }
            const user = JSON.parse(storedUser);

            // Insert into Supabase
            const newOrder = {
              customer_id: user.id,
              type: 'Helper (Labour)',
              day: helperDay,
              duration: helperDuration,
              time: helperTime,
              status: 'pending'
            };
            
            const { error } = await supabase
              .from('orders')
              .insert([newOrder]);
              
            if (error) {
              alert("Failed to generate order: " + error.message);
              return;
            }
            
            alert("Order generated! Waiting for a helper to accept.");
            router.push('/bookings');
          }}
          className="w-full bg-[#1E3A8A] text-white py-4 rounded-2xl font-extrabold shadow-lg shadow-blue-900/30 active:scale-95 transition-all flex items-center justify-center gap-2"
        >
          <span className="text-xl">⚡</span>
          Generate Order
        </button>
      </main>
    </div>
  );
}
