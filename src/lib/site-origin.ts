import "server-only";
import { headers } from "next/headers";

/**
 * The public origin this storefront is being served from, e.g.
 * `ashandmoss.com`. Used only for building absolute URLs — metadataBase,
 * canonical links, the sitemap, JSON-LD.
 *
 * Named for what it is rather than what it used to be. It was `getStoreHost` and
 * doubled as the tenant hint sent to the API, which is no longer how tenancy
 * works: the API key identifies the store, so this value has nothing to do with
 * which store you get. Leaving it called "storeHost" invited exactly the wrong
 * next change.
 */
export async function getSiteOrigin() {
  const incoming = await headers();
  const host = incoming.get("x-forwarded-host") ?? incoming.get("host");
  return host ? `https://${host}` : "https://ashandmoss.com";
}
