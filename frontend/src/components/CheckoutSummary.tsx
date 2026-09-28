import React from 'react';
import { Zap, ShieldCheck } from 'lucide-react';

type CheckoutSummaryProps = {
  workerBaseRate: number | null; // null if the price hasn't been fetched yet
  quantity: number;
  isLoading: boolean;
};

export default function CheckoutSummary({ workerBaseRate, quantity, isLoading }: CheckoutSummaryProps) {
  // If we don't have a rate yet (e.g., waiting on API or user hasn't selected a city)
  if (!workerBaseRate || isLoading) {
    return (
      <div className="mt-4 bg-[#1E3A8A] text-white p-5 rounded-2xl shadow-xl border border-[#1A252F] animate-pulse">
        <h3 className="font-extrabold text-lg mb-4">Booking Summary</h3>
        <p className="text-slate-300 text-sm">Calculating exact pricing based on worker's city rates...</p>
      </div>
    );
  }

  // Exact Math matching the backend
  const subtotal = workerBaseRate * quantity;
  const platformFee = subtotal * 0.05; // 5% fee
  const gst = (subtotal + platformFee) * 0.18; // 18% GST (Taxes)
  const total = subtotal + platformFee + gst;

  return (
    <div className="mt-4 bg-[#1E3A8A] text-white p-5 rounded-2xl shadow-xl relative overflow-hidden border border-[#1A252F]">
      <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
        <Zap size={150} />
      </div>
      
      <div className="flex items-center gap-2 mb-4 relative z-10">
        <h3 className="font-extrabold text-lg">Booking Summary</h3>
        <ShieldCheck size={18} className="text-[#0C831F]" />
      </div>

      <div className="relative z-10 flex flex-col gap-3">
        {/* Worker Subtotal */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-300 font-medium">
            Worker Rate (₹{workerBaseRate}/hr x {quantity} hrs)
          </span>
          <span className="font-bold">₹{subtotal.toFixed(2)}</span>
        </div>

        {/* Platform Fee */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-300 font-medium">Platform Fee (5%)</span>
          <span className="font-bold">₹{platformFee.toFixed(2)}</span>
        </div>

        {/* GST */}
        <div className="flex justify-between items-center text-sm">
          <span className="text-slate-300 font-medium">GST / Taxes (18%)</span>
          <span className="font-bold">₹{gst.toFixed(2)}</span>
        </div>

        <div className="border-t border-slate-600 my-2"></div>

        {/* Final Total */}
        <div className="flex justify-between items-center">
          <span className="font-bold text-lg">Total Cost</span>
          <span className="font-extrabold text-2xl text-[#0C831F]">
            ₹{total.toFixed(2)}
          </span>
        </div>
        <p className="text-right text-[10px] text-slate-400 font-medium mt-1">
          Includes all fees and taxes.
        </p>
      </div>
    </div>
  );
}
