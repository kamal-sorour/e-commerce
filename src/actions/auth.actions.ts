"use server"
import { fetchApi } from "@/services/api";
import { signUpFormDataType } from "@/types/auth";

export const signUp = async (formData: signUpFormDataType) => {
  try {
    const res = await fetchApi(
      `/api/v1/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
    );
    // console.log('signUp response:', data);

    return res.data;
  } catch (error) {
    console.error('signUp error:', error);
    throw error;
  }
}