"use client";

import { useState } from "react";
import { Star, MessageSquare, Send, ExternalLink } from "lucide-react";
import { REVIEWS_DATA, getAverageRating, getReviewsBySource } from "@/data/reviews";
import { FadeInWhenVisible } from "@/components/ui/motion";
import { motion, AnimatePresence } from "framer-motion";

const SOURCE_LABELS: Record<string, string> = {
  all: "Все",
  site: "Сайт",
  yandex: "Яндекс",
  "2gis": "2ГИС",
};

function StarRating({ rating, size = 14 }: { rating: number; size?: number }) {
  return (
    <div className="flex gap-0.5 text-[var(--brand-pink-dark)]">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={size}
          fill={i <= rating ? "currentColor" : "none"}
          className={i <= rating ? "" : "text-gray-200"}
        />
      ))}
    </div>
  );
}

export default function ReviewsPage() {
  const [sourceFilter, setSourceFilter] = useState<string>("all");
  const [showForm, setShowForm] = useState(false);
  const [formRating, setFormRating] = useState(5);
  const [formName, setFormName] = useState("");
  const [formText, setFormText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const avgRating = getAverageRating();
  const filtered = sourceFilter === "all" ? REVIEWS_DATA : getReviewsBySource(sourceFilter as "site" | "yandex" | "2gis");
  const sourceCounts = {
    site: getReviewsBySource("site").length,
    yandex: getReviewsBySource("yandex").length,
    "2gis": getReviewsBySource("2gis").length,
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setFormName("");
    setFormText("");
    setFormRating(5);
  };

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="pt-12 pb-8 px-6 md:px-20 bg-[var(--brand-surface)]">
        <div className="max-w-6xl mx-auto">
          <FadeInWhenVisible>
            <h1 className="text-4xl md:text-6xl font-serif font-light text-[var(--brand-text)] mb-8">
              Отзывы Гостей
            </h1>
          </FadeInWhenVisible>

          {/* Summary bar */}
          <FadeInWhenVisible delay={0.1}>
            <div className="flex flex-wrap items-center gap-6 md:gap-10 mb-8 pb-8 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <span className="font-serif text-5xl text-[var(--brand-text)]">{avgRating}</span>
                <div>
                  <StarRating rating={Math.round(avgRating)} size={16} />
                  <p className="font-sans text-xs text-[var(--brand-text)]/40 mt-1">{REVIEWS_DATA.length} отзывов</p>
                </div>
              </div>
              <div className="flex gap-3 font-sans text-xs text-[var(--brand-text)]/50">
                <span className="px-3 py-1.5 bg-white rounded-full border border-gray-100">Яндекс: {sourceCounts.yandex}</span>
                <span className="px-3 py-1.5 bg-white rounded-full border border-gray-100">2ГИС: {sourceCounts["2gis"]}</span>
                <span className="px-3 py-1.5 bg-white rounded-full border border-gray-100">Сайт: {sourceCounts.site}</span>
              </div>
            </div>
          </FadeInWhenVisible>

          {/* Source filter */}
          <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-indicator">
            {Object.entries(SOURCE_LABELS).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setSourceFilter(key)}
                className={`px-5 py-2 rounded-full font-sans text-xs uppercase tracking-widest whitespace-nowrap transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2 ${
                  sourceFilter === key
                    ? "bg-[var(--brand-text)] text-white"
                    : "border border-gray-200 text-gray-500 hover:border-[var(--brand-pink)] hover:text-[var(--brand-text)]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* External links for verification */}
          {(sourceFilter === "yandex" || sourceFilter === "2gis") && (
            <div className="mt-4 flex items-center gap-3">
              <a
                href={sourceFilter === "yandex"
                  ? "https://yandex.com/maps/-/CPRTZHlw"
                  : "https://2gis.ru/spb/search/like%20nails/firm/70000001044581189/30.357199%2C59.993272"}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 hover:border-[var(--brand-pink)] transition-colors font-sans text-xs text-[var(--brand-text)]/60 hover:text-[var(--brand-text)]"
              >
                <ExternalLink size={12} />
                {sourceFilter === "yandex"
                  ? "Читать все отзывы на Яндекс Картах"
                  : "Читать все отзывы на 2ГИС"}
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Reviews Grid — key forces full re-mount on filter change */}
      <section className="px-6 md:px-20 py-16">
        <div className="max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={sourceFilter}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((review, idx) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05, duration: 0.35 }}
                >
                  <div className="flex flex-col bg-white p-6 rounded-3xl border border-gray-100 hover:border-[var(--brand-pink)] transition-colors h-full" style={{ boxShadow: "0 10px 30px -5px rgba(0,0,0,0.03)" }}>
                    <div className="flex items-center justify-between mb-4">
                      <StarRating rating={review.rating} />
                      {review.source !== "site" ? (
                        <a
                          href={review.source === "yandex"
                            ? "https://yandex.com/maps/-/CPRTZHlw"
                            : "https://2gis.ru/spb/search/like%20nails/firm/70000001044581189/30.357199%2C59.993272"}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-sans text-[10px] uppercase tracking-widest hover:opacity-80 transition-opacity ${
                            review.source === "yandex"
                              ? "bg-red-50 text-red-400"
                              : "bg-green-50 text-green-500"
                          }`}
                        >
                          {SOURCE_LABELS[review.source]}
                          <ExternalLink size={9} />
                        </a>
                      ) : (
                        <span className="px-2.5 py-1 rounded-full font-sans text-[10px] uppercase tracking-widest bg-[var(--brand-pink)]/30 text-[var(--brand-pink-dark)]">
                          {SOURCE_LABELS[review.source]}
                        </span>
                      )}
                    </div>

                    <p className="font-sans text-sm text-[var(--brand-text)]/70 leading-relaxed mb-6 flex-1 italic">
                      &ldquo;{review.text}&rdquo;
                    </p>

                    <div className="border-t border-gray-50 pt-4">
                      <p className="font-sans font-medium text-sm text-[var(--brand-text)]">{review.name}</p>
                      <div className="flex items-center justify-between mt-1">
                        <span className="font-sans text-xs text-[var(--brand-pink-dark)]">{review.service}</span>
                        <span className="font-sans text-xs text-[var(--brand-text)]/30">{review.date}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Leave Review CTA */}
      <section className="px-6 md:px-20 pb-24">
        <div className="max-w-2xl mx-auto">
          {!showForm && !submitted && (
            <FadeInWhenVisible>
              <button
                onClick={() => setShowForm(true)}
                className="w-full flex items-center justify-center gap-3 py-5 border border-[var(--brand-pink)] text-[var(--brand-text)] rounded-2xl hover:bg-[var(--brand-pink)] transition-colors font-sans text-sm uppercase tracking-widest"
              >
                <MessageSquare size={18} />
                Оставить отзыв
              </button>
            </FadeInWhenVisible>
          )}

          {showForm && !submitted && (
            <FadeInWhenVisible>
              <form onSubmit={handleSubmit} className="bg-[var(--brand-surface)] rounded-3xl p-8 border border-gray-100">
                <h3 className="font-serif text-2xl text-[var(--brand-text)] mb-6">Ваш отзыв</h3>

                <div className="mb-6">
                  <label className="block font-sans text-xs uppercase tracking-widest text-[var(--brand-text)]/40 mb-2">
                    Ваша оценка
                  </label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setFormRating(i)}
                        className="p-1 focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] rounded"
                      >
                        <Star
                          size={24}
                          fill={i <= formRating ? "currentColor" : "none"}
                          className={i <= formRating ? "text-[var(--brand-pink-dark)]" : "text-gray-200"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-sans text-xs uppercase tracking-widest text-[var(--brand-text)]/40 mb-2">
                    Имя
                  </label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink-dark)] focus:ring-offset-2"
                    placeholder="Ваше имя"
                  />
                </div>

                <div className="mb-6">
                  <label className="block font-sans text-xs uppercase tracking-widest text-[var(--brand-text)]/40 mb-2">
                    Отзыв
                  </label>
                  <textarea
                    required
                    value={formText}
                    onChange={(e) => setFormText(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[var(--brand-pink-dark)] focus:ring-offset-2 resize-none"
                    placeholder="Расскажите о вашем опыте..."
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="submit"
                    className="flex items-center gap-2 px-8 py-3 bg-[var(--brand-text)] text-white rounded-full font-sans text-xs uppercase tracking-widest hover:bg-[var(--brand-pink)] hover:text-[var(--brand-text)] transition-colors"
                  >
                    <Send size={14} />
                    Отправить
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="px-6 py-3 border border-gray-200 rounded-full font-sans text-xs uppercase tracking-widest text-gray-500 hover:border-[var(--brand-text)] hover:text-[var(--brand-text)] transition-colors"
                  >
                    Отмена
                  </button>
                </div>
              </form>
            </FadeInWhenVisible>
          )}

          {submitted && (
            <FadeInWhenVisible>
              <div className="bg-[var(--brand-pink)]/20 rounded-3xl p-8 text-center">
                <h3 className="font-serif text-2xl text-[var(--brand-text)] mb-3">Спасибо за отзыв!</h3>
                <p className="font-sans text-sm text-[var(--brand-text)]/60">
                  Ваш отзыв отправлен на модерацию и скоро появится на сайте.
                </p>
              </div>
            </FadeInWhenVisible>
          )}
        </div>
      </section>
    </main>
  );
}
