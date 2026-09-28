"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, IndianRupee, Save, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../../lib/supabase';

export default function WorkerDashboard() {
  const [city, setCity] = useState('');
  const [price, setPrice] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [pendingOrder, setPendingOrder] = useState<any>(null);

  // Mock worker details
  const MOCK_WORKER = {
    id: '64c9f1a2b3d4e5f6g7h8i9j0',
    name: 'Ravi Kumar',
    rating: '4.8',
    jobs: 142
  };

  useEffect(() => {
    const fetchPendingOrders = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('status', 'pending')
        .order('created_at', { ascending: false })
        .limit(1)
        .single();
        
      if (data) {
        setPendingOrder(data);
      } else {
        setPendingOrder(null);
      }
    };

    fetchPendingOrders();
    const interval = setInterval(() => {
      fetchPendingOrders();
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleSavePrice = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      const response = await fetch('/api/worker/price', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          workerId: MOCK_WORKER.id,
          city,
          price,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMsg(`Successfully set rate to ₹${price}/hr for ${city}!`);
        setCity('');
        setPrice('');
      } else {
        alert(data.error || 'Failed to save price');
      }
    } catch (error) {
      console.error(error);
      alert('Network error. Make sure your backend/database is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E3A8A] pb-24 font-sans">
      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 sticky top-0 z-50 border-b border-slate-200 flex justify-between items-center">
        <h1 className="font-extrabold text-xl tracking-tight">Worker Dashboard</h1>
        <Link href="/" className="text-sm font-bold text-[#0C831F] hover:underline">
          View App
        </Link>
      </header>

      <div className="p-5 mt-4">
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-200">
          <h2 className="text-lg font-extrabold mb-1">Set City Pricing</h2>
          <p className="text-slate-500 text-sm mb-6 font-medium">
            Enter a city and the hourly rate you want to charge. The platform automatically adds a 5% commission on top of your rate for the customer.
          </p>

          {successMsg && (
            <div className="mb-6 p-3 bg-green-50 border border-green-200 text-[#0C831F] rounded-xl flex items-center gap-2 text-sm font-bold animate-pulse">
              <CheckCircle size={18} />
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSavePrice} className="flex flex-col gap-4">
            
            {/* City Input */}
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">City Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin size={18} className="text-slate-400" />
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g., Delhi, DL"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C831F] focus:border-transparent transition-all font-semibold"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </div>

            {/* Price Input */}
            <div>
              <label className="block text-sm font-bold mb-2 text-slate-700">Your Base Rate (₹ / hr)</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <IndianRupee size={18} className="text-slate-400" />
                </div>
                <input
                  type="number"
                  required
                  min="50"
                  placeholder="400"
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0C831F] focus:border-transparent transition-all font-semibold"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              disabled={loading}
              className="mt-4 w-full bg-[#0C831F] text-white font-extrabold text-lg py-4 rounded-xl shadow-lg shadow-green-500/30 hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <><Loader2 className="animate-spin" size={20} /> Saving...</>
              ) : (
                <><Save size={20} /> Save My Rate</>
              )}
            </button>
          </form>
        </div>

        {/* Incoming Orders Section */}
        <div className="mt-6">
          <h2 className="text-lg font-extrabold mb-4">Live Radar (Nearby Orders)</h2>
          
          {!pendingOrder ? (
            <div className="bg-slate-100 p-8 rounded-3xl text-center border border-slate-200">
              <div className="w-16 h-16 bg-blue-100 text-[#1E3A8A] rounded-full flex items-center justify-center mx-auto mb-3">
                <MapPin size={24} className="animate-bounce" />
              </div>
              <p className="text-slate-600 font-bold">Scanning for jobs...</p>
              <p className="text-xs text-slate-400 mt-1">Make sure your pricing is set to receive orders.</p>
            </div>
          ) : (
            <div className="bg-white p-5 rounded-3xl shadow-lg border-2 border-[#0C831F] animate-fade-in-up relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-[#0C831F] text-white text-[10px] font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                New
              </div>
              <h3 className="font-extrabold text-[#1E3A8A] text-lg mb-1">{pendingOrder.type} Request</h3>
              <div className="flex gap-4 mb-4 mt-3">
                <div className="bg-slate-50 px-3 py-2 rounded-lg flex-1 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Date</p>
                  <p className="text-sm font-extrabold text-slate-700">{pendingOrder.day}</p>
                </div>
                <div className="bg-slate-50 px-3 py-2 rounded-lg flex-1 border border-slate-100">
                  <p className="text-[10px] uppercase font-bold text-slate-400">Time</p>
                  <p className="text-sm font-extrabold text-slate-700">{pendingOrder.time}</p>
                </div>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 border-b border-slate-100 pb-3">Duration: {pendingOrder.duration}</p>
              
              <button 
                onClick={async () => {
                  const { error } = await supabase
                    .from('orders')
                    .update({ 
                      status: 'confirmed',
                      // worker_id: MOCK_WORKER.id 
                    })
                    .eq('id', pendingOrder.id);

                  if (error) {
                    alert("Failed to accept order: " + error.message);
                    return;
                  }
                  
                  setPendingOrder(null);
                  alert('You accepted the job! The customer has been notified.');
                }}
                className="w-full bg-[#0C831F] text-white py-4 rounded-xl font-extrabold shadow-lg shadow-green-600/30 active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                Accept Order
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
