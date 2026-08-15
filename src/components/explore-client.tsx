"use client";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ProductCard } from "./product-card";
import type { Product } from "@/lib/types";

type Facet = { name: string; values: { value: string; count: number }[] };

function buildFacets(items: Product[]): Facet[] {
  const facets = new Map<string, Map<string, number>>();
  for (const p of items) {
    for (const attr of p.attributes ?? []) {
      if (!facets.has(attr.name)) facets.set(attr.name, new Map());
      const bucket = facets.get(attr.name)!;
      bucket.set(attr.value, (bucket.get(attr.value) ?? 0) + 1);
    }
  }
  return [...facets.entries()]
    .map(([name, values]) => ({
      name,
      values: [...values.entries()]
        .map(([value, count]) => ({ value, count }))
        .sort((a, b) => a.value.localeCompare(b.value)),
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

export function ExploreClient({ products }: { products: Product[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const facets = useMemo(() => buildFacets(products), [products]);

  const selected: Record<string, string[]> = useMemo(() => {
    const s: Record<string, string[]> = {};
    for (const facet of facets) {
      const raw = searchParams.getAll(facet.name);
      s[facet.name] = raw;
    }
    return s;
  }, [searchParams, facets]);

  const update = (next: Record<string, string[] | undefined>) => {
    const params = new URLSearchParams();
    for (const [k, v] of Object.entries(next)) {
      if (!v || v.length === 0) continue;
      for (const x of v) params.append(k, x);
    }
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const toggle = (facet: string, value: string) => {
    const current = selected[facet] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    update({ ...selected, [facet]: next.length ? next : undefined });
  };

  const results = products.filter((p) =>
    Object.entries(selected).every(([key, values]) => {
      if (!values.length) return true;
      const owned = p.attributes?.filter((a) => a.name === key).map((a) => a.value) ?? [];
      return values.some((v) => owned.includes(v));
    }),
  );
  const activeCount = Object.values(selected).reduce((n, v) => n + v.length, 0);

  return (
    <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
      <aside>
        <div className="flex items-baseline justify-between">
          <h2 className="eyebrow">Filter by</h2>
          {activeCount > 0 ? (
            <button
              onClick={() => update({})}
              className="text-xs text-fern underline underline-offset-4"
            >
              Clear ({activeCount})
            </button>
          ) : null}
        </div>
        <div className="mt-6 space-y-8">
          {facets.map((facet) => (
            <div key={facet.name}>
              <p className="text-sm font-medium">{facet.name}</p>
              <ul className="mt-3 space-y-2">
                {facet.values.map(({ value, count }) => {
                  const checked = selected[facet.name]?.includes(value) ?? false;
                  return (
                    <li key={value}>
                      <label className="flex cursor-pointer items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggle(facet.name, value)}
                          className="size-4 accent-[var(--hunter-green)]"
                        />
                        <span className={checked ? "text-foreground" : undefined}>
                          {value}
                        </span>
                        <span className="ml-auto text-xs text-muted-foreground/70">
                          {count}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </aside>

      <section>
        <p className="text-sm text-muted-foreground">
          Showing {results.length} of {products.length} pieces
        </p>
        {results.length === 0 ? (
          <p className="mt-16 text-center text-muted-foreground">
            Nothing matches those filters yet — try clearing one.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-3">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
