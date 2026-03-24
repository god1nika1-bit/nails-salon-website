import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Услуги и Прайс — ЛАЙК НЭЙЛС",
  description: "Полный прайс-лист салона красоты ЛАЙК НЭЙЛС: маникюр, педикюр, парикмахерские услуги, косметология, массаж и многое другое.",
};

export default function ServicesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
