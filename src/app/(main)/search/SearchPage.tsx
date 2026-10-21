import { Search } from "@/widgets/SearchBooks";
import { Footer } from "@/widgets/Footer";
import { Suspense } from "react";
import { SearchSkeleton } from "@/shared/skeleton/search/search";

export const SearchPage = () => {
  return (
    <>
      <main className="container">
        <Suspense fallback={<SearchSkeleton />}>
          <Search />
        </Suspense>
        <Footer />
      </main>
    </>
  );
};
