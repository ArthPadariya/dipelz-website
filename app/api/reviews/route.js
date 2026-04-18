import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    const review = await prisma.review.create({
      data: {
        username: body.username,
        rating: body.rating,
        comment: body.comment,
        productId: body.productId,
      },
    });

    return NextResponse.json(review);
  } catch (error) {
    console.error("POST /api/reviews failed:", error);
    return NextResponse.json(
      { error: "Review creation failed" },
      { status: 500 }
    );
  }
}
