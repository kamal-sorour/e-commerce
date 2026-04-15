import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface PageBannerProps {
  title: string;
  subTitle: string;
  subTitle2?: string;
  subTitle2Link?: string;
  icon: React.ReactNode;
}

export default function PageBanner({
  title,
  subTitle,
  subTitle2,
  subTitle2Link,
  icon,
}: PageBannerProps) {
  
  const getBannerTheme = () => {
    if (title === 'Top Brands') return 'bg-violet-900 dark:bg-violet-950 border-violet-800';
    if (title === 'Wishlist') return 'bg-rose-900 dark:bg-rose-950 border-rose-800';
    return 'bg-emerald-900 dark:bg-slate-950 border-emerald-800 dark:border-slate-800';
  };

  return (
    <div className={`relative w-full border-b ${getBannerTheme()} overflow-hidden transition-colors duration-500`}>
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent opacity-50" />
      
      <div className="container mx-auto px-4 py-12 sm:py-16 relative z-10">
        
        <nav className="flex items-center gap-2 text-sm text-slate-300/80 font-medium mb-8 flex-wrap">
          <Link className="hover:text-white transition-colors" href="/">
            Home
          </Link>
          
          {subTitle2 && subTitle2Link && (
            <>
              <ChevronRight size={14} className="text-slate-500" />
              <Link
                href={subTitle2Link}
                className="hover:text-white transition-colors"
              >
                {subTitle2}
              </Link>
            </>
          )}
          
          <ChevronRight size={14} className="text-slate-500" />
          <span className="text-white">{title}</span>
        </nav>

        <div className="flex flex-col md:flex-row text-center md:text-start items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center shadow-lg border border-white/10 text-white">
            {icon}
          </div>
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight mb-2">
              {title}
            </h1>
            <p className="text-slate-300 text-lg font-medium max-w-2xl">
              {subTitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}