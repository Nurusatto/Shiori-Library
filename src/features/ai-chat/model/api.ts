import type { BookAiRequest } from "./types";

export async function postMessage(text: string) {
  const response = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });
  const data = await response.json();
  return data.reply as string;
}

export async function postBookSummary(info: BookAiRequest) {
  const response = await fetch("/api/bookai", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(info),
  });
  if (!response.ok) throw new Error(`Request error: ${response.status}`);
  return response.json() as Promise<{ info: string }>;
}
