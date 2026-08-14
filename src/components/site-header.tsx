import { Link } from "@tanstack/react-router";

const nav = [
  { to: "/explore", label: "Explore" },
  { to: "/craft", label: "The Craft" },
  { to: "/contact", label: "Commission" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur">
      <div className="bg-pine-teal text-primary-foreground">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2 text-[11px] tracking-[0.16em] uppercase">
          <span>Made to order in the Cascades</span>
          <span className="hidden sm:block">Free white-glove delivery over $2,000</span>
        </div>
      </div>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 border-b border-border px-5 py-5">
        <Link to="/" className="leading-none">
          <span className="block text-xl font-semibold tracking-[0.18em] uppercase">
            Ash <span className="text-fern">&amp;</span> Moss
          </span>
          <span className="mt-1 block text-[10px] tracking-[0.3em] text-muted-foreground uppercase">
            Custom Furniture
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          {nav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              className="text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "text-foreground font-medium" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
