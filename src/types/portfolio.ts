export type ContentStatus = "sample" | "published";

export type Profile = {
  handle: string;
  role: string;
  introduction: string;
  experienceYears?: number;
  specialties: string[];
  availability: string;
  workPreferences: string[];
};

export type Career = {
  period: string;
  organizationType: string;
  position: string;
  summary: string;
  responsibilities: string[];
  technologies: string[];
  role: string;
  highlights: string[];
  status: ContentStatus;
};

export type Project = {
  name: string;
  summary: string;
  period: string;
  kind: "業務案件" | "個人開発";
  position: string;
  phases: string[];
  technologies: string[];
  challenge: string;
  contribution: string;
  approach: string;
  outcome: string;
  githubUrl?: string;
  demoUrl?: string;
  status: ContentStatus;
};

export type Certification = {
  name: string;
  level: string;
  acquiredAt: string;
  expiresAt?: string;
  verificationUrl?: string;
  status: ContentStatus;
};

export type SkillCategory =
  | "Frontend"
  | "Backend"
  | "Database"
  | "Infrastructure / Cloud"
  | "DevOps"
  | "AI / Development Tools"
  | "Others";

export type Skill = {
  name: string;
  category: SkillCategory;
  professional: boolean;
  years?: number;
  usage: string;
  learning?: boolean;
  status: ContentStatus;
};

export type ContributionDay = {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
};

export type Repository = {
  name: string;
  description: string | null;
  url: string;
  stars: number;
  language: string | null;
  updatedAt: string;
};

export type GitHubData = {
  status: "ready" | "unconfigured" | "error";
  username: string;
  avatarUrl: string;
  profileUrl: string;
  publicRepos: number | null;
  totalStars: number | null;
  totalContributions: number | null;
  activeDays: number | null;
  currentStreak: number | null;
  topLanguages: { name: string; count: number }[];
  repositories: Repository[];
  contributions: ContributionDay[];
  updatedAt: string | null;
  message?: string;
};
