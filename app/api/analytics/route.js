import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalOrders = await prisma.order.count();

    const totalProducts = await prisma.product.count();

    const lowStockProducts = await prisma.product.count({
      where: {
        stock: {
          lte: 5,
        },
      },
    });

    const revenueData = await prisma.order.aggregate({
      _sum: {
        total: true,
      },
    });

    const totalRevenue = revenueData._sum.total || 0;

    // Monthly revenue
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthlyRevenueData = await prisma.order.aggregate({
      where: {
        createdAt: {
          gte: startOfMonth,
        },
      },
      _sum: {
        total: true,
      },
    });

    const monthlyRevenue = monthlyRevenueData._sum.total || 0;

    return NextResponse.json({
      totalOrders,
      totalProducts,
      lowStockProducts,
      totalRevenue,
      monthlyRevenue,
    });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to load analytics" },
      { status: 500 }
    );
  }
}