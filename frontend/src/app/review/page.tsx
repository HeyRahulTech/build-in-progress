"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft, Zap, Plus, Minus, Info, User, MapPin } from 'lucide-react';
import { useCart } from '../CartContext';
import { useRouter } from 'next/navigation';

export default function ReviewBooking() {
  const router = useRouter();
  const { cart, updateQuantity, totalItems, totalPrice } = useCart();
  const baseCalloutFee = 20.00;
  
  // Check if Electricians are in the cart to show the warning
  const hasElectricians = cart.some(item => item.title === 'Electricians');

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1E3A8A] pb-24 font-sans">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-sm p-4 flex items-center sticky top-0 z-50 border-b border-slate-200">
        <Link href="/" className="mr-4 p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
          <ArrowLeft size={20} className="text-[#1E3A8A]" />
        </Link>
        <h1 className="font-extrabold text-xl tracking-tight">Review Booking</h1>
      </header>

      {/* Top Indicator */}
      <div className="bg-gradient-to-r from-[#FFFDE7] to-[#FFF9C4] text-slate-800 border-b border-[#FFF59D] px-4 py-3 flex items-center justify-center gap-2 shadow-sm">
        <Zap size={20} className="animate-pulse text-[#F5B041]" />
        <span className="font-bold tracking-wide uppercase text-sm">Instant Service Selected</span>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {/* User Booking Details */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="font-bold text-sm text-slate-500 uppercase tracking-wider mb-3">Service Location & Details</h2>
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 text-[#1E3A8A] p-2 rounded-lg">
              <User size={20} />
            </div>
            <div>
              <p className="font-bold text-[#1E3A8A]">Rahul (You)</p>
              <p className="text-sm font-medium text-slate-600">+91 98765 43210</p>
            </div>
          </div>
          <div className="flex items-start gap-3 mt-4">
            <div className="bg-green-50 text-[#0C831F] p-2 rounded-lg">
              <MapPin size={20} />
            </div>
            <div>
              <p className="font-bold text-[#1E3A8A]">Current Location</p>
              <p className="text-sm font-medium text-slate-600 leading-snug">Connaught Place, Block A<br/>Delhi, DL 110001</p>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-start">
          <h2 className="font-bold text-lg text-[#1E3A8A]">Selected Services</h2>
          <span className="bg-[#1E3A8A] text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm">
            {totalItems} {totalItems === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col items-center justify-center text-center gap-4">
            <Info size={48} className="text-slate-300" />
            <div>
              <h3 className="font-bold text-lg text-[#1E3A8A] mb-1">Your cart is empty</h3>
              <p className="text-slate-500 text-sm">Go back and select a service to book.</p>
            </div>
            <Link href="/" className="mt-2 bg-[#1E3A8A] text-white px-6 py-2 rounded-full font-bold">
              Browse Services
            </Link>
          </div>
        ) : (
          <>
            {/* Dynamic Cart Items */}
            {cart.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-4 relative overflow-hidden">
                <div className="text-4xl bg-slate-50 w-16 h-16 rounded-xl flex items-center justify-center shadow-inner border border-slate-100">
                  {item.emoji}
                </div>
                <div className="flex-1">
                  <h3 className="font-extrabold text-[#1E3A8A] text-lg">{item.title}</h3>
                  <p className="text-xs font-semibold text-slate-500">{item.subtitle}</p>
                  <p className="text-[#0C831F] font-bold text-[10px] mt-1 bg-green-50 px-2 py-0.5 rounded w-max border border-green-200 uppercase tracking-wide">Dynamic Pricing</p>
                </div>
                
                {/* Add/Remove Controls */}
                <div className="flex flex-col items-center gap-2 bg-slate-50 p-2 rounded-xl border border-slate-100">
                  <button 
                    onClick={() => updateQuantity(item.id, 1)}
                    className="text-slate-400 hover:text-[#0C831F] transition-colors p-1"
                  >
                    <Plus size={18} strokeWidth={3} />
                  </button>
                  <span className="font-extrabold text-[#1E3A8A]">{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.id, -1)}
                    className="text-slate-400 hover:text-red-500 transition-colors p-1"
                  >
                    <Minus size={18} strokeWidth={3} />
                  </button>
                </div>
              </div>
            ))}

            {/* Dynamic Availability Warning Message */}
            {hasElectricians && (
              <div className="bg-red-50 border border-red-200 p-4 rounded-2xl flex items-start gap-3 shadow-sm mt-2">
                <div className="text-red-500 mt-0.5 animate-pulse">
                  <Zap size={20} />
                </div>
                <div>
                  <h4 className="text-red-800 font-bold text-sm mb-0.5">Limited Availability</h4>
                  <p className="text-red-600 text-xs font-medium leading-relaxed">Due to high demand, Electricians may not be immediately available for this slot. We will notify you if there's a delay.</p>
                </div>
              </div>
            )}

            {/* Right Side: Summary Card */}
            <div className="mt-4 bg-[#1E3A8A] text-white p-5 rounded-2xl shadow-xl relative overflow-hidden border border-[#1A252F]">
              <div className="absolute -right-10 -bottom-10 opacity-10">
                <Zap size={150} />
              </div>
              <h3 className="font-extrabold text-lg mb-4">Booking Summary</h3>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 font-medium">Total Services</span>
                <span className="font-bold">{totalItems}</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 font-medium">Platform Fee</span>
                <span className="font-bold text-xs bg-slate-700 px-2 py-1 rounded">5%</span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 font-medium">GST / Taxes</span>
                <span className="font-bold text-xs bg-slate-700 px-2 py-1 rounded">18%</span>
              </div>
              <div className="border-t border-slate-600 my-4"></div>
              <div className="flex justify-between items-center">
                <span className="font-bold text-lg">Total Cost</span>
                <span className="font-extrabold text-sm text-[#0C831F] text-right">Based on<br/>Worker Rate</span>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Fixed Checkout Button */}
      {cart.length > 0 && (
        <div className="fixed bottom-0 w-full max-w-md bg-white border-t border-slate-200 p-4 pb-safe shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.05)] z-50">
          <button 
            onClick={() => router.push('/match')}
            className="w-full bg-[#0C831F] text-white font-extrabold text-lg py-4 rounded-2xl shadow-lg shadow-green-500/30 hover:bg-green-600 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Confirm & Find Workers <ArrowLeft className="rotate-180" size={20} />
          </button>
        </div>
      )}
    </div>
  );
}
