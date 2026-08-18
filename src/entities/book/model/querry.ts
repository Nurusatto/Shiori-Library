"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBooks, getAuthorByName, getBookByName } from "./api";

import type { LibraryResponse, SearchInput } from "./type";

export const useBooks = () => {
  return useQuery<LibraryResponse>({
    queryKey: ["booksGallery"],
    queryFn: () => fetchBooks(),
    staleTime: 1000 * 60 * 5,
    // Отключаем фоновый перезапрос при повторном монтировании компонента
    refetchOnMount: false,

    // Отключаем перезапрос при возврате фокуса на вкладку браузера
    refetchOnWindowFocus: false,

    // Отключаем перезапрос при восстановлении подключения к интернету
    refetchOnReconnect: false,
  });
};

export const useBooksByName = (input: SearchInput) => {
  const query = typeof input === "string" ? input : input.query;
  const type = typeof input === "object" ? (input.type ?? "q") : "q";

  return useQuery({
    queryKey: ["getBooksByName", query, type],
    queryFn: () => getBookByName(query, type),
    enabled: !!query,
  });
};

export const useAuthorByName = (name: string) => {
  return useQuery({
    queryKey: ["getAuthorByName", name],
    queryFn: () => getAuthorByName(name),
    enabled: !!name,
  });
};
