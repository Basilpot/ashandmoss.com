import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    const apiBase = process.env.API_BASE_URL ?? "http://localhost:3000/api/v1";
    return [{ source: "/api/v1/:path*", destination: `${apiBase}/:path*` }];
  },

  images: {
    remotePatterns: [
      // Must match the API worker host. The old api.ashandmoss.com entry is
      // gone: the API moved to eapi.basilpot.com, and that hostname now falls
      // through to our own *.ashandmoss.com/* wildcard route, so it would serve
      // this storefront instead of any image.
      { protocol: "https", hostname: "eapi.basilpot.com", pathname: "/**" },
      { protocol: "http", hostname: "localhost", port: "3000", pathname: "/**" },
    ],
  },
};

export default nextConfig;
