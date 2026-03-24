"use client";

import { useState } from "react";
import { ChevronDown, Clock, Check, Plus, X } from "lucide-react";
import { SERVICES_DATA } from "@/data/services";
import type { CartService } from "@/hooks/useServiceCart";

interface ServiceSelectorProps {
  selectedServices: CartService[];
  onToggle: (service: CartService) => void;
  onRemove: (name: string) => void;
}

export function ServiceSelector({ selectedServices, onToggle, onRemove }: ServiceSelectorProps) {
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

  const isSubOpen = (title: string) => {
    if (openSubs.has(title)) return true;
    if (openSubs.size === 0 && currentCategory.subcategories.length === 1) return true;
    return false;
  };

  const isSelected = (name: string) => selectedServices.some((s) => s.name === name);

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-[var(--brand-text)] mb-2">Выберите услуги</h2>
      <p className="font-sans text-sm text-[var(--brand-text)]/40 mb-6">Можно выбрать несколько услуг для одного визита</p>

      {/* Selected services pills */}
      {selectedServices.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          {selectedServices.map((s) => (
            <div
              key={s.name}
              className="flex items-center gap-2 pl-4 pr-2 py-2 rounded-full bg-[var(--brand-pink)]/20 border border-[var(--brand-pink)]"
            >
              <span className="font-sans text-xs text-[var(--brand-text)] truncate max-w-[200px]">{s.name}</span>
              <span className="font-sans text-xs font-medium text-[var(--brand-pink-dark)]">{s.price}</span>
              <button
                onClick={() => onRemove(s.name)}
                className="w-5 h-5 rounded-full bg-[var(--brand-text)]/10 flex items-center justify-center hover:bg-[var(--brand-text)]/20 transition-colors"
                aria-label={`Убрать ${s.name}`}
              >
                <X size={10} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Category pills */}
      <div className="flex flex-wrap gap-2 mb-6">
        {SERVICES_DATA.map((cat) => (
          <button
            key={cat.id}
            onClick={() => { setActiveCategoryId(cat.id); setOpenSubs(new Set()); }}
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

      {/* Accordion */}
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
                    const selected = isSelected(item.name);
                    return (
                      <button
                        key={i}
                        onClick={() => onToggle({ categoryId: currentCategory.id, name: item.name, price: item.price })}
                        className={`w-full flex items-center justify-between px-5 py-3 transition-colors text-left ${
                          selected ? "bg-[var(--brand-pink)]/15" : "hover:bg-[var(--brand-pink)]/5"
                        }`}
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <div className="flex items-center gap-2">
                            <div className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 transition-colors ${
                              selected
                                ? "bg-[var(--brand-pink)] border-[var(--brand-pink-dark)] text-[var(--brand-text)]"
                                : "border-gray-300"
                            }`}>
                              {selected && <Check size={12} />}
                            </div>
                            <p className="font-serif text-sm md:text-base">{item.name}</p>
                          </div>
                          {item.note && (
                            <p className="flex items-center gap-1 font-sans text-xs text-[var(--brand-text)]/40 mt-0.5 ml-7">
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
