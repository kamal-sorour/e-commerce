"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import {
  User,
  Mail,
  Shield,
  Package,
  Heart,
  ShoppingCart,
  Settings,
  Calendar,
  ArrowRight,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useCartWishlist } from "@/providers/CartWishlistProvider/CartWishlistProvider";

const quickLinks = [
  {
    title: "My Orders",
    description: "Track and manage your orders",
    href: "/allorders",
    icon: Package,
    color: "bg-blue-50 dark:bg-blue-950/30 text-blue-600 dark:text-blue-400",
  },
  {
    title: "Wishlist",
    description: "Your saved favorite items",
    href: "/wishlist",
    icon: Heart,
    color: "bg-red-50 dark:bg-red-950/30 text-red-500 dark:text-red-400",
  },
  {
    title: "Shopping Cart",
    description: "Review items in your cart",
    href: "/cart",
    icon: ShoppingCart,
    color: "bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400",
  },
  {
    title: "Settings",
    description: "Manage your account settings",
    href: "/settings",
    icon: Settings,
    color: "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400",
  },
];

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const { cartCount, wishlistCount } = useCartWishlist();

  if (status === "loading") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <Loader2 className="animate-spin text-emerald-500" size={40} />
      </div>
    );
  }

  const user = session?.user;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Profile Header */}
        <div className="relative mb-8">
          {/* Background gradient */}
          <div className="absolute inset-0 h-48 bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE4YzYuNjI3IDAgMTIgNS4zNzMgMTIgMTJzLTUuMzczIDEyLTEyIDEyLTEyLTUuMzczLTEyLTEyIDUuMzczLTEyIDEyLTEyIi8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />
          </div>

          <div className="relative pt-24 px-6 pb-8">
            {/* Avatar */}
            <div className="flex flex-col sm:flex-row items-center sm:items-end gap-6">
              <div className="w-28 h-28 rounded-3xl bg-white dark:bg-slate-900 border-4 border-white dark:border-slate-900 shadow-xl flex items-center justify-center -mt-14">
                <User size={48} className="text-emerald-600 dark:text-emerald-400" strokeWidth={1.5} />
              </div>

              <div className="flex-1 text-center sm:text-left">
                <h1 className="text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight">
                  {user?.name || "User"}
                </h1>
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 mt-2">
                  <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 text-sm font-medium">
                    <Mail size={14} />
                    {user?.email || "No email"}
                  </div>
                  <Badge className="bg-emerald-100 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border-0 text-xs font-bold px-2.5 py-0.5 rounded-full">
                    <Shield size={10} className="mr-1" />
                    {(user as { role?: string })?.role || "Customer"}
                  </Badge>
                </div>
              </div>

              <Button asChild variant="outline" className="rounded-xl border-slate-200 dark:border-slate-800 font-bold gap-2 hover:border-emerald-500 hover:text-emerald-600">
                <Link href="/settings">
                  <Settings size={16} />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Cart Items", value: cartCount, icon: ShoppingCart, color: "text-emerald-600 dark:text-emerald-400" },
            { label: "Wishlist", value: wishlistCount, icon: Heart, color: "text-red-500 dark:text-red-400" },
            { label: "Member Since", value: "2026", icon: Calendar, color: "text-blue-600 dark:text-blue-400" },
            { label: "Role", value: (user as { role?: string })?.role || "User", icon: Shield, color: "text-violet-600 dark:text-violet-400" },
          ].map((stat) => (
            <Card key={stat.label} className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-2xl">
              <CardContent className="p-5 text-center">
                <stat.icon size={24} className={`mx-auto mb-2 ${stat.color}`} strokeWidth={1.5} />
                <p className="text-2xl font-black text-slate-900 dark:text-slate-50">{stat.value}</p>
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mt-1">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="bg-slate-200 dark:bg-slate-800 mb-8" />

        {/* Quick Links */}
        <h2 className="text-xl font-black text-slate-900 dark:text-slate-50 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center gap-4 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5"
            >
              <div className={`w-12 h-12 rounded-xl ${link.color} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <link.icon size={22} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">{link.title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-1">{link.description}</p>
              </div>
              <ArrowRight size={18} className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-1 transition-all shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
