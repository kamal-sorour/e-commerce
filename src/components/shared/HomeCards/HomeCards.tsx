import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; 

interface CardsDataProps {
  badgeIcon: string;
  badgeText: string;
  title: string;
  description: string;
  discount: string;
  couponCode: string;
  buttonText: string;
  buttonHref: string;
  cardGradient: string;
  buttonTextClass: string;
}

function HomeCard({
  badgeIcon,
  badgeText,
  title,
  description,
  discount,
  couponCode,
  buttonText,
  buttonHref,
  cardGradient,
  buttonTextClass,
}: CardsDataProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-3xl p-8 text-white transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl border border-white/10 dark:border-white/5",
        cardGradient
      )}
    >
      <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/3 blur-2xl transition-transform duration-700 group-hover:scale-110" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-xl transition-transform duration-700 group-hover:scale-110" />
      
      <div className="relative z-10 flex flex-col h-full justify-between">
        <div>
          <div className="inline-flex items-center gap-2 bg-white/20 dark:bg-black/20 backdrop-blur-md px-4 py-1.5 rounded-full text-sm font-medium mb-6 border border-white/20 shadow-sm">
            <span className="text-base">{badgeIcon}</span>
            <span>{badgeText}</span>
          </div>
          
          <h3 className="text-3xl md:text-4xl font-black mb-3 tracking-tight text-white drop-shadow-md">
            {title}
          </h3>
          <p className="text-white/90 dark:text-white/80 mb-6 text-lg font-medium max-w-[90%]">
            {description}
          </p>
        </div>

        <div>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-8 bg-black/10 dark:bg-black/20 p-4 rounded-2xl backdrop-blur-sm border border-white/10 w-fit">
            <div className="text-3xl font-black drop-shadow-sm">{discount}</div>
            <div className="hidden sm:block w-px h-10 bg-white/20" /> 
            <div className="text-sm text-white/90">
              Use code: <br />
              <span className="font-mono text-lg font-bold text-white tracking-wider bg-white/20 px-2 py-0.5 rounded-md mt-1 inline-block">
                {couponCode}
              </span>
            </div>
          </div>

          <Link
            className={cn(
              "inline-flex items-center justify-center gap-2 bg-white text-base px-8 py-4 rounded-2xl font-bold transition-all duration-300 hover:bg-slate-50 hover:shadow-lg hover:scale-105 active:scale-95",
              buttonTextClass
            )}
            href={buttonHref}
          >
            {buttonText}
            <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

const CardsData: CardsDataProps[] = [
  {
    badgeIcon: "🔥",
    badgeText: "Deal of the Day",
    title: "Fresh Organic Fruits",
    description: "Get up to 40% off on selected hand-picked organic fruits.",
    discount: "40% OFF",
    couponCode: "ORGANIC40",
    buttonText: "Shop Now",
    buttonHref: "/products",
    cardGradient: "bg-linear-to-br from-emerald-400 to-emerald-700 dark:from-emerald-700 dark:to-emerald-950 shadow-emerald-500/20",
    buttonTextClass: "text-emerald-700 dark:text-emerald-900",
  },
  {
    badgeIcon: "✨",
    badgeText: "New Arrivals",
    title: "Exotic Vegetables",
    description: "Discover our latest collection of premium vegetables.",
    discount: "25% OFF",
    couponCode: "FRESH25",
    buttonText: "Explore Now",
    buttonHref: "/products?sort=newest",
    cardGradient: "bg-linear-to-br from-orange-400 to-rose-600 dark:from-rose-800 dark:to-orange-950 shadow-rose-500/20",
    buttonTextClass: "text-rose-600 dark:text-rose-900",
  },
];

export default function HomeCards() {
  return (
    <section className="py-16 bg-slate-50/30 dark:bg-slate-950/30 transition-colors duration-500">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-6 md:gap-8">
          {CardsData.map((card, index) => (
            <HomeCard key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}