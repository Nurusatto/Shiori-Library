import clsx from "clsx";
import ReactMarkdown from "react-markdown";
import type { Message } from "../model/types";
import styles from "./messages.module.scss";

export const ChatMessages = ({ messages }: { messages: Message[] }) => (
  <ul className={styles.MessageList}>
    {messages.map((message, index) => (
      <li id={index === messages.length - 1 ? "last-message" : undefined} key={message.id}
        className={clsx(message.role === "user" && styles.MessageUser, message.role === "ai" && styles.MessageAI)}>
        <ReactMarkdown>{message.text}</ReactMarkdown>
      </li>
    ))}
  </ul>
);
