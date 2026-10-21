"use client";

import { BookInf } from "@/entities/book";
import { useBookSummary } from "@/features/ai-chat";
import { useEffect } from "react";
import styles from "./style.module.scss";
import { LoadingDots } from "@/shared/ui/DotLoader";
import Link from "next/link";
import { useUserStore } from "@/app/_store/useUserStore";

type Prop = {
  bookObj: BookInf;
};

export const BookAI = ({ bookObj }: Prop) => {
  const { status } = useUserStore();
  const isAuthenticated = status === "authenticated";
  const { data, isPending, mutate, isError, error } = useBookSummary();
  useEffect(() => {
    if (!isAuthenticated || !bookObj.key) return;

    mutate({ key: bookObj.key, title: bookObj.title });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bookObj.title, bookObj.key, isAuthenticated, status]);

  return (
    <section className={styles.BookAiInner} id="AI">
      <div className={styles.BookUser}>
        <span className={styles.BookWrap}>
          Shiori, Tell me a little about the book.
        </span>
      </div>
      <div className={styles.BookAI}>
        {!isAuthenticated && (
          <span>
            I’m Shiori. I won’t speak with unauthenticated users. Please log in
            or create an account to talk to me.
          </span>
        )}
        {data && (
          <span>
            {data.info}{" "}
            <Link href="/AI" className={styles.BookLink}>
              Yes
            </Link>
          </span>
        )}
        {isPending && <LoadingDots />}
        {isError && (
          <span className={styles.ErrorText}>
            {error?.message === "QUOTA_EXCEEDED"
              ? "API tokens depleted. Please try again later."
              : "An error occurred while loading book information."}
          </span>
        )}
      </div>
    </section>
  );
};
