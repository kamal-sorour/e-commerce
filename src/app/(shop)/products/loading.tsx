export default function ProductsLoading() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
        <div className="container mx-auto px-4 py-10">
          <div className="animate-pulse flex flex-col items-center gap-4">
            <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30" />
            <div className="h-8 w-64 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
            <div className="h-4 w-96 max-w-full rounded-lg bg-slate-200 dark:bg-slate-800/50" />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse flex flex-col gap-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="h-8 w-40 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
            </div>
            <div className="h-10 w-48 rounded-xl bg-slate-200 dark:bg-slate-800/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <div
                key={i}
                className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800/60 p-4 flex flex-col gap-3"
              >
                <div className="aspect-square rounded-2xl bg-slate-100 dark:bg-slate-800/50" />
                
                <div className="h-5 w-20 rounded-full bg-emerald-50 dark:bg-emerald-900/20" />
                
                <div className="h-5 w-full rounded-lg bg-slate-200 dark:bg-slate-800/50" />
                <div className="h-5 w-2/3 rounded-lg bg-slate-200 dark:bg-slate-800/50" />
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <div key={j} className="w-4 h-4 rounded bg-slate-200 dark:bg-slate-800/50" />
                  ))}
                  <div className="h-3 w-12 ml-2 rounded bg-slate-200 dark:bg-slate-800/50" />
                </div>
                
                <div className="flex items-center justify-between mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                  <div className="h-7 w-24 rounded-lg bg-slate-200 dark:bg-slate-800/50" />
                  <div className="h-10 w-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/20" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
