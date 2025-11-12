export type InputProp = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  placeholder: "books" | "author";
  setPlaceholder: React.Dispatch<React.SetStateAction<"books" | "author">>;
};
