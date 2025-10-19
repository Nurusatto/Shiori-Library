import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import { LINKS } from "@/config/links/Header";
import { isActiveLink } from "@/shared/hooks/isActiveLink";

import styles from "./styles.module.scss";
import { useState } from "react";

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  const url = usePathname() || "";

  return (
    <header className={styles.Header}>
      <div className={`container ${styles.HeaderInner}`}>
        <nav className={clsx(styles.HeaderNav, open && styles.isActive)}>
          {LINKS.map((link) => (
            <Link
              onClick={() => setOpen(!open)}
              href={link.path}
              key={link.name}
              className={clsx(
                styles.HeaderLinks,
                isActiveLink(link.path, url) && styles.isActive
              )}
            >
              {<link.icon />}
              {link.name}
            </Link>
          ))}
        </nav>
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
      </div>
    </header>
  );
};
