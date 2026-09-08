import Link from "next/link";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { nav, site, whatsappLink } from "@/lib/site";

/**
 * Server Component. Solid from the first byte — no scroll listener, no
 * transparent-to-opaque JS transition. The header is painted HTML.
 */
export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-sand-200/80 bg-sand-50/90 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between gap-6 px-5 md:px-8">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label={`${site.name} — на главную`}
        >
          <Logo className="h-9 w-9" priority />
          <span className="font-display text-xl font-semibold leading-none tracking-tight text-forest-900 sm:text-[1.4rem]">
            Ceylon Mega Tours
          </span>
        </Link>

        <nav aria-label="Основная навигация" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.9rem] font-medium text-ink-700 transition-colors hover:text-forest-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full bg-forest-800 px-6 py-3 text-sm font-semibold text-sand-50 transition-colors hover:bg-forest-700 lg:inline-block"
          >
            WhatsApp
          </a>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
