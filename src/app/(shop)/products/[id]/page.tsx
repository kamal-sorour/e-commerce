import ProductBreadcrumbs from "@/components/shared/ProductBreadcrumbs/ProductBreadcrumbs";
import ProductGallery from "@/components/shared/ProductGallery/ProductGallery";
import ProductOverview from "@/components/shared/ProductOverview/ProductOverview";
import ProductTabs from "@/components/shared/ProductTabs/ProductTabs";
import RelatedProducts from "@/components/shared/RelatedProducts/RelatedProducts";

import { getProductById, getProducts } from "@/services/products.services";

interface ProductDetailsPageProps {
  params: Promise<{ id: string }>; 
}

export default async function ProductDetailsPage( props : ProductDetailsPageProps) {
  
  const { id } = await props.params; 
//   console.log('Product ID from params:', id);
  
  const [productRes, relatedProductsRes] = await Promise.all([
    getProductById(id), 
    getProducts({ limit: 10 }),
  ]);

  

  const productItem = productRes || null; 

  const relatedProducts = relatedProductsRes?.data || [];

  if (!productItem) {
    return <div className="min-h-screen flex items-center justify-center text-xl font-bold">Product not found.</div>;
  }

  return (
    <main className="min-h-screen bg-slate-50 dark:bg-slate-950 transition-colors duration-500 pb-12">
      <ProductBreadcrumbs product={productItem} />
      
      <section className="pt-8 pb-4">
        <div className="container mx-auto px-4">
          
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
            <div className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 h-max">
              <ProductGallery images={productItem.images} />
            </div>
            <div className="lg:col-span-7 xl:col-span-8">
              <ProductOverview prod={productItem} />
            </div>
          </div>

          
          <ProductTabs productInfo={productItem} />
          
        </div>
      </section>

      
      <RelatedProducts productsSlider={relatedProducts} />
    </main>
  );
}