import { CatLoader } from "@/shared/ui/CatLoader";
import type { UseQueryResult } from "@tanstack/react-query";
import styles from "./style.module.scss";
import clsx from "clsx";
import { AuthorDataAlt, AuthorResponse } from "../../model/types";

type Prop = {
  query: UseQueryResult<AuthorResponse, unknown>;
  position?: "row" | "column";
};

export const AuthorList = ({ query, position = "column" }: Prop) => {
  const { data, isLoading } = query;
  const pos = position === "row";

  return (
    <div className={styles.Author}>
      {isLoading && <CatLoader />}
      {!isLoading && (
        <ul className={clsx(styles.AuthorList, pos && styles.row)}>
          {data?.docs?.length ? (
            data.docs.map((author: AuthorDataAlt) => (
              <li className={styles.AuthorItem} key={author.key || author.name}>
                <h1>{author.name}</h1>

                {author?.alternate_names?.length ? (
                  <>
                    <span>Alternative name:</span>
                    {author.alternate_names.map((altName, index) => (
                      <span key={index}>{altName}</span>
                    ))}
                  </>
                ) : (
                  <span className={styles.fallback}>No alternative names</span>
                )}
              </li>
            ))
          ) : (
            <p className={styles.fallback}>No authors found</p>
          )}
        </ul>
      )}
    </div>
  );
};
