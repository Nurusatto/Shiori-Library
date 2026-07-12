import { ArrowUp, Eraser } from "lucide-react";
import { useAiChatStore } from "../model/store";
import styles from "./input.module.scss";

export const ChatInput = ({ value, onChange, onSubmit }: { value: string; onChange: (value: string) => void; onSubmit: () => void }) => {
  const resetMessages = useAiChatStore((state) => state.resetMessages);
  return <div className={styles.Wrapper}>
    <Eraser className={styles.Trash} onClick={resetMessages} />
    <input type="text" placeholder="Looking for a story or info on a book?" value={value} className={styles.Input}
      onChange={(event) => onChange(event.target.value)} onKeyDown={(event) => event.key === "Enter" && onSubmit()} />
    <button className={styles.Button} onClick={onSubmit}><ArrowUp className={styles.Icon} /></button>
  </div>;
};
