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
    <div className={styles.BookInfoBlock}>
      <div className={styles.BookWrap}>
        {info?.covers?.length ? (
          <Image
            alt="book image"
            width={128}
            height={161}
            style={{ objectFit: "contain" }}
            className={styles.BookCover}
            src={`https://covers.openlibrary.org/b/id/${info.covers[0]}-L.jpg`}
          />
        ) : (
          <div className={styles.BookNoCover}>No cover available</div>
        )}
      </div>
      <div className={styles.BookDetails}>
        <div className={styles.BookTitle}>
          <h1>{info.title}</h1>
        </div>
        {info.first_publish_date && (
          <div className={styles.BookDate}>
            <p>
              <b>First published:</b> {info.first_publish_date}
            </p>
          </div>
        )}
        {info.created?.value && (
          <div className={styles.BookDate}>
            <p>
              <b>Added to Open Library: </b>
              {dayjs(info.created.value).format("D MMMM YYYY")}
            </p>
            {info.key && (
              <a
                href={`https://openlibrary.org${info.key}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.BookSourceLink}
              >
                Open Library
              </a>
            )}
          </div>
        )}
        {info.last_modified?.value && (
          <div className={styles.BookDate}>
            <p>
              <b>Last modified: </b>
              {dayjs(info.last_modified.value).format("D MMM YYYY")}
            </p>
          </div>
        )}
        {info.subjects && info.subjects.length > 0 && (
          <div className={styles.BookGroup}>
            {info.subjects.map((subject) => (
              <div key={subject} className={styles.BookBadge}>
                <span className={styles.BookBadgeText}>{subject}</span>
              </div>
            ))}
          </div>
        )}
        {info.description && (
          <div className={styles.BookDescription}>
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
