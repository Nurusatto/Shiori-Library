import styles from "./style.module.scss";
import { cn } from "@/shared/lib/cn";
import { BookInfo as Info, BookInf } from "@/entities/book";

type Prop = {
  bookObj: BookInf;
};

export const Bookinfo = ({ bookObj }: Prop) => {
  return <Info info={bookObj} />;
};
