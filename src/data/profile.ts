import type { Profile } from "@/types/portfolio";
import { portfolioConfig } from "@/lib/config";

export const profile: Profile = {
  handle: portfolioConfig.githubUsername,
  role: "Web Engineer",
  introduction:
    "データベース基盤の構築・運用からキャリアを始め、現在はバックエンド開発、AWS、AI機能開発を担当しています。要件整理、設計、実装、テスト、運用改善を経験しています。",
  experienceYears: 10,
  specialties: ["Backend & API", "Serverless on AWS", "AI-enabled Products"],
  availability: "副業・業務委託：相談可",
  workPreferences: [
    "バックエンド・API開発",
    "AWSを使った設計・実装",
    "既存システムの段階的な改善",
    "AI機能の開発"
  ]
};
