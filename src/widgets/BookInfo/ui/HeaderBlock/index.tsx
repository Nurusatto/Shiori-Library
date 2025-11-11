"use client";

import { LINKS } from "@/config/links/bookPage";

import styles from "./style.module.scss";
import clsx from "clsx";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

export const HeaderBlock = () => {
  const bp = useBreakpoint();
  const resposive = bp === "desktop" || bp === "laptop";

  if (!resposive) return null;
  return (
    <div className={clsx(styles.Header)}>
      <ul className={styles.HeaderList}>
        {LINKS.map((link) => (
          <li key={link.name} className={styles.HeaderItem}>
            <a href={link.href} className={styles.HeaderLink}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
