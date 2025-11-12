"use client";

import { useEffect, useState } from "react";
import { InputBlock } from "./InputBlock";
import styles from "./style.module.scss";
import { BookList, useBooksByName } from "@/entities/book";
import { useAuthorByName } from "@/entities/Author";
import { AuthorList } from "@/entities/Author/ui/list";

export const Search = () => {
  const [value, setValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>(value);
  const [placeholder, setPlaceholder] = useState<"books" | "author">("books");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, 400);

    return () => clearTimeout(handler);
  }, [value]);

  const bookQuery = useBooksByName(
    placeholder === "books" && debouncedValue.length >= 3 ? debouncedValue : ""
  );

  const AuthorQuery = useAuthorByName(
    placeholder === "author" && debouncedValue.length >= 3 ? debouncedValue : ""
  );

  return (
    <section className={styles.Search}>
      <InputBlock
        state={value}
        setState={setValue}
        placeholder={placeholder}
        setPlaceholder={setPlaceholder}
      />
      {placeholder === "books" && <BookList query={bookQuery} />}
      {placeholder === "author" && (
        <h2 className={styles.SearchTitle}>Authors (Names Only)</h2>
      )}
      {placeholder === "author" && <AuthorList query={AuthorQuery} />}
    </section>
  );
};
