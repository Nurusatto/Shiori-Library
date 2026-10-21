import { create } from "zustand";
import type { Message } from "./types";

const initialMessage: Message = {
  id: "initial-message",
  role: "ai",
  text: "✨ Hello! I'm Shiori, an AI library. Nice to meet you! ✨",
};

type AiChatState = {
  messages: Message[];
  addMessage: (message: Message) => void;
  resetMessages: () => void;
};

export const useAiChatStore = create<AiChatState>()((set) => ({
  messages: [initialMessage],
  addMessage: (message) => set((state) => ({ messages: [...state.messages, message] })),
  resetMessages: () => set({ messages: [initialMessage] }),
}));
