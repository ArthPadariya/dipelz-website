"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function PaymentPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/login");
    }
  }, [session, status]);

  if (!session) return null;

  return (
    <div className="min-h-screen flex items-center justify-center">
      <h1 className="text-3xl font-semibold">
        We are coming soon 🚀
      </h1>
    </div>
  );
}