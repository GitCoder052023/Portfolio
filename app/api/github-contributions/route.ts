import { NextRequest, NextResponse } from "next/server";
import { GitHubController } from "./controller";
import { GITHUB_CONFIG } from "./config";
import { rateLimiter } from "./rate-limiter";

// Revalidate data every 24 hours
export const revalidate = 86400;

export async function GET(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  
  if (!rateLimiter(ip)) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429 }
    );
  }

  return GitHubController.getContributions();
}

