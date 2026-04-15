"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight, Heart, Box, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getWishlistItems } from "@/actions/wishlist.actions";
import { wishlistResponse } from "@/interfaces/wishlist.interface";

import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";
import ViewToggle, { ViewType } from "@/components/shared/ViewToggle/ViewToggle";
import WishlistProductCard from "@/components/shared/WishlistProductCard/WishlistProductCard";


export default function WishlistPage() {
  const [view, setView] = useState<ViewType>("list");
  const [wishlistDetails, setWishlistDetails] = useState<wishlistResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);



  useEffect(() => {
    const fetchWishlist = async () => {
      setIsLoading(true);
      try {
        const res = await getWishlistItems();
        setWishlistDetails(res);
      } catch (error) {
        console.error("Failed to load wishlist");
      } finally {
        setIsLoading(false);
      }
    };
    fetchWishlist();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-red-500" size={40} />
      </div>
    );
  }

  const products = wishlistDetails?.data.data || [];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-12">
      {products.length > 0 ? (
        <div className="container mx-auto px-4 max-w-7xl">
          
          {/* Header Area with View Toggle */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
            <div className="flex flex-col">
              <SectionHeading textOne="My" textTwo="Wishlist" />
              <p className="text-slate-500 dark:text-slate-400 font-medium text-sm -mt-2">
                You have {products.length} {products.length === 1 ? "item" : "items"} saved
              </p>
            </div>
            <ViewToggle view={view} onViewChange={setView} />
          </div>

          <div className={`
            ${view === "list" ? "flex flex-col space-y-4" : ""}
            ${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6" : ""}
            ${view === "bento" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-max" : ""}
          `}>
            {products.map((product, idx) => (
              <WishlistProductCard
                key={product._id}
                product={product}
                view={view}
                index={idx} 
                onRemove={(id) => {
                  const updatedProducts = products.filter(p => p._id !== id);
                  setWishlistDetails({ ...wishlistDetails!, data: updatedProducts });
                }}
              />
            ))}
          </div>

        </div>
      ) : (
        <div className="container mx-auto px-4 py-20 flex flex-col items-center justify-center">
          <div className="max-w-md text-center p-8">
            <div className="relative mb-8 flex justify-center">
              <div className="w-32 h-32 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center z-10 relative">
                <Heart size={56} className="text-slate-300 dark:text-slate-600" />
              </div>
              <div className="absolute -bottom-4 w-24 h-4 bg-black/5 dark:bg-black/40 rounded-full blur-md" />
            </div>
            
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
              Browse products and save your favorites here. Sign in to sync your wishlist across all your devices.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="h-14 px-8 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold shadow-lg shadow-red-600/20 transition-all active:scale-95 gap-2">
                <Link href="/products">
                  Browse Products <ArrowRight size={18} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}