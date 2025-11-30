"use client";

import styles from "./style.module.scss";
import { Chat, Message } from "@/entities/AI";
import { InputAI } from "@/entities/AI";
import { useBookHistory } from "@/store/useHistoryAI";
import { useEffect, useRef, useState } from "react";
import { useQueryAI } from "@/entities/AI";
import { v4 as uuidv4 } from "uuid";
import { LoadingDots } from "@/shared/ui/DotLoader";

export const ChatAI = () => {
  const history = useBookHistory((s) => s.messages);
  const setMessages = useBookHistory((s) => s.addMessage);
  const [input, setInput] = useState("");
  const messageRef = useRef<HTMLDivElement>(null);
  const queryAI = useQueryAI();

  useEffect(() => {
    const last = document.getElementById("last-message");
    last?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleSubmit = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: uuidv4(),
      role: "user",
      text: input,
    };

    setMessages(userMessage);
    setInput("");

    queryAI.mutate(input, {
      onSuccess: (reply) => {
        const aiMessage: Message = {
          id: uuidv4(),
          role: "ai",
          text: reply,
        };
        setMessages(aiMessage);
      },
    });
  };

  return (
    <div className={styles.ChatWrap}>
      <div className={styles.ChatMessages} ref={messageRef}>
        <Chat stateHistory={history} />
        {queryAI.isPending && <LoadingDots />}
      </div>
      <InputAI value={input} onChange={setInput} onSubmit={handleSubmit} />
    </div>
  );
};
