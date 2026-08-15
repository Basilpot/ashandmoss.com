"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";

export default function CartPage() {
  const cart = useCart();

  if (cart.items.length === 0) {
    return (
      <main className="mx-auto max-w-6xl px-5 py-24 text-center">
        <h1 className="text-3xl font-semibold">Your cart is empty</h1>
        <p className="mt-4 text-muted-foreground">
          Rare objects are waiting. Browse the collection and find your piece.
        </p>
        <Link
          href="/explore"
          className="mt-8 inline-block bg-hunter-green px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-pine-teal"
        >
          Explore the collection
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <h1 className="text-3xl font-semibold">Your cart</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <ul className="border-t border-border">
          {cart.items.map((item) => (
            <li
              key={`${item.productId}:${item.variantId ?? 0}`}
              className="flex gap-5 border-b border-border py-6"
            >
              <Link href={`/product/${item.slug}`} className="shrink-0">
                {item.image ? (
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={140}
                    height={140}
                    className="aspect-square w-28 object-cover sm:w-36"
                  />
                ) : (
                  <div className="aspect-square w-28 bg-muted sm:w-36" />
                )}
              </Link>
              <div className="flex min-w-0 flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <Link
                      href={`/product/${item.slug}`}
                      className="block truncate font-medium hover:underline"
                    >
                      {item.name}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {formatPrice(item.price, "NPR")} each
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => cart.remove(item.productId, item.variantId)}
                    className="text-xs text-muted-foreground underline-offset-2 hover:text-foreground hover:underline"
                  >
                    Remove
                  </button>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center border border-border">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() =>
                        cart.setQty(item.productId, item.variantId, item.quantity - 1)
                      }
                      className="h-9 w-9 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() =>
                        cart.setQty(item.productId, item.variantId, item.quantity + 1)
                      }
                      className="h-9 w-9 text-muted-foreground transition-colors hover:text-foreground"
                    >
                      +
                    </button>
                  </div>
                  <p className="font-medium">
                    {formatPrice(item.price * item.quantity, "NPR")}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <aside className="h-fit border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Summary</h2>
          <div className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Subtotal</span>
              <span>{formatPrice(cart.subtotal, "NPR")}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Delivery</span>
              <span>Free</span>
            </div>
            <div className="flex justify-between border-t border-border pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(cart.subtotal, "NPR")}</span>
            </div>
          </div>
          <Link
            href="/checkout"
            className="mt-6 block bg-hunter-green px-8 py-3.5 text-center text-sm font-medium tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-pine-teal"
          >
            Proceed to checkout
          </Link>
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Free white-glove delivery · Built to order
          </p>
        </aside>
      </div>
    </main>
  );
}
