import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // other experimental options can go here
  },
  compilerOptions: {
    baseUrl: "./src"
  }
};

export default nextConfig;
