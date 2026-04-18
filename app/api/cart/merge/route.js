import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

export async function POST(req) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { items } = await req.json();

  if (!items || !items.length) {
    return NextResponse.json({ success: true });
  }

  //////////////////////////////////////////////////////
  // GET OR CREATE USER CART
  //////////////////////////////////////////////////////

  const cart = await prisma.cart.upsert({
    where: {
      userEmail: session.user.email
    },
    update: {},
    create: {
      userEmail: session.user.email
    }
  });

  //////////////////////////////////////////////////////
  // MERGE ITEMS
  //////////////////////////////////////////////////////

  for (const item of items) {

    const existingItem = await prisma.cartItem.findFirst({
      where: {
        cartId: cart.id,
        productId: item.productId
      }
    });

    if (existingItem) {

      await prisma.cartItem.update({
        where: {
          id: existingItem.id
        },
        data: {
          quantity: existingItem.quantity + item.quantity
        }
      });

    } else {

      await prisma.cartItem.create({
        data: {
          cartId: cart.id,
          productId: item.productId,
          quantity: item.quantity
        }
      });

    }

  }

  return NextResponse.json({ success: true });

}