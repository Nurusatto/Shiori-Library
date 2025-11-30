export type Message = {
  id: string;
  role: "user" | "ai";
  text: string;
};

export type InputAi = {
  value: string;
  onChange: (newValue: string) => void;
  onSubmit?: () => void;
};

export type handler = {
  input: string;
  setInput: (val: string) => void;
};
