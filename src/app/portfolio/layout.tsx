import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Портфолио Работ — ЛАЙК НЭЙЛС",
  description: "Примеры работ мастеров салона красоты ЛАЙК НЭЙЛС: маникюр, педикюр, окрашивание волос, оформление бровей и косметология.",
};

export default function PortfolioLayout({ children }: { children: React.ReactNode }) {
  return children;
}
