import { projects } from "@/data/projects";
import { isSampleMode } from "@/lib/config";
import { SectionHeading } from "@/components/ui/section-heading";

export function ProjectsSection() {
  const items = projects.filter(item => item.status === "published" || isSampleMode);
  return (
    <section id="projects" className="section-shell reveal" aria-labelledby="projects-title">
      <SectionHeading title="Projects" />
      {items.length ? <div className="project-grid">{items.map((project) => (
        <article className="project-card" key={project.name}>
          <div className="project-heading"><h3>{project.name}</h3>{project.status === "sample" && <span className="sample-badge">SAMPLE</span>}</div>
          <p className="body-copy">{project.summary}</p>
          <div className="tag-list">{project.technologies.map(tech => <span key={tech}>{tech}</span>)}</div>
        </article>
      ))}</div> : <div className="empty-notice">公開できるプロジェクトを準備中です。</div>}
    </section>
  );
}
