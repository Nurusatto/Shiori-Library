import { type BookShelf } from "../../model/types";
import styles from "./style.module.scss";
import { BOOK_SHELF_OPTIONS } from "@/shared/config/shelf.config";

type DropMenuProps = {
  onSelect: (shelf: BookShelf) => void;
};

export const DropMenu = ({ onSelect }: DropMenuProps) => {
  return (
    <ul className={styles.list}>
      {BOOK_SHELF_OPTIONS.map((item) => (
        <li key={item.value} onClick={() => onSelect(item.value)}>
          {item.label}
        </li>
      ))}
    </ul>
  );
};
