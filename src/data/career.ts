import type { Career } from "@/types/portfolio";

export const careers: Career[] = [
  {
    period: "2022 — 現在",
    organizationType: "WEBシステム開発会社（受託開発）",
    position: "Web Engineer / Lead Engineer",
    summary: "ミニアプリ、AIチャットボット、業務システムなどのWebサービス開発",
    responsibilities: ["要件定義", "アーキテクチャ設計", "バックエンド・フロントエンド開発", "運用改善"],
    technologies: ["Python", "PHP", "TypeScript", "Next.js", "Laravel", "FastAPI", "AWS", "Azure"],
    role: "リードエンジニア / 開発メンバー",
    highlights: ["サーバーレス構成による低コスト運用", "AI検索・生成品質の改善", "CI/CDと開発標準の整備"],
    status: "published"
  },
  {
    period: "2018 — 2021",
    organizationType: "ITソリューション企業（業務アプリケーション開発）",
    position: "Application Engineer",
    summary: "金融・通信領域の業務システムで、既存機能の改修からクラウド環境向けバックエンド開発",
    responsibilities: ["設計", "バックエンド開発", "影響調査", "テスト"],
    technologies: ["Java", "Spring Framework", "Python", "PostgreSQL", "AWS Lambda", "Amazon ECS"],
    role: "開発メンバー",
    highlights: ["複雑な業務ロジックを踏まえた実装", "既存システムの影響範囲を可視化", "クラウド環境に適した実装"],
    status: "published"
  },
  {
    period: "2016 — 2018",
    organizationType: "ITソリューション企業（データベース基盤構築・運用）",
    position: "Infrastructure Engineer",
    summary: "Oracleデータベース基盤の設計・構築・テストを担当し、リリース後の問い合わせや障害対応",
    responsibilities: ["基本設計", "詳細設計", "構築", "テスト", "運用"],
    technologies: ["Oracle Database", "Linux", "Windows"],
    role: "インフラ構築メンバー",
    highlights: ["データベース基盤の構築", "運用問い合わせ・障害対応", "安定運用の継続支援"],
    status: "published"
  }
];
