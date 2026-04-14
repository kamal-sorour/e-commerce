import { BrandType } from "@/types/brands";
import { fetchApi } from "./api";

export async function getAllBrands(): Promise<BrandType[]> {
  try {
    const res = await fetchApi(`/api/v1/brands`, {
      method: 'GET',
      next: {
        revalidate: 60,
        tags: ['brands'],
      },
    });

    // console.log('Fetched brands:', res);

    return res.data.data;
  } catch (error) {
    console.error('Error fetching brands:', error);
    return [];
  }
}