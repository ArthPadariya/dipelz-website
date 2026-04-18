import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

// GET USER WISHLIST
export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json([]);
  }

  const items = await prisma.wishlist.findMany({
    where: { userEmail: session.user.email },
    include: { product: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(items);
}

// TOGGLE WISHLIST
export async function POST(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json(
      { error: "Not authenticated" },
      { status: 401 }
    );
  }

  const { productId } = await req.json();

  const existing = await prisma.wishlist.findFirst({
    where: {
      productId,
      userEmail: session.user.email,
    },
  });

  if (existing) {
    await prisma.wishlist.delete({
      where: { id: existing.id },
    });

    return NextResponse.json({ removed: true });
  }

  await prisma.wishlist.create({
    data: {
      productId,
      userEmail: session.user.email,
    },
  });

  return NextResponse.json({ added: true });
}