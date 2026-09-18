import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/assets/books/diwan-al-zill-al-mutaman/:path*",
        destination: "/assets/al-maqam/diwan-al-zill-al-mutaman/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
