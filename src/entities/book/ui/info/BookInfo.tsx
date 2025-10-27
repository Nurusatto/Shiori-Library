import { cn } from "@/shared/lib/cn";
import styles from "./style.module.scss";
import Image from "next/image";
import { BookInf } from "../../model/type";

type Prop = {
  info: BookInf;
};

export const BookInfo = ({ info }: Prop) => {
  return (
    <section className={cn(styles, "Book__section")}>
      <div className={cn(styles, "Book__block")}>
        <div className={cn(styles, "Book__wrap")}>
          {info?.covers?.length ? (
            <Image
              alt="book image"
              width={128}
              height={161}
              style={{ objectFit: "contain" }}
              className={cn(styles, "Book__cover")}
              src={`https://covers.openlibrary.org/b/id/${info.covers[0]}-L.jpg`}
            />
          ) : (
            <div className={cn(styles, "Book__no-Cover")}>
              No cover available
            </div>
          )}
        </div>
        <div className={cn(styles, "Book__details")}>
          <h1 className={cn(styles, "Book-title")}>{info.title}</h1>
          {info.first_publish_date && (
            <p>
              <b>First published:</b>
              {info.first_publish_date}
            </p>
          )}
          {info.subjects?.length && (
            <div className={cn(styles, "Book__group")}>
              {info.subjects.map((subject) => (
                <div key={subject} className={cn(styles, "Book__badge")}>
                  <span className={cn(styles, "Book__badge-text")}>
                    {subject}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
