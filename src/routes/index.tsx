import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  Code2,
  FileAudio,
  FileImage,
  FileText,
  FileVideo,
  Globe2,
  Menu,
  Search,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useMemo, useState } from "react";

import { ThemeToggle } from "@/components/toolkit/ThemeToggle";
import { TOOL_DEFINITIONS, type ClientToolId, type ToolCategory, getTool, getToolPath } from "@/lib/client-tools";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CreatorKitTools - Free Browser-Based File Tools" },
      {
        name: "description",
        content:
          "Find fast browser-based PDF, Word, image, audio, video, developer, and network tools. No uploads, no accounts, and no server storage.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "CreatorKitTools - Free Browser-Based File Tools" },
      {
        property: "og:description",
        content: "Private browser-based file and developer tools with clean category pages and no server uploads.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://creatorkittools.com/" },
      { property: "og:image", content: "https://creatorkittools.com/favicon-512x512.png" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://creatorkittools.com/" }],
  }),
  component: Index,
});

const POPULAR_TOOLS: ClientToolId[] = [
  "image-compressor",
  "merge-pdf",
  "jpg-to-png",
  "resize-image",
  "mp3-cutter",
  "word-to-txt",
  "json-formatter-validator",
  "video-to-mp3",
  "txt-to-word",
  "pdf-to-jpg",
  "password-generator",
  "what-is-my-ip",
];

const RECENT_TOOLS: ClientToolId[] = [
  "ip-lookup",
  "word-image-extractor",
  "document-compare",
  "hash-generator",
  "jwt-decoder",
  "extract-frames",
];

const CATEGORY_CARDS: Array<{
  title: string;
  description: string;
  href: string;
  categories: ToolCategory[];
  icon: typeof FileText;
  tone: string;
}> = [
  {
    title: "PDF Tools",
    description: "Merge, split, rotate, watermark, and convert PDFs locally.",
    href: "/pdf-tools",
    categories: ["pdf"],
    icon: FileText,
    tone: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-400/10 dark:text-rose-200 dark:border-rose-400/20",
  },
  {
    title: "Word Tools",
    description: "Convert, extract, inspect, count, and compare DOCX files.",
    href: "/word-tools",
    categories: ["word", "document"],
    icon: FileText,
    tone: "bg-blue-50 text-blue-700 border-blue-100 dark:bg-blue-400/10 dark:text-blue-200 dark:border-blue-400/20",
  },
  {
    title: "Image Tools",
    description: "Compress, resize, crop, watermark, and convert images.",
    href: "/image-tools",
    categories: ["image"],
    icon: FileImage,
    tone: "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-400/10 dark:text-sky-200 dark:border-sky-400/20",
  },
  {
    title: "Video Tools",
    description: "Browser video conversion and editing for practical files.",
    href: "/video-tools",
    categories: ["video"],
    icon: FileVideo,
    tone: "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-400/10 dark:text-orange-200 dark:border-orange-400/20",
  },
  {
    title: "Audio Tools",
    description: "Cut, merge, trim, reverse, and adjust audio in the browser.",
    href: "/audio-tools",
    categories: ["audio"],
    icon: FileAudio,
    tone: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-200 dark:border-emerald-400/20",
  },
  {
    title: "Developer Tools",
    description: "Format, encode, decode, validate, hash, and generate text.",
    href: "/developer-tools",
    categories: ["developer", "text", "youtube"],
    icon: Code2,
    tone: "bg-cyan-50 text-cyan-700 border-cyan-100 dark:bg-cyan-400/10 dark:text-cyan-200 dark:border-cyan-400/20",
  },
  {
    title: "Network Tools",
    description: "Check IP, lookup details, and inspect user agents.",
    href: "/network-tools",
    categories: ["network"],
    icon: Globe2,
    tone: "bg-lime-50 text-lime-700 border-lime-100 dark:bg-lime-400/10 dark:text-lime-200 dark:border-lime-400/20",
  },
];

const NAV_ITEMS = CATEGORY_CARDS.map((category) => ({ href: category.href, label: category.title }));

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");

  const searchResults = useMemo(() => {
    const value = query.trim().toLowerCase();
    if (!value) return [];
    return TOOL_DEFINITIONS.filter((tool) => `${tool.title} ${tool.description} ${tool.category}`.toLowerCase().includes(value)).slice(0, 10);
  }, [query]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <Link to="/" className="flex items-center gap-3">
            <img src="/brand-butterfly.svg" alt="" className="size-9 transition-transform duration-300 hover:scale-105" />
            <span className="text-base font-bold tracking-tight">CreatorKitTools</span>
          </Link>
          <nav className="hidden items-center gap-5 text-sm font-medium text-muted-foreground lg:flex">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} to={item.href} className="hover:text-foreground">
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMenuOpen((value) => !value)}
              className="grid size-9 place-items-center rounded-lg border border-border bg-background lg:hidden"
              aria-label="Toggle navigation"
            >
              {menuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
            </button>
          </div>
        </div>
        {menuOpen && (
          <nav className="border-t border-border bg-card px-6 py-4 lg:hidden">
            <div className="mx-auto grid max-w-7xl gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </header>

      <main>
        <section className="border-b border-border bg-[linear-gradient(180deg,var(--color-card),var(--color-background))]">
          <div className="mx-auto max-w-7xl px-6 py-16 md:py-20">
            <div className="max-w-4xl">
              <p className="mb-4 inline-flex items-center rounded-full border border-brand/20 bg-brand-muted px-3 py-1 text-xs font-semibold text-brand">
                Private browser-based utility toolkit
              </p>
              <h1 className="text-4xl font-bold tracking-tight md:text-6xl">Free Browser-Based File Tools</h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Discover fast PDF, Word, image, audio, video, developer, and network tools. Files process locally in your browser with no account and no server storage.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <TrustBadge icon={ShieldCheck} text="Private by default" />
                <TrustBadge icon={Zap} text="Runs in your browser" />
                <TrustBadge icon={BadgeCheck} text={`${TOOL_DEFINITIONS.length}+ working tools`} />
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12">
          <section className="rounded-3xl border border-border bg-card p-4 shadow-sm md:p-5">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
              <input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search for a tool..."
                className="h-14 w-full rounded-2xl border border-input bg-background pl-12 pr-4 text-base outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
            </label>
            {searchResults.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {searchResults.map((tool) => (
                  <ToolCard key={tool.id} id={tool.id} compact />
                ))}
              </div>
            )}
          </section>

          <section className="mt-14">
            <SectionHeader title="Popular Tools" text="Start with the most commonly used tools. The full directories live inside category pages." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {POPULAR_TOOLS.map((id) => (
                <ToolCard key={id} id={id} />
              ))}
            </div>
          </section>

          <section className="mt-16">
            <SectionHeader title="Browse Categories" text="Each category page keeps tools organized with cleaner discovery as the site grows." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {CATEGORY_CARDS.map((category) => (
                <CategoryCard key={category.href} {...category} />
              ))}
            </div>
          </section>

          <section className="mt-16">
            <SectionHeader title="Recently Added Tools" text="Fresh utilities added to CreatorKitTools, kept small here so the homepage stays fast." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {RECENT_TOOLS.map((id) => (
                <ToolCard key={id} id={id} compact />
              ))}
            </div>
          </section>

          <section className="mt-16 rounded-3xl border border-border bg-card p-8 shadow-sm">
            <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">Why Choose CreatorKitTools</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">Cleaner tools, private processing, no server bills</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
                  CreatorKitTools focuses on real browser-only utilities. Pages are lightweight, category-based, and designed to scale without dumping every tool onto the homepage.
                </p>
              </div>
              <div className="grid gap-3 text-sm">
                {["Files never uploaded", "Browser-based processing", "Organized category pages", "Fast discovery search"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                    <Sparkles className="size-4 text-brand" />
                    <span className="font-medium">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function ToolCard({ id, compact = false }: { id: ClientToolId; compact?: boolean }) {
  const tool = getTool(id);

  return (
    <Link
      to={getToolPath(tool.id)}
      className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
    >
      <h3 className="text-base font-semibold tracking-tight group-hover:text-brand">{tool.title}</h3>
      <p className={cn("mt-2 text-sm leading-6 text-muted-foreground", compact && "line-clamp-2")}>{tool.description}</p>
    </Link>
  );
}

function CategoryCard({
  title,
  description,
  href,
  categories,
  icon: Icon,
  tone,
}: {
  title: string;
  description: string;
  href: string;
  categories: ToolCategory[];
  icon: typeof FileText;
  tone: string;
}) {
  const count = TOOL_DEFINITIONS.filter((tool) => categories.includes(tool.category)).length;

  return (
    <Link to={href} className="group rounded-2xl border border-border bg-card p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <span className={cn("grid size-12 place-items-center rounded-2xl border", tone)}>
          <Icon className="size-5" />
        </span>
        <span className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
          {count} tools
        </span>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight group-hover:text-brand">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
    </Link>
  );
}

function SectionHeader({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-5">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{text}</p>
    </div>
  );
}

function TrustBadge({ icon: Icon, text }: { icon: typeof ShieldCheck; text: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium shadow-sm">
      <Icon className="size-4 text-brand" />
      {text}
    </span>
  );
}
