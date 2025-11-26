import type { LucideIcon } from "lucide-react";

import { Book, BrainCircuit, House } from "lucide-react";

interface props {
  name: string;
  path: string;
  icon: LucideIcon;
}

export const LINKS: props[] = [
  { name: "Home", path: "/", icon: House },
  { name: "Search", path: "/search", icon: Book },
  { name: "AI", path: "/AI", icon: BrainCircuit },
] as const;

export type BookFilterType = (typeof LINKS)[number]["name"];
