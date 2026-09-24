/**
 * Seeds the structured `programme` and `inclusionItems` fields on every tour
 * package from the older flat `highlights` / `inclusions` lines.
 *
 * The site renders the legacy fields when the new ones are empty, so nothing
 * is broken before this runs — this exists so the client starts from fourteen
 * populated tours instead of fourteen blank forms.
 *
 * It never overwrites: a document that already has `programme` is skipped, so
 * re-running it after editors have made changes is safe.
 *
 * Icons are a *guess*, matched on keywords in the Russian title, and subtitles
 * are deliberately left empty — that copy has to be written by a person, not
 * invented here. Both are meant to be reviewed in the Studio afterwards.
 *
 * Usage (needs an Editor token in .env.local as SANITY_API_WRITE_TOKEN):
 *   node scripts/migrate-programme.mjs --dry     # print the plan, write nothing
 *   node scripts/migrate-programme.mjs           # apply
 */
import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";

const DRY_RUN = process.argv.includes("--dry");

// --- env -------------------------------------------------------------------

function readEnvLocal() {
  const file = path.join(process.cwd(), ".env.local");
  if (!fs.existsSync(file)) return {};
  return Object.fromEntries(
    fs
      .readFileSync(file, "utf8")
      .split(/\r?\n/)
      .filter((line) => line.trim() && !line.trim().startsWith("#"))
      .map((line) => {
        const at = line.indexOf("=");
        return [line.slice(0, at).trim(), line.slice(at + 1).trim()];
      })
  );
}

const env = { ...readEnvLocal(), ...process.env };

function required(name) {
  const value = env[name];
  if (!value) {
    console.error(`Missing ${name}. Add it to .env.local before running.`);
    process.exit(1);
  }
  return value;
}

const client = createClient({
  projectId: required("NEXT_PUBLIC_SANITY_PROJECT_ID"),
  dataset: required("NEXT_PUBLIC_SANITY_DATASET"),
  apiVersion: env.SANITY_API_VERSION || "2024-01-01",
  token: DRY_RUN ? undefined : required("SANITY_API_WRITE_TOKEN"),
  useCdn: false,
});

// --- icon guessing ---------------------------------------------------------

/**
 * First keyword whose pattern matches the line wins, so order matters: the
 * more specific patterns are listed above the general ones. Keys must exist
 * in `studio/schemaTypes/tourIconOptions.ts`.
 */
const ICON_RULES = [
  [/кит|дельфин|рыбалк|рыбак|рыб/i, "fish"],
  [/черепах/i, "turtle"],
  [/птиц/i, "bird"],
  [/слон|сафари|леопард|парк|джип/i, "binoculars"],
  [/пляж|пальм|кокос|побережь/i, "palm"],
  [/океан|море|волн|снорк|дайв/i, "waves"],
  [/лодк|катер|катамаран|яхт/i, "sailboat"],
  [/храм|крепост|форт|дворец|будд|музе|руин/i, "landmark"],
  [/чай|плантац|кофе/i, "coffee"],
  [/поезд|железн/i, "train"],
  [/трансфер|автобус|микроавтобус|машин/i, "bus"],
  [/водопад|река|озер/i, "droplet"],
  [/гор|скал|пик|восхожден|мост/i, "mountain"],
  [/камн|самоцвет|ювелир|сапфир/i, "gem"],
  [/рынок|шопинг|покупк|сувенир|ремесл/i, "shopping-bag"],
  [/сад|специ|корич|ботанич|цвет/i, "flower"],
  [/рассвет|восход|утренн/i, "sunrise"],
  [/закат|вечерн/i, "sunset"],
  [/обед|ужин|завтрак|ресторан|еда/i, "utensils"],
  [/фото|панорам|смотров/i, "camera"],
  [/аюрвед|массаж|спа/i, "heart"],
  [/билет/i, "ticket"],
  [/вод[аы]|напит/i, "droplet"],
  [/фрукт/i, "apple"],
  [/страхов|спасат|безопасн/i, "insurance"],
  [/таблетк|укачив|аптеч/i, "pill"],
  [/полотенц|кондиционер|комфорт/i, "ac"],
  [/гид|сопровожд/i, "guide"],
  [/отел|прожив|ночёвк|ночевк/i, "bed"],
];

function guessIcon(text) {
  for (const [pattern, icon] of ICON_RULES) {
    if (pattern.test(text)) return icon;
  }
  return undefined;
}

// --- shaping ---------------------------------------------------------------

const DAY_MARKER = /^День\s+\d+:/;

/** Sanity requires a stable `_key` on every array item. */
let keySeed = 0;
function key(prefix) {
  keySeed += 1;
  return `${prefix}${Date.now().toString(36)}${keySeed.toString(36)}`;
}

function toProgramme(highlights) {
  return highlights.map((line) => {
    const match = line.match(DAY_MARKER);
    const title = match ? line.slice(match[0].length).trim() : line;
    const icon = guessIcon(title);
    return {
      _key: key("step"),
      _type: "programmeStep",
      title,
      ...(match ? { day: match[0].replace(/:$/, "") } : {}),
      ...(icon ? { icon } : {}),
    };
  });
}

function toInclusionItems(inclusions) {
  return inclusions.map((text) => {
    const icon = guessIcon(text);
    return {
      _key: key("inc"),
      _type: "inclusionItem",
      text,
      ...(icon ? { icon } : {}),
    };
  });
}

// --- run -------------------------------------------------------------------

const tours = await client.fetch(
  `*[_type == "tourPackage"]{ _id, title, highlights, inclusions, programme, inclusionItems }`
);

console.log(`${tours.length} tour packages found.${DRY_RUN ? "  (dry run)" : ""}\n`);

let planned = 0;
const tx = client.transaction();

for (const tour of tours) {
  const patch = {};

  if (!tour.programme?.length && tour.highlights?.length) {
    patch.programme = toProgramme(tour.highlights);
  }
  if (!tour.inclusionItems?.length && tour.inclusions?.length) {
    patch.inclusionItems = toInclusionItems(tour.inclusions);
  }

  if (!Object.keys(patch).length) {
    console.log(`  skip  ${tour.title} — already migrated, or nothing to copy`);
    continue;
  }

  planned += 1;
  const steps = patch.programme?.length ?? 0;
  const items = patch.inclusionItems?.length ?? 0;
  const guessed = [...(patch.programme ?? []), ...(patch.inclusionItems ?? [])].filter(
    (entry) => entry.icon
  ).length;
  console.log(
    `  write ${tour.title} — ${steps} steps, ${items} inclusions, ${guessed} icons guessed`
  );

  tx.patch(tour._id, (p) => p.set(patch));
}

if (!planned) {
  console.log("\nNothing to do.");
  process.exit(0);
}

if (DRY_RUN) {
  console.log(`\nDry run: ${planned} documents would be updated. Nothing was written.`);
  process.exit(0);
}

await tx.commit();
console.log(`\nDone — ${planned} documents updated.`);
console.log("Review the guessed icons and write the subtitles in the Studio.");
