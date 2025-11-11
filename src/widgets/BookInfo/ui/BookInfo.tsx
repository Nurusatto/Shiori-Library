import styles from "./style.module.scss";

//blocks
import { BookInfo as InfoBlock, BookInf } from "@/entities/book";
import { AuthorBlock } from "./AuthorBlock";

type Prop = {
  bookObj: BookInf;
};

export const Bookinfo = ({ bookObj }: Prop) => {
  const authors = bookObj.authors;

  return (
    <section className={styles.BookSection}>
      <InfoBlock info={bookObj} />
      <AuthorBlock authors={authors} />
    </section>
  );
};
