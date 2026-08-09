import type { BookShelf } from "@/features/add-to-shelf";

export const BOOK_SHELF_OPTIONS: { label: string; value: BookShelf }[] = [
  { label: "Currently Reading", value: "reading" },
  { label: "Want to Read", value: "want_to_read" },
  { label: "Completed", value: "completed" },
  { label: "Dropped", value: "dropped" },
] as const;
