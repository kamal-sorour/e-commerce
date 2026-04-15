"use server"

import { revalidatePath } from 'next/cache';
import { fetchApi } from '@/services/api';
import { getToken } from '@/utils/realtoken';

export const getWishlistItems = async () => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "You must be logged in to view the wishlist" };
    }
    const responseData = await fetchApi(`/api/v1/wishlist`, {
      method: 'GET',
      headers: {
        token: `${token}`,
      },
    });
    
    return responseData;

  } catch (error: any) {
    console.error('Get wishlist items error:', error);
    return { success: false, message: error.message || "An error occurred", data: null };
  }
};  

export const addToWishlist = async (productId: string) => {
  try {
    const token = await getToken();

    if (!token) {
      return { success: false, message: "You must be logged in to add products to the wishlist" };
    }
    const responseData = await fetchApi(`/api/v1/wishlist`, {
      method: 'POST',
      headers: {
        token: `${token}`,
      },
      body: JSON.stringify({ productId }),
    });
    console.log('Add to wishlist response:', responseData);
    revalidatePath('/wishlist');
    return { success: true, message: "Added to wishlist successfully" };

  } catch (error: any) {
    console.error('Add to wishlist error:', error);
    return { success: false, message: error.message || "An error occurred" };
  }
};

export const removeFromWishlist = async (productId: string) => {
  try {
    const token = await getToken();
    if (!token) {
      return { success: false, message: "You must be logged in to remove products from the wishlist" };
    } 
    const responseData = await fetchApi(`/api/v1/wishlist/${productId}`, {
      method: 'DELETE',
      headers: {
        token: `${token}`,
      },
    });
    console.log('Remove from wishlist response:', responseData);
    revalidatePath('/wishlist');
    return { success: true, message: "Removed from wishlist successfully" };

  } catch (error: any) {
    console.error('Remove from wishlist error:', error);
    return { success: false, message: error.message || "An error occurred" }; 
  }
};