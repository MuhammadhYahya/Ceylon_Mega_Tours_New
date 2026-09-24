import Image from "next/image";
import { mediaBlurProps } from "@/lib/images";
import { tourIcon } from "@/lib/tourIcons";
import type { TourStep } from "@/lib/types";

export type StepGroup = { day: string | null; steps: TourStep[] };

/**
 * Where the dashed trail crosses each row once it has room to wind, as a
 * percentage of the column width. Percentages are right here: the weave
 * should open out as the column grows.
 */
const WEAVE = [85, 15];

/**
 * Clearance the step numeral needs either side of its bead. Constant, not a
 * percentage — the numeral is a fixed size, so the space it needs doesn't
 * grow with the column. Cards stop this far short of the trail.
 */
const NUMERAL_CLEARANCE = "2rem";

/** Trail position in the single-rail layout. Constant, for the same reason. */
const RAIL_INSET = "left-10";

/**
 * One row's worth of trail: in at `entry`, through the bead at `mid`, out at
 * `exit`, in a 0–100 box on both axes.
 *
 * Drawn per row rather than as one path down the whole column, because a row
 * is only as tall as its card and card heights vary with the copy. A single
 * path would need JavaScript to measure them; a stack of segments that each
 * fill their own row joins up on its own, at any height, with no script.
 */
function segment(entry: number, mid: number, exit: number) {
  return `M${entry},0 C${entry},24 ${mid},26 ${mid},50 C${mid},74 ${exit},76 ${exit},100`;
}

function anchors(index: number, total: number) {
  const at = (i: number) => WEAVE[i % WEAVE.length];
  return {
    entry: at(index === 0 ? index : index - 1),
    mid: at(index),
    exit: at(index === total - 1 ? index : index + 1),
  };
}

/**
 * The tour programme as a winding dashed trail of numbered cards.
 *
 * Responsive off its own box, not the viewport: this shares a row with
 * "Что включено" once there's room, so a wide window can still leave this
 * column narrow. Everything below keys off container width (`@md`, `cqi`),
 * which means it lays out correctly whether it's half of a desktop row, a
 * full-width tablet column, or a phone.
 *
 * Narrow, the trail is a straight rail and is drawn as a plain dashed border
 * at a fixed inset — no SVG, because a straight line doesn't need one, and a
 * border can sit at a constant `rem` offset that the bead and cards can line
 * up against exactly. The SVG only appears for the weave, where the path
 * genuinely curves and percentage anchors are what you want.
 */
export default function TourTimeline({ groups }: { groups: StepGroup[] }) {
  // Numbering and the weave both run continuously across day groups, so both
  // are driven by the step's position in the whole tour, not within its day.
  const total = groups.reduce((n, g) => n + g.steps.length, 0);
  const offsets = groups.map((_, g) =>
    groups.slice(0, g).reduce((n, prev) => n + prev.steps.length, 0)
  );

  return (
    <div className="@container">
      {groups.map((group, g) => (
        <div key={g} className={g > 0 ? "mt-8" : ""}>
          {group.day && (
            <p className="mb-4 flex items-center gap-4 text-eyebrow font-semibold uppercase text-ochre-600">
              {group.day}
              <span aria-hidden="true" className="h-px flex-1 bg-forest-200" />
            </p>
          )}

          <ol className="relative">
            {/* Straight rail, narrow only. */}
            <span
              aria-hidden="true"
              className={`absolute inset-y-0 border-l-2 border-dashed border-forest-700 @md:hidden ${RAIL_INSET}`}
            />

            {group.steps.map((step, i) => {
              const index = offsets[g] + i;
              const wide = anchors(index, total);
              const markerRight = index % 2 === 0;
              const Icon = tourIcon(step.icon?.id);
              const custom = step.icon?.image;

              return (
                <li
                  key={`${index}-${step.title}`}
                  className="relative flex min-h-[clamp(7rem,6rem+8cqi,8.5rem)] items-center"
                  style={
                    {
                      "--ax": `${wide.mid}%`,
                      // Gutter the card leaves for the trail: the distance in
                      // from the edge the bead sits at, plus the numeral's
                      // own fixed clearance. Percentage and constant in one
                      // value, which is the whole point of calc() here.
                      "--gutter": `calc(${100 - WEAVE[0]}% + ${NUMERAL_CLEARANCE})`,
                    } as React.CSSProperties
                  }
                >
                  {/* Winding trail, wide only. Stretched to the row rather
                      than drawn to scale, so the curve breathes with the row
                      height; non-scaling-stroke keeps the dashes even. */}
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 100 100"
                    preserveAspectRatio="none"
                    className="pointer-events-none absolute inset-0 hidden h-full w-full @md:block"
                  >
                    <path
                      d={segment(wide.entry, wide.mid, wide.exit)}
                      fill="none"
                      stroke="var(--color-forest-700)"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeDasharray="3 7"
                      vectorEffect="non-scaling-stroke"
                    />
                  </svg>

                  {/* Bead — this element *is* the point the trail runs
                      through, so the numeral hangs off it rather than the
                      other way round. Its solid fill masks the dashes. */}
                  <div
                    className={`absolute top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 @md:left-[var(--ax)] ${RAIL_INSET}`}
                  >
                    <span className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-forest-700 bg-sand-100">
                      <span className="h-1.5 w-1.5 rounded-full bg-leaf-300" />
                    </span>
                    <span className="absolute bottom-full left-1/2 mb-1 flex -translate-x-1/2 flex-col items-center leading-none">
                      <span className="text-[0.5rem] font-bold uppercase tracking-[0.2em] text-forest-600">
                        Шаг
                      </span>
                      {/* Scales off the column, not the window — in a narrow
                          half-column on a wide screen it stays in proportion
                          with the card beside it. */}
                      <span className="step-numeral font-sans text-[clamp(1.75rem,1.4rem+2cqi,2.4rem)] font-extrabold">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </span>
                  </div>

                  <div
                    className={`relative z-10 ml-20 flex-1 ${
                      markerRight
                        ? "@md:ml-0 @md:mr-[var(--gutter)]"
                        : "@md:ml-[var(--gutter)]"
                    }`}
                  >
                    {step.badge && (
                      /* Pinned to the card edge *away* from the numeral —
                         otherwise the two land on top of each other at the
                         end of the row the marker is on. */
                      <span
                        className={`absolute -top-2.5 z-20 rounded-full bg-leaf-300 px-2.5 py-[3px] text-[0.58rem] font-bold uppercase tracking-[0.1em] text-forest-950 ring-2 ring-sand-100 ${
                          markerRight ? "right-5 @md:left-6 @md:right-auto" : "right-5"
                        }`}
                      >
                        {step.badge}
                      </span>
                    )}

                    <div className="flex items-center gap-3.5 rounded-[1.65rem] bg-forest-950 p-2.5 pr-5 shadow-[0_0_0_4px_var(--color-forest-100)] ring-1 ring-forest-800">
                      <span className="relative flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full border border-forest-400/40">
                        {custom?.src ? (
                          <Image
                            src={custom.src}
                            {...mediaBlurProps(custom)}
                            alt=""
                            fill
                            sizes="48px"
                            className="object-contain p-2"
                          />
                        ) : (
                          <Icon size={22} className="text-forest-200" aria-hidden="true" />
                        )}
                      </span>

                      <div className="min-w-0 flex-1">
                        <p className="font-sans text-[0.97rem] font-bold leading-snug text-sand-50">
                          {step.title}
                        </p>
                        {step.subtitle && (
                          <p className="mt-0.5 text-[0.8rem] leading-snug text-forest-200">
                            {step.subtitle}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      ))}
    </div>
  );
}
