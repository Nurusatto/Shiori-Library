"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBooks, getBookByName } from "./api";

import type { LibraryResponse } from "./type";

export const useBooks = () => {
  return useQuery<LibraryResponse>({
    queryKey: ["booksGallery"],
    queryFn: () => fetchBooks(),
    staleTime: 1000 * 60 * 5,
    // suspense: true,
  });
};

export const useBooksByName = (title: string) => {
  return useQuery({
    queryKey: ["getBooksByName", title],
    queryFn: ({ queryKey }) => {
      const value = queryKey[1];
      return getBookByName(value);
    },
    enabled: !!title,
  });
};
