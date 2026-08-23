import { Link } from "@tanstack/react-router";
import { ShieldCheck } from "lucide-react";
import { LEGAL_LINKS, NAV_LINKS } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-12 md:grid-cols-3">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <ShieldCheck className="size-4" aria-hidden="true" />
            </span>
            <span className="font-display text-base">OpenCheck</span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            A free, privacy-focused similarity checker for students, writers, and researchers.
            Similarity is an indicator, never a verdict.
          </p>
        </div>

        <nav aria-label="Footer">
          <h2 className="text-sm font-semibold">Site</h2>
          <ul className="mt-3 space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Legal">
          <h2 className="text-sm font-semibold">Legal</h2>
          <ul className="mt-3 space-y-2">
            {LEGAL_LINKS.map((link) => (
              <li key={link.to}>
                <Link
                  to={link.to}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} OpenCheck. Open by design.</p>
          <p>No AI writing, paraphrasing, or humanizing tools — similarity detection only.</p>
        </div>
      </div>
    </footer>
  );
}
