export const fetchBooks = async () => {
  const randomPage = Math.floor(Math.random() * 30) + 1;

  const res = await fetch(
    `https://openlibrary.org/search.json?q=programming&limit=10&page=${randomPage}`
  );

  const data = await res.json();
  return data;
};

export const getBookByName = async (title: string) => {
  const res = await fetch(
    `https://openlibrary.org/search.json?title=${encodeURIComponent(
      title
    )}&limit=20`
  );
  if (!res.ok) throw new Error("Ошибка запроса к Open Library");
  const data = await res.json();
  return data;
};
