import clsx from "clsx";
import { Message } from "../../model/type";
import styles from "./style.module.scss";
import ReactMarkdown from "react-markdown";

type ChatProps = {
  stateHistory: Message[];
};

export const Chat = ({ stateHistory }: ChatProps) => {
  return (
    <ul className={styles.MessageList}>
      {stateHistory.map((msg, i) => (
        <li
          id={i === stateHistory.length - 1 ? "last-message" : undefined}
          key={msg.id}
          className={clsx(
            msg.role === "user" && styles.MessageUser,
            msg.role === "ai" && styles.MessageAI
          )}
        >
          <ReactMarkdown>{msg.text}</ReactMarkdown>
        </li>
      ))}
    </ul>
  );
};
