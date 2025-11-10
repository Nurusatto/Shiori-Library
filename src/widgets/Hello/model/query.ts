import { useQuery } from "@tanstack/react-query";
import { fetchBookRecom } from "./api";

export const useTip = () => {
  return useQuery({
    queryKey: ["useTip"],
    queryFn: fetchBookRecom,
  });
};
