import Link from "next/link";

export default function ProductsPage() {
  // Generate products 1 to 10
  const products = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Premium Product ${i + 1}`,
    description: `High-quality, meticulously engineered asset designed for optimal functionality and elegant aesthetics.`,
    price: `$${( (i + 1) * 49.99 ).toFixed(2)}`,
  }));

  return (
    <div className="pb-24">
      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 pt-16">
        {/* Page Header */}
        <div className="mb-12 max-w-2xl">
          <span className="text-xs uppercase tracking-widest text-purple-500 font-semibold">Catalog</span>
          <h1 className="text-4xl font-extrabold mt-2 mb-4 bg-gradient-to-r from-white to-zinc-500 bg-clip-text text-transparent">
            Our Curated Collection
          </h1>
          <p className="text-zinc-400 text-sm leading-relaxed">
            Welcome to the products catalog. Browse through our premium selections below. Click on any item to view detailed specifications, real-time metrics, and custom options.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative flex flex-col justify-between p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl transition-all duration-300 hover:bg-zinc-900/60 hover:border-zinc-800 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.05)] overflow-hidden"
            >
              {/* Card top border glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Visual indicator / thumbnail placeholder */}
                <div className="w-full aspect-square mb-4 rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-700 font-mono text-xs group-hover:text-purple-400 group-hover:border-purple-950 transition-colors">
                  ID: 0{product.id}
                </div>

                {/* Product Name */}
                <h3 className="font-semibold text-lg text-zinc-100 group-hover:text-white transition-colors mb-2">
                  {product.name}
                </h3>

                {/* Product Description */}
                <p className="text-xs text-zinc-500 line-clamp-3 mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-zinc-900">
                <span className="text-sm font-semibold text-purple-400">{product.price}</span>
                <span className="text-xs text-zinc-400 group-hover:text-white transition-colors flex items-center gap-0.5">
                  View Specs
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                    className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}
