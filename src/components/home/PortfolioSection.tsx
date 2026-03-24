"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import Link from "next/link";
import { PORTFOLIO_DATA, getPortfolioByCategory } from "@/data/portfolio";

const PREVIEW_CATEGORIES = ["Все", "Маникюр", "Волосы", "Брови"];

export function PortfolioSection() {
  const [activeTab, setActiveTab] = useState("Все");
  const items = getPortfolioByCategory(activeTab).slice(0, 6);

  return (
    <section id="portfolio" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[var(--brand-text)] mb-4">
              Портфолио
            </h2>
            <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed">
              {PORTFOLIO_DATA.length} примеров работ наших мастеров.
            </p>
          </div>
        </div>

        <div className="flex gap-4 mb-10 overflow-x-auto pb-6 scrollbar-indicator">
          {PREVIEW_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2 ${
                activeTab === cat
                  ? "bg-[var(--brand-text)] text-white"
                  : "border border-gray-200 text-gray-500 hover:border-[var(--brand-pink)] hover:text-[var(--brand-text)]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {items.map((item, idx) => (
            <div
              key={item.id}
              className={`group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer ${idx < 2 ? "flex" : "hidden md:flex"} flex-col items-center justify-center`}
            >
              <ImageIcon className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 opacity-50 text-gray-300 group-hover:scale-110 transition-transform duration-500" />
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest opacity-50 text-gray-300">{item.title}</span>

              {/* Category badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm font-sans text-[10px] uppercase tracking-widest text-[var(--brand-text)]/70">
                  {item.category}
                </span>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-[var(--brand-text)]/0 group-hover:bg-[var(--brand-text)]/70 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 p-5 md:p-6">
                <h4 className="font-serif text-lg md:text-2xl text-white text-center leading-tight mb-3">{item.title}</h4>
                <span className="mt-2 px-4 py-1.5 rounded-full bg-[var(--brand-pink)]/30 font-sans text-xs uppercase tracking-widest text-[var(--brand-pink)]">{item.masterName}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/portfolio" className="w-full gap-2 text-center py-4 border border-[var(--brand-text)] text-[var(--brand-text)] rounded-full font-sans text-xs uppercase tracking-widest">
            Смотреть весь каталог
          </Link>
        </div>
      </div>
    </section>
  );
}
