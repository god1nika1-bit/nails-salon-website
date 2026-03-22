import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FileText, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BlogPage() {
  const posts = [
    { id: 1, category: "Тренды", date: "22 Марта 2026", title: "Топ-5 оттенков маникюра на эту весну", excerpt: "Этой весной в моду возвращаются пастельные оттенки и минималистичный дизайн. Рассказываем, какие цвета выбрать." },
    { id: 2, category: "Уход", date: "18 Марта 2026", title: "Как сохранить здоровье волос после окрашивания", excerpt: "Правильный уход — залог долгого цвета и блестящих волос. Делимся секретами наших топ-стилистов." },
    { id: 3, category: "Косметология", date: "15 Марта 2026", title: "SMART-чистка лица: почему её стоит попробовать", excerpt: "Ультразвук и атравматические методы, которые перевернут ваше представление о чистке лица." },
    { id: 4, category: "Брови и ресницы", date: "10 Марта 2026", title: "Ламинирование или ботокс: что выбрать?", excerpt: "Разбираем главные отличия популярных процедур для бровей и ресниц и их влияние." },
    { id: 5, category: "Маникюр", date: "5 Марта 2026", title: "Японский маникюр: спасение для ломких ногтей", excerpt: "Почему эко-маникюр набирает популярность и как он восстанавливает ногтевую пластину." },
    { id: 6, category: "Уход", date: "1 Марта 2026", title: "Топ-3 домашних средства для рук в зимний период", excerpt: "Увлажнение и питание кожи рук. Простые советы от наших мастеров на каждый день." },
  ];

  return (
    <main className="min-h-screen bg-zinc-50 flex flex-col pt-20">
      <Header />
      
      {/* Blog Hero Container */}
      <section className="py-20 px-6 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-end gap-6 mb-8">
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-serif font-light text-[#222222] mb-6">Журнал о красоте</h1>
            <p className="font-sans text-sm opacity-60 leading-relaxed">
              Полезные SEO-статьи, свежие тренды и секреты домашнего ухода от наших экспертов. Читайте, вдохновляйтесь и будьте прекрасны каждый день.
            </p>
          </div>
        </div>
        
        {/* Categories Stub */}
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
             {["Все статьи", "Тренды", "Уход", "Маникюр", "Косметология"].map((cat, idx) => (
                <button key={idx} className={`px-6 py-2 rounded-full font-sans text-[10px] md:text-xs uppercase tracking-widest whitespace-nowrap transition-colors ${idx === 0 ? "bg-[#222222] text-white" : "border border-gray-200 text-gray-500 hover:border-[#F5D3D9] hover:text-[#222222]"}`}>
                  {cat}
                </button>
             ))}
          </div>
        </div>
      </section>

      {/* Blog Grid Layout */}
      <section className="py-24 px-6 flex-grow">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {posts.map((post) => (
            <article key={post.id} className="group cursor-pointer flex flex-col">
              <div className="w-full aspect-[4/3] bg-gray-200/40 rounded-3xl mb-6 relative overflow-hidden flex items-center justify-center">
                 <FileText size={48} className="opacity-20 text-gray-500 group-hover:scale-110 transition-transform duration-700" />
                 <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
              </div>
              
              <div className="flex items-center gap-4 mb-4 font-sans text-[10px] md:text-xs text-gray-400 uppercase tracking-widest font-medium">
                <span className="text-[#c7919d]">{post.category}</span>
                <span className="w-1 h-1 bg-gray-300 rounded-full" />
                <span>{post.date}</span>
              </div>
              
              <h3 className="font-serif text-2xl md:text-3xl text-[#222222] mb-3 group-hover:text-[#c7919d] transition-colors leading-tight">
                {post.title}
              </h3>
              
              <p className="font-sans text-sm opacity-60 line-clamp-3 leading-relaxed mb-6">
                {post.excerpt}
              </p>
              
              <Link href={`/blog/${post.id}`} className="mt-auto inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest text-[#222222] group-hover:text-[#c7919d] transition-colors">
                Читать полностью <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
        
        {/* Pagination UI Stub */}
        <div className="mt-24 flex justify-center items-center gap-2 font-sans text-sm">
           <button className="w-10 h-10 rounded-full bg-[#222222] text-white flex items-center justify-center transition-transform hover:scale-105">1</button>
           <button className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm flex items-center justify-center border border-gray-100 transition-all text-gray-500 hover:text-[#222222]">2</button>
           <button className="w-10 h-10 rounded-full hover:bg-white hover:shadow-sm flex items-center justify-center border border-gray-100 transition-all text-gray-500 hover:text-[#222222]">3</button>
        </div>
      </section>

      <Footer />
    </main>
  );
}
