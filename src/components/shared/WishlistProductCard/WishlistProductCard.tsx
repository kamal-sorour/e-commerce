"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Trash2, Check, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

import { removeFromWishlist } from "@/actions/wishlist.actions";

import { ProductType } from "@/types/products";
import { ViewType } from "@/components/shared/ViewToggle/ViewToggle";
import AddToCartButton from "@/components/shared/AddToCartButton/AddToCartButton";
import { cn } from "@/lib/utils";
import { useCartWishlist } from "@/providers/CartWishlistProvider/CartWishlistProvider";

interface WishlistCardProps {
  product: ProductType;
  view: ViewType;
  index: number;
  onRemove: (id: string) => void;
}

export default function WishlistProductCard({ product, view, index, onRemove }: WishlistCardProps) {

  const [isRemoving, setIsRemoving] = useState(false);
  const { decrementWishlistCount } = useCartWishlist();

  async function removeProductFromWishlist() {
    setIsRemoving(true);
    try {
      const res = await removeFromWishlist(product._id);
      if (res.success) {
        toast.success("Removed from wishlist");
        decrementWishlistCount();
        onRemove(product._id); 
      } else {
        toast.error(res.message || "Failed to remove item");
      }
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsRemoving(false);
    }
  }

  const isOutOfStock = product.quantity === 0;

  
  
  
  if (view === "list") {
    return (
      <Card className={cn("bg-white dark:bg-slate-900 rounded-3xl border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all duration-300 relative overflow-hidden group", isRemoving && "opacity-50 pointer-events-none")}>
        <div className="absolute inset-0 bg-linear-to-r from-red-50/50 to-transparent dark:from-red-950/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        
        <CardContent className="p-4 sm:p-6 flex flex-col sm:flex-row gap-6 relative z-10">
          
          <Link href={`/products/${product._id}`} className="relative shrink-0 flex justify-center sm:block">
            <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-800 overflow-hidden">
              <Image
                src={product.imageCover}
                alt={product.title}
                width={160}
                height={160}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm dark:drop-shadow-none"
              />
            </div>
            <div className="absolute -bottom-2 -right-2">
              {isOutOfStock ? (
                <Badge className="bg-red-500 hover:bg-red-600 text-white text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 border-2 border-white dark:border-slate-900">
                  <X size={12} strokeWidth={3} /> Out of Stock
                </Badge>
              ) : (
                <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] px-2.5 py-0.5 rounded-full flex items-center gap-1 border-2 border-white dark:border-slate-900">
                  <Check size={12} strokeWidth={3} /> In Stock
                </Badge>
              )}
            </div>
          </Link>

          <div className="flex-1 flex flex-col justify-center">
            <div className="mb-2">
              <Badge variant="outline" className="mb-2 bg-slate-50 dark:bg-slate-800 text-red-600 dark:text-red-400 border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded-full w-fit">
                {product.category?.name}
              </Badge>
              <Link href={`/products/${product._id}`} className="block">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 hover:text-red-600 dark:hover:text-red-400 transition-colors text-lg sm:text-xl line-clamp-2">
                  {product.title}
                </h3>
              </Link>
            </div>

            <div className="flex items-baseline gap-2 mb-6">
              <span className="text-slate-900 dark:text-white font-black text-2xl">
                {product.priceAfterDiscount ?? product.price} EGP
              </span>
              {product.priceAfterDiscount && (
                <span className="text-sm font-bold text-slate-400 line-through">
                  {product.price} EGP
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-3 mt-auto">
              <div className="w-full sm:w-auto flex-1 min-w-37.5">
                <AddToCartButton
                  productId={product._id}
                  isFromProductDetails={true} 
                />
              </div>
              <Button
                variant="outline"
                onClick={removeProductFromWishlist}
                disabled={isRemoving}
                className="h-14 px-6 rounded-xl border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 hover:border-red-200 transition-all font-bold gap-2 w-full sm:w-auto"
              >
                {isRemoving ? <Loader2 size={18} className="animate-spin text-red-500" /> : <Trash2 size={18} />}
                Remove
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  
  const isBentoLarge = view === "bento" && index % 3 === 0;

  return (
    <Card className={cn(
      "bg-white dark:bg-slate-900 rounded-3xl border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl dark:shadow-none hover:border-red-200 dark:hover:border-red-900/50 transition-all duration-500 flex flex-col relative overflow-hidden group", 
      isRemoving && "opacity-50 pointer-events-none",
      isBentoLarge ? "md:col-span-2 md:flex-row" : "" 
    )}>
      
      <Button
        onClick={removeProductFromWishlist}
        disabled={isRemoving}
        size="icon"
        variant="secondary"
        className="absolute top-3 right-3 z-20 h-9 w-9 rounded-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-sm text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/50 transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0"
      >
        {isRemoving ? <Loader2 size={16} className="animate-spin text-red-500" /> : <Trash2 size={16} />}
      </Button>

      <CardContent className={cn("p-4 sm:p-5 flex flex-1 gap-4", isBentoLarge ? "flex-col md:flex-row items-center" : "flex-col")}>
        
        <Link href={`/products/${product._id}`} className={cn("relative shrink-0 flex justify-center", isBentoLarge ? "md:w-1/2 w-full" : "w-full")}>
          <div className="w-full aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-800 overflow-hidden">
            <Image src={product.imageCover} alt={product.title} width={300} height={300} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm dark:drop-shadow-none" />
          </div>
          <div className="absolute -bottom-2 right-2">
            {isOutOfStock ? (
              <Badge className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full border-2 border-white dark:border-slate-900">Out of Stock</Badge>
            ) : (
              <Badge className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full border-2 border-white dark:border-slate-900">In Stock</Badge>
            )}
          </div>
        </Link>

        <div className="flex-1 flex flex-col w-full">
          <div className="mb-2 mt-2">
            <Badge variant="outline" className="mb-2 bg-slate-50 dark:bg-slate-800 text-red-600 dark:text-red-400 border-slate-200 dark:border-slate-700 text-[9px] font-bold rounded-full w-fit uppercase tracking-wider">
              {product.category?.name}
            </Badge>
            <Link href={`/products/${product._id}`} className="block group/title">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover/title:text-red-600 dark:group-hover/title:text-red-400 transition-colors leading-tight text-sm line-clamp-2">
                {product.title}
              </h3>
            </Link>
          </div>

          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="text-slate-900 dark:text-white font-black text-lg">{product.priceAfterDiscount ?? product.price} EGP</span>
            {product.priceAfterDiscount && (
              <span className="text-xs font-bold text-slate-400 line-through">{product.price} EGP</span>
            )}
          </div>

          <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-4">
             <AddToCartButton productId={product._id} isFromProductDetails={true} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}