import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function AdminLayout({ children }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-8 flex flex-col">
        <h2 className="text-2xl font-bold mb-10">
          Dipelz Admin
        </h2>

        <nav className="space-y-4 flex-1">
          <Link href="/admin" className="block hover:text-gray-300">
            Dashboard
          </Link>
          <Link href="/admin/orders" className="block hover:text-gray-300">
            Orders
          </Link>
          <Link href="/admin/customers" className="block hover:text-gray-300">
            Customers
          </Link>
        </nav>

        <Link
          href="/"
          className="mt-10 text-sm text-gray-400 hover:text-white"
        >
          Back to Website
        </Link>
      </aside>

      {/* Content */}
      <main className="flex-1 p-12">
        {children}
      </main>
    </div>
  );
}