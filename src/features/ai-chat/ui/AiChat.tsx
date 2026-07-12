"use client";

import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { LoadingDots } from "@/shared/ui/DotLoader";
import { useAskAi } from "../model/query";
import { useAiChatStore } from "../model/store";
import type { Message } from "../model/types";
import { ChatMessages } from "./ChatMessages";
import { ChatInput } from "./ChatInput";
import styles from "./style.module.scss";

export const AiChat = () => {
  const messages = useAiChatStore((state) => state.messages);
  const addMessage = useAiChatStore((state) => state.addMessage);
  const [input, setInput] = useState("");
  const askAi = useAskAi();

  useEffect(() => {
    document.getElementById("last-message")?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const submit = () => {
    const text = input.trim();
    if (!text) return;
    addMessage({ id: uuidv4(), role: "user", text });
    setInput("");
    askAi.mutate(text, {
      onSuccess: (reply) => addMessage({ id: uuidv4(), role: "ai", text: reply } satisfies Message),
    });
  };

  return (
    <div className={styles.ChatWrap}>
      <div className={styles.ChatMessages}>
        <ChatMessages messages={messages} />
        {askAi.isPending && <LoadingDots />}
      </div>
      <ChatInput value={input} onChange={setInput} onSubmit={submit} />
    </div>
  );
};
