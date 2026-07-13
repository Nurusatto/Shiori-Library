import styles from "./styles.module.scss";
import clsx from "clsx";

import Link from "next/link";
import { HEADER_LINKS } from "@/shared/config/navigation";
import { usePathname } from "next/navigation";

import { isActiveLink } from "@/shared/hooks/isActiveLink";
import { ShioriLogo } from "@/shared/image/react-svg/logo";

type prop = {
  className?: string;
};

export const HeaderDesktop = ({ className }: prop) => {
  const url = usePathname() || "";

  return (
    <div className={`container ${styles.HeaderInner} ${className}`}>
      <Link href="/">
        <ShioriLogo />
      </Link>
      <nav className={styles.HeaderNav}>
        {HEADER_LINKS.map((link) => (
          <Link
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
      <div className="">
        <span>User</span>
      </div>
    </div>
  );
};
