import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { ContributionDay, GitHubData } from "@/types/portfolio";

const emptyData: GitHubData = {
  status: "unconfigured",
  username: "",
  avatarUrl: "",
  profileUrl: "",
  publicRepos: null,
  totalStars: null,
  totalContributions: null,
  activeDays: null,
  currentStreak: null,
  topLanguages: [],
  repositories: [],
  contributions: [],
  yearlyContributions: [],
  updatedAt: null,
  message: "GitHubデータは未取得です。"
};

export function getGitHubData(): GitHubData {
  try {
    const file = join(process.cwd(), "public", "data", "github.json");
    return JSON.parse(readFileSync(file, "utf8")) as GitHubData;
  } catch {
    return emptyData;
  }
}

export function contributionGrid(days: ContributionDay[]): ContributionDay[] {
  if (days.length) return days.slice(-371);
  return Array.from({ length: 371 }, (_, index) => ({
    date: "",
    count: 0,
    level: 0,
    _placeholder: index
  })) as ContributionDay[];
}

export function formatUpdatedAt(value: string | null): string {
  if (!value) return "未取得";
  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Asia/Tokyo"
  }).format(new Date(value));
}
