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

  // Protect the dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  // Redirect logged-in users trying to access login page to dashboard
  if (pathname === "/login") {
    if (token) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
