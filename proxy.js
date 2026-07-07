import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = process.env.JWT_SECRET || "fallback_super_secret_session_key_with_at_least_32_characters_for_hmac";
const KEY = new TextEncoder().encode(SECRET_KEY);

/**
 * Next.js 16 Proxy function (replacing deprecated middleware)
 * @param {Request} request 
 */
export async function proxy(request) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;

  // Protect the dashboard routes
  if (pathname.startsWith("/dashboard")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      await jwtVerify(token, KEY);
      return NextResponse.next();
    } catch (error) {
      console.warn("Invalid token detected in proxy, redirecting to login:", error.message);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  // Redirect logged-in users trying to access login page to dashboard
  if (pathname === "/login") {
    if (token) {
      try {
        await jwtVerify(token, KEY);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (error) {
        // Token is invalid/expired, let them view the login page
      }
    }
  }

  return NextResponse.next();
}

// Config to specify matching paths
export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
