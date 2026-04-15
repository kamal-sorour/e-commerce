"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { getCartItems } from "@/actions/cart.actions";
import { getWishlistItems } from "@/actions/wishlist.actions";

interface CartWishlistContextType {
  cartCount: number;
  wishlistCount: number;
  setCartCount: (count: number) => void;
  setWishlistCount: (count: number) => void;
  incrementCartCount: () => void;
  decrementCartCount: () => void;
  incrementWishlistCount: () => void;
  decrementWishlistCount: () => void;
  refreshCounts: () => Promise<void>;
}

const CartWishlistContext = createContext<CartWishlistContextType>({
  cartCount: 0,
  wishlistCount: 0,
  setCartCount: () => {},
  setWishlistCount: () => {},
  incrementCartCount: () => {},
  decrementCartCount: () => {},
  incrementWishlistCount: () => {},
  decrementWishlistCount: () => {},
  refreshCounts: async () => {},
});

export function useCartWishlist() {
  return useContext(CartWishlistContext);
}

export default function CartWishlistProvider({ children }: { children: React.ReactNode }) {
  const { status } = useSession();
  const [cartCount, setCartCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);

  const fetchCounts = useCallback(async () => {
    if (status !== "authenticated") {
      setCartCount(0);
      setWishlistCount(0);
      return;
    }

    try {
      const [cartRes, wishlistRes] = await Promise.all([
        getCartItems(),
        getWishlistItems(),
      ]);

      if (cartRes && 'data' in cartRes) {
        const data = cartRes.data;
        const numItems = data?.numOfCartItems
          ?? data?.data?.products?.length
          ?? 0;
        setCartCount(numItems);
      }

      if (wishlistRes && 'data' in wishlistRes) {
        const data = wishlistRes.data;
        const numItems = data?.data?.length
          ?? data?.count
          ?? 0;
        setWishlistCount(numItems);
      }
    } catch {
      
    }
  }, [status]);

  useEffect(() => {
    fetchCounts();
  }, [fetchCounts]);

  const incrementCartCount = useCallback(() => setCartCount((c) => c + 1), []);
  const decrementCartCount = useCallback(() => setCartCount((c) => Math.max(0, c - 1)), []);
  const incrementWishlistCount = useCallback(() => setWishlistCount((c) => c + 1), []);
  const decrementWishlistCount = useCallback(() => setWishlistCount((c) => Math.max(0, c - 1)), []);

  return (
    <CartWishlistContext.Provider
      value={{
        cartCount,
        wishlistCount,
        setCartCount,
        setWishlistCount,
        incrementCartCount,
        decrementCartCount,
        incrementWishlistCount,
        decrementWishlistCount,
        refreshCounts: fetchCounts,
      }}
    >
      {children}
    </CartWishlistContext.Provider>
  );
}
