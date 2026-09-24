"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { mediaBlurProps } from "@/lib/images";
import type { Media } from "@/lib/types";

/** How long each photo holds before the gallery moves itself on. */
const AUTOPLAY_MS = 8000;

/**
 * Main photo plus a scrollable filmstrip of the tour's other photos.
 *
 * Three ways to move: the arrows, a thumbnail, or waiting — it advances on
 * its own every 8 seconds. It holds while the pointer is over it or focus is
 * inside it, and doesn't auto-advance at all for a visitor who has asked for
 * reduced motion; an auto-playing carousel with no way to stop it is the
 * thing WCAG 2.2.2 exists to prevent.
 *
 * Every image is in the server-rendered HTML from the start — the large
 * frame and each thumbnail — so with JavaScript off, or before hydration,
 * the main photo still shows and the strip still scrolls.
 *
 * Renders the large frame alone when a tour has no gallery photos yet.
 */
export default function TourGallery({ images }: { images: Media[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [held, setHeld] = useState(false);
  const stripRef = useRef<HTMLDivElement>(null);
  const active = images[activeIndex] ?? images[0];
  const many = images.length > 1;

  const go = useCallback(
    (delta: number) => {
      setActiveIndex((i) => (i + delta + images.length) % images.length);
    },
    [images.length]
  );

  // Keep the chosen thumbnail in view — it can be scrolled off-screen when
  // the selection moves by arrow or on its own, or when the strip was left
  // scrolled somewhere else.
  useEffect(() => {
    const strip = stripRef.current;
    const thumb = strip?.children[activeIndex] as HTMLElement | undefined;
    thumb?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
  }, [activeIndex]);

  // A timeout keyed on the current photo rather than a repeating interval:
  // picking one by hand restarts the clock, so a photo chosen deliberately
  // gets its full turn instead of being cut off part-way through.
  useEffect(() => {
    if (!many || held) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const id = window.setTimeout(() => go(1), AUTOPLAY_MS);
    return () => window.clearTimeout(id);
  }, [activeIndex, held, many, go]);

  return (
    <div
      onMouseEnter={() => setHeld(true)}
      onMouseLeave={() => setHeld(false)}
      onFocus={() => setHeld(true)}
      onBlur={() => setHeld(false)}
    >
      <figure className="relative aspect-[4/3] overflow-hidden rounded-card shadow-lift">
        <Image
          // Remounting on swap replays the fade, so the change reads as a
          // change rather than a silent substitution.
          key={active.src}
          src={active.src}
          {...mediaBlurProps(active)}
          alt={active.alt}
          fill
          priority={activeIndex === 0}
          sizes="(max-width: 767px) 100vw, 50vw"
          className="animate-fade-in object-cover"
        />

        {active.alt && (
          <figcaption className="absolute bottom-4 left-4 max-w-[calc(100%-2rem)] rounded-full bg-forest-950/70 px-3.5 py-1.5 text-xs font-medium text-sand-50 backdrop-blur-sm">
            {active.alt}
          </figcaption>
        )}
      </figure>

      {many && (
        /* Arrows flank the strip rather than overlaying it, so they never
           cover a thumbnail and need no hover to appear — a touch screen
           never hovers. They step the gallery, and the strip follows, since
           the chosen thumbnail scrolls itself into view. */
        <div className="mt-3 flex items-center gap-2">
          <StripArrow side="left" onClick={() => go(-1)} />

          <div
            ref={stripRef}
            className="no-scrollbar flex min-w-0 flex-1 snap-x gap-3 overflow-x-auto scroll-smooth"
            role="group"
            aria-label="Фотографии тура"
          >
            {images.map((image, i) => {
              const isActive = i === activeIndex;
              return (
                <button
                  key={`${image.src}-${i}`}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  aria-pressed={isActive}
                  aria-label={`Фото ${i + 1} из ${images.length}${image.alt ? `: ${image.alt}` : ""}`}
                  /* Width scales with the viewport between a thumb that's
                     still tappable and one that never dominates the strip;
                     the aspect ratio then sets the height, so there is no
                     second value to keep in sync. */
                  className={`relative aspect-[4/3] w-[clamp(5rem,16vw,8rem)] shrink-0 snap-start overflow-hidden rounded-xl transition ${
                    isActive
                      ? "opacity-100 ring-2 ring-ochre-500 ring-offset-2 ring-offset-sand-50"
                      : "opacity-75 ring-1 ring-sand-300 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.src}
                    {...mediaBlurProps(image)}
                    alt=""
                    fill
                    sizes="128px"
                    className="object-cover"
                  />
                </button>
              );
            })}
          </div>

          <StripArrow side="right" onClick={() => go(1)} />
        </div>
      )}
    </div>
  );
}

/**
 * Always visible, on every device — these step the gallery, so they can't be
 * a hover-only affordance that a touch screen never reveals. The box is the
 * 44px a finger needs even though the drawn circle is smaller, so the strip
 * keeps as much width as possible for the thumbnails themselves.
 */
function StripArrow({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeft : ChevronRight;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Предыдущее фото" : "Следующее фото"}
      className="flex h-11 w-9 shrink-0 items-center justify-center text-forest-800 transition hover:text-ochre-600"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-sand-50 shadow-soft ring-1 ring-sand-300">
        <Icon size={18} aria-hidden="true" />
      </span>
    </button>
  );
}
