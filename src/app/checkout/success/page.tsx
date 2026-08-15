"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { getOrderByNumber } from "@/lib/api";
import { useCart } from "@/lib/cart";
import { formatPrice } from "@/lib/format";
import type { Order } from "@/lib/types";

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-6xl px-5 py-24 text-center">Loading…</main>}>
      <Success />
    </Suspense>
  );
}

function Success() {
  const params = useSearchParams();
  const orderNumber = params.get("orderNumber");
  const cart = useCart();
  const cleared = useRef(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (orderNumber && !cleared.current) {
      cleared.current = true;
      cart.clear();
    }
    if (orderNumber) {
      getOrderByNumber(orderNumber)
        .then(setOrder)
        .catch(() => setNotFound(true));
    }
  }, [orderNumber, cart]);

  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold">Thank you — order placed</h1>
      <p className="mt-4 text-muted-foreground">
        {orderNumber
          ? <>Your order number is <span className="font-medium text-foreground">{orderNumber}</span>. A confirmation email is on its way.</>
          : "Your order number is being processed."}
      </p>

      {order ? (
        <div className="mt-10 border border-border bg-card p-6 text-left">
          <h2 className="text-lg font-semibold">Order {order.orderNumber}</h2>
          <ul className="mt-4 space-y-3 border-t border-border pt-4 text-sm">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between gap-4">
                <span>
                  {item.productName}
                  {item.variantName ? ` — ${item.variantName}` : ""}{" "}
                  <span className="text-muted-foreground">× {item.quantity}</span>
                </span>
                <span>{formatPrice(Number(item.lineTotal), order.currency)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-border pt-4 text-base font-semibold">
            <span>Total</span>
            <span>{formatPrice(Number(order.totalAmount), order.currency)}</span>
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Status: {order.status.replace(/_/g, " ").toLowerCase()} · Payment:{" "}
            {order.payment?.status.toLowerCase() ?? "pending"}
          </p>
        </div>
      ) : notFound ? null : (
        <p className="mt-10 text-sm text-muted-foreground">Loading order details…</p>
      )}

      <Link
        href="/explore"
        className="mt-10 inline-block bg-hunter-green px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-pine-teal"
      >
        Continue exploring
      </Link>
    </main>
  );
}
