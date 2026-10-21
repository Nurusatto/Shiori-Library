"use client";

import { useEffect } from "react";
import type { BookInf } from "@/entities/book";
import { useBookHistory } from "../model/store";

export const BookHistoryTracker = ({ book }: { book: BookInf }) => {
  const addBook = useBookHistory((state) => state.addBook);

  useEffect(() => {
    addBook(book);
  }, [addBook, book]);

  return null;
};
