import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Products Store",
  description: "A premium store experience built with Next.js and Tailwind CSS",
};

export default async function RootLayout({ children }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = await decrypt(token);

  // Server Action inside layout to handle header logout
  async function logoutAction() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
  }

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-950 text-white selection:bg-purple-500 selection:text-white">
        
        {/* Global Header */}
        <header className="border-b border-zinc-900 bg-zinc-950/80 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Products Store Logo"
              className="w-8 h-8 rounded-lg object-cover border border-zinc-800 group-hover:border-purple-500/50 transition-colors"
            />
            <span className="text-lg font-bold tracking-wider hover:text-purple-400 transition-colors group-hover:text-purple-400">
              PRODUCTS STORE
            </span>
          </Link>
          
          <nav className="flex items-center gap-6">
            <Link href="/" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Home
            </Link>
            <Link href="/products" className="text-sm text-zinc-400 hover:text-white transition-colors">
              Products
            </Link>
            
            {user ? (
              <>
                <Link href="/dashboard" className="text-sm text-zinc-400 hover:text-white transition-colors">
                  Dashboard
                </Link>
                <form action={logoutAction} className="inline-flex">
                  <button
                    type="submit"
                    className="text-sm text-red-500 hover:text-red-400 transition-colors cursor-pointer bg-transparent border-0 p-0 font-medium"
                  >
                    Logout
                  </button>
                </form>
              </>
            ) : (
              <Link href="/login" className="text-sm text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                Login
              </Link>
            )}
          </nav>
        </header>

        {/* Dynamic Page Content */}
        <main className="flex-grow flex flex-col relative">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="w-full text-center py-6 text-xs text-zinc-600 border-t border-zinc-900/60 font-mono tracking-widest uppercase bg-zinc-950">
          © 2026 products store corp. all rights reserved.
        </footer>
      </body>
    </html>
  );
}
