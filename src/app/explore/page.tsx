import type { Metadata } from "next";
import { Suspense } from "react";
import { getProducts } from "@/lib/api";
import { ExploreClient } from "@/components/explore-client";
import { getSiteOrigin } from "@/lib/site-origin";

export const metadata: Metadata = {
  title: "Explore the Collection",
  description:
    "Filter hand-built furniture by timber, finish, upholstery, room and size. Every piece made to order.",
  alternates: { canonical: "/explore" },
  openGraph: { title: "Explore the Collection", type: "website" },
};

export default async function ExplorePage() {
  // ponytail: fetch all published pieces once and filter client-side;
  // server-side pagination only when the catalog outgrows 200
  const products = await getProducts({ limit: 200 });

  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <p className="eyebrow text-fern">The collection</p>
      <h1 className="mt-2 text-4xl font-semibold">Explore every piece</h1>
      <Suspense fallback={<p className="mt-12 text-muted-foreground">Loading…</p>}>
        <ExploreClient products={products} />
      </Suspense>
    </main>
  );
}
