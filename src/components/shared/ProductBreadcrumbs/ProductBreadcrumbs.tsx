import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { ProductType } from "@/types/products";

interface ProductBreadcrumbsProps {
  product: ProductType;
}

export default function ProductBreadcrumbs({ product }: ProductBreadcrumbsProps) {
  return (
    <nav className="py-4 border-b border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-950/50 backdrop-blur-md sticky top-0 z-20 transition-colors">
      <div className="container mx-auto px-4">
        <ol className="flex items-center flex-wrap gap-2 text-sm font-medium">
          <li className="flex items-center">
            <Link
              className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors flex items-center gap-1.5"
              href="/"
            >
              <Home size={16} />
              Home
            </Link>
            <ChevronRight size={16} className="text-slate-400 mx-1" />
          </li>
          <li className="flex items-center">
            <Link
              className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
              href={`/categories/${product.category._id}`}
            >
              {product.category.name}
            </Link>
            <ChevronRight size={16} className="text-slate-400 mx-1" />
          </li>
          {product.subcategory?.[0] && (
            <li className="flex items-center">
              <Link
                className="text-slate-500 hover:text-emerald-600 dark:text-slate-400 dark:hover:text-emerald-400 transition-colors"
                href={`/products?subcategory=${product.subcategory[0]._id}`}
              >
                {product.subcategory[0].name}
              </Link>
              <ChevronRight size={16} className="text-slate-400 mx-1" />
            </li>
          )}
          <li className="text-slate-900 dark:text-slate-100 font-bold truncate max-w-50 sm:max-w-xs">
            {product.title}
          </li>
        </ol>
      </div>
    </nav>
  );
}