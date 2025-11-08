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

export type AuthorObj = {
  author: {
    key: string;
  };
  type: {
    key: string;
  };
};
