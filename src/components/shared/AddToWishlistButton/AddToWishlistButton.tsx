"use client";

import { useState, useOptimistic, useTransition } from "react";
import { Heart, Loader2, Check } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToWishlist } from "@/actions/wishlist.actions";

import { cn } from "@/lib/utils";
import { useCartWishlist } from "@/providers/CartWishlistProvider/CartWishlistProvider";

interface AddToWishlistButtonProps {
  productId: string;
  title?: string;
  className?: string; 
  isFromProductDetails?: boolean; 
}

type OptimisticState = "idle" | "adding" | "added";

export default function AddToWishlistButton({
  productId,
  title = "Add to Wishlist",
  className,
  isFromProductDetails = false,
}: AddToWishlistButtonProps) {
  
  const [isPending, startTransition] = useTransition();
  const { incrementWishlistCount, decrementWishlistCount } = useCartWishlist();
  const [optimisticState, setOptimisticState] = useOptimistic<OptimisticState>("idle");

  function addProductToWishlist() {
    startTransition(async () => {
      setOptimisticState("adding");
      incrementWishlistCount();

      try {
        const res = await addToWishlist(productId);
        
        if (res.success) {
          setOptimisticState("added");
          toast.success(res.message || "Added to wishlist successfully!");
          setTimeout(() => {
            startTransition(() => setOptimisticState("idle"));
          }, 1500);
        } else {
          decrementWishlistCount();
          setOptimisticState("idle");
          toast.error(res.message || "Failed to add to wishlist.");
        }
      } catch {
        decrementWishlistCount();
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
        variant="outline"
        onClick={addProductToWishlist}
        disabled={isPending}
        className={cn(
          "flex-1 h-12 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-[0.98]",
          isAdded
            ? "bg-red-50 dark:bg-red-950/30 border-red-200 dark:border-red-900/50 text-red-500 dark:text-red-400"
            : "bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500/50 hover:text-red-500 dark:hover:text-red-400 text-slate-700 dark:text-slate-300",
          isPending && "opacity-80 cursor-not-allowed",
          className
        )}
      >
        {isAdding ? (
          <Loader2 size={20} className="animate-spin" />
        ) : isAdded ? (
          <Heart size={20} className="fill-red-500 text-red-500" />
        ) : (
          <Heart size={20} className="transition-transform" />
        )}
        <span>{isAdding ? "Adding..." : isAdded ? "Saved!" : title}</span>
      </Button>
    );
  }

  return (
    <Button
      onClick={addProductToWishlist}
      disabled={isPending}
      size="icon"
      variant="secondary"
      className={cn(
        "h-9 w-9 rounded-full shadow-md transition-all active:scale-95",
        isAdded
          ? "bg-red-50 dark:bg-red-950/30 text-red-500"
          : "bg-white dark:bg-slate-950 hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 dark:hover:text-red-400",
        isPending && "opacity-80 cursor-not-allowed",
        className
      )}
      title={title}
    >
      {isAdding ? (
        <Loader2 size={16} className="animate-spin" />
      ) : isAdded ? (
        <Heart size={16} strokeWidth={2.5} className="fill-red-500 text-red-500" />
      ) : (
        <Heart size={16} strokeWidth={2.5} />
      )}
    </Button>
  );
}