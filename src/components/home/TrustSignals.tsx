"use client";

import { Sparkles, ShieldCheck, Clock } from "lucide-react";
import { StaggerContainer, StaggerItem } from "@/components/ui/motion";

const signals = [
  {
    icon: Sparkles,
    title: "Опытные мастера",
    text: "Команда профессионалов своего дела с многолетним стажем и регулярными повышениями квалификации.",
  },
  {
    icon: ShieldCheck,
    title: "Стерильность",
    text: "100% безопасность, многоступенчатая стерилизация инструментов по нормам СанПиН.",
  },
  {
    icon: Clock,
    title: "Экономия времени",
    text: "Быстрая онлайн-запись в пару кликов и популярные услуги \"в 6 рук\" для вашего удобства.",
  },
];

export function TrustSignals() {
  return (
    <section className="py-24 px-6 max-w-7xl mx-auto border-b border-gray-100">
      <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-16">
        {signals.map((s) => (
          <StaggerItem key={s.title}>
            <div className="flex flex-col items-center text-center space-y-6 group">
              <div className="w-20 h-20 rounded-full bg-[var(--brand-pink)]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[var(--brand-pink)]/40 transition-all duration-500">
                <s.icon className="text-[var(--brand-pink-dark)]" size={32} />
              </div>
              <h3 className="font-serif text-3xl">{s.title}</h3>
              <p className="text-sm font-sans opacity-60 leading-relaxed max-w-xs">{s.text}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerContainer>
    </section>
  );
}
