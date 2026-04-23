"use client";

import { useState, useOptimistic, useTransition } from "react";
import { Plus, ShoppingCart, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToCart } from "@/actions/cart.actions";

import { cn } from "@/lib/utils";
import { useCartWishlist } from "@/providers/CartWishlistProvider/CartWishlistProvider";

interface AddToCartButtonProps {
  productId: string;
  quantity?: number; 
  isFromProductDetails?: boolean; 
}

type OptimisticState = "idle" | "adding" | "added";

export default function AddToCartButton({ 
  productId, 
  quantity = 1, 
  isFromProductDetails = false 
}: AddToCartButtonProps) {
  
  const [isPending, startTransition] = useTransition();
  const { incrementCartCount, decrementCartCount } = useCartWishlist();
  const [optimisticState, setOptimisticState] = useOptimistic<OptimisticState>("idle");

  function addProductToCart() {
    startTransition(async () => {
      setOptimisticState("adding");
      incrementCartCount();

      try {
        const res = await addToCart(productId);
        
        if (res.success) {
          setOptimisticState("added");
          toast.success(res.message || "Added to cart successfully!");
          setTimeout(() => {
            startTransition(() => setOptimisticState("idle"));
          }, 1500);
        } else {
          decrementCartCount();
          setOptimisticState("idle");
          toast.error(res.message || "Failed to add product to cart");
        }
      } catch {
        decrementCartCount();
        setOptimisticState("idle");
        toast.error("Something went wrong. Please try again.");
      }
    });
  }

  const isAdding = optimisticState === "adding";
  const isAdded = optimisticState === "added";

  if (isFromProductDetails) {
    return (
      <Button
        onClick={addProductToCart}
        disabled={isPending}
        className={cn(
          "w-full h-14 rounded-xl font-bold text-lg flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
          isAdded
            ? "bg-emerald-500 hover:bg-emerald-600 text-white"
            : "bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-slate-200",
          isPending && "opacity-80 cursor-not-allowed"
        )}
      >
        {isAdding ? (
          <Loader2 size={20} className="animate-spin" />
        ) : isAdded ? (
          <Check size={20} strokeWidth={3} />
        ) : (
          <ShoppingCart size={20} />
        )}
        <span>{isAdding ? "Adding..." : isAdded ? "Added!" : "Add to Cart"}</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={addProductToCart}
      disabled={isPending}
      size="icon"
      className={cn(
        "h-10 w-10 rounded-xl shadow-md transition-all active:scale-95",
        isAdded
          ? "bg-emerald-500 hover:bg-emerald-600 text-white shadow-emerald-500/20"
          : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/20",
        isPending && "bg-emerald-500 cursor-not-allowed"
      )}
      title="Add to cart"
    >
      {isAdding ? (
        <Loader2 size={18} className="animate-spin" />
      ) : isAdded ? (
        <Check size={18} strokeWidth={3} />
      ) : (
        <Plus size={20} strokeWidth={2.5} />
      )}
    </Button>
  );
}