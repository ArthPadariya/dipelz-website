import { NextResponse } from "next/server";
import { handleChatbot } from "@/lib/chatbotLogic";

export async function POST(req) {

  const body = await req.json();
  const message = body.message;

  const response = await handleChatbot(message);

  return NextResponse.json({
    reply: response
  });

}