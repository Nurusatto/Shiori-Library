"use client";

import { BookList, useBooks } from "@/entities/book";

import styles from "./style.module.scss";
import { RotateCcw } from "lucide-react";
import clsx from "clsx";
import { CatLoader } from "@/shared/ui/CatLoader";

export const BookGallery = () => {
  const query = useBooks();

  if (query.isLoading) return <CatLoader />;

  return (
    <>
      <section className={styles.GalleryWrap}>
        <h1 className={styles.GalleryTitle}>Random Books</h1>
        <RotateCcw
          onClick={() => query.refetch()}
          className={clsx(
            styles.GallerySvg,
            query.isFetching && styles.spinning
          )}
        />
      </section>
      <BookList query={query} />
    </>
  );
};
