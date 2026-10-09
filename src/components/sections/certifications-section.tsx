import { Award } from "lucide-react";
import { certifications } from "@/data/certifications";
import { isSampleMode } from "@/lib/config";
import { SectionHeading } from "@/components/ui/section-heading";
import { ExternalLink } from "@/components/ui/external-link";

export function CertificationsSection() {
  const items = certifications.filter(item => item.status === "published" || isSampleMode);
  return (
    <section id="certifications" className="section-shell reveal" aria-labelledby="certifications-title">
      <SectionHeading title="Certifications" description="AWS認定資格" />
      {items.length ? <div className="cert-grid">{items.map(item => (
        <article className="cert-card" key={item.name}>
          <div className="cert-emblem" aria-hidden="true"><Award size={28} /></div>
          <div className="cert-copy"><div className="project-labels"><span>{item.level}</span>{item.status === "sample" && <span className="sample-badge">SAMPLE</span>}</div><h3>{item.name}</h3>{item.verificationUrl && <ExternalLink className="text-link" href={item.verificationUrl}>認証情報を確認</ExternalLink>}</div>
        </article>
      ))}</div> : <div className="empty-notice">公開中の認定資格はありません。</div>}
    </section>
  );
}
