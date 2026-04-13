import { CategoryType } from "@/types/categories";
import { fetchApi } from "./api";

export async function getAllCategories(): Promise<CategoryType[]> {
  try {
    const res = await fetchApi(`/api/v1/categories`, {
      method: 'GET',
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