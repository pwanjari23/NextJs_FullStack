"use server";

import { cookies } from "next/headers";
import { encrypt } from "@/lib/auth";
import { redirect } from "next/navigation";

/**
 * Server Action to handle user login.
 * @param {Object} prevState 
 * @param {FormData} formData 
 */
export async function loginAction(prevState, formData) {
  const username = formData.get("username")?.toString().trim();
  const password = formData.get("password")?.toString();

  if (!username || !password) {
    return { error: "Please enter both username and password." };
  }

  // Mock Authentication: admin / password123
  if (username === "admin" && password === "password123") {
    // Session expires in 2 hours
    const expiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000);
    const token = await encrypt({ username, role: "admin", expiresAt });

    // Set HTTP-Only Cookie (using async cookies API for Next.js 15+)
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      expires: expiresAt,
      path: "/",
    });

    // Redirect to dashboard page
    redirect("/dashboard");
  }

  return { error: "Invalid username or password." };
}
