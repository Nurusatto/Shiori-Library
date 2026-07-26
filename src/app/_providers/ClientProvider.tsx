"use client";

import { AuthProvider } from "./AuthProvider";
import { QueryProvider } from "./QueryProvider";
import { Toaster } from "sonner";

export function ClientProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryProvider>
      <Toaster />
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
