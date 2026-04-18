import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const userId = session.user.id;

  // 1️⃣ Get cart with products
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  if (!cart || cart.items.length === 0) {
    return NextResponse.json(
      { error: "Cart is empty" },
      { status: 400 }
    );
  }

  // 2️⃣ Validate stock
  for (const item of cart.items) {
    if (item.quantity > item.product.stock) {
      return NextResponse.json(
        { error: `${item.product.name} is out of stock` },
        { status: 400 }
      );
    }
  }

  // 3️⃣ Calculate total
  const total = cart.items.reduce(
    (sum, item) =>
      sum + item.product.price * item.quantity,
    0
  );

  // 4️⃣ Create Order
  const order = await prisma.order.create({
    data: {
      userId,
      total,
      items: {
        create: cart.items.map((item) => ({
          productId: item.product.id,
          name: item.product.name,
          price: item.product.price,
          quantity: item.quantity,
        })),
      },
    },
  });

  // 5️⃣ Reduce stock
  for (const item of cart.items) {
    await prisma.product.update({
      where: { id: item.product.id },
      data: {
        stock: item.product.stock - item.quantity,
      },
    });
  }

  // 6️⃣ Clear cart
  await prisma.cartItem.deleteMany({
    where: { cartId: cart.id },
  });

  return NextResponse.json({ orderId: order.id });
}