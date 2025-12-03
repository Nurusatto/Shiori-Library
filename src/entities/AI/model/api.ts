import type { bookPageAi } from "./type";

export const postMessage = async (text: string) => {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: text }),
  });

  const data = await res.json();
  return data.reply as string;
};

export const postBook = async (info: bookPageAi) => {
  const res = await fetch("/api/bookai", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  });

  if (!res.ok) {
    throw new Error(`Request error: ${res.status}`);
  }
  return res.json();
};
