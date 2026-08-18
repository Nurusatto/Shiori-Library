import { SearchMode } from "./type";

export const fetchBooks = async () => {
  const randomPage = Math.floor(Math.random() * 30) + 1;

  const res = await fetch(
    `https://openlibrary.org/search.json?q=programming&limit=10&page=${randomPage}`,
  );

  const data = await res.json();
  return data;
};

export const getBookByName = async (title: string, type: SearchMode = "q") => {
  const param = type === "subject" ? "subject" : "title";

  const res = await fetch(
    `https://openlibrary.org/search.json?${param}=${encodeURIComponent(title)}&limit=20`,
  );

  if (!res.ok) throw new Error("Ошибка запроса к Open Library");
  return res.json();
};

export const getAuthorByName = async (name: string) => {
  const res = await fetch(
    `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(name)}&limit=20`,
  );

  if (!res.ok) throw new Error("Ошибка запроса авторов");
  return res.json();
};
