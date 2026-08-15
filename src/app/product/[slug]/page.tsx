import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCart } from "@/components/add-to-cart";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  if (!product) notFound();

  const related = await getProducts({
    category: product.category.slug,
    limit: 4,
  }).then((list) => list.filter((p) => p.slug !== slug).slice(0, 3));

  const variants = product.variants ?? [];
  const lowest = variants.length
    ? Math.min(...variants.map((v) => Number(v.price)))
    : product.price;
  const currency = product.priceCurrency ?? "NPR";
  const onSale = product.compareAtPrice && product.compareAtPrice > lowest;

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/explore" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to collection
      </Link>

      <div className="mt-8 grid gap-14 md:grid-cols-2">
        <ProductGallery
          images={product.images.length ? product.images : [variants.find((v) => v.image)?.image ?? ""]}
          title={product.title}
        />

        <div>
          <p className="eyebrow text-fern">{product.category.name}</p>
          <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{product.title}</h1>
          <p className="mt-4 text-2xl font-medium text-hunter-green">
            {formatPrice(lowest, currency)}
            {product.maxPrice && product.maxPrice > lowest ? (
              <span className="ml-1 text-base text-muted-foreground">
                – {formatPrice(product.maxPrice, currency)}
              </span>
            ) : null}
            {onSale ? (
              <span className="ml-3 text-base text-muted-foreground line-through">
                {formatPrice(product.compareAtPrice!, currency)}
              </span>
            ) : null}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            by {product.brand.name} · Built to order
          </p>

          {product.description ? (
            <p className="mt-7 text-muted-foreground">{product.description}</p>
          ) : null}

          <AddToCart product={product} />

          {product.attributes && product.attributes.length > 0 ? (
            <dl className="mt-10 border-t border-border">
              {product.attributes.map((a) => (
                <div
                  key={a.name}
                  className="flex justify-between border-b border-border py-3 text-sm"
                >
                  <dt className="text-muted-foreground">{a.name}</dt>
                  <dd className="font-medium">{a.value}</dd>
                </div>
              ))}
            </dl>
          ) : null}
        </div>
      </div>

      {related.length > 0 ? (
        <section className="mt-24">
          <h2 className="text-2xl font-semibold">From the same collection</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  if (!product) return { title: "Piece not found", robots: { index: false } };
  return {
    title: product.title,
    description: product.description ?? undefined,
    openGraph: { title: product.title },
  };
}
