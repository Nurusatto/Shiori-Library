"use client";

import { HeaderDesktop } from "@/widgets/Header/ui/desktop";
import { HeaderMobile } from "@/widgets/Header/ui/mobile";

import styles from "./style.module.scss";
import { useScrolled } from "@/shared/hooks/useScrolled";
import clsx from "clsx";

export const Header = () => {
  const Scroll = useScrolled();

  return (
    <header className={clsx(styles.Header, Scroll && styles.Scrolled)}>
      <HeaderDesktop className={styles.desktop} />
      <HeaderMobile className={styles.mobile} />
    </header>
  );
};
