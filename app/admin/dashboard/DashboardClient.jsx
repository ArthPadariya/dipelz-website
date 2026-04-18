"use client";

import { useEffect, useState } from "react";

export default function DashboardClient() {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalProducts: 0,
    lowStockProducts: 0,
    totalRevenue: 0,
    monthlyRevenue: 0,
  });

  const fetchAnalytics = async () => {
    const res = await fetch("/api/analytics");
    const data = await res.json();
    setStats(data);
  };

  useEffect(() => {
    fetchAnalytics();

    const interval = setInterval(() => {
      fetchAnalytics();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-10">
      <h1 className="text-3xl font-bold text-gray-800">
        Analytics Dashboard
      </h1>

      <div className="grid grid-cols-5 gap-6">
        <Card title="Total Revenue" value={`₹${stats.totalRevenue}`} />
        <Card title="Revenue This Month" value={`₹${stats.monthlyRevenue}`} />
        <Card title="Total Orders" value={stats.totalOrders} />
        <Card title="Total Products" value={stats.totalProducts} />
        <Card title="Low Stock Products" value={stats.lowStockProducts} />
      </div>
    </div>
  );
}

function Card({ title, value }) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition duration-300">
      <p className="text-gray-500 text-sm">{title}</p>
      <h2 className="text-2xl font-bold mt-2">{value}</h2>
    </div>
  );
}