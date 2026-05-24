import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const routesDir = join(rootDir, "src", "routes");
const toolsFile = join(rootDir, "src", "lib", "client-tools.ts");
const outputFile = join(rootDir, "public", "sitemap.xml");
const siteUrl = "https://creatorkittools.com";
const today = new Date().toISOString().slice(0, 10);

function routeFileToPath(file) {
  const routeName = file.replace(/\.tsx$/, "");
  if (routeName === "index") return "/";
  if (routeName === "__root" || routeName.startsWith("$")) return null;
  if (routeName.includes("sitemap")) return null;
  return `/${routeName.replace(/\[\.\]/g, ".")}`;
}

function extractToolEntries() {
  const source = readFileSync(toolsFile, "utf8");
  const blocks = source.match(/\{\s*id:\s*"[^"]+"[\s\S]*?\n\s*\}/g) ?? [];

  return blocks
    .map((block) => {
      const id = block.match(/id:\s*"([^"]+)"/)?.[1];
      if (!id) return null;
      const route = block.match(/route:\s*"([^"]+)"/)?.[1] ?? `/${id}`;
      const isBeta = /beta:\s*true/.test(block);
      const isMediaEngine = /engine:\s*"media-engine"/.test(block);
      return {
        path: route,
        changefreq: "weekly",
        priority: isBeta || isMediaEngine ? "0.7" : "0.9",
      };
    })
    .filter(Boolean);
}

function escapeXml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

const staticEntries = readdirSync(routesDir)
  .filter((file) => file.endsWith(".tsx"))
  .map(routeFileToPath)
  .filter(Boolean)
  .map((path) => ({
    path,
    changefreq: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? "1.0" : "0.5",
  }));

const entriesByPath = new Map();
for (const entry of [...staticEntries, ...extractToolEntries()]) {
  entriesByPath.set(entry.path, entry);
}

const entries = [...entriesByPath.values()].sort((a, b) => {
  if (a.path === "/") return -1;
  if (b.path === "/") return 1;
  return a.path.localeCompare(b.path);
});

const urls = entries.map(
  (entry) =>
    `  <url><loc>${escapeXml(`${siteUrl}${entry.path}`)}</loc><lastmod>${today}</lastmod><changefreq>${entry.changefreq}</changefreq><priority>${entry.priority}</priority></url>`,
);

const xml = [
  '<?xml version="1.0" encoding="UTF-8"?>',
  '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
  ...urls,
  "</urlset>",
  "",
].join("\n");

writeFileSync(outputFile, xml, "utf8");
console.log(`Generated public/sitemap.xml with ${entries.length} URLs.`);
