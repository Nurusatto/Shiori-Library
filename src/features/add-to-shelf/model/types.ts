export type BookShelf = "reading" | "completed" | "want_to_read" | "dropped";

export type OpenLibraryWork = {
  key: string;
  title: string;
  covers?: number[];
  authors?: Array<{ name: string }>;
  description?: string | { type: string; value: string };
};
