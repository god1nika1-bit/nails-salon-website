import { Star, ArrowRight } from "lucide-react";
import Link from "next/link";
import { REVIEWS_DATA, getAverageRating } from "@/data/reviews";

export function TestimonialsSection() {
  const topReviews = REVIEWS_DATA.filter((r) => r.rating === 5).slice(0, 3);
  const avgRating = getAverageRating();

  return (
    <section id="reviews" className="py-24 px-6 bg-[var(--brand-surface)] border-t border-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-light text-[var(--brand-text)] mb-4">
          Отзывы наших гостей
        </h2>
        <p className="font-sans text-sm text-[var(--brand-text)]/40 mb-16">
          Средняя оценка {avgRating} из 5 на основе {REVIEWS_DATA.length} отзывов
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {topReviews.map((review) => (
            <div key={review.id} className="bg-white p-8 rounded-3xl border border-gray-100 flex flex-col items-center text-center" style={{ boxShadow: '0 10px 30px -5px rgba(0,0,0,0.03)' }}>
              <div className="flex gap-1 mb-6 text-[var(--brand-pink-dark)]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="font-sans text-sm opacity-80 leading-relaxed mb-6 italic line-clamp-4">
                &ldquo;{review.text}&rdquo;
              </p>
              <span className="font-sans text-xs text-[var(--brand-pink-dark)] mb-4">{review.service}</span>
              <div className="w-12 h-12 bg-gray-100 rounded-full mb-4" />
              <span className="font-sans font-medium text-sm text-[var(--brand-text)]">{review.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-12 flex justify-center">
          <Link href="/reviews" className="inline-flex items-center gap-3 px-6 py-3 border border-[var(--brand-pink)] text-[var(--brand-text)] rounded-full hover:bg-[var(--brand-pink)] transition-colors font-sans text-xs uppercase tracking-[0.1em]">
            Все отзывы <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}
