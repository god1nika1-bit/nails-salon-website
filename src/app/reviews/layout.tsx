import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Отзывы Гостей — ЛАЙК НЭЙЛС",
  description: "Отзывы клиентов салона красоты ЛАЙК НЭЙЛС на Политехнической. Реальные мнения с Яндекс, 2ГИС и сайта.",
};

export default function ReviewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
