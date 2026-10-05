import type { Metadata } from "next";
import { getProducts } from "@/lib/api";
import { Listing } from "@/components/listing";
import { getSiteOrigin } from "@/lib/site-origin";

export default async function TagPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const products = await getProducts({ tag: slug, limit: 200 });
  const name = products[0]?.tags.find((t) => t.slug === slug)?.name ?? "Collection";

  return <Listing eyebrow="The collection" title={name} products={products} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const products = await getProducts({ tag: slug, limit: 1 });
  const name = products[0]?.tags.find((t) => t.slug === slug)?.name ?? slug;
  return {
    title: name,
    description: `Furniture tagged “${name}” — made to order in solid hardwood.`,
    alternates: { canonical: `/tag/${slug}` },
    openGraph: { title: name, type: "website" },
  };
}
