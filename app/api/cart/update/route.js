import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { productId, quantity } = await req.json();

    const cart = await prisma.cart.findUnique({
      where: {
        userEmail: session.user.email,
      },
    });

    if (!cart) {
      return NextResponse.json(
        { error: "Cart not found" },
        { status: 404 }
      );
    }

    await prisma.cartItem.updateMany({
      where: {
        cartId: cart.id,
        productId,
      },
      data: {
        quantity,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("POST /api/cart/update failed:", error);
    return NextResponse.json(
      { error: "Cart update failed" },
      { status: 500 }
    );
  }
}
