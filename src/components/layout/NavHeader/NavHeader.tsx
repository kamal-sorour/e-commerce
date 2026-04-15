import React from 'react';
import { Mail, Phone, Gift, Truck, Link } from 'lucide-react';
import { Separator } from "@/components/ui/separator";
import UserNavHeader from '@/components/shared/UserNavHeader/UserNavHeader';

function NavHeader() {
  return (
    <header
      className="w-full hidden lg:flex justify-between items-center px-2 lg:px-5 xl:px-13 3xl:px-20 py-2 text-sm border-b transition-colors duration-300 border-border bg-slate-50/50 dark:bg-slate-950/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-white/40 dark:bg-slate-950/80 -z-10" />

      <div className="flex gap-6 items-center z-10">
        <div className="flex items-center gap-2 text-muted-foreground dark:text-slate-300">
          <Truck size={16} className="text-green-600 dark:text-green-500" />
          <p className="font-medium">
            Free shipping on all orders over <span className="text-foreground font-bold">$50</span>
          </p>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground dark:text-slate-300">
          <Gift size={16} className="text-green-600 dark:text-green-500" />
          <p className="font-medium">New Arrivals Daily</p>
        </div>
      </div>

      <div className="flex gap-4 items-center z-10">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 group cursor-pointer">
            <Phone size={14} className="text-green-600 dark:text-green-500" />
            <a
              href="tel:+18001234567"
              className="text-muted-foreground dark:text-slate-300 font-medium group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors"
            >
              +1 (800) 123-4567
            </a>
          </div>

          <div className="flex items-center gap-1.5 group cursor-pointer">
            <Mail size={14} className="text-green-600 dark:text-green-500" />
            <a
              href="mailto:support@freshcart.com"
              className="text-muted-foreground dark:text-slate-300 font-medium group-hover:text-green-600 dark:group-hover:text-green-500 transition-colors"
            >
              support@freshcart.com
            </a>
          </div>
        </div>

        <Separator orientation="vertical" className="h-5 bg-border mx-2" />

        
        <div className="flex items-center">
          <UserNavHeader />
        </div> 
      </div>
    </header>
  );
}

export default NavHeader;