import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

const BASE_URL = "https://creatorkit.app";

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/image-compressor", changefreq: "weekly", priority: "0.9" },
          { path: "/jpg-to-png", changefreq: "weekly", priority: "0.9" },
          { path: "/png-to-jpg", changefreq: "weekly", priority: "0.9" },
          { path: "/resize-image", changefreq: "weekly", priority: "0.9" },
          { path: "/crop-image", changefreq: "weekly", priority: "0.9" },
          { path: "/blur-image", changefreq: "weekly", priority: "0.8" },
          { path: "/meme-maker", changefreq: "weekly", priority: "0.8" },
          { path: "/add-watermark", changefreq: "weekly", priority: "0.8" },
          { path: "/image-to-pdf", changefreq: "weekly", priority: "0.8" },
          { path: "/mp3-cutter", changefreq: "weekly", priority: "0.9" },
          { path: "/audio-merger", changefreq: "weekly", priority: "0.8" },
          { path: "/mp3-to-wav", changefreq: "weekly", priority: "0.8" },
          { path: "/volume-booster", changefreq: "weekly", priority: "0.8" },
          { path: "/reverse-audio", changefreq: "weekly", priority: "0.8" },
          { path: "/audio-trimmer", changefreq: "weekly", priority: "0.8" },
          { path: "/change-audio-speed", changefreq: "weekly", priority: "0.8" },
          { path: "/video-to-mp3", changefreq: "weekly", priority: "0.7" },
          { path: "/video-to-gif", changefreq: "weekly", priority: "0.7" },
          { path: "/video-compressor", changefreq: "weekly", priority: "0.7" },
          { path: "/video-trimmer", changefreq: "weekly", priority: "0.7" },
          { path: "/merge-videos", changefreq: "weekly", priority: "0.7" },
          { path: "/extract-frames", changefreq: "weekly", priority: "0.7" },
          { path: "/resize-video", changefreq: "weekly", priority: "0.7" },
          { path: "/mute-video", changefreq: "weekly", priority: "0.7" },
          { path: "/change-video-speed", changefreq: "weekly", priority: "0.7" },
          { path: "/audio-compressor", changefreq: "weekly", priority: "0.7" },
          { path: "/wav-to-mp3", changefreq: "weekly", priority: "0.7" },
          { path: "/privacy-policy", changefreq: "monthly", priority: "0.5" },
          { path: "/terms", changefreq: "monthly", priority: "0.5" },
          { path: "/contact", changefreq: "monthly", priority: "0.5" },
          { path: "/about", changefreq: "monthly", priority: "0.5" },
          { path: "/disclaimer", changefreq: "monthly", priority: "0.5" },
        ];
        const urls = entries.map(
          (e) =>
            `  <url><loc>${BASE_URL}${e.path}</loc>${e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : ""}${e.priority ? `<priority>${e.priority}</priority>` : ""}</url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
