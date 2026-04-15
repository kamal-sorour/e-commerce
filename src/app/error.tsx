"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home, HelpCircle } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App Error:", error);
  }, [error]);

  return (
    <main className="min-h-[60vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        <div className="relative mx-auto mb-8">
          <div className="absolute inset-0 w-32 h-32 mx-auto bg-red-100/50 dark:bg-red-900/20 rounded-[2rem] blur-2xl" />
          <div className="relative w-28 h-28 mx-auto rounded-[2rem] bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 shadow-xl shadow-red-100/50 dark:shadow-none flex items-center justify-center">
            <AlertTriangle size={44} className="text-red-500 dark:text-red-400" strokeWidth={1.5} />
          </div>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
          Oops! Something Broke
        </h1>

        <p className="text-slate-500 dark:text-slate-400 text-lg mb-2 font-medium leading-relaxed max-w-md mx-auto">
          We encountered an unexpected error while loading this page.
        </p>

        {error.message && process.env.NODE_ENV === "development" && (
          <div className="my-4 mx-auto max-w-sm p-3 rounded-xl bg-red-50 dark:bg-red-950/30 border border-red-100 dark:border-red-900/40">
            <p className="text-xs font-mono text-red-600 dark:text-red-400 break-all">
              {error.message}
            </p>
          </div>
        )}

        {error.digest && (
          <p className="text-[11px] font-mono text-slate-400 dark:text-slate-600 mb-6">
            Reference: {error.digest}
          </p>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
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

        <div className="mt-12 pt-6 border-t border-slate-100 dark:border-slate-800/50">
          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
          >
            <HelpCircle size={14} />
            Need help? Contact Support
          </Link>
        </div>
      </div>
    </main>
  );
}
