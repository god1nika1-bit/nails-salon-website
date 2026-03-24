"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useMemo } from "react";

interface DateTimeSelectorProps {
  selectedDate: string | null;
  selectedTime: string | null;
  onSelectDate: (date: string) => void;
  onSelectTime: (time: string) => void;
}

const DAYS_AHEAD = 14;
const SLOTS_START = 10;
const SLOTS_END = 20;
const SLOT_INTERVAL = 30;

function getDayName(date: Date): string {
  return date.toLocaleDateString("ru-RU", { weekday: "short" });
}

function getMonthDay(date: Date): string {
  return date.toLocaleDateString("ru-RU", { day: "numeric", month: "short" });
}

function formatDateKey(date: Date): string {
  return date.toISOString().split("T")[0];
}

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = SLOTS_START; h < SLOTS_END; h++) {
    slots.push(`${h.toString().padStart(2, "0")}:00`);
    slots.push(`${h.toString().padStart(2, "0")}:30`);
  }
  return slots;
}

export function DateTimeSelector({ selectedDate, selectedTime, onSelectDate, onSelectTime }: DateTimeSelectorProps) {
  const [weekOffset, setWeekOffset] = useState(0);

  const dates = useMemo(() => {
    const result: Date[] = [];
    const today = new Date();
    for (let i = 0; i < DAYS_AHEAD; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      result.push(d);
    }
    return result;
  }, []);

  const visibleDates = dates.slice(weekOffset * 7, weekOffset * 7 + 7);
  const timeSlots = generateTimeSlots();
  const canGoBack = weekOffset > 0;
  const canGoForward = weekOffset < 1;

  return (
    <div>
      <h2 className="font-serif text-2xl md:text-3xl text-[var(--brand-text)] mb-2">Дата и время</h2>
      <p className="font-sans text-sm text-[var(--brand-text)]/40 mb-8">Выберите удобную дату и время визита</p>

      {/* Calendar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setWeekOffset((w) => w - 1)}
            disabled={!canGoBack}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-[var(--brand-pink)] transition-colors disabled:opacity-30 disabled:hover:border-gray-200"
          >
            <ChevronLeft size={16} />
          </button>
          <span className="font-sans text-xs uppercase tracking-widest text-[var(--brand-text)]/40">
            {visibleDates.length > 0 && getMonthDay(visibleDates[0])} — {visibleDates.length > 0 && getMonthDay(visibleDates[visibleDates.length - 1])}
          </span>
          <button
            onClick={() => setWeekOffset((w) => w + 1)}
            disabled={!canGoForward}
            className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-[var(--brand-pink)] transition-colors disabled:opacity-30 disabled:hover:border-gray-200"
          >
            <ChevronRight size={16} />
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {visibleDates.map((date) => {
            const key = formatDateKey(date);
            const isSelected = selectedDate === key;
            const isSunday = date.getDay() === 0;

            return (
              <button
                key={key}
                disabled={isSunday}
                onClick={() => onSelectDate(key)}
                className={`flex flex-col items-center py-3 rounded-xl transition-colors ${
                  isSunday
                    ? "opacity-30 cursor-not-allowed"
                    : isSelected
                    ? "bg-[var(--brand-text)] text-white"
                    : "border border-gray-100 hover:border-[var(--brand-pink)] hover:bg-[var(--brand-pink)]/10"
                }`}
              >
                <span className="font-sans text-[10px] uppercase tracking-widest mb-1">{getDayName(date)}</span>
                <span className="font-serif text-lg">{date.getDate()}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Time slots */}
      {selectedDate && (
        <div>
          <p className="font-sans text-xs uppercase tracking-widest text-[var(--brand-text)]/40 mb-4">Время</p>
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedTime === slot;
              return (
                <button
                  key={slot}
                  onClick={() => onSelectTime(slot)}
                  className={`py-3 rounded-xl font-sans text-sm transition-colors ${
                    isSelected
                      ? "bg-[var(--brand-text)] text-white"
                      : "border border-gray-100 hover:border-[var(--brand-pink)] hover:bg-[var(--brand-pink)]/10"
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
