export default function OrdersLoading() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="animate-pulse flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="h-8 w-40 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
            <div className="h-10 w-44 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
          </div>

          {/* Order Cards Skeleton */}
          <div className="flex flex-col gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6"
              >
                <div className="flex items-start gap-6">
                  {/* Product Image */}
                  <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-100 dark:bg-slate-800/50 shrink-0" />
                  
                  {/* Order Info */}
                  <div className="flex-1 flex flex-col gap-2.5">
                    <div className="h-6 w-24 rounded-full bg-amber-100 dark:bg-amber-900/20" />
                    <div className="h-6 w-32 rounded-lg bg-slate-200 dark:bg-slate-800/50" />
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-28 rounded-lg bg-slate-200 dark:bg-slate-800/50" />
                      <div className="h-4 w-20 rounded-lg bg-slate-200 dark:bg-slate-800/50" />
                    </div>
                  </div>
                </div>

                {/* Price & Button */}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <div className="h-8 w-28 rounded-lg bg-slate-200 dark:bg-slate-800/50" />
                  <div className="h-10 w-32 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
