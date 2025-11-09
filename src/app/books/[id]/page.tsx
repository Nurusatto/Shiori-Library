// "use client";

import { notFound } from "next/navigation";

//modules
import { BookPage } from "@/pages/book";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book",
  description: "Book page",
};

export default async function Book({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`https://openlibrary.org/works/${id}.json`);
  if (!res.ok) return notFound();
  const book = await res.json();
  console.log(book);

  return <BookPage bookObj={book} />;
}
