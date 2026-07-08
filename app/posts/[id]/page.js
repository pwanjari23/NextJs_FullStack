import Link from "next/link";

export async function generateMetadata({ params }) {
  const { id } = await params;
  return {
    title: `Post ${id} - My Blog`,
    description: `This is the page for post ${id}`,
  };
}

export default async function PostPage({ params }) {
  const { id } = await params;

  return (
    <div className="relative min-h-[calc(100vh-130px)] flex items-center justify-center p-6 overflow-hidden bg-zinc-950 text-white">
      {/* Background glowing blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative group w-full max-w-lg z-10">
        {/* Animated outer glowing border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-700"></div>

        <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest block mb-2">
              Dynamic Blog Post
            </span>
            <h1 className="text-3xl font-extrabold tracking-tight text-white mb-4">
              Post {id}
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed">
              This is a dynamically generated route in Next.js showcasing page-specific dynamic metadata.
            </p>
          </div>

          <div className="p-4 bg-zinc-950/60 rounded-xl border border-zinc-800/50 font-mono text-xs text-zinc-300 space-y-2">
            <div><span className="text-purple-400 font-semibold">Route:</span> /posts/{id}</div>
            <div><span className="text-purple-400 font-semibold">Metadata Title:</span> Post {id} - My Blog</div>
            <div><span className="text-purple-400 font-semibold">Metadata Description:</span> This is the page for post {id}</div>
          </div>

          <div className="mt-8 text-center">
            <Link
              href="/"
              className="text-xs font-mono text-zinc-500 hover:text-purple-400 uppercase tracking-widest transition-colors"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
