import Link from "next/link";
import Logo from "./Logo";
import { nav, site, whatsappLink } from "@/lib/site";

// Evaluated once at module load (build time), not during render. With
// cacheComponents enabled, calling `new Date()` inside a component body is a
// non-deterministic operation that Next requires you to handle explicitly.
const year = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-forest-800 bg-forest-950 text-sand-200">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:px-8">
        <div className="max-w-sm">
          <div className="flex items-center gap-2.5">
            <Logo className="h-9 w-9" />
            <span className="font-display text-xl font-semibold text-sand-50">
              {site.name}
            </span>
          </div>
          <p className="mt-5 text-[0.95rem] leading-relaxed text-sand-200/75">
            Частные туры по Шри-Ланке, встречи в аэропорту и комфортный транспорт
            для гостей, которые ценят доверие, спокойствие и высокий уровень
            сервиса.
          </p>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-block rounded-full border border-sand-300/40 px-6 py-3 text-sm font-semibold text-sand-50 transition-colors hover:border-sand-300 hover:bg-forest-900"
          >
            Написать в WhatsApp
          </a>
        </div>

        <nav aria-label="Навигация в подвале">
          <h2 className="text-eyebrow font-semibold uppercase text-sand-400">
            Навигация
          </h2>
          <ul className="mt-5 space-y-3">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.95rem] text-sand-200/80 transition-colors hover:text-sand-50"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-eyebrow font-semibold uppercase text-sand-400">
            Контакты
          </h2>
          <ul className="mt-5 space-y-3 text-[0.95rem] text-sand-200/80">
            <li>
              WhatsApp:{" "}
              <a
                href={whatsappLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors hover:text-sand-50"
              >
                {site.phoneDisplay}
              </a>
            </li>
            <li>
              Email:{" "}
              <a
                href={`mailto:${site.email}`}
                className="transition-colors hover:text-sand-50"
              >
                {site.email}
              </a>
            </li>
            <li className="text-sand-200/60">Работаем по всей Шри-Ланке</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-forest-800/70">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-sm text-sand-200/55 sm:flex-row sm:items-center sm:justify-between md:px-8">
          <p>
            © {year} {site.name}. Частные путешествия, созданные с заботой.
          </p>
          <Link href="/privacy" className="transition-colors hover:text-sand-50">
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
