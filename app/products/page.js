import Link from "next/link";

export default async function ProductsPage() {
  let products = [];
  let errorMsg = null;

  try {
    const res = await fetch("https://dummyjson.com/products", {
      next: { revalidate: 3600 }, // Enable caching with 1-hour revalidation
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch products: ${res.status}`);
    }

    const data = await res.json();
    products = data.products || [];
  } catch (err) {
    console.error(err);
    errorMsg = err.message;
  }

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
            Welcome to the products catalog. Browse through our premium selections below fetched in real-time. Click on any item to view detailed specifications and client reviews.
          </p>
        </div>

        {errorMsg && (
          <div className="p-4 mb-6 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            Failed to load products: {errorMsg}. Please try reloading the page.
          </div>
        )}

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {products.map((product) => (
            <Link
              key={product.id}
              href={`/products/${product.id}`}
              className="group relative flex flex-col justify-between p-5 bg-zinc-900/40 border border-zinc-900 rounded-2xl transition-all duration-300 hover:bg-zinc-900/60 hover:border-zinc-800 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(168,85,247,0.05)] overflow-hidden"
            >
              {/* Card top border glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                {/* Visual indicator / thumbnail placeholder */}
                <div className="w-full aspect-square mb-4 rounded-xl bg-zinc-950 border border-zinc-800 overflow-hidden flex items-center justify-center relative">
                  {/* Product Image */}
                  {product.thumbnail ? (
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      className="object-contain w-full h-full p-2 group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                  ) : (
                    <span className="text-zinc-700 font-mono text-xs">ID: 0{product.id}</span>
                  )}
                  {/* Category Tag */}
                  <span className="absolute top-2 left-2 px-2 py-0.5 text-[9px] font-semibold bg-zinc-900/80 text-purple-400 rounded-full border border-zinc-800 uppercase tracking-wider">
                    {product.category}
                  </span>
                </div>

                {/* Rating & Brand */}
                <div className="flex items-center justify-between text-[11px] text-zinc-500 mb-1">
                  <span>{product.brand || "Generic"}</span>
                  <span className="text-amber-500 font-medium">★ {product.rating?.toFixed(1) || "N/A"}</span>
                </div>

                {/* Product Title */}
                <h3 className="font-semibold text-sm text-zinc-100 group-hover:text-white transition-colors mb-2 line-clamp-1">
                  {product.title}
                </h3>

                {/* Product Description */}
                <p className="text-xs text-zinc-500 line-clamp-2 mb-4 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Price & Action */}
              <div className="relative z-10 flex items-center justify-between mt-4 pt-4 border-t border-zinc-900">
                <span className="text-sm font-semibold text-purple-400">
                  ${product.price?.toFixed(2)}
                </span>
                <span className="text-xs text-zinc-400 group-hover:text-white transition-colors flex items-center gap-0.5">
                  View Details
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
