"use client";

import { useEffect } from "react";
import { batchLogger } from "@/shared/utils/batcher";
import { useUserStore } from "@/app/_store/useUserStore";

interface Props {
  query: string;
  searchType?: string;
}

export const SearchTracker = ({ query, searchType }: Props) => {
  const { auth } = useUserStore();
  console.log(
    "SearchTracker rendered with query:",
    query,
    "and searchType:",
    searchType,
  );
  useEffect(() => {
    // Логируем только если поисковая строка не пустая и содержит хотя бы 3 символа
    if (auth?.id && query.trim().length >= 3) {
      batchLogger.log(
        "search",
        { query: query.trim(), search_type: searchType },
        auth.id,
      );
    }
  }, [query, auth?.id, searchType]);

  return null;
};
