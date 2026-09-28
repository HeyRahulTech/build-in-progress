'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Clock, CheckCircle2, MapPin, User } from 'lucide-react';
import Link from 'next/link';
import { supabase } from '../../lib/supabase';

export default function BookingsPage() {
  const router = useRouter();
  const [orders, setOrders] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'active' | 'completed'>('active');

  useEffect(() => {
    const fetchOrders = async () => {
      const storedUser = localStorage.getItem('user');
      if (!storedUser) return;
      const user = JSON.parse(storedUser);

      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('customer_id', user.id)
        .order('created_at', { ascending: false });

      if (data) setOrders(data);
    };

    fetchOrders();
    const interval = setInterval(() => {
      fetchOrders();
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <header className="bg-white px-4 py-5 shadow-sm flex items-center gap-3">
        <button onClick={() => router.push('/')} className="p-2 -ml-2 bg-slate-50 rounded-full text-slate-700">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="font-extrabold text-[#1E3A8A] text-xl tracking-tight">My Bookings</h1>
        </div>
      </header>

      <div className="bg-white px-4 border-b border-slate-200 flex gap-4">
        <button 
          onClick={() => setActiveTab('active')}
          className={`py-3 text-sm font-extrabold border-b-2 transition-colors ${activeTab === 'active' ? 'border-[#0C831F] text-[#0C831F]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Active
        </button>
        <button 
          onClick={() => setActiveTab('completed')}
          className={`py-3 text-sm font-extrabold border-b-2 transition-colors ${activeTab === 'completed' ? 'border-[#0C831F] text-[#0C831F]' : 'border-transparent text-slate-400 hover:text-slate-600'}`}
        >
          Completed
        </button>
      </div>

      <main className="p-4 flex flex-col gap-4">
        {orders.filter(o => activeTab === 'active' ? o.status !== 'completed' : o.status === 'completed').length === 0 ? (
          <div className="text-center text-slate-500 mt-20">
            <p>No {activeTab} bookings found.</p>
          </div>
        ) : (
          orders.filter(o => activeTab === 'active' ? o.status !== 'completed' : o.status === 'completed').map((order: any, idx: number) => (
            <div key={order.id || idx} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-extrabold text-[#1E3A8A] text-lg">{order.type}</h3>
                  <p className="text-sm font-bold text-slate-500">{order.day} • {order.time}</p>
                  <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">{order.duration}</p>
                </div>
                <div className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  order.status === 'pending' ? 'bg-orange-100 text-orange-600' : 
                  order.status === 'completed' ? 'bg-slate-100 text-slate-600' : 
                  'bg-green-100 text-[#0C831F]'
                }`}>
                  {order.status === 'pending' ? 'Searching...' : 
                   order.status === 'completed' ? 'Completed' : 'Confirmed'}
                </div>
              </div>

              {order.status === 'pending' && (
                <div className="bg-orange-50 border border-orange-100 rounded-2xl p-4 flex items-center gap-3 animate-pulse">
                  <Clock className="text-orange-500" size={24} />
                  <p className="text-sm font-bold text-orange-700">Waiting for a worker to accept your request...</p>
                </div>
              )}

              {order.status === 'confirmed' && (
                <div className="bg-green-50 border border-green-100 rounded-2xl p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircle2 className="text-[#0C831F]" size={24} />
                    <p className="text-sm font-bold text-green-800">Your worker is on the way!</p>
                  </div>
                  {order.worker && (
                    <div className="bg-white rounded-xl p-3 flex items-center gap-3 shadow-sm border border-green-100 mb-3">
                      <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center">
                        <User className="text-slate-400" size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-extrabold text-[#1E3A8A]">{order.worker.name}</p>
                        <p className="text-xs font-bold text-slate-500 flex items-center gap-1">
                          ⭐ {order.worker.rating} • {order.worker.jobs} jobs
                        </p>
                      </div>
                    </div>
                  )}
                  <button 
                    onClick={async () => {
                      const { error } = await supabase
                        .from('orders')
                        .update({ status: 'completed' })
                        .eq('id', order.id);
                        
                      if (!error) {
                        const updatedOrders = orders.map((o: any) => 
                          o.id === order.id ? { ...o, status: 'completed' } : o
                        );
                        setOrders(updatedOrders);
                      }
                    }}
                    className="w-full bg-white border border-[#0C831F] text-[#0C831F] font-bold py-2 rounded-xl text-sm active:scale-95 transition-all"
                  >
                    Mark Job as Completed
                  </button>
                </div>
              )}

              {order.status === 'completed' && order.worker && (
                <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 mt-2">
                  <p className="text-xs font-bold text-slate-500 mb-2 uppercase tracking-wider">Completed By</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center">
                      <User className="text-slate-400" size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-extrabold text-[#1E3A8A]">{order.worker.name}</p>
                      <p className="text-xs font-bold text-slate-500">
                        ⭐ {order.worker.rating} • {order.worker.jobs} jobs
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-[#F8F9FA]/95 backdrop-blur-xl border-t border-slate-200 flex justify-around py-3 pb-safe z-50 shadow-[0_-15px_25px_-5px_rgba(0,0,0,0.05)]">
        <NavItem label="Home" href="/" />
        <NavItem label="Bookings" href="/bookings" active />
        <NavItem label="Money" href="/money" />
      </nav>
    </div>
  );
}

function NavItem({ label, active = false, href }: { label: string, active?: boolean, href?: string }) {
  const content = (
    <div className={`flex flex-col items-center cursor-pointer transition-colors ${active ? 'text-[#0C831F]' : 'text-[#1E3A8A] opacity-50 hover:opacity-100'}`}>
      <div className="h-8 w-8 mb-1 flex items-center justify-center transition-all">
        {label === 'Home' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
        {label === 'Bookings' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>}
        {label === 'Money' && <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>}
      </div>
      <span className="text-[11px] font-bold">{label}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return content;
}
