import { MetadataRoute } from "next";
import { getProducts } from "@/services/products.services";
import { getAllCategories } from "@/services/categories.services";
import { getAllBrands } from "@/services/brands.services";

const BASE_URL =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  "https://yassify.netlify.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ── Static pages ──────────────────────────────────────────
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${BASE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/categories`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/brands`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/signin`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/signup`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.3,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.4,
    },
  ];

  // ── Dynamic product pages ─────────────────────────────────
  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const allPages = await Promise.all(
      Array.from({ length: 3 }, (_, i) => getProducts({ page: i + 1, limit: 40 }))
    );

    const allProducts = allPages.flatMap((page) => page?.data || []);

    productRoutes = allProducts.map((product) => ({
      url: `${BASE_URL}/products/${product._id}`,
      lastModified: new Date(product.updatedAt || product.createdAt),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch products", error);
  }

  // ── Dynamic category pages ────────────────────────────────
  let categoryRoutes: MetadataRoute.Sitemap = [];
  try {
    const categories = await getAllCategories();

    categoryRoutes = categories.map((cat) => ({
      url: `${BASE_URL}/categories/${cat._id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch categories", error);
  }

  // ── Dynamic brand product pages ───────────────────────────
  let brandRoutes: MetadataRoute.Sitemap = [];
  try {
    const brands = await getAllBrands();

    brandRoutes = brands.map((brand) => ({
      url: `${BASE_URL}/products?brand=${brand._id}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.5,
    }));
  } catch (error) {
    console.error("Sitemap: Failed to fetch brands", error);
  }

  return [...staticRoutes, ...productRoutes, ...categoryRoutes, ...brandRoutes];
}
