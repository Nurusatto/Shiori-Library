import { SearchMode } from "@/entities/book";

export type InputProp = {
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  mode: SearchMode;
  setMode: (mode: SearchMode) => void;
};
