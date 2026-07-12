import { useQuery } from "@tanstack/react-query";
import { fetchBookRecommendation } from "./api";

export const useBookRecommendation = () =>
  useQuery({ queryKey: ["book-recommendation"], queryFn: fetchBookRecommendation });
