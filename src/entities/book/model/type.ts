export type LibraryResponse = {
  docs: BookItem[];
};

export type AuthorRef = {
  key: string;
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
  first_publish_date?: string;
  key: string;
  title: string;
  subjects?: string[];
  covers?: number[];
  authors?: AuthorRef[];
};
