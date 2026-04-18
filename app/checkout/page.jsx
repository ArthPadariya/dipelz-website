import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import CheckoutClient from "./CheckoutClient";

export default async function CheckoutPage() {
  const session = await getServerSession(authOptions);

  // 🔒 If not logged in → go login
  if (!session) {
    redirect("/login?callbackUrl=/checkout");
  }

  // 🚫 Admin cannot checkout
  if (session.user.role !== "customer") {
    redirect("/");
  }

  return <CheckoutClient />;
}