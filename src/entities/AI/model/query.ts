import { useMutation } from "@tanstack/react-query";
import { postMessage, postBook } from "./api";
import type { bookPageAi } from "./type";

export const useQueryAI = () => {
  return useMutation({
    mutationFn: (message: string) => postMessage(message),
  });
};

export const useBookAi = () => {
  return useMutation({
    mutationFn: (info: bookPageAi) => postBook(info),
  });
};
