import { Menu } from "lucide-react";
import Image from "next/image";
import mascot from "@/assets/mascot.jpg";

const links = [
  { label: "About", href: "about" },
  { label: "GitHub", href: "github" },
  { label: "Career", href: "career" },
  { label: "Projects", href: "projects" },
  { label: "Certifications", href: "certifications" },
  { label: "Tech Stack", href: "skills" },
];

export function Header() {
  return (
    <header id="top" className="site-header">
      <a className="brand" href="#top" aria-label="ページ上部へ">
        <span className="brand-mark" aria-hidden="true"><Image src={mascot} alt="" width={34} height={34} priority /></span>
        <span className="brand-copy"><b>kmisu3</b><small>Web Engineer</small></span>
      </a>
      <nav className="desktop-nav" aria-label="メインナビゲーション">
        {links.map((link) => <a key={link.href} href={`#${link.href}`}>{link.label}</a>)}
      </nav>
      <details className="mobile-nav">
        <summary aria-label="メニューを開く"><Menu size={22} aria-hidden="true" /></summary>
        <nav aria-label="モバイルナビゲーション">
          {links.map((link) => <a key={link.href} href={`#${link.href}`}>{link.label}</a>)}
        </nav>
      </details>
    </header>
  );
}
