"use client";

import { useQuery } from "@tanstack/react-query";
import { fetchBooks } from "./api";

import type { LibraryResponse } from "./type";

export const useBooks = () => {
  return useQuery<LibraryResponse>({
    queryKey: ["booksGallery"],
    queryFn: () => fetchBooks(),
    staleTime: 1000 * 60 * 5,
    // suspense: true,
  });
};
