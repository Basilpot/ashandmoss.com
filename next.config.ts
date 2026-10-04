import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBase = process.env.API_BASE_URL ?? "http://localhost:3000/api/v1";
    return [{ source: "/api/v1/:path*", destination: `${apiBase}/:path*` }];
  },

  images: {
    remotePatterns: [
      // Must match the API worker host, or next/image refuses to optimise it.
      // Followed the API through two moves: api.ashandmoss.com -> eapi.basilpot.com
      // -> ecommerce.basilpot.com when the catalogue API was split out of the
      // shared worker. Both old hostnames now fall through to our own
      // *.ashandmoss.com/* wildcard route and would serve this storefront
      // instead of an image.
      { protocol: "https", hostname: "ecommerce.basilpot.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/**" },
    ],
  },
};

export default nextConfig;
