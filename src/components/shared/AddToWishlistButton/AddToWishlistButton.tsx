"use client";

import { useState } from "react";
import { Heart, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { addToWishlist } from "@/actions/wishlist.actions";

import { cn } from "@/lib/utils";

interface AddToWishlistButtonProps {
  productId: string;
  title?: string;
  className?: string; 
  isFromProductDetails?: boolean; 
}

export default function AddToWishlistButton({
  productId,
  title = "Add to Wishlist",
  className,
  isFromProductDetails = false,
}: AddToWishlistButtonProps) {
  
  const [isLoading, setIsLoading] = useState(false);

  async function addProductToWishlist() {
    setIsLoading(true);
    try {
      const res = await addToWishlist(productId);
      
      if (res.success) {
        toast.success(res.message || "Added to wishlist successfully!");
        // updateNumOfWishlistItems(res.data.length);
      } else {
        toast.error(res.message || "Failed to add to wishlist.");
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
        variant="outline"
        onClick={addProductToWishlist}
        disabled={isLoading}
        className={cn(
          "flex-1 h-12 bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-red-500 dark:hover:border-red-500/50 hover:text-red-500 dark:hover:text-red-400 text-slate-700 dark:text-slate-300 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors active:scale-[0.98]",
          isLoading && "opacity-80 cursor-not-allowed",
          className
        )}
      >
        {isLoading ? (
          <Loader2 size={20} className="animate-spin" />
        ) : (
          <Heart size={20} className="transition-transform" />
        )}
        <span>{isLoading ? "Adding..." : title}</span>
      </Button>
    );
  }

  
  return (
    <Button
      onClick={addProductToWishlist}
      disabled={isLoading}
      size="icon"
      variant="secondary"
      className={cn(
        "h-9 w-9 rounded-full bg-white dark:bg-slate-950 shadow-md hover:bg-red-50 dark:hover:bg-red-950/30 hover:text-red-500 dark:hover:text-red-400 transition-colors active:scale-95",
        isLoading && "opacity-80 cursor-not-allowed",
        className
      )}
      title={title}
    >
      {isLoading ? (
        <Loader2 size={16} className="animate-spin" />
      ) : (
        <Heart size={16} strokeWidth={2.5} />
      )}
    </Button>
  );
}