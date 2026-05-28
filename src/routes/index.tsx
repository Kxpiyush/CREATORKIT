import { createFileRoute, Link } from "@tanstack/react-router";
import {
  BadgeCheck,
  FileAudio,
  FileImage,
  FileText,
  FileVideo,
  Image as ImageIcon,
  Layers,
  Lock,
  Menu,
  Scissors,
  ShieldCheck,
  Sparkles,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

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
          "Compress, convert, merge, resize, and edit files directly in your browser. No uploads, no account, and no server storage.",
      },
      { name: "robots", content: "index,follow" },
      { property: "og:title", content: "CreatorKitTools - Free Browser-Based File Tools" },
      {
        property: "og:description",
        content: "Private browser-based image, PDF, document, audio, and video tools with no server uploads.",
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
  "jpg-to-png",
  "png-to-jpg",
  "resize-image",
  "crop-image",
  "image-to-pdf",
  "merge-pdf",
  "split-pdf",
  "pdf-to-jpg",
  "jpg-to-pdf",
  "png-to-pdf",
  "rotate-pdf",
  "add-watermark-pdf",
  "txt-to-pdf",
  "docx-to-text",
  "docx-to-html",
  "text-case-converter",
  "word-counter",
  "mp3-cutter",
  "video-to-mp3",
  "mute-video",
  "video-trimmer",
  "video-to-gif",
  "extract-frames",
  "merge-videos",
];

const CATEGORY_SECTIONS: Array<{ id: ToolCategory; title: string; text: string }> = [
  { id: "image", title: "Image Tools", text: "Fast Canvas-powered tools for everyday image edits." },
  { id: "pdf", title: "PDF Tools", text: "Real PDF utilities powered by pdf-lib, pdf.js, and jsPDF in the browser." },
  { id: "document", title: "Document Tools", text: "Real text and DOCX utilities powered by Mammoth and browser text processing." },
  { id: "audio", title: "Audio Tools", text: "Private audio trimming and editing with Web Audio where possible." },
  { id: "video", title: "Video Tools", text: "Browser-based video conversion and editing powered by ffmpeg.wasm only when you use a video tool." },
];

const NAV_ITEMS = [
  { href: "#image-tools", label: "Image Tools" },
  { href: "#pdf-tools", label: "PDF Tools" },
  { href: "#document-tools", label: "Document Tools" },
  { href: "#audio-tools", label: "Audio Tools" },
  { href: "#video-tools", label: "Video Tools" },
];

const iconByTool: Partial<Record<ClientToolId, typeof ImageIcon>> = {
  "image-compressor": Zap,
  "jpg-to-png": FileImage,
  "png-to-jpg": FileImage,
  "resize-image": ImageIcon,
  "crop-image": Scissors,
  "mp3-cutter": FileAudio,
  "image-to-pdf": FileText,
  "merge-pdf": Layers,
  "split-pdf": Scissors,
  "pdf-to-jpg": FileImage,
  "jpg-to-pdf": FileText,
  "png-to-pdf": FileText,
  "rotate-pdf": Layers,
  "add-watermark-pdf": FileText,
  "txt-to-pdf": FileText,
  "docx-to-text": FileText,
  "docx-to-html": FileText,
  "text-case-converter": FileText,
  "word-counter": FileText,
  "video-to-mp3": FileVideo,
  "mute-video": FileVideo,
  "video-trimmer": Scissors,
  "video-to-gif": FileVideo,
  "extract-frames": FileImage,
  "merge-videos": Layers,
};

const colorByCategory: Record<ToolCategory, string> = {
  image: "bg-sky-50 text-sky-700 border-sky-100 dark:bg-sky-400/10 dark:text-sky-200 dark:border-sky-400/20",
  pdf: "bg-rose-50 text-rose-700 border-rose-100 dark:bg-rose-400/10 dark:text-rose-200 dark:border-rose-400/20",
  document: "bg-violet-50 text-violet-700 border-violet-100 dark:bg-violet-400/10 dark:text-violet-200 dark:border-violet-400/20",
  audio: "bg-emerald-50 text-emerald-700 border-emerald-100 dark:bg-emerald-400/10 dark:text-emerald-200 dark:border-emerald-400/20",
  video: "bg-orange-50 text-orange-700 border-orange-100 dark:bg-orange-400/10 dark:text-orange-200 dark:border-orange-400/20",
};

function Index() {
  const popular = POPULAR_TOOLS.map(getTool);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <section className="border-b border-border bg-[linear-gradient(180deg,var(--color-card),var(--color-background))]">
          <div className="mx-auto grid max-w-7xl gap-10 px-6 py-14 lg:grid-cols-[1fr_420px] lg:items-center lg:py-20">
            <div>
              <p className="mb-4 inline-flex items-center rounded-full border border-brand/20 bg-brand-muted px-3 py-1 text-xs font-semibold text-brand">
                Private browser-based utility toolkit
              </p>
              <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-foreground md:text-6xl">
                Free Browser-Based File Tools
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground md:text-lg">
                Compress, convert, merge, resize, and edit files directly in your browser. No uploads, no account, no server storage.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <TrustBadge icon={ShieldCheck} text="Private by default" />
                <TrustBadge icon={Zap} text="Runs in your browser" />
                <TrustBadge icon={BadgeCheck} text="Free tools" />
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
              <div className="rounded-xl border border-dashed border-brand/40 bg-brand-muted p-8 text-center">
                <div className="mx-auto mb-4 grid size-14 place-items-center rounded-2xl bg-brand text-brand-foreground">
                  <Sparkles className="size-6" />
                </div>
                <h2 className="text-lg font-semibold">Choose a tool to start</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  Each tool page has a large upload area and processes files locally in your browser.
                </p>
                <p className="mt-5 rounded-lg bg-card px-4 py-3 text-xs font-medium text-muted-foreground">
                  Your files are processed in your browser and never uploaded.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-7xl px-6 py-12">
          <AdSlot label="Advertisement" />

          <section className="mt-12">
            <SectionHeader title="Popular Tools" text="The most useful CreatorKitTools utilities, all working directly in your browser." />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {popular.map((tool) => (
                <ToolCard key={tool.id} id={tool.id} />
              ))}
            </div>
          </section>

          <section className="mt-16 space-y-12">
            {CATEGORY_SECTIONS.map((section) => (
              <CategoryBlock key={section.id} {...section} />
            ))}
          </section>

          <section className="mt-16 grid gap-4 lg:grid-cols-4">
            {["Choose a tool", "Drop your file", "Process in your browser", "Download result"].map((step, index) => (
              <div key={step} className="rounded-2xl border border-border bg-card p-5 shadow-sm">
                <span className="grid size-9 place-items-center rounded-full bg-brand text-sm font-bold text-brand-foreground">
                  {index + 1}
                </span>
                <h2 className="mt-4 text-base font-semibold">{step}</h2>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {index === 0 && "Pick a real working browser-based tool."}
                  {index === 1 && "Use the large drag-and-drop area on each tool page."}
                  {index === 2 && "Tools use browser APIs and free open-source libraries, not server uploads."}
                  {index === 3 && "Save the finished file directly from browser memory."}
                </p>
              </div>
            ))}
          </section>

          <section className="mt-16 overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
            <div className="grid gap-8 p-8 lg:grid-cols-[1fr_340px] lg:items-center">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-brand">Privacy First</p>
                <h2 className="mt-3 text-2xl font-bold tracking-tight">Files stay on your device</h2>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                  CreatorKitTools is built for a no-backend workflow. Tools process files in browser memory without uploads, accounts, databases, or server-side file handling.
                </p>
              </div>
              <div className="grid gap-3 text-sm">
                {["Files never uploaded", "Browser-based processing", "Privacy first", "No server storage"].map((item) => (
                  <div key={item} className="flex items-center gap-3 rounded-xl border border-border bg-background px-4 py-3">
                    <Lock className="size-4 text-brand" />
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

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-card/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img src="/favicon-48x48.png" alt="" className="size-9 rounded-xl" />
          <span className="text-base font-bold tracking-tight">CreatorKitTools</span>
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-muted-foreground lg:flex">
          {NAV_ITEMS.map((item) => (
            <a key={item.href} href={item.href} className="hover:text-foreground">
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid size-9 place-items-center rounded-lg border border-border bg-background text-foreground lg:hidden"
            aria-label="Toggle navigation"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-border bg-card px-6 py-4 lg:hidden">
          <div className="mx-auto grid max-w-7xl gap-2">
            {NAV_ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}

function CategoryBlock({ id, title, text }: { id: ToolCategory; title: string; text: string }) {
  const tools = TOOL_DEFINITIONS.filter((tool) => tool.category === id);

  return (
    <section id={`${id}-tools`}>
      <SectionHeader title={title} text={text} />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {tools.map((tool) => (
          <ToolCard key={tool.id} id={tool.id} compact />
        ))}
      </div>
    </section>
  );
}

function ToolCard({ id, compact = false }: { id: ClientToolId; compact?: boolean }) {
  const tool = getTool(id);
  const Icon = iconByTool[id] ?? categoryIcon(tool.category);

  return (
    <Link
      to={getToolPath(tool.id)}
      className="group rounded-2xl border border-border bg-card p-5 shadow-sm transition hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-4">
        <span className={cn("grid size-11 place-items-center rounded-xl border", colorByCategory[tool.category])}>
          <Icon className="size-5" />
        </span>
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight group-hover:text-brand">{tool.title}</h3>
      <p className={cn("mt-2 text-sm leading-6 text-muted-foreground", compact && "line-clamp-2")}>{tool.description}</p>
    </Link>
  );
}

function categoryIcon(category: ToolCategory) {
  if (category === "pdf") return FileText;
  if (category === "document") return FileText;
  if (category === "audio") return FileAudio;
  if (category === "video") return FileVideo;
  return FileImage;
}

function SectionHeader({ title, text }: { title: string; text: string }) {
  return (
    <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <p className="mt-1 max-w-2xl text-sm leading-6 text-muted-foreground">{text}</p>
      </div>
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

function AdSlot({ label }: { label: string }) {
  return (
    <aside className="flex min-h-24 items-center justify-center rounded-2xl border border-dashed border-border bg-card text-[11px] font-semibold uppercase tracking-widest text-muted-foreground">
      {label}
    </aside>
  );
}
