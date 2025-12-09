import { join } from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["@takumi-rs/image-response"],
  turbopack: {
    root: join(__dirname, "..", ".."),
  },
};

export default nextConfig;