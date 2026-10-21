"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { InputBlock } from "./InputBlock";
import { BookList, useBooksByName } from "@/entities/book";
import { AuthorList, useAuthorByName } from "@/entities/Author"; // Подключаем сущность автора
import type { SearchMode } from "@/entities/book/model/type";
import styles from "./style.module.scss";
import { SearchTracker } from "@/features/tracker/search";

export const Search = () => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const qParam = searchParams.get("q") || "";
  const authorParam = searchParams.get("author") || "";
  const subjectParam = searchParams.get("subject") || "";

  const initialMode: SearchMode = subjectParam
    ? "subject"
    : authorParam
      ? "author"
      : "q";
  const initialValue = subjectParam || authorParam || qParam;

  const [value, setValue] = useState<string>(initialValue);
  const [debouncedValue, setDebouncedValue] = useState<string>(initialValue);
  const [mode, setMode] = useState<SearchMode>(initialMode);

  useEffect(() => {
    if (subjectParam) {
      setValue(subjectParam);
      setMode("subject");
    } else if (authorParam) {
      setValue(authorParam);
      setMode("author");
    } else if (qParam) {
      setValue(qParam);
      setMode("q");
    }
  }, [subjectParam, authorParam, qParam]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);

      const params = new URLSearchParams(window.location.search);
      params.delete("q");
      params.delete("author");
      params.delete("subject");

      if (value.trim()) {
        params.set(mode, value);
      }

      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;
      window.history.replaceState(null, "", newUrl);
    }, 400);

    return () => clearTimeout(handler);
  }, [value, mode, pathname]);

  const bookQuery = useBooksByName({
    query:
      mode !== "author" && debouncedValue.length >= 3 ? debouncedValue : "",
    type: mode === "author" ? "q" : mode,
  });

  const authorQuery = useAuthorByName(
    mode === "author" && debouncedValue.length >= 3 ? debouncedValue : "",
  );

  return (
    <>
      <SearchTracker query={debouncedValue} searchType={mode} />
      <section className={styles.Search}>
        <InputBlock
          state={value}
          setState={setValue}
          mode={mode}
          setMode={setMode}
        />

        {mode === "author" ? (
          <AuthorList query={authorQuery} />
        ) : (
          <BookList query={bookQuery} />
        )}
      </section>
    </>
  );
};
