import type { Metadata } from "next";
import { HomePage } from "./Home";

export const metadata: Metadata = {
  title: "Home | Shiori library",
  description: "Your personal reading library :>",
};

export default function Home() {
  return <HomePage />;
}
