import { cn } from "@/shared/lib/cn";
import styles from "./style.module.scss";
import Image from "next/image";
import { BookInf } from "../../model/type";
import dayjs from "dayjs";
import DOMPurify from "isomorphic-dompurify";

import { getDescription } from "../../model/helpers";

type Prop = {
  info: BookInf;
};

export const BookInfo = ({ info }: Prop) => {
  return (
    <div className={cn(styles, "Book__info-block")}>
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
          <div className={cn(styles, "Book__no-Cover")}>No cover available</div>
        )}
      </div>
      <div className={cn(styles, "Book__details")}>
        <div className={cn(styles, "Book-title")}>
          <h1>{info.title}</h1>
        </div>
        {info.first_publish_date && (
          <div className={cn(styles, "Book__date")}>
            <p>
              <b>First published:</b> {info.first_publish_date}
            </p>
          </div>
        )}
        {info.created?.value && (
          <div className={cn(styles, "Book__date")}>
            <p>
              <b>Added to Open Library: </b>
              {dayjs(info.created.value).format("D MMMM YYYY")}
            </p>
            {info.key && (
              <a
                href={`https://openlibrary.org${info.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(styles, "Book__source-link")}
              >
                Open Library
              </a>
            )}
          </div>
        )}
        {info.last_modified?.value && (
          <div className={cn(styles, "Book__date")}>
            <p>
              <b>Last modified: </b>
              {dayjs(info.last_modified.value).format("D MMM YYYY")}
            </p>
          </div>
        )}
        {info.subjects && info.subjects.length > 0 && (
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
        {info.description && (
          <div className={cn(styles, "Book__description")}>
            <p
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(getDescription(info.description)),
              }}
            ></p>
          </div>
        )}
      </div>
    </div>
  );
};
