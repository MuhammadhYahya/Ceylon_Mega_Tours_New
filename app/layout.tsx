import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import WhatsAppFab from "@/components/layout/WhatsAppFab";
import { site } from "@/lib/site";

// Both faces are variable and both ship a cyrillic subset — verified against
// Next's own font manifest. The previous site specified Poppins, which has no
// cyrillic at all, so every Russian character fell back to a system font.
const display = Cormorant_Garamond({
  subsets: ["cyrillic", "latin"],
  variable: "--font-display-face",
  display: "swap",
});

const body = Manrope({
  subsets: ["cyrillic", "latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Частные туры по Шри-Ланке для русскоязычных гостей",
    template: `%s | ${site.name}`,
  },
  description:
    "Частные маршруты, встречи в аэропорту и комфортный транспорт по Шри-Ланке. Спокойные путешествия, где каждая деталь продумана для вашего комфорта.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: "Частные туры по Шри-Ланке для русскоязычных гостей",
    description:
      "Частные маршруты, трансферы из аэропорта и комфортный транспорт по всему острову.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang={site.lang} className={`${display.variable} ${body.variable}`}>
      <body className="font-sans">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-forest-900 focus:px-5 focus:py-3 focus:text-sand-50"
        >
          Перейти к содержимому
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
