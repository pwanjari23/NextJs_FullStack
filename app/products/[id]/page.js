import Link from "next/link";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  return (
    <div className="relative flex-grow flex flex-col justify-center py-16 overflow-hidden">
      {/* Background glowing blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 relative z-10">
        
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 uppercase tracking-wider">
          <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-purple-400 transition-colors">Products</Link>
          <span>/</span>
          <span className="text-zinc-300">ID: {id}</span>
        </div>

        {/* Framed static message */}
        <div className="relative group max-w-lg w-full">
          {/* External animated glowing border shadow */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
          
          <div className="relative bg-zinc-900/80 border border-zinc-800/80 rounded-3xl p-10 md:p-12 text-center shadow-2xl backdrop-blur-xl">
            {/* Top Indicator */}
            <div className="mx-auto w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-purple-400 font-bold text-lg mb-6">
              {id}
            </div>

            {/* Framed static message text */}
            <h2 className="text-2xl font-bold tracking-tight text-white mb-4">
              Product {id} Details Page
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-6 font-light">
              Product <span className="font-mono text-purple-400 font-semibold bg-purple-500/5 px-1.5 py-0.5 rounded border border-purple-500/10">{id}</span> details page — content coming soon!
            </p>

            {/* Simulated Action / Coming Soon info */}
            
          </div>
        </div>

        {/* Explore more options */}
        <div className="mt-8 flex gap-4">
          <Link
            href="/products"
            className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
          >
            Browse Other Products
          </Link>
        </div>
      </main>
    </div>
  );
}
