export default function RootLoading() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col gap-8 animate-pulse">
          <div className="w-full h-48 rounded-3xl bg-slate-200 dark:bg-slate-800/50" />
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="aspect-square rounded-2xl bg-slate-200 dark:bg-slate-800/50" />
                <div className="h-4 w-3/4 rounded-lg bg-slate-200 dark:bg-slate-800/50" />
                <div className="h-3 w-1/2 rounded-lg bg-slate-200 dark:bg-slate-800/50" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
