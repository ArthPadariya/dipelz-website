import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      const products = await prisma.product.findMany({
        take: 4,
      });

      return NextResponse.json(products);
    }

    const cart = await prisma.cart.findUnique({
      where: { userEmail: session.user.email },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart || cart.items.length === 0) {
      const products = await prisma.product.findMany({
        take: 4,
      });

      return NextResponse.json(products);
    }

    const categories = cart.items
      .map((item) => item.product.category)
      .filter(Boolean);

    const products = await prisma.product.findMany({
      where: categories.length
        ? {
            category: {
              in: categories,
            },
          }
        : undefined,
      take: 4,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/recommendations failed:", error);
    return NextResponse.json([], { status: 500 });
  }
}
