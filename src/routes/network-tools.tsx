import { createFileRoute, Link } from "@tanstack/react-router";

import { TOOL_DEFINITIONS, getToolPath } from "@/lib/client-tools";

export const Route = createFileRoute("/network-tools")({
  head: () => ({
    meta: [
      { title: "Network Tools - Free Browser-Based IP and User Agent Tools" },
      {
        name: "description",
        content: "Free browser-based network tools for checking your public IP, IP lookup details, and user agent information.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Network Tools - CreatorKitTools" },
      { property: "og:description", content: "Simple browser-based IP and user agent tools with no CreatorKitTools backend." },
      { property: "og:url", content: "https://creatorkittools.com/network-tools" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/network-tools" }],
  }),
  component: NetworkToolsPage,
});

function NetworkToolsPage() {
  const tools = TOOL_DEFINITIONS.filter((tool) => tool.category === "network");

  return (
    <main className="min-h-screen bg-background px-6 py-12 text-foreground">
      <section className="mx-auto max-w-7xl">
        <p className="text-xs font-semibold uppercase tracking-widest text-brand">CreatorKitTools</p>
        <h1 className="mt-3 text-4xl font-bold tracking-tight">Network Tools</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
          Check public IP details and browser user agent information from the frontend.
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
