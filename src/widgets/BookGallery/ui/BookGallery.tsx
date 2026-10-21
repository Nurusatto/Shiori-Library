"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, RotateCcw } from "lucide-react";
import { useBooks, useBooksByName } from "@/entities/book";
import type { BookItem } from "@/entities/book/model/type";
import { getCover } from "@/shared/utils/getCovers";
import styles from "./style.module.scss";

const genres = [
  "Discover",
  "Fantasy",
  "Mystery",
  "Science Fiction",
  "Romance",
  "Philosophy",
];

export const BookGallery = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mount query-dependent controls only after hydration has completed.
  if (!mounted) {
    return (
      <section className={styles.gallery} aria-label="Loading books" aria-busy="true">
        <div className={styles.grid} role="status" aria-label="Loading books">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={styles.skeleton}>
              <div />
              <span />
              <span />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return <BookGalleryContent />;
};

const BookGalleryContent = () => {
  const [genre, setGenre] = useState("Discover");
  const discoveries = useBooks();
  const byGenre = useBooksByName({
    query: genre === "Discover" ? "" : genre,
    type: "subject",
  });
  const query = genre === "Discover" ? discoveries : byGenre;
  const isPending = query.isPending;
  const isBusy = isPending || query.isFetching;
  const books: BookItem[] = query.data?.docs?.slice(0, 10) ?? [];

  return (
    <section
      className={styles.gallery}
      aria-labelledby="discover-title"
      aria-busy={isBusy}
    >
      <div className={styles.heading}>
        <div>
          <span className={styles.eyebrow}>YOUR NEXT GREAT READ</span>
          <h2 id="discover-title">A shelf full of possibilities</h2>
          <p>Follow your curiosity. See where it takes you.</p>
        </div>
        <Link href="/search" className={styles.browse}>
          Explore the library <ArrowRight size={16} />
        </Link>
      </div>
      <div className={styles.toolbar}>
        <div
          className={styles.filters}
          role="group"
          aria-label="Filter books by genre"
        >
          {genres.map((item) => (
            <button
              type="button"
              key={item}
              aria-pressed={genre === item}
              onClick={() => setGenre(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <button
          type="button"
          className={styles.refresh}
          onClick={() => query.refetch()}
          disabled={isBusy}
          aria-label="Refresh book selection"
        >
          <RotateCcw
            size={16}
            className={isBusy ? styles.spinning : undefined}
          />
          <span>Shuffle</span>
        </button>
      </div>
      {isPending ? (
        <div className={styles.grid} role="status" aria-label="Loading books">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className={styles.skeleton}>
              <div />
              <span />
              <span />
            </div>
          ))}
        </div>
      ) : query.isError ? (
        <div className={styles.empty} role="status">
          <BookOpen size={30} />
          <h3>The shelf is taking a moment.</h3>
          <p>We couldn’t load the books. Give it another try.</p>
          <button type="button" onClick={() => query.refetch()}>
            Try again <RotateCcw size={15} />
          </button>
        </div>
      ) : books.length === 0 ? (
        <div className={styles.empty}>
          <BookOpen size={30} />
          <h3>No books on this shelf yet.</h3>
          <p>Try another genre to find something new.</p>
        </div>
      ) : (
        <ul className={styles.grid}>
          {books.map((book, index) => {
            const rawCover = getCover(book);
            const cover = Array.isArray(rawCover) ? rawCover[0] : rawCover;
            return (
              <li key={book.key} className={styles.card}>
                <Link
                  href={`/books/${book.key.replace("/works/", "")}`}
                  className={styles.bookLink}
                >
                  <div className={styles.coverWell} data-tone={index % 5}>
                    {cover ? (
                      <Image
                        src={`https://covers.openlibrary.org/b/id/${cover}-M.jpg`}
                        alt={`${book.title} book cover`}
                        width={144}
                        height={216}
                        className={styles.cover}
                        unoptimized
                      />
                    ) : (
                      <div className={styles.fallback}>
                        <BookOpen size={24} strokeWidth={1} />
                        <span>{book.title}</span>
                        <small>
                          {book.author_name?.[0] || "Unknown author"}
                        </small>
                      </div>
                    )}
                    <span className={styles.openBook} aria-hidden="true">
                      <ArrowRight size={17} />
                    </span>
                  </div>
                  <div className={styles.bookInfo}>
                    <h3>{book.title}</h3>
                    <p>{book.author_name?.[0] || "Unknown author"}</p>
                    {book.first_publish_year && (
                      <span>{book.first_publish_year}</span>
                    )}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};
