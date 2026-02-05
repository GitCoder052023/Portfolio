import path from "node:path";
import dotenv from "dotenv";
import type { NextConfig } from "next";

dotenv.config({
  path: path.resolve(__dirname, ".env.local"),
});

const nextConfig: NextConfig = {
  // Image domains for external images (Clerk avatars, etc.)
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com",
      },
      {
        protocol: "https",
        hostname: "images.clerk.dev",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
      },
    ],
  },

  reactStrictMode: true,

  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "motion",
      "@clerk/nextjs",
    ],
  },

  async headers() {

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
