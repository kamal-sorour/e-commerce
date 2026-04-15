"use client";

import { useState } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";

interface ProductGalleryProps {
  images: string[];
}

export default function ProductGallery({ images }: ProductGalleryProps) {
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);

  return (
    <div className="flex flex-col gap-4 w-full select-none">
      <div className="relative w-full aspect-square rounded-3xl overflow-hidden bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
        <Swiper
          style={{
            "--swiper-navigation-color": "#059669", 
            "--swiper-navigation-size": "24px",
          } as React.CSSProperties}
          loop={true}
          spaceBetween={10}
          navigation={true}
          thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
          modules={[FreeMode, Navigation, Thumbs]}
          className="w-full h-full"
        >
          {images.map((image, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-full flex items-center justify-center p-8">
                <Image
                  src={image}
                  fill
                  className="object-contain p-8 drop-shadow-xl dark:drop-shadow-none"
                  alt={`Product view ${i + 1}`}
                  priority={i === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="w-full">
        <Swiper
          onSwiper={setThumbsSwiper}
          loop={false}
          spaceBetween={12}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="product-thumbs-swiper h-24"
        >
          {images.map((image, i) => (
            <SwiperSlide key={i} className="cursor-pointer">
              {({ isActive }) => (
                <div 
                  className={`relative w-full h-full rounded-2xl overflow-hidden bg-slate-50 dark:bg-slate-900 border-2 transition-all duration-300`}
                >
                  <Image
                    src={image}
                    fill
                    className="object-contain p-2"
                    alt={`Thumbnail ${i + 1}`}
                  />
                </div>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      
    </div>
  );
}