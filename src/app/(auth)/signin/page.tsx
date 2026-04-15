import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { Truck, ShieldCheck, Clock, Lock, Users, Star } from 'lucide-react';

import LoginImage from '@/assets/logo.png'; // تأكد من مسار الصورة
import LoginForm from '@/components/forms/SignInForm/LoginForm'; // تأكد من مسار الفورم



export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      
      {/* ================= Left Side (Image & Branding) ================= */}
      <div className="hidden lg:flex w-1/2 bg-slate-900 relative overflow-hidden flex-col justify-between">
        
        {/* الصورة مع تأثير التدرج الأسود عشان النصوص تبان */}
        <div className="absolute inset-0 z-0">
          <Image
            src={LoginImage}
            alt="Yassify Shopping Experience"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            fill
            className="object-cover opacity-60 mix-blend-overlay"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-t from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        {/* المحتوى فوق الصورة */}
        <div className="relative z-10 p-12 xl:p-16 h-full flex flex-col justify-between">
          <Link href="/" className="inline-block">
             <h2 className="text-3xl font-black text-white tracking-tight">
               Yassify<span className="text-emerald-500">.</span>
             </h2>
          </Link>
          
          <div className="mt-auto">
            <h1 className="text-4xl xl:text-5xl font-black text-white leading-tight mb-4">
              Welcome back to <br /> premium shopping.
            </h1>
            <p className="text-lg text-slate-300 font-medium max-w-md mb-8">
              Sign in to continue your seamless shopping experience and unlock exclusive member-only deals.
            </p>

            <div className="flex items-center gap-6 text-sm font-medium text-slate-300">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Truck className="text-emerald-400" size={16} /> Free Delivery
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <ShieldCheck className="text-emerald-400" size={16} /> Secure
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10">
                <Clock className="text-emerald-400" size={16} /> 24/7 Support
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ================= Right Side (Login Form) ================= */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Decorative Blur for right side */}
        <div className="absolute top-0 right-0 w-100 h-100 bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl font-black text-slate-900 dark:text-slate-50 mb-2 tracking-tight">
              Sign in to your account
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium">
              Enter your email and password to login
            </p>
          </div>

          {/* الفورم (مغلف بـ Suspense عشان استخدام useSearchParams جواه) */}
          <Suspense fallback={<div className="h-64 flex items-center justify-center text-slate-500">Loading form...</div>}>
            <LoginForm />
          </Suspense>

          <div className="mt-8 pt-8 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
              New to Yassify?{' '}
              <Link
                className="text-emerald-600 dark:text-emerald-500 hover:text-emerald-700 dark:hover:text-emerald-400 font-bold hover:underline transition-all"
                href="/signup"
              >
                Create an account
              </Link>
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex items-center justify-center gap-6 mt-10 text-xs font-bold text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-1.5">
              <Lock size={14} /> SSL Secured
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} /> 50K+ Users
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} /> 4.9 Rating
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}