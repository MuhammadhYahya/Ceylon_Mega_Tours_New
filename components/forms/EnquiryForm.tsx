"use client";

import { useActionState } from "react";
import { Button } from "@/components/ui/Button";
import { submitEnquiry, type EnquiryState } from "@/app/contact/actions";

const initialState: EnquiryState = {};

const inputClass =
  "w-full rounded-xl border border-sand-300 bg-sand-50 px-4 py-3 text-[0.95rem] text-ink-900 placeholder:text-ink-400 transition-colors focus:border-forest-500 focus:outline-none";
const labelClass = "text-sm font-medium text-ink-700";

/**
 * A native <form action={...}> — this posts and redirects even if the
 * client's JS never loads. useActionState only adds the inline error
 * message on top of that baseline; it is not required for the form to work.
 */
export default function EnquiryForm() {
  const [state, formAction, pending] = useActionState(submitEnquiry, initialState);

  return (
    <form action={formAction} className="space-y-5">
      {/* Honeypot — hidden from sighted users and screen readers, not from bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
        <label htmlFor="company">Компания</label>
        <input type="text" id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClass}>
            Имя
          </label>
          <input id="name" name="name" required className={`mt-1.5 ${inputClass}`} />
        </div>
        <div>
          <label htmlFor="contact" className={labelClass}>
            WhatsApp или телефон
          </label>
          <input id="contact" name="contact" required className={`mt-1.5 ${inputClass}`} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="email" className={labelClass}>
            Email (необязательно)
          </label>
          <input type="email" id="email" name="email" className={`mt-1.5 ${inputClass}`} />
        </div>
        <div>
          <label htmlFor="arrival" className={labelClass}>
            Дата прибытия
          </label>
          <input type="date" id="arrival" name="arrival" className={`mt-1.5 ${inputClass}`} />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="guests" className={labelClass}>
            Количество гостей
          </label>
          <input type="number" min={1} id="guests" name="guests" className={`mt-1.5 ${inputClass}`} />
        </div>
        <div>
          <label htmlFor="service" className={labelClass}>
            Тип услуги
          </label>
          <select id="service" name="service" defaultValue="" className={`mt-1.5 ${inputClass}`}>
            <option value="">Не важно</option>
            <option value="tour">Частный тур</option>
            <option value="transfer">Трансфер из аэропорта</option>
            <option value="package">Турпакет</option>
            <option value="transport">Только транспорт</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className={labelClass}>
          Расскажите о поездке
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className={`mt-1.5 ${inputClass} resize-none`}
        />
      </div>

      {state.error && (
        <p role="alert" className="text-sm font-medium text-[#9a3412]">
          {state.error}
        </p>
      )}

      <Button type="submit" disabled={pending} className="w-full sm:w-auto">
        {pending ? "Отправка…" : "Отправить запрос"}
      </Button>
      <p className="text-xs text-ink-500">
        Запрос откроется в WhatsApp с уже заполненным сообщением — останется
        только отправить его.
      </p>
    </form>
  );
}
