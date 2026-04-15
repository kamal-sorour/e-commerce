export default function BrandsLoading() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* Page Banner Skeleton */}
      <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 py-10">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30" />
            <div className="h-8 w-48 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
            <div className="h-4 w-72 max-w-full rounded-lg bg-slate-200 dark:bg-slate-800/50" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="animate-pulse flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="h-8 w-44 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
            <div className="h-10 w-40 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
          </div>

          {/* Brands Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6">
            {Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-3xl p-5 border border-slate-100 dark:border-slate-800/60 flex flex-col items-center gap-4"
              >
                <div className="w-full aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800/50" />
                <div className="h-4 w-16 rounded-lg bg-slate-200 dark:bg-slate-800/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
