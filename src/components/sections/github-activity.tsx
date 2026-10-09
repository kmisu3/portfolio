import { CalendarDays, Code2, GitFork, GitBranch, Star } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExternalLink } from "@/components/ui/external-link";
import { contributionGrid, formatUpdatedAt, getGitHubData } from "@/lib/github";

const metricIcons = [CalendarDays, Code2, Star, GitFork];

export function GitHubActivity() {
  const data = getGitHubData();
  const cells = contributionGrid(data.contributions);
  const yearlyContributions = data.yearlyContributions ?? [];
  const yearlyMax = Math.max(...yearlyContributions.map(item => item.total), 1);
  const hasPrivateContributions = yearlyContributions.some(item => item.private > 0);
  const numberFormat = new Intl.NumberFormat("ja-JP");
  const metrics = [
    ["年間Contributions", data.totalContributions],
    ["活動日数", data.activeDays],
    ["合計Stars", data.totalStars],
    ["公開リポジトリ", data.publicRepos]
  ] as const;

  return (
    <section id="github" className="section-shell reveal" aria-labelledby="github-title">
      <SectionHeading title="GitHub Activity" />
      <div className="github-profile">
        <div className="github-identity">
          {data.avatarUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={data.avatarUrl} alt={`${data.username}のGitHubアバター`} width="72" height="72" />
            ) : <div className="avatar-placeholder" aria-hidden="true"><GitBranch size={30} /></div>}
          <div>
            <span className="meta-label">GitHub profile</span>
            <h3>{data.username ? `@${data.username}` : "Not configured"}</h3>
            <p>最終更新: {formatUpdatedAt(data.updatedAt)}</p>
          </div>
        </div>
        {data.profileUrl && <ExternalLink className="text-link" href={data.profileUrl}>プロフィールを開く</ExternalLink>}
      </div>
      {data.message && <div className="empty-notice" role="status"><Code2 size={18} />{data.message}</div>}
      <div className="metric-grid">
        {metrics.map(([label, value], index) => {
          const Icon = metricIcons[index];
          return <article className="metric-card" key={label}><Icon size={20} /><strong>{value ?? "—"}</strong><span>{label}</span></article>;
        })}
      </div>
      <div className="contribution-card">
        <div className="card-title-row"><div><span className="meta-label">Contribution calendar</span><h3>Last 12 months</h3></div><span>{data.currentStreak == null ? "Current streak —" : `Current streak ${data.currentStreak} days`}</span></div>
        <div className="contribution-scroll" tabIndex={0} aria-label="GitHub Contributionsグラフ。横方向にスクロールできます。">
          <div className="contribution-grid" aria-hidden={data.status !== "ready"}>
            {cells.map((day, index) => <span key={`${day.date}-${index}`} data-level={day.level} title={day.date ? `${day.date}: ${day.count} contributions` : undefined} />)}
          </div>
        </div>
        <div className="legend" aria-label="Contribution数の凡例"><span>Less</span>{[0,1,2,3,4].map(level => <i key={level} data-level={level} />)}<span>More</span></div>
      </div>
      {yearlyContributions.length > 0 && (
        <figure className="yearly-card" aria-labelledby="yearly-title">
          <figcaption className="yearly-head">
            <div><span className="meta-label">Yearly contributions</span><h3 id="yearly-title">Yearly activity</h3></div>
            <div className="yearly-legend" aria-label="グラフの凡例"><span><i data-kind="public" />Public</span>{hasPrivateContributions && <span><i data-kind="private" />Private</span>}</div>
          </figcaption>
          <div className="yearly-scroll" tabIndex={0} aria-label="年ごとのGitHub Contributions。横方向にスクロールできます。">
            <div className="yearly-chart" style={{ minWidth: `${Math.max(yearlyContributions.length * 72, 440)}px` }}>
              {yearlyContributions.map(item => {
                const barHeight = item.total > 0 ? Math.max((item.total / yearlyMax) * 100, 2) : 0;
                const publicShare = item.total > 0 ? (item.public / item.total) * 100 : 0;
                const privateShare = item.total > 0 ? (item.private / item.total) * 100 : 0;
                return (
                  <div className="yearly-column" key={item.year} role="img" aria-label={`${item.year}年: Public ${numberFormat.format(item.public)}、Private ${numberFormat.format(item.private)}、合計 ${numberFormat.format(item.total)}`}>
                    <span className="yearly-value">{numberFormat.format(item.total)}</span>
                    <div className="yearly-track">
                      <div className="yearly-bar" style={{ height: `${barHeight}%` }} aria-hidden="true">
                        {item.private > 0 && <span data-kind="private" style={{ height: `${privateShare}%` }} />}
                        {item.public > 0 && <span data-kind="public" style={{ height: `${publicShare}%` }} />}
                      </div>
                    </div>
                    <span className="yearly-year">{String(item.year).slice(-2)}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </figure>
      )}
      <div className="github-bottom-grid">
        <div className="list-card">
          <span className="meta-label">Featured repositories</span>
          <h3>代表的なリポジトリ</h3>
          {data.repositories.length ? data.repositories.map(repo => (
            <ExternalLink key={repo.url} className="repo-row" href={repo.url}>
              <span><b>{repo.name}</b></span>
              <span><Star size={14} /> {repo.stars}</span>
            </ExternalLink>
          )) : <p className="subtle">リポジトリデータは未取得です。</p>}
        </div>
        <div className="list-card">
          <span className="meta-label">Public repo languages</span>
          <h3>主な使用言語</h3>
          {data.topLanguages.length ? <ul className="language-list">{data.topLanguages.map(item => <li key={item.name}><span>{item.name}</span><b>{item.count} repos</b></li>)}</ul> : <p className="subtle">言語データは未取得です。</p>}
        </div>
      </div>
    </section>
  );
}
