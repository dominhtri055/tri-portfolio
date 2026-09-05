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

const preferenceScript = `
  try {
    const savedTheme = localStorage.getItem("tri-theme");
    const theme = savedTheme === "light" || savedTheme === "dark"
      ? savedTheme
      : (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const savedLanguage = localStorage.getItem("tri-language");
    document.documentElement.dataset.theme = theme;
    if (["en", "fr", "vi"].includes(savedLanguage)) document.documentElement.lang = savedLanguage;
  } catch {}
`;

export const metadata: Metadata = {
  metadataBase: new URL("https://tri-portfolio-pi.vercel.app"),
  title: "Tri Do | Junior Full-Stack Developer",
  description:
    "Portfolio of Tri Do, a Moncton-based junior full-stack developer building React, Next.js, React Native, APIs, and database-backed products.",
  keywords: [
    "Tri Do",
    "Junior Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "TypeScript Developer",
    "Moncton Software Developer",
  ],
  authors: [{ name: "Tri Do", url: "https://github.com/dominhtri055" }],
  alternates: { canonical: "/" },
  openGraph: {
    title: "Tri Do | Junior Full-Stack Developer",
    description:
      "Selected web, mobile, and backend engineering work by Tri Do in Moncton, NB.",
    type: "website",
    url: "/",
    siteName: "Tri Do Portfolio",
  },
  twitter: {
    card: "summary",
    title: "Tri Do | Junior Full-Stack Developer",
    description: "Selected web, mobile, and backend engineering work by Tri Do.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: preferenceScript }} />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}
