"use client";

import { useState, useMemo } from "react";
import { User, ArrowRight } from "lucide-react";
import Link from "next/link";
import { MASTERS_DATA } from "@/data/masters";
import { FadeInWhenVisible, StaggerContainer, StaggerItem } from "@/components/ui/motion";

const ALL_SPECIALTIES = Array.from(
  new Set(MASTERS_DATA.flatMap((m) => m.specialties))
).sort();

export default function MastersPage() {
  const [activeFilter, setActiveFilter] = useState<string>("Все");

  const filtered = useMemo(() => {
    if (activeFilter === "Все") return MASTERS_DATA;
    return MASTERS_DATA.filter((m) => m.specialties.includes(activeFilter));
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-12 pb-8 px-6 md:px-20 bg-[var(--brand-surface)]">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-[var(--brand-text)] mb-4">
              Наши Мастера
            </h1>
            <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed max-w-xl mb-8">
              Команда из {MASTERS_DATA.length} профессионалов с многолетним опытом и постоянным повышением квалификации.
            </p>
          </FadeInWhenVisible>

          {/* Specialty filters */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-indicator -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
            {["Все", ...ALL_SPECIALTIES].map((spec) => (
              <button
                key={spec}
                onClick={() => setActiveFilter(spec)}
                className={`px-5 py-2 rounded-full font-sans text-xs whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2 ${
                  activeFilter === spec
                    ? "bg-[var(--brand-text)] text-white"
                    : "border border-gray-200 text-gray-500 hover:border-[var(--brand-pink)] hover:text-[var(--brand-text)]"
                }`}
              >
                {spec}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Masters Grid */}
      <section className="px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((master) => (
              <StaggerItem key={master.id}>
                <div className="group flex flex-col bg-[var(--brand-surface)]/50 rounded-3xl border border-gray-100 overflow-hidden hover:border-[var(--brand-pink)] transition-colors">
                  {/* Photo placeholder */}
                  <div className="w-full aspect-[4/5] bg-gray-100 flex items-center justify-center relative" role="img" aria-label={`Фото мастера ${master.name}`}>
                    <User size={64} className="text-gray-300 group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
                  </div>

                  {/* Info */}
                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="font-serif text-2xl text-[var(--brand-text)] mb-1">
                      {master.name}
                    </h3>
                    <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.1em] text-[var(--brand-pink-dark)] mb-3">
                      {master.role}
                    </p>
                    <p className="font-sans text-xs text-[var(--brand-text)]/40 mb-4">
                      Опыт: {master.experience}
                    </p>

                    {/* Specialties */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {master.specialties.map((s) => (
                        <span
                          key={s}
                          className="px-3 py-1 rounded-full bg-[var(--brand-pink)]/30 font-sans text-[10px] text-[var(--brand-text)]/70"
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed line-clamp-3 mb-6">
                      {master.bio}
                    </p>

                    <Link
                      href={`/booking?master=${master.id}`}
                      className="mt-auto flex items-center justify-center gap-2 py-3 border border-gray-200 text-[var(--brand-text)] rounded-full hover:border-[var(--brand-pink)] hover:bg-[var(--brand-pink)] transition-colors font-sans text-xs uppercase tracking-widest"
                    >
                      Записаться <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          {filtered.length === 0 && (
            <p className="text-center font-sans text-sm text-[var(--brand-text)]/40 py-16">
              Мастера с такой специализацией не найдены
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
