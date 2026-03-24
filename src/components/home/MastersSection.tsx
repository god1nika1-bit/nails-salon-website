"use client";

import { useState, useCallback } from "react";
import { ArrowRight, ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MASTERS_DATA } from "@/data/masters";
import { FadeInWhenVisible } from "@/components/ui/motion";

const VISIBLE_CARDS = MASTERS_DATA.slice(0, 6);

export function MastersSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = useCallback((dir: number) => {
    setDirection(dir);
    setCurrentIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return VISIBLE_CARDS.length - 1;
      if (next >= VISIBLE_CARDS.length) return 0;
      return next;
    });
  }, []);

  const getCardIndex = (offset: number) => {
    let idx = currentIndex + offset;
    if (idx < 0) idx += VISIBLE_CARDS.length;
    if (idx >= VISIBLE_CARDS.length) idx -= VISIBLE_CARDS.length;
    return idx;
  };

  const master = VISIBLE_CARDS[currentIndex];
  const prevMaster = VISIBLE_CARDS[getCardIndex(-1)];
  const nextMaster = VISIBLE_CARDS[getCardIndex(1)];

  const flipVariants = {
    enter: (dir: number) => ({
      rotateY: dir > 0 ? 90 : -90,
      opacity: 0,
      scale: 0.85,
    }),
    center: {
      rotateY: 0,
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" as const },
    },
    exit: (dir: number) => ({
      rotateY: dir > 0 ? -90 : 90,
      opacity: 0,
      scale: 0.85,
      transition: { duration: 0.4, ease: "easeIn" as const },
    }),
  };

  return (
    <section id="masters" className="py-24 px-6 bg-[var(--brand-surface)] border-t border-gray-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <FadeInWhenVisible>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-[var(--brand-text)] mb-4">
                Наша команда
              </h2>
              <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed">
                {MASTERS_DATA.length} профессионалов с многолетним опытом и регулярным повышением квалификации.
              </p>
            </div>
            <Link href="/masters" className="hidden md:flex items-center gap-3 px-6 py-3 border border-[var(--brand-pink)] text-[var(--brand-text)] rounded-full hover:bg-[var(--brand-pink)] transition-colors font-sans text-xs uppercase tracking-[0.1em]">
              Смотреть весь состав <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInWhenVisible>

        {/* Carousel */}
        <div className="flex items-center justify-center gap-4 md:gap-8">
          {/* Left arrow */}
          <button
            onClick={() => paginate(-1)}
            className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-[var(--brand-pink)] hover:bg-[var(--brand-pink)]/10 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2"
            aria-label="Предыдущий мастер"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Cards container */}
          <div className="flex items-center gap-4 md:gap-8 w-full max-w-4xl justify-center" style={{ perspective: "1200px" }}>
            {/* Side card left — desktop only */}
            <div className="hidden lg:block w-48 shrink-0 opacity-40 scale-90 blur-[1px]">
              <SideCard master={prevMaster} />
            </div>

            {/* Center card with flip animation */}
            <div className="w-full max-w-xs md:max-w-sm relative" style={{ perspective: "1200px" }}>
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={master.id}
                  custom={direction}
                  variants={flipVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <CenterCard master={master} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Side card right — desktop only */}
            <div className="hidden lg:block w-48 shrink-0 opacity-40 scale-90 blur-[1px]">
              <SideCard master={nextMaster} />
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => paginate(1)}
            className="shrink-0 w-11 h-11 md:w-12 md:h-12 rounded-full border border-gray-200 flex items-center justify-center hover:border-[var(--brand-pink)] hover:bg-[var(--brand-pink)]/10 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2"
            aria-label="Следующий мастер"
          >
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Dots indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {VISIBLE_CARDS.map((m, idx) => (
            <button
              key={m.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2 ${
                idx === currentIndex
                  ? "w-6 bg-[var(--brand-pink-dark)]"
                  : "w-2 bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Мастер ${m.name}`}
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/masters" className="w-full text-center py-4 border border-[var(--brand-text)] text-[var(--brand-text)] rounded-full font-sans text-xs uppercase tracking-widest">
            Показать всех мастеров
          </Link>
        </div>
      </div>
    </section>
  );
}

function CenterCard({ master }: { master: typeof MASTERS_DATA[number] }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-3xl overflow-hidden border border-gray-100" style={{ boxShadow: "0 20px 60px -10px rgba(0,0,0,0.08)" }}>
      <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center relative">
        <User size={72} className="text-gray-300" />
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="p-6 text-center -mt-4 relative">
        <h4 className="font-serif text-2xl md:text-3xl text-[var(--brand-text)] mb-1">{master.name}</h4>
        <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.15em] text-[var(--brand-pink-dark)] mb-3">
          {master.role}
        </p>
        <p className="font-sans text-xs text-[var(--brand-text)]/40 mb-2">Опыт: {master.experience}</p>
        <div className="flex flex-wrap justify-center gap-1.5 mb-4">
          {master.specialties.slice(0, 3).map((s) => (
            <span key={s} className="px-3 py-1 rounded-full bg-[var(--brand-pink)]/20 font-sans text-[10px] text-[var(--brand-text)]/60">
              {s}
            </span>
          ))}
        </div>
        <Link
          href={`/booking?master=${master.id}`}
          className="inline-flex items-center gap-2 px-8 py-3 bg-[var(--brand-text)] text-white rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[var(--brand-pink)] hover:text-[var(--brand-text)] transition-colors"
        >
          Записаться <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}

function SideCard({ master }: { master: typeof MASTERS_DATA[number] }) {
  return (
    <div className="flex flex-col items-center bg-white rounded-2xl overflow-hidden border border-gray-100">
      <div className="w-full aspect-[3/4] bg-gray-100 flex items-center justify-center">
        <User size={40} className="text-gray-300" />
      </div>
      <div className="p-4 text-center">
        <h4 className="font-serif text-lg text-[var(--brand-text)] mb-0.5">{master.name}</h4>
        <p className="font-sans text-[9px] uppercase tracking-[0.1em] text-[var(--brand-pink-dark)]">
          {master.role}
        </p>
      </div>
    </div>
  );
}
