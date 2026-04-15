import { CategoryType, SubCategory } from "@/types/categories";
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

export async function getAllSubCategoriesOnCategory(categoryId: string): Promise<SubCategory[]> {
  try {
    const res = await fetchApi(`/api/v1/categories/${categoryId}/subcategories`, {
      method: 'GET',
      next: {
        revalidate: 60,
        tags: ['subcategories'],
      },
    });


    return res.data.data;
  } catch (error) {
    console.error('Error fetching subcategories:', error);
    return [];
  }
}

export async function getSpecificCategory(categoryId: string): Promise<CategoryType | null> {
  try {
    const res = await fetchApi(`/api/v1/categories/${categoryId}`, {
      method: 'GET',
      next: {
        revalidate: 60,
        tags: ['categories'],
      },
    });

    // console.log('Fetched specific category:', res);

    return res.data.data;
  } catch (error) {
    console.error('Error fetching specific category:', error);
    return null;
  }
}