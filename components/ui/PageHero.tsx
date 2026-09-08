import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
};

/**
 * Compact header for inner pages — the hero is not the LCP concern here the
 * way the homepage hero is, but it still renders as plain server HTML with
 * no opacity gate.
 */
export default function PageHero({ eyebrow, title, lead }: Props) {
  return (
    <section className="border-b border-sand-200 bg-sand-100/60">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-20">
        <p className="text-eyebrow font-semibold uppercase text-ochre-600">
          {eyebrow}
        </p>
        <h1 className="mt-4 max-w-3xl font-display text-h1 font-semibold text-forest-950">
          {title}
        </h1>
        {lead && <p className="mt-5 max-w-2xl text-lead text-ink-700">{lead}</p>}
      </div>
    </section>
  );
}
