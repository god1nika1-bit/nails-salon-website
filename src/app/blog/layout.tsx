import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Журнал о Красоте — ЛАЙК НЭЙЛС",
  description: "Статьи о трендах маникюра, уходе за волосами, косметологии и секретах красоты от экспертов салона ЛАЙК НЭЙЛС.",
};

export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return children;
}
