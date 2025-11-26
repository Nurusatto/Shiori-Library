"use client";

import { useBookHistory } from "@/store/useBookHistory";
import { CardAlt } from "@/entities/book";
import styles from "./style.module.scss";

export const BookHistory = () => {
  const history = useBookHistory.getState().history;

  const noNull = history.length === 0;

  if (noNull) return null;

  return (
    <section className={styles.HistorySection}>
      <h2 className={styles.HistoryTitle}>Viewing History</h2>
      <ul className={styles.HistoryList}>
        {history.map((book) => (
          <CardAlt book={book} key={book.key} />
        ))}
      </ul>
    </section>
  );
};
