import type { Project } from "@/types/portfolio";

export const projects: Project[] = [
  {
    name: "業務システムのリプレース",
    summary: "既存の業務システムをPythonからPHPへ移行するプロジェクト",
    period: "2026 — 継続中",
    kind: "業務案件",
    position: "Lead Engineer",
    phases: ["要件定義", "設計", "実装", "テスト"],
    technologies: ["Python", "PHP", "Amazon ECS", "Aurora MySQL", "Redis", "GitHub Actions"],
    challenge: "設計資料が少なく、既存システムの仕様がコードと担当者の知識に分散していました。",
    contribution: "特性テストを作成して既存挙動を確認し、PythonからPHPへの段階的な移行方針を設計しました。",
    approach: "既存挙動を維持したまま移植した後、設計と非機能要件を見直しました。共通処理と開発ガイドラインも整備しました。",
    outcome: "稼働中の機能を維持したまま、段階的な移行を進めています。",
    status: "published"
  },
  {
    name: "FAQ型AIチャットボットの開発・改善",
    summary: "FAQ検索と生成AIを組み合わせたチャットボットの開発・改善プロジェクト",
    period: "2025",
    kind: "業務案件",
    position: "Lead Engineer",
    phases: ["要件定義", "技術選定", "設計", "実装", "テスト"],
    technologies: ["Python", "Next.js", "TypeScript", "AWS Lambda", "DynamoDB", "Azure AI Search"],
    challenge: "FAQ検索の精度と生成回答の安定性を確認しながら、公開に向けた調整が必要でした。",
    contribution: "検索方式、プロンプト、回答生成フローを再設計し、利用ログから改善候補を提案する機能も開発しました。",
    approach: "セマンティック検索へ移行し、回答生成の処理を段階ごとに分割しました。関連情報の抽出と誤回答の抑制を調整しました。",
    outcome: "チャットボットを公開し、利用ログをもとにFAQを見直す運用を整備しました。",
    status: "published"
  },
  {
    name: "SNS自動応答システム",
    summary: "投稿やメッセージへの自動応答を行う、イベント駆動型のサーバーレスシステム開発",
    period: "2025",
    kind: "業務案件",
    position: "Lead Engineer",
    phases: ["要件定義", "技術選定", "API審査対応", "設計", "実装", "運用"],
    technologies: ["Python", "FastAPI", "Next.js", "AWS Lambda", "DynamoDB", "External API"],
    challenge: "外部APIの仕様・審査要件への対応と、アクセス量に合わせて稼働する構成が必要でした。",
    contribution: "技術選定、API検証、審査対応、バックエンドと管理画面の実装を担当しました。",
    approach: "公式仕様と実APIの差異を小さな検証で確認し、AWS Lambda中心のサーバーレス構成を採用しました。",
    outcome: "AWS Lambdaを中心に構成し、月額数百円規模で運用しています。",
    status: "published"
  },
  {
    name: "ミニアプリ向けバックエンド開発",
    summary: "スタンプカードや会員向け機能を提供するミニアプリの、バックエンドAPIとデリバリー基盤の開発",
    period: "2022 — 2024",
    kind: "業務案件",
    position: "Backend Engineer / Lead Engineer",
    phases: ["設計", "API開発", "認証・認可", "CI/CD", "テスト"],
    technologies: ["Node.js", "PHP", "Laravel", "AWS", "RDB", "GitHub Actions", "Payment API"],
    challenge: "新しいプラットフォーム仕様への対応と、短い開発期間での品質確保が求められました。",
    contribution: "公式仕様を検証してAPIへ反映し、認証・認可の設計パターンを再利用できる形に整理しました。",
    approach: "過去案件の知見を共通化し、CI/CDを整備して変更の検証とリリースを自動化しました。",
    outcome: "共通化した設計とCI/CDを利用し、計画どおりにリリースしました。",
    status: "published"
  },
  {
    name: "マルチテナントAIサービス基盤",
    summary: "外部AIエンジンを統合し、複数顧客向けに提供するSaaS型バックエンドの新規開発",
    period: "2023",
    kind: "業務案件",
    position: "Backend Engineer",
    phases: ["設計", "実装", "テスト", "運用保守"],
    technologies: ["PHP", "Laravel", "Amazon ECS", "Amazon RDS", "Azure", "GitHub Actions"],
    challenge: "AIエンジン連携、テナント管理、顧客別設定を含むバックエンドの新規開発が必要でした。",
    contribution: "バックエンドの設計と実装を担当し、SaaSに必要な機能を開発しました。",
    approach: "レイヤードアーキテクチャを採用し、AIエンジンや外部サービスへの依存箇所を分離しました。",
    outcome: "外部サービス連携と顧客別設定を変更・追加できる構成にしました。",
    status: "published"
  }
];
