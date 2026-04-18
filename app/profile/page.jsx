import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import LogoutButton from "./LogoutButton";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/profile");
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    include: {
      orders: {
        orderBy: { createdAt: "desc" },
      },
    },
  });

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-8 pb-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow space-y-6">

        <h1 className="text-2xl font-semibold">My Profile</h1>

        <div className="space-y-2">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Role:</strong> {user.role}</p>
        </div>

        <div className="border-t pt-6">
          <h2 className="text-xl font-semibold mb-4">Order History</h2>

          {user.orders.length === 0 ? (
            <p className="text-gray-500">No orders yet.</p>
          ) : (
            <div className="space-y-4">
              {user.orders.map((order) => (
                <div
                  key={order.id}
                  className="border p-4 rounded-lg flex justify-between"
                >
                  <div>
                    <p><strong>Order ID:</strong> {order.id}</p>
                    <p><strong>Total:</strong> ₹ {order.total}</p>
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        <LogoutButton />

      </div>
    </div>
  );
}