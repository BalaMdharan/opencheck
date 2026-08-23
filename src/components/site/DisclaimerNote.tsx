import { Info } from "lucide-react";

export function DisclaimerNote({ className = "" }: { className?: string }) {
  return (
    <aside
      className={`flex gap-3 rounded-lg border border-border bg-accent/60 p-4 text-sm text-accent-foreground ${className}`}
    >
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <p>
        A similarity score is an indicator, not proof of plagiarism. Quotations, references, common
        phrases, and standard terminology all raise similarity legitimately. Every match needs human
        review in context.
      </p>
    </aside>
  );
}
