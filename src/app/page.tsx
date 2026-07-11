import { MotionProvider } from "@/app/_providers/MotionProvider";
import type { Metadata } from "next";
import { HomePage } from "./Home";

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
