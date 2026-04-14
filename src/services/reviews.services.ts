import { ReviewsResponse, ReviewType } from "@/types/reviews";
import { fetchApi } from "./api";

export async function getReviewsByProductId(productId: string): Promise<ReviewType[]> {
  try {
    const res = await fetchApi(`/api/v1/products/${productId}/reviews`, {
      method: "GET",
    });

    return res.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    return [];
    }
}

