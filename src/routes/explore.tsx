import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMemo } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { buildFacets, matchesFilters, products } from "@/lib/catalog";

const title = "Explore the Collection — Ash & Moss";
const description =
  "Filter hand-built furniture by timber, finish, upholstery, room and size. Every piece made to order.";

type Search = Record<string, string | string[] | undefined>;

export const Route = createFileRoute("/explore")({
  validateSearch: (search: Record<string, unknown>): Search => {
    const out: Search = {};
    for (const [k, v] of Object.entries(search)) {
      if (typeof v === "string") out[k] = v;
      else if (Array.isArray(v)) out[k] = v.map(String);
    }
    return out;
  },
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Explore,
});

function Explore() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/explore" });

  const facets = useMemo(() => buildFacets(products), []);

  const selected = useMemo(() => {
    const s: Record<string, string[]> = {};
    for (const facet of facets) {
      const raw = search[facet.name];
      s[facet.name] = raw === undefined ? [] : Array.isArray(raw) ? raw : [raw];
    }
    return s;
  }, [search, facets]);

  const results = products.filter((p) => matchesFilters(p, selected));
  const activeCount = Object.values(selected).reduce((n, v) => n + v.length, 0);

  const toggle = (facet: string, value: string) => {
    const current = selected[facet] ?? [];
    const next = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    navigate({
      search: (prev: Search) => ({ ...prev, [facet]: next.length ? next : undefined }),
      replace: true,
    });
  };

  return (
    <div className="min-h-screen">
      <SiteHeader />
      <main className="mx-auto max-w-6xl px-5 py-14">
        <p className="eyebrow text-fern">The collection</p>
        <h1 className="mt-2 text-4xl font-semibold">Explore every piece</h1>

        <div className="mt-12 grid gap-12 lg:grid-cols-[240px_1fr]">
          <aside>
            <div className="flex items-baseline justify-between">
              <h2 className="eyebrow">Filter by</h2>
              {activeCount > 0 ? (
                <button
                  onClick={() => navigate({ search: {}, replace: true })}
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
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            )}
          </section>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
