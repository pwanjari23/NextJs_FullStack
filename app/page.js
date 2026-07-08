import Link from "next/link";

export const metadata = {
  title: "This is Homepage",
  description: "Welcome to our premium products store homepage",
};

export default function Home() {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-radial from-slate-900 via-zinc-950 to-black text-white overflow-hidden px-4">
      {/* Background glowing blobs */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <main className="relative z-10 max-w-2xl text-center flex flex-col items-center gap-8 py-16">
        {/* Badge */}

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white via-zinc-200 to-zinc-500">
          Welcome to the Products Store
        </h1>

        {/* Description */}
        <p className="text-zinc-400 text-lg sm:text-xl max-w-lg leading-relaxed font-light">
          Discover a curated ecosystem of premium goods, crafted to perfection and tailored to elevate your daily experience.
        </p>

        {/* Call to Action */}
        <div className="mt-4">
          <Link
            href="/products"
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]"
          >
            {/* Hover reflection effect */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            
            <span>Browse Products</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              />
            </svg>
          </Link>
        </div>
      </main>
    </div>
  );
}
