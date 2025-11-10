"use client";

import { BookItem, LibraryResponse } from "@/entities/book/model/type";
import { BookCard } from "@/entities/book/ui/card/BookCard";
import { UseQueryResult } from "@tanstack/react-query";

import styles from "./style.module.scss";
import { cn } from "@/shared/lib/cn";
import clsx from "clsx";

type Prop = {
  query: UseQueryResult<LibraryResponse, unknown>;
  position?: "row" | "column";
};

export const BookList = ({ query, position = "column" }: Prop) => {
  const { data } = query;
  const pos = position === "row";

  return (
    <section className={cn(styles, "Book")}>
      <ul className={clsx(cn(styles, "Book-list"), pos && cn(styles, "row"))}>
        {data?.docs?.map((book: BookItem) => (
          <BookCard key={book.key} book={book} />
        ))}
      </ul>
    </section>
  );
};
