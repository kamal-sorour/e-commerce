import { getToken } from "next-auth/jwt";
import { NextResponse, type NextRequest } from "next/server";
import type { JWT } from "next-auth/jwt";

const ROUTES = {
  protected: ["/cart", "/wishlist", "/checkout", "/profile", "/orders"],
  auth: ["/signin", "/signup"],
};

const isRouteMatch = (pathname: string, routes: string[]) =>
  routes.some((route) => pathname.startsWith(route));

const isTokenValid = (token: JWT | null) => !!token;

const buildSignInUrl = (req: NextRequest, callbackPath: string) => {
  const url = new URL("/signin", req.url);
  url.searchParams.set("callbackUrl", callbackPath);
  return url;
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const isProtectedRoute = isRouteMatch(pathname, ROUTES.protected);
  const isAuthRoute = isRouteMatch(pathname, ROUTES.auth);

  if (isProtectedRoute && !isTokenValid(token)) {
    return NextResponse.redirect(buildSignInUrl(req, pathname));
  }

  if (isAuthRoute && isTokenValid(token)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cart", "/wishlist", "/checkout", "/orders", "/signin", "/signup"],
};