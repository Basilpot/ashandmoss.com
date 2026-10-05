import Image from "next/image";
import Link from "next/link";
import { getCategories, getProducts } from "@/lib/api";
import type { SiteConfig } from "@/lib/types";
import { ProductCard } from "@/components/product-card";
import { HeroCarousel } from "@/components/hero-carousel";

export async function FurnitureHome({ siteOrigin, siteConfig }: { siteOrigin: string; siteConfig: SiteConfig }) {
  const [featured, categories] = await Promise.all([
    getProducts({ isFeatured: "true", limit: 8 }),
    getCategories(),
  ]);
  const roots = categories.filter((category) => !category.parentId);
  const name = siteConfig.name ?? "Ash & Moss";
  const heroes = (siteConfig.heroes ?? []).filter((hero) => hero.visible && hero.image);
  const organizationLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url: siteOrigin,
    description: siteConfig.description ?? siteConfig.tagline,
    sameAs: Object.values(siteConfig.social ?? {}).filter(Boolean),
  };

  return (
    <div className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationLd) }} />
      <main>
        {heroes.length ? <HeroCarousel heroes={heroes} /> : <section className="relative">
          <Image src="/images/hero.jpg" alt="Oak lounge chair with moss green upholstery in a sunlit room" width={1920} height={1200} priority className="h-[68vh] min-h-[420px] w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-pine-teal/80 via-pine-teal/40 to-transparent" />
          <div className="absolute inset-0 flex items-center">
            <div className="mx-auto w-full max-w-6xl px-5">
              <p className="eyebrow text-primary-foreground/80">{name} Workshop</p>
              <h1 className="mt-4 max-w-2xl text-4xl leading-[1.05] font-semibold text-primary-foreground sm:text-6xl">Furniture cut to your room, not to a catalogue.</h1>
              <p className="mt-5 max-w-xl text-primary-foreground/85">{siteConfig.tagline ?? "Every piece is built to order in solid hardwood."}</p>
              <div className="mt-8"><Link href="/explore" className="inline-flex items-center bg-primary-foreground px-7 py-3 text-sm font-medium tracking-[0.14em] text-pine-teal uppercase transition-opacity hover:opacity-90">Explore collection</Link></div>
            </div>
          </div>
        </section>}

        <section className="mx-auto max-w-6xl px-5 py-20">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div><p className="eyebrow text-fern">Made to order</p><h2 className="mt-2 text-3xl font-semibold">Featured pieces</h2></div>
            <Link href="/explore" className="text-sm text-fern underline underline-offset-4">View all pieces</Link>
          </div>
          <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4">{featured.slice(0, 8).map((product) => <ProductCard key={product.id} product={product} />)}</div>
        </section>

        {siteConfig.about?.visible ? <section className="bg-dust-grey/50">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:grid-cols-2">
            <Image src={siteConfig.about.image || "/images/workshop.jpg"} alt="" width={1400} height={900} className="aspect-[4/3] w-full rounded-sm object-cover" />
            <div>
              <p className="eyebrow text-fern">{siteConfig.about.eyebrow}</p><h2 className="mt-2 text-3xl font-semibold">{siteConfig.about.title}</h2><p className="mt-5 text-muted-foreground">{siteConfig.about.body}</p>{siteConfig.about.linkUrl && siteConfig.about.linkLabel ? <Link href={siteConfig.about.linkUrl} className="mt-8 inline-flex bg-hunter-green px-7 py-3 text-sm font-medium text-primary-foreground uppercase">{siteConfig.about.linkLabel}</Link> : null}
            </div>
          </div>
        </section> : null}

        {(siteConfig.benefits ?? []).some((benefit) => benefit.visible) ? <section className="mx-auto max-w-6xl px-5 py-12">{siteConfig.benefitsTitle ? <div className="mb-8 flex flex-wrap items-end justify-between gap-4"><div><h2 className="text-3xl font-semibold">{siteConfig.benefitsTitle}</h2></div></div> : null}<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">{siteConfig.benefits?.filter((benefit) => benefit.visible).map((benefit) => <div key={benefit.id} className="border border-border p-5"><h3 className="font-semibold">{benefit.title}</h3><p className="mt-2 text-sm text-muted-foreground">{benefit.description}</p></div>)}</div></section> : null}

        <section className="mx-auto max-w-6xl px-5 py-20">
          <h2 className="text-3xl font-semibold">Browse by category</h2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {roots.map((category) => (
              <Link key={category.id} href={`/category/${category.slug}`} className="group border border-border bg-card px-6 py-10 transition-colors hover:border-fern">
                <span className="text-lg font-medium">{category.name}</span>
                <span className="mt-2 block text-sm text-muted-foreground">{category._count.products} pieces →</span>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
