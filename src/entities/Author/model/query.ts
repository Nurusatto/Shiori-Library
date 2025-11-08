import { useQueries } from "@tanstack/react-query";
import { getAuthor } from "./api";

export const useAuthors = (authorKeys: string[]) => {
  return useQueries({
    queries: authorKeys.map((key) => ({
      queryKey: ["getAuthor", key],
      queryFn: () => getAuthor(key),
      enabled: !!key,
    })),
  });
};
