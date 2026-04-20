import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft, ArrowRight, Shapes, Layers, PackageOpen } from 'lucide-react';

import PageBanner from '@/components/shared/PageBanner/PageBanner';
import SectionHeading from '@/components/shared/SectionHeading/SectionHeading';
import { getAllSubCategoriesOnCategory, getSpecificCategory } from '@/services/categories.services';
import { SubCategory } from '@/types/categories';

interface SubCategoriesPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: SubCategoriesPageProps): Promise<Metadata> {
  const { id } = await params;
  const category = await getSpecificCategory(id);
  const name = category?.name || "Category";

  return {
    title: `${name} Subcategories`,
    description: `Browse all subcategories within ${name} at Yassify. Find the perfect products in our curated ${name} collection.`,
    openGraph: {
      title: `${name} Subcategories | Yassify`,
      description: `Browse all subcategories within ${name} at Yassify.`,
      type: "website",
    },
  };
}

export default async function SubCategoriesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  
  const category = await getSpecificCategory(id);
  const subCategoriesRes = await getAllSubCategoriesOnCategory(id);
  
  
  const subCategories = subCategoriesRes || [];
  const resultsCount = subCategories.length;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      
      
      <PageBanner
        title={`All ${category?.name} Subcategories`}
        subTitle={`Choose a subcategory within ${category?.name} to narrow down your search and browse premium products.`}
        subTitle2="Categories"
        subTitle2Link="/categories"
        icon={
          category?.image ? (
            <Image
              src={category.image}
              alt={category.name}
              width={50}
              height={50}
              className="rounded-xl object-cover"
            />
          ) : (
            <Shapes size={32} />
          )
        }
      />

      <div className="container mx-auto px-4 py-12 flex flex-col gap-8">
        
        
        <div>
          <Link
            className="group inline-flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors duration-300"
            href="/categories"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back to Categories</span>
          </Link>
        </div>

        {subCategories.length > 0 ? (
          <div className="flex flex-col gap-6 w-full">
            
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <SectionHeading 
                textOne="Explore" 
                textTwo={category?.name || "Subcategories"} 
              />
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm text-sm font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                Showing {subCategories.length} of {resultsCount} Subcategories
              </div>
            </div>

            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6 w-full">
              {subCategories.map((subCategory: SubCategory) => (
                <Link
                  key={subCategory._id}
                  href={`/products?subcategory=${subCategory._id}`}
                  className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-100 dark:border-slate-800/60 shadow-sm hover:shadow-xl dark:shadow-none hover:border-emerald-200 dark:hover:border-emerald-900/50 transition-all duration-500 hover:-translate-y-1.5 overflow-hidden"
                >
                  
                  <div className="absolute inset-0 bg-linear-to-br from-emerald-50/50 to-transparent dark:from-emerald-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  <div className="relative z-10">
                    
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 flex items-center justify-center mb-5 group-hover:bg-emerald-100 dark:group-hover:bg-emerald-900/60 transition-colors duration-300 ring-4 ring-transparent group-hover:ring-emerald-50 dark:group-hover:ring-emerald-900/20">
                      <Layers size={24} className="text-emerald-600 dark:text-emerald-500" strokeWidth={2} />
                    </div>
                    
                    
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-lg mb-2 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors duration-300">
                      {subCategory.name}
                    </h3>
                    
                    
                    <div className="flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 ease-out">
                      Browse Products
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>

          </div>
        ) : (
          
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center max-w-lg mx-auto">
            <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center mb-6">
              <PackageOpen size={48} className="text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50 mb-3">
              No Subcategories Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 font-medium">
              It seems there are no subcategories listed under {category?.name} yet.
            </p>
            <Link
              href="/categories"
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              Browse All Categories
            </Link>
          </div>
        )}

      </div>
    </main>
  );
}