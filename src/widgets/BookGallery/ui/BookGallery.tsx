"use client";

import { BookList, useBooks } from "@/entities/book";

import styles from "./style.module.scss";
import { cn } from "@/shared/lib/cn";
import { RotateCcw } from "lucide-react";
import clsx from "clsx";
import { CatLoader } from "@/shared/ui/CatLoader";

export const BookGallery = () => {
  const query = useBooks();

  if (query.isLoading) return <CatLoader />;

  return (
    <>
      <section className={cn(styles, "Gallery__wrap")}>
        <h1 className={cn(styles, "Gallery-title")}>Random Books</h1>
        <RotateCcw
          onClick={() => query.refetch()}
          className={clsx(
            cn(styles, "Gallery-svg"),
            query.isFetching && cn(styles, "spinning")
          )}
        />
      </section>
      <BookList query={query} />
    </>
  );
};
