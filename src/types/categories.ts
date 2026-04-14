export interface CategoryType {
  name: string;
  _id: string;
  slug: string;
  createdAt: string;
  image: string;
  updatedAt: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}
