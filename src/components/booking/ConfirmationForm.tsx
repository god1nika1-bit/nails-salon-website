"use client";

import { useState } from "react";
import { Calendar, Clock, User, Scissors, Send, Loader2, Phone } from "lucide-react";
import { getMasterById } from "@/data/masters";
import { sendBookingToTelegram } from "@/lib/telegram";

interface ConfirmationFormProps {
  service: { categoryId: string; name: string; price: string } | null;
  masterId: string | null;
  date: string | null;
  time: string | null;
  onSubmit: () => void;
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "long", year: "numeric" });
}

export function ConfirmationForm({ service, masterId, date, time, onSubmit }: ConfirmationFormProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("+7");
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(false);
    setSending(true);

    const result = await sendBookingToTelegram({
      service: service?.name || "—",
      price: service?.price || "—",
      master: master ? master.name : "Любой свободный",
      date: date ? formatDate(date) : "—",
      time: time || "—",
      clientName: name,
      clientPhone: phone,
      comment: comment || undefined,
    });

    setSending(false);

    if (result.ok) {
      onSubmit();
    } else {
      setError(true);
    }
  };

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-[var(--brand-text)] mb-2">Подтверждение записи</h2>
      <p className="font-sans text-sm text-[var(--brand-text)]/40 mb-8">Проверьте данные и оставьте контакты</p>

      {/* Summary */}
      <div className="bg-[var(--brand-surface)] rounded-2xl p-6 mb-8 space-y-4">
        <div className="flex items-center gap-3">
          <Scissors size={16} className="text-[var(--brand-pink-dark)] shrink-0" />
          <div>
            <p className="font-sans text-xs text-[var(--brand-text)]/40">Услуга</p>
            <p className="font-serif text-base">{service?.name}</p>
            <p className="font-sans text-sm font-medium text-[var(--brand-pink-dark)]">{service?.price}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
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

      {/* Error message with phone fallback */}
      {error && (
        <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-100">
          <p className="font-sans text-sm text-red-600 mb-2">
            Не удалось отправить заявку онлайн.
          </p>
          <p className="font-sans text-sm text-[var(--brand-text)]/60">
            Позвоните нам для записи:
          </p>
          <a
            href="tel:+78006007413"
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--brand-text)] text-white font-sans text-xs uppercase tracking-widest"
          >
            <Phone size={14} />
            8 (800) 600-74-13
          </a>
        </div>
      )}

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
            disabled={sending}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink-dark)] focus:ring-offset-2 disabled:opacity-50"
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
            disabled={sending}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink-dark)] focus:ring-offset-2 disabled:opacity-50"
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
            disabled={sending}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink-dark)] focus:ring-offset-2 resize-none disabled:opacity-50"
          />
        </div>

        <button
          type="submit"
          disabled={sending}
          className="w-full flex items-center justify-center gap-2 py-4 bg-[var(--brand-text)] text-white rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[var(--brand-pink)] hover:text-[var(--brand-text)] transition-colors disabled:opacity-50"
        >
          {sending ? (
            <>
              <Loader2 size={14} className="animate-spin" />
              Отправка...
            </>
          ) : (
            <>
              <Send size={14} />
              Записаться
            </>
          )}
        </button>
      </form>
    </div>
  );
}
