import Link from 'next/link';
import { Apple, Carrot, House, ShoppingCart } from 'lucide-react';

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fafbfc] dark:bg-slate-950 flex items-center justify-center px-4 py-16 relative overflow-hidden transition-colors duration-500">
      <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div className="absolute top-[10%] left-[5%] text-green-200 dark:text-green-900/40 text-4xl animate-[float_6s_ease-in-out_infinite]">
          <Apple />
        </div>
        <div className="absolute top-[20%] right-[10%] text-green-200 dark:text-green-900/40 text-3xl animate-[float_8s_ease-in-out_infinite_1s]">
          <Carrot />
        </div>
        <div className="absolute top-[50%] left-[15%] text-green-100 dark:text-green-900/20 text-2xl animate-[float_5s_ease-in-out_infinite_1.5s]">
          <Apple />
        </div>
        <div className="absolute top-[40%] right-[5%] text-green-100 dark:text-green-900/20 text-2xl animate-[float_6s_ease-in-out_infinite_0.8s]">
          <Carrot />
        </div>
        
        <div className="absolute top-0 right-0 w-125 h-125 bg-linear-to-bl from-green-100/40 dark:from-green-900/20 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-linear-to-tr from-green-100/30 dark:from-green-900/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-xl w-full">
        <div className="flex justify-center mb-10">
          <div className="relative">
            <div className="absolute inset-0 w-64 h-52 sm:w-72 sm:h-60 bg-green-100/50 dark:bg-green-900/30 rounded-[32px] blur-2xl" />
            
            <div className="relative w-64 h-52 sm:w-72 sm:h-60">
              <div className="absolute inset-x-0 top-4 mx-auto w-52 h-40 sm:w-60 sm:h-44 bg-white dark:bg-slate-900 rounded-3xl shadow-xl shadow-gray-200/60 dark:shadow-none border border-gray-100 dark:border-slate-800 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-green-50/80 dark:from-green-900/10 via-transparent to-green-100/40 dark:to-transparent" />
                <ShoppingCart size={48} className="text-green-600 dark:text-green-500" />
              </div>

              <div className="absolute -top-2 -right-2 sm:top-0 sm:right-0">
                <div className="relative">
                  <div className="absolute -inset-2 rounded-full bg-white dark:bg-slate-950 shadow-lg" />
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-linear-to-br from-green-500 to-green-600 flex items-center justify-center shadow-lg shadow-green-500/40">
                    <span className="text-xl sm:text-2xl font-black text-white tracking-tight">404</span>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex items-center justify-center gap-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-600" />
                <div className="w-8 h-4 border-b-[3px] border-green-400 dark:border-green-600 rounded-b-full" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-400 dark:bg-green-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-gray-900 dark:text-slate-50 mb-4 tracking-tight">
            Oops! Nothing Here
          </h1>
          <p className="text-gray-500 dark:text-slate-400 text-lg leading-relaxed max-w-md mx-auto">
            Looks like this page went out of stock! Don&apos;t worry, there&apos;s plenty
            more fresh content to explore.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <Link
            className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-green-600 hover:bg-green-700 text-white py-4 px-8 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg shadow-green-600/25 hover:shadow-xl hover:shadow-green-600/30 hover:-translate-y-1 active:scale-95"
            href="/"
          >
            <House size={20} />
            Go to Homepage
          </Link>
          
        </div>

        <div className="bg-white dark:bg-slate-900/50 rounded-3xl border border-gray-100 dark:border-slate-800 shadow-sm p-6 backdrop-blur-sm">
          <p className="text-center text-sm font-medium text-gray-400 dark:text-slate-500 uppercase tracking-wider mb-4">
            Popular Destinations
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {[
              { label: 'All Products', href: '/products', color: 'green' },
              { label: 'Categories', href: '/categories', color: 'gray' },
              { label: "Today's Deals", href: '/deals', color: 'gray' },
              { label: 'Contact Us', href: '/contact', color: 'gray' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 
                  ${link.color === 'green' 
                    ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900/30' 
                    : 'bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 hover:bg-gray-200 dark:hover:bg-slate-700'}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}