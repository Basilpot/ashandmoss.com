"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { CreateOrderInput } from "@/lib/types";

export default function CheckoutPage() {
  const router = useRouter();
  const cart = useCart();
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (cart.hydrated && cart.items.length === 0) {
      router.replace("/cart");
    }
  }, [cart.hydrated, cart.items.length, router]);

  if (!cart.hydrated || cart.items.length === 0) {
    return null;
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = new FormData(e.currentTarget);
    const input: CreateOrderInput = {
      items: cart.items.map((i) => ({
        productId: i.productId,
        ...(i.variantId ? { variantId: i.variantId } : {}),
        quantity: i.quantity,
      })),
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      address: String(form.get("address") ?? "").trim() || undefined,
      city: String(form.get("city") ?? "").trim() || undefined,
      note: String(form.get("note") ?? "").trim() || undefined,
    };
    try {
      const { order } = await createOrder(input);
      router.push(`/checkout/success?orderNumber=${encodeURIComponent(order.orderNumber)}`);
    } catch (err) {
      setError(err instanceof Error && err.message ? err.message : "Could not place order");
      setSubmitting(false);
    }
  }

  const inputClass =
    "mt-1 w-full border border-border bg-background px-3 py-2.5 text-sm focus:border-hunter-green focus:outline-none";

  return (
    <main className="mx-auto max-w-6xl px-5 py-12">
      <Link href="/cart" className="text-sm text-muted-foreground hover:text-foreground">
        ← Back to cart
      </Link>
      <h1 className="mt-6 text-3xl font-semibold">Checkout</h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_340px]">
        <form onSubmit={onSubmit} className="space-y-6">
          <fieldset>
            <legend className="text-sm font-medium">Contact</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-muted-foreground">Full name *</span>
                <input name="name" required className={inputClass} />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">Email *</span>
                <input name="email" type="email" required className={inputClass} />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted-foreground">Phone *</span>
                <input name="phone" type="tel" required className={inputClass} />
              </label>
            </div>
          </fieldset>

          <fieldset>
            <legend className="text-sm font-medium">Delivery</legend>
            <div className="mt-3 grid gap-4 sm:grid-cols-2">
              <label className="block text-sm">
                <span className="text-muted-foreground">Address *</span>
                <input name="address" required className={inputClass} />
              </label>
              <label className="block text-sm">
                <span className="text-muted-foreground">City *</span>
                <input name="city" required className={inputClass} />
              </label>
              <label className="block text-sm sm:col-span-2">
                <span className="text-muted-foreground">Order note (optional)</span>
                <textarea name="note" rows={3} className={inputClass} />
              </label>
            </div>
          </fieldset>

          {error ? (
            <p className="border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-hunter-green px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-pine-teal disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Placing order…" : "Place order"}
          </button>
          <p className="text-xs text-muted-foreground">
            No payment is taken online. We&apos;ll be in touch to confirm your order and arrange
            payment.
          </p>
        </form>

        <aside className="h-fit border border-border bg-card p-6">
          <h2 className="text-lg font-semibold">Order summary</h2>
          <ul className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
            {cart.items.map((item) => (
              <li key={`${item.productId}:${item.variantId ?? 0}`} className="flex justify-between gap-4">
                <span className="min-w-0 truncate">
                  {item.name} <span className="text-muted-foreground">× {item.quantity}</span>
                </span>
                <span className="shrink-0">
                  {formatPrice(item.price * item.quantity, "NPR")}
                </span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-sm">
            <span className="text-muted-foreground">Delivery</span>
            <span>Free</span>
          </div>
          <div className="mt-3 flex justify-between border-t border-border pt-3 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(cart.subtotal, "NPR")}</span>
          </div>
        </aside>
      </div>
    </main>
  );
}
