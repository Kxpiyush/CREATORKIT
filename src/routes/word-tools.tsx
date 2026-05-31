import { createFileRoute, Link } from "@tanstack/react-router";

import { TOOL_DEFINITIONS, getToolPath } from "@/lib/client-tools";

export const Route = createFileRoute("/word-tools")({
  head: () => ({
    meta: [
      { title: "Word Tools - Free Browser-Based DOCX Utilities" },
      {
        name: "description",
        content: "Free browser-based Word tools for DOCX text extraction, HTML, Markdown, metadata, images, counters, and document comparison.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Word Tools - CreatorKitTools" },
      { property: "og:description", content: "Process Word DOCX files locally in your browser with no uploads or backend." },
      { property: "og:url", content: "https://creatorkittools.com/word-tools" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/word-tools" }],
  }),
  component: WordToolsPage,
});

function WordToolsPage() {
  const tools = TOOL_DEFINITIONS.filter((tool) => tool.category === "word");

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">CreatorKitTools</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Word Tools</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          Convert, extract, count, inspect, and compare Word documents directly in your browser.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tools.map((tool) => (
            <Link key={tool.id} to={getToolPath(tool.id)} className="rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:border-brand">
              <h2 className="text-base font-semibold">{tool.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
