import type { NextConfig } from "next";

const projectDir = import.meta.dirname;

function resolveApiBaseUrl(): string {
  const fromEnv =
    process.env.NEXT_PUBLIC_API_URL?.trim() ||
    process.env.API_URL?.trim();

  if (fromEnv) return fromEnv.replace(/\/$/, "");

  return "http://localhost:3010/api";
}

const nextConfig: NextConfig = {
  turbopack: {
    root: projectDir,
  },
  env: {
    NEXT_PUBLIC_API_URL: resolveApiBaseUrl(),
  },
};

export default nextConfig;
