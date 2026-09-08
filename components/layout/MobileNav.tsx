"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, whatsappLink } from "@/lib/site";

/**
 * The only interactive part of the header, isolated so the rest of the
 * navigation ships as plain server-rendered HTML.
 */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Закрыть меню" : "Открыть меню"}
        className="grid h-11 w-11 place-items-center rounded-full text-forest-900 transition-colors hover:bg-sand-200"
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div
          id="mobile-menu"
          className="absolute inset-x-0 top-full border-t border-sand-300 bg-sand-50 px-5 pb-7 pt-4 shadow-lift"
        >
          <ul className="flex flex-col">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block border-b border-sand-200 py-3.5 text-lg text-ink-900 transition-colors hover:text-forest-700"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <a
            href={whatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 block rounded-full bg-forest-800 py-3.5 text-center font-semibold text-sand-50 transition-colors hover:bg-forest-700"
          >
            Написать в WhatsApp
          </a>
        </div>
      )}
    </div>
  );
}
