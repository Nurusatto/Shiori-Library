import { SearchPage } from "./SearchPage";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Search",
  description: "Search page",
};

export default function Search() {
  return <SearchPage />;
}
