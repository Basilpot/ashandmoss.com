import { ProductCard } from "./product-card";
import type { Product } from "@/lib/types";

export function ProductGrid({
  products,
  emptyText = "Nothing matches yet.",
}: {
  products: Product[];
  emptyText?: string;
}) {
  if (products.length === 0) {
    return <p className="mt-16 text-center text-muted-foreground">{emptyText}</p>;
  }
  return (
    <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
      {products.map((p) => (
        <ProductCard key={p.id} product={p} />
      ))}
    </div>
  );
}
