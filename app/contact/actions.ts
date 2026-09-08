"use server";

import { redirect } from "next/navigation";
import { whatsappLink } from "@/lib/site";

export type EnquiryState = {
  error?: string;
};

const SERVICE_LABELS: Record<string, string> = {
  tour: "Частный тур",
  transfer: "Трансфер из аэропорта",
  package: "Турпакет",
  transport: "Только транспорт",
};

/**
 * No email service is configured for this site (no SMTP/API credentials), so
 * this does not pretend to "send" anything — a fake success screen would
 * silently drop every enquiry. Instead it validates, then compiles the form
 * into a WhatsApp message and redirects there — the channel the business
 * already runs on, and one that actually reaches someone.
 *
 * The redirect happens server-side, so the flow works as a plain HTML POST
 * even if the client's JavaScript never loads.
 */
export async function submitEnquiry(
  _prevState: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  // Honeypot: real visitors never fill this field (it's visually hidden, not
  // display:none, and marked autoComplete="off" so browser autofill won't
  // populate it either). A bot that does gets sent home instead of an error —
  // telling it otherwise only teaches it to adapt.
  if (formData.get("company")) {
    redirect("/");
  }

  const name = String(formData.get("name") ?? "").trim();
  const contact = String(formData.get("contact") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const arrival = String(formData.get("arrival") ?? "").trim();
  const guests = String(formData.get("guests") ?? "").trim();
  const service = String(formData.get("service") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name) return { error: "Укажите, пожалуйста, ваше имя." };
  if (!contact) return { error: "Укажите WhatsApp или телефон для связи." };

  const lines = [
    `Здравствуйте! Меня зовут ${name}, хочу отправить запрос.`,
    `Контакт: ${contact}`,
    email && `Email: ${email}`,
    arrival && `Дата прибытия: ${arrival}`,
    guests && `Количество гостей: ${guests}`,
    service && `Тип услуги: ${SERVICE_LABELS[service] ?? service}`,
    message && `Комментарий: ${message}`,
  ].filter(Boolean);

  redirect(whatsappLink(lines.join("\n")));
}
