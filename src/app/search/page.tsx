import { SearchPage } from "./SearchPage";
import type { Metadata } from "next";
import { MotionProvider } from "@/providers/MotionProvider";

export const metadata: Metadata = {
  title: "Search",
  description: "Search page",
};

export default function Search() {
  return (
    <MotionProvider>
      <SearchPage />
    </MotionProvider>
  );
}
