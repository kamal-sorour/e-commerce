"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Home } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global Error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 py-16">
          <div className="max-w-lg w-full text-center">
            <div className="relative mx-auto mb-8 w-28 h-28 rounded-[2rem] bg-white dark:bg-slate-900 border border-red-100 dark:border-red-900/30 shadow-xl flex items-center justify-center">
              <AlertTriangle size={48} className="text-red-500" strokeWidth={1.5} />
            </div>

            <h1 className="text-4xl font-black text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
              Something Went Wrong
            </h1>

            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 font-medium leading-relaxed">
              An unexpected error occurred. We&apos;re sorry for the inconvenience. Please try again or return to the homepage.
            </p>

            {error.digest && (
              <p className="text-xs font-mono text-slate-400 dark:text-slate-600 mb-6">
                Error ID: {error.digest}
              </p>
            )}

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
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
                Go Home
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}
