import type { ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  lead?: string;
  align?: "left" | "center";
};

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = "left",
}: Props) {
  return (
    <div
      className={`reveal max-w-2xl ${align === "center" ? "mx-auto text-center" : ""}`}
    >
      <p className="text-eyebrow font-semibold uppercase text-ochre-600">
        {eyebrow}
      </p>
      <h2 className="mt-4 font-display text-h2 font-semibold text-forest-950">
        {title}
      </h2>
      {lead && <p className="mt-4 text-lead text-ink-700">{lead}</p>}
    </div>
  );
}
