"use client";

import { useEffect } from "react";
import Link from "next/link";
import { ShoppingBag, RotateCcw, Home, AlertTriangle } from "lucide-react";

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Shop Error:", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="relative mx-auto mb-8">
          <div className="absolute inset-0 w-32 h-32 mx-auto bg-amber-100/50 dark:bg-amber-900/20 rounded-[2rem] blur-2xl" />
          <div className="relative w-28 h-28 mx-auto rounded-[2rem] bg-white dark:bg-slate-900 border border-amber-100 dark:border-amber-900/30 shadow-xl shadow-amber-100/50 dark:shadow-none flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-amber-50/80 dark:from-amber-900/10 via-transparent to-amber-100/40 dark:to-transparent" />
            <ShoppingBag size={40} className="text-amber-500 dark:text-amber-400 relative z-10" strokeWidth={1.5} />
            <div className="absolute -bottom-1 -right-1">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
          Store Error
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-lg mb-2 font-medium leading-relaxed max-w-md mx-auto">
          We had trouble loading the store content. This could be a temporary issue — try refreshing.
        </p>

        {error.digest && (
          <p className="text-[11px] font-mono text-slate-400 dark:text-slate-600 mb-6">
            Ref: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
          <button
            onClick={reset}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-8 rounded-2xl font-bold text-base transition-all shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 active:scale-95"
          >
            <RotateCcw size={18} className="group-hover:rotate-[-360deg] transition-transform duration-500" />
            Refresh Page
          </button>

          <Link
            href="/products"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-3.5 px-8 rounded-2xl font-bold text-base transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95"
          >
            <ShoppingBag size={18} />
            Browse Products
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-4 text-sm font-medium text-slate-400 dark:text-slate-500">
          <Link href="/" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Home
          </Link>
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <Link href="/categories" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Categories
          </Link>
          <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">
            Help
          </Link>
        </div>
      </div>
    </main>
  );
}
