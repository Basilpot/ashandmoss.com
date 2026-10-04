/**
 * Required configuration for the storefront's server side.
 *
 * This used to be `process.env.API_BASE_URL ?? "http://localhost:3000/api/v1"`,
 * which turns "you forgot an env var" into a green build that 404s every request
 * in production. `.env.production` is not committed (see .gitignore), so a fresh
 * clone genuinely does not have this set and must be told so loudly.
 *
 * A function, not a module-scope constant, and that is load-bearing:
 * `src/lib/api.ts` is imported by two client pages under /checkout, so anything
 * evaluated at import time in this module also runs in the browser — where
 * `process.env.API_BASE_URL` is undefined. A top-level `required()` call here
 * would throw during client hydration and take the checkout page down, while
 * still building perfectly green. Calling it inside the server branch means the
 * browser never evaluates it.
 *
 * Browsers never need this value anyway: they call the same-origin /api/v1/* path,
 * which next.config.ts rewrites here.
 */
export function requireApiBaseUrl(): string {
  const value = process.env.API_BASE_URL;
  if (!value || !value.trim()) {
    throw new Error(
      "[config] API_BASE_URL is not set. Copy .env.example to .env.local (dev) or " +
        ".env.production (deploy) and fill it in. Refusing to fall back to a " +
        "default host, because a wrong default fails silently.",
    );
  }
  return value.replace(/\/$/, "");
}