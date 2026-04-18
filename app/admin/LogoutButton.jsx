"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="bg-white text-black py-2 rounded hover:bg-gray-300 transition"
    >
      Logout
    </button>
  );
}