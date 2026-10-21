import Image from "next/image";
import { BookItem } from "../../model/type";

import styles from "./style.module.scss";
import Link from "next/link";
import { getCover } from "@/shared/utils/getCovers";

type Prop = {
  book: BookItem;
};

export const BookCard = ({ book }: Prop) => {
  const bookId = book.key.replace("/works/", "");

  const coverID = getCover(book);
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
            height={192}
            quality={90}
            className={styles.BookCover}
            unoptimized
          />
        ) : (
          <div className={styles.BookCover}></div>
        )}
        <div className={styles.BookInfo}>
          <h1 className={styles.BookTitle}>{book.title}</h1>
          {book.author_name && (
            <span className={styles.BookAuthor}>{book.author_name[0]}</span>
          )}
          {book.first_publish_year && (
            <span className={styles.BookDate}>{book.first_publish_year}</span>
          )}
          {book.language && (
            <span className={styles.BookLanguage}>
              {book.language.join(", ")}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
};
