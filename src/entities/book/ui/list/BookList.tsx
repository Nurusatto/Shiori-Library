"use client";

import { BookItem, LibraryResponse } from "@/entities/book/model/type";
import { BookCard } from "@/entities/book/ui/card/BookCard";
import { UseQueryResult } from "@tanstack/react-query";

import styles from "./style.module.scss";
import { cn } from "@/shared/lib/cn";

type Prop = {
  query: UseQueryResult<LibraryResponse, unknown>;
};

export const BookList = ({ query }: Prop) => {
  const { data } = query;

  return (
    <section className={cn(styles, "Book")}>
      <ul className={cn(styles, "Book-list")}>
        {data?.docs?.map((book: BookItem) => (
          <BookCard key={book.key} book={book} />
        ))}
      </ul>
    </section>
  );
};
