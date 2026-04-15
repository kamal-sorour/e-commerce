"use client";
import Image from "next/image";
import Link from "next/link";
import {
  CreditCard,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
} from "lucide-react";
import logoImage from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import YassifyBanner from "@/components/shared/YassifyBanner/YassifyBanner";
import { useEffect, useState } from "react";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Categories", href: "/categories" },
    { label: "Brands", href: "/brands" },
    { label: "Electronics", href: `/categories` },
    { label: "Men's Fashion", href: `/categories` },
    { label: "Women's Fashion", href: `/categories` },
  ],
  account: [
    { label: "My Account", href: "/profile" },
    { label: "Order History", href: "/orders" },
    { label: "Wishlist", href: "/wishlist" },
    { label: "Shopping Cart", href: "/cart" },
    { label: "Sign In", href: "/signin" },
    { label: "Create Account", href: "/signup" },
  ],
  support: [
    { label: "Contact Us", href: "/contact" },
    { label: "Help Center", href: "/help" },
    { label: "Shipping Info", href: "/shipping" },
    { label: "Returns & Refunds", href: "/return" },
    { label: "Track Order", href: "/track-order" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookie" },
  ],
};

const socialLinks = [
  { icon: Facebook, href: "#", label: "Facebook", color: "hover:bg-blue-600" },
  { icon: Twitter, href: "#", label: "Twitter", color: "hover:bg-sky-500" },
  {
    icon: Instagram,
    href: "#",
    label: "Instagram",
    color: "hover:bg-pink-600",
  },
  { icon: Youtube, href: "#", label: "Youtube", color: "hover:bg-red-600" },
];

export default function Footer() {
  const [theme, setTheme] = useState<string | null>(null);

  useEffect(() => {
    setTheme(localStorage.getItem("theme"));
  }, []);
  return (
    <TooltipProvider>
      <YassifyBanner variant={theme === "dark" ? "multicolor" : "emerald"} />
      <footer className="w-full bg-slate-50 dark:bg-slate-950 border-t border-border transition-colors duration-300">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
            <div className="lg:col-span-4 space-y-6">
              <Link
                className="inline-block transition-transform hover:scale-105"
                href="/"
              >
                <div className="px-4 py-2 inline-block">
                  <Image
                    alt="Yassify Logo"
                    loading="lazy"
                    width={181}
                    height={40}
                    className="dark:invert"
                    style={{ width: "auto", height: "auto" }}
                    src={logoImage.src}
                  />
                </div>
              </Link>

              <p className="text-muted-foreground text-sm leading-relaxed max-w-sm">
                <span className="font-bold text-foreground">Yassify</span> is
                your ultimate destination for premium shopping. We deliver
                style, technology, and quality right to your doorstep with an
                unmatched digital experience.
              </p>

              <div className="flex items-center gap-2 pt-2">
                {socialLinks.map((social) => (
                  <Tooltip key={social.label}>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="icon"
                        asChild
                        className={cn(
                          "rounded-full h-10 w-10 transition-all duration-300 hover:text-white",
                          social.color,
                        )}
                      >
                        <Link href={social.href}>
                          <social.icon size={18} />
                        </Link>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Follow us on {social.label}</p>
                    </TooltipContent>
                  </Tooltip>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold text-foreground mb-6">Shop</h3>
              <ul className="space-y-3">
                {footerLinks.shop.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-sm text-muted-foreground hover:text-emerald-500 hover:pl-1 transition-all"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold text-foreground mb-6">My Account</h3>
              <ul className="space-y-3">
                {footerLinks.account.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-sm text-muted-foreground hover:text-emerald-500 hover:pl-1 transition-all"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold text-foreground mb-6">Support</h3>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-sm text-muted-foreground hover:text-emerald-500 hover:pl-1 transition-all"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:col-span-2">
              <h3 className="font-bold text-foreground mb-6">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      className="text-sm text-muted-foreground hover:text-emerald-500 hover:pl-1 transition-all"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="border-t border-border bg-white/50 dark:bg-slate-900/30 transition-colors">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-6">
              <p className="text-muted-foreground text-sm text-center md:text-left">
                © 2026{" "}
                <span className="font-bold text-emerald-600">Yassify</span>. All
                rights reserved.
              </p>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors cursor-default">
                  <CreditCard size={18} className="text-emerald-600" />
                  <span className="text-xs font-medium uppercase tracking-wider">
                    Secure Payments
                  </span>
                </div>
                <div className="flex items-center gap-3 grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition-all">
                  <span className="text-xs font-bold bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
                    VISA
                  </span>
                  <span className="text-xs font-bold bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
                    MASTER
                  </span>
                  <span className="text-xs font-bold bg-slate-200 dark:bg-slate-800 px-2 py-1 rounded">
                    PAYPAL
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </TooltipProvider>
  );
}
