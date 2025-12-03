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
        }
      );
    }

    const ai = new BookAI();
    const info = await ai.getInfo(book);

    return new Response(JSON.stringify({ info }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
