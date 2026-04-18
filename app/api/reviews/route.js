import { prisma } from "@/lib/prisma";

export async function POST(req) {
  const body = await req.json();

  const review = await prisma.review.create({
    data: {
      username: body.username,
      rating: body.rating,
      comment: body.comment,
      productId: body.productId,
    },
  });

  return Response.json(review);
}