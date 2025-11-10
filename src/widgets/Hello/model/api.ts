import { BOOK_GENRES, type BookGenreType } from "@/config/links/genres";

function getRandomGenre(): BookGenreType {
  const genres = Object.values(BOOK_GENRES);
  const randomIndex = Math.floor(Math.random() * genres.length);
  return genres[randomIndex];
}

export async function fetchBookRecom() {
  try {
    const subject = getRandomGenre();
    const res = await fetch(
      `https://openlibrary.org/subjects/${subject
        .toLowerCase()
        .replace(/\s/g, "_")}.json?limit=50`
    );
    const data = await res.json();

    if (!data.works || data.works.length === 0) {
      return "Explore our library to find your next favorite book!";
    }

    const randomIndex = Math.floor(Math.random() * data.works.length);
    const book = data.works[randomIndex];
    const title = book.title;
    const author =
      (book.authors && book.authors[0] && book.authors[0].name) ||
      "Unknown Author";

    return `We recommend reading '${title}' by ${author} from the ${subject} genre!`;
  } catch (err) {
    console.error(err);
    return "Explore our library to find your next favorite book!";
  }
}
