import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToShelf } from "./api";
import { toast } from "sonner";
import { BookShelf } from "./types";

const shelfLabels: Record<BookShelf, string> = {
  want_to_read: "Want to Read",
  reading: "Currently Reading",
  completed: "Completed",
  dropped: "Dropped",
};

export const useUserBook = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToShelf,
    onSuccess: (data, variables) => {
      // 1. Инвалидируем список всех книг юзера
      queryClient.invalidateQueries({ queryKey: ["user-books"] });

      // 2. Инвалидируем статус конкретной книги по ее openlibrary key
      queryClient.invalidateQueries({
        queryKey: ["book-status", variables.book.key],
      });

      const shelfName = shelfLabels[variables.shelf];

      toast.success(`Moved to "${shelfName}"!`);
    },
    onError: (error) => {
      console.log(error.message || "Failed to save book");
      toast.error("Failed to save book. Please try again.");
    },
  });
};
