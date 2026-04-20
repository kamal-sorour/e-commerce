import Image from "next/image";
import Link from "next/link";
import { Metadata } from "next";
import { ArrowRight, Award, PackageOpen } from "lucide-react";

import PageBanner from "@/components/shared/PageBanner/PageBanner";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import { getAllBrands } from "@/services/brands.services";
import { BrandType } from "@/types/brands";
import defaultBrandImage from "@/assets/logo.png";

export const metadata: Metadata = {
  title: "Top Brands",
  description: "Discover and shop from your favorite top-tier brands at Yassify. Browse our curated selection of premium brands.",
  openGraph: {
    title: "Top Brands | Yassify",
    description: "Discover and shop from your favorite top-tier brands at Yassify.",
    type: "website",
  },
};

export default async function BrandsPage() {
  const brands: BrandType[] = (await getAllBrands()) || [];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <PageBanner
        title="All Brands"
        subTitle="Discover and shop from your favorite top-tier brands."
        subTitle2Link="/brands"
        icon={<Award size={32} />}
      />

      <div className="container mx-auto px-4 py-12 flex flex-col gap-8">
        {brands.length > 0 ? (
          <div className="flex flex-col gap-6 w-full">
            
            
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <SectionHeading textOne="Explore" textTwo="Top Brands" />
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm text-sm font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                Showing {brands.length} Brands
              </div>
            </div>

            
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-6 w-full">
              {brands.map((brand) => (
                <Link
                  key={brand._id}
                  href={`/products?brand=${brand._id}`}
                  className="group relative flex flex-col items-center bg-white dark:bg-slate-900 rounded-3xl p-5 text-center shadow-sm hover:shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-800/60 hover:border-violet-200 dark:hover:border-violet-900/50 transition-all duration-500 hover:-translate-y-2 overflow-hidden"
                >
                  
                  <div className="absolute inset-0 bg-linear-to-b from-violet-50/50 to-transparent dark:from-violet-950/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                  
                  <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-800/50 mb-4 flex items-center justify-center p-4 ring-4 ring-transparent group-hover:ring-violet-50 dark:group-hover:ring-violet-900/20 transition-all duration-500">
                    <Image
                      alt={brand.name || "Brand Logo"}
                      src={brand.image || defaultBrandImage}
                      width={200}
                      height={200}
                      className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-sm dark:drop-shadow-none"
                    />
                  </div>

                  
                  <div className="relative z-10 flex flex-col items-center w-full">
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm md:text-base group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors duration-300 line-clamp-1">
                      {brand.name}
                    </h3>

                    
                    <div className="flex items-center gap-1 mt-2 text-xs font-bold text-violet-600 dark:text-violet-400 opacity-0 -translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-out">
                      View Brand
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
          </div>
        ) : (
         
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center max-w-lg mx-auto">
            <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center mb-6">
              <PackageOpen size={48} className="text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50 mb-3">
              No Brands Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 font-medium">
              We couldn&apos;t load the brands right now, or the list is empty. Please check back later!
            </p>
            <Link
              href="/products"
              className="px-8 py-4 rounded-2xl bg-violet-600 hover:bg-violet-700 text-white font-bold transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              Shop All Products
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}