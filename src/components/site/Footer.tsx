import { Link } from "@tanstack/react-router";

import { type ClientToolId, getTool, getToolPath } from "@/lib/client-tools";

const legalLinks = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
  { to: "/disclaimer", label: "Disclaimer" },
];

const groups: Array<{ title: string; href: string; tools: ClientToolId[] }> = [
  {
    title: "Image Tools",
    href: "/image-tools",
    tools: [
      "image-compressor",
      "jpg-to-png",
      "png-to-jpg",
      "resize-image",
      "crop-image",
    ],
  },
  {
    title: "PDF Tools",
    href: "/pdf-tools",
    tools: [
      "merge-pdf",
      "split-pdf",
      "pdf-to-jpg",
      "jpg-to-pdf",
      "png-to-pdf",
    ],
  },
  {
    title: "Word Tools",
    href: "/word-tools",
    tools: [
      "word-to-txt",
      "txt-to-word",
      "word-to-html",
      "word-to-markdown",
      "word-image-extractor",
    ],
  },
  {
    title: "Developer Tools",
    href: "/developer-tools",
    tools: [
      "jwt-decoder",
      "json-formatter-validator",
      "uuid-generator",
      "password-generator",
      "hash-generator",
    ],
  },
  {
    title: "Network Tools",
    href: "/network-tools",
    tools: ["what-is-my-ip", "ip-lookup", "user-agent-detector"],
  },
  {
    title: "Audio Tools",
    href: "/audio-tools",
    tools: [
      "mp3-cutter",
      "audio-merger",
      "audio-trimmer",
      "volume-booster",
    ],
  },
  {
    title: "Video Tools",
    href: "/video-tools",
    tools: [
      "video-to-mp3",
      "mute-video",
      "video-trimmer",
      "video-to-gif",
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Link to="/" className="flex items-center gap-3">
              <img src="/favicon-48x48.png" alt="" className="size-9 rounded-xl" />
              <span className="text-base font-bold tracking-tight">CreatorKitTools</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-6 text-muted-foreground">
              Files are processed locally in your browser and never uploaded. No accounts, no
              database storage, and no server-side file processing.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium text-muted-foreground">
              {["Files never uploaded", "Browser-based processing", "Privacy first", "No server storage"].map((badge) => (
                <span key={badge} className="rounded-full border border-border bg-background px-3 py-1">
                  {badge}
                </span>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {groups.map((group) => (
              <nav key={group.title}>
                <Link to={group.href} className="text-sm font-semibold hover:text-brand">
                  {group.title}
                </Link>
                <div className="mt-3 grid gap-2">
                  {group.tools.map((id) => {
                    const tool = getTool(id);
                    return (
                      <Link key={id} to={getToolPath(id)} className="text-sm text-muted-foreground hover:text-foreground">
                        {tool.title}
                      </Link>
                    );
                  })}
                  <Link to={group.href} className="text-sm font-medium text-brand hover:underline">
                    View all
                  </Link>
                </div>
              </nav>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-border pt-6 md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            {legalLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </nav>
          <p className="text-xs text-muted-foreground">Cookie and ads notice placeholder for future AdSense compliance.</p>
        </div>
      </div>
    </footer>
  );
}
