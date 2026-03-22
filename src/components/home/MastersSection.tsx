import { ArrowRight, User } from "lucide-react";
import Link from "next/link";

export function MastersSection() {
  const masters = [
    { name: "Имя Мастера 1", role: "Топ-мастер маникюра" },
    { name: "Имя Мастера 2", role: "Стилист по волосам" },
    { name: "Имя Мастера 3", role: "Врач-косметолог" },
    { name: "Имя Мастера 4", role: "Мастер-бровист" },
    { name: "Имя Мастера 5", role: "Массажист" }
  ];

  return (
    <section id="masters" className="py-24 px-6 bg-zinc-50 border-t border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#222222] mb-4">
              Наша команда
            </h2>
            <p className="font-sans text-sm opacity-60 leading-relaxed">
              Наши мастера — профессионалы своего дела. Текст-заглушка про регулярное повышение квалификации.
            </p>
          </div>
          <Link href="/masters" className="hidden md:flex items-center gap-3 px-6 py-3 border border-[#F5D3D9] text-[#222222] rounded-full hover:bg-[#F5D3D9] transition-colors font-sans text-xs uppercase tracking-[0.1em]">
            Смотреть весь состав <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile: swiper, Desktop: grid */}
        <div className="flex lg:grid lg:grid-cols-5 gap-6 lg:gap-8 overflow-x-auto pb-8 snap-x snap-mandatory scrollbar-indicator">
          {masters.map((master, idx) => (
            <div key={idx} className="min-w-[75vw] sm:min-w-[40vw] lg:min-w-0 flex-shrink-0 snap-center group flex flex-col items-center">
              <div className="w-full aspect-[3/4] rounded-2xl mb-6 relative bg-gray-200/50 flex items-center justify-center overflow-hidden">
                <User size={64} className="text-gray-400 group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              <h4 className="font-serif text-2xl text-[#222222] mb-1">{master.name}</h4>
              <p className="font-sans text-[10px] md:text-xs uppercase tracking-[0.1em] text-[#c7919d] mb-4 text-center">
                {master.role}
              </p>
              <Link href="/booking" className="w-full flex justify-center py-4 lg:py-3 border border-gray-200 text-[#222222] rounded-full hover:border-[#F5D3D9] hover:bg-[#F5D3D9] transition-all font-sans text-xs uppercase tracking-widest opacity-100 lg:opacity-0 lg:group-hover:opacity-100 lg:translate-y-4 group-hover:translate-y-0 duration-300">
                Записаться
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-4 flex justify-center md:hidden">
          <Link href="/masters" className="w-full text-center py-4 border border-[#222222] text-[#222222] rounded-full font-sans text-xs uppercase tracking-widest">
            Показать всех мастеров
          </Link>
        </div>
      </div>
    </section>
  );
}
