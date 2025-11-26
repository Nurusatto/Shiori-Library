"use client";

import { BookInf } from "@/entities/book";
import { useBookHistory } from "@/store/useBookHistory";

export const HistoryProvider = ({ book }: { book: BookInf }) => {
  const addHistory = useBookHistory((book) => book.setHistory);
  const history = useBookHistory.getState();
  addHistory(book);
  console.log(history);
  return null;
};
