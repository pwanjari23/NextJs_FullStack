import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
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

export default function RootLayout({ children }) {
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
