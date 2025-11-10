import { BookGallery } from "@/widgets/BookGallery";
import { Hello } from "@/widgets/Hello";

export const HomePage = () => {
  return (
    <main className="container">
      <Hello />
      <BookGallery />
    </main>
  );
};
