import { Check, GitBranch, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { githubUrl, portfolioConfig } from "@/lib/config";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExternalLink } from "@/components/ui/external-link";

export function ContactSection() {
  const githubConfigured = portfolioConfig.githubUsername !== "your_handle";
  return (
    <section id="contact" className="section-shell contact-section reveal" aria-labelledby="contact-title">
      <SectionHeading title="Contact" />
      <div className="contact-card">
        <div><span className="meta-label">対応できる内容</span><ul className="preference-list">{profile.workPreferences.map(item => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}</ul></div>
        <dl className="availability-grid"><div><dt>稼働</dt><dd>平日夜間・土日（応相談）</dd></div><div><dt>形態</dt><dd>フルリモート希望</dd></div><div><dt>状況</dt><dd>{profile.availability}</dd></div></dl>
        <div className="contact-actions">
          {portfolioConfig.contactEmail && <a className="button button-primary" href={`mailto:${portfolioConfig.contactEmail}`}><Mail size={18} />メールを送る</a>}
          {githubConfigured && <ExternalLink className="button button-secondary" href={githubUrl}><GitBranch size={18} />GitHub</ExternalLink>}
          {!portfolioConfig.contactEmail && !githubConfigured && <p className="subtle">公開用メールアドレスまたはGitHubユーザー名を設定すると、連絡ボタンが表示されます。</p>}
        </div>
      </div>
    </section>
  );
}
