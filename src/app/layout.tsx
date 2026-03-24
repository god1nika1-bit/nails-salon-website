import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { MobileTabBar } from "@/components/layout/MobileTabBar";
import { JsonLd } from "@/components/seo/JsonLd";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["cyrillic", "latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["cyrillic", "latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://archontis.github.io/nails-salon-website"),
  title: {
    default: "ЛАЙК НЭЙЛС — Салон красоты на Политехнической",
    template: "%s | ЛАЙК НЭЙЛС",
  },
  description: "Салон красоты ЛАЙК НЭЙЛС на Политехнической, 6 в Санкт-Петербурге. Маникюр, педикюр, парикмахерские услуги, косметология. Онлайн-запись.",
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ЛАЙК НЭЙЛС",
    title: "ЛАЙК НЭЙЛС — Салон красоты на Политехнической",
    description: "Маникюр, педикюр, уход за волосами и косметология. Запись онлайн без ожидания.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <head>
        <JsonLd />
      </head>
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased text-[var(--brand-text)]`}>
        <Header />
        <div className="pt-20 pb-20 lg:pb-0">
          {children}
        </div>
        <Footer />
        <MobileTabBar />
      </body>
    </html>
  );
}
