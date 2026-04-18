import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const rawLimit = Number(searchParams.get("limit"));
    const limit = Number.isFinite(rawLimit) && rawLimit > 0
      ? rawLimit
      : undefined;

    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: limit,
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("GET /api/products failed:", error);
    return NextResponse.json([], {
      status: 500,
      headers: {
        "X-Error": "products-fetch-failed",
      },
    });
  }
}

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
    console.error("POST /api/products failed:", error);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}
