import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import { LINKS } from "@/config/links/Header";
import { LINKS as BookNavigation } from "@/config/links/bookPage";
import { isActiveLink } from "@/shared/hooks/isActiveLink";

import { MoveUp } from "lucide-react";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

import { useScrolled } from "@/shared/hooks/useScrolled";

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  const url = usePathname() || "";
  const Scroll = useScrolled();
  const isBookPage = url.startsWith("/books");
  const isHomeOrSearchPage = url === "/" || url.startsWith("/search");

  useEffect(() => {
    const html = document.documentElement;
    if (open) {
      html.classList.add("isLock");
    } else {
      html.classList.remove("isLock");
    }

    // чистим при unmount
    return () => html.classList.remove("isLock");
  }, [open]);

  return (
    <header className={clsx(styles.Header, Scroll && styles.Srolled)}>
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
        {isBookPage && (
          <nav className={clsx(styles.nav, open && styles.navHidden)}>
            <ul className={styles.navList}>
              {BookNavigation.map((link) => (
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
    </header>
  );
};
