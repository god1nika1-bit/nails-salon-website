import { EtheralShadow } from "@/components/ui/etheral-shadow";
import { AlgorithmicArt } from "@/components/ui/AlgorithmicArt";
import { Sparkles, ShieldCheck, Clock } from "lucide-react";
import { ServicesSection } from "@/components/home/ServicesSection";
import { MastersSection } from "@/components/home/MastersSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[calc(100vh-80px)]">
        <EtheralShadow
          color="rgba(245, 211, 217, 1)"
          animation={{ scale: 100, speed: 90 }}
          noise={{ opacity: 0.1, scale: 1.2 }}
          sizing="fill"
          className="absolute inset-0"
        >
          {/* Inject Generative Art over the shadow mask, but behind text */}
          <AlgorithmicArt />
          
          <div className="flex flex-col items-center justify-center h-full space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[#222222]/10 bg-white/50 backdrop-blur-sm z-20">
              <Sparkles size={16} className="text-[#c7919d]" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-medium">Ваше бьюти-пространство</span>
            </div>
            <h1 className="md:text-[6rem] text-6xl font-serif font-light text-[#222222] text-center relative z-20 leading-none tracking-tight">
              ЛАЙК НЭЙЛС
            </h1>
            <p className="text-[#222222]/70 font-sans mt-4 max-w-lg text-center text-sm md:text-base tracking-wide relative z-20">
              Маникюр, педикюр, уход за волосами и косметология на Политехнической.
            </p>
            <button className="z-20 mt-8 px-8 py-4 bg-[#222222] text-white rounded-full uppercase text-xs tracking-[0.2em] hover:bg-[#F5D3D9] hover:text-[#222222] transition-colors duration-300">
              Онлайн-Запись
            </button>
          </div>
        </EtheralShadow>
      </section>

      {/* Trust Signals / Features */}
      <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 border-b border-gray-100">
        <div className="flex flex-col items-center text-center space-y-6 group">
          <div className="w-20 h-20 rounded-full bg-[#F5D3D9]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F5D3D9]/40 transition-all duration-500">
            <Sparkles className="text-[#c7919d]" size={32} />
          </div>
          <h3 className="font-serif text-3xl">Опытные мастера</h3>
          <p className="text-sm font-sans opacity-60 leading-relaxed max-w-xs">
            Команда профессионалов своего дела с многолетним стажем и регулярными повышениями квалификации.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-6 group">
          <div className="w-20 h-20 rounded-full bg-[#F5D3D9]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F5D3D9]/40 transition-all duration-500">
            <ShieldCheck className="text-[#c7919d]" size={32} />
          </div>
          <h3 className="font-serif text-3xl">Стерильность</h3>
          <p className="text-sm font-sans opacity-60 leading-relaxed max-w-xs">
            100% безопасность, многоступенчатая стерилизация инструментов по нормам СанПиН.
          </p>
        </div>
        <div className="flex flex-col items-center text-center space-y-6 group">
          <div className="w-20 h-20 rounded-full bg-[#F5D3D9]/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#F5D3D9]/40 transition-all duration-500">
            <Clock className="text-[#c7919d]" size={32} />
          </div>
          <h3 className="font-serif text-3xl">Экономия времени</h3>
          <p className="text-sm font-sans opacity-60 leading-relaxed max-w-xs">
            Быстрая онлайн-запись в пару кликов и популярные услуги "в 6 рук" для вашего удобства.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <ServicesSection />

      {/* Masters (Team) Section */}
      <MastersSection />

      {/* Portfolio Section */}
      <PortfolioSection />

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Blog Section */}
      <BlogSection />
    </main>
  );
}
