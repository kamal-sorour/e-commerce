import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { PackageOpen, Shapes } from 'lucide-react';

import PageBanner from '@/components/shared/PageBanner/PageBanner';
import SectionHeading from '@/components/shared//SectionHeading/SectionHeading';
import ProductCard from '@/components/shared/ProductCard/ProductCard';

import { getAllProducts } from "@/services/products.services";
import { ProductQueryParams } from '@/types/products';

import defaultBrandImage from '@/assets/logo.png';
import CatalogPagination from '@/components/shared/CatalogPagination/CatalogPagination';


export default async function ShopCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{
    page: number;
    brand: string;
    subcategory: string;
    category: string;
  }>;
}) {
  const { page = 1, brand, subcategory, category } = await searchParams;

  // 1. تجهيز البراميترز للـ API الموحد
  const queryParams: ProductQueryParams = { page };
  if (brand) queryParams.brand = brand;
  // دمج البحث بالأقسام
  if (subcategory) queryParams['category[in]'] = subcategory;
  else if (category) queryParams['category[in]'] = category;

  // 2. جلب المنتجات
  const productsResponse = await getAllProducts(queryParams);
  const products = productsResponse?.data || [];
  const metadata = productsResponse?.metadata || { currentPage: 1, numberOfPages: 1 };


  // تحديد نصوص البانر
  const bannerTitle = brand 
    ? `${products[0]?.brand?.name || 'Unknown'} Products`
      : category 
        ? `${products[0]?.category?.name || 'Unknown'} Products`
        : 'All Products';

  const bannerIcon = brand ? (
    <Image
      src={products[0]?.brand?.image || defaultBrandImage}
      alt={products[0]?.brand?.name || 'Brand Image'}
      width={40}
      height={40}
      className="rounded-xl object-cover"
    />
  ) : subcategory || category ? (
    <Shapes size={32} />
  ) : (
    <PackageOpen size={32} />
  );

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500">
      <PageBanner
        title={bannerTitle}
        subTitle="Explore our premium collection of meticulously curated products."
        subTitle2Link={brand ? '/brands' : subcategory ? `/categories/${products[0]?.category?._id}` : undefined}
        icon={bannerIcon}
      />

      <div className="container mx-auto px-4 py-12 flex flex-col gap-8">
        
        {products.length > 0 ? (
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <SectionHeading
                textOne="Explore"
                textTwo={bannerTitle}
              />
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-4 py-2 rounded-xl shadow-sm text-sm font-semibold text-slate-600 dark:text-slate-300 whitespace-nowrap">
                Showing {products.length} Products
              </div>
            </div>

            {/* تم إلغاء FeaturedProducts واستخدام ProductCard مباشرة هنا */}
            <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 w-full">
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
            
             <CatalogPagination
              currentPage={metadata.currentPage}
              numberOfPages={metadata.numberOfPages}
            /> 
          </div>
        ) : (
          /* Empty State - Solid Backgrounds only, no gradients */
          <div className="flex flex-col items-center justify-center py-24 px-4 text-center max-w-lg mx-auto">
            <div className="w-24 h-24 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center mb-6">
              <PackageOpen size={48} className="text-slate-400 dark:text-slate-500" strokeWidth={1.5} />
            </div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50 mb-3">
              No Products Found
            </h3>
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-8 font-medium">
              We couldn&apos;t find any products matching your current filters. Try adjusting your search criteria.
            </p>
            <Link
              href={brand ? '/brands' : '/products'}
              className="px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-all hover:shadow-lg hover:-translate-y-1 active:scale-95"
            >
              {brand ? 'View All Brands' : 'View All Products'}
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}