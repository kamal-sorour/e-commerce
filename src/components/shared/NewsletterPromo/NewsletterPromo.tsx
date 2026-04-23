import Link from "next/link";
import { 
  ArrowRight, Leaf, Mail, Sparkles, Tag, 
  Truck, Smartphone, Download, Star 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewsletterPromo() {
  return (
    <section className="py-16 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-500 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="relative group">
          
          <div className="bg-linear-to-br from-emerald-50 via-white to-teal-50 dark:from-slate-900 dark:via-slate-900/95 dark:to-slate-800 rounded-[2.5rem] border border-emerald-100/50 dark:border-slate-800 shadow-2xl shadow-emerald-500/10 dark:shadow-none overflow-hidden transition-all duration-500">
            
            <div className="absolute top-0 right-0 w-80 h-80 bg-linear-to-br from-emerald-200/40 dark:from-emerald-900/20 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-linear-to-tr from-teal-200/30 dark:from-teal-900/20 to-transparent rounded-full blur-3xl translate-y-1/2 -translate-x-1/4 pointer-events-none transition-transform duration-700 group-hover:scale-110" />
            
            <div className="relative grid lg:grid-cols-5 gap-8 p-8 lg:p-14">
              
              <div className="lg:col-span-3 space-y-8">
                
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-linear-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg shadow-emerald-500/30">
                    <Mail className="text-white" size={24} strokeWidth={2.5} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider mb-0.5">
                      Newsletter
                    </h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                      Join 50,000+ subscribers
                    </p>
                  </div>
                </div>

                <div>
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 dark:text-slate-50 leading-tight tracking-tight">
                    Get the Freshest Updates{" "}
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-600 to-teal-500 dark:from-emerald-400 dark:to-teal-400">
                      Delivered Free
                    </span>
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 mt-4 text-lg font-medium max-w-lg">
                    Weekly recipes, seasonal offers & exclusive member perks directly to your inbox.
                  </p>
                </div>

                <div className="flex flex-wrap gap-3">
                  {[
                    { icon: Leaf, text: "Fresh Picks Weekly" },
                    { icon: Truck, text: "Free Delivery Codes" },
                    { icon: Tag, text: "Members-Only Deals" }
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2.5 bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border border-emerald-100 dark:border-slate-700 px-4 py-2.5 rounded-full shadow-sm hover:-translate-y-0.5 transition-transform">
                      <div className="w-7 h-7 bg-emerald-100 dark:bg-emerald-900/50 rounded-full flex items-center justify-center">
                        <item.icon className="text-emerald-600 dark:text-emerald-400" size={16} strokeWidth={2.5} />
                      </div>
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        {item.text}
                      </span>
                    </div>
                  ))}
                </div>

                <form className="pt-2 max-w-xl">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                      <Input
                        id="newsletter-email"
                        placeholder="you@example.com"
                        type="email"
                        required
                        aria-label="Email address for newsletter"
                        className="w-full h-14 pl-6 pr-4 bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 rounded-2xl text-slate-800 dark:text-slate-100 placeholder:text-slate-400 focus-visible:ring-emerald-500/20 focus-visible:border-emerald-500 text-base shadow-sm transition-all"
                      />
                    </div>
                    <Button
                      className="group h-14 flex items-center justify-center gap-2 px-8 rounded-2xl font-bold text-base transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 bg-linear-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-500 text-white hover:scale-[1.02] active:scale-95">
                      Subscribe
                      <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-4 pl-2 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-amber-400 fill-amber-400" />
                    Unsubscribe anytime. No spam, ever.
                  </p>
                </form>
              </div>

              <div className="lg:col-span-2 lg:border-l border-emerald-100 dark:border-slate-800 lg:pl-8 mt-8 lg:mt-0">
                <div className="h-full flex flex-col justify-center">
                  
                  <div className="bg-slate-900 dark:bg-slate-950 rounded-3xl p-8 text-white relative overflow-hidden border border-slate-800 shadow-2xl transition-transform hover:-translate-y-1 duration-500">
                    
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/20 rounded-full blur-2xl pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl pointer-events-none" />
                    
                    <div className="relative z-10 space-y-6">
                      <div className="inline-block bg-emerald-500/20 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-full border border-emerald-500/30 backdrop-blur-sm">
                        MOBILE APP
                      </div>
                      
                      <div>
                        <h3 className="text-2xl font-black leading-tight mb-2">
                          Shop Faster on Our App
                        </h3>
                        <p className="text-slate-400 text-sm leading-relaxed font-medium">
                          Get app-exclusive deals & 15% off your first order when you download.
                        </p>
                      </div>

                      <div className="flex flex-col gap-3 pt-2">
                        <Link
                          href="#"
                          className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                        >
                          <Smartphone size={24} className="text-slate-300 group-hover:text-white transition-colors" />
                          <div className="text-left flex-1">
                            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                              Download on the
                            </div>
                            <div className="text-sm font-bold text-slate-100 mt-0.5">
                              App Store
                            </div>
                          </div>
                          <Download size={18} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                        </Link>

                        <Link
                          href="#"
                          className="group flex items-center gap-4 bg-white/5 hover:bg-white/10 backdrop-blur-md border border-white/10 px-5 py-3.5 rounded-2xl transition-all duration-300 hover:scale-[1.02] active:scale-95"
                        >
                          <div className="w-6 flex justify-center">
                             <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-300 group-hover:text-white transition-colors">
                                <path d="M4 2.5v19l16-9.5-16-9.5z"/>
                             </svg>
                          </div>
                          <div className="text-left flex-1">
                            <div className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">
                              Get it on
                            </div>
                            <div className="text-sm font-bold text-slate-100 mt-0.5">
                              Google Play
                            </div>
                          </div>
                          <Download size={18} className="text-slate-500 group-hover:text-emerald-400 transition-colors" />
                        </Link>
                      </div>

                      <div className="flex items-center gap-2 pt-2 text-sm">
                        <div className="flex text-amber-400">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} size={14} className="fill-amber-400" />
                          ))}
                        </div>
                        <span className="text-slate-400 font-medium">
                          4.9 • 100K+ downloads
                        </span>
                      </div>
                    </div>
                  </div>
                  
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}