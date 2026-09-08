"use client";

import Script from "next/script";
import { Fragment, useActionState } from "react";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { submitReview, type ReviewState } from "@/app/reviews/actions";

const initialState: ReviewState = {};

const inputClass =
  "w-full rounded-xl border border-sand-300 bg-sand-50 px-4 py-3 text-[0.95rem] text-ink-900 placeholder:text-ink-400 transition-colors focus:border-forest-500 focus:outline-none";
const labelClass = "text-sm font-medium text-ink-700";

/**
 * The star picker is five native radio inputs, visually reversed with
 * flex-row-reverse so DOM order (5,4,3,2,1) lets a pure-CSS sibling
 * selector light up every star before the checked one — no JavaScript
 * needed to see or set a rating. Clicking a star's <label>, or using arrow
 * keys on the focused group, both work natively.
 *
 * Each [input, label] pair uses a Fragment, not a wrapping <div> — even
 * `display: contents` on a div leaves it as a real DOM node, which scopes
 * the `~` sibling combinator to just that pair and breaks the "fill every
 * star before this one" effect. A Fragment adds no DOM node at all, so all
 * ten elements are true siblings and the selector can see across pairs.
 */
function StarPicker() {
  return (
    <fieldset>
      <legend className={labelClass}>Оценка</legend>
      <div className="mt-2 flex w-fit flex-row-reverse gap-1">
        {[5, 4, 3, 2, 1].map((n) => (
          <Fragment key={n}>
            <input
              type="radio"
              id={`rating-${n}`}
              name="rating"
              value={n}
              required
              className="peer sr-only"
            />
            <label
              htmlFor={`rating-${n}`}
              className="cursor-pointer text-sand-300 transition-colors hover:text-ochre-400 peer-checked:text-ochre-500"
            >
              <Star size={28} className="fill-current" aria-hidden="true" />
              <span className="sr-only">{n} из 5</span>
            </label>
          </Fragment>
        ))}
      </div>
    </fieldset>
  );
}

/**
 * Reviews publish immediately on submit (see app/reviews/actions.ts), so
 * this form needs a real bot check, not just a honeypot — Turnstile is
 * loaded via next/script (doesn't block first paint) and verified
 * server-side before anything is written. This is the one form on the site
 * that genuinely requires JavaScript to complete, since Turnstile itself is
 * a JS challenge; reading reviews is unaffected either way.
 */
export default function ReviewForm() {
  const [state, formAction, pending] = useActionState(submitReview, initialState);

  if (state.success) {
    return (
      <div className="rounded-card border border-forest-200 bg-forest-100/50 p-7 text-center">
        <p className="font-display text-h3 font-semibold text-forest-900">
          Спасибо!
        </p>
        <p className="mt-2 text-[0.95rem] text-ink-700">
          Ваш отзыв опубликован на этой странице.
        </p>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="afterInteractive" async defer />

      {/* Honeypot — hidden from sighted users and screen readers, not from bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="review-company">Компания</label>
        <input type="text" id="review-company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="review-name" className={labelClass}>
            Имя
          </label>
          <input id="review-name" name="name" required className={`mt-1.5 ${inputClass}`} />
        </div>
        <div>
          <label htmlFor="review-location" className={labelClass}>
            Город или страна (необязательно)
          </label>
          <input id="review-location" name="location" className={`mt-1.5 ${inputClass}`} />
        </div>
      </div>

      <StarPicker />

      <div>
        <label htmlFor="review-quote" className={labelClass}>
          Ваш отзыв
        </label>
        <textarea
          id="review-quote"
          name="quote"
          required
          rows={4}
          className={`mt-1.5 ${inputClass} resize-none`}
        />
      </div>

      <div className="cf-turnstile" data-sitekey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY} />

      {state.error && (
        <p role="alert" className="text-sm font-medium text-[#9a3412]">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Отправка…" : "Отправить отзыв"}
      </Button>
    </form>
  );
}
