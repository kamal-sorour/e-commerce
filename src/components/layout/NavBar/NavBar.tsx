"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ChevronDown,
  Headset,
  Heart,
  Search,
  ShoppingCart,
  User,
  UserCircle,
  LogOut,
  Settings,
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
import { cn } from "@/lib/utils";
import logoImage from "@/assets/logo.png";
import { usePathname } from "next/navigation";
import NavHeader from "../NavHeader/NavHeader";
import { ThemeToggle } from "@/components/shared/ThemeToggle/ThemeToggle";
// import Dialog from "@/components/shared/Dialog/Dialog";

interface NavbarProps {
  className?: string;
}

const mainLinks = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/products" },
  { name: "Brands", href: "/brands" },
];

interface Category {
  id?: string;
  name: string;
  href: string;
}

const categories: Category[] = [
  {
    name: "All Categories",
    href: "/categories",
  },
  {
    id: "6439d61c0049ad0b52b90051",
    name: "Music",
    href: "/categories/6439d61c0049ad0b52b90051",
  },
  {
    id: "6439d58a0049ad0b52b9003f",
    name: "Women's Fashion",
    href: "/categories/6439d58a0049ad0b52b9003f",
  },
  {
    id: "6439d5b90049ad0b52b90048",
    name: "Men's Fashion",
    href: "/categories/6439d5b90049ad0b52b90048",
  },
  {
    id: "6439d41c67d9aa4ca97064d5",
    name: "SuperMarket",
    href: "/categories/6439d41c67d9aa4ca97064d5",
  },
  {
    id: "6439d30b67d9aa4ca97064b1",
    name: "Beauty & Health",
    href: "/categories/6439d30b67d9aa4ca97064b1",
  },
  {
    id: "6439d40367d9aa4ca97064cc",
    name: "Baby & Toys",
    href: "/categories/6439d40367d9aa4ca97064cc",
  },
];

const Navbar = ({ className }: NavbarProps) => {
  const pathname = usePathname();
  return (
    <>
      <NavHeader />
      <header
        className={cn(
          "sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 shadow-sm",
          className,
        )}
      >
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 lg:h-20 gap-4">
            <Link
              className="shrink-0 transition-opacity hover:opacity-90"
              href="/"
            >
              <Image
                alt="Yassify"
                width={161}
                height={31}
                className="dark:invert"
                style={{ width: "auto", height: "auto" }} 
                src={logoImage.src}
              />
            </Link>

            <form className="hidden lg:flex flex-1 max-w-xl mx-4">
              <div className="relative w-full group">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-green-600 transition-colors" />
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pl-10 pr-4 rounded-full border-muted bg-muted/50 focus-visible:ring-green-500/20 focus-visible:border-green-500 transition-all"
                />
              </div>
            </form>

            <NavigationMenu className="hidden xl:flex">
              <NavigationMenuList>
                {mainLinks.map((link) => (
                  <NavigationMenuItem key={link.href}>
                    <NavigationMenuLink asChild active={pathname === link.href}>
                      <Link
                        href={link.href}
                        className={cn(
                          navigationMenuTriggerStyle(),
                          "bg-transparent hover:text-green-600 dark:hover:text-green-400",
                          pathname === link.href && "text-green-600 font-bold",
                        )}
                      >
                        {link.name}
                      </Link>
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                ))}

                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent hover:text-green-600">
                    Categories
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-62.5 gap-1 p-4 bg-popover rounded-md shadow-md border">
                      {categories.length > 0 ? (
                        categories.map((cat, i) => (
                          <li key={i}>
                            <NavigationMenuLink asChild>
                              <Link
                                href={cat.href}
                                className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground text-sm font-medium"
                              >
                                {cat.name}
                              </Link>
                            </NavigationMenuLink>
                          </li>
                        ))
                      ) : (
                        <p className="text-xs text-muted-foreground p-2 text-center">
                          Loading categories...
                        </p>
                      )}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>

            <div className="flex items-center gap-1 lg:gap-3">
              <Link
                className="hidden lg:flex items-center gap-3 pr-4 mr-2 border-r border-border hover:text-green-600 transition-colors"
                href="/contact"
              >
                <div className="w-9 h-9 rounded-full bg-green-50 dark:bg-green-900/20 flex items-center justify-center">
                  <Headset
                    size={18}
                    className="text-green-600 dark:text-green-500"
                  />
                </div>
                <div className="text-[11px] leading-tight">
                  <div className="text-muted-foreground font-medium">
                    Support
                  </div>
                  <div className="font-bold text-foreground">24/7 Help</div>
                </div>
              </Link>

              <Link
                href="/wishlist"
                className="relative p-2 rounded-full hover:bg-muted transition-colors group"
              >
                <Heart
                  size={22}
                  className="text-foreground/80 group-hover:text-red-500 transition-colors"
                />
                {/* {count > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-600 hover:bg-red-600 border-2 border-background">
                    {count}
                  </Badge>
                )} */}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 rounded-full hover:bg-muted transition-colors group"
              >
                <ShoppingCart
                  size={22}
                  className="text-foreground/80 group-hover:text-green-600 transition-colors"
                />
                {/* {numOfCartItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-green-600 hover:bg-green-600 border-2 border-background">
                    {numOfCartItems}
                  </Badge>
                )} */}
              </Link>
              <ThemeToggle />
              <Separator
                orientation="vertical"
                className="h-6 mx-1 hidden sm:block"
              />

              <Button
                asChild
                size="sm"
                className="hidden sm:flex rounded-full bg-green-600 hover:bg-green-700 text-white gap-2 px-6"
              >
                <Link href="/login">
                  <User size={16} />
                  Sign In
                </Link>
              </Button>
              {/* {status === "unauthenticated" ? (
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full p-0">
                      <UserCircle className="h-7 w-7 text-muted-foreground hover:text-green-600 transition-colors" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{sessionData?.user?.name || "User"}</p>
                        <p className="text-xs leading-none text-muted-foreground">{sessionData?.user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="flex items-center gap-2 w-full">
                          <User className="h-4 w-4" /> Profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/allorders" className="flex items-center gap-2 w-full">
                          <ShoppingCart className="h-4 w-4" /> My Orders
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/settings" className="flex items-center gap-2 w-full">
                          <Settings className="h-4 w-4" /> Settings
                        </Link>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logOutHandler} className="text-red-600 focus:text-red-600 cursor-pointer">
                      <LogOut className="h-4 w-4 mr-2" /> Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
               */}
              {/* Dialog (Keep as is since it's custom) */}
              {/* <Dialog status={status} sessionData={sessionData} /> */}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};

export default Navbar;
