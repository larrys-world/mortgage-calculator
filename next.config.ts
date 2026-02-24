import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/mortgage-calculator',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;