import { create } from "zustand";
import { Message } from "@/entities/AI";

type ChatState = {
  messages: Message[];
  addMessage: (msg: Message) => void;
  clearMessages: () => void;
};

export const useBookHistory = create<ChatState>()((set) => ({
  messages: [
    {
      id: "First Message",
      role: "ai",
      text: "✨ Hello! I'm Shiori, an AI library. Nice to meet you! ✨",
    },
  ],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),
}));
