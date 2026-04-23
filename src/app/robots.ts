import { MetadataRoute } from "next";

const BASE_URL =
  process.env.NEXTAUTH_URL?.replace(/\/$/, "") ||
  "https://yassify.netlify.app";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/api/",
          "/cart",
          "/wishlist",
          "/checkout",
          "/allorders",
          "/profile",
          "/settings",
          "/signin",
          "/signup",
        ],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [
          "/api/",
          "/cart",
          "/wishlist",
          "/checkout",
          "/allorders",
          "/profile",
          "/settings",
        ],
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
