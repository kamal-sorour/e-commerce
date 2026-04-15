"use server"

import { revalidatePath } from 'next/cache';
import { fetchApi } from '@/services/api';
import { getToken } from '@/utils/realtoken';
import { getErrorMessage } from '@/types/api';
import { CartActionResponse } from '@/types/cart';

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

  } catch (error: unknown) {
    console.error('Get cart items error:', error);
    return { success: false, message: getErrorMessage(error), data: null };
  }
};  

export const addToCart = async (productId: string): Promise<CartActionResponse> => {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, message: "You must be logged in to add products to the cart" };
    }
    await fetchApi(`/api/v2/cart`, {
      method: 'POST',
      headers: {
        token: `${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    revalidatePath('/cart');
    return { success: true, message: "Added to cart successfully" };

  } catch (error: unknown) {
    console.error('Add to cart error:', error);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const updateProductQuantity = async (productId: string, quantity: number): Promise<CartActionResponse> => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "You must be logged in to update cart items" };
    }
    await fetchApi(`/api/v2/cart/${productId}`, {
      method: 'PUT',
      headers: {
        token: `${token}`,
      },
      body: JSON.stringify({ count: quantity }),
    });
    revalidatePath('/cart');
    return { success: true, message: "Cart updated successfully" };

  } catch (error: unknown) {
    console.error('Update cart item error:', error);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const removeCartProduct = async (productId: string): Promise<CartActionResponse> => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "You must be logged in to remove cart items" };
    }
    await fetchApi(`/api/v2/cart/${productId}`, {
      method: 'DELETE',
      headers: {
        token: `${token}`,
      },
    });
    revalidatePath('/cart');
    return { success: true, message: "Product removed from cart" };

  } catch (error: unknown) {
    console.error('Remove cart item error:', error);
    return { success: false, message: getErrorMessage(error) };
  }
};

export const clearUserCart = async (): Promise<CartActionResponse> => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "You must be logged in to clear the cart" };
    }
    await fetchApi(`/api/v2/cart`, {
      method: 'DELETE',
      headers: {
        token: `${token}`,
      },
    });
    revalidatePath('/cart');
    return { success: true, message: "Cart cleared successfully", numOfCartItems: 0 };

  } catch (error: unknown) {
    console.error('Clear cart error:', error);
    return { success: false, message: getErrorMessage(error) };
  }
};  