"use client";

import { LINKS } from "@/config/links/bookPage";
import { cn } from "@/shared/lib/cn";

import styles from "./style.module.scss";
import clsx from "clsx";
import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

export const HeaderBlock = () => {
  const bp = useBreakpoint();
  const resposive = bp === "desktop" || bp === "laptop";

  if (!resposive) return null;
  return (
    <div className={clsx(cn(styles, "Header"))}>
      <ul className={cn(styles, "Header__list")}>
        {LINKS.map((link) => (
          <li key={link.name} className={cn(styles, "Header__item")}>
            <a href={link.href} className={cn(styles, "Header__link")}>
              {link.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};
