import { careers } from "@/data/career";
import { isSampleMode } from "@/lib/config";
import { SectionHeading } from "@/components/ui/section-heading";

export function CareerSection() {
  const items = careers.filter(item => item.status === "published" || isSampleMode);
  return (
    <section id="career" className="section-shell reveal" aria-labelledby="career-title">
      <SectionHeading title="Career" />
      {items.length ? <div className="timeline">{items.map((item, index) => (
        <article className="timeline-item" key={`${item.period}-${index}`}>
          <div className="timeline-marker"><span aria-hidden="true" /></div>
          <div className="timeline-content">
            <div className="timeline-head"><div><span className="meta-label">{item.period}</span><h3>{item.organizationType}</h3></div>{item.status === "sample" && <span className="sample-badge">SAMPLE</span>}</div>
            <p className="body-copy">{item.summary}</p>
            <div className="tag-list">{item.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
          </div>
        </article>
      ))}</div> : <div className="empty-notice">職務経歴は準備中です。</div>}
    </section>
  );
}
