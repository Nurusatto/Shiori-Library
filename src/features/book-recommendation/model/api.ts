import { BOOK_GENRES, type BookGenreType } from "@/shared/config/bookGenres";

export type BookRecommendation = {
  key: string;
  title: string;
  authors?: { name: string }[];
  subject?: string[];
};

function getRandomGenre(): BookGenreType {
  const genres = Object.values(BOOK_GENRES);
  return genres[Math.floor(Math.random() * genres.length)];
}

export async function fetchBookRecommendation(): Promise<BookRecommendation | null> {
  const subject = getRandomGenre();
  const response = await fetch(
    `https://openlibrary.org/subjects/${subject.toLowerCase().replace(/\s/g, "_")}.json?limit=5`,
  );
  if (!response.ok) {
    throw new Error("Failed to load a book recommendation");
  }

  const data: { works?: BookRecommendation[] } = await response.json();
  const book = data.works?.[Math.floor(Math.random() * data.works.length)];

  return book ?? null;
}
