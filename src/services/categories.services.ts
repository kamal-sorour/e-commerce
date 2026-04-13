import { CategoryType } from "@/types/categories";
import { fetchApi } from "./api";

// Get all categories
export async function getAllCategories(): Promise<CategoryType[]> {
  try {
    const res = await fetchApi(`/categories`, {
      next: {
        revalidate: 60,
        tags: ['categories'],
      },
    });

    if (!res.ok) {
      console.error('Error fetching categories:', res);
      throw new Error(`Failed to fetch categories: ${res.status}`);
    }

    const finalRes = await res.json();
    console.log('Fetched categories:', finalRes);

    return finalRes.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}