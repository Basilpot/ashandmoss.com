import { requireApiBaseUrl, requireApiKey } from "@/lib/env";

/**
 * Same-origin proxy for /api/v1/*, which is how the browser reaches the API.
 *
 * This exists to inject the API key, and it is a route handler rather than a
 * rewrite in next.config.ts for a specific reason: a rewrite can only remap a
 * URL, it cannot attach a header. The alternatives were a key in client code,
 * which ships it to every visitor in the JS bundle, and a NEXT_PUBLIC_ key, which
 * inlines it into the page. So the browser calls same-origin /api/v1/*, this adds
 * the bearer token on the way out, and the key never leaves the server.
 *
 * Because the key names the tenant, no X-Store-Host is sent. That is the point of
 * using a key: this storefront works from any hostname, including a custom domain
 * with no store_domain row registered against it.
 */
export const dynamic = "force-dynamic";

async function proxy(
  request: Request,
  context: { params: Promise<{ path: string[] }> },
) {
  const { path } = await context.params;
  const apiBase = requireApiBaseUrl();
  const apiKey = requireApiKey();

  const headers = new Headers(request.headers);
  headers.delete("host");
  headers.set("Authorization", `Bearer ${apiKey}`);

  const url = new URL(`${apiBase}/${path.join("/")}`);
  url.search = new URL(request.url).search;

  const response = await fetch(url, {
    method: request.method,
    headers,
    body:
      request.method === "GET" || request.method === "HEAD"
        ? undefined
        : request.body,
    redirect: "manual",
    duplex: "half",
  } as RequestInit & { duplex: "half" });

  // Do not forward content-encoding/content-length. The upstream can advertise an
  // encoding its body was not actually compressed with, and passing the header
  // through alongside an already-decoded stream makes every browser request fail
  // with ERR_CONTENT_DECODING_FAILED. Re-encoding is the runtime's job.
  const outHeaders = new Headers();
  response.headers.forEach((value, key) => {
    if (key === "content-encoding" || key === "content-length") return;
    outHeaders.set(key, value);
  });

  return new Response(response.body, { status: response.status, headers: outHeaders });
}

export const GET = proxy;
export const POST = proxy;
export const PUT = proxy;
export const PATCH = proxy;
export const DELETE = proxy;
