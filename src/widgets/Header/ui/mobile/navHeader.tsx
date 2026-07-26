import { AvatarDropMenu } from "@/features/user/ui/avatarDropMenu";
import clsx from "clsx";
import styles from "./styles.module.scss";
import { HEADER_LINKS } from "@/shared/config/navigation";
import Link from "next/link";
import { isActiveLink } from "@/shared/hooks/isActiveLink";

type prop = {
  open: boolean;
  setOpen: (open: boolean) => void;
  url: string;
};

export const NavHeader = ({ open, setOpen, url }: prop) => {
  return (
    <nav className={clsx(styles.HeaderNav, open && styles.isActive)}>
      <AvatarDropMenu setOpen={setOpen} open={open} />

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
  );
};
