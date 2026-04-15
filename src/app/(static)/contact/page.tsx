import { Metadata } from 'next';
import Link from 'next/link';
import { 
  Phone, Mail, MapPin, Clock, 
  Headphones, HelpCircle, ArrowRight,
  Facebook, Twitter, Instagram, Linkedin 
} from 'lucide-react';

import PageBanner from '@/components/shared/PageBanner/PageBanner';
import ContactForm from '@/components/forms/ContactForm/ContactForm';



export default function ContactPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-16">
      
      <PageBanner
        title="Contact Us"
        subTitle="We'd love to hear from you. Get in touch with our dedicated team."
        subTitle2="Support"
        icon={<Headphones size={32} />}
      />

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          
          
          <div className="lg:col-span-1 space-y-6">
            
            
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 ring-4 ring-emerald-50/50 dark:ring-emerald-900/20">
                  <Phone className="text-emerald-600 dark:text-emerald-500" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-lg">Phone</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">Mon-Fri from 8am to 6pm</p>
                  <a href="tel:+18001234567" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-all">
                    +1 (800) 123-4567
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 ring-4 ring-emerald-50/50 dark:ring-emerald-900/20">
                  <Mail className="text-emerald-600 dark:text-emerald-500" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-lg">Email</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm mb-2 font-medium">We'll respond within 24 hours</p>
                  <a href="mailto:support@yassify.com" className="text-emerald-600 dark:text-emerald-400 font-bold hover:underline transition-all">
                    support@yassify.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 ring-4 ring-emerald-50/50 dark:ring-emerald-900/20">
                  <MapPin className="text-emerald-600 dark:text-emerald-500" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-lg">Office</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    123 Commerce Avenue
                    <br /> Manhattan, NY 10001
                    <br /> United States
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 ring-4 ring-emerald-50/50 dark:ring-emerald-900/20">
                  <Clock className="text-emerald-600 dark:text-emerald-500" size={22} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-1 text-lg">Business Hours</h3>
                  <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed font-medium">
                    Monday - Friday: 8am - 6pm
                    <br /> Saturday: 9am - 4pm
                    <br /> Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm text-center">
              <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-5">Follow Us</h3>
              <div className="flex items-center justify-center gap-3">
                {[
                  { icon: Facebook, href: "#" },
                  { icon: Twitter, href: "#" },
                  { icon: Instagram, href: "#" },
                  { icon: Linkedin, href: "#" }
                ].map((social, idx) => (
                  <a
                    key={idx}
                    href={social.href}
                    className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-white transition-all duration-300 hover:-translate-y-1"
                  >
                    <social.icon size={18} />
                  </a>
                ))}
              </div>
            </div>

          </div>

          
          <div className="lg:col-span-2 flex flex-col gap-6">
            
            
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 md:p-12 shadow-sm flex-1">
              <div className="flex items-center gap-4 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center ring-4 ring-emerald-50/50 dark:ring-emerald-900/20">
                  <Headphones size={28} className="text-emerald-600 dark:text-emerald-500" />
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-slate-50 tracking-tight mb-1">
                    Send us a Message
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
                    Fill out the form below and our team will get back to you shortly.
                  </p>
                </div>
              </div>
              
              <ContactForm />
            </div>

            
            <div className="bg-linear-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-900/20 rounded-3xl p-8 border border-emerald-100 dark:border-emerald-900/30">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-900 flex items-center justify-center shrink-0 shadow-sm">
                  <HelpCircle className="text-emerald-600 dark:text-emerald-500" size={28} />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2">
                    Looking for quick answers?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium mb-4 leading-relaxed max-w-lg">
                    Check out our Help Center for frequently asked questions about orders, shipping, returns, and more.
                  </p>
                  <Link
                    href="/help"
                    className="inline-flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-sm hover:text-emerald-800 dark:hover:text-emerald-300 transition-colors group"
                  >
                    Visit Help Center
                    <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </div>

          </div>
          
        </div>
      </div>
    </main>
  );
}