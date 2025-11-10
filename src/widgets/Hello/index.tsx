"use client";

import { CatLoader } from "@/shared/ui/CatLoader";
import { useTip } from "./model/query";
import { cn } from "@/shared/lib/cn";
import styles from "./style.module.scss";

export const Hello = () => {
  const { data, isLoading, refetch, isFetching } = useTip();

  return (
    <section className={cn(styles, "Hello__section")}>
      <div className={cn(styles, "Hello__block")}>
        <h1>
          <span className={cn(styles, "Hello__sakura")}>🌸</span>Welcome to
          Shiori Library!
        </h1>
        <h4 className="h4">
          Explore thousands of books and authors. Start your reading journey
          today!
        </h4>
        <span>We only provide book information, not full editions</span>
      </div>
      <div className={cn(styles, "Hello__recom")}>
        {isLoading && <CatLoader />}
        {data && !isFetching && <h2>{data}</h2>}
        {isFetching && <h2>Loading...</h2>}
        <button className={cn(styles, "Hello__btn")} onClick={() => refetch()}>
          Find Another Book
        </button>
      </div>
    </section>
  );
};
