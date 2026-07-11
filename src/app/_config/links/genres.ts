export const BOOK_GENRES = {
  FANTASY: "Fantasy",
  SCI_FI: "Science Fiction",
  MYSTERY: "Mystery",
  THRILLER: "Thriller",
  HORROR: "Horror",
  ROMANCE: "Romance",
  HISTORICAL: "Historical Fiction",
  YA: "Young Adult",
  CHILDREN: "Children",
  BIOGRAPHY: "Biography",
  SELF_HELP: "Self-Help",
  TRUE_CRIME: "True Crime",
  HISTORY: "History",
  SCIENCE: "Science",
  TRAVEL: "Travel",
  PHILOSOPHY: "Philosophy",
  PSYCHOLOGY: "Psychology",
  BUSINESS: "Business",
} as const;

export type BookGenreType = (typeof BOOK_GENRES)[keyof typeof BOOK_GENRES];
