"use client";

import { useState } from "react";
import { ArrowRight, Clock } from "lucide-react";
import Link from "next/link";

const CATEGORIES = [
  { id: "nails", name: "Ногтевой сервис" },
  { id: "hair", name: "Парикмахерские услуги" },
  { id: "brows", name: "Брови и ресницы" },
  { id: "cosmetology", name: "Косметология" },
];

const SERVICES_DATA: Record<string, { name: string; price: string; duration: string }[]> = {
  nails: [
    { name: "Маникюр + Гель-лак (Комплекс)", price: "от 2 200 ₽", duration: "1.5 ч" },
    { name: "SMART Педикюр (Полная стопа)", price: "от 3 000 ₽", duration: "1.5 ч" },
    { name: "Наращивание ногтей", price: "от 4 000 ₽", duration: "2.5 ч" },
    { name: "Японский маникюр", price: "от 1 800 ₽", duration: "1 ч" },
  ],
  hair: [
    { name: "Стрижка женская", price: "от 2 000 ₽", duration: "1 ч" },
    { name: "Сложное окрашивание", price: "от 8 000 ₽", duration: "4 ч" },
    { name: "Тонирование волос", price: "от 3 500 ₽", duration: "1.5 ч" },
  ],
  brows: [
    { name: "Архитектура + Окрашивание", price: "от 1 500 ₽", duration: "45 мин" },
    { name: "Ламинирование бровей", price: "от 2 500 ₽", duration: "1 ч" },
  ],
  cosmetology: [
    { name: "Ультразвуковая чистка", price: "от 3 500 ₽", duration: "1 ч" },
    { name: "Массаж лица", price: "от 2 500 ₽", duration: "45 мин" },
  ],
};

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

  return (
    <section id="services" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-16">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#222222] mb-4">
              Услуги и Прайс
            </h2>
            <p className="font-sans text-sm opacity-60 leading-relaxed">
              Мы используем только премиальные материалы и современные техники, чтобы гарантировать идеальный результат.
            </p>
          </div>
          <Link href="/services" className="hidden md:flex items-center gap-3 px-6 py-3 border border-[#F5D3D9] text-[#222222] rounded-full hover:bg-[#F5D3D9] transition-colors font-sans text-xs uppercase tracking-[0.1em]">
            Смотреть весь прайс <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-20">
          {/* Левое меню (Сайдбар) */}
          <div className="md:col-span-4 lg:col-span-3 flex overflow-x-auto md:flex-col space-x-4 md:space-x-0 md:space-y-2 md:border-l border-gray-100 md:pl-6 pb-6 md:pb-0 scrollbar-indicator">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`text-left text-xs md:text-sm font-sans py-2 md:py-3 transition-all relative whitespace-nowrap ${
                    isActive 
                      ? "text-[#222222] font-semibold border-b-2 md:border-b-0 border-[#c7919d]" 
                      : "text-gray-400 hover:text-[#222222]"
                  }`}
                >
                  <span className={`hidden md:block absolute left-[-25px] top-1/2 -translate-y-1/2 w-1 h-6 bg-[#c7919d] rounded-r-md transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`} />
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Правая часть (Карточки услуг) */}
          <div className="md:col-span-8 lg:col-span-9 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {SERVICES_DATA[activeCategory].map((service, index) => (
              <div 
                key={index}
                className={`group flex-col justify-between p-6 rounded-2xl border border-gray-100 hover:border-[#F5D3D9] hover:shadow-sm transition-all bg-zinc-50/50 hover:bg-white cursor-pointer ${index < 2 ? "flex" : "hidden md:flex"}`}
              >
                <div>
                  <h4 className="font-serif text-xl mb-3 group-hover:text-[#c7919d] transition-colors">
                    {service.name}
                  </h4>
                  <div className="flex items-center gap-2 font-sans text-xs text-gray-500 mb-6">
                    <Clock size={14} className="opacity-70" />
                    <span>{service.duration}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                  <span className="font-sans font-medium text-sm text-[#222222]">
                    {service.price}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-[#F5D3D9] group-hover:text-[#222222] transition-colors">
                    <ArrowRight size={14} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link href="/services" className="w-full mt-4 md:hidden flex justify-center py-4 border border-[#222222] text-[#222222] rounded-full font-sans text-xs uppercase tracking-widest">
            Смотреть весь прайс
          </Link>
        </div>
      </div>
    </section>
  );
}
