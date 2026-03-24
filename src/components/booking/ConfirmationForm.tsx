"use client";

import { useState } from "react";
import { Calendar, Clock, User, Scissors, Send } from "lucide-react";
import { getMasterById } from "@/data/masters";
import type { CartService } from "@/hooks/useServiceCart";

interface ConfirmationFormProps {
  services: CartService[];
  masterId: string | null;
  date: string | null;
  time: string | null;
  onSubmit: () => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function ConfirmationForm({ services, masterId, date, time, onSubmit }: ConfirmationFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [comment, setComment] = useState("");

  const master = masterId ? getMasterById(masterId) : null;

  const handlePhoneChange = (val: string) => {
    const digits = val.replace(/\D/g, "");
    if (digits.length <= 11) {
      if (digits.length === 0) {
        setPhone("+7");
      } else if (digits.startsWith("7") || digits.startsWith("8")) {
        setPhone("+7" + digits.slice(1));
      } else {
        setPhone("+7" + digits);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-[var(--brand-text)] mb-2">Подтверждение записи</h2>
      <p className="font-sans text-sm text-[var(--brand-text)]/40 mb-8">Проверьте данные и оставьте контакты</p>

      {/* Summary */}
      <div className="bg-[var(--brand-surface)] rounded-2xl p-6 mb-8 space-y-4">
        {/* Services list */}
        <div className="flex items-start gap-3">
          <Scissors size={16} className="text-[var(--brand-pink-dark)] shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-sans text-xs text-[var(--brand-text)]/40 mb-2">
              {services.length === 1 ? "Услуга" : `Услуги (${services.length})`}
            </p>
            <div className="space-y-2">
              {services.map((s) => (
                <div key={s.name} className="flex items-center justify-between">
                  <p className="font-serif text-base">{s.name}</p>
                  <p className="font-sans text-sm font-medium text-[var(--brand-pink-dark)] ml-4 shrink-0">{s.price}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-gray-100 pt-4 flex items-center gap-3">
          <User size={16} className="text-[var(--brand-pink-dark)] shrink-0" />
          <div>
            <p className="font-sans text-xs text-[var(--brand-text)]/40">Мастер</p>
            <p className="font-serif text-base">{master ? master.name : "Любой свободный"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Calendar size={16} className="text-[var(--brand-pink-dark)] shrink-0" />
          <div>
            <p className="font-sans text-xs text-[var(--brand-text)]/40">Дата</p>
            <p className="font-serif text-base">{date ? formatDate(date) : "—"}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Clock size={16} className="text-[var(--brand-pink-dark)] shrink-0" />
          <div>
            <p className="font-sans text-xs text-[var(--brand-text)]/40">Время</p>
            <p className="font-serif text-base">{time || "—"}</p>
          </div>
        </div>
      </div>

      {/* Contact form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-sans text-xs uppercase tracking-widest text-[var(--brand-text)]/40 mb-2">
            Ваше имя *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Имя"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink-dark)] focus:ring-offset-2"
          />
        </div>

        <div>
          <label className="block font-sans text-xs uppercase tracking-widest text-[var(--brand-text)]/40 mb-2">
            Телефон *
          </label>
          <input
            type="tel"
            required
            value={phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            placeholder="+7 (___) ___-__-__"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink-dark)] focus:ring-offset-2"
          />
        </div>

        <div>
          <label className="block font-sans text-xs uppercase tracking-widest text-[var(--brand-text)]/40 mb-2">
            Комментарий
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            rows={3}
            placeholder="Пожелания, особенности..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink-dark)] focus:ring-offset-2 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--brand-text)] text-white rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[var(--brand-pink)] hover:text-[var(--brand-text)] transition-colors"
        >
          <Send size={14} />
          Записаться
        </button>
      </form>
    </div>
  );
}
