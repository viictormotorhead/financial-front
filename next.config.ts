import type { NextConfig } from "next";

const projectDir = import.meta.dirname;

const nextConfig: NextConfig = {
  turbopack: {
    root: projectDir,
  },
};

export default nextConfig;
