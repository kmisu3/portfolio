# Web Engineer Portfolio

匿名で副業・業務委託案件へ応募するための、1ページ構成のWebエンジニア向けポートフォリオです。Next.jsのStatic Exportで生成し、GitHub Pagesへ公開できます。

現在の経歴・案件・資格・スキルは、提供された職務経歴をもとに会社名・氏名・顧客情報を除き、公開向けに要約しています。仮データを使う場合は `sample` として登録し、実績と明確に区別できます。

## 1. 使用技術

- Next.js 16 / App Router / React 19 / TypeScript
- Tailwind CSS 4（基盤）とカスタムCSS
- Lucide React
- GitHub REST API / GraphQL API
- GitHub Actions / GitHub Pages

## 2. ローカル起動

Node.js 24系とnpmを推奨します。

```bash
npm install
npm run dev
```

ブラウザで `http://localhost:3000` を開きます。ローカルでは `basePath` を付けず、GitHub Actionsのビルド時だけ `/portfolio` を付けます。

## 3. 開発コマンド

```bash
npm run dev           # 開発サーバー
npm run lint          # ESLint
npm run typecheck     # TypeScriptチェック
npm run github:update # GitHub公開データの更新
npm run build         # out/へ静的書き出し
npm run check         # lint・型チェック・ビルド
```

## 4. 基本設定とプロフィール編集

まず [`portfolio.config.json`](./portfolio.config.json) を編集します。

- `repositoryName`: GitHubリポジトリ名。公開パスにも使用
- `githubUsername`: GitHubユーザー名。サイト・データ取得処理の共通設定
- `contentMode`: 確認時は `sample`、公開時は `published`
- `contactEmail`: 公開専用メール。空文字ならメールボタンを非表示
- `siteTitle` / `siteDescription`: SEO・OGP用テキスト

自己紹介、肩書き、得意領域、稼働条件は [`src/data/profile.ts`](./src/data/profile.ts) で編集します。ハンドルネームは `portfolio.config.json` と合わせて変更してください。

## 5. コンテンツの追加・変更

表示データはコンポーネントから分離されています。

| 内容 | 編集ファイル |
| --- | --- |
| 職務経歴 | `src/data/career.ts` |
| 開発実績 | `src/data/projects.ts` |
| AWS認定資格 | `src/data/certifications.ts` |
| 技術スタック | `src/data/skills.ts` |

各項目の `status` を次のように設定します。

- `sample`: `contentMode: "sample"` のときだけ表示
- `published`: 常に表示する公開用データ

現在は `contentMode: "published"` です。仮データを確認するときだけ `sample` に変更してください。未設定の任意項目は表示されず、配列が空でも空状態が表示されます。

### 職務経歴

`career.ts` の配列へ新しい順に追加します。会社名や顧客名ではなく、`organizationType` に「SaaS開発企業」などの種別を記載してください。

### プロジェクト

`projects.ts` へ追加します。非公開案件はコードや固有の構成を開示せず、課題、自分の担当範囲、工夫、確認可能な成果を記載します。公開可能な場合だけ `githubUrl` と `demoUrl` を追加します。

### AWS認定資格

`certifications.ts` へ正式名称、区分、取得年月を追加します。期限切れの資格を有効な認定として掲載しないでください。公式バッジを追加する場合はAWSのブランドガイドラインを確認してください。

### 技術スタック

`skills.ts` へカテゴリ、実務経験の有無、使用状況を追加します。経験年数は確認できる場合だけ `years` に設定します。パーセンテージによる自己評価は使用しません。

## 6. GitHub API連携

`npm run github:update` は次の順にデータを更新し、`public/data/github.json` に保存します。

1. REST APIから公開プロフィールと公開リポジトリを取得
2. トークンがある場合だけGraphQL APIからContribution Calendarを取得
3. Star数、公開リポジトリの主な言語、活動日数、連続活動日数を計算
4. 更新失敗時は、それまでの有効なJSONを保持

ローカルでContributionまで取得する場合は、リポジトリ直下に `.env` を作るのではなく、実行時だけ環境変数を渡します。

```bash
GH_TOKEN=github_pat_xxx npm run github:update
```

トークンをソース、Markdown、生成JSON、ブラウザ向け環境変数へ記載しないでください。RESTの公開情報だけならトークンなしでも取得できます。

## 7. 必要なGitHub Secrets

通常のActions実行ではGitHubが発行する `GITHUB_TOKEN` を使用するため、追加Secretは必須ではありません。組織ポリシーやAPI制限により取得できない場合だけ、読み取り範囲を最小化したトークンを次の名前で登録します。

- `PORTFOLIO_GITHUB_TOKEN`: GitHub GraphQL APIで公開Contributionを取得するためのトークン

登録場所: Repository Settings → Secrets and variables → Actions → New repository secret

## 8. ビルド

```bash
npm run check
```

成功すると `out/` が生成されます。`GITHUB_PAGES=true` のときだけ `portfolio.config.json` のリポジトリ名が `basePath` と `assetPrefix` に使われます。

```bash
GITHUB_PAGES=true npm run build
```

リポジトリ名を変更した場合は `repositoryName` を変更して再ビルドしてください。`trailingSlash: true` とStatic Exportにより、GitHub Pagesで各静的ファイルを直接配信できます。

## 9. GitHub Pagesへの公開

ワークフローは `.github/workflows/deploy-pages.yml` にあります。

1. GitHub上で空のリポジトリを作成（想定名: `portfolio`）
2. ローカルリポジトリへリモートを追加して `main` ブランチをpush
3. Repository Settings → Pages → Build and deployment → Source で **GitHub Actions** を選択
4. Actionsの `Build and deploy portfolio` が成功することを確認
5. `https://USERNAME.github.io/portfolio/` を確認

ワークフローは `main` へのpush、手動実行、1日1回の定期実行に対応します。公式の `configure-pages`、`upload-pages-artifact`、`deploy-pages` Actionsを使用し、公開に必要な最小権限だけを設定しています。

## 10. SEO / OGP

title、description、canonical、基本OGP、Twitter Card、favicon、sitemap、robots.txtを実装しています。URLは `portfolio.config.json` から生成されます。OGP画像は未設定です。追加する場合は、本名や所属など匿名性を損なう情報を含めないでください。

## 11. 匿名性・公開前チェック

- [ ] 本名、現職・過去の会社名、顧客名がない
- [ ] 住所、電話番号、個人用メールアドレスがない
- [ ] 公開用メールアドレスを使用している
- [ ] 案件説明から顧客や社内システムを特定できない
- [ ] private repository名や機密情報がない
- [ ] 公開許可のないロゴ、画像、コードがない
- [ ] GitHubプロフィールの氏名、所属、Locationを確認した
- [ ] GitコミットのAuthor名とメールを確認した
- [ ] `git log --format=fuller` で履歴も確認した
- [ ] `contentMode` を `published` に変更した
- [ ] `SAMPLE` 表示が公開ページに残っていない
- [ ] 期限切れの資格を有効として表示していない
- [ ] `public/data/github.json` に公開可能な情報しかない
- [ ] `.env`、トークン、秘密鍵がGit管理されていない
- [ ] `npm run check` が成功する

GitHub Pagesではソースコードとビルド成果物を第三者が閲覧できます。また、GitHubアカウントやコミット履歴などの公開情報を組み合わせることで本人が推測される可能性があります。完全な匿名性は保証できません。

## 12. よくあるトラブル

### CSSや画像が404になる

`repositoryName` と実際のGitHubリポジトリ名が一致しているか確認し、Actionsから再ビルドします。ローカルビルドとPagesビルドでは `basePath` が異なります。

### GitHubデータが表示されない

`githubUsername` が正しいか確認し、Actionsログの `Refresh public GitHub data` を確認します。GraphQLデータだけない場合は `PORTFOLIO_GITHUB_TOKEN` の権限と有効期限を確認します。

### 定期更新に失敗した

前回の有効なJSONを保持するため、直前のデータでサイトはビルドできます。API制限、トークン期限、GitHub側の一時障害を確認して、Actionsを手動再実行してください。

### Pagesが404になる

Settings → PagesのSourceがGitHub Actionsであること、Actionsのdeploy jobが成功していること、URL末尾に正しいリポジトリ名があることを確認します。

### ローカルでは動くがActionsで型エラーになる

push前に `npm ci` と `npm run check` を実行し、`package-lock.json` も一緒にcommitしてください。

## 13. ディレクトリ構成

```text
src/
├── app/          # ページ、メタデータ、全体スタイル
├── components/   # レイアウト、セクション、共通UI
├── data/         # 編集可能なプロフィール・経歴・実績
├── lib/          # 設定・GitHubデータ読み込み
└── types/        # TypeScript型定義
scripts/          # GitHub公開データ更新
public/data/      # ビルド時に読む公開JSON
.github/workflows # GitHub Pagesのビルド・公開
```

## 14. 参考にした公式資料

- [Next.js Static Exports](https://nextjs.org/docs/app/guides/static-exports)
- [Next.js basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)
- [GitHub Pagesの公開元設定](https://docs.github.com/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)
- [actions/deploy-pages](https://github.com/actions/deploy-pages)

## 15. ライセンスと公開前の注意

このスターターを公開する前に、自身が公開可能なコンテンツだけへ置き換え、利用する画像・バッジ・ロゴのライセンスとガイドラインを確認してください。
