import { Link } from "@tanstack/react-router";

interface Section {
  title: string;
  body: string;
}

interface LegalPageProps {
  title: string;
  description: string;
  sections: Section[];
  children?: React.ReactNode;
}

export function LegalPage({ title, description, sections, children }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link to="/" className="text-xs font-semibold uppercase tracking-widest text-brand">
          Creator Kit
        </Link>
        <section className="mt-6 mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </section>

        <section className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
          {["Files never uploaded", "Browser-based processing", "Privacy first", "No server storage"].map(
            (badge) => (
              <div key={badge} className="rounded-lg border border-border bg-card px-4 py-3 text-sm">
                {badge}
              </div>
            ),
          )}
        </section>

        <div className="space-y-6">
          {sections.map((section) => (
            <section key={section.title} className="rounded-xl border border-border bg-card p-5">
              <h2 className="text-lg font-semibold">{section.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>

        {children}
      </div>
    </main>
  );
}
