

import { ProductQueryParams, ProductsResponse, ProductType } from "@/types/products";
import { fetchApi } from "./api";

export async function getProducts(params?: ProductQueryParams): Promise<ProductsResponse | null> {
  try {
    let queryString = "";

    if (params) {
      const searchParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.append(key, String(value));
        }
      });

      const qs = searchParams.toString();
      if (qs) {
        queryString = `?${qs}`;
      }
    }

    const res = await fetchApi(`/api/v1/products${queryString}`, {
      next: {
        revalidate: 60, 
        tags: ['products'],
      },
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    return null;
  }
}

export async function getProductById(id: string): Promise<ProductType | null> {
  try {
    const res = await fetchApi(`/api/v1/products/${id}`, {
      method: "GET",
    });

    // console.log('Fetched product by ID:', res);

    return res.data.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    return null;
  }
}