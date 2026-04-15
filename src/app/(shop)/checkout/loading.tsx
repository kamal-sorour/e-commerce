export default function CheckoutLoading() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="animate-pulse flex flex-col gap-8">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="h-8 w-48 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
            {/* Form Column */}
            <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8">
              <div className="flex flex-col gap-6">
                {/* Section Title */}
                <div className="h-6 w-44 rounded-xl bg-slate-200 dark:bg-slate-800/50 mb-2" />
                
                {/* Input Fields */}
                <div className="h-12 w-full rounded-xl bg-slate-100 dark:bg-slate-800/50" />
                <div className="grid grid-cols-2 gap-6">
                  <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800/50" />
                  <div className="h-12 rounded-xl bg-slate-100 dark:bg-slate-800/50" />
                </div>
                <div className="h-12 w-full rounded-xl bg-slate-100 dark:bg-slate-800/50" />

                {/* Payment Section Title */}
                <div className="h-6 w-40 rounded-xl bg-slate-200 dark:bg-slate-800/50 mt-4 mb-2" />
                
                {/* Payment Options */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-800" />
                  <div className="h-28 rounded-2xl bg-slate-100 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-800" />
                </div>

                {/* Submit Button */}
                <div className="h-14 w-full rounded-2xl bg-emerald-100 dark:bg-emerald-900/20 mt-4" />
              </div>
            </div>

            {/* Summary Column */}
            <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 md:p-8 h-fit">
              <div className="flex flex-col gap-4">
                <div className="h-6 w-32 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
                
                {/* Cart Items */}
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-3 py-3">
                    <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800/50 shrink-0" />
                    <div className="flex-1 flex flex-col gap-1.5">
                      <div className="h-4 w-full rounded bg-slate-200 dark:bg-slate-800/50" />
                      <div className="h-3 w-20 rounded bg-slate-200 dark:bg-slate-800/50" />
                    </div>
                  </div>
                ))}

                {/* Totals */}
                <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2 flex flex-col gap-2">
                  <div className="flex justify-between">
                    <div className="h-4 w-16 rounded bg-slate-200 dark:bg-slate-800/50" />
                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800/50" />
                  </div>
                  <div className="flex justify-between">
                    <div className="h-4 w-20 rounded bg-slate-200 dark:bg-slate-800/50" />
                    <div className="h-4 w-12 rounded bg-slate-200 dark:bg-slate-800/50" />
                  </div>
                  <div className="flex justify-between pt-2 border-t border-dashed border-slate-200 dark:border-slate-700">
                    <div className="h-6 w-12 rounded bg-slate-200 dark:bg-slate-800/50" />
                    <div className="h-6 w-24 rounded bg-emerald-100 dark:bg-emerald-900/20" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
