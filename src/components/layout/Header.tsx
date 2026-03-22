"use client";

import { useState } from "react";
import Link from "next/link";
import { MapPin, Menu, X } from "lucide-react";

export function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[#F5D3D9]/30">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-wide">
          ЛАЙК <span className="text-[#c7919d]">НЭЙЛС</span>
        </Link>
        
        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 font-sans text-[10px] xl:text-xs tracking-[0.2em] uppercase font-medium">
          <Link href="/services" className="hover:text-[#c7919d] transition-colors">Услуги</Link>
          <Link href="/masters" className="hover:text-[#c7919d] transition-colors">Команда</Link>
          <Link href="/portfolio" className="hover:text-[#c7919d] transition-colors">Работы</Link>
          <Link href="/reviews" className="hover:text-[#c7919d] transition-colors">Отзывы</Link>
          <Link href="/blog" className="hover:text-[#c7919d] transition-colors">Журнал</Link>
        </nav>
        
        <div className="hidden lg:flex items-center gap-6 text-sm font-sans">
          <div className="flex items-center gap-2 opacity-80 text-xs tracking-widest uppercase">
            <MapPin size={14} className="text-[#c7919d]" />
            <span>Политехническая, 6</span>
          </div>
          <Link href="/booking" className="px-6 py-3 bg-[#F5D3D9] text-[#222222] rounded-full font-medium text-xs uppercase tracking-widest hover:bg-[#ebd5d9] transition-all">
            Онлайн-запись
          </Link>
        </div>

        {/* Mobile Burger Icon */}
        <button className="md:flex lg:hidden text-[#222222]" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-[#F5D3D9]/30 flex flex-col items-center py-8 gap-6 shadow-xl z-50">
          <Link href="/services" onClick={() => setIsOpen(false)} className="font-sans text-sm tracking-[0.2em] uppercase font-medium hover:text-[#c7919d]">Услуги и Прайс</Link>
          <Link href="/masters" onClick={() => setIsOpen(false)} className="font-sans text-sm tracking-[0.2em] uppercase font-medium hover:text-[#c7919d]">Команда</Link>
          <Link href="/portfolio" onClick={() => setIsOpen(false)} className="font-sans text-sm tracking-[0.2em] uppercase font-medium hover:text-[#c7919d]">Портфолио</Link>
          <Link href="/reviews" onClick={() => setIsOpen(false)} className="font-sans text-sm tracking-[0.2em] uppercase font-medium hover:text-[#c7919d]">Отзывы</Link>
          <Link href="/blog" onClick={() => setIsOpen(false)} className="font-sans text-sm tracking-[0.2em] uppercase font-medium hover:text-[#c7919d]">Журнал</Link>
          <Link href="/booking" onClick={() => setIsOpen(false)} className="mt-4 px-8 py-4 bg-[#F5D3D9] text-[#222222] rounded-full font-bold text-xs uppercase tracking-widest">
            Онлайн-запись
          </Link>
        </div>
      )}
    </header>
  );
}
