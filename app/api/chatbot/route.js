import { NextResponse } from "next/server";
import { handleChatbot } from "@/lib/chatbotLogic";

export async function POST(req) {
  try {
    const body = await req.json();
    const message = body.message;
    const response = await handleChatbot(message);

    return NextResponse.json({
      reply: response,
    });
  } catch (error) {
    console.error("POST /api/chatbot failed:", error);
    return NextResponse.json(
      { error: "Chatbot failed" },
      { status: 500 }
    );
  }
}
