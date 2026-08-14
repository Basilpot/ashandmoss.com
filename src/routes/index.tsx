import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { products } from "@/lib/catalog";
import hero from "@/assets/hero.jpg";
import workshop from "@/assets/workshop.jpg";

const title = "Ash & Moss — Custom Furniture Made to Measure";
const description =
  "Hand-built oak, ash and walnut furniture made to your measurements. Seating, tables, storage and beds from a small Oregon workshop.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Home,
});

const categories = ["Seating", "Tables", "Storage", "Beds"];

function Home() {
  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main>
        <section className="relative">
          <img
            src={hero}
            alt="Oak lounge chair with moss green upholstery in a sunlit room"
            width={1920}
            height={1200}
            className="h-[68vh] min-h-[420px] w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-pine-teal/80 via-pine-teal/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-6xl px-5">
              <p className="eyebrow text-primary-foreground/80">Ash &amp; Moss Workshop</p>
              <h1 className="mt-4 max-w-2xl text-4xl leading-[1.05] font-semibold text-primary-foreground sm:text-6xl">
                Furniture cut to your room, not to a catalogue.
              </h1>
              <p className="mt-5 max-w-xl text-primary-foreground/85">
                Every piece is built to order in solid hardwood — choose the timber, the
                finish, the dimensions. Then keep it for forty years.
              </p>
              <div className="mt-8">
                <Link
                  to="/explore"
                  className="inline-flex items-center bg-primary-foreground px-7 py-3 text-sm font-medium tracking-[0.14em] text-pine-teal uppercase transition-opacity hover:opacity-90"
                >
                  Explore the collection
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow text-fern">Made to order</p>
              <h2 className="mt-2 text-3xl font-semibold">Featured pieces</h2>
            </div>
            <Link to="/explore" className="text-sm text-fern underline underline-offset-4">
              View all {products.length} pieces
            </Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        <section className="bg-dust-grey/50">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
            <img
              src={workshop}
              alt="A woodworker planing an oak board in the workshop"
              loading="lazy"
              width={1400}
              height={900}
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
            <div>
              <p className="eyebrow text-fern">The craft</p>
              <h2 className="mt-2 text-3xl font-semibold">
                Three makers. No production line.
              </h2>
              <p className="mt-5 text-muted-foreground">
                We mill our own boards, cut joinery by hand where it matters, and finish
                with hardwax oil so a scratch can be healed rather than hidden. Nothing
                leaves the bench until it would be good enough for our own homes.
              </p>
              <Link
                to="/craft"
                className="mt-8 inline-flex bg-hunter-green px-7 py-3 text-sm font-medium tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-pine-teal"
              >
                Inside the workshop
              </Link>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold">Browse by room</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {categories.map((c) => (
              <Link
                key={c}
                to="/explore"
                search={{ Category: c }}
                className="group border border-border bg-card px-6 py-10 transition-colors hover:border-fern"
              >
                <span className="text-lg font-medium">{c}</span>
                <span className="mt-2 block text-sm text-muted-foreground">
                  {products.filter((p) => p.attributes["Category"] === c).length} pieces →
                </span>
              </Link>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
