import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function decodedToken() {
  const cookie = await cookies();
  const token = cookie.get("next-auth.session-token")?.value ?? cookie.get("__Secure-next-auth.session-token")?.value;

  return await decode({ token, secret: process.env.NEXTAUTH_SECRET! });
}

export async function getToken() {
  return (await decodedToken())?.routeToken;
}

export async function getUserId() {
  return (await decodedToken())?.id;
}


