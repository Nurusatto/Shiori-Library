"use client";

import { useBookHistory } from "@/app/_store/useBookHistory";
import { BookInf } from "@/entities/book";
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
