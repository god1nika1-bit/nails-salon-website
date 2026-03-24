"use client";

import { useState } from "react";
import { ChevronDown, Clock, Check } from "lucide-react";
import { SERVICES_DATA } from "@/data/services";

interface ServiceSelectorProps {
  selectedService: { categoryId: string; name: string; price: string } | null;
  onSelect: (service: { categoryId: string; name: string; price: string }) => void;
}

export function ServiceSelector({ selectedService, onSelect }: ServiceSelectorProps) {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(SERVICES_DATA[0].id);
  const [openSubs, setOpenSubs] = useState<Set<string>>(new Set());

  const currentCategory = SERVICES_DATA.find((c) => c.id === activeCategoryId) || SERVICES_DATA[0];

  const toggleSub = (title: string) => {
    setOpenSubs((prev) => {
      const next = new Set(prev);
      if (next.has(title)) next.delete(title);
      else next.add(title);
      return next;
    });
  };

  // Only auto-open if category has single subcategory
  const isSubOpen = (title: string) => {
    if (openSubs.has(title)) return true;
    if (openSubs.size === 0 && currentCategory.subcategories.length === 1) return true;
    return false;
  };

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-[var(--brand-text)] mb-2">Выберите услугу</h2>
      <p className="font-sans text-sm text-[var(--brand-text)]/40 mb-8">Выберите категорию и нужную услугу</p>

      {/* Category pills — wrapping grid instead of horizontal scroll */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SERVICES_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setActiveCategoryId(cat.id);
              setOpenSubs(new Set());
            }}
            className={`px-4 py-2 rounded-full font-sans text-xs whitespace-nowrap transition-colors ${
              activeCategoryId === cat.id
                ? "bg-[var(--brand-pink)] border-[var(--brand-pink)] text-[var(--brand-text)]"
                : "border border-gray-200 text-gray-500 hover:border-[var(--brand-pink)]"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Accordion — all collapsed by default */}
      <div className="space-y-3">
        {currentCategory.subcategories.map((sub) => {
          const open = isSubOpen(sub.title);
          return (
            <div key={sub.title} className="border border-gray-100 rounded-2xl overflow-hidden">
              <button
                onClick={() => toggleSub(sub.title)}
                className="w-full flex items-center justify-between px-5 py-3.5 bg-[var(--brand-surface)] hover:bg-[var(--brand-pink)]/10 transition-colors font-sans text-sm font-medium text-left"
              >
                <span>{sub.title}</span>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-[var(--brand-text)]/30">{sub.items.length}</span>
                  <ChevronDown
                    size={16}
                    className={`text-[var(--brand-text)]/40 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </div>
              </button>
              {open && (
                <div className="divide-y divide-gray-50">
                  {sub.items.map((item, i) => {
                    const isSelected = selectedService?.name === item.name && selectedService?.categoryId === currentCategory.id;
                    return (
                      <button
                        key={i}
                        onClick={() => onSelect({ categoryId: currentCategory.id, name: item.name, price: item.price })}
                        className={`w-full flex items-center justify-between px-5 py-3 transition-colors text-left ${
                          isSelected ? "bg-[var(--brand-pink)]/20" : "hover:bg-[var(--brand-pink)]/5"
                        }`}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2">
                            {isSelected && <Check size={14} className="text-[var(--brand-pink-dark)] shrink-0" />}
                            <p className="font-serif text-sm md:text-base">{item.name}</p>
                          </div>
                          {item.note && (
                            <p className="flex items-center gap-1 font-sans text-xs text-[var(--brand-text)]/40 mt-0.5 ml-0">
                              <Clock size={11} /> {item.note}
                            </p>
                          )}
                        </div>
                        <span className="font-sans text-sm font-medium whitespace-nowrap">{item.price}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
