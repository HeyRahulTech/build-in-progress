"use client";
import React, { useState } from 'react';
import { ArrowLeft, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function BookingPage() {
  const router = useRouter();
  const [selectedDate, setSelectedDate] = useState('Today');
  const [serviceDuration, setServiceDuration] = useState('Hourly');
  const [selectedSlot, setSelectedSlot] = useState('');

  const dates = ['Today', 'Tomorrow', 'Day after Tomorrow'];
  const hourlySlots = ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM'];
  const dayWiseSlots = ['07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM'];

  const slots = serviceDuration === 'Hourly' ? hourlySlots : dayWiseSlots;

  const handleSearch = () => {
    // In a real app, send requirements to AI matching agent
    router.push('/workers'); // We would build a workers page to display the results
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center sticky top-0 z-50">
        <button onClick={() => router.back()} className="mr-4">
          <ArrowLeft size={24} className="text-navy-900" />
        </button>
        <h1 className="font-bold text-xl text-navy-900">Schedule Service</h1>
      </header>

      {/* Date Selection */}
      <section className="p-4 mt-2">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><CalendarIcon size={18} /> Select Date</h3>
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {dates.map(date => (
            <button 
              key={date}
              onClick={() => setSelectedDate(date)}
              className={`flex-shrink-0 px-5 py-3 rounded-xl font-semibold border-2 transition-all ${selectedDate === date ? 'border-orange-600 bg-orange-50 text-orange-600' : 'border-slate-200 bg-white text-slate-600'}`}
            >
              {date}
            </button>
          ))}
        </div>
      </section>

      {/* Service Duration */}
      <section className="p-4">
        <h3 className="font-bold text-lg mb-3">Service Duration</h3>
        <div className="flex bg-slate-200 rounded-xl p-1">
          {['Hourly', 'Day-wise'].map(type => (
            <button 
              key={type}
              onClick={() => setServiceDuration(type)}
              className={`flex-1 py-3 rounded-lg font-semibold transition-all ${serviceDuration === type ? 'bg-white shadow-sm text-navy-900' : 'text-slate-500'}`}
            >
              {type}
            </button>
          ))}
        </div>
        {serviceDuration === 'Day-wise' && (
          <p className="text-xs text-slate-500 mt-2 ml-1">* Day-wise shift is 8 straight hours.</p>
        )}
      </section>

      {/* Time Slot Selection */}
      <section className="p-4">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2"><Clock size={18} /> Select Time Slot</h3>
        <div className="grid grid-cols-3 gap-3">
          {slots.map(slot => (
            <button 
              key={slot}
              onClick={() => setSelectedSlot(slot)}
              className={`py-3 rounded-xl text-sm font-semibold border-2 transition-all ${selectedSlot === slot ? 'border-orange-600 bg-orange-600 text-white shadow-md' : 'border-slate-200 bg-white text-slate-600'}`}
            >
              {slot}
            </button>
          ))}
        </div>
      </section>

      {/* Fixed Bottom Button */}
      <div className="fixed bottom-0 w-full bg-white border-t p-4 pb-safe z-50">
        <button 
          onClick={handleSearch}
          disabled={!selectedSlot}
          className="w-full bg-navy-900 disabled:bg-slate-300 text-white py-4 rounded-xl font-bold shadow-md active:scale-95 transition-all"
        >
          Find Available Workers
        </button>
      </div>
    </div>
  );
}
