import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type SectionTitleProps = {
  title: string;
  sub: string;
  sideTitle?: string;
  href?: string;
};

export default function HeadTitle({
  title,
  sub,
  sideTitle,
  href,
}: SectionTitleProps) {
  return (
    <div className="flex flex-col sm:flex-row justify-between sm:items-end mb-10 gap-4">
      {/* جزء العنوان */}
      <div className="flex items-center gap-3">
        {/* الخط العمودي مع تأثير إضاءة خفيف */}
        <div className="h-8 w-1.5 bg-linear-to-b from-emerald-500 to-emerald-700 rounded-full shadow-sm shadow-emerald-500/20" />
        <h2 className="text-2xl md:text-3xl font-black text-slate-800 dark:text-slate-100 tracking-tight transition-colors duration-300">
          {title} <span className="text-emerald-600 dark:text-emerald-500">{sub}</span>
        </h2>
      </div>

      {/* جزء الرابط (يظهر فقط إذا تم تمرير href) */}
      {href && sideTitle && (
        <Link
          className="group text-emerald-600 dark:text-emerald-500 self-start sm:self-auto hover:text-emerald-700 dark:hover:text-emerald-400 font-semibold flex items-center gap-1.5 transition-colors duration-300"
          href={href}
        >
          {sideTitle}
          {/* تأثير الـ Hover على السهم (يتحرك لليمين قليلاً) */}
          <ArrowRight 
            size={18} 
            className="transition-transform duration-300 group-hover:translate-x-1.5" 
          />
        </Link>
      )}
    </div>
  );
}