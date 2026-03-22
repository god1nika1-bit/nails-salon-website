import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/nails-salon-website",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
