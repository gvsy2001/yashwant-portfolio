import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SiteShell } from "@/components/layout/SiteShell";
import { getSiteUrl } from "@/lib/utils";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Gannavarapu Venkata Sai Yashwant | Software Engineer",
    template: "%s | G.V.S. Yashwant",
  },
  description:
    "Software Engineer building scalable full-stack web applications, distributed backend services, and AWS cloud systems using React, TypeScript, Node.js, Java, and MongoDB.",
  keywords: [
    "Software Engineer",
    "Full Stack Developer",
    "React",
    "TypeScript",
    "Node.js",
    "Java",
    "MongoDB",
    "AWS",
    "Hyderabad",
  ],
  authors: [{ name: "Gannavarapu Venkata Sai Yashwant", url: siteUrl }],
  creator: "Gannavarapu Venkata Sai Yashwant",
  verification: {
    google: "googlea07ff67da47282df.html",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "G.V.S. Yashwant Portfolio",
    title: "Gannavarapu Venkata Sai Yashwant | Software Engineer",
    description:
      "Full-stack software engineering portfolio featuring cloud migration platforms, high-throughput services, and technical notes.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Gannavarapu Venkata Sai Yashwant | Software Engineer",
    description:
      "Full-stack software engineering portfolio featuring cloud migration platforms, high-throughput services, and technical notes.",
  },
  alternates: {
    canonical: "/",
    types: {
      "application/rss+xml": `${siteUrl}/rss.xml`,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable}`}
      suppressHydrationWarning
    >
      <body>
        <ThemeProvider>
          <SiteShell>{children}</SiteShell>
        </ThemeProvider>
      </body>
    </html>
  );
}