import type { Metadata } from "next";
import { AiChat } from "./AiChat";

export const metadata: Metadata = {
  title: "Shiori AI",
  description: "AI page",
};

export default function Home() {
  return <AiChat />;
}
