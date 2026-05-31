import { Link } from "@tanstack/react-router";
import { FileText, Search } from "lucide-react";
import { useMemo, useState } from "react";

import { TOOL_DEFINITIONS, type ToolCategory, getToolPath } from "@/lib/client-tools";
import { cn } from "@/lib/utils";

interface CategoryToolsPageProps {
  title: string;
  description: string;
  categories: ToolCategory[];
}

export function CategoryToolsPage({ title, description, categories }: CategoryToolsPageProps) {
  const [query, setQuery] = useState("");
  const tools = useMemo(() => TOOL_DEFINITIONS.filter((tool) => categories.includes(tool.category)), [categories]);
  const filteredTools = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return tools;
    return tools.filter((tool) => `${tool.title} ${tool.description}`.toLowerCase().includes(value));
  }, [query, tools]);

  return (
    <main className="min-h-screen bg-background px-6 py-10 text-foreground">
      <section className="mx-auto max-w-7xl">
        <Breadcrumbs current={title} />
        <div className="mt-6 grid gap-6 rounded-3xl border border-border bg-card p-7 shadow-sm lg:grid-cols-[1fr_240px] lg:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brand">CreatorKitTools</p>
            <h1 className="mt-3 text-4xl font-bold tracking-tight">{title}</h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">{description}</p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-4 text-sm">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">Available tools</span>
            <strong className="mt-2 block text-3xl">{tools.length}</strong>
          </div>
        </div>

        <div className="mt-8 rounded-2xl border border-border bg-card p-4 shadow-sm">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={`Search ${title.toLowerCase()}...`}
              className="h-12 w-full rounded-xl border border-input bg-background pl-11 pr-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
          </label>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredTools.map((tool) => (
            <Link
              key={tool.id}
              to={getToolPath(tool.id)}
              className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
            >
              <span className={cn("grid size-11 place-items-center rounded-xl border bg-background text-brand")}>
                <FileText className="size-5" />
              </span>
              <h2 className="mt-4 text-base font-semibold tracking-tight group-hover:text-brand">{tool.title}</h2>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{tool.description}</p>
            </Link>
          ))}
        </div>

        {filteredTools.length === 0 && (
          <div className="mt-8 rounded-2xl border border-border bg-card p-8 text-center text-sm text-muted-foreground">
            No tools matched that search.
          </div>
        )}
      </section>
    </main>
  );
}

function Breadcrumbs({ current }: { current: string }) {
  return (
    <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground" aria-label="Breadcrumb">
      <Link to="/" className="hover:text-foreground">
        Home
      </Link>
      <span>/</span>
      <span className="font-medium text-foreground">{current}</span>
    </nav>
  );
}
