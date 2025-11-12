export const getAuthor = async (authorKey: string) => {
  const res = await fetch(`https://openlibrary.org${authorKey}.json`);
  if (!res.ok) throw new Error(`Failed to fetch author: ${res.status}`);
  return res.json();
};

export const getAuthorByName = async (name: string) => {
  const res = await fetch(
    `https://openlibrary.org/search/authors.json?q=${encodeURIComponent(
      name
    )}&limit=20`
  );
  if (!res.ok) throw new Error("Ошибка запроса к Open Library");
  const data = await res.json();
  return data;
};
