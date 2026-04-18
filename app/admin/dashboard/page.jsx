import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import DashboardClient from "./DashboardClient";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  // 🔒 Must be logged in
  if (!session) {
    redirect("/admin/login");
  }

  // 🚫 Only admin allowed
  if (session.user.role !== "admin") {
    redirect("/");
  }

  return <DashboardClient />;
}