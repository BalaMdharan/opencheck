import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/site/PageHeader";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact OpenCheck — questions, feedback, and bug reports" },
      {
        name: "description",
        content:
          "Get in touch with the OpenCheck team about the similarity checker, feature requests, accessibility issues, or privacy questions.",
      },
      { property: "og:title", content: "Contact OpenCheck" },
      {
        property: "og:description",
        content: "Questions, feedback, accessibility issues, or privacy requests — reach the team.",
      },
      { property: "og:url", content: "https://open-text-check.lovable.app/contact" },
    ],
    links: [{ rel: "canonical", href: "https://open-text-check.lovable.app/contact" }],
  }),
  component: ContactPage,
});

const TOPICS = ["General question", "Feedback", "Bug report", "Privacy request", "Partnership"];

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="Talk to the people building OpenCheck"
        description="Feedback on the interface, questions about privacy, or a feature you need — we read everything."
      />
      <div className="container-page grid gap-10 py-14 lg:grid-cols-[1.1fr_1fr] lg:items-start">
        <form
          className="rounded-xl border border-border bg-card p-5 shadow-card sm:p-6"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <h2 className="text-lg font-semibold">Send a message</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Message delivery is not connected yet — for now, please email us directly.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <Field id="name" label="Name">
              <input
                id="name"
                name="name"
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>
            <Field id="email" label="Email">
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>
          </div>

          <div className="mt-4">
            <Field id="topic" label="Topic">
              <select
                id="topic"
                name="topic"
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {TOPICS.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </Field>
          </div>

          <div className="mt-4">
            <Field id="message" label="Message">
              <textarea
                id="message"
                name="message"
                rows={6}
                required
                className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </Field>
          </div>

          <Button type="submit" className="mt-5">
            Send message
          </Button>

          {submitted && (
            <p role="status" className="mt-4 rounded-lg bg-surface p-3 text-sm text-muted-foreground">
              This form isn't wired to a mailbox yet. Please send your message to
              hello@opencheck.app so it reaches us.
            </p>
          )}
        </form>

        <aside className="space-y-4">
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <Mail className="size-5 text-primary" aria-hidden="true" />
            <h2 className="mt-3 text-base font-semibold">Email</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              <a href="mailto:hello@opencheck.app" className="text-primary underline">
                hello@opencheck.app
              </a>
              <br />
              We usually reply within a few working days.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-surface p-5">
            <h2 className="text-base font-semibold">Please don't send us your full thesis</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              For support we only need a short excerpt and a description of the problem. Keep your
              unpublished work with you.
            </p>
          </div>
        </aside>
      </div>
    </>
  );
}

function Field({
  id,
  label,
  children,
}: {
  id: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label}
      </label>
      {children}
    </div>
  );
}
