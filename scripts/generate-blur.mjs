/**
 * Emits a tiny base64 LQIP for every image in public/images, so lazily-loaded
 * photos fade up from a blurred preview instead of popping in from blank.
 *
 * Sanity supplies its own LQIP once the CMS is wired; this covers local files.
 *
 *   node scripts/generate-blur.mjs
 */
import sharp from "sharp";
import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";

const DIR = path.join(process.cwd(), "public/images");
const OUT = path.join(process.cwd(), "lib/content/blur.json");

const files = (await readdir(DIR)).filter((f) => /\.(jpe?g|png)$/i.test(f));
const map = {};

for (const file of files) {
  // 16px wide is enough to convey colour and composition once blurred,
  // and keeps the inlined data URI to ~400 bytes.
  const buf = await sharp(path.join(DIR, file))
    .resize(16, null, { fit: "inside" })
    .jpeg({ quality: 45 })
    .toBuffer();

  map[`/images/${file}`] = `data:image/jpeg;base64,${buf.toString("base64")}`;
  console.log(`/images/${file}`.padEnd(30), buf.length + " B");
}

await writeFile(OUT, JSON.stringify(map, null, 2) + "\n", "utf-8");
console.log(`\nwrote ${Object.keys(map).length} placeholders -> lib/content/blur.json`);
