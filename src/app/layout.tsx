import type { Metadata } from "next";
import { Cormorant_Garamond, Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

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
  title: "ЛАЙК НЭЙЛС — Салон красоты на Политехнической",
  description: "Салон красоты ЛАЙК НЭЙЛС на Политехнической, 6. Запись без ожидания.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className="scroll-smooth">
      <body className={`${cormorant.variable} ${montserrat.variable} font-sans antialiased text-[#222222]`}>
        <Header />
        <div className="pt-20">
            {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
