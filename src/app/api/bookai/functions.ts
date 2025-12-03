import { ai_token } from "@/config/api";
import { GoogleGenerativeAI } from "@google/generative-ai";
import type { bookPageAi } from "@/entities/AI";

export class BookAI {
  private model;

  constructor() {
    if (!ai_token) throw new Error("GEMINI API token не найден");
    const genAI = new GoogleGenerativeAI(ai_token);

    this.model = genAI.getGenerativeModel({
      model: "models/gemini-2.5-flash",
    });
  }
  async getInfo({ title, key }: bookPageAi) {
    try {
      const prompt = `
You are a helpful librarian assistant named Shori.
Provide a brief summary of the book in 3–5 sentences.
Do NOT include any spoilers about the ending.

Book title: "${title}"
Open Library key: "${key}"

At the end, politely ask: "Your assistant Shori, can I help you with anything else?"
`;

      const res = await this.model.generateContent(prompt);
      return res.response.text();
    } catch (err) {
      console.error("BookAI.getInfo error:", err);
      return "Failed to retrieve information about the book.";
    }
  }
}
