import React from 'react';
import { MapPin, User, Wallet, ShieldCheck, Zap, Calendar, Clock, Wrench } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 font-sans">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex justify-between items-center sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center text-orange-600 font-extrabold text-2xl tracking-tight">
          Buildr.
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-100/80 px-4 py-1.5 rounded-full cursor-pointer hover:bg-slate-200 transition-colors border border-slate-200">
          <MapPin size={16} className="text-orange-600" />
          <span className="font-semibold">New York, NY</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/wallet" className="bg-slate-100/80 p-2.5 rounded-full hover:bg-slate-200 transition-colors border border-slate-200">
            <Wallet className="text-navy-900" size={20} />
          </Link>
          {/* User Identification Avatar */}
          <Link href="/profile" className="flex items-center gap-2 bg-navy-50/80 p-1 pr-4 rounded-full hover:bg-navy-100 transition-colors border border-navy-100">
            <div className="bg-navy-900 text-white rounded-full p-1.5 shadow-sm">
              <User size={16} />
            </div>
            <span className="text-sm font-bold text-navy-900 hidden sm:block">Hi, User</span>
          </Link>
        </div>
      </header>

      {/* Trust Badge Section */}
      <section className="bg-gradient-to-br from-navy-900 via-navy-800 to-[#0F172A] text-white p-6 my-5 mx-4 rounded-[24px] shadow-xl flex items-center justify-between overflow-hidden relative border border-navy-700">
        <div className="relative z-10 w-2/3">
          <h2 className="text-xl font-extrabold mb-1 tracking-tight">Elite Tradesmen on Demand</h2>
          <p className="text-sm text-blue-200 font-medium">Top-rated experts for every project.</p>
        </div>
        <ShieldCheck size={64} className="text-orange-500 relative z-10 drop-shadow-lg" />
        <div className="absolute right-[-40px] top-[-40px] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* Booking Options */}
      <section className="px-4 mt-8">
        <h3 className="font-extrabold text-xl mb-4 text-slate-800 tracking-tight">Book a Service</h3>
        <div className="grid grid-cols-2 gap-4">
          <button className="group flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-navy-800 to-navy-900 text-white py-6 rounded-3xl font-bold shadow-lg shadow-navy-900/25 active:scale-95 transition-all border border-navy-700">
            <div className="text-4xl filter drop-shadow-md group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <span className="tracking-wide">Instant Service</span>
          </button>
          
          <Link href="/booking" className="group flex flex-col items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-800 py-6 rounded-3xl font-bold shadow-sm active:scale-95 transition-all hover:border-navy-800 hover:shadow-md">
            <div className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
              📅
            </div>
            <span className="tracking-wide">Schedule Later</span>
          </Link>
        </div>
      </section>

      {/* Top Categories */}
      <section className="px-4 mt-10">
        <h3 className="font-extrabold text-xl mb-4 text-slate-800 tracking-tight">All construction & renovation services.</h3>
        <div className="grid grid-cols-2 gap-4">
          <CategoryCard 
            emoji="🧱" 
            title="Masons" 
            subtitle="Bricks & Concrete"
          />
          <CategoryCard 
            emoji="🪚" 
            title="Carpenters" 
            subtitle="Wood & Furniture"
          />
          <CategoryCard 
            emoji="💡" 
            title="Electricians" 
            subtitle="Wiring & Fixing"
          />
          <CategoryCard 
            emoji="🚰" 
            title="Plumbers" 
            subtitle="Pipes & Water"
          />
        </div>
      </section>

      {/* Hourly Repairs Section */}
      <section className="px-4 mt-10 mb-6">
        <div className="bg-gradient-to-r from-slate-900 to-slate-800 p-6 rounded-[24px] shadow-xl text-white relative overflow-hidden flex items-center justify-between border border-slate-700">
          <div className="relative z-10 w-2/3">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">🛠️</span>
              <h3 className="font-extrabold text-xl text-white tracking-tight">Hourly Repairs</h3>
            </div>
            <p className="text-sm text-slate-400 font-medium mb-4 leading-relaxed">Need a quick fix? Book professionals by the hour for small jobs and repairs.</p>
            <button className="bg-orange-500 text-white text-sm font-bold py-3 px-5 rounded-xl shadow-lg shadow-orange-500/20 active:scale-95 transition-transform hover:bg-orange-600">
              Find a Handyman
            </button>
          </div>
          <div className="absolute right-[-20px] bottom-[-20px] text-8xl opacity-10 transform -rotate-12">
            🔧
          </div>
          <div className="absolute right-0 top-0 w-32 h-32 bg-orange-500/10 rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Footer / Reassurance Section */}
      <section className="px-4 mt-6 mb-24 flex flex-col items-center text-center">
        <div className="text-6xl bg-white w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-xl border border-slate-100">
          👷‍♂️
        </div>
        <h4 className="font-extrabold text-navy-900 text-lg tracking-tight mb-1">"Relax, your home is in professional hands."</h4>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Vetted • Certified • Safe</p>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-white/90 backdrop-blur-xl border-t border-slate-200 flex justify-around py-3 pb-safe z-50 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)]">
        <NavItem label="Home" active />
        <NavItem label="Bookings" />
        <NavItem label="Money" />
      </nav>
    </div>
  );
}

function CategoryCard({ emoji, title, subtitle }: { emoji: string, title: string, subtitle: string }) {
  return (
    <div className="group p-5 rounded-[24px] bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col items-start gap-4 relative transition-all active:scale-95 cursor-pointer hover:border-slate-300">
      <div className="text-4xl bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner border border-slate-100 group-hover:scale-110 transition-transform">
        {emoji}
      </div>
      <div className="text-left">
        <span className="font-extrabold text-slate-800 block text-lg tracking-tight mb-0.5">{title}</span>
        <span className="text-xs font-semibold text-slate-500">{subtitle}</span>
      </div>
      <div className="absolute bottom-5 right-5 bg-slate-100 rounded-full p-2 text-slate-500 group-hover:bg-orange-500 group-hover:text-white transition-all shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
      </div>
    </div>
  );
}

function NavItem({ label, active = false }: { label: string, active?: boolean }) {
  return (
    <div className={`flex flex-col items-center cursor-pointer transition-colors ${active ? 'text-navy-900' : 'text-slate-400 hover:text-slate-800'}`}>
      <div className={`h-8 w-8 rounded-full mb-1 flex items-center justify-center transition-all ${active ? 'bg-navy-900 text-white shadow-md' : 'bg-transparent text-current'}`}>
        {label === 'Home' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>}
        {label === 'Bookings' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>}
        {label === 'Money' && <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="14" x="2" y="5" rx="2"/><line x1="2" x2="22" y1="10" y2="10"/></svg>}
      </div>
      <span className="text-[11px] font-bold">{label}</span>
    </div>
  );
}
