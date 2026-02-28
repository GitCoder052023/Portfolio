import { NextResponse } from "next/server";
import { SITE_CONFIG } from "@/app/config/site";

const GITHUB_GRAPHQL_API = "https://api.github.com/graphql";

// Revalidate data every 24 hours (86400 seconds)
export const revalidate = 86400;

export async function GET() {
  const username = SITE_CONFIG.githubUsername;
  const token = process.env.GITHUB_TOKEN; // Ensure this is set in your .env or .env.local

  if (!token) {
    return NextResponse.json(
      { error: "GitHub token is not configured on the server." },
      { status: 500 }
    );
  }

  const query = `
    query($userName: String!) { 
      user(login: $userName) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                contributionLevel
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch(GITHUB_GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { userName: username },
      }),
      cache: "force-cache",
      next: { revalidate: 86400 }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("GitHub API error:", response.status, errorText);
      return NextResponse.json(
        { error: "Failed to fetch GitHub data" },
        { status: response.status }
      );
    }

    const json = await response.json();
    
    if (json.errors) {
      console.error("GitHub GraphQL errors:", json.errors);
      return NextResponse.json(
        { error: "GraphQL error returned from GitHub." },
        { status: 500 }
      );
    }

    const calendar = json?.data?.user?.contributionsCollection?.contributionCalendar;
    
    if (!calendar) {
      return NextResponse.json(
        { error: "Could not find contribution data for the user." },
        { status: 404 }
      );
    }

    const levelMap: Record<string, 0 | 1 | 2 | 3 | 4> = {
      NONE: 0,
      FIRST_QUARTILE: 1,
      SECOND_QUARTILE: 2,
      THIRD_QUARTILE: 3,
      FOURTH_QUARTILE: 4,
    };

    const contributions = calendar.weeks.flatMap((week: any) => 
      week.contributionDays.map((day: any) => ({
        date: day.date,
        count: day.contributionCount,
        level: levelMap[day.contributionLevel] || 0
      }))
    );

    return NextResponse.json({
      contributions,
      total: calendar.totalContributions
    });

  } catch (error) {
    console.error("Error fetching GitHub contributions:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
