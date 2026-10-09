import { ExternalLink as ExternalLinkIcon } from "lucide-react";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ExternalLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  showIcon?: boolean;
};

export function ExternalLink({ children, showIcon = true, className = "", ...props }: ExternalLinkProps) {
  return (
    <a {...props} className={className} target="_blank" rel="noopener noreferrer">
      {children}
      {showIcon && <ExternalLinkIcon size={15} aria-hidden="true" />}
    </a>
  );
}
