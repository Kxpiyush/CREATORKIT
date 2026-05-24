import { createFileRoute } from "@tanstack/react-router";
import type {} from "@tanstack/react-start";

import { TOOL_DEFINITIONS } from "@/lib/client-tools";
import { SITE_URL } from "@/lib/site";

const routeModules = import.meta.glob("./*.tsx", {
  query: "?raw",
  import: "default",
});

interface SitemapEntry {
  path: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
  lastmod?: string;
}

function routeFileToPath(file: string) {
  const routeName = file.replace("./", "").replace(/\.tsx$/, "");
  if (routeName === "index") return "/";
  if (routeName === "__root" || routeName.startsWith("$")) return null;
  return `/${routeName.replace(/\[\.\]/g, ".")}`;
}

function uniqueEntries(entries: SitemapEntry[]) {
  const byPath = new Map<string, SitemapEntry>();
  for (const entry of entries) {
    if (entry.path && !entry.path.includes("$")) byPath.set(entry.path, entry);
  }
  return [...byPath.values()].sort((a, b) => {
    if (a.path === "/") return -1;
    if (b.path === "/") return 1;
    return a.path.localeCompare(b.path);
  });
}

function escapeXml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const today = new Date().toISOString().slice(0, 10);
        const staticEntries = Object.keys(routeModules)
          .map(routeFileToPath)
          .filter((path): path is string => Boolean(path))
          .filter((path) => path !== "/sitemap.xml")
          .map((path): SitemapEntry => ({
            path,
            changefreq: path === "/" ? "weekly" : "monthly",
            priority: path === "/" ? "1.0" : "0.5",
            lastmod: today,
          }));
        const toolEntries = TOOL_DEFINITIONS.map((tool): SitemapEntry => ({
          path: tool.route ?? `/${tool.id}`,
          changefreq: "weekly",
          priority: tool.beta || tool.engine === "media-engine" ? "0.7" : "0.9",
          lastmod: today,
        }));
        const entries = uniqueEntries([...staticEntries, ...toolEntries]);
        const urls = entries.map(
          (e) =>
            `  <url><loc>${escapeXml(`${SITE_URL}${e.path}`)}</loc>${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>` : ""}${e.changefreq ? `<changefreq>${e.changefreq}</changefreq>` : ""}${e.priority ? `<priority>${e.priority}</priority>` : ""}</url>`,
        );
        const xml = [
          `<?xml version="1.0" encoding="UTF-8"?>`,
          `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
          ...urls,
          `</urlset>`,
        ].join("\n");
        return new Response(xml, {
          headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" },
        });
      },
    },
  },
});
