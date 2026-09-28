'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, IndianRupee, ArrowDownRight, ArrowUpRight, Plus, History } from 'lucide-react';
import Link from 'next/link';

export default function MoneyPage() {
  const router = useRouter();
  const [completedOrders, setCompletedOrders] = useState<any[]>([]);

  useEffect(() => {
    const storedOrders = localStorage.getItem('orders');
    if (storedOrders) {
      const parsed = JSON.parse(storedOrders);
      // Filter only completed orders for payment history
      const completed = parsed.filter((o: any) => o.status === 'completed');
      setCompletedOrders(completed);
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-24">
      <header className="bg-white px-4 py-5 shadow-sm flex items-center gap-3">
        <button onClick={() => router.push('/')} className="p-2 -ml-2 bg-slate-50 rounded-full text-slate-700">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="font-extrabold text-[#1E3A8A] text-xl tracking-tight">Wallet</h1>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-6">
        {/* Wallet Balance Card */}
        <div className="bg-blue-900 rounded-3xl p-6 text-white shadow-xl shadow-blue-900/20 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
          
          <p className="text-blue-200 text-sm font-bold uppercase tracking-widest mb-1">Available Balance</p>
          <div className="flex items-center gap-1 mb-6">
            <IndianRupee size={28} className="text-white" />
            <h2 className="text-4xl font-extrabold">2,450</h2>
          </div>
          
          <button className="w-full bg-white text-[#1E3A8A] font-extrabold py-3 rounded-xl flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md">
            <Plus size={20} />
            Add Money
          </button>
        </div>

        {/* Payment History */}
        <div>
          <h3 className="font-extrabold text-lg text-slate-800 mb-4 flex items-center gap-2">
            <History size={18} className="text-slate-400" />
            Payment History
          </h3>

          <div className="flex flex-col gap-3">
            {completedOrders.length === 0 ? (
              <div className="bg-white p-6 rounded-2xl border border-slate-100 text-center">
                <p className="text-slate-500 font-bold text-sm">No recent payments for services.</p>
                <p className="text-slate-400 text-xs mt-1">Complete a booking to see it here.</p>
              </div>
            ) : (
              completedOrders.map((order, idx) => (
                <div key={idx} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-red-50 text-red-500 rounded-full flex items-center justify-center">
                      <ArrowUpRight size={20} />
                    </div>
                    <div>
                      <p className="font-extrabold text-[#1E3A8A] text-sm">{order.type}</p>
                      <p className="text-xs font-bold text-slate-400">{new Date(order.timestamp).toLocaleDateString()} • To {order.worker?.name || 'Helper'}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-extrabold text-slate-800 flex items-center justify-end">
                      -<IndianRupee size={12} />{order.worker?.price || 400}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Paid</p>
                  </div>
                </div>
              ))
            )}

            {/* Dummy Add Money Transaction */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex items-center justify-between opacity-70">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-50 text-[#0C831F] rounded-full flex items-center justify-center">
                  <ArrowDownRight size={20} />
                </div>
                <div>
                  <p className="font-extrabold text-[#1E3A8A] text-sm">Added to Wallet</p>
                  <p className="text-xs font-bold text-slate-400">Previous transaction</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-[#0C831F] flex items-center justify-end">
                  +<IndianRupee size={12} />1,000
                </p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Success</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-[#F8F9FA]/95 backdrop-blur-xl border-t border-slate-200 flex justify-around py-3 pb-safe z-50 shadow-[0_-15px_25px_-5px_rgba(0,0,0,0.05)]">
        <NavItem label="Home" href="/" />
        <NavItem label="Bookings" href="/bookings" />
        <NavItem label="Money" href="/money" active />
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
