import { CategoryType } from "@/types/categories";
import { fetchApi } from "./api";

// Get all categories
export async function getAllCategories(): Promise<CategoryType[]> {
  try {
    const res = await fetchApi(`/api/v1/categories`, {
      next: {
        revalidate: 60,
        tags: ['categories'],
      },
    });

    // console.log('Fetched categories:', res);

    return res.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    return [];
  }
}