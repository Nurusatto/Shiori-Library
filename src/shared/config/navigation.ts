import type { LucideIcon } from "lucide-react";
import { Book, BrainCircuit, House } from "lucide-react";

export const HEADER_LINKS: ReadonlyArray<{
  name: string;
  path: string;
  icon: LucideIcon;
}> = [
  { name: "Home", path: "/", icon: House },
  { name: "Search", path: "/search", icon: Book },
  { name: "AI", path: "/AI", icon: BrainCircuit },
];

export const BOOK_PAGE_LINKS = [
  { name: "Info", href: "#info" },
  { name: "Author", href: "#author" },
  { name: "Gallery", href: "#covers" },
  { name: "AI", href: "#AI" },
] as const;

export const DROP_MENU_LINKS: {
  id: string;
  label: string;
  href?: string;
  isAction?: boolean;
}[] = [
  { id: "profile", label: "Profile", href: "/profile" },
  { id: "settings", label: "Settings", href: "/settings" },
  { id: "logout", label: "Log out", isAction: true },
] as const;
