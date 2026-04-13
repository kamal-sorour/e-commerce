import { Headset, RotateCcw, ShieldHalf, Truck } from "lucide-react";
import { cn } from "@/lib/utils";

type BannerVariant = "multicolor" | "emerald";

interface CommonBannerProps {
  variant?: BannerVariant;
  className?: string;
}

const bannerItems = [
  {
    icon: Truck,
    title: "Free Shipping",
    subtitle: "On orders over 500 EGP",
    colorTheme:
      "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    icon: ShieldHalf,
    title: "Secure Payment",
    subtitle: "100% secure transactions",
    colorTheme:
      "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "14-day return policy",
    colorTheme:
      "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  },
  {
    icon: Headset,
    title: "24/7 Support",
    subtitle: "Dedicated support team",
    colorTheme:
      "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
  },
];

const variantConfig: Record<
  BannerVariant,
  {
    wrapper: string;
    card: string;
    defaultIconTheme: string;
  }
> = {
  multicolor: {
    wrapper:
      "bg-slate-50/50 dark:bg-slate-950/50 border-y border-transparent dark:border-slate-800/50",
    card: "bg-white dark:bg-slate-900 p-5 rounded-2xl shadow-sm hover:shadow-md dark:shadow-none border border-slate-100 dark:border-slate-800 transition-all duration-300 hover:-translate-y-1",
    defaultIconTheme: "", // سيستخدم الـ colorTheme الخاص بكل عنصر
  },
  emerald: {
    wrapper:
      "bg-emerald-50 dark:bg-emerald-950/20 border-y border-emerald-100 dark:border-emerald-900/30",
    card: "p-2 transition-all duration-300",
    defaultIconTheme:
      "bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400",
  },
};

export default function YassifyBanner({
  variant = "multicolor",
  className,
}: CommonBannerProps) {
  const styles = variantConfig[variant];

  return (
    <section
      className={cn(
        styles.wrapper,
        "transition-colors duration-300 w-full",
        className,
      )}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bannerItems.map((item) => {
            const Icon = item.icon;

            // تحديد ألوان الأيقونة بناءً على الـ Variant
            const iconTheme =
              variant === "multicolor"
                ? item.colorTheme
                : styles.defaultIconTheme;

            return (
              <div
                key={item.title}
                className={cn(
                  "group flex items-center gap-4 cursor-default",
                  styles.card,
                )}
              >
                {/* الأيقونة مع تأثيرات الـ Hover */}
                <div
                  className={cn(
                    "w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3",
                    iconTheme,
                  )}
                >
                  <Icon size={24} strokeWidth={1.5} />
                </div>

                {/* النصوص */}
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm mb-1 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-muted-foreground dark:text-slate-400 text-xs font-medium">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
