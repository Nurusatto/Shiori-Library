export const getAuthor = async (authorKey: string) => {
  const res = await fetch(`https://openlibrary.org${authorKey}.json`);
  if (!res.ok) throw new Error(`Failed to fetch author: ${res.status}`);
  return res.json();
};
