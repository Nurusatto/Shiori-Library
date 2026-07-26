import clsx from "clsx";
import styles from "./styles.module.scss";
import { BOOK_PAGE_LINKS } from "@/shared/config/navigation";

type prop = {
  isBookPage: boolean;
  open: boolean;
};

export const BooksNav = ({ isBookPage, open }: prop) => {
  if (isBookPage) {
    return (
      <nav className={clsx(styles.nav, open && styles.navHidden)}>
        <ul className={styles.navList}>
          {BOOK_PAGE_LINKS.map((link) => (
            <li key={link.name} className={styles.navItem}>
              <a href={link.href} className={styles.navLink}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
};
