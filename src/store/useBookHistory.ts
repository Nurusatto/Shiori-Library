import { BookInfAlt } from "@/entities/book";
import { create } from "zustand";

type stateManager = {
  history: BookInfAlt[];
  setHistory: (book: BookInfAlt) => void;
};

export const useBookHistory = create<stateManager>()((set) => ({
  history: [],

  setHistory: (book) =>
    set((state) => ({
      history: state.history.some((b) => b.key === book.key)
        ? state.history
        : [...state.history, book],
    })),
}));
