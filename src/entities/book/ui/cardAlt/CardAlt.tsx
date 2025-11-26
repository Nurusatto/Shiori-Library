import Image from "next/image";
import styles from "./style.module.scss";
import { getCover } from "@/shared/utils/getCovers";
import Link from "next/link";
import { BookInfAlt } from "../../model/type";

type CardAltProps = {
  book: BookInfAlt; // или BookInfAlt, если у тебя отдельный тип
};

export const CardAlt = ({ book }: CardAltProps) => {
  const bookId = book.key.replace("/works/", "");
  const coverID = getCover(book);
  console.log(book);
  return (
    <li>
      <Link
        href={`/books/${bookId}`}
        key={book.title}
        className={styles.BookCard}
      >
        {coverID ? (
          <Image
            src={`https://covers.openlibrary.org/b/id/${coverID}-M.jpg`}
            alt="image"
            width={128}
            height={182}
            quality={90}
            className={styles.BookCover}
          />
        ) : (
          <div className={styles.BookCover}></div>
        )}
        <div className={styles.BookInfo}>
          <h1 className={styles.BookTitle}>{book.title}</h1>
        </div>
      </Link>
    </li>
  );
};
