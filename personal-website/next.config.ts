import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**"
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/operations",
        destination: "/agro-industrial",
        permanent: true
      },
      {
        source: "/endowments",
        destination: "/impact",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
