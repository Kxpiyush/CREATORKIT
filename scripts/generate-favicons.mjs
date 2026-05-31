import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const __dirname = dirname(fileURLToPath(import.meta.url));
const rootDir = join(__dirname, "..");
const sourceFile = join(rootDir, "src", "assets", "brand-butterfly.svg");
const publicDir = join(rootDir, "public");
const svg = readFileSync(sourceFile);

const pngTargets = [
  ["favicon-16x16.png", 16],
  ["favicon-32x32.png", 32],
  ["favicon-48x48.png", 48],
  ["apple-touch-icon.png", 180],
  ["android-chrome-192x192.png", 192],
  ["android-chrome-512x512.png", 512],
  ["favicon-192x192.png", 192],
  ["favicon-512x512.png", 512],
  ["favicon.png", 512],
];

mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, "favicon.svg"), svg);
writeFileSync(join(publicDir, "brand-butterfly.svg"), svg);

const icoEntries = [];
for (const [filename, size] of pngTargets) {
  const png = await sharp(svg, { density: 1024 })
    .resize(size, size, { fit: "contain" })
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toBuffer();
  writeFileSync(join(publicDir, filename), png);
  if (size === 16 || size === 32 || size === 48) {
    icoEntries.push({ size, png });
  }
}

writeFileSync(join(publicDir, "favicon.ico"), createIco(icoEntries));

function createIco(entries) {
  const headerSize = 6;
  const directorySize = 16 * entries.length;
  let imageOffset = headerSize + directorySize;
  const buffers = [Buffer.alloc(headerSize), Buffer.alloc(directorySize)];

  buffers[0].writeUInt16LE(0, 0);
  buffers[0].writeUInt16LE(1, 2);
  buffers[0].writeUInt16LE(entries.length, 4);

  entries.forEach((entry, index) => {
    const directoryOffset = index * 16;
    const width = entry.size === 256 ? 0 : entry.size;
    const height = entry.size === 256 ? 0 : entry.size;
    buffers[1].writeUInt8(width, directoryOffset);
    buffers[1].writeUInt8(height, directoryOffset + 1);
    buffers[1].writeUInt8(0, directoryOffset + 2);
    buffers[1].writeUInt8(0, directoryOffset + 3);
    buffers[1].writeUInt16LE(1, directoryOffset + 4);
    buffers[1].writeUInt16LE(32, directoryOffset + 6);
    buffers[1].writeUInt32LE(entry.png.length, directoryOffset + 8);
    buffers[1].writeUInt32LE(imageOffset, directoryOffset + 12);
    imageOffset += entry.png.length;
  });

  return Buffer.concat([...buffers, ...entries.map((entry) => entry.png)]);
}
