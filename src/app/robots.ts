import type { MetadataRoute } from "next";
import { portfolioConfig, siteUrl } from "@/lib/config";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: `/${portfolioConfig.repositoryName}/` },
    sitemap: `${siteUrl}sitemap.xml`,
    host: siteUrl
  };
}
