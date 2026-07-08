import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const SECRET = process.env.NEXTAUTH_SECRET || "fallback_secret_for_nextauth_development_32_chars_long";

/**
 * Next.js 16 Proxy function (replacing deprecated middleware)
 * Uses NextAuth getToken to inspect JWT session token.
 * @param {Request} request 
 */
export async function proxy(request) {
  const token = await getToken({
    req: request,
    secret: SECRET,
  });
  const { pathname } = request.nextUrl;

  // Protect the dashboard and products routes
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/products")) {
    if (!token) {
      const url = new URL("/login", request.url);
      url.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(url);
    }
  }

  // Redirect logged-in users trying to access login page to products
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: ["/dashboard/:path*", "/products/:path*", "/login"],
};
