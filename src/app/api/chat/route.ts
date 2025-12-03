import { NextRequest, NextResponse } from "next/server";
import { answerBooksQuestion, detectTopic } from "./functions";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    const topic = await detectTopic(message);

    if (topic === "BOOKS") {
      const reply = await answerBooksQuestion(message);
      return NextResponse.json({ reply });
    } else {
      return NextResponse.json({
        reply: "Dear guest, I only talk about books here 📚",
      });
    }
  } catch (err) {
    console.error("API /api/chat error:", err);
    return NextResponse.json({ reply: "Error please try late" });
  }
}
