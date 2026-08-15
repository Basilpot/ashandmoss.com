import { ProductGrid } from "./product-grid";
import type { Product } from "@/lib/types";

export function Listing({
  title,
  eyebrow,
  products,
}: {
  title: string;
  eyebrow: string;
  products: Product[];
}) {
  return (
    <main className="mx-auto max-w-6xl px-5 py-14">
      <p className="eyebrow text-fern">{eyebrow}</p>
      <h1 className="mt-2 text-4xl font-semibold">{title}</h1>
      <p className="mt-4 text-sm text-muted-foreground">
        Showing {products.length} {products.length === 1 ? "piece" : "pieces"}
      </p>
      <ProductGrid
        products={products}
        emptyText="Nothing in this collection yet."
      />
    </main>
  );
}
