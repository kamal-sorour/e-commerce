"use client";

import { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductType } from "@/types/products";
import { ReviewType } from "@/types/reviews"; // تأكد من مسار الاستيراد الصحيح
import { getReviewsByProductId } from "@/services/reviews.services";

import { 
  Box, CheckCircle2, RefreshCcw, Shield, Star, 
  Truck, MessageSquare, UserCircle2, Lock, Calendar
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface ProductTabsProps {
  productInfo: ProductType;
}

// ============================================================================
// 1. المكون الداخلي الخاص بالمراجعات (يُعالج جلب البيانات والتصفح محلياً)
// ============================================================================
// ============================================================================
// 1. المكون الداخلي الخاص بالمراجعات (تم التعديل ليدعم Client-Side Pagination)
// ============================================================================
function ProductReviewsTab({ productId, productInfo }: { productId: string, productInfo: ProductType }) {
  const [allReviews, setAllReviews] = useState<ReviewType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  
  // حدد عدد المراجعات في كل صفحة (مثلاً 4)
  const REVIEWS_PER_PAGE = 4;

  // جلب كل المراجعات مرة واحدة
  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoading(true);
      try {
        // استدعاء الدالة بدون الـ currentPage
        const res = await getReviewsByProductId(productId);
        
        // التأكد من استخراج المصفوفة بشكل صحيح سواء كانت في res.data أو res مباشرة
        const fetchedReviews = Array.isArray(res?.data) ? res.data : (Array.isArray(res) ? res : []);
        setAllReviews(fetchedReviews);
      } catch (error) {
        console.error("Failed to fetch reviews", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviews();
  }, [productId]);

  // حسابات الـ Client-Side Pagination
  const totalPages = Math.ceil(allReviews.length / REVIEWS_PER_PAGE) || 1;
  const currentReviews = allReviews.slice(
    (currentPage - 1) * REVIEWS_PER_PAGE,
    currentPage * REVIEWS_PER_PAGE
  );

  // حساب نسب النجوم بناءً على كل المراجعات
  const distribution = [5, 4, 3, 2, 1].map((star) => {
    const count = allReviews.filter((r) => Math.round(r.rating) === star).length;
    const percent = allReviews.length > 0 ? Math.round((count / allReviews.length) * 100) : 0;
    return { star, percent };
  });

  return (
    <div className="flex flex-col lg:flex-row gap-12 items-start max-w-6xl mx-auto">
      
      {/* الجزء الأيسر: الإحصائيات وإضافة مراجعة */}
      <div className="w-full lg:w-1/3 space-y-8 lg:sticky lg:top-8">
        
        {/* إحصائيات التقييم */}
        <div className="bg-slate-50 dark:bg-slate-950/50 p-8 rounded-3xl border border-slate-100 dark:border-slate-800 text-center">
          <div className="text-7xl font-black text-slate-900 dark:text-slate-50 mb-2">
            {productInfo.ratingsAverage?.toFixed(1) || "0.0"}
          </div>
          <div className="flex justify-center gap-1 mb-3">
            {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                size={22} 
                className={i < Math.round(productInfo.ratingsAverage || 0) ? "fill-amber-400 text-amber-400" : "text-slate-300 dark:text-slate-700"} 
              />
            ))}
          </div>
          <p className="text-slate-500 dark:text-slate-400 font-medium text-sm mb-6">
            Based on {allReviews.length} verified reviews
          </p>

          <div className="space-y-3 w-full">
            {distribution.map((item) => (
              <div key={item.star} className="flex items-center gap-3">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300 w-10 flex items-center gap-1">
                  {item.star} <Star size={12} className="fill-slate-700 dark:fill-slate-300" />
                </span>
                <div className="flex-1 h-2.5 bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-amber-400 rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${item.percent}%` }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-500 dark:text-slate-400 w-8 text-right">
                  {item.percent}%
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* فورم كتابة المراجعة (Disabled State) */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm relative overflow-hidden group">
          <div className="absolute inset-0 bg-slate-50/60 dark:bg-slate-950/60 backdrop-blur-[2px] z-10 flex flex-col items-center justify-center transition-opacity duration-300">
             <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-xl flex flex-col items-center text-center max-w-50 border border-slate-100 dark:border-slate-700">
                <Lock className="text-slate-400 mb-2" size={24} />
                <p className="text-sm font-bold text-slate-900 dark:text-slate-100">Login Required</p>
                <p className="text-xs text-slate-500 mt-1">Please log in to share your thoughts.</p>
             </div>
          </div>
          
          <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-4 flex items-center gap-2">
            <MessageSquare size={18} className="text-emerald-500" /> Write a Review
          </h4>
          <div className="flex gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star key={star} size={24} className="text-slate-200 dark:text-slate-700" />
            ))}
          </div>
          <Textarea 
            placeholder="What do you think about this product?" 
            className="resize-none mb-4 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800"
            rows={4}
            disabled
          />
          <Button disabled className="w-full bg-emerald-600 text-white rounded-xl h-12">
            Submit Review
          </Button>
        </div>
      </div>

      {/* الجزء الأيمن: عرض المراجعات */}
      <div className="flex-1 w-full space-y-4">
        {isLoading ? (
          // Skeleton Loader
          [1, 2, 3].map((n) => (
            <div key={n} className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-800 animate-pulse">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/4" />
                  <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-1/6" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-full" />
                <div className="h-3 bg-slate-200 dark:bg-slate-800 rounded w-5/6" />
              </div>
            </div>
          ))
        ) : allReviews.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-20 px-4 text-center bg-slate-50 dark:bg-slate-900/30 rounded-3xl border border-slate-100 dark:border-slate-800 border-dashed">
            <Star size={48} className="text-slate-300 dark:text-slate-700 mb-4" strokeWidth={1.5} />
            <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">No reviews yet</h3>
            <p className="text-slate-500 dark:text-slate-400 max-w-sm">
              Be the first to share your experience with this product after purchasing!
            </p>
          </div>
        ) : (
          // Review List (عرض المراجعات المقطوعة للصفحة الحالية فقط)
          <>
            {currentReviews.map((review) => (
              <div key={review._id} className="p-6 md:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4 items-center">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-emerald-400 to-teal-600 flex items-center justify-center text-white font-bold text-lg shadow-inner">
                      {review.user?.name?.charAt(0)?.toUpperCase() || <UserCircle2 />}
                    </div>
                    <div>
                      <h4 className="font-bold text-slate-900 dark:text-slate-100">{review.user?.name || "Verified Buyer"}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              size={14} 
                              className={i < Math.round(review.rating) ? "fill-amber-400 text-amber-400" : "text-slate-200 dark:text-slate-700"} 
                            />
                          ))}
                        </div>
                        <span className="text-xs font-medium text-slate-400 flex items-center gap-1">
                          <Calendar size={12} />
                          {new Date(review.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                  {review.review}
                </p>
              </div>
            ))}

            {/* Local Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex justify-center gap-2 pt-6">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={cn(
                      "w-10 h-10 rounded-xl font-bold transition-all",
                      currentPage === i + 1 
                        ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/20" 
                        : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-emerald-50 dark:hover:bg-emerald-900/30 hover:text-emerald-600 dark:hover:text-emerald-400"
                    )}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// 2. المكون الأساسي للتبويبات (Product Tabs)
// ============================================================================
export default function ProductTabs({ productInfo }: ProductTabsProps) {
  return (
    <section className="py-8">
      <div className="bg-white dark:bg-slate-900 rounded-[2rem] shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden transition-colors">
        
        <Tabs defaultValue="details" className="w-full">
          {/* تصميم الـ Tabs (Modern Pill Design) */}
          <div className="px-4 md:px-8 pt-6 pb-4 border-b border-slate-100 dark:border-slate-800 overflow-x-auto custom-scrollbar">
            <TabsList className="bg-slate-100 dark:bg-slate-950 p-1.5 rounded-2xl h-auto flex w-max min-w-full md:min-w-fit">
              <TabsTrigger value="details" className="flex-1 py-3 px-6 rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all text-sm md:text-base gap-2">
                <Box size={18} /> Product Details
              </TabsTrigger>
              <TabsTrigger value="reviews" className="flex-1 py-3 px-6 rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all text-sm md:text-base gap-2">
                <Star size={18} /> Reviews <span className="bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-full text-xs ml-1">{productInfo.ratingsQuantity}</span>
              </TabsTrigger>
              <TabsTrigger value="shipping" className="flex-1 py-3 px-6 rounded-xl font-bold data-[state=active]:bg-white dark:data-[state=active]:bg-slate-800 data-[state=active]:text-emerald-600 dark:data-[state=active]:text-emerald-400 data-[state=active]:shadow-sm transition-all text-sm md:text-base gap-2">
                <Truck size={18} /> Shipping & Returns
              </TabsTrigger>
            </TabsList>
          </div>

          {/* محتوى التفاصيل */}
          <TabsContent value="details" className="p-6 md:p-10 animate-in fade-in duration-500 outline-none">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <h3 className="text-2xl font-black text-slate-900 dark:text-slate-50 flex items-center gap-2">
                  <Box className="text-emerald-500" /> About this Product
                </h3>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-lg">
                  {productInfo.description}
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-lg">Specifications</h4>
                  <ul className="space-y-4">
                    <li className="flex justify-between items-center text-sm border-b border-slate-200 dark:border-slate-800 pb-3">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Category</span>
                      <span className="text-slate-900 dark:text-slate-100 font-bold bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700">{productInfo.category?.name}</span>
                    </li>
                    <li className="flex justify-between items-center text-sm border-b border-slate-200 dark:border-slate-800 pb-3">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Brand</span>
                      <span className="text-slate-900 dark:text-slate-100 font-bold bg-white dark:bg-slate-800 px-3 py-1 rounded-lg border border-slate-100 dark:border-slate-700">{productInfo.brand?.name}</span>
                    </li>
                    <li className="flex justify-between items-center text-sm">
                      <span className="text-slate-500 dark:text-slate-400 font-medium">Items Sold</span>
                      <span className="text-slate-900 dark:text-slate-100 font-bold">{productInfo.sold} Units</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-6 border border-slate-100 dark:border-slate-800">
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-5 text-lg">Key Features</h4>
                  <ul className="space-y-4">
                    {["Premium Quality Product", "100% Authentic Guarantee", "Fast & Secure Packaging", "Quality Tested"].map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm text-slate-700 dark:text-slate-300 font-medium">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-900/50 flex items-center justify-center shrink-0">
                          <CheckCircle2 className="text-emerald-600 dark:text-emerald-400" size={14} />
                        </div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          {/* محتوى المراجعات */}
          <TabsContent value="reviews" className="p-6 md:p-10 animate-in fade-in duration-500 outline-none">
             <ProductReviewsTab productId={productInfo.id || productInfo._id} productInfo={productInfo} />
          </TabsContent>

          {/* محتوى الشحن */}
          <TabsContent value="shipping" className="p-6 md:p-10 animate-in fade-in duration-500 outline-none">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                  <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
                    <Truck size={32} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-xl">Shipping Info</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">Free standard shipping on orders over $50. Express delivery (1-2 days) available at checkout.</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                  <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
                    <RefreshCcw size={32} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-xl">Easy Returns</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">30-day hassle-free returns. Full refund or exchange available via our automated return portal.</p>
                </div>

                <div className="bg-slate-50 dark:bg-slate-950 rounded-3xl p-8 border border-slate-100 dark:border-slate-800 text-center flex flex-col items-center hover:-translate-y-1 transition-transform">
                  <div className="h-20 w-20 bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 rounded-full flex items-center justify-center mb-6 ring-8 ring-emerald-50 dark:ring-emerald-950/30">
                    <Shield size={32} />
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-3 text-xl">Buyer Protection</h4>
                  <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-relaxed">Get a full refund if your order doesn&apos;t arrive or isn&apos;t as described. 100% secure checkout.</p>
                </div>
             </div>
          </TabsContent>

        </Tabs>
      </div>
    </section>
  );
}