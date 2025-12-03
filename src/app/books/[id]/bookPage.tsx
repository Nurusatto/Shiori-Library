import { BookInf } from "@/entities/book";
import { Bookinfo } from "@/widgets/BookInfo";
import { HeaderBlock } from "@/widgets/BookInfo/ui/HeaderBlock";
import { BookSlider } from "@/widgets/BookSlider";
import { BookAI } from "@/widgets/BookAI";
import { Footer } from "@/widgets/Footer";

type Prop = {
  bookObj: BookInf;
};

export const BookPage = ({ bookObj }: Prop) => {
  return (
    <>
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
