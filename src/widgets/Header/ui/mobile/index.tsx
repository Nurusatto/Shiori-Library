import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { BOOK_PAGE_LINKS, HEADER_LINKS } from "@/shared/config/navigation";
import { isActiveLink } from "@/shared/hooks/isActiveLink";

import { MoveUp } from "lucide-react";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { AvatarDropMenu } from "@/features/user/ui/avatarDropMenu";

type prop = {
  className: string;
};

export const HeaderMobile = ({ className }: prop) => {
  const [open, setOpen] = useState(false);
  const url = usePathname() || "";

  const isBookPage = url.startsWith("/books");
  const isHomeOrSearchPage = url === "/" || url.startsWith("/search");

  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      html.classList.add("isLock");
    } else {
      html.classList.remove("isLock");
    }

    return () => html.classList.remove("isLock");
  }, [open]);

  return (
    <div className={`container ${styles.HeaderInner} ${className}`}>
      <nav className={clsx(styles.HeaderNav, open && styles.isActive)}>
        <AvatarDropMenu />

        {HEADER_LINKS.map((link) => (
          <Link
            onClick={() => setOpen(!open)}
            href={link.path}
            key={link.name}
            className={clsx(
              styles.HeaderLinks,
              isActiveLink(link.path, url) && styles.isActive,
            )}
          >
            {<link.icon />}
            {link.name}
          </Link>
        ))}
      </nav>
      {isBookPage && (
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
      )}
      {isHomeOrSearchPage && (
        <a
          href="#hello"
          className={clsx(styles.navUp, open && styles.navHidden)}
        >
          <MoveUp />
        </a>
      )}
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
  );
};
