import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "invert";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full text-[0.95rem] font-semibold transition-colors disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary: "px-7 py-3.5 bg-forest-800 text-sand-50 hover:bg-forest-700",
  secondary:
    "px-7 py-3.5 border border-forest-800/25 bg-transparent text-forest-900 hover:border-forest-800/60 hover:bg-sand-100",
  ghost: "py-2 text-forest-800 hover:text-forest-600",
  // For use on the dark forest sections
  invert: "px-7 py-3.5 bg-sand-50 text-forest-950 hover:bg-sand-200",
};

type ButtonLinkProps = {
  href: string;
  variant?: Variant;
  external?: boolean;
  children: ReactNode;
  className?: string;
};

/** Anchor-styled CTA. Renders a real link so it works without hydration. */
export function ButtonLink({
  href,
  variant = "primary",
  external = false,
  children,
  className = "",
}: ButtonLinkProps) {
  const cls = `${base} ${variants[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function Button({
  variant = "primary",
  className = "",
  ...props
}: ComponentProps<"button"> & { variant?: Variant }) {
  return <button className={`${base} ${variants[variant]} ${className}`} {...props} />;
}
