import styles from "./styles.module.scss";
import clsx from "clsx";

import Link from "next/link";
import { LINKS } from "@/config/links/Header";
import { usePathname } from "next/navigation";

import { isActiveLink } from "@/shared/hooks/isActiveLink";

export const HeaderDesktop = () => {
  const url = usePathname() || "";

  return (
    <header className={styles.Header}>
      <div className={`container ${styles.HeaderInner}`}>
        <nav className={styles.HeaderNav}>
          {LINKS.map((link) => (
            <Link
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
      </div>
    </header>
  );
};
