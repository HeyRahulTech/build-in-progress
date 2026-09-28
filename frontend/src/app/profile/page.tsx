'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronLeft, User, Phone, Mail, MapPin, LogOut } from 'lucide-react';
import Link from 'next/link';

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      router.push('/login');
    }
  }, [router]);

  if (!user) return <div className="min-h-screen bg-slate-50"></div>;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans pb-24">
      <header className="bg-white px-4 py-5 shadow-sm flex items-center gap-3">
        <button onClick={() => router.push('/')} className="p-2 -ml-2 bg-slate-50 rounded-full text-slate-700">
          <ChevronLeft size={20} />
        </button>
        <div>
          <h1 className="font-extrabold text-[#1E3A8A] text-xl tracking-tight">My Profile</h1>
        </div>
      </header>

      <main className="p-4 flex flex-col gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col items-center text-center animate-fade-in-up">
          <div className="w-24 h-24 bg-blue-50 text-[#1E3A8A] rounded-full flex items-center justify-center mb-4 border-4 border-white shadow-md">
            <User size={40} />
          </div>
          <h2 className="text-2xl font-extrabold text-[#1E3A8A]">{user.name}</h2>
          <p className="text-sm font-bold text-slate-500 uppercase tracking-widest mt-1">USER</p>
        </div>

        <div>
          <h3 className="font-extrabold text-lg text-slate-800 mb-4 px-2">Account Details</h3>
          
          <div className="bg-white rounded-3xl p-2 shadow-sm border border-slate-100 flex flex-col gap-1">
            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors rounded-2xl">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500">
                <Phone size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mobile Number</p>
                <p className="text-sm font-extrabold text-slate-700">+91 {user.phone}</p>
              </div>
            </div>

            <div className="h-px bg-slate-100 mx-4"></div>

            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors rounded-2xl">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500">
                <Mail size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email Address</p>
                <p className="text-sm font-extrabold text-slate-700">{user.email || 'Not provided'}</p>
              </div>
            </div>

            <div className="h-px bg-slate-100 mx-4"></div>

            <div className="flex items-center gap-4 p-4 hover:bg-slate-50 transition-colors rounded-2xl">
              <div className="w-10 h-10 bg-slate-50 rounded-full flex items-center justify-center text-slate-500">
                <MapPin size={18} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Saved Location</p>
                <p className="text-sm font-extrabold text-slate-700">{user.location}</p>
              </div>
            </div>
          </div>
        </div>

        <button 
          onClick={() => {
            localStorage.removeItem('user');
            router.push('/');
          }}
          className="w-full bg-red-50 text-red-600 font-extrabold text-base py-4 rounded-2xl active:scale-95 transition-all flex items-center justify-center gap-2 mt-4"
        >
          <LogOut size={18} />
          Log Out
        </button>
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full max-w-md bg-[#F8F9FA]/95 backdrop-blur-xl border-t border-slate-200 flex justify-around py-3 pb-safe z-50 shadow-[0_-15px_25px_-5px_rgba(0,0,0,0.05)]">
        <NavItem label="Home" href="/" />
        <NavItem label="Bookings" href="/bookings" />
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
