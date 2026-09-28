"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MapPin, Search } from 'lucide-react';

export default function LocationSetupPage() {
  const router = useRouter();
  const [address, setAddress] = useState('');

  const handleConfirm = () => {
    // Save location to state/backend
    router.push('/');
  };

  return (
    <div className="p-6 h-screen flex flex-col bg-white">
      <div className="flex-1 mt-10">
        <h1 className="text-3xl font-bold text-navy-900 mb-2">Your Location</h1>
        <p className="text-slate-500 mb-8">We need your location to find nearby workers.</p>

        <button 
          onClick={handleConfirm}
          className="w-full bg-navy-50 text-navy-900 py-4 rounded-xl font-bold text-lg border-2 border-navy-100 flex items-center justify-center gap-3 active:scale-95 transition-all mb-6"
        >
          <MapPin className="text-navy-900" />
          Detect my location via GPS
        </button>
        
        <div className="relative flex items-center py-5">
          <div className="flex-grow border-t border-slate-200"></div>
          <span className="flex-shrink-0 mx-4 text-slate-400 text-sm font-medium">OR</span>
          <div className="flex-grow border-t border-slate-200"></div>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-semibold text-slate-700">Type address manually</label>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search area, landmark..."
              className="w-full pl-12 pr-4 py-4 rounded-xl border border-slate-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-medium"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
        </div>
      </div>
      
      <button
        onClick={handleConfirm}
        disabled={!address}
        className="mb-8 w-full bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold text-lg shadow-md active:scale-95 transition-all"
      >
        Confirm Location
      </button>
    </div>
  );
}
