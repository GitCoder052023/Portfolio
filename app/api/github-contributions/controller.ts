import { NextRequest, NextResponse } from "next/server";
import { SITE_CONFIG } from "@/app/config/site";
import { GitHubService } from "./service";
import { CONTRIBUTION_LEVEL_MAP } from "./config";
import { ContributionsApiResponse, ErrorResponse, GitHubContributionDay } from "@/app/types/github";

export class GitHubController {
  static async getContributions(req: NextRequest): Promise<NextResponse<ContributionsApiResponse | ErrorResponse>> {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year");

    let from: string | undefined;
    let to: string | undefined;

    if (year) {
      from = `${year}-01-01T00:00:00Z`;
      to = `${year}-12-31T23:59:59Z`;
    }

    const username = SITE_CONFIG.githubUsername;
    const token = process.env.GITHUB_TOKEN;

    if (!token) {
      return NextResponse.json(
        { error: "GitHub token is not configured on the server." },
        { status: 500 }
      );
    }

    try {
      const data = await GitHubService.fetchContributions(username, token, from, to);

      if (data.errors) {
        console.error("GitHub GraphQL errors:", data.errors);
        return NextResponse.json(
          { error: "GraphQL error returned from GitHub." },
          { status: 500 }
        );
      }

      const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;

      if (!calendar) {
        return NextResponse.json(
          { error: "Could not find contribution data for the user." },
          { status: 404 }
        );
      }

      const contributions = calendar.weeks.flatMap((week) =>
        week.contributionDays.map((day: GitHubContributionDay) => ({
          date: day.date,
          count: day.contributionCount,
          level: CONTRIBUTION_LEVEL_MAP[day.contributionLevel] || 0
        }))
      );

      return NextResponse.json({
        contributions,
        total: calendar.totalContributions
      });

    } catch (error: any) {
      console.error("Error in GitHubController:", error);
      return NextResponse.json(
        { error: error.message || "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
