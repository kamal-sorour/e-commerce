"use server";

import { getUserId, getToken } from "@/utils/realtoken";
import { fetchApi } from "@/services/api";


const buildOrderEndpoint = (cartId: string, paymentMethod: string) => {
  if (paymentMethod === "cash") {
    return `/api/v2/orders/${cartId}`;
}

  return `/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXTAUTH_URL}`;
};

const createOrderRequest = async (
  endpoint: string,
  token: string,
  body: object
) => {
  return fetchApi(endpoint, {
    method: "POST",
    headers: {
      token,
    },
    body: JSON.stringify(body),
  });
};


export async function createOrder(
  cartId: string,
  formValues,
) {
  try {
    const { paymentMethod, ...shippingAddress } = formValues;

    const token = await getToken();
    const endpoint = buildOrderEndpoint(cartId, paymentMethod);

    const { data } = await createOrderRequest(
      endpoint,
      token as string,
      shippingAddress
    );

    console.log("Order creation response:", data);


    return {
      ...data,
      status: true,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message || "Failed to create order",
    };
  }
}


export async function getUserOrders() {
  try {
    const userId = await getUserId();

    const { data } = await fetchApi(
      `/api/v1/orders/user/${userId}`
    );

    return {
      ...data,
      status: true,
    };
  } catch (error: any) {
    return {
      status: false,
      message: error.message || "Failed to fetch orders",
    };
  }
}