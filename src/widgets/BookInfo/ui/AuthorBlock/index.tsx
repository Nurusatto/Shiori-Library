"use client";
import { useAuthors } from "@/entities/Author/model/query";
import { AuthorObj } from "@/entities/Author/index";
import { AuthorCard } from "@/entities/Author/ui/card";

import styles from "./style.module.scss";
import { CatLoader } from "@/shared/ui/CatLoader";
import clsx from "clsx";

type AuthorBlockProps = {
  authors: AuthorObj[];
};

export const AuthorBlock = ({ authors }: AuthorBlockProps) => {
  const authorKeys = authors.map((a) => a.author.key);
  const authorQueries = useAuthors(authorKeys);
  const isSingleAuthor = authors.length === 1;

  if (authorQueries.some((q) => q.isLoading)) {
    return <CatLoader />;
  }

  const authorsData = authorQueries
    .map((q) => q.data)
    .filter((d): d is NonNullable<typeof d> => !!d);

  if (authorsData.length === 0 || authorQueries.some((q) => q.isError)) {
    return null;
  }

  return (
    <div className={styles.AuthorBlock} id="author">
      <div className={styles.AuthorTitle}>
        <div className={styles.AuthorLine}></div>
        <h2>{authors.length === 1 ? "Author" : "Authors"}</h2>
        <div className={styles.AuthorLine}></div>
      </div>
      <ul
        className={clsx(styles.AuthorList, isSingleAuthor && styles.isSingle)}
      >
        {authorQueries.map((query) => {
          return <AuthorCard obj={query.data} key={query.data.key} />;
        })}
      </ul>
    </div>
  );
};
