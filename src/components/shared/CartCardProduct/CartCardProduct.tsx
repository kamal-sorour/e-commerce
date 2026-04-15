"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, Check, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { removeCartProduct, updateProductQuantity } from "@/actions/cart.actions";

import { ViewType } from "@/components/shared/ViewToggle/ViewToggle";
import { cn } from "@/lib/utils";
import { ProductType } from "@/types/products";

interface CartCardProps {
  product: ProductType;
  view: ViewType;
  index: number;
  price: number;
    quantity: number;
}

export default function CartCardProduct({ product, view, index, price, quantity }: CartCardProps) {

  const [isUpdating, setIsUpdating] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  async function updateQuantity(id: string, quantity: number) {
    if (quantity < 1) return;
    setIsUpdating(true);
    try {
      const resp = await updateProductQuantity(id, quantity);
      if (resp.success) {
        
        toast.success("done updated");
      } else {
        toast.error(resp.message);
      }
    } finally {
      setIsUpdating(false);
    }
  }

  async function removeProductFromCart(productId: string) {
    setIsRemoving(true);
    try {
      const response = await removeCartProduct(productId);
      if (response.success) {
        toast.success("Item removed from cart");
        // updateNumOfCartItems(response.numOfCartItems);
      } else {
        toast.error(response.message);
      }
    } finally {
      
      setIsRemoving(false); 
    }
  }

  
  
  
  if (view === "list") {
    return (
      <Card className={cn("bg-white dark:bg-slate-900 rounded-3xl border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all", isRemoving && "opacity-50 pointer-events-none")}>
        <CardContent className="p-4 sm:p-5">
          <div className="flex gap-4 sm:gap-6">
            {/* Image */}
            <Link href={`/products/${product._id}`} className="relative shrink-0 group">
              <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-3 border border-slate-100 dark:border-slate-800 overflow-hidden">
                <Image
                  src={product.imageCover}
                  alt={product.title}
                  width={128}
                  height={128}
                  className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm dark:drop-shadow-none"
                />
              </div>
              <Badge className="absolute -bottom-2 right-2 bg-emerald-500 hover:bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 border-2 border-white dark:border-slate-900">
                <Check size={10} strokeWidth={3} /> In Stock
              </Badge>
            </Link>

            {/* Content */}
            <div className="flex-1 min-w-0 flex flex-col py-1">
              <div className="mb-2">
                <div className="flex items-center gap-2 mb-1.5">
                  <Badge variant="outline" className="bg-slate-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded-full">
                    {product.category?.name}
                  </Badge>
                </div>
                <Link href={`/products/${product._id}`} className="group/title">
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover/title:text-emerald-600 dark:group-hover/title:text-emerald-400 transition-colors leading-tight text-base sm:text-lg line-clamp-2">
                    {product.title}
                  </h3>
                </Link>
              </div>

              <div className="flex items-baseline gap-1.5 mb-4 mt-auto">
                <span className="text-slate-900 dark:text-white font-black text-lg">
                  {price} EGP
                </span>
                <span className="text-xs font-bold text-slate-400">per unit</span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-100 dark:border-slate-800 pt-4">
                {/* Quantity Controls */}
                <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700">
                  <Button onClick={() => updateQuantity(product._id, quantity - 1)} disabled={isUpdating || quantity <= 1} size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-600 dark:text-slate-300">
                    <Minus size={14} />
                  </Button>
                  <div className="w-10 text-center font-bold text-slate-900 dark:text-white text-sm">
                    {isUpdating ? <Loader2 size={14} className="animate-spin mx-auto text-emerald-500" /> : quantity}
                  </div>
                  <Button onClick={() => updateQuantity(product._id, quantity + 1)} disabled={isUpdating} size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-600 dark:text-slate-300">
                    <Plus size={14} />
                  </Button>
                </div>

                <div className="flex items-center gap-6">
                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Total</p>
                    <p className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                      {price * quantity} <span className="text-xs">EGP</span>
                    </p>
                  </div>
                  <Button onClick={() => removeProductFromCart(product._id)} disabled={isRemoving} variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-500 hover:bg-red-500 hover:text-white transition-all">
                    {isRemoving ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={18} />}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  
  const isBentoLarge = view === "bento" && index % 3 === 0;

  return (
    <Card className={cn(
      "bg-white dark:bg-slate-900 rounded-3xl border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all flex flex-col", 
      isRemoving && "opacity-50 pointer-events-none",
      isBentoLarge ? "md:col-span-2 md:flex-row" : "" 
    )}>
      <CardContent className={cn("p-4 sm:p-5 flex flex-1 gap-4", isBentoLarge ? "flex-col md:flex-row items-center" : "flex-col")}>
        
        {/* Image */}
        <Link href={`/products/${product._id}`} className={cn("relative shrink-0 group w-full", isBentoLarge ? "md:w-1/2" : "")}>
          <div className="w-full aspect-square rounded-2xl bg-slate-50 dark:bg-slate-800/50 p-4 border border-slate-100 dark:border-slate-800 overflow-hidden">
            <Image src={product.imageCover} alt={product.title} width={300} height={300} className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-sm dark:drop-shadow-none" />
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 flex flex-col w-full">
          <div className="mb-2">
            <Badge variant="outline" className="mb-2 bg-slate-50 dark:bg-slate-800 text-emerald-600 dark:text-emerald-400 border-slate-200 dark:border-slate-700 text-[10px] font-bold rounded-full w-fit">
              {product.category?.name}
            </Badge>
            <Link href={`/products/${product._id}`} className="group/title">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover/title:text-emerald-600 dark:group-hover/title:text-emerald-400 transition-colors leading-tight text-base line-clamp-2">
                {product.title}
              </h3>
            </Link>
          </div>

          <div className="flex items-baseline gap-1.5 mb-4">
            <span className="text-slate-900 dark:text-white font-black text-lg">{price} EGP</span>
          </div>

          {/* Controls */}
          <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-3">
             <div className="flex items-center justify-between w-full">
                <span className="text-xs font-bold text-slate-400">Total: <span className="text-emerald-600 dark:text-emerald-400 text-sm">{price * quantity} EGP</span></span>
                <Button onClick={() => removeProductFromCart(product._id)} disabled={isRemoving} variant="ghost" size="icon" className="h-8 w-8 rounded-lg text-slate-400 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 transition-all">
                  {isRemoving ? <Loader2 size={14} className="animate-spin text-red-500" /> : <Trash2 size={16} />}
                </Button>
             </div>
             
             <div className="flex items-center bg-slate-50 dark:bg-slate-800 rounded-xl p-1 border border-slate-200 dark:border-slate-700 w-full justify-between">
                <Button onClick={() => updateQuantity(product._id, quantity - 1)} disabled={isUpdating || quantity <= 1} size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-600 dark:text-slate-300">
                  <Minus size={14} />
                </Button>
                <div className="w-10 text-center font-bold text-slate-900 dark:text-white text-sm">
                  {isUpdating ? <Loader2 size={14} className="animate-spin mx-auto text-emerald-500" /> : quantity}
                </div>
                <Button onClick={() => updateQuantity(product._id, quantity + 1)} disabled={isUpdating} size="icon" variant="ghost" className="h-8 w-8 rounded-lg text-slate-600 dark:text-slate-300">
                  <Plus size={14} />
                </Button>
              </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}