import { usePathname } from "next/navigation";

import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

import { BurgerButton } from "./burger";
import { ArrowMobile } from "./arrow";
import { BooksNav } from "./navBook";
import { NavHeader } from "./navHeader";

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
      <NavHeader open={open} setOpen={setOpen} url={url} />
      <BooksNav isBookPage={isBookPage} open={open} />
      <ArrowMobile isHomeOrSearchPage={isHomeOrSearchPage} open={open} />
      <BurgerButton open={open} setOpen={setOpen} />
    </div>
  );
};
