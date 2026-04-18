"use client";

import { useEffect, useState } from "react";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    try {
      const res = await fetch("/api/admin/orders");
      const data = await res.json();

      if (Array.isArray(data)) {
        setOrders(data);
      } else {
        setOrders([]);
      }
    } catch (error) {
      console.error("Failed to fetch orders", error);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (orderId, status) => {
    try {
      await fetch("/api/admin/orders", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ orderId, status }),
      });

      fetchOrders();
    } catch (error) {
      console.error("Status update failed", error);
    }
  };

  return (
    <div className="p-10 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">
        Orders Dashboard
      </h1>

      {loading && <p>Loading orders...</p>}

      {!loading && orders.length === 0 && (
        <div className="bg-white p-10 rounded-xl shadow text-center">
          <p className="text-gray-500 text-lg">
            No orders found.
          </p>
        </div>
      )}

      <div className="space-y-8">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-6 shadow-sm bg-white"
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">
                  Order ID: {order.id}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>

              <select
                value={order.status}
                onChange={(e) =>
                  updateStatus(order.id, e.target.value)
                }
                className="border p-2 rounded-lg"
              >
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
              </select>
            </div>

            {/* Customer */}
            <div className="mb-4">
              <p className="font-medium">
                order.email
              </p>
            </div>

            {/* Items */}
            <div className="border-t pt-4">
              {order.items?.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between text-sm mb-2"
                >
                  <span>
                    {item.name} × {item.quantity}
                  </span>
                  <span>₹ {item.price * item.quantity}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t pt-4 mt-4 flex justify-between font-semibold text-lg">
              <span>Total</span>
              <span>₹ {order.total}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}