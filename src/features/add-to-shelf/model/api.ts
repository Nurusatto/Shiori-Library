import { BookInf } from "@/entities/book";
import { BookShelf } from "./types";

export async function addToShelf({
  book,
  shelf,
}: {
  book: BookInf;
  shelf: BookShelf;
}) {
  const res = await fetch("/api/user-books", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ book, shelf }),
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Failed to add book");

  return data;
}
