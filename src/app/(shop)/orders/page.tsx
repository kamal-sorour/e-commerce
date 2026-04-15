import Link from "next/link";
import { PackageOpen, ArrowRight, ShoppingBag } from "lucide-react";

import { getUserOrders } from "@/actions/order.actions";

import OrderCard from "@/components/shared/OrderCard/OrderCard";
import SectionHeading from "@/components/shared/SectionHeading/SectionHeading";


export const dynamic = "force-dynamic";

export default async function AllOrdersPage() {
  const resp = await getUserOrders();
  
  
  const { status, ...orders } = resp;
  const allOrders: any[] = status ? Object.values(orders) : [];

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-12">
      <div className="container mx-auto px-4 max-w-5xl">
        
        {status === true && allOrders.length > 0 ? (
          <div className="flex flex-col gap-8 w-full">
            
            {/* ================= Header Section ================= */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <SectionHeading 
                textOne="My" 
                textTwo="Orders" 
              />
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-5 py-2.5 rounded-xl shadow-sm text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
                <PackageOpen size={18} className="text-emerald-600 dark:text-emerald-500" />
                <span>{allOrders.length} {allOrders.length === 1 ? 'Order' : 'Orders'} History</span>
              </div>
            </div>

            {/* ================= Orders List ================= */}
            <div className="flex flex-col gap-6">
              {allOrders.map((order) => (
                <OrderCard order={order} key={order?.id} />
              ))}
            </div>

          </div>
        ) : (
          
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
            
            <div className="relative mb-8 flex justify-center">
              {/* أيقونة فخمة بخلفية زجاجية */}
              <div className="w-32 h-32 rounded-[2rem] bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-xl shadow-slate-200/50 dark:shadow-none flex items-center justify-center z-10 relative group hover:-translate-y-2 transition-transform duration-500">
                <ShoppingBag size={56} className="text-slate-300 dark:text-slate-600" strokeWidth={1.5} />
              </div>
              {/* ظل وهمي تحت الأيقونة */}
              <div className="absolute -bottom-6 w-24 h-4 bg-black/5 dark:bg-black/40 rounded-full blur-md" />
            </div>

            <h3 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-4 tracking-tight">
              No Orders Yet
            </h3>
            
            <p className="text-slate-500 dark:text-slate-400 text-lg mb-10 font-medium max-w-md leading-relaxed">
              Looks like you haven&apos;t placed any orders yet. Discover our premium products and start your shopping journey today!
            </p>
            
            <Link
              href="/products"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-lg transition-all hover:shadow-lg hover:shadow-emerald-600/20 active:scale-95"
            >
              Start Shopping 
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>

            {/* روابط سريعة للمساعدة */}
            <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
               <Link href="/contact" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Need Help?</Link>
               <div className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
               <Link href="/help" className="hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors">Shipping Info</Link>
            </div>
          </div>
        )}
        
      </div>
    </main>
  );
}