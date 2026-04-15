"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  Truck, Tag, Lock, Shield, ArrowLeft, ArrowRight, 
  Box, ShoppingCart, Loader2 
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { getCartItems } from "@/actions/cart.actions";
import { CartResponse } from "@/types/cart"; 

import CartCardProduct from "@/components/shared/CartCardProduct/CartCardProduct";
import RemoveUserCart from "@/components/shared/RemoveUserCart/RemoveUserCart";
import ViewToggle, { ViewType } from "@/components/shared/ViewToggle/ViewToggle";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";

export default function CartPage() {
  const [view, setView] = useState<ViewType>("list");
  const [cartDetails, setCartDetails] = useState<CartResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const res = await getCartItems();
        
        if (res && res.success !== false) {
          setCartDetails(res);
        }
      } catch (error) {
        console.error("Failed to load cart");
      } finally {
        setIsLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-emerald-600" size={40} />
      </div>
    );
  }

  const products = cartDetails?.data?.data?.products || [];
  const subtotal = products.reduce((sum, item) => sum + item.price * item.count, 0);
  const isFreeShipping = subtotal >= 500;
  const shippingCost = isFreeShipping ? 0 : 50;
  const total = cartDetails?.data?.totalCartPrice ? cartDetails.data.totalCartPrice + shippingCost : subtotal + shippingCost;

  const numOfCartItems = cartDetails?.data?.numOfCartItems || products.length;

  return (
    <>
      {products.length > 0 ? (
        <section className="bg-slate-50 dark:bg-slate-950 min-h-screen py-12 transition-colors duration-500">
          <div className="container mx-auto px-4 max-w-7xl">
            
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
              <SectionHeading
                textOne="Shopping Cart"
                textTwo="in your cart"
                key="shopping-cart-heading"
              />
              <ViewToggle view={view} onViewChange={setView} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              
              <div className="lg:col-span-2 flex flex-col h-full">
                <div className={`
                  ${view === "list" ? "flex flex-col space-y-4" : ""}
                  ${view === "grid" ? "grid grid-cols-1 sm:grid-cols-2 gap-4" : ""}
                  ${view === "bento" ? "grid grid-cols-1 md:grid-cols-2 gap-4 auto-rows-max" : ""}
                `}>
                  {products.map((product, idx) => (
                    <CartCardProduct
                      key={product.product._id}
                      product={product.product}
                      price={product.price}
                      quantity={product.count}
                      view={view}
                      index={idx}
                    />
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <Button
                    variant="ghost"
                    className="text-emerald-600 dark:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-700 dark:hover:text-emerald-400 font-bold transition-colors"
                    asChild
                  >
                    <Link href="/products">
                      <ArrowLeft size={16} className="mr-2" /> Continue Shopping
                    </Link>
                  </Button>
                  
                  {/* تعديل الـ Clear عشان يصفر الداتا بشكل سليم */}
                  <RemoveUserCart 
                    onClear={() => setCartDetails({ 
                      ...cartDetails!, 
                      data: { ...cartDetails!.data!, products: [], totalCartPrice: 0 }, 
                      numOfCartItems: 0 
                    })} 
                  />
                </div>
              </div>

              <div className="lg:col-span-1">
                <Card className="bg-white dark:bg-slate-900 rounded-3xl border-slate-200 dark:border-slate-800 shadow-lg overflow-hidden sticky top-24">
                  <CardHeader className="bg-emerald-600 dark:bg-emerald-900 p-6 border-b border-emerald-500/20">
                    <h2 className="text-xl font-black text-white flex items-center gap-2">
                      <ShoppingCart size={22} /> Order Summary
                    </h2>
                    <p className="text-emerald-100 font-medium mt-1">
                      {numOfCartItems} items in your cart
                    </p>
                  </CardHeader>

                  <div className="p-6 space-y-6">
                    {isFreeShipping ? (
                      <div className="bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-100 dark:border-emerald-900/50 rounded-2xl p-4 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-900 flex items-center justify-center shrink-0">
                          <Truck className="text-emerald-600 dark:text-emerald-400" />
                        </div>
                        <div>
                          <p className="font-bold text-emerald-700 dark:text-emerald-400">Free Shipping!</p>
                          <p className="text-sm font-medium text-emerald-600 dark:text-emerald-500/80">You qualify for free delivery</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/50 rounded-2xl p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 flex items-center justify-center shrink-0">
                            <Truck className="text-amber-600 dark:text-amber-500" />
                          </div>
                          <p className="text-sm font-bold text-amber-700 dark:text-amber-400 leading-tight">
                            Add <span className="text-amber-800 dark:text-amber-300">{500 - subtotal} EGP</span> for free shipping
                          </p>
                        </div>
                        <div className="w-full bg-amber-200 dark:bg-amber-900/50 rounded-full h-2 overflow-hidden">
                          <div
                            className="bg-amber-500 h-full rounded-full transition-all duration-700 ease-out"
                            style={{ width: `${Math.min((subtotal / 500) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    )}

                    <div className="space-y-4">
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                        <span>Subtotal</span>
                        <span className="text-slate-900 dark:text-slate-100">{subtotal} EGP</span>
                      </div>
                      <div className="flex justify-between text-slate-600 dark:text-slate-400 font-medium">
                        <span>Shipping</span>
                        {isFreeShipping ? (
                          <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE</span>
                        ) : (
                          <span className="text-slate-900 dark:text-slate-100">50 EGP</span>
                        )}
                      </div>
                      <div className="border-t border-dashed border-slate-200 dark:border-slate-800 pt-4 mt-4">
                        <div className="flex justify-between items-end">
                          <span className="text-slate-900 dark:text-slate-100 font-black text-lg">Total</span>
                          <div className="text-right">
                            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-500">{total}</span>
                            <span className="text-sm font-bold text-slate-500 dark:text-slate-400 ml-1">EGP</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button variant="outline" className="w-full h-14 rounded-2xl border-dashed border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors font-bold gap-2">
                      <Tag size={18} /> Apply Promo Code
                    </Button>

                    <Button asChild className="w-full h-14 rounded-2xl font-bold text-base bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white shadow-lg active:scale-95 transition-all gap-2">
                      {/* تأكدنا إن لينك الدفع بياخد الـ ID المظبوط بتاع الـ Cart */}
                      <Link href={`/checkout?id=${cartDetails?.data.cartId || cartDetails?.data?._id}`}>
                        <Lock size={18} /> Secure Checkout
                      </Link>
                    </Button>

                    <div className="flex items-center justify-center gap-4 pt-2">
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">
                        <Shield className="text-emerald-500" size={14} /> Secure
                      </div>
                      <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                      <div className="flex items-center gap-1.5 text-xs font-bold text-slate-400 dark:text-slate-500">
                        <Truck className="text-blue-500" size={14} /> Fast Delivery
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <section className="min-h-screen bg-slate-50 dark:bg-slate-950 flex items-center justify-center px-4 transition-colors duration-500">
          <div className="max-w-md text-center p-8">
            <div className="relative mb-8 flex justify-center">
              <div className="w-32 h-32 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center justify-center z-10 relative">
                <Box size={56} className="text-slate-300 dark:text-slate-600" />
              </div>
              <div className="absolute -bottom-4 w-24 h-4 bg-black/5 dark:bg-black/40 rounded-full blur-md" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-4">Your cart is empty</h2>
            <p className="text-slate-500 dark:text-slate-400 mb-8 font-medium leading-relaxed">
              Looks like you haven't added anything to your cart yet. Discover our premium products and start shopping!
            </p>
            <Button asChild className="h-14 px-8 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-lg shadow-emerald-600/20 transition-all active:scale-95 gap-2">
              <Link href="/products">
                Start Shopping <ArrowRight size={18} />
              </Link>
            </Button>
            
            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-800">
              <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Popular Categories</p>
              <div className="flex flex-wrap justify-center gap-2">
                {["Electronics", "Fashion", "Home", "Beauty"].map((cat) => (
                  <Link key={cat} href="/categories" className="px-4 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:text-emerald-600 dark:text-slate-300 dark:hover:text-emerald-400 rounded-full text-sm font-bold transition-colors">
                    {cat}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}