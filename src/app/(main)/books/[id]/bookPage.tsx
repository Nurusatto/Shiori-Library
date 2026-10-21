import { BookInf } from "@/entities/book";
import { Bookinfo } from "@/widgets/BookInfo";
import { HeaderBlock } from "@/widgets/BookInfo";
import { BookSlider } from "@/widgets/BookSlider";
import { BookAI } from "@/widgets/BookAI";
import { Footer } from "@/widgets/Footer";
import { BookTracker } from "@/features/tracker/book";

type Prop = {
  bookObj: BookInf;
};

export const BookPage = ({ bookObj }: Prop) => {
  return (
    <>
      <BookTracker
        bookId={bookObj.key}
        title={bookObj.title}
        covers={bookObj.covers}
      />

      <main className="container">
        <HeaderBlock />
        <Bookinfo bookObj={bookObj} />
        <BookSlider bookObj={bookObj} />
        <BookAI bookObj={bookObj} />
      </main>
      <Footer />
    </>
  );
};
