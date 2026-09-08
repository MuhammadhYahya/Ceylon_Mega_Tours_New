/**
 * One-off: pull source photography from the previous build and emit
 * web-weight JPEGs. The originals run 1–3.6 MB each; nothing that heavy
 * belongs in the repo.
 *
 *   node scripts/optimize-images.mjs
 */
import sharp from "sharp";
import { mkdir, stat } from "node:fs/promises";
import path from "node:path";

const SRC = "D:/yahya/C MEGA/ceylon-mega-tours/public/images";
const OUT = path.join(process.cwd(), "public/images");

const jobs = [
  { from: "sigiriya.jpg", to: "hero-sigiriya.jpg", width: 1200, quality: 72 },
  { from: "sigiriya.jpg", to: "sigiriya.jpg", width: 1000, quality: 72 },
  { from: "coast.jpg", to: "coast.jpg", width: 1200 },
  { from: "train.png", to: "train.jpg", width: 1200 },
  { from: "elephant.png", to: "elephant.jpg", width: 1200 },
  { from: "tea.png", to: "tea.jpg", width: 1200 },
  { from: "guide.png", to: "guide.jpg", width: 1000, quality: 78 },
];

const kb = (b) => `${(b / 1024).toFixed(0)} KB`;

await mkdir(OUT, { recursive: true });

for (const job of jobs) {
  const src = path.join(SRC, job.from);
  const out = path.join(OUT, job.to);

  const before = (await stat(src)).size;
  await sharp(src)
    .resize({ width: job.width, withoutEnlargement: true })
    .jpeg({ quality: job.quality ?? 78, mozjpeg: true, progressive: true })
    .toFile(out);
  const after = (await stat(out)).size;

  const saved = (100 - (after / before) * 100).toFixed(0);
  console.log(
    `${job.from.padEnd(15)} -> ${job.to.padEnd(20)} ${kb(before).padStart(8)} -> ${kb(after).padStart(8)}  (-${saved}%)`
  );
}
