import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Наши Мастера — ЛАЙК НЭЙЛС",
  description: "Команда профессионалов салона красоты ЛАЙК НЭЙЛС: мастера маникюра, стилисты, косметологи, бровисты и массажисты.",
};

export default function MastersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
