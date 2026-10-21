import { create } from "zustand";
import type { BookInfAlt } from "@/entities/book";

type BookHistoryState = {
  history: BookInfAlt[];
  addBook: (book: BookInfAlt) => void;
};

export const useBookHistory = create<BookHistoryState>()((set) => ({
  history: [],
  addBook: (book) =>
    set((state) => ({
      history: state.history.some((item) => item.key === book.key)
        ? state.history
        : [...state.history, book],
    })),
}));
