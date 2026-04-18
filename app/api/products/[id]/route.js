import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function PUT(req, context) {
  try {
    const { id } = await context.params; // ✅ FIXED

    const body = await req.json();

    const updated = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        slug: body.slug,
        description: body.description,
        price: body.price,
        oldPrice: body.oldPrice,
        stock: body.stock,
        category: body.category,
        bestSeller: body.bestSeller,
        images: body.images,
        content: body.content ?? null,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error("UPDATE ERROR:", error);
    return NextResponse.json(
      { error: "Update failed" },
      { status: 500 }
    );
  }
}

export async function DELETE(req, context) {
  try {
    const { id } = await context.params; // ✅ FIXED

    await prisma.product.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Deleted" });
  } catch (error) {
    console.error("DELETE ERROR:", error);
    return NextResponse.json(
      { error: "Delete failed" },
      { status: 500 }
    );
  }
}