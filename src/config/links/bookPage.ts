interface props {
  name: string;
  href: string;
}

export const LINKS: props[] = [
  { name: "Author", href: "#author" },
  { name: "Slider", href: "#covers" },
  { name: "AI", href: "#AI" },
] as const;

export type BookFilterType = (typeof LINKS)[number]["name"];
