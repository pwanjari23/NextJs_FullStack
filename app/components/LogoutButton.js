"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="text-sm text-red-500 hover:text-red-400 transition-colors cursor-pointer bg-transparent border-0 p-0 font-medium focus:outline-none"
    >
      Logout
    </button>
  );
}
