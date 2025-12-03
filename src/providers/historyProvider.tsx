"use client";

import { BookInf } from "@/entities/book";
import { useBookHistory } from "@/store/useBookHistory";

export const HistoryProvider = ({ book }: { book: BookInf }) => {
  const addHistory = useBookHistory((book) => book.setHistory);
  addHistory(book);
  return null;
};
