import { NextRequest } from "next/server";
import { BookAI } from "./functions";

export const POST = async (req: NextRequest) => {
  try {
    const book = await req.json();
    if (!book || !book.title || !book.key) {
      return new Response(
        JSON.stringify({ error: "Missing book key or title" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        },
      );
    }

    const ai = new BookAI();
    const info = await ai.getInfo(book);

    return new Response(JSON.stringify({ info }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("API Route Error:", err);

    const errorObj = err as { status?: number; message?: string };

    const isRateLimit =
      errorObj?.status === 429 || errorObj?.message?.includes("429");

    const message = isRateLimit ? "QUOTA_EXCEEDED" : "SERVER_ERROR";

    return new Response(JSON.stringify({ error: message }), {
      status: isRateLimit ? 429 : 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
