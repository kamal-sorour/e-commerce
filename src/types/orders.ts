import { ProductType } from "./products";

export interface OrderCartItem {
  count: number;
  _id: string;
  price: number;
  product: ProductType;
}

export interface ShippingAddress {
  details: string;
  city: string;
  postalCode: string;
  phone: string;
}

export interface OrderType {
  id: number;
  _id: string;
  user: string;
  cartItems: OrderCartItem[];
  shippingAddress: ShippingAddress;
  taxPrice: number;
  shippingPrice: number;
  totalOrderPrice: number;
  paymentMethodType: "cash" | "card";
  isPaid: boolean;
  isDelivered: boolean;
  paidAt?: string;
  deliveredAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderFormValues {
  details: string;
  city: string;
  postalCode: string;
  phone: string;
  paymentMethod: "cash" | "card";
}

export interface CreateOrderResponse {
  status: boolean;
  session?: {
    url: string;
  };
  message?: string;
  error?: {
    message: string;
  };
}

export interface GetOrdersResponse {
  status: boolean;
  message?: string;
  [key: number]: OrderType;
}
