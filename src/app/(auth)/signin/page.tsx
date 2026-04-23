import Image from 'next/image';
import Link from 'next/link';
import { Suspense } from 'react';
import { Metadata } from 'next';
import { Truck, ShieldCheck, Clock, Lock, Users, Star, Sparkles, ArrowRight } from 'lucide-react';

import LoginImage from '@/assets/blog-img-1.jpeg'; 
import LoginForm from '@/components/forms/SignInForm/LoginForm'; 

export const metadata: Metadata = {
  title: 'Sign In — Yassify',
  description: 'Sign in to your Yassify account for the best shopping experience.',
};

const trustBadges = [
  { icon: Truck, label: "Free Delivery", desc: "On orders 1000+ EGP" },
  { icon: ShieldCheck, label: "Secure Checkout", desc: "256-bit SSL encrypted" },
  { icon: Clock, label: "24/7 Support", desc: "Always here for you" },
];

const socialProof = [
  { value: "50K+", label: "Happy Customers" },
  { value: "4.9", label: "App Rating" },
  { value: "99%", label: "Satisfaction" },
];

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-500">
      
      {/* Left Panel — Visual */}
      <div className="hidden lg:flex w-1/2 relative overflow-hidden flex-col">
        {/* Background Image */}
        <Image
          src={LoginImage}
          alt="Premium shopping experience"
          fill
          className="object-cover"
          priority
          quality={85}
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/70 to-slate-950/30 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/50 to-transparent z-10" />

        <div className="relative z-20 p-12 xl:p-16 h-full flex flex-col justify-between">
          {/* Logo */}
          <Link href="/" className="inline-block group">
            <h2 className="text-3xl font-black text-white tracking-tight group-hover:scale-105 transition-transform origin-left">
              Yassify<span className="text-emerald-400">.</span>
            </h2>
          </Link>
          
          {/* Hero Content */}
          <div className="mt-auto space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 backdrop-blur-md text-emerald-300 text-xs font-bold px-4 py-2 rounded-full mb-6">
                <Sparkles size={14} className="fill-emerald-400 text-emerald-400" />
                WELCOME BACK
              </div>
              <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-black text-white leading-[1.1] tracking-tight mb-4">
                Your premium{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  shopping
                </span>{' '}
                awaits.
              </h1>
              <p className="text-lg text-slate-300 font-medium max-w-md leading-relaxed">
                Sign in to access exclusive deals, track your orders, and enjoy a seamless experience crafted just for you.
              </p>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center gap-3">
              {trustBadges.map((badge) => (
                <div key={badge.label} className="flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 px-5 py-3 rounded-2xl hover:bg-white/10 transition-colors">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 flex items-center justify-center">
                    <badge.icon className="text-emerald-400" size={18} aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-white">{badge.label}</p>
                    <p className="text-[11px] text-slate-400">{badge.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-8 pt-4 border-t border-white/10">
              {socialProof.map((item) => (
                <div key={item.label}>
                  <p className="text-2xl font-black text-white">{item.value}</p>
                  <p className="text-xs font-medium text-slate-400">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel — Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 relative">
        {/* Background decorations */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-teal-500/5 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/3 pointer-events-none" />
        
        <div className="w-full max-w-md relative z-10">
          {/* Mobile Logo */}
          <div className="lg:hidden mb-8 text-center">
            <Link href="/">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight inline-block">
                Yassify<span className="text-emerald-500">.</span>
              </h2>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-slate-50 mb-3 tracking-tight">
              Welcome back
            </h2>
            <p className="text-slate-500 dark:text-slate-400 font-medium text-base">
              Enter your credentials to access your account
            </p>
          </div>

          {/* Form */}
          <Suspense fallback={
            <div className="space-y-4">
              {[1, 2].map((n) => (
                <div key={n} className="h-13 rounded-2xl bg-slate-100 dark:bg-slate-900 animate-pulse" />
              ))}
              <div className="h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-900/30 animate-pulse" />
            </div>
          }>
            <LoginForm />
          </Suspense>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-800" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-50 dark:bg-slate-950 px-4 text-slate-400 dark:text-slate-500 font-bold tracking-widest">
                New here?
              </span>
            </div>
          </div>

          {/* Sign Up CTA */}
          <Link
            href="/signup"
            className="group flex items-center justify-center gap-3 w-full h-14 rounded-2xl border-2 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold text-base hover:border-emerald-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-all hover:shadow-lg hover:shadow-emerald-500/10 hover:-translate-y-0.5 active:scale-[0.98]"
          >
            Create an account
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </Link>

          {/* Bottom Trust */}
          <div className="flex items-center justify-center gap-6 mt-10 text-xs font-bold text-slate-400 dark:text-slate-500">
            <div className="flex items-center gap-1.5">
              <Lock size={14} aria-hidden="true" /> SSL Secured
            </div>
            <div className="flex items-center gap-1.5">
              <Users size={14} aria-hidden="true" /> 50K+ Users
            </div>
            <div className="flex items-center gap-1.5">
              <Star size={14} aria-hidden="true" /> 4.9 Rating
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}