import { skills } from "@/data/skills";
import { isSampleMode } from "@/lib/config";
import type { SkillCategory } from "@/types/portfolio";
import { SectionHeading } from "@/components/ui/section-heading";

const categories: SkillCategory[] = ["Frontend", "Backend", "Database", "Infrastructure / Cloud", "DevOps", "AI / Development Tools", "Others"];

export function SkillsSection() {
  const items = skills.filter(item => item.status === "published" || isSampleMode);
  return (
    <section id="skills" className="section-shell reveal" aria-labelledby="skills-title">
      <SectionHeading title="Tech Stack" description="使用技術" />
      {items.length ? <div className="skills-grid">{categories.map(category => {
        const categorySkills = items.filter(skill => skill.category === category);
        if (!categorySkills.length) return null;
        return <article className="skill-group" key={category}><span className="meta-label">{category}</span><ul>{categorySkills.map(skill => <li key={skill.name}><div><b>{skill.name}</b>{skill.status === "sample" && <span className="sample-dot" title="サンプルデータ">S</span>}</div></li>)}</ul></article>;
      })}</div> : <div className="empty-notice">技術スタックを準備中です。</div>}
    </section>
  );
}
