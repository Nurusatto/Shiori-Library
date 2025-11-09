import { BookInf } from "@/entities/book";
import { Bookinfo } from "@/widgets/BookInfo";
import { HeaderBlock } from "@/widgets/BookInfo/ui/HeaderBlock";
import { BookSlider } from "@/widgets/BookSlider";

type Prop = {
  bookObj: BookInf;
};

export const BookPage = ({ bookObj }: Prop) => {
  return (
    <main className="container">
      <HeaderBlock />
      <Bookinfo bookObj={bookObj} />
      <BookSlider bookObj={bookObj} />
    </main>
  );
};
