import type { Metadata, Viewport } from "next";
import mascot from "@/assets/mascot.jpg";
import { portfolioConfig, siteUrl } from "@/lib/config";
import "./globals.css";

const mascotAsset = mascot as string | { src: string };
const mascotSrc = typeof mascotAsset === "string" ? mascotAsset : mascotAsset.src;
const socialImageUrl = new URL(mascotSrc.replace(/^.*\/_next\//, "_next/"), siteUrl).toString();

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
    images: [{ url: socialImageUrl, width: 256, height: 256, alt: "kmisu3のアイコン" }]
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
