import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";

// ================== ROUTES CONFIG ==================
const ROUTES = {
  protected: [
    "/cart",
    "/wishlist",
    "/checkout",
    "/profile",
    "/orders",
    "/profile/settings",
  ],
  auth: ["/signin", "/signup"],
};

const isRouteMatch = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname.startsWith(route));

const isTokenValid = (token: any) =>
  token && token.error !== "TokenExpired";

const buildsigninUrl = (req: NextRequest, callbackPath: string) => {
  const url = new URL("/signin", req.url);
  url.searchParams.set("callbackUrl", callbackPath);
  return url;
};

export async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: "next-auth.session-token",
  });

  const isProtectedRoute = isRouteMatch(pathname, ROUTES.protected);
  const isAuthRoute = isRouteMatch(pathname, ROUTES.auth);

  // 🚫 Block unauthenticated users from protected routes
  if (isProtectedRoute && !isTokenValid(token)) {
    return NextResponse.redirect(buildsigninUrl(req, pathname));
  }

  // 🔄 Prevent logged-in users from visiting auth pages
  if (isAuthRoute && isTokenValid(token)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/wishlist",
    "/checkout",
    "/profile/:path*",
    "/settings",
    "/signin",
    "/signup",
  ],
};