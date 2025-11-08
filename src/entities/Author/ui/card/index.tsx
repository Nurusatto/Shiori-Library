import Image from "next/image";
import { AuthorData } from "../../model/types";

import styles from "./style.module.scss";
import { cn } from "@/shared/lib/cn";

type AuthorCardProps = {
  obj: AuthorData;
};

export const AuthorCard = ({ obj }: AuthorCardProps) => {
  return (
    <li className={cn(styles, "Author__wrap")}>
      <div className={cn(styles, "Author__inner")}>
        {obj?.photos?.length ? (
          <Image
            width={128}
            height={192}
            quality={90}
            alt="Author photo"
            src={`https://covers.openlibrary.org/a/id/${obj.photos[0]}-M.jpg`}
            className={cn(styles, "Author__cover")}
          />
        ) : (
          <div className={cn(styles, "Author__cover")}></div>
        )}
        <h1>{obj.name}</h1>
      </div>
    </li>
  );
};
