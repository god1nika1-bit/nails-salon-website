import Link from "next/link";
import { Instagram, Send, Flame, MessageCircleHeart } from "lucide-react"; 

export function Footer() {
  return (
    <footer className="bg-[#222222] text-white py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="space-y-6">
          <Link href="/" className="font-serif text-3xl tracking-wide">
            ЛАЙК <span className="text-[#F5D3D9]">НЭЙЛС</span>
          </Link>
          <p className="font-sans text-sm opacity-60 max-w-sm leading-relaxed">
            Салон красоты ЛАЙК НЭЙЛС на <span className="whitespace-nowrap">Политехнической, 6</span>.<br/>
            Маникюр, педикюр, волосы, уход, косметология.
          </p>
        </div>
        
        <div className="space-y-6">
          <h4 className="font-serif text-xl">Наши соцсети</h4>
          <div className="flex flex-col space-y-4 font-sans text-sm opacity-80">
            <a href="#" className="flex items-center gap-3 hover:text-[#F5D3D9] transition-colors">
              <MessageCircleHeart size={18} /> ВКонтакте — новости, акции и отзывы
            </a>
            <a href="#" className="flex items-center gap-3 hover:text-[#F5D3D9] transition-colors">
              <Instagram size={18} /> Instagram — эстетика и тренды
            </a>
            <a href="#" className="flex items-center gap-3 hover:text-[#F5D3D9] transition-colors">
              <Send size={18} /> Telegram — быстрые окошки и акции
            </a>
            <a href="#" className="flex items-center gap-3 hover:text-[#F5D3D9] transition-colors">
              <Flame size={18} /> MAX — канал нашего сообщества
            </a>
          </div>
        </div>

        <div className="space-y-6">
          <h4 className="font-serif text-xl">Навигация</h4>
          <nav className="flex flex-col space-y-4 font-sans text-xs opacity-80 uppercase tracking-widest">
            <Link href="/services" className="hover:text-[#F5D3D9] transition-colors">Услуги и Прайс</Link>
            <Link href="/portfolio" className="hover:text-[#F5D3D9] transition-colors">Портфолио</Link>
            <Link href="/booking" className="text-center py-4 px-6 border border-[#F5D3D9]/30 rounded-full hover:bg-[#F5D3D9] hover:text-[#222222] transition-colors w-max mt-4 text-xs tracking-[0.2em] uppercase">
              ОНЛАЙН-ЗАПИСЬ 📲
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
