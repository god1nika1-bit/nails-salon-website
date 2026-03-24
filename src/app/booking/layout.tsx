import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Онлайн-Запись — ЛАЙК НЭЙЛС",
  description: "Запишитесь онлайн в салон красоты ЛАЙК НЭЙЛС на Политехнической, 6. Выберите услугу, мастера и удобное время.",
};

export default function BookingLayout({ children }: { children: React.ReactNode }) {
  return children;
}
