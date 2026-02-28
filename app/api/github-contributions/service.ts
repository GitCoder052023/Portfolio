import { GITHUB_CONFIG } from "./config";
import { GitHubGraphQLResponse } from "@/app/types/github";

export class GitHubService {
  static async fetchContributions(username: string, token: string): Promise<GitHubGraphQLResponse> {
    const response = await fetch(GITHUB_CONFIG.GRAPHQL_API, {
      method: "POST",
      headers: {
        Authorization: `bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: GITHUB_CONFIG.QUERY,
        variables: { userName: username },
      }),
      cache: "force-cache",
      next: { revalidate: GITHUB_CONFIG.REVALIDATE_TIME }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`GitHub API error: ${response.status} - ${errorText}`);
    }

    return response.json();
  }
}
