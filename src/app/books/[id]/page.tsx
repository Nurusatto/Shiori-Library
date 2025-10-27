// "use client";

import { notFound } from "next/navigation";

//modules
import { BookPage } from "@/pages/book";

export default async function Book({ params }: { params: { id: string } }) {
  const res = await fetch(`https://openlibrary.org/works/${params.id}.json`);
  if (!res.ok) return notFound();
  const book = await res.json();

  console.log(book);

  return <BookPage bookObj={book} />;
}
