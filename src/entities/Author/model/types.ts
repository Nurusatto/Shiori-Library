export type AuthorData = {
  name: string;
  bio?: string | { value: string };
  birth_date?: string;
  death_date?: string;
  photos?: number[];
  work_count?: number;
  alternate_names?: string[];
};

export type AuthorObj = {
  author: {
    key: string;
  };
  type: {
    key: string;
  };
};
