import { profile } from "@/data/profile";

export function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} {profile.handle}</p>
    </footer>
  );
}
