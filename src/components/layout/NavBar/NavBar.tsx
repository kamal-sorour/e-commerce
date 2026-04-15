"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import {
  Headset,
  Heart,
  Search,
  ShoppingCart,
  User,
  UserCircle,
  LogOut,
  Settings,
  PackageSearch,
  Music,
  Shirt,
  Baby,
  Sparkles,
  ShoppingBasket
} from "lucide-react";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

import logoImage from "@/assets/logo.png";
import NavHeader from "../NavHeader/NavHeader";
import { ThemeToggle } from "@/components/shared/ThemeToggle/ThemeToggle";
import MobileNav from "@/components/shared/MobileNav/MobileNav";

interface NavbarProps {
  className?: string;
}

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Brands", href: "/brands" },
];


const categories = [
  { id: "all", name: "All Categories", href: "/categories", icon: PackageSearch, desc: "Browse everything" },
  { id: "6439d61c0049ad0b52b90051", name: "Music", href: "/categories/6439d61c0049ad0b52b90051", icon: Music, desc: "Instruments & audio" },
  { id: "6439d58a0049ad0b52b9003f", name: "Women's Fashion", href: "/categories/6439d58a0049ad0b52b9003f", icon: Sparkles, desc: "Trending clothing" },
  { id: "6439d5b90049ad0b52b90048", name: "Men's Fashion", href: "/categories/6439d5b90049ad0b52b90048", icon: Shirt, desc: "Apparel & accessories" },
  { id: "6439d41c67d9aa4ca97064d5", name: "SuperMarket", href: "/categories/6439d41c67d9aa4ca97064d5", icon: ShoppingBasket, desc: "Daily essentials" },
  { id: "6439d40367d9aa4ca97064cc", name: "Baby & Toys", href: "/categories/6439d40367d9aa4ca97064cc", icon: Baby, desc: "Kids & toddlers" },
];

export default function Navbar({ className }: NavbarProps) {
  const pathname = usePathname();
  const { status, data: sessionData } = useSession();
  
  const logOutHandler = () => {
    signOut({ callbackUrl: "/" });
  };

  return (
    <>
      <NavHeader />
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b bg-white/90 dark:bg-slate-950/90 backdrop-blur-md shadow-sm transition-colors duration-500",
          className,
        )}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 lg:h-20 gap-4">
            
            
            <Link className="shrink-0 transition-transform hover:scale-105 active:scale-95" href="/">
              <Image
                alt="Yassify"
                width={161}
                height={41}
                className="dark:invert w-auto h-auto"
                src={logoImage.src}
                priority
              />
            </Link>

            
            <form className="hidden lg:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                <Input
                  type="search"
                  placeholder="Search for premium products..."
                  className="w-full pl-11 pr-4 h-11 rounded-full border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 transition-all shadow-inner"
                />
              </div>
            </form>

            
            <NavigationMenu className="hidden xl:flex">
              <NavigationMenuList className="gap-2">
                {mainLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild active={pathname === link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent hover:bg-emerald-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold rounded-full transition-colors",
                          pathname === link.href && "text-emerald-600 dark:text-emerald-400 bg-emerald-50/50 dark:bg-emerald-950/20",
                        )}
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:bg-emerald-50 dark:hover:bg-slate-900 text-slate-600 dark:text-slate-300 hover:text-emerald-600 dark:hover:text-emerald-400 font-bold rounded-full transition-colors">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="w-125 lg:w-150 p-6 bg-white dark:bg-slate-950 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800">
                      <div className="mb-4 pb-2 border-b border-slate-100 dark:border-slate-800">
                         <h4 className="font-black text-slate-900 dark:text-slate-100">Explore Departments</h4>
                      </div>
                      <ul className="grid grid-cols-2 gap-3">
                        {categories.map((cat) => {
                          const Icon = cat.icon;
                          return (
                            <li key={cat.id}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={cat.href}
                                  className="group flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-900 border border-transparent hover:border-slate-100 dark:hover:border-slate-800 transition-all"
                                >
                                  <div className="w-10 h-10 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                                    <Icon size={20} className="text-emerald-600 dark:text-emerald-400" />
                                  </div>
                                  <div>
                                    <div className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                                      {cat.name}
                                    </div>
                                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                                      {cat.desc}
                                    </p>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            
            <div className="flex items-center gap-2 lg:gap-4">
              
              <Link
                className="hidden lg:flex items-center gap-3 pr-4 mr-2 border-r border-slate-200 dark:border-slate-800 hover:text-emerald-600 transition-colors group"
                href="/contact"
              >
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/30 transition-colors">
                  <Headset size={20} className="text-slate-600 dark:text-slate-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400" />
                </div>
                <div className="text-xs leading-tight">
                  <div className="text-slate-500 font-medium">Support</div>
                  <div className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400">24/7 Help</div>
                </div>
              </Link>

              
              <div className="flex items-center gap-1">
                <Link href="/wishlist" className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors group">
                  <Heart size={22} strokeWidth={2} className="text-slate-700 dark:text-slate-300 group-hover:text-red-500 transition-colors" />
                </Link>

                <Link href="/cart" className="relative p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-900 transition-colors group">
                  <ShoppingCart size={22} strokeWidth={2} className="text-slate-700 dark:text-slate-300 group-hover:text-emerald-600 transition-colors" />
                </Link>

                <ThemeToggle />
              </div>

              <Separator orientation="vertical" className="h-8 mx-1 hidden sm:block bg-slate-200 dark:bg-slate-800" />

              
              {status === "unauthenticated" ? (
                <Button
                  asChild
                  className="hidden sm:flex rounded-full bg-emerald-600 hover:bg-emerald-700 text-white gap-2 px-6 h-10 shadow-md shadow-emerald-600/20 active:scale-95 transition-all"
                >
                  <Link href="/signin">
                    <User size={16} strokeWidth={2.5} />
                    Sign In
                  </Link>
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-900">
                      <UserCircle className="h-6 w-6 text-slate-700 dark:text-slate-300" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 rounded-2xl p-2 border-slate-100 dark:border-slate-800 shadow-xl" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal px-3 py-2">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-bold leading-none text-slate-900 dark:text-slate-100">{sessionData?.user?.name || "User"}</p>
                        <p className="text-xs leading-none text-slate-500">{sessionData?.user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild className="rounded-xl cursor-pointer px-3 py-2.5 font-medium hover:bg-emerald-50 dark:hover:bg-slate-900 hover:text-emerald-600 dark:hover:text-emerald-400">
                        <Link href="/profile"><User className="h-4 w-4 mr-2" /> Profile</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl cursor-pointer px-3 py-2.5 font-medium hover:bg-emerald-50 dark:hover:bg-slate-900 hover:text-emerald-600 dark:hover:text-emerald-400">
                        <Link href="/orders"><ShoppingCart className="h-4 w-4 mr-2" /> My Orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild className="rounded-xl cursor-pointer px-3 py-2.5 font-medium hover:bg-emerald-50 dark:hover:bg-slate-900 hover:text-emerald-600 dark:hover:text-emerald-400">
                        <Link href="/settings"><Settings className="h-4 w-4 mr-2" /> Settings</Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator className="bg-slate-100 dark:bg-slate-800" />
                    <DropdownMenuItem onClick={logOutHandler} className="rounded-xl cursor-pointer px-3 py-2.5 font-bold text-red-600 focus:bg-red-50 dark:focus:bg-red-950/30 focus:text-red-600">
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              
              
              <MobileNav status={status} sessionData={sessionData} />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}