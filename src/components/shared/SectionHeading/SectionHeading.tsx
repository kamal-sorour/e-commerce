import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface SectionHeadingProps {
  textOne: string;
  textTwo: string;
  linkText?: string;
  linkUrl?: string;
}

export default function SectionHeading({
  textOne,
  textTwo,
  linkText,
  linkUrl,
}: SectionHeadingProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
      <div className="flex items-center gap-3 my-6">
        <div className="h-8 w-1.5 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.4)]" />
        <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
          {textOne} <span className="text-emerald-600 dark:text-emerald-500">{textTwo}</span>
        </h2>
      </div>
      
      {linkText && linkUrl && (
        <Link
          href={linkUrl}
          className="group self-end sm:self-auto font-bold flex items-center gap-2 text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 transition-colors duration-300"
        >
          <span>{linkText}</span>
          <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}