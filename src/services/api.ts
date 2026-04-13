const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://ecommerce.routemisr.com';

export const fetchApi = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${BASE_URL}${endpoint}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });

  let data;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(data?.message || 'حدث خطأ أثناء جلب البيانات');
  }

  return {
    data,
    status: response.status,
  };
};