"use client";

import Image from "next/image";
import Link from "next/link";
import { Session } from "next-auth"; 
import { signOut } from "next-auth/react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import {
  LogOut,
  Menu,
  Search,
  ShoppingCart,
  User,
  X,
  Home,
  ShoppingBag,
  Award,
  Shapes,
  Heart,
  ChevronRight
} from "lucide-react";

import logoImage from "@/assets/logo.png";

// الروابط الرئيسية للموبايل
const mainNavCards = [
  { name: "Home", href: "/", icon: Home, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "Shop", href: "/products", icon: ShoppingBag, color: "text-emerald-500", bg: "bg-emerald-500/10" },
  { name: "Brands", href: "/brands", icon: Award, color: "text-violet-500", bg: "bg-violet-500/10" },
  { name: "Categories", href: "/categories", icon: Shapes, color: "text-orange-500", bg: "bg-orange-500/10" },
];

interface MobileNavProps {
  status: "authenticated" | "unauthenticated" | "loading";
  sessionData?: Session | null;
}

export default function MobileNav({ status, sessionData }: MobileNavProps) {
  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button 
          variant="ghost" 
          size="icon"
          className="lg:hidden ml-2 w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-emerald-50 hover:text-emerald-600 transition-all active:scale-95"
        >
          <Menu size={20} strokeWidth={2.5} />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-slate-50 dark:bg-slate-950 border-l border-slate-200 dark:border-slate-800 rounded-none w-[85vw] max-w-sm ml-auto overflow-y-auto overflow-x-hidden h-full flex flex-col">
        
        {/* Header */}
        <DrawerHeader className="p-0 text-left shrink-0">
          <DrawerTitle className="sr-only">Mobile Menu</DrawerTitle>
          <div className="flex items-center justify-between p-5 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
            <Image
              alt="Yassify"
              width={120}
              height={24}
              className="h-auto w-auto dark:invert transition-all"
              src={logoImage.src}
            />
            <DrawerClose asChild>
              <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500 transition-colors">
                <X size={18} strokeWidth={2.5} />
              </Button>
            </DrawerClose>
          </div>
        </DrawerHeader>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          
          {/* Search Box */}
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="search"
                placeholder="Search products..."
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-none bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 shadow-sm text-base font-medium transition-shadow"
              />
            </div>
          </form>

          {/* App-like Grid Menu */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">Menu</h4>
            <div className="grid grid-cols-2 gap-3">
              {mainNavCards.map((link) => {
                const Icon = link.icon;
                return (
                  <DrawerClose asChild key={link.href}>
                    <Link
                      href={link.href}
                      className="flex flex-col items-center justify-center gap-3 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:border-emerald-200 dark:hover:border-slate-700 transition-all active:scale-95"
                    >
                      <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", link.bg)}>
                        <Icon size={24} className={link.color} strokeWidth={2} />
                      </div>
                      <span className="font-bold text-sm text-slate-700 dark:text-slate-200">{link.name}</span>
                    </Link>
                  </DrawerClose>
                );
              })}
            </div>
          </div>

          {/* Quick Actions (List Style) */}
          <div>
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3 px-1">My Cart</h4>
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
              <DrawerClose asChild>
                <Link href="/wishlist" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors border-b border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                    <Heart size={20} className="text-slate-500" />
                    <span className="font-bold text-slate-700 dark:text-slate-200">Wishlist</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link href="/cart" className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <div className="flex items-center gap-3">
                    <ShoppingCart size={20} className="text-slate-500" />
                    <span className="font-bold text-slate-700 dark:text-slate-200">Shopping Cart</span>
                  </div>
                  <ChevronRight size={16} className="text-slate-400" />
                </Link>
              </DrawerClose>
            </div>
          </div>
        </div>

        {/* Footer (Auth Box) */}
        <div className="p-5 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 shrink-0">
          {status === "unauthenticated" ? (
            <div className="flex gap-3">
              <DrawerClose asChild>
                <Link
                  href="/signin"
                  className="flex-1 flex items-center justify-center py-3.5 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  Sign In
                </Link>
              </DrawerClose>
              <DrawerClose asChild>
                <Link
                  href="/signup"
                  className="flex-1 flex items-center justify-center py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all"
                >
                  Sign Up
                </Link>
              </DrawerClose>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <DrawerClose asChild>
                <Link href="/profile" className="flex items-center gap-3 flex-1">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center text-emerald-700 dark:text-emerald-400 font-black">
                    {sessionData?.user?.name?.charAt(0).toUpperCase() || <User size={18} />}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Logged in as</span>
                    <span className="font-bold text-slate-900 dark:text-slate-100 text-sm line-clamp-1">
                      {sessionData?.user?.name}
                    </span>
                  </div>
                </Link>
              </DrawerClose>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-10 h-10 rounded-full bg-red-50 dark:bg-red-950/30 text-red-600 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors"
              >
                <LogOut size={18} />
              </Button>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}