"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Minus, Plus, Share2, ShieldCheck, 
  Star, Truck, Zap, ShoppingCart, RotateCcw, Loader2
} from "lucide-react";


import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";


import { ProductType } from "@/types/products";
import AddToCartButton from "../AddToCartButton/AddToCartButton";
import AddToWishlistButton from "../AddToWishlistButton/AddToWishlistButton";
import { addToCart, getCartItems } from "@/actions/cart.actions";
import { CartResponse } from "@/types/cart";
import { useCartWishlist } from "@/providers/CartWishlistProvider/CartWishlistProvider";
import { toast } from "sonner";

interface ProductOverviewProps {
  prod: ProductType;
}

export default function ProductOverview({ prod }: ProductOverviewProps) {
  const router = useRouter();
  const { incrementCartCount } = useCartWishlist();
  const [quantity, setQuantity] = useState(1);
  const [isBuyingNow, setIsBuyingNow] = useState(false);

  const handleBuyNow = async () => {
    setIsBuyingNow(true);
    try {
      const res = await addToCart(prod.id);
      if (!res.success) {
        toast.error(res.message || "Failed to add product to cart");
        return;
      }
      incrementCartCount();
      const cartRes = await getCartItems();
      if (cartRes && 'data' in cartRes) {
        const cartData = cartRes as CartResponse;
        const cartId = cartData.data?.cartId;
        if (cartId) {
          router.push(`/checkout?id=${cartId}`);
          return;
        }
      }
      router.push('/cart');
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsBuyingNow(false);
    }
  };
  const currentPrice = prod.priceAfterDiscount || prod.price;
  const totalPrice = currentPrice * quantity;

  const handleQtyChange = (type: "inc" | "dec") => {
    if (type === "inc" && quantity < prod.quantity) setQuantity((q) => q + 1);
    if (type === "dec" && quantity > 1) setQuantity((q) => q - 1);
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8 flex flex-col h-full">
      
      <div className="flex flex-wrap gap-2 mb-4">
        <Badge variant="secondary" className="bg-emerald-50 text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400 hover:bg-emerald-100 px-3 py-1 text-xs">
          {prod.category?.name}
        </Badge>
        <Badge variant="outline" className="text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 px-3 py-1 text-xs">
          {prod.brand?.name}
        </Badge>
      </div>

      <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-50 leading-tight mb-4 tracking-tight">
        {prod.title}
      </h1>
      
      <div className="flex items-center gap-3 mb-6">
        <div className="flex text-amber-400" role="img" aria-label={`Rating: ${prod.ratingsAverage} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={18} className={i < Math.round(prod.ratingsAverage) ? "fill-amber-400" : "text-slate-300 dark:text-slate-700"} aria-hidden="true" />
          ))}
        </div>
        <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {prod.ratingsAverage} ({prod.ratingsQuantity} verified reviews)
        </span>
      </div>

      <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 mb-6">
        {prod.priceAfterDiscount ? (
          <div className="flex items-center flex-wrap gap-4">
            <span className="text-4xl font-black text-emerald-600 dark:text-emerald-500">
              {prod.priceAfterDiscount} EGP
            </span>
            <span className="text-xl font-semibold text-slate-400 line-through">
              {prod.price} EGP
            </span>
            <Badge className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm">
              Save {Math.round(((prod.price - prod.priceAfterDiscount) / prod.price) * 100)}%
            </Badge>
          </div>
        ) : (
          <span className="text-4xl font-black text-slate-900 dark:text-slate-50">
            {prod.price} EGP
          </span>
        )}
      </div>

      <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
        {prod.description}
      </p>

      <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center justify-between mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
        <div>
          <label className="block text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
            Quantity
          </label>
          <div className="flex items-center gap-4">
            <div className="flex items-center bg-slate-100 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 p-1" role="group" aria-label="Product quantity">
              <Button variant="ghost" size="icon" onClick={() => handleQtyChange("dec")} disabled={quantity <= 1} className="h-10 w-10 rounded-lg" aria-label="Decrease quantity">
                <Minus size={16} aria-hidden="true" />
              </Button>
              <div className="w-12 text-center font-bold text-lg text-slate-900 dark:text-slate-100" aria-live="polite" aria-atomic="true">
                {quantity}
              </div>
              <Button variant="ghost" size="icon" onClick={() => handleQtyChange("inc")} disabled={quantity >= prod.quantity} className="h-10 w-10 rounded-lg" aria-label="Increase quantity">
                <Plus size={16} aria-hidden="true" />
              </Button>
            </div>
            <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
              {prod.quantity > 0 ? (
                <span className="text-emerald-600 dark:text-emerald-500">{prod.quantity} Available</span>
              ) : (
                <span className="text-red-500">Out of stock</span>
              )}
            </span>
          </div>
        </div>

        <div className="text-right">
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mb-1">Total Price</p>
          <p className="text-2xl font-black text-slate-900 dark:text-slate-50">{totalPrice} EGP</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <AddToCartButton 
           isFromProductDetails
           productId={prod.id}
/>
        <Button 
          onClick={handleBuyNow}
          disabled={isBuyingNow}
          className="w-full h-14 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 transition-transform active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed"
        >
          {isBuyingNow ? (
            <Loader2 size={20} className="animate-spin" />
          ) : (
            <Zap size={20} className="fill-white" />
          )}
          {isBuyingNow ? "Processing..." : "Buy Now"}
        </Button>
      </div>

      <div className="flex gap-4 mb-8">
        <AddToWishlistButton 
          productId={prod.id}
          isFromProductDetails
          className="flex-1 h-12 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500 hover:text-red-500 text-slate-700 dark:text-slate-300 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors"
        />
        <Button variant="outline" size="icon" className="h-12 w-12 rounded-xl border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400" aria-label="Share this product">
          <Share2 size={20} aria-hidden="true" />
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-slate-100 dark:border-slate-800 mt-auto">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-500 rounded-full flex items-center justify-center shrink-0">
            <Truck size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Free Delivery</h4>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Orders over 1000 EGP</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-500 rounded-full flex items-center justify-center shrink-0">
            <RotateCcw size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">30 Days Return</h4>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">Money back guarantee</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-500 rounded-full flex items-center justify-center shrink-0">
            <ShieldCheck size={20} />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">Secure Payment</h4>
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">100% Protected</p>
          </div>
        </div>
      </div>

    </div>
  );
}