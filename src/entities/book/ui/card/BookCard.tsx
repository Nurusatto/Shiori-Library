import Image from "next/image";
import { BookItem } from "../../model/type";
import { cn } from "@/shared/lib/cn";

import styles from "./style.module.scss";
import Link from "next/link";

type Prop = {
  book: BookItem;
};

export const BookCard = ({ book }: Prop) => {
  const bookId = book.key.replace("/works/", "");

  return (
    <li>
      <Link
        href={`/books/${bookId}`}
        key={book.title}
        className={cn(styles, "Book__card")}
      >
        {book?.cover_i ? (
          <Image
            src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
            alt="image"
            width={128}
            height={192}
            quality={90}
            className={cn(styles, "Book__cover")}
          />
        ) : (
          <div className={cn(styles, "Book__cover")}></div>
        )}
        <div className={cn(styles, "Book__info")}>
          <h1 className={cn(styles, "Book__title")}>{book.title}</h1>
          {book.author_name && (
            <span className={cn(styles, "Book__author")}>
              {book.author_name[0]}
            </span>
          )}
          {book.first_publish_year && (
            <span className={cn(styles, "Book__date")}>
              {book.first_publish_year}
            </span>
          )}
          {book.language && (
            <span className={cn(styles, "Book__language")}>
              {book.language.join(", ")}
            </span>
          )}
        </div>
      </Link>
    </li>
  );
};
