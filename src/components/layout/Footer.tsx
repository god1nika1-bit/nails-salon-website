import Link from "next/link";
import { Instagram, Send, Flame, MessageCircleHeart, MapPin, Clock, Phone } from "lucide-react";

const SOCIAL_LINKS = [
  { href: "https://vk.com/likenails_spb", icon: MessageCircleHeart, label: "ВКонтакте", desc: "Новости, акции, отзывы и работы мастеров" },
  { href: "https://instagram.com/likenails_spb", icon: Instagram, label: "Instagram", desc: "Эстетика, тренды и бьюти-вдохновение" },
  { href: "https://t.me/likenails_spb", icon: Send, label: "Telegram", desc: "Свободные окошки и спецпредложения" },
  { href: "https://max.likenails.ru", icon: Flame, label: "MAX", desc: "Канал сообщества и полезные советы" },
];

export function Footer() {
  return (
    <footer className="bg-[var(--brand-text)] text-white py-20 px-6 hidden lg:block">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        {/* About */}
        <div className="space-y-6">
          <Link href="/" className="font-serif text-3xl tracking-wide">
            ЛАЙК <span className="text-[var(--brand-pink)]">НЭЙЛС</span>
          </Link>
          <p className="font-sans text-sm opacity-60 max-w-sm leading-relaxed">
            Салон красоты на <span className="whitespace-nowrap">Политехнической, 6</span>, стр. 1, 1 этаж. Санкт-Петербург.
          </p>
          <div className="space-y-3 font-sans text-sm opacity-70">
            <a href="tel:+78006007413" className="flex items-center gap-2 hover:text-[var(--brand-pink)] transition-colors">
              <Phone size={14} className="text-[var(--brand-pink)] shrink-0" />
              <span>8 (800) 600-74-13</span>
            </a>
            <div className="flex items-center gap-2">
              <MapPin size={14} className="text-[var(--brand-pink)] shrink-0" />
              <span>ул. Политехническая, д. 6, стр. 1</span>
            </div>
            <div className="flex items-start gap-2">
              <Clock size={14} className="text-[var(--brand-pink)] shrink-0 mt-0.5" />
              <div>
                <p>Пн–Пт: 09:00–22:00</p>
                <p>Сб–Вс: 10:00–21:00</p>
              </div>
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="space-y-6">
          <h4 className="font-serif text-xl">Мы в сети</h4>
          <div className="flex flex-col space-y-4 font-sans text-sm opacity-80">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-[var(--brand-pink)] transition-colors"
                aria-label={link.label}
              >
                <link.icon size={18} />
                <span>{link.label} <span className="opacity-50">— {link.desc}</span></span>
              </a>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="space-y-6">
          <h4 className="font-serif text-xl">Навигация</h4>
          <nav className="flex flex-col space-y-4 font-sans text-xs opacity-80 uppercase tracking-widest">
            <Link href="/services" className="hover:text-[var(--brand-pink)] transition-colors">Услуги и Прайс</Link>
            <Link href="/masters" className="hover:text-[var(--brand-pink)] transition-colors">Наши Мастера</Link>
            <Link href="/portfolio" className="hover:text-[var(--brand-pink)] transition-colors">Портфолио</Link>
            <Link href="/reviews" className="hover:text-[var(--brand-pink)] transition-colors">Отзывы</Link>
            <Link href="/blog" className="hover:text-[var(--brand-pink)] transition-colors">Журнал</Link>
            <Link href="/booking" className="text-center py-4 px-6 border border-[var(--brand-pink)]/30 rounded-full hover:bg-[var(--brand-pink)] hover:text-[var(--brand-text)] transition-colors w-max mt-4 text-xs tracking-[0.2em] uppercase">
              Онлайн-Запись
            </Link>
          </nav>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="font-sans text-xs opacity-40">
          © 2026 ЛАЙК НЭЙЛС. Все права защищены.
        </p>
        <p className="font-sans text-xs opacity-30">
          ул. Политехническая, д. 6, стр. 1, Санкт-Петербург
        </p>
      </div>
    </footer>
  );
}
