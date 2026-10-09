import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Hero } from "@/components/sections/hero";
import { GitHubActivity } from "@/components/sections/github-activity";
import { CareerSection } from "@/components/sections/career-section";
import { ProjectsSection } from "@/components/sections/projects-section";
import { CertificationsSection } from "@/components/sections/certifications-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { isSampleMode } from "@/lib/config";

export default function Home() {
  return (
    <>
      <a className="skip-link" href="#main">本文へ移動</a>
      <div className="page-guide" aria-hidden="true" />
      <Header />
      {isSampleMode && <div className="sample-banner" role="note"><strong>Preview mode</strong> サンプルデータを表示しています。</div>}
      <main id="main">
        <Hero />
        <GitHubActivity />
        <CareerSection />
        <ProjectsSection />
        <CertificationsSection />
        <SkillsSection />
      </main>
      <Footer />
    </>
  );
}
