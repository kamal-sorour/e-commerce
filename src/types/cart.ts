import { ProductType } from "./products";

export interface CartItem {
  count: number;
  _id: string;
  price: number;
  product: ProductType;
}

export interface CartData {
  _id: string;
  products: CartItem[];
  totalCartPrice: number;
}

export interface CartResponse {
  data: {
 status?: string;
  numOfCartItems?: number;
  cartId?: string;
  data?: CartData;
  success?: boolean;
  message?: string;
  }
}