import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

//////////////////////////////////////////////////
// CREATE FEEDBACK
//////////////////////////////////////////////////

export async function POST(req) {

  try {

    const { name, email, message, rating } = await req.json();

    if (!message) {
      return NextResponse.json(
        { error: "Message required" },
        { status: 400 }
      );
    }

    const feedback = await prisma.feedback.create({
      data: {
        name,
        email,
        message,
        rating: rating ? Number(rating) : null
      }
    });

    return NextResponse.json(feedback);

  } catch (error) {

    console.error("Feedback error:", error);

    return NextResponse.json(
      { error: "Failed to submit feedback" },
      { status: 500 }
    );

  }

}

//////////////////////////////////////////////////
// GET ALL FEEDBACK (ADMIN)
//////////////////////////////////////////////////

export async function GET() {

  try {

    const feedbacks = await prisma.feedback.findMany({
      orderBy: {
        createdAt: "desc"
      }
    });

    return NextResponse.json(feedbacks);

  } catch (error) {

    return NextResponse.json(
      { error: "Failed to fetch feedback" },
      { status: 500 }
    );

  }

}