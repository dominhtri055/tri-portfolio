import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tri Do | Software Developer Portfolio",
  description: "Software Developer Portfolio",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}