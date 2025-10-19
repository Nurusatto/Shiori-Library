import type { LucideIcon } from "lucide-react";

import { Book, BookOpenText, House } from "lucide-react";

interface props {
  name: string;
  path: string;
  icon: LucideIcon;
}

export const LINKS: props[] = [
  { name: "Home", path: "/", icon: House },
  { name: "Search", path: "/search", icon: Book },
  { name: "Filter", path: "/filter", icon: BookOpenText },
] as const;

export type BookFilterType = (typeof LINKS)[number]["name"];
