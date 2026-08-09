import { BOOK_GENRES, type BookGenreType } from "@/shared/config/bookGenres";

function getRandomGenre(): BookGenreType {
  const genres = Object.values(BOOK_GENRES);
  return genres[Math.floor(Math.random() * genres.length)];
}

export async function fetchBookRecommendation() {
  const subject = getRandomGenre();
  const response = await fetch(
    `https://openlibrary.org/subjects/${subject.toLowerCase().replace(/\s/g, "_")}.json?limit=5`,
  );
  const data = await response.json();
  const book = data.works?.[Math.floor(Math.random() * data.works.length)];

  if (!book) return "Explore our library to find your next favorite book!";

  return `We recommend reading '${book.title}' by ${book.authors?.[0]?.name ?? "Unknown Author"} from the ${subject} genre!`;
}
