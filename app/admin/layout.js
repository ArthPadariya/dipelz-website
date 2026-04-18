import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  // Allow login page without session
  const isLoginPage =
    typeof window === "undefined"
      ? false
      : window.location.pathname === "/admin/login";

  if (!session && !isLoginPage) {
    redirect("/admin/login");
  }

  return <>{children}</>;
}