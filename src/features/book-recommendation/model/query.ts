import { useQuery } from "@tanstack/react-query";
import { fetchBookRecommendation } from "./api";

export const useBookRecommendation = () =>
  useQuery({
    queryKey: ["book-recommendation"],
    queryFn: fetchBookRecommendation,
    staleTime: 1000 * 60 * 5,

    // 2. Запрещаем автоматически перезапрашивать при повторном монтировании
    refetchOnMount: false,

    // 3. Запрещаем перезапрос при фокусе вкладки (рекомендуется)
    refetchOnWindowFocus: false,
  });
