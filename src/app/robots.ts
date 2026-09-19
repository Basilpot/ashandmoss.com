import type { MetadataRoute } from "next";
import { getStoreHost } from "@/lib/store-host";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const storeHost = await getStoreHost();
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/cart", "/checkout", "/api/"],
    },
    sitemap: `https://${storeHost}/sitemap.xml`,
  };
}
