import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

import { LINKS } from "@/config/links/Header";
import { LINKS as BookNavigation } from "@/config/links/bookPage";
import { isActiveLink } from "@/shared/hooks/isActiveLink";

import styles from "./styles.module.scss";
import { useEffect, useState } from "react";

import { useScrolled } from "@/shared/hooks/useScrolled";
import { cn } from "@/shared/lib/cn";

export const HeaderMobile = () => {
  const [open, setOpen] = useState(false);
  const url = usePathname() || "";
  const Scroll = useScrolled();
  const isBookPage = url.startsWith("/books");

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
          <nav
            className={clsx(
              cn(styles, "nav"),
              open && cn(styles, "nav__hidden")
            )}
          >
            <ul className={cn(styles, "nav__list")}>
              {BookNavigation.map((link) => (
                <li key={link.name} className={cn(styles, "nav__item")}>
                  <a href={link.href} className={cn(styles, "nav__link")}>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
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
