import { useMutation } from "@tanstack/react-query";
import { postBookSummary, postMessage } from "./api";

export const useAskAi = () => useMutation({ mutationFn: postMessage });
export const useBookSummary = () => useMutation({ mutationFn: postBookSummary });
