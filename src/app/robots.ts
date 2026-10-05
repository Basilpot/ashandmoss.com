import type { MetadataRoute } from "next";
import { getSiteOrigin } from "@/lib/site-origin";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const siteOrigin = await getSiteOrigin();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/api/"],
    },
    sitemap: `${siteOrigin}/sitemap.xml`,
  };
}
