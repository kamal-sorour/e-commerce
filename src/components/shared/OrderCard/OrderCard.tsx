"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  ChevronUp, 
  Clock, 
  MapPin, 
  Monitor, 
  Package, 
  ReceiptText
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

interface OrderCardProps {
  order: any;
}

export default function OrderCard({ order }: OrderCardProps) {
  const [expanded, setExpanded] = useState(false);

  
  const subtotal = order.cartItems.reduce(
    (sum: number, item: any) => sum + item.price * item.count,
    0
  );

  return (
    <Card className="w-full overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 shadow-sm hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-0">
        
        {/* ================= Header Area (Summary) ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 pb-4 sm:pb-6 gap-6">
          
          <div className="flex items-start gap-4 sm:gap-6 w-full">
            {/* Main Image with Badge */}
            <div className="relative shrink-0">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-center p-2 overflow-hidden shadow-inner">
                <Image
                  src={order.cartItems[0]?.product?.imageCover}
                  alt={order.cartItems[0]?.product?.title || "Product image"}
                  width={160}
                  height={160}
                  className="object-contain w-full h-full drop-shadow-sm dark:drop-shadow-none"
                />
              </div>
              {order.cartItems.length > 1 && (
                <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-slate-900 dark:bg-emerald-600 text-white text-xs font-bold flex items-center justify-center ring-4 ring-white dark:ring-slate-950 shadow-sm">
                  +{order.cartItems.length - 1}
                </span>
              )}
            </div>

            {/* Order Info */}
            <div className="flex-1 min-w-0 flex flex-col justify-center py-1">
              <div className="flex items-center gap-2 mb-2">
                {order.isPaid ? (
                  <Badge className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 hover:bg-amber-100 border-0 gap-1.5 font-bold px-2.5 py-0.5 rounded-full">
                    <Clock size={14} /> Processing
                  </Badge>
                ) : (
                  <Badge className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 border-0 gap-1.5 font-bold px-2.5 py-0.5 rounded-full">
                    <CheckCircle2 size={14} /> Paid
                  </Badge>
                )}
              </div>
              
              <div className="flex items-center gap-1 text-lg sm:text-xl font-black text-slate-900 dark:text-slate-50 mb-1">
                <span className="text-slate-400 dark:text-slate-500 font-medium">#</span>
                {order.id}
              </div>
              
              <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400 flex-wrap">
                <span className="flex items-center gap-1.5">
                  <Calendar size={14} className="text-slate-400" /> 
                  {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                </span>
                <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
                <span className="flex items-center gap-1.5">
                  <Package size={14} className="text-slate-400" /> 
                  {order.cartItems.length} {order.cartItems.length === 1 ? "item" : "items"}
                </span>
              </div>
            </div>
          </div>

          {/* Device Icon (Optional, keeping as requested) */}
          <div className="hidden sm:block">
            <Button variant="ghost" size="icon" className="h-10 w-10 rounded-xl bg-slate-50 dark:bg-slate-900 text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400">
              <Monitor size={18} />
            </Button>
          </div>
        </div>

        {/* ================= Price & Toggle Area ================= */}
        <div className="flex items-center justify-between px-6 pb-6">
          <div className="flex items-baseline gap-1">
            <span className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-50">
              {order.totalOrderPrice}
            </span>
            <span className="text-sm font-bold text-slate-500 dark:text-slate-400">EGP</span>
          </div>

          <Button
            onClick={() => setExpanded(!expanded)}
            variant={expanded ? "default" : "outline"}
            className={cn(
              "rounded-xl font-bold gap-2 transition-all active:scale-95",
              expanded 
                ? "bg-slate-900 hover:bg-slate-800 dark:bg-emerald-600 dark:hover:bg-emerald-700 text-white" 
                : "border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/50"
            )}
          >
            {expanded ? (
              <>Hide Details <ChevronUp size={16} strokeWidth={2.5} /></>
            ) : (
              <>View Details <ChevronDown size={16} strokeWidth={2.5} /></>
            )}
          </Button>
        </div>

        {/* ================= Expanded Details Area ================= */}
        <div className={cn("grid transition-all duration-300 ease-in-out", expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0")}>
          <div className="overflow-hidden">
            <Separator className="bg-slate-100 dark:bg-slate-800" />
            
            <div className="p-6 space-y-8 bg-slate-50/50 dark:bg-slate-900/20">
              
              {/* --- Items List --- */}
              <div>
                <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wider">
                  <Package size={16} className="text-emerald-600 dark:text-emerald-500" />
                  Order Items
                </h3>
                <div className="space-y-3">
                  {order.cartItems.map((item: any, i: number) => (
                    <div
                      key={i}
                      className="flex items-center gap-4 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-4 shadow-sm"
                    >
                      <div className="w-16 h-16 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-center p-2 shrink-0">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          width={160}
                          height={160}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100 truncate mb-1">
                          {item.product.title}
                        </p>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                            Qty: {item.count}
                          </span>
                          <span>× {item.price} EGP</span>
                        </div>
                      </div>
                      
                      <div className="text-right shrink-0">
                        <p className="text-base sm:text-lg font-black text-slate-900 dark:text-slate-100">
                          {item.count * item.price}
                        </p>
                        <p className="text-[10px] font-bold text-slate-400 uppercase">EGP</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* --- Order Summary (Receipt) --- */}
              <div>
                 <h3 className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100 mb-4 uppercase tracking-wider">
                  <ReceiptText size={16} className="text-emerald-600 dark:text-emerald-500" />
                  Payment Summary
                </h3>
                <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 shadow-sm">
                  <div className="space-y-3 text-sm font-medium text-slate-600 dark:text-slate-400">
                    <div className="flex justify-between items-center">
                      <span>Subtotal</span>
                      <span className="text-slate-900 dark:text-slate-100">{subtotal} EGP</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Shipping Fee</span>
                      <span className={order.shippingPrice === 0 ? "text-emerald-600 dark:text-emerald-400 font-bold" : "text-slate-900 dark:text-slate-100"}>
                        {order.shippingPrice === 0 ? "Free" : `${order.shippingPrice} EGP`}
                      </span>
                    </div>
                    
                    <div className="pt-3 mt-3 border-t border-dashed border-slate-200 dark:border-slate-700">
                      <div className="flex justify-between items-end">
                        <span className="font-bold text-slate-900 dark:text-slate-100 text-base">Total Paid</span>
                        <div className="text-right">
                          <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                            {order.totalOrderPrice}
                          </span>
                          <span className="text-xs font-bold text-slate-500 ml-1">EGP</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
}