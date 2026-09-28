"use client";
import React from 'react';
import { ArrowLeft, Star, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function WorkersPage() {
  const router = useRouter();

  // Mock data for workers
  const workers = [
    { id: 1, name: 'Michael Chen', category: 'Mason', rating: 4.8, reviews: 124, rate: 30, distance: '1.2 km', photo: 'M' },
    { id: 2, name: 'David Smith', category: 'Carpenter', rating: 4.9, reviews: 89, rate: 35, distance: '2.5 km', photo: 'D' },
  ];

  const handleBookNow = (id: number) => {
    alert(`Booking confirmed for worker ID: ${id}`);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      <header className="bg-white shadow-sm p-4 flex items-center sticky top-0 z-50">
        <button onClick={() => router.back()} className="mr-4">
          <ArrowLeft size={24} className="text-navy-900" />
        </button>
        <h1 className="font-bold text-xl text-navy-900">Available Workers</h1>
      </header>

      {/* AI Recommendation Banner */}
      <section className="p-4 mt-2">
        <div className="bg-orange-100 border border-orange-200 rounded-xl p-4 flex items-center gap-4">
          <div className="bg-orange-500 text-white p-2 rounded-full">
            <Star size={20} />
          </div>
          <div>
            <p className="text-sm font-bold text-orange-900">AI Match Found!</p>
            <p className="text-xs text-orange-800">Based on your requirements, we found the perfect professional.</p>
          </div>
        </div>
      </section>

      {/* Worker List */}
      <section className="p-4 flex flex-col gap-4">
        {workers.map(worker => (
          <div key={worker.id} className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-navy-100 text-navy-900 rounded-xl flex items-center justify-center font-bold text-2xl">
                {worker.photo}
              </div>
              <div className="flex-1">
                <h3 className="font-bold text-lg">{worker.name}</h3>
                <p className="text-sm text-slate-500 font-medium">{worker.category}</p>
                
                <div className="flex items-center gap-3 mt-2 text-xs font-semibold">
                  <span className="flex items-center gap-1 text-orange-600">
                    <Star size={14} fill="currentColor" /> {worker.rating} ({worker.reviews})
                  </span>
                  <span className="flex items-center gap-1 text-slate-500">
                    <MapPin size={14} /> {worker.distance}
                  </span>
                </div>
              </div>
            </div>
            
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-500 font-medium">Hourly Rate</p>
                <p className="font-bold text-lg">₹{worker.rate}/hr</p>
              </div>
              <button 
                onClick={() => handleBookNow(worker.id)}
                className="bg-navy-900 text-white px-6 py-2 rounded-xl font-bold shadow-md active:scale-95 transition-all"
              >
                Book Now
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
