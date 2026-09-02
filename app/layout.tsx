import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tri Do | Software Developer Portfolio",
  description:
    "Portfolio of Tri Do, a Moncton-based web and mobile developer building React, Next.js, React Native, backend API, and database-driven projects.",
  openGraph: {
    title: "Tri Do | Software Developer Portfolio",
    description:
      "Web, mobile, and backend projects by Tri Do, a Software Development graduate based in Moncton, NB.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
