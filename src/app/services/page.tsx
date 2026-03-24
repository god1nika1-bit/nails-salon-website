"use client";

import { useState, useMemo } from "react";
import {
  Search,
  ChevronDown,
  Clock,
  Sparkles,
  Scissors,
  Droplets,
  Ribbon,
  Wind,
  Hand,
  Footprints,
  Zap,
  Eye,
  Activity,
  HeartHandshake,
  Flower2,
  Palette,
  Sun,
} from "lucide-react";
import { SERVICES_DATA, getAllServices, getTotalServicesCount } from "@/data/services";
import { FadeInWhenVisible, TabTransition } from "@/components/ui/motion";
import { motion, AnimatePresence } from "framer-motion";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Sparkles,
  Scissors,
  Droplets,
  Ribbon,
  Wind,
  Hand,
  Footprints,
  Zap,
  Eye,
  Activity,
  HeartHandshake,
  Flower2,
  Palette,
  Sun,
};

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState<string>(SERVICES_DATA[0].id);
  const [searchQuery, setSearchQuery] = useState("");
  const [openSubs, setOpenSubs] = useState<Set<string>>(new Set());

  const totalCount = getTotalServicesCount();

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return null;
    const q = searchQuery.toLowerCase();
    return getAllServices().filter(
      (s) => s.name.toLowerCase().includes(q) || s.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  const currentCategory = SERVICES_DATA.find((c) => c.id === activeCategory) || SERVICES_DATA[0];

  const toggleSub = (title: string) => {
    setOpenSubs((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  // Open by default only if category has a single subcategory
  const isSubOpen = (title: string) => {
    if (openSubs.has(title)) return true;
    if (openSubs.size === 0 && currentCategory.subcategories.length === 1) return true;
    return false;
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-12 pb-8 px-6 md:px-20 bg-[var(--brand-surface)]">
        <div className="max-w-5xl mx-auto">
          <FadeInWhenVisible>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-[var(--brand-text)] mb-4">
              Услуги и Прайс
            </h1>
            <p className="font-sans text-sm text-[var(--brand-text)]/60 leading-relaxed max-w-xl mb-8">
              {totalCount} услуг в 14 категориях. Премиальные материалы и современные техники.
            </p>
          </FadeInWhenVisible>

          {/* Search */}
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--brand-text)]/30"
            />
            <input
              type="text"
              placeholder="Найти услугу..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Поиск услуги"
              className="w-full pl-11 pr-4 py-3 rounded-full border border-[var(--brand-pink)]/40 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink-dark)] focus:ring-offset-2 placeholder:text-[var(--brand-text)]/30"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Очистить поиск"
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--brand-text)]/40 hover:text-[var(--brand-text)] text-xs font-sans"
              >
                Очистить
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Search Results */}
      {searchResults !== null ? (
        <section className="px-6 md:px-20 py-12">
          <div className="max-w-5xl mx-auto">
            <p className="font-sans text-xs uppercase tracking-widest text-[var(--brand-text)]/40 mb-6">
              {searchResults.length > 0
                ? `Найдено ${searchResults.length} услуг`
                : "Ничего не найдено"}
            </p>
            {searchResults.length > 0 && (
              <div className="space-y-2">
                {searchResults.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.03, duration: 0.3 }}
                    className="flex items-center justify-between py-4 px-5 rounded-xl border border-gray-100 hover:border-[var(--brand-pink)] transition-colors bg-white"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-serif text-base truncate">{item.name}</p>
                      <p className="font-sans text-xs text-[var(--brand-text)]/40 mt-0.5">
                        {item.category} &middot; {item.subcategory}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 ml-4 shrink-0">
                      {item.note && (
                        <span className="hidden md:flex items-center gap-1 font-sans text-xs text-[var(--brand-text)]/40">
                          <Clock size={12} />
                          {item.note}
                        </span>
                      )}
                      <span className="font-sans text-sm font-medium whitespace-nowrap">
                        {item.price}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>
      ) : (
        /* Category View */
        <section className="px-6 md:px-20 py-12">
          <div className="max-w-5xl mx-auto">
            {/* Category Tabs */}
            <div className="flex overflow-x-auto gap-2 pb-6 scrollbar-indicator -mx-6 px-6 md:mx-0 md:px-0 md:flex-wrap">
              {SERVICES_DATA.map((cat) => {
                const Icon = ICON_MAP[cat.icon];
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setActiveCategory(cat.id);
                      setOpenSubs(new Set());
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-full border whitespace-nowrap font-sans text-xs transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2 ${
                      isActive
                        ? "bg-[var(--brand-pink)] border-[var(--brand-pink)] text-[var(--brand-text)]"
                        : "border-gray-200 text-[var(--brand-text)]/50 hover:border-[var(--brand-pink)] hover:text-[var(--brand-text)]"
                    }`}
                  >
                    {Icon && <Icon size={14} />}
                    {cat.name}
                  </button>
                );
              })}
            </div>

            {/* Subcategories Accordion */}
            <TabTransition tabKey={activeCategory}>
              <div className="space-y-4 mt-2">
                {currentCategory.subcategories.map((sub) => {
                  const open = isSubOpen(sub.title);
                  return (
                    <div key={sub.title} className="border border-gray-100 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => toggleSub(sub.title)}
                        className="w-full flex items-center justify-between px-6 py-4 bg-[var(--brand-surface)] hover:bg-[var(--brand-pink)]/10 transition-colors font-sans text-sm font-medium text-left focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)]"
                      >
                        <span>{sub.title}</span>
                        <div className="flex items-center gap-2">
                          <span className="text-xs text-[var(--brand-text)]/30">{sub.items.length}</span>
                          <ChevronDown
                            size={16}
                            className={`text-[var(--brand-text)]/40 transition-transform duration-200 ${
                              open ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>

                      <AnimatePresence initial={false}>
                        {open && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <div className="divide-y divide-gray-50">
                              {sub.items.map((item, i) => (
                                <div
                                  key={i}
                                  className="flex items-center justify-between px-6 py-3.5 hover:bg-[var(--brand-pink)]/5 transition-colors"
                                >
                                  <div className="flex-1 min-w-0 pr-4">
                                    <p className="font-serif text-base">{item.name}</p>
                                    {item.note && (
                                      <p className="flex items-center gap-1 font-sans text-xs text-[var(--brand-text)]/40 mt-0.5">
                                        <Clock size={11} />
                                        {item.note}
                                      </p>
                                    )}
                                  </div>
                                  <span className="font-sans text-sm font-medium whitespace-nowrap text-[var(--brand-text)]">
                                    {item.price}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </TabTransition>
          </div>
        </section>
      )}
    </main>
  );
}
