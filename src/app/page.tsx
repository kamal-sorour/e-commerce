import dynamic from "next/dynamic";
import HeroSlider from "@/components/shared/HeroSwiper/HeroSwiper";

const Categories = dynamic(
  () => import("@/components/shared/Categories/Categories"),
  { loading: () => <div className="h-48 animate-pulse bg-slate-100 dark:bg-slate-900 rounded-3xl mx-16 my-8" /> }
);

const HomeCards = dynamic(
  () => import("@/components/shared/HomeCards/HomeCards"),
  { loading: () => <div className="h-40 animate-pulse bg-slate-100 dark:bg-slate-900 rounded-3xl mx-16 my-8" /> }
);

const HomeProducts = dynamic(
  () => import("@/components/shared/HomeProducts/HomeProducts")
);

const NewsletterPromo = dynamic(
  () => import("@/components/shared/NewsletterPromo/NewsletterPromo"),
  { loading: () => <div className="h-64 animate-pulse bg-slate-100 dark:bg-slate-900 rounded-3xl mx-16 my-8" /> }
);

export default function Home() {
  return (
    <>
      <HeroSlider />
      <Categories />
      <HomeCards />
      <HomeProducts />
      <NewsletterPromo />
    </>
  );
}
