import { BookInf } from "@/entities/book";
import { Bookinfo } from "@/widgets/BookInfo";

type Prop = {
  bookObj: BookInf;
};

export const BookPage = ({ bookObj }: Prop) => {
  return (
    <main className="container">
      <Bookinfo bookObj={bookObj} />
    </main>
  );
};
