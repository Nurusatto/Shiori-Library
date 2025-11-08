import styles from "./style.module.scss";
import { cn } from "@/shared/lib/cn";

//blocks
import { BookInfo as InfoBlock, BookInf } from "@/entities/book";
import { AuthorBlock } from "./AuthorBlock";

type Prop = {
  bookObj: BookInf;
};

export const Bookinfo = ({ bookObj }: Prop) => {
  const authors = bookObj.authors;

  return (
    <section className={cn(styles, "Book__section")}>
      <InfoBlock info={bookObj} />
      <AuthorBlock info={authors} />
    </section>
  );
};
