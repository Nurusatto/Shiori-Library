import { useMutation } from "@tanstack/react-query";
import { postMessage } from "./api";

export const useQueryAI = () => {
  return useMutation({
    mutationFn: (message: string) => postMessage(message),
  });
};
