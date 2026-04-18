import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET all products
export async function GET(req) {
  try {

    const { searchParams } = new URL(req.url)
    const limit = Number(searchParams.get("limit")) || undefined

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: limit
    });

    return NextResponse.json(products);

  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}

// CREATE product
export async function POST(req) {
  try {
    const body = await req.json();

    const baseSlug = body.name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

    const existing = await prisma.product.findFirst({
      where: { slug: baseSlug },
    });

    const slug = existing ? `${baseSlug}-${Date.now()}` : baseSlug;

    const product = await prisma.product.create({
      data: {
        name: body.name,
        slug,
        description: body.description,
        price: Number(body.price),
        oldPrice: body.oldPrice ? Number(body.oldPrice) : null,
        stock: Number(body.stock),
        category: body.category || null,
        images: body.images || [],
        content: body.content || null,
      },
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}