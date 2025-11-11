import Image from "next/image";
import { AuthorData } from "../../model/types";

import styles from "./style.module.scss";

type AuthorCardProps = {
  obj: AuthorData;
};

export const AuthorCard = ({ obj }: AuthorCardProps) => {
  return (
    <li className={styles.AuthorWrap}>
      <div className={styles.AuthorInner}>
        {obj?.photos?.length ? (
          <Image
            width={128}
            height={192}
            quality={90}
            alt="Author photo"
            src={`https://covers.openlibrary.org/a/id/${obj.photos[0]}-M.jpg`}
            className={styles.AuthorCover}
          />
        ) : (
          <div className={styles.AuthorCover}></div>
        )}
        <h1>{obj.name}</h1>
      </div>
    </li>
  );
};
