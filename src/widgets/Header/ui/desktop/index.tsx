import clsx from "clsx";
import styles from "./styles.module.scss";

import { HEADER_LINKS } from "@/shared/config/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { isActiveLink } from "@/shared/hooks/isActiveLink";
import { ShioriLogo } from "@/shared/image/react-svg/logo";

import { AvatarDropMenu } from "@/features/auth/ui/avatarDropMenu";

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
      <AvatarDropMenu />
    </div>
  );
};
