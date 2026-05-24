import { createFileRoute, Link } from "@tanstack/react-router";

import { TOOL_DEFINITIONS, type ClientToolId, getTool, getToolPath } from "@/lib/client-tools";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Creator Kit - Free Browser-Based Image, Audio, and Video Tools" },
      {
        name: "description",
        content:
          "Fast image and audio tools that run in your browser. Compress, convert, resize, crop, and cut files without uploads.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "Creator Kit - Free Browser-Based Media Tools" },
      {
        property: "og:description",
        content: "Compress, convert, resize, crop, and trim files privately in your browser with no uploads.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://CreatorKitTools.com/" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "https://CreatorKitTools.com/" }],
  }),
  component: Index,
});

const FEATURED_TOOLS: ClientToolId[] = [
  "image-compressor",
  "jpg-to-png",
  "png-to-jpg",
  "resize-image",
  "crop-image",
  "mp3-cutter",
];

const BETA_VIDEO_TOOLS: ClientToolId[] = [
  "video-compressor",
  "merge-videos",
  "resize-video",
  "video-to-gif",
  "video-trimmer",
  "video-to-mp3",
];

function Index() {
  const featured = FEATURED_TOOLS.map(getTool);
  const beta = BETA_VIDEO_TOOLS.map(getTool);
  const fastTools = TOOL_DEFINITIONS.filter((tool) => !tool.beta && tool.engine !== "media-engine");

  return (
    <div className="min-h-screen bg-background text-foreground">
      <TopBar />
      <main className="max-w-6xl mx-auto px-6 py-10">
        <section className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-widest text-brand mb-3">
            All-in-One Creator Toolkit
          </p>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-8 items-end">
            <div>
              <h1 className="text-3xl md:text-5xl font-semibold tracking-tight mb-4 text-balance">
                Fast free tools for images, audio, and simple media edits
              </h1>
              <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
                Compress images, convert formats, resize, crop, and cut audio directly in your
                browser. Your files are processed in your browser and never uploaded.
              </p>
            </div>
            <div className="rounded-xl border border-brand/25 bg-brand-muted p-4 text-sm">
              Files are processed locally in your browser and never uploaded.
            </div>
          </div>
        </section>

        <AdSlot className="mb-8" label="Advertisement" />

        <section className="mb-10">
          <SectionHeader title="Most Popular Tools" text="Start with the fast tools people use most." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {featured.map((tool) => (
              <ToolLink key={tool.id} id={tool.id} featured />
            ))}
          </div>
        </section>

        <section className="mb-10 grid grid-cols-1 md:grid-cols-3 gap-3">
          <InfoCard title="Fast Browser Tools" text="Image tools use Canvas and run instantly on most devices." />
          <InfoCard title="Privacy First" text="Files stay in browser memory. Nothing is uploaded for processing." />
          <InfoCard title="Ad Friendly" text="Static hosting keeps costs low while ad slots can support the site." />
        </section>

        <section className="mb-10">
          <SectionHeader title="Fast Browser Tools" text="Lightweight utilities first, optimized for speed and low hosting cost." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {fastTools.map((tool) => (
              <ToolLink key={tool.id} id={tool.id} />
            ))}
          </div>
        </section>

        <section className="mb-10">
          <SectionHeader title="Beta Video Tools" text="Powerful browser video tools. These may take longer and work best on desktop." />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {beta.map((tool) => (
              <ToolLink key={tool.id} id={tool.id} beta />
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-border bg-card p-6">
          <h2 className="text-xl font-semibold mb-3">Privacy First</h2>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Your files are processed in your browser and never uploaded. The site is designed as a
            static utility website, so there is no backend processing, no user accounts, no database,
            and no server-side file storage.
          </p>
        </section>
      </main>
    </div>
  );
}

function TopBar() {
  return (
    <nav className="border-b border-border/60 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="size-7 rounded-md bg-brand text-brand-foreground grid place-items-center font-semibold text-xs">
            C
          </div>
          <span className="text-sm font-semibold tracking-tight">
            CREATOR<span className="text-brand">_</span>KIT
          </span>
        </Link>
        <span className="hidden sm:inline text-xs text-muted-foreground">
          Browser-only tools. No uploads.
        </span>
      </div>
    </nav>
  );
}

function SectionHeader({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-sm text-muted-foreground mt-1">{text}</p>
    </div>
  );
}

function ToolLink({ id, beta = false, featured = false }: { id: ClientToolId; beta?: boolean; featured?: boolean }) {
  const tool = getTool(id);
  const href = getToolPath(tool.id);

  return (
    <Link
      to={href}
      className={`rounded-xl border bg-card p-4 transition-colors hover:border-brand ${
        featured ? "border-brand/30" : "border-border"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-sm font-semibold">{tool.title}</h3>
          <p className="text-xs text-muted-foreground mt-1 leading-relaxed">{tool.description}</p>
        </div>
        {beta && (
          <span className="rounded-md border border-border bg-surface-2 px-2 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
            Beta
          </span>
        )}
      </div>
    </Link>
  );
}

function InfoCard({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <h2 className="text-sm font-semibold mb-1">{title}</h2>
      <p className="text-xs text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}

function AdSlot({ className = "", label }: { className?: string; label: string }) {
  return (
    <aside
      className={`min-h-24 flex items-center justify-center rounded-lg border border-dashed border-border bg-card/70 text-[10px] uppercase tracking-widest text-muted-foreground ${className}`}
    >
      <span className="rounded-full border border-border bg-background px-3 py-1">{label}</span>
    </aside>
  );
}
