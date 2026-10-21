import Link from "next/link";
import styles from "./style.module.scss";
import { Flower2 } from "lucide-react";

export const ShioriFlower = () => {
  return (
    <footer className={styles.footerShori}>
      <Link href="/" className={styles.wordmark}>
        <Flower2 size={20} /> shiori<span>library</span>
      </Link>
      <p>A little space for your love of books.</p>
      <span>
        Book information powered by Open Library. Full editions are not
        provided.
      </span>
    </footer>
  );
};
