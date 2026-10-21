"use client";

import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Flower2,
  Search,
  Shuffle,
  Sparkles,
  RotateCcw,
} from "lucide-react";
import { useBookRecommendation } from "@/features/book-recommendation";
import styles from "./style.module.scss";
import { useHydrated } from "@/shared/hooks/useHydrated";

export const Hello = () => {
  const { data, isFetching, refetch } = useBookRecommendation();
  const hydrated = useHydrated();

  return (
    <section className={styles.hero} aria-labelledby="welcome-title">
      <div className={styles.heroMain}>
        <div className={styles.copy}>
          <span className={styles.eyebrow}>
            <Flower2 size={16} /> A little curiosity. A whole new world.
          </span>
          <h1 id="welcome-title" className={styles.title}>
            Your next chapter
            <br />
            starts <em>here.</em>
          </h1>
          <p className={styles.description}>
            Old favorites. Unexpected discoveries. Find the stories that stay
            with you, and make a little room for your next great read.
          </p>
          <form action="/search" className={styles.search} role="search">
            <Search size={20} aria-hidden="true" />
            <input
              name="q"
              type="search"
              aria-label="Search books by title"
              placeholder="What would you like to read?"
              required
              minLength={3}
            />
            <button type="submit" aria-label="Find books">
              <ArrowRight size={20} />
            </button>
          </form>
          <p className={styles.hint}>
            A place to discover books, keep your favorites, and get inspired.
          </p>
        </div>
        <div className={styles.art}>
          <span className={styles.orbit} aria-hidden="true" />
          <span className={styles.artCaption}>
            THE JOY OF GETTING LOST IN A BOOK
          </span>
          {/* Карточки книг блять */}
          <button
            className={`${styles.book} ${styles.bookBack}`}
            aria-label="refresh button"
            onClick={() => refetch()}
          >
            <RotateCcw />
          </button>
          <Link
            href={
              data?.key
                ? `/books/${encodeURIComponent(data.key.replace("/works/", ""))}`
                : "/search"
            }
            className={`${styles.book} ${styles.bookFront}`}
            aria-label={data?.title ?? "Discover a book"}
          >
            <span>{data?.authors?.[0]?.name ?? "Discover something new"}</span>
            <strong>{data?.title ?? "A world of stories awaits"}</strong>
            <small>Let your curiosity bloom.</small>
          </Link>

          <span className={styles.artNote}>
            <BookOpen size={16} /> Between pages, possibilities.
          </span>
          <Sparkles
            className={styles.sparkle}
            size={26}
            strokeWidth={1}
            aria-hidden="true"
          />
        </div>
      </div>
      <div className={styles.recommendation}>
        <span className={styles.recommendationLabel}>
          <Sparkles size={17} /> A little serendipity
        </span>
        {data && (
          <p aria-live="polite">
            Shiori recommends a {data?.title} by{" "}
            {data.authors?.[0]?.name ?? "an unknown author"}
          </p>
        )}

        <button
          type="button"
          onClick={() => refetch()}
          disabled={hydrated && isFetching}
        >
          <Shuffle size={16} /> Surprise me
        </button>
      </div>
    </section>
  );
};
