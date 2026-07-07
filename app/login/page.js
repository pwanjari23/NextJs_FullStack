"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setIsPending(true);

    try {
      // Trigger NextAuth credentials sign-in
      const res = await signIn("credentials", {
        username,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid username or password.");
      } else {
        router.push("/dashboard");
        router.refresh(); // Refresh page to update layout header session state
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div className="relative min-h-[calc(100vh-130px)] flex items-center justify-center p-6 overflow-hidden">
      {/* Background glowing blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative group w-full max-w-md z-10">
        {/* Animated outer glowing border */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur opacity-25 group-hover:opacity-50 transition duration-700"></div>

        <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-3xl p-8 backdrop-blur-xl shadow-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-extrabold tracking-tight text-white mb-2">
              Sign In
            </h1>
            <p className="text-xs text-zinc-400">
              Access the protected dashboard metrics
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Username Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="username" className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="px-4 py-3 bg-zinc-950/60 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/30 transition-all font-mono"
              />
            </div>

            {/* Password Input */}
            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-xs font-mono text-zinc-500 uppercase tracking-wider">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="px-4 py-3 bg-zinc-950/60 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500/80 focus:ring-1 focus:ring-purple-500/30 transition-all font-mono"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3.5 bg-red-500/10 border border-red-500/20 text-red-400 text-xs rounded-xl flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-4 h-4 flex-shrink-0"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isPending}
              className="mt-2 w-full py-3.5 bg-white text-black font-semibold rounded-xl text-sm hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:hover:scale-100 flex items-center justify-center gap-2 cursor-pointer shadow-lg hover:shadow-white/5"
            >
              {isPending ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-black" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  <span>Signing In...</span>
                </>
              ) : (
                <span>Sign In</span>
              )}
            </button>
          </form>

          {/* Credentials Info Helper Box */}
          <div className="mt-8 pt-6 border-t border-zinc-800 text-center">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
              Demo Credentials
            </span>
            <div className="inline-flex flex-col gap-1 px-4 py-2.5 bg-zinc-950/60 rounded-xl border border-zinc-800/50 text-left w-full font-mono text-[11px] text-zinc-400">
              <div><span className="text-purple-400 font-semibold">User:</span> admin</div>
              <div><span className="text-purple-400 font-semibold">Pass:</span> password123</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
