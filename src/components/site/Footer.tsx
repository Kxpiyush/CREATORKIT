import { Link } from "@tanstack/react-router";

import { type ClientToolId, getTool, getToolPath } from "@/lib/client-tools";

const legalLinks = [
  { to: "/privacy-policy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms" },
  { to: "/contact", label: "Contact" },
  { to: "/about", label: "About" },
  { to: "/disclaimer", label: "Disclaimer" },
];

const groups: Array<{ title: string; tools: ClientToolId[] }> = [
  {
    title: "Image Tools",
    tools: [
      "image-compressor",
      "jpg-to-png",
      "png-to-jpg",
      "resize-image",
      "crop-image",
      "blur-image",
      "meme-maker",
      "add-watermark",
      "image-to-pdf",
    ],
  },
  {
    title: "PDF Tools",
    tools: [
      "merge-pdf",
      "split-pdf",
      "pdf-to-jpg",
      "jpg-to-pdf",
      "png-to-pdf",
      "rotate-pdf",
      "add-watermark-pdf",
    ],
  },
  {
    title: "Document Tools",
    tools: ["txt-to-pdf", "docx-to-text", "docx-to-html"],
  },
  {
    title: "Text Tools",
    tools: [
      "word-counter",
      "character-counter",
      "text-case-converter",
      "case-converter",
      "remove-duplicate-lines",
      "text-sorter",
      "text-reverser",
      "url-encoder",
      "url-decoder",
      "base64-encoder",
      "base64-decoder",
    ],
  },
  {
    title: "YouTube Tools",
    tools: [
      "youtube-thumbnail-downloader",
      "youtube-thumbnail-viewer",
      "youtube-video-id-extractor",
      "youtube-title-length-checker",
      "youtube-description-length-checker",
    ],
  },
  {
    title: "Social Tools",
    tools: [
      "instagram-caption-formatter",
      "instagram-hashtag-generator",
      "tiktok-hashtag-generator",
      "tiktok-caption-formatter",
      "social-media-image-resizer",
    ],
  },
  {
    title: "Audio Tools",
    tools: [
      "mp3-cutter",
      "audio-merger",
      "audio-trimmer",
      "volume-booster",
      "reverse-audio",
      "change-audio-speed",
    ],
  },
  {
    title: "Video Tools",
    tools: [
      "video-to-mp3",
      "mute-video",
      "video-trimmer",
      "video-to-gif",
      "extract-frames",
      "merge-videos",
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
                <h2 className="text-sm font-semibold">{group.title}</h2>
                <div className="mt-3 grid gap-2">
                  {group.tools.map((id) => {
                    const tool = getTool(id);
                    return (
                      <Link key={id} to={getToolPath(id)} className="text-sm text-muted-foreground hover:text-foreground">
                        {tool.title}
                      </Link>
                    );
                  })}
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
