import { EtheralShadow } from "@/components/ui/etheral-shadow";
import { AlgorithmicArt } from "@/components/ui/AlgorithmicArt";
import { Sparkles, ShieldCheck, Clock } from "lucide-react";
import { ServicesSection } from "@/components/home/ServicesSection";
import { MastersSection } from "@/components/home/MastersSection";
import { PortfolioSection } from "@/components/home/PortfolioSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { BlogSection } from "@/components/home/BlogSection";
import { TrustSignals } from "@/components/home/TrustSignals";
import Link from "next/link";

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
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--brand-text)]/10 bg-white/50 backdrop-blur-sm z-20">
              <Sparkles size={16} className="text-[var(--brand-pink-dark)]" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-sans font-medium">Ваше бьюти-пространство</span>
            </div>
            <h1 className="md:text-[6rem] text-6xl font-serif font-light text-[var(--brand-text)] text-center relative z-20 leading-none tracking-tight">
              ЛАЙК НЭЙЛС
            </h1>
            <p className="text-[var(--brand-text)]/70 font-sans mt-4 max-w-lg text-center text-sm md:text-base tracking-wide relative z-20">
              Маникюр, педикюр, уход за волосами и косметология на Политехнической.
            </p>
            <Link href="/booking" className="z-20 mt-8 px-8 py-4 bg-[var(--brand-text)] text-white rounded-full uppercase text-xs tracking-[0.2em] hover:bg-[var(--brand-pink)] hover:text-[var(--brand-text)] transition-colors duration-300">
              Онлайн-Запись
            </Link>
          </div>
        </EtheralShadow>
      </section>

      {/* Trust Signals / Features */}
      <TrustSignals />

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
