import { cookies } from "next/headers";
import { decrypt } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = await decrypt(token);

  // If somehow token is invalid, redirect to login
  if (!user) {
    redirect("/login");
  }

  // Inline server action to handle logout
  async function logoutAction() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("token");
    redirect("/login");
  }

  // Mock statistics for a premium dashboard feel
  const stats = [
    { label: "Products Catalog", value: "30 items", desc: "Synced from DummyJSON", icon: "📦" },
    { label: "Security Level", value: "Stateless JWT", desc: "Signed with HS256", icon: "🛡️" },
    { label: "Session Expiry", value: "2 hours", desc: "HTTP-Only secure cookie", icon: "⏱️" },
    { label: "Current Identity", value: user.username, desc: `Role: ${user.role || "User"}`, icon: "👤" },
  ];

  return (
    <div className="relative flex-grow flex flex-col py-16 px-6 max-w-7xl mx-auto w-full">
      {/* Background glowing blob */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-600/5 rounded-full blur-3xl pointer-events-none"></div>

      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 uppercase tracking-wider">
        <Link href="/" className="hover:text-purple-400 transition-colors">Home</Link>
        <span>/</span>
        <span className="text-zinc-300">Dashboard</span>
      </div>

      <main className="relative z-10 w-full flex flex-col gap-10">
        
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-zinc-900">
          <div>
            <span className="text-xs uppercase tracking-widest text-purple-500 font-semibold">Protected Area</span>
            <h1 className="text-3xl font-extrabold mt-1 text-white">
              Welcome back, <span className="text-purple-400 capitalize">{user.username}</span>
            </h1>
            <p className="text-zinc-400 text-sm mt-1">
              Here is your secure session snapshot and dashboard control panel.
            </p>
          </div>
          
          {/* Logout Action */}
          <form action={logoutAction} className="flex-shrink-0">
            <button
              type="submit"
              className="px-5 py-2.5 bg-red-600/10 border border-red-500/20 text-red-400 text-xs font-bold rounded-xl hover:bg-red-600/20 active:scale-95 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
              </svg>
              Sign Out
            </button>
          </form>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="group relative p-6 bg-zinc-900/40 border border-zinc-900 rounded-2xl transition-all duration-300 hover:bg-zinc-900/60 hover:border-zinc-800 hover:-translate-y-0.5 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block mb-1">
                    {stat.label}
                  </span>
                  <span className="text-xl font-bold text-white block mb-1">
                    {stat.value}
                  </span>
                  <span className="text-xs text-zinc-400 block">
                    {stat.desc}
                  </span>
                </div>
                <span className="text-2xl">{stat.icon}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Panel Section */}
        <div className="relative group w-full">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-blue-500 rounded-3xl blur opacity-15 group-hover:opacity-25 transition duration-500"></div>
          <div className="relative bg-zinc-900/60 border border-zinc-900 rounded-3xl p-8 backdrop-blur-xl">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span>
              Secured Session Details
            </h3>
            <div className="flex flex-col gap-4 font-mono text-xs text-zinc-400">
              <div className="p-4 bg-zinc-950/80 border border-zinc-900 rounded-xl overflow-x-auto">
                <p className="text-zinc-500 mb-2">// Active JWT Decrypted Payload</p>
                <pre className="text-purple-400">{JSON.stringify(user, null, 2)}</pre>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-zinc-500 pt-2 text-[11px]">
                <span>Status: Authenticated</span>
                <span>Algorithm: HS256 HMAC</span>
                <span>Expires: {new Date(user.expiresAt).toLocaleTimeString()}</span>
              </div>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
