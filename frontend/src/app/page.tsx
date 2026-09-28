"use client";
import React, { useState, useEffect } from 'react';
import { MapPin, User, Wallet, ShieldCheck, Zap, Calendar, Clock, Wrench } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from './CartContext';
import { supabase } from '../lib/supabase';

export default function Home() {
  const router = useRouter();
  const [hourlyService, setHourlyService] = useState('Masons');
  const [hourlyDate, setHourlyDate] = useState('');
  const [hourlyTime, setHourlyTime] = useState('');
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoading(false);
    } else {
      router.replace('/login');
    }
  }, [router]);

  if (isLoading) {
    return <div className="min-h-screen bg-[#F8FAFC]"></div>;
  }

  const handleScheduleOrder = async () => {
    if (!hourlyDate || !hourlyTime) {
      alert("Please select both a date and a time.");
      return;
    }
    
    if (!user) {
      alert("Please log in to book a service.");
      router.push('/login');
      return;
    }
    
    const newOrder = {
      customer_id: user.id,
      type: `Hourly Repair: ${hourlyService}`,
      day: hourlyDate,
      time: hourlyTime,
      duration: 'Hourly',
      status: 'pending'
    };

    const { error } = await supabase
      .from('orders')
      .insert([newOrder]);
      
    if (error) {
      alert("Failed to create order: " + error.message);
      return;
    }
    
    alert(`Order Generated Successfully! We are finding the best ${hourlyService} in your area.`);
    router.push('/bookings');
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 pb-20 font-sans">
      {/* Top Navigation */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex justify-between items-center sticky top-0 z-50 border-b border-slate-100">
        <div className="flex items-center text-green-700 font-extrabold text-2xl tracking-tight">
          Buildr.
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-700 bg-slate-100/80 px-4 py-1.5 rounded-full cursor-pointer hover:bg-slate-200 transition-colors border border-slate-200">
          <MapPin size={16} className="text-green-700" />
          <span className="font-semibold">Delhi, NCR</span>
        </div>
        <div className="flex gap-4 items-center">
          <Link href="/wallet" className="bg-slate-100/80 p-2.5 rounded-full hover:bg-slate-200 transition-colors border border-slate-200">
            <Wallet className="text-blue-900" size={20} />
          </Link>
          {/* User Identification Avatar */}
          <Link href={user ? "/profile" : "/login"} className="flex items-center gap-2 bg-blue-50/80 p-1 pr-4 rounded-full hover:bg-blue-100 transition-colors border border-blue-100">
            <div className="bg-blue-900 text-white rounded-full p-1.5 shadow-sm">
              <User size={16} />
            </div>
            <span className="text-sm font-bold text-blue-900">
              {user ? `Hi, ${user.name.split(' ')[0]}` : 'Log In'}
            </span>
          </Link>
        </div>
      </header>

      {/* Trust Badge Section */}
      <section className="bg-gradient-to-r from-[#FFFDE7] to-[#FFF9C4] text-slate-900 p-6 my-5 mx-4 rounded-[24px] shadow-lg flex items-center justify-between overflow-hidden relative border border-[#FFF59D]">
        <div className="relative z-10 w-2/3">
          <h2 className="text-xl font-extrabold mb-1 tracking-tight">Elite Tradesmen on Demand</h2>
          <p className="text-sm text-slate-600 font-medium">Top-rated experts for every project.</p>
        </div>
        <ShieldCheck size={64} className="text-green-600 relative z-10 drop-shadow-lg" />
        <div className="absolute right-[-40px] top-[-40px] w-40 h-40 bg-blue-500/20 rounded-full blur-3xl"></div>
      </section>

      {/* Booking Options */}
      <section className="px-4 mt-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-xl text-slate-800 tracking-tight">Book a Helper (Labour)</h3>
          <span className="bg-blue-100 text-[#1E3A8A] text-[10px] font-extrabold px-2 py-1 rounded uppercase tracking-wider">Fastest</span>
        </div>
        <p className="text-sm text-slate-500 font-medium mb-4 leading-relaxed">
          Need extra hands for your construction work? Get a helper instantly or schedule one for later.
        </p>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => router.push('/book-helper?type=instant')}
            className="group flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#FFFDE7] to-[#FFF9C4] text-slate-800 py-6 rounded-3xl font-bold shadow-[0_4px_20px_-4px_rgba(253,216,53,0.3)] hover:shadow-[0_8px_30px_-4px_rgba(253,216,53,0.4)] active:scale-95 transition-all border border-[#FFF59D]"
          >
            <div className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
              ⚡
            </div>
            <span className="tracking-wide text-sm">Instant Helper</span>
          </button>
          
          <button 
            onClick={() => router.push('/book-helper?type=schedule')}
            className="group flex flex-col items-center justify-center gap-3 bg-white border-2 border-slate-200 text-slate-800 py-6 rounded-3xl font-bold shadow-sm active:scale-95 transition-all hover:border-blue-800 hover:shadow-md"
          >
            <div className="text-4xl filter drop-shadow-sm group-hover:scale-110 transition-transform">
              📅
            </div>
            <span className="tracking-wide text-sm">Schedule Later</span>
          </button>
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

      {/* Hourly Repairs / Scheduled Services Section */}
      <section className="px-4 mt-10 mb-6">
        <div className="bg-white p-6 rounded-[24px] shadow-lg border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-2xl">🗓️</span>
            <h3 className="font-extrabold text-xl text-[#1E3A8A] tracking-tight">Schedule Hourly Repair</h3>
          </div>
          
          <p className="text-sm text-slate-500 font-medium mb-5 leading-relaxed">Need a fix? Pick a professional and choose a time that works for you.</p>
          
          {/* Service Selection */}
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">1. Select Service</h4>
          <div className="flex gap-2 overflow-x-auto pb-4 mb-2 no-scrollbar">
            {[
              { id: 'Masons', label: '🧱 Masons' },
              { id: 'Carpenters', label: '🪚 Carpenters' },
              { id: 'Electricians', label: '💡 Electricians' },
              { id: 'Plumbers', label: '🚰 Plumbers' }
            ].map((service) => (
              <div 
                key={service.id}
                onClick={() => setHourlyService(service.id)}
                className={`cursor-pointer px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap shadow-sm transition-all ${
                  hourlyService === service.id 
                    ? 'bg-[#0C831F] text-white' 
                    : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-[#0C831F]'
                }`}
              >
                {service.label}
              </div>
            ))}
          </div>

          {/* Date & Time Selection */}
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-3">2. Choose Date & Time</h4>
          <div className="grid grid-cols-2 gap-3 mb-6">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-3 relative focus-within:border-[#0C831F] transition-colors">
              <Calendar size={20} className="text-[#0C831F]" />
              <div className="flex flex-col w-full">
                <span className="text-[10px] uppercase font-bold text-slate-400">Date</span>
                <input 
                  type="date" 
                  value={hourlyDate}
                  onChange={(e) => setHourlyDate(e.target.value)}
                  className="bg-transparent text-sm font-extrabold text-[#1E3A8A] outline-none w-full cursor-pointer"
                />
              </div>
            </div>
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl flex items-center gap-3 relative focus-within:border-[#0C831F] transition-colors">
              <Clock size={20} className="text-[#0C831F]" />
              <div className="flex flex-col w-full">
                <span className="text-[10px] uppercase font-bold text-slate-400">Time</span>
                <input 
                  type="time" 
                  value={hourlyTime}
                  onChange={(e) => setHourlyTime(e.target.value)}
                  className="bg-transparent text-sm font-extrabold text-[#1E3A8A] outline-none w-full cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Action Button */}
          <button 
            onClick={handleScheduleOrder}
            className="w-full bg-[#1E3A8A] text-white text-base font-extrabold py-4 rounded-xl shadow-lg shadow-blue-900/20 active:scale-95 transition-transform flex justify-center items-center gap-2"
          >
            Generate Order
          </button>
        </div>
      </section>

      {/* Footer / Reassurance Section */}
      <section className="px-4 mt-6 mb-24 flex flex-col items-center text-center">
        <div className="text-6xl bg-white w-24 h-24 rounded-full flex items-center justify-center mb-4 shadow-xl border border-slate-100">
          👷‍♂️
        </div>
        <h4 className="font-extrabold text-blue-900 text-lg tracking-tight mb-1">"Relax, your home is in professional hands."</h4>
        <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Vetted • Certified • Safe</p>
      </section>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-[#F8F9FA]/95 backdrop-blur-xl border-t border-slate-200 flex justify-around py-3 pb-safe z-50 shadow-[0_-15px_25px_-5px_rgba(0,0,0,0.05)]">
        <NavItem label="Home" href="/" active />
        <NavItem label="Bookings" href="/bookings" />
        <NavItem label="Money" href="/money" />
      </nav>
    </div>
  );
}

function CategoryCard({ emoji, title, subtitle }: { emoji: string, title: string, subtitle: string }) {
  const router = useRouter();
  const { addToCart } = useCart();

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({ id: title, title, subtitle, emoji, price: 45 }); // Base $45 rate for prototype
    router.push('/review');
  };

  return (
    <div onClick={handleAdd} className="group overflow-hidden p-5 rounded-[24px] bg-white shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-slate-100 flex flex-col items-start gap-4 relative transition-all duration-300 hover:-translate-y-1 active:scale-95 cursor-pointer hover:border-slate-300 block">
      {/* Watermark */}
      <div className="absolute -right-8 -bottom-8 text-[120px] leading-none opacity-0 group-hover:opacity-[0.08] group-hover:-rotate-12 group-hover:scale-110 transition-all duration-500 pointer-events-none z-0">
        {emoji}
      </div>
      
      <div className="relative z-10 text-4xl bg-slate-50 w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner border border-slate-100 group-hover:scale-110 group-hover:bg-[#16A34A]/20 transition-all duration-300">
        {emoji}
      </div>
      <div className="relative z-10 text-left">
        <span className="font-extrabold text-[#1E3A8A] block text-lg tracking-tight mb-0.5">{title}</span>
        <span className="text-xs font-semibold text-slate-500">{subtitle}</span>
      </div>
      <div className="absolute z-10 bottom-5 right-5 bg-slate-100 rounded-full p-2 text-slate-500 group-hover:bg-[#0C831F] group-hover:text-white transition-all shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="M5 12h14"/></svg>
      </div>
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
