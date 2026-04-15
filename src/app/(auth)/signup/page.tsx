import Image from 'next/image';
import Link from 'next/link';
import { Metadata } from 'next';
import { Star, Truck, ShieldCheck, Quote } from 'lucide-react';
import SignUpForm from '@/components/forms/SignUpForm/SignUpForm';


export const metadata: Metadata = {
  title: 'Create Account | Yassify',
  description: 'Join thousands of happy customers who enjoy premium products delivered right to their doorstep.',
  keywords: ['Yassify', 'Register', 'Sign Up', 'Create Account'],
};

export default function SignUpPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      
      {/* ================= Left Side (Branding & Features) ================= */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between p-12 xl:p-16">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 right-0 w-125 h-125 bg-emerald-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-100 h-100 bg-teal-500/20 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/3" />
        
        <div className="relative z-10">
          <Link href="/" className="inline-block mb-16">
             <h2 className="text-3xl font-black text-white tracking-tight">
               Yassify<span className="text-emerald-500">.</span>
             </h2>
          </Link>
          
          <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-6">
            Start your premium <br /> shopping journey.
          </h1>
          <p className="text-lg text-slate-400 font-medium max-w-md mb-12">
            Join thousands of happy customers who enjoy top-tier products delivered securely to their doorstep.
          </p>

          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Star className="text-emerald-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Premium Quality</h3>
                <p className="text-slate-400 text-sm">Products sourced from trusted top-tier suppliers.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <Truck className="text-emerald-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Fast Delivery</h3>
                <p className="text-slate-400 text-sm">Same-day delivery available in selected areas.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0">
                <ShieldCheck className="text-emerald-400" size={24} />
              </div>
              <div>
                <h3 className="text-white font-bold text-lg">Secure Shopping</h3>
                <p className="text-slate-400 text-sm">Your data and payments are 100% protected.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Right Side (Form) ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-md">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-2">
              Create an Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Enter your details below to create your account
            </p>
          </div>

          {/* الفورم */}
          <SignUpForm />

          <p className="mt-8 text-center text-sm font-medium text-slate-600 dark:text-slate-400">
            Already have an account?{' '}
            <Link href="/signin" className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-bold hover:underline transition-all">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}