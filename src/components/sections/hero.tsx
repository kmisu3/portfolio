import { ArrowUpRight, BriefcaseBusiness, GitBranch } from "lucide-react";
import { profile } from "@/data/profile";
import { githubUrl, portfolioConfig } from "@/lib/config";
import { ExternalLink } from "@/components/ui/external-link";

export function Hero() {
  const configured = portfolioConfig.githubUsername !== "your_handle";

  return (
    <section id="about" className="hero" aria-labelledby="hero-title">
      <div className="hero-copy">
        <h1 id="hero-title">Web Engineer</h1>
        <div className="hero-actions">
          {configured && (
            <ExternalLink href={githubUrl} className="button button-primary">
              <GitBranch size={18} aria-hidden="true" /> GitHubを見る <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
          )}
          <a href="#projects" className="button button-secondary">
            <BriefcaseBusiness size={18} aria-hidden="true" /> 実績を見る
          </a>
        </div>
      </div>
      <aside className="hero-panel" aria-label="プロフィール概要">
        <div className="profile-windowbar" aria-hidden="true">
          <span className="window-dots"><i /><i /><i /></span>
          <span>profile.ts</span>
        </div>
        <dl className="code-profile">
          <div><dt>role</dt><dd>&quot;{profile.role}&quot;</dd></div>
          <div className="focus-row"><dt>focus</dt><dd><span>[</span>{profile.specialties.map(item => <span key={item}>&quot;{item}&quot;</span>)}<span>]</span></dd></div>
          <div><dt>location</dt><dd>&quot;Japan / Remote&quot;</dd></div>
        </dl>
      </aside>
    </section>
  );
}
