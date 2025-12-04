"use client";

import { BookInf } from "@/entities/book";
import { useBookHistory } from "@/store/useBookHistory";
import { ReactNode } from "react";

export const HistoryProvider = ({
  book,
  children,
}: {
  book: BookInf;
  children: ReactNode;
}) => {
  const addHistory = useBookHistory((book) => book.setHistory);
  addHistory(book);
  return <>{children}</>;
};
