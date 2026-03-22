"use client";

import { useState } from "react";
import { ImageIcon } from "lucide-react";
import Link from "next/link";

export function PortfolioSection() {
  const categories = ["Все работы", "Маникюр", "Волосы", "Брови"];
  const [activeTab, setActiveTab] = useState(categories[0]);
  const works = [1, 2, 3, 4, 5, 6];

  return (
    <section id="portfolio" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-serif font-light text-[#222222] mb-4">
              Портфолио
            </h2>
            <p className="font-sans text-sm opacity-60 leading-relaxed">
              Примеры наших работ. (Блок-заглушка)
            </p>
          </div>
        </div>

        {/* Categories Stub */}
        <div className="flex gap-4 mb-10 overflow-x-auto pb-6 scrollbar-indicator">
          {categories.map((cat, idx) => (
            <button 
              key={idx} 
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full font-sans text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${
                activeTab === cat 
                  ? "bg-[#222222] text-white" 
                  : "border border-gray-200 text-gray-500 hover:border-[#F5D3D9] hover:text-[#222222]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid of placeholders */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {works.map((item, idx) => (
            <div key={item} className={`aspect-square bg-gray-100 rounded-2xl flex-col items-center justify-center text-gray-300 hover:bg-gray-200 transition-colors cursor-pointer group ${idx < 2 ? "flex" : "hidden md:flex"}`}>
              <ImageIcon className="w-8 h-8 md:w-12 md:h-12 mb-2 md:mb-4 opacity-50 group-hover:scale-110 transition-transform duration-500" />
              <span className="font-sans text-[10px] md:text-xs uppercase tracking-widest opacity-50">Работа {item}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-center md:hidden">
          <Link href="/portfolio" className="w-full gap-2 text-center py-4 border border-[#222222] text-[#222222] rounded-full font-sans text-xs uppercase tracking-widest">
            Смотреть весь каталог
          </Link>
        </div>
      </div>
    </section>
  );
}
