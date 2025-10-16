"use client";

import { useBreakpoint } from "@/shared/hooks/useBreakpoint";

import { HeaderDesktop } from "@/widgets/Header/ui/desktop";
import { HeaderMobile } from "@/widgets/Header/ui/mobile";

export const Header = () => {
  const display = useBreakpoint();

  if (display === "desktop" || display === "laptop") {
    return <HeaderDesktop />;
  } else if (display === "tablet" || display === "mobile") {
    return <HeaderMobile />;
  }
};
