'use client'

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import {
  Navigation,
  Pagination,
  Keyboard,
  Autoplay,
  EffectFade,
} from "swiper/modules";

import type { Swiper as SwiperType } from "swiper";

import {
  ChevronLeft,
  ChevronRight,
  ShoppingBag,
  Truck,
  Contact,
} from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import { Button } from "@/components/ui/button";

import homeSlider1 from "@/assets/blog-img-1.jpeg";
import homeSlider2 from "@/assets/blog-img-2.jpeg";
import homeSlider3 from "@/assets/blog-img-3.jpeg";
import YassifyBanner from "../../shared/YassifyBanner/YassifyBanner";

const slides = [
  {
    id: 1,
    image: homeSlider1,
    title: ["Fresh Products Delivered", "to your DoorStep"],
    description: "Get 20% off your first order with free delivery options.",
    buttonText: "Shop Now",
    buttonLink: "/products",
    buttonIcon: ShoppingBag,
    buttonText2: "Learn More",
    buttonLink2: "/about",
  },
  {
    id: 2,
    image: homeSlider2,
    title: ["Premium Quality", "Guaranteed"],
    description: "Fresh from farm to your table, handpicked for you.",
    buttonText: "View Categories",
    buttonLink: "/categories",
    buttonIcon: Contact,
    buttonText2: "About Us",
    buttonLink2: "/about",
  },
  {
    id: 3,
    image: homeSlider3,
    title: ["Fast & Free", "Delivery Services"],
    description: "Same day delivery available for selected areas.",
    buttonText: "Order Now",
    buttonLink: "/products",
    buttonIcon: Truck,
    buttonText2: "Delivery Info",
    buttonLink2: "/delivery-info",
  },
];

export default function HeroSlider() {
  const prevRef = useRef<HTMLButtonElement | null>(null);
  const nextRef = useRef<HTMLButtonElement | null>(null);
  const [swiper, setSwiper] = useState<SwiperType | null>(null);
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);

  useEffect(() => {
    if (swiper && prevRef.current && nextRef.current) {
      const nav = swiper.params.navigation;
      if (nav && typeof nav !== 'boolean') {
        nav.prevEl = prevRef.current;
        nav.nextEl = nextRef.current;
      }

      swiper.navigation.destroy();
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, [swiper]);

  return (
    <>
      <section aria-label="Featured promotions" className="relative w-full h-125 lg:h-150 group overflow-hidden shadow-sm" aria-roledescription="carousel">
        <Swiper
          modules={[Navigation, Pagination, Keyboard, Autoplay, EffectFade]}
          effect="fade"
          speed={1000}
          spaceBetween={0}
          slidesPerView={1}
          loop={true}
          onSwiper={setSwiper}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          keyboard={{ enabled: true }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          className="h-full w-full"
        >
          {slides.map((slide) => {
            const Icon = slide.buttonIcon;

            return (
              <SwiperSlide key={slide.id} className="relative h-full w-full">
                <Image
                  src={slide.image}
                  alt={slide.title.join(" ")}
                  width={1920}
                  height={1080}
                  priority
                  className="absolute inset-0 w-full h-full object-cover object-center"
                />

                <div className="absolute inset-0 bg-linear-to-r from-white/95 via-white/70 to-transparent dark:from-slate-950/95 dark:via-slate-950/80 dark:to-transparent z-10" />

                <div className="relative z-20 h-full flex flex-col justify-center px-6 md:px-16 lg:px-24 max-w-3xl">
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-[1.1] tracking-tight mb-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
                    {slide.title.map((line, i) => (
                      <span key={i} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>

                  <p className="text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-8 max-w-lg font-medium animate-in fade-in slide-in-from-bottom-10 duration-700 delay-150">
                    {slide.description}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-12 duration-700 delay-300">
                    <Button
                      asChild
                      size="lg"
                      className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-full px-8 h-12 text-base shadow-lg shadow-emerald-600/20"
                    >
                      <Link href={slide.buttonLink}>
                        {Icon && <Icon className="mr-2 h-5 w-5" />}
                        {slide.buttonText}
                      </Link>
                    </Button>

                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 h-12 text-base border-emerald-200 dark:border-slate-700 hover:bg-emerald-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 backdrop-blur-sm bg-white/50 dark:bg-slate-950/50"
                    >
                      <Link href={slide.buttonLink2}>
                        {slide.buttonText2}
                      </Link>
                    </Button>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <div className="hidden md:flex absolute top-1/2 -translate-y-1/2 left-4 right-4 justify-between z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button
            ref={prevRef}
            variant="outline"
            size="icon"
            className="pointer-events-auto h-12 w-12 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-transparent hover:border-emerald-500 hover:bg-white dark:hover:bg-slate-900 hover:text-emerald-600 text-slate-700 dark:text-slate-300 shadow-xl"
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} aria-hidden="true" />
          </Button>

          <Button
            ref={nextRef}
            variant="outline"
            size="icon"
            className="pointer-events-auto h-12 w-12 rounded-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-transparent hover:border-emerald-500 hover:bg-white dark:hover:bg-slate-900 hover:text-emerald-600 text-slate-700 dark:text-slate-300 shadow-xl"
            aria-label="Next slide"
          >
            <ChevronRight size={24} aria-hidden="true" />
          </Button>
        </div>

        <style jsx global>{`
          .swiper-pagination-bullet {
            background-color: #94a3b8;
            opacity: 0.5;
            transition: all 0.3s ease;
          }
          .swiper-pagination-bullet-active {
            background-color: #059669 !important;
            opacity: 1 !important;
            width: 24px !important;
            border-radius: 10px !important;
          }
          .dark .swiper-pagination-bullet {
            background-color: #cbd5e1;
          }
        `}</style>
      </section>

      <YassifyBanner variant={theme === "dark" ? "emerald" : "multicolor" } />
    </>
  );
}