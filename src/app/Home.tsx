import { BookGallery } from "@/widgets/BookGallery";
import { BookHistory } from "@/widgets/BookHistory";
import { Footer } from "@/widgets/Footer";
import { Hello } from "@/widgets/Hello";

export const HomePage = () => {
  return (
    <main className="container">
      <Hello />
      <BookHistory />
      <BookGallery />
      <Footer />
    </main>
  );
};
