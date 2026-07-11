import { notFound } from "next/navigation";

//modules
import { HistoryProvider } from "@/app/_providers/historyProvider";
import type { Metadata } from "next";
import { BookPage } from "./bookPage";

export const metadata: Metadata = {
  title: "Book",
  description: "Book page",
};

export default async function Book(props: { params: Promise<{ id: string }> }) {
  const { id } = await props.params; // здесь await обязателен

  const res = await fetch(`https://openlibrary.org/works/${id}.json`, {
    next: { revalidate: 3600 }, // кэшируем
  });

  if (!res.ok) return notFound();

  const book = await res.json();

  return (
    <HistoryProvider book={book}>
      <BookPage bookObj={book} />
    </HistoryProvider>
  );
}
