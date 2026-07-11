import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";

import "@/app/_styles/index.scss";

import { ClientProvider } from "@/app/_providers/ClientProvider";
import { Header } from "@/widgets/Header";

const InterFont = Inter({
  weight: ["400", "500"],
  variable: "--font-base",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  icons: {
    icon: "/favicon.svg",
  },
  title: {
    default: "Shiori Library",
    template: "%s | Shiori Library",
  },
  description: "Your personal reading library",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
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
          {children}
        </ClientProvider>
      </body>
    </html>
  );
}
