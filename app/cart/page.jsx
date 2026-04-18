"use client";

import { useRouter } from "next/navigation";

export default function CheckoutButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/checkout")}
      className="bg-black text-white px-6 py-2"
    >
      Checkout
    </button>
  );
}