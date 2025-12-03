"use client";

import { BookInf } from "@/entities/book";
import { useBookAi } from "@/entities/AI";
import { useEffect } from "react";
import styles from "./style.module.scss";
import { LoadingDots } from "@/shared/ui/DotLoader";
import Link from "next/link";

type Prop = {
  bookObj: BookInf;
};

export const BookAI = ({ bookObj }: Prop) => {
  const { data, isPending, mutate } = useBookAi();
  useEffect(() => {
    mutate({ key: bookObj.key, title: bookObj.title });
  }, [bookObj.title, bookObj.key, mutate]);

  return (
    <section className={styles.BookAiInner} id="AI">
      <div className={styles.BookUser}>
        <span className={styles.BookWrap}>
          Shiori, Tell me a little about the book.
        </span>
      </div>
      <div className={styles.BookAI}>
        {data && (
          <span>
            {data.info}{" "}
            <Link href="/AI" className={styles.BookLink}>
              Yes
            </Link>
          </span>
        )}
        {isPending && <LoadingDots />}
      </div>
    </section>
  );
};
