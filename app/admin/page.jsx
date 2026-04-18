import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const totalOrders = await prisma.order.count();
  const totalUsers = await prisma.user.count({
    where: { role: "customer" }
  });

  const revenue = await prisma.order.aggregate({
    _sum: { total: true }
  });

  return (
    <div>
      <h1 className="text-3xl font-bold mb-10">
        Dashboard
      </h1>

      <div className="grid grid-cols-3 gap-6">

        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-gray-500 mb-2">Total Orders</h2>
          <p className="text-3xl font-bold">
            {totalOrders}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-gray-500 mb-2">Customers</h2>
          <p className="text-3xl font-bold">
            {totalUsers}
          </p>
        </div>

        <div className="bg-white p-8 rounded-xl shadow">
          <h2 className="text-gray-500 mb-2">Revenue</h2>
          <p className="text-3xl font-bold">
            ₹ {revenue._sum.total || 0}
          </p>
        </div>

      </div>
    </div>
  );
}