"use client";
import { InputAi } from "../../model/type";
import styles from "./style.module.scss";
import { ArrowUp } from "lucide-react";
import { Eraser } from "lucide-react";
import { useBookHistory } from "@/store/useHistoryAI";

export const InputAI = ({ value, onChange, onSubmit }: InputAi) => {
  const clear = useBookHistory((clear) => clear.clearMessages);
  const addMessage = useBookHistory((s) => s.addMessage);

  const handler = () => {
    clear();
    addMessage({
      id: "First Message",
      role: "ai",
      text: "✨ Hello! I'm Shiori, an AI library. Nice to meet you! ✨",
    });
  };

  return (
    <div className={styles.Wrapper}>
      <Eraser className={styles.Trash} onClick={handler} />
      <input
        type="text"
        placeholder="Looking for a story or info on a book?"
        value={value}
        className={styles.Input}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") onSubmit?.();
        }}
      />
      <button className={styles.Button} onClick={onSubmit}>
        <ArrowUp className={styles.Icon} />
      </button>
    </div>
  );
};
