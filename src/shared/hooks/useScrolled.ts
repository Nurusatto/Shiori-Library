"use client";

import { useEffect, useState } from "react";

export const useScrolled = (
  elementRef?: React.RefObject<HTMLElement>
): boolean => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const target = elementRef?.current || window;

    const handleScroll = () => {
      const scrollTop =
        target instanceof Window
          ? window.scrollY
          : (target as HTMLElement).scrollTop;
      setScrolled(scrollTop > 0);
    };

    target.addEventListener("scroll", handleScroll, { passive: true });
    return () => target.removeEventListener("scroll", handleScroll);
  }, [elementRef]);

  return scrolled;
};
