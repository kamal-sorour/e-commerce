import { ProductType } from '@/types/products';
import ProductCard from '../ProductCard/ProductCard';
import { getAllProducts } from '@/services/products.services';
import TopTitles from '../TopTitles/TopTitles';


export default async function HomeProducts() {
  
  const response = await getAllProducts({page: 1, sort: '-createdAt'});
  const products: ProductType[] = response?.data || [];

  if (products.length === 0) {
    return (
      <div className="w-full py-10 flex justify-center items-center text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (<div className="p-16 bg-slate-50/50 dark:bg-slate-950/50 transition-colors duration-500">
     <TopTitles
          title="Featured Products"
          sub="Products"
          sideTitle="View All Products"
          href="/products"
          key="products"
          />
    <div className="w-full flex justify-center">
        
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 w-full">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </div>
    </div>
  );
}