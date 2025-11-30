import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "@/styles/index.scss";

import { Header } from "@/widgets/Header";

import { ClientProvider } from "@/providers/ClientProvider";
import { MotionProvider } from "@/providers/MotionProvider";

const InterFont = Inter({
  weight: ["400", "500"],
  variable: "--font-base",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Shiori Library",
    template: "%s | Shiori Library",
  },
  description: "Your personal reading library",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${InterFont.variable}`}>
        <ClientProvider>
          <Header />
          <MotionProvider>{children}</MotionProvider>
        </ClientProvider>
      </body>
    </html>
  );
}
