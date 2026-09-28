"use client";
import React, { useState } from 'react';
import { ArrowLeft, Wallet as WalletIcon, Plus, History } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function WalletPage() {
  const router = useRouter();
  const [amount, setAmount] = useState('');
  const quickAmounts = [100, 200, 500, 1000];

  const handleAddMoney = () => {
    alert(`Processing payment for ₹${amount}...`);
    setAmount('');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex items-center sticky top-0 z-50">
        <button onClick={() => router.back()} className="mr-4">
          <ArrowLeft size={24} className="text-blue-900" />
        </button>
        <h1 className="font-bold text-xl text-blue-900">Buildr Money</h1>
      </header>

      {/* Wallet Balance Card */}
      <section className="p-4">
        <div className="bg-gradient-to-br from-blue-900 to-blue-800 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <WalletIcon size={120} />
          </div>
          <p className="text-blue-100 font-medium mb-1">Available Balance</p>
          <h2 className="text-4xl font-bold mb-4">₹ 0.00</h2>
          <div className="flex gap-2 text-sm text-blue-200">
            <span className="bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
              <History size={14} /> View History
            </span>
          </div>
        </div>
      </section>

      {/* Add Money Section */}
      <section className="p-4 mt-2">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
          <h3 className="font-bold text-lg mb-4">Add Money</h3>
          
          <div className="relative mb-4">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 font-bold text-xl">₹</span>
            <input 
              type="number" 
              placeholder="Enter amount" 
              className="w-full pl-10 pr-4 py-4 rounded-xl border border-slate-300 outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all font-bold text-lg"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          <div className="flex flex-wrap gap-3 mb-6">
            {quickAmounts.map(val => (
              <button 
                key={val}
                onClick={() => setAmount(val.toString())}
                className="flex-1 min-w-[70px] py-2 bg-slate-100 rounded-lg font-semibold text-slate-700 hover:bg-orange-100 hover:text-orange-600 transition-colors"
              >
                +₹{val}
              </button>
            ))}
          </div>

          <button 
            onClick={handleAddMoney}
            disabled={!amount || parseInt(amount) <= 0}
            className="w-full bg-orange-600 disabled:bg-orange-300 text-white py-4 rounded-xl font-bold shadow-md active:scale-95 transition-all flex justify-center items-center gap-2"
          >
            <Plus size={20} />
            Proceed to Add Money
          </button>
        </div>
      </section>
    </div>
  );
}
