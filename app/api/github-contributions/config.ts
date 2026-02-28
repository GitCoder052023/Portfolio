export const GITHUB_CONFIG = {
  GRAPHQL_API: "https://api.github.com/graphql",
  REVALIDATE_TIME: 86400, // 24 hours
  QUERY: `
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
  `,
};

export const CONTRIBUTION_LEVEL_MAP: Record<string, 0 | 1 | 2 | 3 | 4> = {
  NONE: 0,
  FIRST_QUARTILE: 1,
  SECOND_QUARTILE: 2,
  THIRD_QUARTILE: 3,
  FOURTH_QUARTILE: 4,
};
