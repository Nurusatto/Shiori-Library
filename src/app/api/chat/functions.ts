import { GoogleGenerativeAI } from "@google/generative-ai";
import { ai_token } from "@/config/api";

if (!ai_token) throw new Error("GEMINI API token не найден");

const genAI = new GoogleGenerativeAI(ai_token);

const mainModel = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash",
});
const topicModel = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash",
});

export async function detectTopic(text: string): Promise<"BOOKS" | "OTHER"> {
  const keywords = [
    "книга",
    "книг",
    "книгах",
    "книге",
    "книгу",
    "книгами",
    "книжки",
    "книжка",
    "книги",
    "роман",
    "автор",
    "читать",
    "литература",
    "book",
    "novel",
    "author",
  ];

  const lower = text.toLowerCase();
  const keywordMatch = keywords.some((k) => lower.includes(k));

  if (keywordMatch) {
    console.log("Detected topic (keyword check): BOOKS");
    return "BOOKS";
  }

  try {
    const prompt = `BOOKS or OTHER?
Text: "${text}"`;

    const res = await topicModel.generateContent(prompt);
    const out = res.response.text().trim().toUpperCase();

    console.log("Detected topic (Gemini):", out);
    return out === "BOOKS" ? "BOOKS" : "OTHER";
  } catch (err) {
    console.error("Gemini topic detection failed:", err);

    return "OTHER";
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function handleGeminiError(err: any) {
  const status = err?.status;

  if (status === 401 || status === 403) {
    return {
      code: "INVALID_API_KEY",
      message: "Проблема с API ключом Gemini (401/403)",
    };
  }

  if (status === 429) {
    return {
      code: "RATE_LIMIT",
      message: "Превышен лимит запросов Gemini (429)",
    };
  }

  if (status === 503) {
    return {
      code: "MODEL_OVERLOADED",
      message: "Модель Gemini временно перегружена (503)",
    };
  }

  return {
    code: "UNKNOWN_ERROR",
    message: "Неизвестная ошибка Gemini",
  };
}

export async function answerBooksQuestion(text: string) {
  try {
    const cleanText = text.replace(/["]/g, "'");
    console.log("Sending to AI:", cleanText);
    const res = await mainModel.generateContent(`
Ты — умный библиотекарь. 
Отвечай ТОЛЬКО о книгах.

Вопрос: ${cleanText}
    `);

    console.log(res);
    return res.response.text();
  } catch (err) {
    const errorInfo = handleGeminiError(err);

    console.log(errorInfo);

    console.error("AnswerBooks error:", {
      code: errorInfo.code,
      message: errorInfo.message,
    });

    return `An error occurred while generating the response. Please try again later. ${errorInfo.message}`;
  }
}
