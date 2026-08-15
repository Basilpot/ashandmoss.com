import type { Metadata } from "next";
import { getCategories, getProducts } from "@/lib/api";
import { Listing } from "@/components/listing";
import type { Category } from "@/lib/types";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [products, categories] = await Promise.all([
    getProducts({ category: slug, limit: 200 }),
    getCategories(),
  ]);
  const name = findName(categories, slug) ?? products[0]?.category.name ?? "Collection";

  return <Listing eyebrow="The collection" title={name} products={products} />;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const categories = await getCategories();
  const name = findName(categories, slug) ?? slug;
  return { title: name };
}

function findName(categories: Category[], slug: string): string | undefined {
  for (const c of categories) {
    if (c.slug === slug) return c.name;
    if (c.children.length) {
      const hit = findName(c.children, slug);
      if (hit) return hit;
    }
  }
  return undefined;
}
