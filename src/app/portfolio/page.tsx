"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import { PORTFOLIO_DATA, PORTFOLIO_CATEGORIES, getPortfolioByCategory } from "@/data/portfolio";
import { FadeInWhenVisible, StaggerContainer, StaggerItem, TabTransition } from "@/components/ui/motion";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Все");
  const items = getPortfolioByCategory(activeCategory);

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-12 pb-8 px-6 md:px-20 bg-[var(--brand-surface)]">
        <div className="max-w-7xl mx-auto">
          <FadeInWhenVisible>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-[var(--brand-text)] mb-4">
              Портфолио Работ
            </h1>
            <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed max-w-xl mb-8">
              {PORTFOLIO_DATA.length} примеров работ наших мастеров в различных направлениях.
            </p>
          </FadeInWhenVisible>

          {/* Category filters */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-indicator -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
            {PORTFOLIO_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2 ${
                  activeCategory === cat
                    ? "bg-[var(--brand-text)] text-white"
                    : "border border-gray-200 text-gray-500 hover:border-[var(--brand-pink)] hover:text-[var(--brand-text)]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="px-6 md:px-20 py-16">
        <div className="max-w-7xl mx-auto">
          <TabTransition tabKey={activeCategory}>
            <StaggerContainer className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {items.map((item) => (
                <StaggerItem key={item.id}>
                  <div className="group relative aspect-square bg-gray-100 rounded-2xl overflow-hidden cursor-pointer">
                    {/* Placeholder */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-300">
                      <ImageIcon className="w-8 h-8 md:w-12 md:h-12 opacity-50" />
                    </div>

                    {/* Category badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full bg-white/90 backdrop-blur-sm font-sans text-[10px] uppercase tracking-widest text-[var(--brand-text)]/70">
                        {item.category}
                      </span>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[var(--brand-text)]/0 group-hover:bg-[var(--brand-text)]/70 transition-colors duration-300 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 p-5 md:p-6">
                      <h4 className="font-serif text-lg md:text-2xl text-white text-center leading-tight mb-3">
                        {item.title}
                      </h4>
                      <p className="font-sans text-xs md:text-sm text-white/80 text-center line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                      <span className="mt-4 px-4 py-1.5 rounded-full bg-[var(--brand-pink)]/30 font-sans text-xs uppercase tracking-widest text-[var(--brand-pink)]">
                        {item.masterName}
                      </span>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </TabTransition>

          {items.length === 0 && (
            <p className="text-center font-sans text-sm text-[var(--brand-text)]/40 py-16">
              Работы в этой категории скоро появятся
            </p>
          )}
        </div>
      </section>
    </main>
  );
}
