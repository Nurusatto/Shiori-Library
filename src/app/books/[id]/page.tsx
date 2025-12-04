import { notFound } from "next/navigation";

//modules
import { BookPage } from "./bookPage";
import type { Metadata } from "next";
import { HistoryProvider } from "@/providers/historyProvider";

export const metadata: Metadata = {
  title: "Book",
  description: "Book page",
};

export default async function Book(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params;

  let book;
  try {
    const res = await fetch(`https://openlibrary.org/works/${id}.json`);
    if (!res.ok) return notFound();
    book = await res.json();
  } catch (e) {
    console.error(e);
    return notFound();
  }

  return (
    <HistoryProvider book={book}>
      <BookPage bookObj={book} />
    </HistoryProvider>
  );
}
