"use client";

import { signOut } from "next-auth/react";
import { useCart } from "../context/CartContext";

export default function LogoutButton() {
  const { clearCart } = useCart();

  const handleLogout = async () => {
    await clearCart();
    localStorage.removeItem("guest_cart");
    await signOut({ callbackUrl: "/" });
  };

  return (
    <button
      onClick={handleLogout}
      className="mt-6 bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition"
    >
      Logout
    </button>
  );
}
