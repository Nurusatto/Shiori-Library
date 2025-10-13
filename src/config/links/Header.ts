export const BOOK_FILTERS = {
  SEARCH: "Search",
  FILTER: "Filter",
  PROFILE: "Profile",
  COLLECTION: "Collection",
} as const;

export type BookFilterType = (typeof BOOK_FILTERS)[keyof typeof BOOK_FILTERS];
