import type { MetadataRoute } from "next";
import { getBrands, getCategories, getProducts } from "@/lib/api";
import { getSiteOrigin } from "@/lib/site-origin";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteOrigin = await getSiteOrigin();
  const base = siteOrigin;
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1 },
    { url: `${base}/explore`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/craft`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${base}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];
  const [products, categories, brands] = await Promise.all([
    getProducts({ limit: 200 }).catch(() => []),
    getCategories().catch(() => []),
    getBrands().catch(() => []),
  ]);

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${base}/product/${p.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const flatten = (list: typeof categories, out: string[] = []): string[] => {
    for (const c of list) {
      out.push(c.slug);
      flatten(c.children, out);
    }
    return out;
  };

  const categoryRoutes: MetadataRoute.Sitemap = flatten(categories).map((slug) => ({
    url: `${base}/category/${slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  const brandRoutes: MetadataRoute.Sitemap = brands.map((b) => ({
    url: `${base}/brand/${b.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...productRoutes,
    ...categoryRoutes,
    ...brandRoutes,
  ];
}
