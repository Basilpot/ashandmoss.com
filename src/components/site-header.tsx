"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShoppingCart, X, ChevronDown } from "lucide-react";
import { useCart } from "@/lib/cart";
import type { MenuItem, SiteConfig } from "@/lib/types";

export function SiteHeader({
  menu,
  siteConfig,
}: {
  menu: MenuItem[];
  siteConfig: SiteConfig;
}) {
  const [openItem, setOpenItem] = useState<MenuItem | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { count } = useCart();

  const simpleLinks = [
    { label: "The Craft", href: "/craft" },
    { label: "Commission", href: "/contact" },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      {/* Layer 1 — ribbon */}
      <div className="bg-pine-teal text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-5 py-2 text-[10px] tracking-[0.16em] uppercase sm:text-[11px]">
          <span className="truncate">Rare objects, made one at a time</span>
          <span className="hidden shrink-0 sm:block">
            White-glove delivery on everything over $2,000
          </span>
        </div>
      </div>

      {/* Layer 2 — logo, contact, socials */}
      <div className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <Link href="/" className="min-w-0 leading-none" onClick={() => setMobileOpen(false)}>
            <span className="block truncate text-lg font-semibold tracking-[0.18em] uppercase sm:text-xl">
              Ash <span className="text-fern">&amp;</span> Moss
            </span>
            <span className="mt-1 block text-[9px] tracking-[0.3em] text-muted-foreground uppercase sm:text-[10px]">
              {siteConfig.tagline ?? "Curious & Uncommon Objects"}
            </span>
          </Link>

          <div className="flex shrink-0 items-center gap-4 sm:gap-6">
            <div className="hidden items-center gap-6 text-xs text-muted-foreground lg:flex">
              {siteConfig.email && (
                <a href={`mailto:${siteConfig.email}`} className="transition-colors hover:text-foreground">
                  {siteConfig.email}
                </a>
              )}
              {siteConfig.phone && <span>{siteConfig.phone}</span>}
            </div>
            <Link
              href="/cart"
              aria-label={`Cart, ${count} item${count === 1 ? "" : "s"}`}
              className="relative inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground"
            >
              <ShoppingCart className="h-5 w-5" />
              {count > 0 ? (
                <span className="absolute -top-1.5 -right-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-hunter-green px-1 text-[10px] font-semibold text-primary-foreground">
                  {count}
                </span>
              ) : null}
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="inline-flex h-10 w-10 shrink-0 items-center justify-center border border-border md:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Layer 3 — menu bar (desktop). Panel is a descendant of <nav> so
          moving from a button down into the panel never leaves the hover area. */}
      <nav
        className="relative hidden border-b border-border md:block"
        onMouseLeave={() => setOpenItem(null)}
      >
        <div className="mx-auto flex max-w-6xl items-center gap-6 px-5 py-3 text-sm">
          {menu.map((item) =>
            item.children.length > 0 ? (
              <div key={item.id} className="relative">
                <button
                  type="button"
                  onMouseEnter={() => setOpenItem(item)}
                  onClick={() => setOpenItem(openItem?.id === item.id ? null : item)}
                  aria-expanded={openItem?.id === item.id}
                  className={`inline-flex items-center gap-1 transition-colors ${
                    openItem?.id === item.id
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${openItem?.id === item.id ? "rotate-180" : ""}`}
                  />
                </button>
              </div>
            ) : (
              <Link
                key={item.id}
                href={item.url}
                onMouseEnter={() => setOpenItem(null)}
                className="text-muted-foreground transition-colors hover:text-foreground"
              >
                {item.label}
              </Link>
            ),
          )}
          {/* ponytail: static pages aren't in the auto menu; keep primary links here */}
          {simpleLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onMouseEnter={() => setOpenItem(null)}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          ))}
        </div>

        {openItem && openItem.children.length > 0 && (
          <div className="absolute inset-x-0 top-full border-b border-border bg-background shadow-lg">
            <div className="mx-auto grid max-w-6xl gap-8 px-5 py-10 lg:grid-cols-[repeat(3,minmax(0,1fr))_320px]">
              {openItem.children.map((child) => (
                <MegaColumn key={child.id} child={child} />
              ))}
            </div>
          </div>
        )}
      </nav>
      </header>

      {/* Mobile drawer — rendered outside <header> so `fixed inset-0` stays
          viewport-relative; the header's backdrop-blur would otherwise become
          the containing block for fixed descendants and clip the drawer. */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-[86vw] max-w-sm overflow-y-auto bg-background shadow-xl">
            <div className="flex items-center justify-between border-b border-border px-5 py-5">
              <span className="text-lg font-semibold tracking-[0.18em] uppercase">
                Ash <span className="text-fern">&amp;</span> Moss
              </span>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setMobileOpen(false)}
                className="inline-flex h-8 w-8 items-center justify-center border border-border"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav className="px-5 py-6">
              {menu.map((item) => (
                <div key={item.id} className="mb-6">
                  <Link
                    href={item.url}
                    onClick={() => setMobileOpen(false)}
                    className="block text-base font-medium"
                  >
                    {item.label}
                  </Link>
                  {item.children.length > 0 && (
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
                      {item.children.map((child) =>
                        child.children.length > 0 ? (
                          <li key={child.id}>
                            <span className="text-fern">{child.label}</span>
                            <ul className="mt-1 space-y-1 pl-3">
                              {child.children.map((leaf) => (
                                <li key={leaf.id}>
                                  <Link
                                    href={leaf.url}
                                    onClick={() => setMobileOpen(false)}
                                    className="block transition-colors hover:text-foreground"
                                  >
                                    {leaf.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </li>
                        ) : (
                          <li key={child.id}>
                            <Link
                              href={child.url}
                              onClick={() => setMobileOpen(false)}
                              className="block transition-colors hover:text-foreground"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ),
                      )}
                    </ul>
                  )}
                </div>
              ))}
              <div className="mt-6 space-y-3 border-t border-border pt-6 text-base">
                {simpleLinks.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMobileOpen(false)}
                    className="block"
                  >
                    {l.label}
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

function MegaColumn({ child }: { child: MenuItem }) {
  if (child.children.length === 0) {
    return (
      <Link
        href={child.url}
        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        {child.label}
      </Link>
    );
  }
  return (
    <div className="min-w-0">
      <p className="eyebrow text-fern">
        <Link href={child.url} className="transition-colors hover:text-foreground">
          {child.label}
        </Link>
      </p>
      <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
        {child.children.map((leaf) => (
          <li key={leaf.id}>
            <Link href={leaf.url} className="transition-colors hover:text-foreground">
              {leaf.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
