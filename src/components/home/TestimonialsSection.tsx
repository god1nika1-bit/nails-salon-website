import { Star } from "lucide-react";

export function TestimonialsSection() {
  const reviews = [
    { name: "Имя Клиента", text: "Описание отзыва клиента. Прекрасный сервис и атмосфера. Заглушка.", rating: 5 },
    { name: "Имя Клиента", text: "Описание отзыва клиента. Великолепные мастера. Заглушка.", rating: 5 },
    { name: "Имя Клиента", text: "Описание отзыва клиента. Очень уютно и качественно. Заглушка.", rating: 5 },
  ];

  return (
    <section id="reviews" className="py-24 px-6 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-serif font-light text-[#222222] mb-16">
          Отзывы наших гостей
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center text-center">
              <div className="flex gap-1 mb-6 text-[#c7919d]">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="font-sans text-sm opacity-80 leading-relaxed mb-8 italic">
                "{review.text}"
              </p>
              <div className="w-12 h-12 bg-gray-100 rounded-full mb-4" />
              <span className="font-sans font-medium text-sm text-[#222222]">{review.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
