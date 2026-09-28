"use client";
import React, { useState } from 'react';
import { ArrowLeft, Star, MapPin, Briefcase, Phone, MessageSquare, ShieldCheck, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { useCart } from '../CartContext';
import { useRouter } from 'next/navigation';
import { supabase } from '../../lib/supabase';

export default function MatchWorkers() {
  const router = useRouter();
  const { cart } = useCart();
  const [selectedWorkerId, setSelectedWorkerId] = useState<string | null>(null);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Mock workers data - usually fetched from backend based on location & service
  const workers = [
    {
      id: 'w1',
      name: 'Raju Verma',
      profession: 'Master Plumber',
      rating: 4.9,
      reviews: 124,
      distance: '1.2 km away',
      price: 450,
      jobsCompleted: '150+ jobs completed',
      avatar: '👨‍🔧',
      isVerified: true
    },
    {
      id: 'w2',
      name: 'Ramesh Mistri',
      profession: 'Expert Carpenter',
      rating: 4.7,
      reviews: 89,
      distance: '3.4 km away',
      price: 400,
      jobsCompleted: '80+ jobs completed',
      avatar: '👷‍♂️',
      isVerified: true
    },
    {
      id: 'w3',
      name: 'Amit Sharma',
      profession: 'Licensed Electrician',
      rating: 5.0,
      reviews: 42,
      distance: '4.1 km away',
      price: 550,
      jobsCompleted: '50+ jobs completed',
      avatar: '👩‍🔧',
      isVerified: true
    },
    {
      id: 'w4',
      name: 'Suresh Yadav',
      profession: 'Senior Mason',
      rating: 4.8,
      reviews: 95,
      distance: '2.5 km away',
      price: 350,
      jobsCompleted: '110+ jobs completed',
      avatar: '🧱',
      isVerified: true
    }
  ];

  const filteredWorkers = workers.filter((worker) => {
    if (cart.length === 0) return true; 

    return cart.some(item => {
      const categorySingular = item.title.toLowerCase().replace(/s$/, ''); 
      return worker.profession.toLowerCase().includes(categorySingular);
    });
  });

  const otherWorkers = workers.filter(w => !filteredWorkers.includes(w));

  const handleBookWorker = (workerId: string) => {
    setSelectedWorkerId(workerId);
  };

  const renderWorkerCard = (worker: any) => (
    <div 
      key={worker.id} 
      className={`bg-white p-5 rounded-2xl shadow-sm border transition-all ${
        selectedWorkerId === worker.id ? 'border-[#0C831F] ring-2 ring-green-100' : 'border-slate-200'
      }`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center text-2xl border border-blue-100">
            {worker.avatar}
          </div>
          <div>
            <h3 className="font-extrabold text-lg text-[#1E3A8A] flex items-center gap-1 leading-tight">
              {worker.name} 
              {worker.isVerified && <ShieldCheck size={16} className="text-[#0C831F]" />}
            </h3>
            <p className="text-xs font-bold text-slate-500 mb-1">{worker.profession}</p>
            <div className="flex items-center gap-1 text-sm font-bold text-yellow-500 leading-none">
              <Star size={14} fill="currentColor" />
              <span>{worker.rating}</span>
              <span className="text-slate-400 font-medium">({worker.reviews})</span>
            </div>
          </div>
        </div>
        <div className="text-right">
          <span className="block font-extrabold text-xl text-[#0C831F]">₹{worker.price}</span>
          <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Per Hour</span>
        </div>
      </div>

      <div className="flex flex-col gap-1 mb-4 border-t border-slate-100 pt-3">
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <MapPin size={16} className="text-slate-400" />
          {worker.distance}
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
          <Briefcase size={16} className="text-slate-400" />
          {worker.jobsCompleted}
        </div>
      </div>

      {isConfirmed && selectedWorkerId === worker.id ? (
        <div className="animate-fade-in-up">
          <div className="bg-green-50 text-[#0C831F] p-3 rounded-xl flex items-center gap-2 text-sm font-bold mb-3 border border-green-200">
            <CheckCircle size={18} />
            Booking Confirmed!
          </div>
          
          <div className="flex gap-2">
            <button className="flex-1 bg-white border border-slate-200 text-[#1E3A8A] font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-sm active:scale-95 transition-transform">
              <MessageSquare size={18} />
              Secure Chat
            </button>
            <button className="flex-1 bg-[#1E3A8A] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md shadow-blue-900/20 active:scale-95 transition-transform">
              <Phone size={18} />
              Secure Call
            </button>
          </div>
          <p className="text-center text-[10px] font-semibold text-slate-400 mt-2">
            Your phone number is hidden to protect your privacy.
          </p>
        </div>
      ) : (
        <button 
          onClick={() => handleBookWorker(worker.id)}
          className={`w-full font-extrabold text-sm py-3 rounded-xl transition-colors ${
            selectedWorkerId === worker.id
              ? 'bg-[#0C831F] text-white shadow-lg shadow-green-500/30'
              : 'bg-slate-100 text-[#1E3A8A] hover:bg-slate-200'
          }`}
        >
          {selectedWorkerId === worker.id ? 'Selected' : 'Select Worker'}
        </button>
      )}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-24 font-sans">
      <header className="bg-white/80 backdrop-blur-md p-4 sticky top-0 z-50 flex items-center justify-between border-b border-slate-200">
        <button onClick={() => router.back()} className="p-2 bg-slate-100 rounded-full text-[#1E3A8A]">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
          <h1 className="font-extrabold text-xl text-[#1E3A8A] tracking-tight">Available Workers</h1>
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center justify-center gap-1 mt-0.5">
            <MapPin size={12} /> Delhi, NCR
          </p>
        </div>
        <div className="w-9" /> {/* Spacer */}
      </header>

      <div className="p-4">
        {filteredWorkers.length > 0 && (
          <p className="text-sm font-semibold text-slate-500 mb-4">
            Found {filteredWorkers.length} {cart.length > 0 ? cart.map(c => c.title).join(', ') : 'professionals'} ready to help.
          </p>
        )}

        {filteredWorkers.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl text-center shadow-sm border border-slate-200 mb-6">
            <div className="text-4xl mb-3">🕵️‍♂️</div>
            <h3 className="font-extrabold text-[#1E3A8A] text-lg mb-2">No direct matches</h3>
            <p className="font-medium text-slate-500 text-sm">We couldn't find professionals matching your exact selected services right now.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-4 mb-8">
            {filteredWorkers.map(renderWorkerCard)}
          </div>
        )}

      </div>

      {/* Fixed Confirm Button */}
      {selectedWorkerId && !isConfirmed && (
        <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 p-4 pb-safe shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-50">
          <button 
            onClick={async () => {
              const storedUser = localStorage.getItem('user');
              if (!storedUser) {
                alert("Please log in first.");
                router.push('/login');
                return;
              }
              const user = JSON.parse(storedUser);

              const confirmedWorker = workers.find(w => w.id === selectedWorkerId);
              const services = cart.map((c: any) => c.title).join(', ');
              
              const newOrder = {
                customer_id: user.id,
                type: `Construction: ${services || 'Services'}`,
                day: 'Scheduled Date', 
                time: 'Scheduled Time',
                duration: 'Project Based',
                status: 'confirmed', // Assuming this goes straight to confirmed since worker is selected
                price: confirmedWorker ? confirmedWorker.price : null
                // We're omitting worker_id since workers in Supabase are tied to the auth system, but for now we skip complex mapping.
              };

              const { error } = await supabase
                .from('orders')
                .insert([newOrder]);

              if (error) {
                alert("Failed to confirm booking: " + error.message);
                return;
              }

              setIsConfirmed(true);
            }}
            className="w-full bg-[#1E3A8A] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-blue-900/30 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Confirm Selected Worker
          </button>
        </div>
      )}
    </div>
  );
}
