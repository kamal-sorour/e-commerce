"use server"
import { fetchApi } from "@/services/api";
import { signUpFormDataType } from "@/types/auth";

export const signUp = async (formData: signUpFormDataType) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signup`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      }
    );
    const data = await res.json();
    console.log('signUp response:', data);

    return data.data;
  } catch (error) {
    console.error('signUp error:', error);
    throw error;
  }
}