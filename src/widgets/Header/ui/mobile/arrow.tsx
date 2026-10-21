import clsx from "clsx";
import { MoveUp } from "lucide-react";
import styles from "./styles.module.scss";

type prop = {
  isHomeOrSearchPage: boolean;
  open: boolean;
};

export const ArrowMobile = ({ isHomeOrSearchPage, open }: prop) => {
  if (isHomeOrSearchPage) {
    return (
      <a href="#hello" className={clsx(styles.navUp, open && styles.navHidden)}>
        <MoveUp />
      </a>
    );
  }
  return null;
};
