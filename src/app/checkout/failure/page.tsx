"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CheckoutFailurePage() {
  return (
    <Suspense fallback={<main className="mx-auto max-w-6xl px-5 py-24 text-center">Loading…</main>}>
      <Failure />
    </Suspense>
  );
}

function Failure() {
  const params = useSearchParams();
  const orderNumber = params.get("orderNumber");

  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center">
      <h1 className="text-3xl font-semibold">Payment unsuccessful</h1>
      <p className="mt-4 text-muted-foreground">
        {orderNumber
          ? <>Order <span className="font-medium text-foreground">{orderNumber}</span> could not be completed. Nothing was charged.</>
          : "Your payment could not be completed. Nothing was charged."}
      </p>
      <div className="mt-10 flex flex-wrap justify-center gap-3">
        <Link
          href="/checkout"
          className="bg-hunter-green px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-primary-foreground uppercase transition-colors hover:bg-pine-teal"
        >
          Try again
        </Link>
        <Link
          href="/cart"
          className="border border-hunter-green px-8 py-3.5 text-sm font-medium tracking-[0.14em] text-hunter-green uppercase transition-colors hover:bg-dust-grey"
        >
          Review cart
        </Link>
      </div>
    </main>
  );
}
