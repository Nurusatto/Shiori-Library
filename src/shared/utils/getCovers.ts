// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getCover = (book: any) => {
  if (book.cover_i) return book.cover_i;
  if (book.covers?.length) return book.covers[0];
  return null;
};
