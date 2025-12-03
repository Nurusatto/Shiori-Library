import { Hello } from "@/widgets/Hello";
import { Search } from "@/widgets/SearchBooks/ui";
import { Footer } from "@/widgets/Footer";

export const SearchPage = () => {
  return (
    <main className="container">
      <Hello />
      <Search />
      <Footer />
    </main>
  );
};
