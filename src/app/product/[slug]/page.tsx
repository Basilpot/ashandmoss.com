import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct, getProducts, productImage } from "@/lib/api";
import { formatPrice } from "@/lib/format";
import { ProductCard } from "@/components/product-card";
import { ProductGallery } from "@/components/product-gallery";
import { AddToCart } from "@/components/add-to-cart";
import type { Product } from "@/lib/types";

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

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productLd(product)) }}
      />

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

      {product.faq && product.faq.length > 0 ? (
        <section className="mt-24 max-w-3xl">
          <h2 className="text-2xl font-semibold">Questions &amp; answers</h2>
          <div className="mt-6 border-t border-border">
            {product.faq.map((item, i) => (
              <details
                key={i}
                className="group border-b border-border py-4"
                open={i === 0}
              >
                <summary className="flex cursor-pointer items-center justify-between text-sm font-medium list-none [&::-webkit-details-marker]:hidden">
                  {item.q}
                  <span className="text-fern transition-transform group-open:rotate-45">+</span>
                </summary>
                <p className="mt-3 text-sm text-muted-foreground">{item.a}</p>
              </details>
            ))}
          </div>
        </section>
      ) : null}

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

function productLd(product: Product) {
  const variants = product.variants ?? [];
  const lowest = variants.length
    ? Math.min(...variants.map((v) => Number(v.price)))
    : product.price;
  const currency = product.priceCurrency ?? "NPR";
  const image = productImage(product) || undefined;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description ?? undefined,
    image,
    sku: product.sku ?? undefined,
    brand: { "@type": "Brand", name: product.brand.name },
    category: product.category.name,
    offers: {
      "@type": "Offer",
      price: lowest,
      priceCurrency: currency,
      availability: "https://schema.org/InStock",
      url: `https://ashandmoss.com/product/${product.slug}`,
    },
  };
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProduct(slug).catch(() => null);
  if (!product) return { title: "Piece not found", robots: { index: false } };
  const image = productImage(product) || undefined;
  return {
    title: product.title,
    description: product.description ?? undefined,
    alternates: { canonical: `/product/${product.slug}` },
    openGraph: {
      title: product.title,
      description: product.description ?? undefined,
      images: image ? [{ url: image, alt: product.title }] : undefined,
      type: "website",
    },
  };
}
