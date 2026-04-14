// types/products.ts

import { SubCategory } from "./categories";


export interface Category {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface Brand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface ProductType {
  id: string;
  _id: string;
  title: string;
  slug: string;
  description: string;
  price: number;
  quantity: number;
  sold: number;
  images: string[];
  imageCover: string;
  category: Category;
  subcategory: SubCategory[];
  brand: Brand;
  ratingsQuantity: number;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  priceAfterDiscount?: number; 
}

export interface ProductsResponse {
  results: number;
  metadata: {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    nextPage?: number;
    prevPage?: number;
  };
  data: ProductType[];
}

export interface ProductQueryParams {
  limit?: number;
  page?: number;
  sort?: string;
  fields?: string;
  keyword?: string;
  brand?: string;
  "category[in]"?: string;
  "price[gte]"?: number;
  "price[lte]"?: number;
}