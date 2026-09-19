import type { Metadata } from "next";
import { getBrands, getProducts } from "@/lib/api";
import { Listing } from "@/components/listing";
import { getStoreHost } from "@/lib/store-host";

export default async function BrandPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const storeHost = await getStoreHost();
  const [products, brands] = await Promise.all([
    getProducts({ brand: slug, limit: 200 }, storeHost),
    getBrands(storeHost),
  ]);
  const name = brands.find((b) => b.slug === slug)?.name ?? products[0]?.brand.name ?? "Brand";

  return <Listing eyebrow="Brand" title={name} products={products} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const brands = await getBrands(await getStoreHost());
  const name = brands.find((b) => b.slug === slug)?.name ?? slug;
  return {
    title: name,
    description: `Hand-built furniture from ${name} — made to order in solid hardwood.`,
    alternates: { canonical: `/brand/${slug}` },
    openGraph: { title: name, type: "website" },
  };
}
