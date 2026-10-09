import type { Metadata, Viewport } from "next";
import { portfolioConfig, siteUrl } from "@/lib/config";
import "./globals.css";

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
    siteName: portfolioConfig.siteTitle
  },
  twitter: { card: "summary", title: portfolioConfig.siteTitle, description: portfolioConfig.siteDescription }
};

export const viewport: Viewport = { themeColor: "#f5f7fb", colorScheme: "light" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ja"><body>{children}</body></html>;
}
