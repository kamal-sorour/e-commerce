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

export interface CartResponseData {
  status?: string;
  numOfCartItems?: number;
  cartId?: string;
  data?: CartData;
  success?: boolean;
  message?: string;
}

export interface CartResponse {
  data: CartResponseData;
}

export interface CartActionResponse {
  success: boolean;
  message: string;
  numOfCartItems?: number;
}