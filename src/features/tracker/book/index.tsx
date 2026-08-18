"use client";

import { useEffect } from "react";
import { batchLogger } from "@/shared/utils/batcher";
import { useUserStore } from "@/app/_store/useUserStore";

interface Props {
  bookId: string;
  title?: string;
  covers?: number[];
}

export const BookTracker = ({ bookId, title, covers }: Props) => {
  const { auth } = useUserStore();

  useEffect(() => {
    if (auth?.id && bookId) {
      batchLogger.log("book_view", { book_id: bookId, title, covers }, auth.id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookId, auth?.id]);

  return null;
};
