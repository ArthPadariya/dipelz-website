import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { NextResponse } from "next/server";

//////////////////////////////////////////////////////
// GET CART
//////////////////////////////////////////////////////

export async function GET() {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ items: [] });
  }

  const cart = await prisma.cart.findUnique({
    where: {
      userEmail: session.user.email
    },
    include: {
      items: {
        include: {
          product: true
        }
      }
    }
  });

  return NextResponse.json(cart || { items: [] });

}

//////////////////////////////////////////////////////
// ADD TO CART
//////////////////////////////////////////////////////

export async function POST(req) {

  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const { productId, quantity } = await req.json();

  const cart = await prisma.cart.upsert({
    where: {
      userEmail: session.user.email
    },
    update: {},
    create: {
      userEmail: session.user.email
    }
  });

  const existingItem = await prisma.cartItem.findFirst({
    where: {
      cartId: cart.id,
      productId
    }
  });

  if (existingItem) {

    await prisma.cartItem.update({
      where: {
        id: existingItem.id
      },
      data: {
        quantity: existingItem.quantity + quantity
      }
    });

  } else {

    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity
      }
    });

  }

  return NextResponse.json({ success: true });

}