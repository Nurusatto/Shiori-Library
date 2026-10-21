import { MotionProvider } from "@/app/_providers/MotionProvider";
import type { Metadata } from "next";
import { SearchPage } from "./SearchPage";

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
