import type { Metadata, Viewport } from "next";
import mascot from "@/assets/mascot.jpg";
import { portfolioConfig, siteUrl } from "@/lib/config";
import "./globals.css";

const socialImageUrl = new URL(mascot.src.replace(/^.*\/_next\//, "_next/"), siteUrl).toString();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: portfolioConfig.siteTitle,
  description: portfolioConfig.siteDescription,
  applicationName: portfolioConfig.siteTitle,
  authors: [{ name: portfolioConfig.githubUsername }],
  alternates: { canonical: siteUrl },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    title: portfolioConfig.siteTitle,
    description: portfolioConfig.siteDescription,
    siteName: portfolioConfig.siteTitle,
    images: [{ url: socialImageUrl, width: mascot.width, height: mascot.height, alt: "kmisu3のアイコン" }]
  },
  twitter: {
    card: "summary",
    title: portfolioConfig.siteTitle,
    description: portfolioConfig.siteDescription,
    images: [socialImageUrl]
  }
};

export const viewport: Viewport = { themeColor: "#f5f7fb", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
