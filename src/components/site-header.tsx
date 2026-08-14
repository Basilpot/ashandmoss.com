import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { products } from "@/lib/catalog";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function uniqueValues(key: string) {
  const set = new Set<string>();
  for (const p of products) {
    const v = p.attributes[key];
    if (Array.isArray(v)) v.forEach((x) => set.add(x));
    else if (v) set.add(v);
  }
  return [...set];
}

const megaColumns = () => [
  { key: "Category", label: "By object", values: uniqueValues("Category") },
  { key: "Room", label: "By room", values: uniqueValues("Room") },
  { key: "Wood", label: "By material", values: uniqueValues("Wood") },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const columns = megaColumns();
  const featured = products.slice(0, 2);

  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      <div className="bg-pine-teal text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2 text-[10px] tracking-[0.16em] uppercase sm:text-[11px]">
          <span className="truncate">Rare objects, made one at a time</span>
          <span className="hidden shrink-0 sm:block">
            White-glove delivery on everything over $2,000
          </span>
        </div>
      </div>

      <div className="border-b border-border">
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-5 py-4 md:flex md:justify-between md:py-5">
          <Link to="/" className="min-w-0 leading-none" onClick={() => setMobileOpen(false)}>
            <span className="block truncate text-lg font-semibold tracking-[0.18em] uppercase sm:text-xl">
              Ash <span className="text-fern">&amp;</span> Moss
            </span>
            <span className="mt-1 block text-[9px] tracking-[0.3em] text-muted-foreground uppercase sm:text-[10px]">
              Curious &amp; Uncommon Objects
            </span>
          </Link>

          {/* Desktop nav */}
          <nav
            className="hidden items-center gap-6 text-sm md:flex"
            onMouseLeave={() => setOpen(false)}
          >
            <button
              type="button"
              onMouseEnter={() => setOpen(true)}
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className={`inline-flex items-center gap-1 transition-colors ${
                open ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              The Collection
              <ChevronDown
                className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
              />
            </button>
            <Link
              to="/craft"
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              onMouseEnter={() => setOpen(false)}
            >
              The Craft
            </Link>
            <Link
              to="/contact"
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
              onMouseEnter={() => setOpen(false)}
            >
              Commission
            </Link>
          </nav>

          {/* Mobile trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger
              aria-label="Open menu"
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </SheetTrigger>
            <SheetContent side="right" className="w-[86vw] max-w-sm overflow-y-auto p-0">
              <div className="border-b border-border px-5 py-5">
                <span className="text-lg font-semibold tracking-[0.18em] uppercase">
                  Ash <span className="text-fern">&amp;</span> Moss
                </span>
              </div>
              <nav className="px-5 py-6">
                <Link
                  to="/explore"
                  onClick={() => setMobileOpen(false)}
                  className="block text-base font-medium"
                >
                  The Collection
                </Link>
                <div className="mt-5 space-y-6">
                  {columns.map((col) => (
                    <div key={col.key}>
                      <p className="eyebrow text-fern">{col.label}</p>
                      <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                        {col.values.map((v) => (
                          <li key={v}>
                            <Link
                              to="/explore"
                              search={{ [col.key]: v }}
                              onClick={() => setMobileOpen(false)}
                            >
                              {v}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
                <div className="mt-8 space-y-3 border-t border-border pt-6 text-base">
                  <Link to="/craft" onClick={() => setMobileOpen(false)} className="block">
                    The Craft
                  </Link>
                  <Link to="/contact" onClick={() => setMobileOpen(false)} className="block">
                    Commission
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mega menu panel */}
        {open && (
          <div
            className="absolute inset-x-0 hidden border-b border-border bg-background shadow-lg md:block"
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[repeat(3,minmax(0,1fr))_320px]">
              {columns.map((col) => (
                <div key={col.key} className="min-w-0">
                  <p className="eyebrow text-fern">{col.label}</p>
                  <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                    {col.values.map((v) => (
                      <li key={v}>
                        <Link
                          to="/explore"
                          search={{ [col.key]: v }}
                          onClick={() => setOpen(false)}
                          className="transition-colors hover:text-foreground"
                        >
                          {v}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
              <div className="min-w-0">
                <p className="eyebrow text-fern">Odd &amp; wonderful</p>
                <div className="mt-4 space-y-4">
                  {featured.map((p) => (
                    <Link
                      key={p.slug}
                      to="/product/$slug"
                      params={{ slug: p.slug }}
                      onClick={() => setOpen(false)}
                      className="flex items-center gap-3"
                    >
                      <img
                        src={p.image}
                        alt={p.name}
                        loading="lazy"
                        className="h-16 w-16 shrink-0 object-cover"
                      />
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-medium">{p.name}</span>
                        <span className="block text-xs text-muted-foreground">
                          ${p.price.toLocaleString()}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
                <Link
                  to="/explore"
                  onClick={() => setOpen(false)}
                  className="mt-5 inline-block text-sm text-fern underline underline-offset-4"
                >
                  See everything →
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
