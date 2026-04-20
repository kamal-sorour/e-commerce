import { Metadata } from "next";
import { ShieldCheck, Lock } from "lucide-react";
import CheckoutForm from "@/components/forms/CheckoutForm/CheckoutForm"; 

export const metadata: Metadata = {
  title: "Secure Checkout",
  description: "Complete your order securely at Yassify. Fast, safe, and 100% protected payment.",
  robots: {
    index: false,
    follow: false,
  },
};

interface CheckoutPageProps {
  searchParams: Promise<{
    id: string;
  }>;
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  
  const { id } = await searchParams;

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 py-12 px-4 relative overflow-hidden">
      
      <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-125 h-125 bg-teal-500/10 rounded-full blur-[120px] pointer-events-none translate-y-1/2 -translate-x-1/3" />

      <div className="max-w-3xl mx-auto relative z-10">
        
        
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 mb-6 shadow-inner ring-4 ring-white dark:ring-slate-900">
            <Lock size={32} strokeWidth={2} />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 dark:text-slate-50 tracking-tight mb-3">
            Secure Checkout
          </h1>
          <p className="text-slate-500 dark:text-slate-400 font-medium flex items-center justify-center gap-2">
            <ShieldCheck size={18} className="text-emerald-500" />
            Your connection and data are 100% secure.
          </p>
        </div>

        
        <div className="bg-white dark:bg-slate-900 rounded-[2.5rem] shadow-xl shadow-slate-200/50 dark:shadow-none border border-slate-100 dark:border-slate-800 p-6 md:p-12">
          <CheckoutForm cartId={id} />
        </div>

      </div>
    </main>
  );
}