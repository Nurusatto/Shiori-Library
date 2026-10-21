import clsx from "clsx";
import styles from "./styles.module.scss";

type prop = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export const BurgerButton = ({ open, setOpen }: prop) => {
  return (
    <button
      type="button"
      className={clsx(styles.HeaderBurger, open && styles.isActive)}
      onClick={() => setOpen(!open)}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
      aria-controls="mobile-menu"
    >
      <span className={styles.HeaderBurgerLine}></span>
      <span className={styles.HeaderBurgerLine}></span>
      <span className={styles.HeaderBurgerLine}></span>
    </button>
  );
};
