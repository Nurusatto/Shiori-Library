"use client";

import { CatLoader } from "@/shared/ui/CatLoader";
import { useTip } from "./model/query";
import styles from "./style.module.scss";

export const Hello = () => {
  const { data, isLoading, refetch, isFetching } = useTip();

  return (
    <section className={styles.HelloSection}>
      <div className={styles.HelloBlock}>
        <h1>
          <span className={styles.HelloSakura}>🌸</span>Welcome to Shiori
          Library!
        </h1>
        <h4 className="h4">
          Explore thousands of books and authors. Start your reading journey
          today!
        </h4>
        <span>We only provide book information, not full editions</span>
      </div>
      <div className={styles.HelloRecom}>
        {isLoading && <CatLoader />}
        {data && !isFetching && <h2>{data}</h2>}
        {isFetching && <h2>Loading...</h2>}
        <button className={styles.HelloBtn} onClick={() => refetch()}>
          Find Another Book
        </button>
      </div>
    </section>
  );
};
