"use client";

import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";
import { SERVICES_DATA, getTotalServicesCount } from "@/data/services";
import { FadeInWhenVisible } from "@/components/ui/motion";
import { motion, AnimatePresence } from "framer-motion";

const PREVIEW_CATEGORIES = [
  { id: "manicure", name: "Маникюр" },
  { id: "pedicure", name: "Педикюр" },
  { id: "hair", name: "Парикмахерские" },
  { id: "brows", name: "Брови и ресницы" },
  { id: "cosmetology", name: "Косметология" },
  { id: "massage", name: "Массаж" },
];

function getTopServices(categoryId: string, count: number = 4) {
  const cat = SERVICES_DATA.find((c) => c.id === categoryId);
  if (!cat) return [];
  const items: { name: string; price: string; duration?: string }[] = [];
  for (const sub of cat.subcategories) {
    for (const item of sub.items) {
      items.push({ name: item.name, price: item.price, duration: item.note });
      if (items.length >= count) return items;
    }
  }
  return items;
}

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState(PREVIEW_CATEGORIES[0].id);
  const services = getTopServices(activeCategory, 4);
  const totalCount = getTotalServicesCount();

  return (
    <section id="services" className="py-24 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto">
        <FadeInWhenVisible>
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
            <div className="max-w-xl">
              <h2 className="text-4xl md:text-5xl font-serif font-light text-[var(--brand-text)] mb-4">
                Услуги и Прайс
              </h2>
              <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed">
                {totalCount} услуг. Премиальные материалы и современные техники для идеального результата.
              </p>
            </div>
            <Link
              href="/services"
              className="hidden md:flex items-center gap-3 px-6 py-3 border border-[var(--brand-pink)] text-[var(--brand-text)] rounded-full hover:bg-[var(--brand-pink)] transition-colors font-sans text-xs uppercase tracking-[0.1em] focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2"
            >
              Смотреть весь прайс <ArrowRight size={16} />
            </Link>
          </div>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {/* Category Sidebar */}
          <div className="md:col-span-4 lg:col-span-3 flex overflow-x-auto md:flex-col space-x-4 md:space-x-0 md:space-y-2 md:border-l border-gray-100 md:pl-6 pb-6 md:pb-0 scrollbar-indicator">
            {PREVIEW_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-left text-xs md:text-sm font-sans py-2 md:py-3 transition-colors relative whitespace-nowrap focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] rounded-sm ${
                    isActive
                      ? "text-[var(--brand-text)] font-semibold border-b-2 md:border-b-0 border-[var(--brand-pink-dark)]"
                      : "text-gray-400 hover:text-[var(--brand-text)]"
                  }`}
                >
                  <span
                    className={`hidden md:block absolute left-[-25px] top-1/2 -translate-y-1/2 w-1 h-6 bg-[var(--brand-pink-dark)] rounded-r-md transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Service Cards — AnimatePresence forces re-render on category change */}
          <div className="md:col-span-8 lg:col-span-9">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-1 lg:grid-cols-2 gap-4"
              >
                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.08, duration: 0.35 }}
                    className={index < 2 ? "" : "hidden md:block"}
                  >
                    <div className="group flex flex-col justify-between p-6 rounded-2xl border border-gray-100 hover:border-[var(--brand-pink)] hover:shadow-sm transition-colors bg-[var(--brand-surface)]/50 hover:bg-white cursor-pointer h-full">
                      <div>
                        <h4 className="font-serif text-xl mb-3 group-hover:text-[var(--brand-pink-dark)] transition-colors">
                          {service.name}
                        </h4>
                        {service.duration && (
                          <div className="flex items-center gap-2 font-sans text-xs text-[var(--brand-text)]/40 mb-6">
                            <Clock size={14} />
                            <span>{service.duration}</span>
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                        <span className="font-sans font-medium text-sm text-[var(--brand-text)]">
                          {service.price}
                        </span>
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[var(--brand-pink)] group-hover:text-[var(--brand-text)] transition-colors">
                          <ArrowRight size={14} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <Link
            href="/services"
            className="w-full mt-4 md:hidden flex justify-center py-4 border border-[var(--brand-text)] text-[var(--brand-text)] rounded-full font-sans text-xs uppercase tracking-widest focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)]"
          >
            Смотреть весь прайс
          </Link>
        </div>
      </div>
    </section>
  );
}
