import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "../LogoutButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* PAGE TITLE */}
        <h1 className="text-4xl font-bold mb-10">
          My Account
        </h1>

        {/* PROFILE CARD */}
        <div className="bg-white rounded-2xl shadow p-8 mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold mb-2">
              Account Information
            </h2>
            <p className="text-gray-600">
              {user?.email ?? session.user.email}
            </p>
          </div>

          <LogoutButton />
        </div>

        {/* ORDER HISTORY */}
        <div className="bg-white rounded-2xl shadow p-8">
          <h2 className="text-2xl font-semibold mb-6">Order History</h2>

          {user?.orders?.length ? (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="border rounded-lg p-4 flex items-center justify-between"
                >
                  <div className="space-y-1">
                    <p className="font-medium">Order ID: {order.id}</p>
                    <p className="text-sm text-gray-600">
                      Status: {order.status}
                    </p>
                    <p className="text-sm text-gray-600">
                      Total: Rs. {order.total}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No orders yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}
