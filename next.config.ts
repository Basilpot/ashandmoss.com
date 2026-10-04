import type { NextConfig } from "next";

import { requireApiBaseUrl } from "./src/lib/env";

// Called at config load, so a missing value fails the build here rather than
// producing a storefront that 404s every request in production.
const API_BASE_URL = requireApiBaseUrl();
const apiHostname = new URL(API_BASE_URL).hostname;

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBase = API_BASE_URL;
    return [{ source: "/api/v1/:path*", destination: `${apiBase}/:path*` }];
  },

  images: {
    remotePatterns: [
      // Derived from API_BASE_URL rather than written out. This was the third
      // place the API hostname lived (the others being the env var and the rewrite
      // above) and it drifted twice: api.ashandmoss.com -> eapi.basilpot.com ->
      // ecommerce.basilpot.com. A stale entry fails quietly — next/image just
      // refuses to optimise, so product photography 400s on the live site while
      // the build stays green. One source of truth instead.
      { protocol: "https", hostname: apiHostname, pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/**" },
    ],
  },
};

export default nextConfig;
