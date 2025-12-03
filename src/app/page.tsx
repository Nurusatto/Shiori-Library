import type { Metadata } from "next";
import { HomePage } from "./Home";
import { MotionProvider } from "@/providers/MotionProvider";

export const metadata: Metadata = {
  title: "Home | Shiori library",
  description: "Your personal reading library :>",
};

export default function Home() {
  return (
    <MotionProvider>
      <HomePage />
    </MotionProvider>
  );
}
