export type AuthorData = {
  id: number;
  name: string;
  bio?: string | { value: string };
  birth_date?: string;
  death_date?: string;
  photos?: number[];
  personal_name: string;
  key: string;
};

export type AuthorDataAlt = {
  name: string;
  alternate_names: string[];
  birth_date: string;
  death_date: string;
  top_subjects: string[];
  key: string;
};

export type AuthorResponse = {
  docs: AuthorDataAlt[];
  numFound: number;
  numFoundExact: boolean;
  start: number;
};

export type AuthorObj = {
  author: {
    key: string;
  };
  type: {
    key: string;
  };
};
