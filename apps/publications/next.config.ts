import path from "node:path";
import dotenv from "dotenv";
import type { NextConfig } from "next";

// 🔥 FORCE-LOAD env from THIS app directory
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

    // CSP Header
    const cspHeader = `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' https://clerk.jonathan-mott.com https://warm-mako-97.clerk.accounts.dev https://clerk.com https://*.clerk.accounts.dev;
      style-src 'self' 'unsafe-inline';
      img-src 'self' blob: data: https://*.clerk.com https://img.clerk.com https://images.clerk.dev https://*.supabase.co;
      font-src 'self';
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'none';
      connect-src 'self' https://clerk.jonathan-mott.com https://warm-mako-97.clerk.accounts.dev https://clerk.com https://*.clerk.accounts.dev https://*.supabase.co;
      block-all-mixed-content;
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, ' ').trim();

    return [
      {
        source: "/(.*)",
        headers: [
          { key: "Content-Security-Policy", value: cspHeader },
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
