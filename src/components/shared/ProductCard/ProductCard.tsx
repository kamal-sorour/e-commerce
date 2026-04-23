import Link from "next/link";
import { ArrowLeftRight, Eye, Star } from "lucide-react";
import { ProductType } from "@/types/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";

interface Props {
  product: ProductType;
}

export default function ProductCard({ product }: Props) {
  const discountPercentage = (
    price: number,
    discountedPrice: number | undefined,
  ): number => {
    if (!price || !discountedPrice) return 0;

    return Math.round(((price - discountedPrice) / price) * 100);
  };
  const {
    _id,
    title,
    category,
    imageCover,
    price,
    ratingsAverage = 0,
    ratingsQuantity = 0,
    priceAfterDiscount,
    quantity,
  } = product;

  const categoryName = typeof category === "object" ? category?.name : category;
  const link = `/products/${_id}`;
  const discount = discountPercentage(price, priceAfterDiscount);

  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        size={14}
        className={
          i < Math.round(ratingsAverage)
            ? "fill-amber-400 text-amber-400"
            : "text-slate-300 dark:text-slate-700"
        }
      />
    ));
  };

  return (
    <article aria-label={`Product: ${title}`} className="group bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl dark:shadow-none transition-all duration-500 ease-out flex flex-col justify-between h-full relative">
      <div className="relative overflow-hidden bg-slate-50 dark:bg-slate-800/50 p-4 aspect-square flex items-center justify-center">
        <Image
          className="w-full h-full object-contain transition-transform duration-700 ease-out group-hover:scale-110 drop-shadow-sm"
          src={imageCover}
          alt={title}
          width={500}
          height={500}
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 20vw"
        />

        {discount > 0 && (
          <Badge
            variant="destructive"
            className="absolute top-3 left-3 bg-red-500 hover:bg-red-600 shadow-md shadow-red-500/20 px-2.5 py-0.5 text-xs font-bold rounded-full"
          >
            -{discount}%
          </Badge>
        )}

        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out">
           <div className="hover:scale-110 transition-transform">
            <AddToWishlistButton productId={_id}  />
          </div> 

          <Button
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-white dark:bg-slate-950 shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="Compare"
            aria-label="Compare product"
          >
            <ArrowLeftRight size={16} strokeWidth={2.5} aria-hidden="true" />
          </Button>

          <Button
            asChild
            size="icon"
            variant="secondary"
            className="h-9 w-9 rounded-full bg-white dark:bg-slate-950 shadow-md hover:bg-emerald-50 dark:hover:bg-emerald-950 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            title="Quick View"
            aria-label={`View details of ${title}`}
          >
            <Link href={link}>
              <Eye size={16} strokeWidth={2.5} aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-500 mb-1.5 uppercase tracking-wider">
          {categoryName}
        </div>

        <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-2 cursor-pointer group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
          <Link
            className="line-clamp-2 leading-snug min-h-10"
            href={link}
            title={title}
          >
            {title}
          </Link>
        </h3>

        <div className="flex items-center mb-4 gap-2 mt-auto">
          <div className="flex gap-0.5" role="img" aria-label={`Rating: ${ratingsAverage.toFixed(1)} out of 5 stars`}>{renderStars()}</div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
            {ratingsAverage.toFixed(1)} ({ratingsQuantity})
          </span>
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
          <div className="flex flex-col">
            {priceAfterDiscount ? (
              <>
                <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                  {priceAfterDiscount} EGP
                </span>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-500 line-through">
                  {price} EGP
                </span>
              </>
            ) : (
              <span className="text-lg font-black text-slate-900 dark:text-slate-100">
                {price} EGP
              </span>
            )}
          </div>

           <div className="shrink-0 z-10">
            <AddToCartButton productId={product._id}  />  
          </div> 
        </div>
      </div>
    </article>
  );
}
