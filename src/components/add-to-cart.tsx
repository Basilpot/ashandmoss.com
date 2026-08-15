"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Product } from "@/lib/types";

export function AddToCart({ product }: { product: Product }) {
  const cart = useCart();
  const variants = product.variants ?? [];
  const [variantId, setVariantId] = useState<number | null>(
    variants.length ? variants[0].id : null,
  );
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const variant = variants.find((v) => v.id === variantId) ?? null;
  const maxStock = variant ? variant.stock : Number.POSITIVE_INFINITY;
  const soldOut = variant ? variant.stock <= 0 : false;
  const price = variant ? Number(variant.price) : product.price ?? 0;

  function handleAdd() {
    cart.add({
      productId: product.id,
      slug: product.slug,
      variantId,
      name: variant ? `${product.title} — ${variant.name}` : product.title,
      price,
      image: product.images[0] ?? variant?.image ?? "",
      quantity: qty,
      maxStock,
    });
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  }

  return (
    <div>
      {variants.length > 0 ? (
        <div className="mt-8">
          <p className="text-sm font-medium">Options</p>
          <div className="mt-3 space-y-2">
            {variants.map((v) => {
              const selected = v.id === variantId;
              return (
                <button
                  key={v.id}
                  type="button"
                  onClick={() => {
                    setVariantId(v.id);
                    setQty(1);
                    setAdded(false);
                  }}
                  className={`flex w-full items-center justify-between border px-4 py-3 text-left text-sm transition-colors ${
                    selected ? "border-hunter-green bg-dust-grey" : "border-border bg-card"
                  }`}
                >
                  <span className={selected ? "font-medium" : ""}>{v.name}</span>
                  <span className="text-muted-foreground">
                    {formatPrice(Number(v.price), product.priceCurrency)}
                    {v.stock === 0 ? " · Out of stock" : ""}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <div className="flex items-center border border-border">
          <button
            type="button"
            aria-label="Decrease quantity"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-11 w-10 text-muted-foreground transition-colors hover:text-foreground"
          >
            −
          </button>
          <span className="w-10 text-center text-sm font-medium">{qty}</span>
          <button
            type="button"
            aria-label="Increase quantity"
            onClick={() => setQty((q) => Math.min(maxStock, q + 1))}
            className="h-11 w-10 text-muted-foreground transition-colors hover:text-foreground"
          >
            +
          </button>
        </div>
        <button
          type="button"
          onClick={handleAdd}
          disabled={soldOut}
          className={`px-8 py-3.5 text-sm font-medium tracking-[0.14em] uppercase transition-colors ${
            soldOut
              ? "cursor-not-allowed bg-muted text-muted-foreground"
              : "bg-hunter-green text-primary-foreground hover:bg-pine-teal"
          }`}
        >
          {soldOut ? "Out of stock" : added ? "Added ✓" : "Add to cart"}
        </button>
        <Link
          href="/contact"
          className="border border-hunter-green px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-hunter-green uppercase transition-colors hover:bg-dust-grey"
        >
          Customise this piece
        </Link>
      </div>
    </div>
  );
}
