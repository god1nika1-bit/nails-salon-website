"use client";

import { User, Check } from "lucide-react";
import { MASTERS_DATA, getMastersByCategory } from "@/data/masters";

interface MasterSelectorProps {
  categoryId: string | null;
  selectedMasterId: string | null;
  onSelect: (masterId: string | null) => void;
}

export function MasterSelector({ categoryId, selectedMasterId, onSelect }: MasterSelectorProps) {
  const availableMasters = categoryId ? getMastersByCategory(categoryId) : MASTERS_DATA;

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-[var(--brand-text)] mb-2">Выберите мастера</h2>
      <p className="font-sans text-sm text-[var(--brand-text)]/40 mb-8">Выберите мастера или оставьте «Любой свободный»</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Any available */}
        <button
          onClick={() => onSelect(null)}
          className={`flex items-center gap-4 p-5 rounded-2xl border transition-colors text-left ${
            selectedMasterId === null
              ? "border-[var(--brand-pink)] bg-[var(--brand-pink)]/10"
              : "border-gray-100 hover:border-[var(--brand-pink)]"
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
            <User size={24} className="text-gray-400" />
          </div>
          <div className="flex-1">
            <p className="font-serif text-lg text-[var(--brand-text)]">Любой свободный</p>
            <p className="font-sans text-xs text-[var(--brand-text)]/40">Ближайшее время</p>
          </div>
          {selectedMasterId === null && <Check size={18} className="text-[var(--brand-pink-dark)] shrink-0" />}
        </button>

        {availableMasters.map((master) => {
          const isSelected = selectedMasterId === master.id;
          return (
            <button
              key={master.id}
              onClick={() => onSelect(master.id)}
              className={`flex items-center gap-4 p-5 rounded-2xl border transition-colors text-left ${
                isSelected
                  ? "border-[var(--brand-pink)] bg-[var(--brand-pink)]/10"
                  : "border-gray-100 hover:border-[var(--brand-pink)]"
              }`}
            >
              <div className="w-14 h-14 rounded-full bg-gray-200/50 flex items-center justify-center shrink-0">
                <User size={24} className="text-gray-400" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-serif text-lg text-[var(--brand-text)]">{master.name}</p>
                <p className="font-sans text-[10px] uppercase tracking-[0.1em] text-[var(--brand-pink-dark)] truncate">
                  {master.role}
                </p>
                <p className="font-sans text-xs text-[var(--brand-text)]/40 mt-0.5">Опыт: {master.experience}</p>
              </div>
              {isSelected && <Check size={18} className="text-[var(--brand-pink-dark)] shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
