import { useQuery } from "@tanstack/react-query";
import { getAuthor } from "./api";
import { AuthorData } from "./types";

export const useAuthor = (authorKey: string) => {
  return useQuery<AuthorData>({
    queryKey: ["getAuthor"],
    queryFn: () => getAuthor(authorKey),
    enabled: !!authorKey,
  });
};
