import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const configPath = resolve(root, "portfolio.config.json");
const outputPath = resolve(root, "public/data/github.json");
const config = JSON.parse(await readFile(configPath, "utf8"));
const username = config.githubUsername;
const token = process.env.GH_TOKEN || process.env.GITHUB_TOKEN || "";

if (!username || username === "your_handle") {
  console.log("GitHub user is not configured. Keeping the empty-state data.");
  process.exit(0);
}

const headers = {
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
  "User-Agent": "portfolio-static-data-builder",
  ...(token ? { Authorization: `Bearer ${token}` } : {})
};

async function request(url, options = {}) {
  const response = await fetch(url, { ...options, headers: { ...headers, ...options.headers } });
  if (!response.ok) throw new Error(`GitHub API ${response.status}: ${await response.text()}`);
  return response.json();
}

function contributionLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 5) return 2;
  if (count <= 9) return 3;
  return 4;
}

function currentStreak(days) {
  let streak = 0;
  for (let index = days.length - 1; index >= 0; index -= 1) {
    if (days[index].count === 0) break;
    streak += 1;
  }
  return streak;
}

try {
  const [profile, repositories] = await Promise.all([
    request(`https://api.github.com/users/${encodeURIComponent(username)}`),
    request(`https://api.github.com/users/${encodeURIComponent(username)}/repos?per_page=100&sort=updated&type=owner`)
  ]);

  const publicRepos = repositories.filter((repo) => !repo.private && !repo.fork);
  const featuredRepos = publicRepos.filter(
    (repo) => repo.name.toLowerCase() !== config.repositoryName.toLowerCase()
  );
  const languages = new Map();
  for (const repo of publicRepos) {
    if (repo.language) languages.set(repo.language, (languages.get(repo.language) || 0) + 1);
  }

  let contributionDays = [];
  let totalContributions = null;
  if (token) {
    const to = new Date();
    const from = new Date(to);
    from.setUTCFullYear(from.getUTCFullYear() - 1);
    const query = `query($login:String!,$from:DateTime!,$to:DateTime!){user(login:$login){contributionsCollection(from:$from,to:$to){contributionCalendar{totalContributions weeks{contributionDays{date contributionCount}}}}}}`;
    const graphql = await request("https://api.github.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query, variables: { login: username, from: from.toISOString(), to: to.toISOString() } })
    });
    if (graphql.errors) throw new Error(graphql.errors.map((error) => error.message).join("; "));
    const calendar = graphql.data.user.contributionsCollection.contributionCalendar;
    totalContributions = calendar.totalContributions;
    contributionDays = calendar.weeks.flatMap((week) => week.contributionDays).map((day) => ({
      date: day.date,
      count: day.contributionCount,
      level: contributionLevel(day.contributionCount)
    }));
  }

  const data = {
    status: "ready",
    username: profile.login,
    avatarUrl: profile.avatar_url,
    profileUrl: profile.html_url,
    publicRepos: profile.public_repos,
    totalStars: publicRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    totalContributions,
    activeDays: contributionDays.length ? contributionDays.filter((day) => day.count > 0).length : null,
    currentStreak: contributionDays.length ? currentStreak(contributionDays) : null,
    topLanguages: [...languages.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6).map(([name, count]) => ({ name, count })),
    repositories: featuredRepos.sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at)).slice(0, 4).map((repo) => ({
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      stars: repo.stargazers_count,
      language: repo.language,
      updatedAt: repo.updated_at
    })),
    contributions: contributionDays,
    updatedAt: new Date().toISOString(),
    message: contributionDays.length ? undefined : "Contributionデータは未取得です。"
  };

  await writeFile(outputPath, `${JSON.stringify(data, null, 2)}\n`);
  console.log(`Updated GitHub data for ${profile.login}.`);
} catch (error) {
  const previous = JSON.parse(await readFile(outputPath, "utf8"));
  if (previous.status === "ready") {
    console.warn(`Update failed; keeping the last valid data. ${error.message}`);
    process.exit(0);
  }
  console.error(error);
  process.exit(1);
}
