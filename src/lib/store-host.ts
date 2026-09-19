import "server-only";
import { headers } from "next/headers";

export async function getStoreHost() {
  const incoming = await headers();
  return incoming.get("x-forwarded-host") ?? incoming.get("host") ?? "ashandmoss.com";
}
