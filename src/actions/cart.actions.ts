"use server"

import { revalidatePath } from 'next/cache';
import { fetchApi } from '@/services/api';
import { getToken } from '@/utils/realtoken';

export const getCartItems = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "You must be logged in to view the cart" };
    }
    const responseData = await fetchApi(`/api/v2/cart`, {
      method: 'GET',
      headers: {
        token: `${token}`,
      },
    });
    
    return responseData;

  } catch (error: any) {
    console.error('Get cart items error:', error);
    return { success: false, message: error.message || "An error occurred", data: null };
  }
};  

export const addToCart = async (productId: string) => {
  try {
    const token = await getToken();
    // console.log('Token in addToCart action:', token);

    if (!token) {
      return { success: false, message: "You must be logged in to add products to the cart" };
    }
    const responseData = await fetchApi(`/api/v2/cart`, {
      method: 'POST',
      headers: {
        token: `${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    // console.log('Add to cart response:', responseData);
    revalidatePath('/cart');
    return { success: true, message: "Added to cart successfully" };

  } catch (error: any) {
    console.error('Add to cart error:', error);
    return { success: false, message: error.message || "An error occurred" };
  }
};

export const updateProductQuantity = async (productId: string, quantity: number) => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "You must be logged in to update cart items" };
    }
    const responseData = await fetchApi(`/api/v2/cart/${productId}`, {
      method: 'PUT',
      headers: {
        token: `${token}`,
      },
      body: JSON.stringify({ count: quantity }),
    });
    revalidatePath('/cart');
    return { success: true, message: "Cart updated successfully" };

  } catch (error: any) {
    console.error('Update cart item error:', error);
    return { success: false, message: error.message || "An error occurred" };
  }
};

export const removeCartProduct = async (productId: string) => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "You must be logged in to remove cart items" };
    }
    const responseData = await fetchApi(`/api/v2/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        token: `${token}`,
      },
    });
    revalidatePath('/cart');
    return { success: true, message: "Product removed from cart" };

  } catch (error: any) {
    console.error('Remove cart item error:', error);
    return { success: false, message: error.message || "An error occurred" };
  }
};

export const clearUserCart = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "You must be logged in to clear the cart" };
    }
    const responseData = await fetchApi(`/api/v2/cart`, {
      method: 'DELETE',
      headers: {
        token: `${token}`,
      },
    });
    revalidatePath('/cart');
    return { success: true, message: "Cart cleared successfully", numOfCartItems: 0 };

  } catch (error: any) {
    console.error('Clear cart error:', error);
    return { success: false, message: error.message || "An error occurred" };
  }
};  