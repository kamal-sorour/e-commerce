import { ProductType } from "./products";

export interface WishlistResponse {
  data: {
    status: string;
    count: number;
    data: ProductType[];
  };
}

export interface WishlistActionResponse {
  success: boolean;
  message: string;
  data?: string[];
}
