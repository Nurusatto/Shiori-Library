import { notFound } from "next/navigation";
import { BookHistoryTracker } from "@/features/book-history";
import type { Metadata } from "next";
import { BookPage } from "./bookPage";

export const metadata: Metadata = {
  title: "Book",
  description: "Book page",
};

export default async function Book(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  if (!id || id === "undefined") {
    return notFound();
  }

  let res: Response;

  try {
    res = await fetch(`https://openlibrary.org/works/${id}.json`, {
      headers: {
        "User-Agent": "MyBookApp/1.0 (shiori library)",
        Accept: "application/json",
      },
      redirect: "follow",
      next: { revalidate: 3600 },
    });
  } catch (error) {
    console.error(`Network error while fetching book ${id}:`, error);
    return notFound();
  }

  if (!res.ok) {
    return notFound();
  }

  const book = await res.json();

  return (
    <>
      <BookHistoryTracker book={book} />
      <BookPage bookObj={book} />
    </>
  );
}
