import Categories from "@/components/shared/Categories/Categories";
import HeroSlider from "@/components/shared/HeroSwiper/HeroSwiper";
import HomeCards from "@/components/shared/HomeCards/HomeCards";
import HomeProducts from "@/components/shared/HomeProducts/HomeProducts";
import NewsletterPromo from "@/components/shared/NewsletterPromo/NewsletterPromo";

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
