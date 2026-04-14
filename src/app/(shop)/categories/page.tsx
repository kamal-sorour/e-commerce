import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowRight, Shapes, PackageOpen } from 'lucide-react';

import PageBanner from '@/components/shared/PageBanner/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { getAllCategories } from '@/services/categories.services';
import { CategoryType } from '@/types/categories';



export default async function CategoriesPage() {
  const categoriesRes = await getAllCategories();
  const categories: CategoryType[] = Array.isArray(categoriesRes) 
    ? categoriesRes 
    : (categoriesRes?.data || []);

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      {/* البانر العلوي الفخم */}
      <PageBanner
        title="All Categories"
        subTitle="Explore our complete curated categories for a premium shopping experience."
        icon={<Shapes size={32} />}
      />

      <div className="container mx-auto px-4 py-12 flex flex-col gap-8">
        {categories.length > 0 ? (
          <div className="flex flex-col gap-6 w-full">
            
            {/* عنوان القسم والعداد */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <SectionHeading textOne="Explore" textTwo="Categories" />
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm text-sm font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                Showing {categories.length} Categories
              </div>
            </div>

            {/* شبكة الكروت المدمجة (Inline Category Cards) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 sm:gap-6 w-full">
              {categories.map((category) => (
                <Link
                  key={category._id}
                  href={`/categories/${category._id}`}
                  className="group relative flex flex-col items-center bg-white dark:bg-slate-900 rounded-3xl p-5 text-center shadow-sm hover:shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800/60 hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  {/* تأثير الإضاءة الخلفي (Glow Effect) */}
                  <div className="absolute inset-0 bg-linear-to-b from-emerald-50/50 to-transparent dark:from-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  {/* حاوية الصورة مع حواف وزووم */}
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/50 mb-4 ring-4 ring-transparent group-hover:ring-emerald-50 dark:group-hover:ring-emerald-900/20 transition-all duration-500">
                    <Image
                      alt={category.name}
                      src={category.image}
                      width={500}
                      height={500}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                  </div>

                  {/* النصوص وزر العرض */}
                  <div className="relative z-10 flex flex-col items-center w-full">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300 line-clamp-1">
                      {category.name}
                    </h3>

                    {/* الزر اللي بيظهر لما تقف بالماوس */}
                    <div className="flex items-center gap-1 mt-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                      View Subcategories
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
          </div>
        ) : (
          /* ================= حالة عدم وجود أقسام ================= */
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center max-w-lg mx-auto">
            <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center mb-6">
              <PackageOpen size={48} className="text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50 mb-3">
              No Categories Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 font-medium">
              We couldn&apos;t load the categories right now. Please check back later!
            </p>
            <Link
              href="/products"
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              Shop All Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}