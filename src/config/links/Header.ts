export const LINKS = [
  { name: "Home", path: "/" },
  { name: "Search", path: "/search" },
  { name: "Filter", path: "/filter" },
] as const;

export type BookFilterType = (typeof LINKS)[number]["name"];
