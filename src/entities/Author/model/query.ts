import { useQueries, useQuery } from "@tanstack/react-query";
import { getAuthor, getAuthorByName } from "./api";

export const useAuthors = (authorKeys: string[]) => {
  return useQueries({
    queries: authorKeys.map((key) => ({
      queryKey: ["getAuthor", key],
      queryFn: () => getAuthor(key),
      enabled: !!key,
    })),
  });
};

export const useAuthorByName = (name: string) => {
  return useQuery({
    queryKey: ["getAuthorByName", name],
    queryFn: ({ queryKey }) => {
      const value = queryKey[1];
      return getAuthorByName(value);
    },
    enabled: !!name,
  });
};
