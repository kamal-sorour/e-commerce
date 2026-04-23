"use client";

import { useEffect } from "react";
import Link from "next/link";
import { KeyRound, RotateCcw, Home, AlertTriangle } from "lucide-react";

export default function AuthError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Auth Error:", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="relative mx-auto mb-8">
          <div className="absolute inset-0 w-32 h-32 mx-auto bg-violet-100/50 dark:bg-violet-900/20 rounded-[2rem] blur-2xl" />
          <div className="relative w-28 h-28 mx-auto rounded-[2rem] bg-white dark:bg-slate-900 border border-violet-100 dark:border-violet-900/30 shadow-xl shadow-violet-100/50 dark:shadow-none flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-linear-to-br from-violet-50/80 dark:from-violet-900/10 via-transparent to-violet-100/40 dark:to-transparent" />
            <KeyRound size={40} className="text-violet-500 dark:text-violet-400 relative z-10" strokeWidth={1.5} />
            <div className="absolute -bottom-1 -right-1">
              <AlertTriangle size={20} className="text-red-500" />
            </div>
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
          Authentication Error
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 font-medium leading-relaxed max-w-md mx-auto">
          Something went wrong during authentication. Please try again or return to the homepage.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={reset}
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 px-8 rounded-2xl font-bold text-base transition-all shadow-lg shadow-emerald-600/20 hover:-translate-y-0.5 active:scale-95"
          >
            <RotateCcw size={18} className="group-hover:rotate-[-360deg] transition-transform duration-500" />
            Try Again
          </button>

          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 py-3.5 px-8 rounded-2xl font-bold text-base transition-all hover:bg-slate-50 dark:hover:bg-slate-800 hover:-translate-y-0.5 active:scale-95"
          >
            <Home size={18} />
            Homepage
          </Link>
        </div>
      </div>
    </main>
  );
}
