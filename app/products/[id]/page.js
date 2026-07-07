import Link from "next/link";
import { notFound } from "next/navigation";

export default async function ProductDetailPage({ params }) {
  const { id } = await params;
  let product = null;
  let errorMsg = null;

  try {
    const res = await fetch(`https://dummyjson.com/products/${id}`, {
      next: { revalidate: 3600 }, // Enable caching with 1-hour revalidation
    });

    if (res.status === 404) {
      notFound(); // Trigger 404 page if product is not found
    }

    if (!res.ok) {
      throw new Error(`Failed to fetch product details (status ${res.status})`);
    }

    product = await res.json();
  } catch (err) {
    console.error(err);
    errorMsg = err.message;
  }

  if (errorMsg) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-zinc-950 text-white">
        <div className="p-6 rounded-2xl bg-red-500/10 border border-red-500/20 text-center max-w-md">
          <h2 className="text-lg font-semibold text-red-400 mb-2">Error Loading Product</h2>
          <p className="text-zinc-400 text-sm mb-4">{errorMsg}</p>
          <Link href="/products" className="text-sm font-semibold text-purple-400 hover:text-purple-300">
            ← Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex-grow flex flex-col py-12 px-6 max-w-7xl mx-auto w-full">
      {/* Background glowing blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 uppercase tracking-wider">
        <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-purple-400 transition-colors">Products</Link>
        <span>/</span>
        <span className="text-zinc-300">ID: {id}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        
        {/* Left Column: Product Gallery & Framed Message */}
        <div className="lg:col-span-6 flex flex-col gap-6">
          
          {/* Framed static message required by prompt */}
          <div className="relative group w-full">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
            <div className="relative bg-zinc-900/90 border border-zinc-800 rounded-2xl p-6 text-center shadow-lg backdrop-blur-xl">
              <p className="text-zinc-400 text-xs font-light">
                Product <span className="font-mono text-purple-400 font-semibold bg-purple-500/10 px-1 py-0.5 rounded border border-purple-500/20">{id}</span> details page — content coming soon!
              </p>
            </div>
          </div>

          {/* Product Image Showcase */}
          <div className="bg-zinc-900/30 border border-zinc-900 rounded-3xl p-8 flex items-center justify-center aspect-square max-h-[500px] overflow-hidden relative">
            <img
              src={product.images?.[0] || product.thumbnail}
              alt={product.title}
              className="object-contain max-h-full max-w-full hover:scale-105 transition-transform duration-500"
            />
            {product.discountPercentage && (
              <span className="absolute top-4 right-4 bg-purple-500 text-white font-bold text-xs px-3 py-1.5 rounded-xl shadow-lg">
                {product.discountPercentage}% OFF
              </span>
            )}
          </div>

          {/* Mini Gallery (if more than 1 image) */}
          {product.images && product.images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {product.images.slice(0, 4).map((img, idx) => (
                <div key={idx} className="bg-zinc-900/50 border border-zinc-900 rounded-xl p-2 aspect-square flex items-center justify-center cursor-pointer hover:border-zinc-700 transition-colors">
                  <img src={img} alt={`${product.title} gallery ${idx}`} className="object-contain max-h-full max-w-full" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Product Meta & Reviews */}
        <div className="lg:col-span-6 flex flex-col justify-between">
          <div>
            {/* Brand & Availability */}
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-purple-400 bg-purple-500/5 px-2.5 py-1 rounded-md border border-purple-500/10">
                {product.brand || "Generic"}
              </span>
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-md ${
                product.availabilityStatus === "In Stock" ? "text-emerald-400 bg-emerald-500/5 border border-emerald-500/10" : "text-amber-400 bg-amber-500/5 border border-amber-500/10"
              }`}>
                {product.availabilityStatus} ({product.stock} left)
              </span>
            </div>

            {/* Product Title */}
            <h1 className="text-3xl font-extrabold text-white mb-2 leading-tight">
              {product.title}
            </h1>

            {/* Ratings & Reviews Count */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center text-amber-400 text-sm">
                {"★".repeat(Math.round(product.rating))}
                {"☆".repeat(5 - Math.round(product.rating))}
                <span className="ml-1.5 font-bold text-white text-xs">{product.rating?.toFixed(2)}</span>
              </div>
              <span className="text-zinc-600 text-xs">|</span>
              <span className="text-zinc-400 text-xs">{product.reviews?.length || 0} Customer Reviews</span>
            </div>

            {/* Price section */}
            <div className="mb-6 flex items-baseline gap-3 p-4 bg-zinc-900/30 border border-zinc-900 rounded-2xl">
              <span className="text-3xl font-black text-white">${product.price?.toFixed(2)}</span>
              {product.discountPercentage && (
                <>
                  <span className="text-sm line-through text-zinc-500">
                    ${(product.price * (1 + product.discountPercentage / 100)).toFixed(2)}
                  </span>
                  <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-0.5 rounded border border-purple-500/10">
                    Save {product.discountPercentage}%
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-2">Description</h3>
              <p className="text-zinc-400 text-sm leading-relaxed font-light">
                {product.description}
              </p>
            </div>

            {/* Specs Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8 pt-6 border-t border-zinc-900">
              <div>
                <span className="text-[10px] uppercase text-zinc-500 block">Category</span>
                <span className="text-xs text-zinc-300 capitalize">{product.category}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-500 block">SKU</span>
                <span className="text-xs text-zinc-300 font-mono">{product.sku || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-500 block">Warranty</span>
                <span className="text-xs text-zinc-300">{product.warrantyInformation || "N/A"}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-zinc-500 block">Shipping</span>
                <span className="text-xs text-zinc-300">{product.shippingInformation || "N/A"}</span>
              </div>
            </div>
          </div>

          {/* Customer Reviews Section */}
          {product.reviews && product.reviews.length > 0 && (
            <div className="pt-6 border-t border-zinc-900">
              <h3 className="text-sm font-semibold text-zinc-300 uppercase tracking-wider mb-4">Customer Reviews</h3>
              <div className="flex flex-col gap-4">
                {product.reviews.map((rev, idx) => (
                  <div key={idx} className="p-4 bg-zinc-900/20 border border-zinc-900 rounded-2xl text-xs">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-zinc-300">{rev.reviewerName}</span>
                      <span className="text-zinc-500">{new Date(rev.date).toLocaleDateString()}</span>
                    </div>
                    <div className="text-amber-500 font-bold mb-1">
                      {"★".repeat(rev.rating)}
                    </div>
                    <p className="text-zinc-400 leading-relaxed italic">"{rev.comment}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
