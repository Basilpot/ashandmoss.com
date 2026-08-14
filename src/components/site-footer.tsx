import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-pine-teal text-primary-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-lg font-semibold tracking-[0.18em] uppercase">Ash &amp; Moss</p>
          <p className="mt-3 max-w-xs text-sm text-primary-foreground/70">
            A small workshop making furniture to measure, one commission at a time.
          </p>
        </div>
        <div>
          <p className="eyebrow text-primary-foreground/60">Shop</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/explore">All pieces</Link>
            </li>
            <li>
              <Link to="/explore">Seating</Link>
            </li>
            <li>
              <Link to="/explore">Tables</Link>
            </li>
            <li>
              <Link to="/explore">Storage</Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-primary-foreground/60">Studio</p>
          <ul className="mt-4 space-y-2 text-sm text-primary-foreground/80">
            <li>
              <Link to="/craft">The craft</Link>
            </li>
            <li>
              <Link to="/contact">Commission a piece</Link>
            </li>
            <li>Care &amp; repair</li>
            <li>Trade program</li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-primary-foreground/60">Workshop</p>
          <p className="mt-4 text-sm text-primary-foreground/80">
            118 Mill Road
            <br />
            Bend, Oregon
            <br />
            hello@ashandmoss.com
          </p>
        </div>
      </div>
      <div className="border-t border-primary-foreground/15">
        <div className="mx-auto max-w-6xl px-5 py-5 text-xs text-primary-foreground/60">
          © {new Date().getFullYear()} Ash &amp; Moss Furniture Co. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
