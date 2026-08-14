import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { formatPrice, products } from "@/lib/catalog";

export const Route = createFileRoute("/product/$slug")({
  loader: ({ params }) => {
    const product = products.find((p) => p.slug === params.slug);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Piece not found — Ash & Moss" }, { name: "robots", content: "noindex" }],
      };
    }
    const t = `${loaderData.product.name} — Ash & Moss`;
    const d = loaderData.product.blurb;
    return {
      meta: [
        { title: t },
        { name: "description", content: d },
        { property: "og:title", content: t },
        { property: "og:description", content: d },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const related = products.filter((p) => p.slug !== product.slug).slice(0, 3);
  const onSale = product.compareAt && product.compareAt > product.price;

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-12">
        <Link to="/explore" className="text-sm text-muted-foreground hover:text-foreground">
          ← Back to collection
        </Link>

        <div className="mt-8 grid gap-14 md:grid-cols-2">
          <img
            src={product.image}
            alt={product.name}
            width={900}
            height={900}
            className="aspect-square w-full rounded-sm bg-muted object-cover"
          />

          <div>
            <p className="eyebrow text-fern">{String(product.attributes["Category"])}</p>
            <h1 className="mt-3 text-3xl font-semibold sm:text-4xl">{product.name}</h1>
            <p className="mt-4 text-2xl font-medium text-hunter-green">
              {formatPrice(product.price)}
              {onSale ? (
                <span className="ml-3 text-base text-muted-foreground line-through">
                  {formatPrice(product.compareAt!)}
                </span>
              ) : null}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Built to order · Lead time {product.leadTime}
            </p>

            <p className="mt-7 text-muted-foreground">{product.blurb}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button className="bg-hunter-green px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-pine-teal">
                Add to cart
              </button>
              <Link
                to="/contact"
                className="border border-hunter-green px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-hunter-green uppercase transition-colors hover:bg-dust-grey"
              >
                Customise this piece
              </Link>
            </div>

            <dl className="mt-10 border-t border-border">
              {Object.entries(product.attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between border-b border-border py-3 text-sm">
                  <dt className="text-muted-foreground">{key}</dt>
                  <dd className="font-medium">
                    {Array.isArray(value) ? value.join(", ") : value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <section className="mt-24">
          <h2 className="text-2xl font-semibold">From the same bench</h2>
          <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
