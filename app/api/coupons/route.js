import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//////////////////////////////////////////////////
// GET COUPONS
//////////////////////////////////////////////////

export async function GET() {

  try {

    const now = new Date();

    const coupons = await prisma.coupon.findMany({
      where: {
        active: true,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: now } }
        ]
      },
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(coupons);

  } catch (error) {

    console.error("Coupon fetch error:", error);

    return NextResponse.json(
      { error: "Failed to load coupons" },
      { status: 500 }
    );

  }

}