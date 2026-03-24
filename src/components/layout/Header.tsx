"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { MapPin, BookOpen, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/services", label: "Услуги" },
  { href: "/masters", label: "Команда" },
  { href: "/portfolio", label: "Работы" },
  { href: "/reviews", label: "Отзывы" },
  { href: "/blog", label: "Журнал" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-[var(--brand-pink)]/30">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <Link href="/" className="font-serif text-2xl tracking-wide">
          ЛАЙК <span className="text-[var(--brand-pink-dark)]">НЭЙЛС</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-4 xl:gap-8 font-sans text-[10px] xl:text-xs tracking-[0.2em] uppercase font-medium">
          {NAV_LINKS.map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative py-2 transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2 rounded-sm ${
                  isActive
                    ? "text-[var(--brand-pink-dark)]"
                    : "text-[var(--brand-text)]/60 hover:text-[var(--brand-pink-dark)]"
                }`}
              >
                {link.label}
                <span
                  className={`absolute bottom-0 left-0 h-[1px] bg-[var(--brand-pink-dark)] transition-all duration-300 ${
                    isActive ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-sm font-sans">
          <a href="tel:+78006007413" className="flex items-center gap-1.5 opacity-70 hover:opacity-100 transition-opacity text-xs">
            <Phone size={12} className="text-[var(--brand-pink-dark)]" />
            <span>8 (800) 600-74-13</span>
          </a>
          <div className="flex items-center gap-1.5 opacity-60 text-xs">
            <MapPin size={12} className="text-[var(--brand-pink-dark)]" />
            <span>Политехническая, 6</span>
          </div>
          <Link
            href="/booking"
            className="px-6 py-3 bg-[var(--brand-pink)] text-[var(--brand-text)] rounded-full font-medium text-xs uppercase tracking-widest hover:bg-[var(--brand-pink-dark)] hover:text-white transition-colors focus-visible:ring-2 focus-visible:ring-[var(--brand-pink-dark)] focus-visible:ring-offset-2"
          >
            Онлайн-запись
          </Link>
        </div>

        {/* Mobile: blog button in top-right */}
        <Link
          href="/blog"
          className={`lg:hidden flex items-center gap-1.5 px-3 py-2 rounded-full border transition-colors font-sans text-[10px] uppercase tracking-widest ${
            pathname.startsWith("/blog")
              ? "border-[var(--brand-pink)] bg-[var(--brand-pink)]/20 text-[var(--brand-pink-dark)]"
              : "border-gray-200 text-[var(--brand-text)]/50 hover:border-[var(--brand-pink)] hover:text-[var(--brand-pink-dark)]"
          }`}
        >
          <BookOpen size={14} />
          Журнал
        </Link>
      </div>
    </header>
  );
}
