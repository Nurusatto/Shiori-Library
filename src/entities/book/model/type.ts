export type LibraryResponse = {
  docs: BookItem[];
};

export type BookItem = {
  key: string; //id book
  title: string;
  author_name?: string[];
  cover_i?: number; //id photo book
  language?: string[];
  lending_identifier_s?: string;
  first_publish_year?: number;
  public_scan_b?: boolean;
  ebook_access?: "public" | "borrowable" | "restricted" | "no_ebook";
};

export type BookInf = {
  authors: { author: { key: string }; type: { key: string } }[];
  covers: number[];
  created: { type: string; value: string };
  description: string | { type: string; value: string };
  key: string;
  last_modified: { type: string; value: string };
  latest_revision: number;
  revision: number;
  subjects: string[];
  title: string;
  type: { key: string };
  first_publish_date?: string;
};
