import { GoogleGenerativeAI } from "@google/generative-ai";
import { ai_token } from "@/config/api";

if (!ai_token) throw new Error("GEMINI API token не найден");

const genAI = new GoogleGenerativeAI(ai_token);

// Модели 2.0
const mainModel = genAI.getGenerativeModel({ model: "models/gemini-2.5-pro" });
const topicModel = genAI.getGenerativeModel({
  model: "models/gemini-2.5-flash",
});

// Функция для определения темы
export async function detectTopic(text: string) {
  try {
    const prompt = `
Классифицируй текст:
BOOKS — если речь о книгах или авторах
OTHER — иначе

Текст: '${text}'
`;

    const res = await topicModel.generateContent(prompt);
    const out = res.response.text().trim().toUpperCase();
    return out === "BOOKS" ? "BOOKS" : "OTHER";
  } catch (err) {
    console.error("Topic detection error:", err);
    return "OTHER"; // при ошибке считаем OTHER
  }
}

// Функция для ответа на вопросы о книгах
export async function answerBooksQuestion(text: string) {
  try {
    const cleanText = text.replace(/["]/g, "'"); // экранируем кавычки
    console.log("Sending to AI:", cleanText);
    const res = await mainModel.generateContent(`
Ты — умный библиотекарь. 
Отвечай ТОЛЬКО о книгах.

Вопрос: ${cleanText}
    `);

    console.log(res);
    return res.response.text();
  } catch (err) {
    console.error("AnswerBooks error:", err);
    return "An error occurred while generating the response.";
  }
}
