"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import ProductCard from "../ProductCard/ProductCard";
import { ProductType } from "@/types/products";

interface RelatedProductsProps {
  productsSlider: ProductType[];
}

export default function RelatedProducts({ productsSlider }: RelatedProductsProps) {
  const limitedProducts = productsSlider.slice(0, 10); 

  if (!limitedProducts || limitedProducts.length === 0) return null;

  return (
    <section className="py-8 md:py-12 border-t border-slate-200 dark:border-slate-800 mt-8">
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <SectionHeading textOne="You May Also" textTwo="Like" />
          
          <div className="flex items-center gap-2 shrink-0">
            <button className="related-prev flex items-center justify-center w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none">
              <ChevronLeft size={24} />
            </button>
            <button className="related-next flex items-center justify-center w-12 h-12 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/50 hover:text-emerald-600 dark:hover:text-emerald-400 hover:border-emerald-200 dark:hover:border-emerald-800 transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none">
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <Swiper
          modules={[Navigation]}
          loop={false}
          spaceBetween={20}
          navigation={{
            nextEl: ".related-next",
            prevEl: ".related-prev",
          }}
          breakpoints={{
            320: { slidesPerView: 1.2 },
            640: { slidesPerView: 2.2 },
            768: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
            1280: { slidesPerView: 5 },
          }}
          className="w-full pb-8"
        >
          {limitedProducts.map((prod) => (
            <SwiperSlide key={prod.id} className="h-auto">
              <ProductCard product={prod} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}