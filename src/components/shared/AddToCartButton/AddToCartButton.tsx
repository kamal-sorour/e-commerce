"use client";

import { useState } from "react";
import { Plus, ShoppingCart, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/actions/cart.actions";
// import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number; // اختياري في حالة صفحة التفاصيل
  isFromProductDetails?: boolean; // البروب الجديد لتحديد مكان الزرار
}

export default function AddToCartButton({ 
  productId, 
  quantity = 1, 
  isFromProductDetails = false 
}: AddToCartButtonProps) {
  
//   const { updateNumOfCartItems } = useCart();
  const [isLoading, setIsLoading] = useState(false);

  async function addProductToCart() {
    setIsLoading(true);
    try {
      // يمكنك تمرير الـ quantity للـ action إذا كان הـ API يدعم ذلك
      const res = await addToCart(productId); 
      
      if (res.success) {
        toast.success(res.message || "Added to cart successfully!");
        // updateNumOfCartItems(res.numOfCartItems);
      } else {
        toast.error(res.message || "Failed to add product to cart");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  if (isFromProductDetails) {
    return (
      <Button
        onClick={addProductToCart}
        disabled={isLoading}
        className={cn(
          "w-full h-14 bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-transform active:scale-[0.98]",
          isLoading && "opacity-80 cursor-not-allowed"
        )}
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <ShoppingCart size={20} />
        )}
        <span>{isLoading ? "Adding..." : "Add to Cart"}</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={addProductToCart}
      disabled={isLoading}
      size="icon"
      className={cn(
        "h-10 w-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-600/20 transition-all active:scale-95",
        isLoading && "bg-emerald-500 cursor-not-allowed"
      )}
      title="Add to cart"
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : (
        <Plus size={20} strokeWidth={2.5} />
      )}
    </Button>
  );
}